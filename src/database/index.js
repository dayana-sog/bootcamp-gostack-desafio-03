import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import Delivery_Problems from '../app/models/Delivery_Problems';

import databaseConfig from '../config/database';

const models = [
  User,
  Recipients,
  File,
  Deliveryman,
  Delivery,
  Delivery_Problems,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // Faz a conexão com a base de dados.
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/fastfeet',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
