import * as Yup from 'yup';

import Delivery_Problems from '../models/Delivery_Problems';
import Delivery from '../models/Delivery';
import Recipients from '../models/Recipients';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;

    // check if exists delivery
    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const problems = await Delivery_Problems.findAll({
      where: {
        delivery_id: id,
      },
      attributes: ['id', 'description'],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!schema) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id, delivery_id } = req.params;

    // Check if delivery exists
    const deliveryExists = await Delivery.findByPk(delivery_id);
    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    // Check if delivery has canceled
    if (deliveryExists.canceled_at) {
      return res.status(400).json({ error: 'Delivery has canceled ' });
    }

    // Check if delivery belong to deliveryman
    if (deliveryExists.deliveryman_id !== Number(id)) {
      return res
        .status(400)
        .json({ error: 'Delivery does not belongs to the deliveryman' });
    }

    const { description } = req.body;

    const createProblem = await Delivery_Problems.create({
      delivery_id,
      description,
    });

    await createProblem.reload({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'start_at', 'end_at', 'canceled_at'],
          include: [
            {
              model: Recipients,
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
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    return res.status(201).json(createProblem);
  }
}

export default new DeliveryProblemController();
