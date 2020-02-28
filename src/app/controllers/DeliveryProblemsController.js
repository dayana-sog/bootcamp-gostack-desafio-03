import Queue from 'bee-queue';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
// import File from '../models/File';
import Recipients from '../models/Recipients';
import Delivery_Problems from '../models/Delivery_Problems';
import User from '../models/User';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemsController {
  async index(req, res) {
    // Show all deliveries with problems
    const { page = 1 } = req.query;

    const deliveriesWithProblem = await Delivery_Problems.findAll({
      offset: (page - 1) * 20,
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

    // Verify if are authenticated administrators
    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators can delete the delivery team',
      });
    }

    return res.json(deliveriesWithProblem);
  }

  async update(req, res) {
    const { id } = req.params;

    // Verify if are authenticated administrators
    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators can delete the delivery team',
      });
    }

    // Check if problem exists
    const problem = await Delivery_Problems.findByPk(id);
    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const { delivery_id } = problem;

    // Verify if delivery exist
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    await delivery.update({ canceled_at: new Date() });
    await delivery.reload({
      attributes: ['id', 'product', 'start_at', 'canceled_at'],
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
    });

    await Queue.add(CancellationMail.key, { delivery });

    return res.json(delivery);
  }
}

export default new DeliveryProblemsController();
