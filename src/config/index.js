import 'dotenv/config';

export default {
    login: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    dbPort: process.env.DBPORT,
    port: process.env.PORT || 5000
};
