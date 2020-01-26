import Sequelize from 'sequelize';
import config from '../config';

const db = new Sequelize(config.database, config.login, config.password, {
    host: config.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

export const Op = Sequelize.Op;
export default db;
