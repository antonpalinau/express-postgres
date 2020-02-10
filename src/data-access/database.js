import Sequelize from 'sequelize';
import config from '../config';

const db = new Sequelize(config.database, config.login, config.password, {
    host: config.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const Op = Sequelize.Op;
export default db;
