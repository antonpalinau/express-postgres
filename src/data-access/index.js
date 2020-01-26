import db from './database';
import dbInitialData from './databaseInitialData';
import UserModel from '../models/UserModel';

export default () => {
    db
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');

            UserModel.sync({ force: true })
                .then(() => UserModel.bulkCreate(dbInitialData))
                .then(() => console.log('Database has been initialized successfully'))
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};
