import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';

import databaseConfig from '../config/database';

const models = [User, Recipients, File, Deliveryman];

class Database {
  constructor() {
    this.init();
  }

  // Faz a conexão com a base de dados.
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
