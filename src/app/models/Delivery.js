import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Deliveries extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_at: Sequelize.DATE,
        end_at: Sequelize.DATE,
        canceled: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.canceled_at, new Date());
          },
        },
        finished: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.end_date, new Date());
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipients, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Deliveries;
