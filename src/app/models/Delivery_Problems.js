import Sequelize, { Model } from 'sequelize';

class Delivery_problems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Deliveries, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
}

export default Delivery_problems;
