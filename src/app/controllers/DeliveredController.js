import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipients';

class DeliverdController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_at: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
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
}

export default new DeliverdController();
