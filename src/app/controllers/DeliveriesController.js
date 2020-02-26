import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import User from '../models/User';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipients';

import RegistrationMail from '../jobs/RegistraitonMail';
import Queue from '../../lib/Queue';

class DeliveriesController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
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

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      start_at: Yup.date().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Verify if are authenticated administrators
    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators are permited.',
      });
    }

    const { recipient_id, deliveryman_id } = req.body;

    // Check if deliveryman exists.
    const checkDeliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliverynman not found' });
    }

    // Check if Recipient exists.
    const checkRecipientExists = await Recipient.findByPk(recipient_id);

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    await delivery.reload({
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

    await Queue.add(RegistrationMail.key, {
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      start_at: Yup.date(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Verify if are authenticated administrators
    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators can update the delivery team',
      });
    }

    const { id } = req.params;

    // Check delivery exists.
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { recipient_id, deliveryman_id, signature_id } = req.body;

    // Check if deliveryman exists.
    const checkDeliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliverynman not found' });
    }

    // Check if Recipient exists.
    const checkRecipientExists = await Recipient.findByPk(recipient_id);

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    // Check if Signature exist.
    const checkSignatureExist = await File.findByPk(signature_id);

    if (!checkSignatureExist) {
      return res.status(400).json({ error: 'Signature not found' });
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  async delete(req, res) {
    // Verify if Delivery exist
    const delivery = await Delivery.findOne({
      where: { id: req.params.id },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist.' });
    }

    // Verify if are authenticated administrators
    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators can delete the delivery team',
      });
    }

    const deliveryDelete = await delivery.destroy();
    return res.json({
      message: 'Delivery deleted successfully',
      data: { deliveryDelete },
    });
  }
}

export default new DeliveriesController();
