import Sequelize from 'sequelize';
import db from '../data-access/database';

const Group = db.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    }
});

export default Group;
