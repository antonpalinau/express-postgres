import Sequelize from 'sequelize';
import db from '../data-access/database';
import User from './UserModel';
import Group from './GroupModel';

const UserGroup = db.define('usergroup', {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    groupId: {
        type: Sequelize.UUID,
        references: {
            model: 'Groups',
            key: 'id'
        }
    }
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export default UserGroup;
