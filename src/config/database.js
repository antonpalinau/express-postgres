import Sequelize from 'sequelize';
import 'dotenv/config';

const db = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: `${process.env.HOST}`,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

export const Op = Sequelize.Op;
export default db;
