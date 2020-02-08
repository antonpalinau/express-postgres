import db from './database';
import dbInitialData, { groups } from './databaseInitialData';
import UserModel from '../models/UserModel';
import GroupModel from '../models/GroupModel';
import UserGroup from '../models/UserGroup';
//import Sequelize from 'sequelize';

export default async () => {
    try {
        // const UserGroup = db.define('usergroup', {
        //     role: Sequelize.STRING
        // });
        // UserModel.belongsToMany(GroupModel, { through: UserGroup });
        // GroupModel.belongsToMany(UserModel, { through: UserGroup });
        // await UserGroup.create({
        //     userId: 3
        // });
        await db.authenticate();
        console.log('Connection has been established successfully.');
        await UserModel.sync({ force: true });
        await UserModel.bulkCreate(dbInitialData);
        console.log('Database has been initialized successfully');
        await GroupModel.sync({ force: true });
        await GroupModel.bulkCreate(groups);
        console.log('Table Groups has been initialized successfully');
        await UserGroup.sync();
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
};
