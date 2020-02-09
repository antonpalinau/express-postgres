import db from './database';
import dbInitialData, { groups } from './databaseInitialData';
import UserModel from '../models/UserModel';
import GroupModel from '../models/GroupModel';
import UserGroupModel from '../models/UserGroup';

export default async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        await UserModel.sync({ force: true });
        await UserModel.bulkCreate(dbInitialData);
        console.log('Database has been initialized successfully');
        await GroupModel.sync({ force: true });
        await GroupModel.bulkCreate(groups);
        console.log('Table Groups has been initialized successfully');
        await UserGroupModel.sync({ force: true });
        console.log('Table UserGroup has been initialized successfully');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
};
