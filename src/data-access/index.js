import db from './database';
import dbInitialData, { groups } from './databaseInitialData';
import UserModel from '../models/UserModel';
import GroupModel from '../models/GroupModel';

export default () => {
    db
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');

            UserModel.sync({ force: true })
                .then(() => UserModel.bulkCreate(dbInitialData))
                .then(() => console.log('Database has been initialized successfully'))
                .catch(err => console.log(err));

            GroupModel.sync({ force: true })
                .then(() => GroupModel.bulkCreate(groups))
                .then(() => console.log('Table Groups has been initialized successfully'))
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};
