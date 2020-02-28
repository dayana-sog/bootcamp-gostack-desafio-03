import { parseISO, getHours, isBefore, startOfDay, endOfDay } from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipients';

class DistributeController {
  // Show all deliveries the deliveryman has.
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_at: null,
      },
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'product', 'start_at', 'canceled_at', 'end_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'nome',
            'rua',
            'numero_casa',
            'complemento',
            'cidade',
            'estado',
            'cep',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    // Verify if Deliveryman exist
    const deliverymanExists = await Deliveryman.findOne({
      where: { id: req.params.id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists.' });
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    // The deliveryman updates the start_at, end_at, and add a signature
    const schema = Yup.object().shape({
      start_at: Yup.date(),
      end_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { deliveryman_id, id } = req.params;

    // Check delivery exists.
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    // Check if deliveryman exists.
    const checkDeliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliverynman not found' });
    }

    const { start_at, end_at, signature_id } = req.body;

    // Update start_at and end_at.
    const parsedStart = parseISO(start_at);
    const parsedEnd = parseISO(end_at);

    if (start_at) {
      const hour = getHours(parsedStart);

      if (hour <= 8 || hour >= 18) {
        return res
          .status(400)
          .json({ error: 'The start data must be between 08:00 and 18:00' });
      }
    }

    if (end_at && !start_at) {
      if (!delivery.start_date) {
        return res.status(400).json({
          error:
            'The delivery must have a pick-up time to be marked as delivered',
        });
      }
    }

    if (start_at && end_at) {
      if (isBefore(parsedEnd, parsedStart)) {
        return res
          .status(400)
          .json({ error: 'The end date must be after the start date' });
      }
    }

    // When the end_at is informed, need be informed the signature_id
    if (end_at && end_at !== null) {
      if (!signature_id) {
        return res.status(400).json({ error: 'Signature must be provided' });
      }
    }

    const deliveriesAll = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(parsedStart), endOfDay(parsedStart)],
        },
        end_date: null,
      },
    });

    // The deliveryman can do just 5 deliveries per day.
    if (deliveriesAll.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Deliveryman already has 5 deliveries on the day' });
    }

    const updated = await delivery.update(req.body);

    await updated.reload({
      attributes: ['id', 'product', 'start_at', 'canceled_at', 'end_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'nome',
            'rua',
            'numero_casa',
            'complemento',
            'cidade',
            'estado',
            'cep',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(updated);
  }
}

export default new DistributeController();
