import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import User from '../models/User';

class DeliverymanController {
  async index(req, res) {
    const allDeliveryman = await Deliveryman.findAll();

    return res.json(allDeliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Delivery already exists.' });
    }

    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error:
          'Only authenticated administrators can register the delivery team',
      });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    if (email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email },
      });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists.' });
      }
    }

    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators can update the delivery team',
      });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { id: req.params.id },
    });

    const deliverymanUpdate = await deliveryman.update(req.body);

    return res.json(deliverymanUpdate);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findOne({
      where: { id: req.params.id },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist.' });
    }

    const admSession = await User.findByPk(req.userId);

    if (!admSession) {
      return res.status(400).json({
        error: 'Only authenticated administrators can delete the delivery team',
      });
    }

    const deliverymanDelete = await deliveryman.destroy();
    return res.json({
      message: 'Deliveryman deleted successfully',
      data: { deliverymanDelete },
    });
  }
}

export default new DeliverymanController();
