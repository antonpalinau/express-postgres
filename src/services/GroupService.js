import uuid from 'uuid';
import { logGeneratedServiceMessage } from '../utils/logger';
import measureTime from '../utils/measureTime';

class GroupService {
    constructor(groupModel, db) {
        this.groupModel = groupModel;
        this.db = db;
    }
    @measureTime
    getAllGroups() {
        return this.groupModel.findAll()
            .then(groups => groups)
            .catch(err => {
                logGeneratedServiceMessage('GroupService', 'getAllGroups', undefined, err.message);
                throw err;
            });
    }
    @measureTime
    getGroupById(id, transaction) {
        return this.groupModel.findByPk(id, { ...(transaction && { transaction }) })
            .then(group => group)
            .catch(err => {
                logGeneratedServiceMessage('GroupService', 'getGroupById', { id, transaction }, err.message);
                throw err;
            });
    }
    @measureTime
    async createGroup(name, permissions) {
        let transaction;
        try {
            transaction = await this.db.transaction();
            const groupExists = await this.groupModel.findOne({
                where: {
                    name
                },
                transaction
            });

            if (groupExists) {
                return null;
            }

            const group = await this.groupModel.create({
                id: uuid.v4(),
                name,
                permissions
            }, { transaction });
            await transaction.commit();

            return group;
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('GroupService', 'createGroup', { name, permissions }, err.message);
            throw err;
        }
    }
    @measureTime
    async updateGroup(name, permissions, id) {
        let transaction;
        try {
            transaction = await this.db.transaction();
            const groupToUpdate = await this.getGroupById(id, transaction);

            if (!groupToUpdate) {
                return null;
            }

            const group = await this.groupModel.update({ name, permissions }, {
                where: {
                    id
                },
                transaction,
                returning: true
            });
            await transaction.commit();

            return group;
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('GroupService', 'updateGroup', { name, permissions, id }, err.message);
            throw err;
        }
    }
    @measureTime
    async hardDeleteGroup(id) {
        let transaction;
        try {
            transaction = await this.db.transaction();
            const groupToDelete = await this.getGroupById(id, transaction);

            if (!groupToDelete) {
                return null;
            }

            const group = await this.groupModel.destroy({
                where: {
                    id
                },
                returning: true
            });
            await transaction.commit();

            return group;
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('GroupService', 'hardDeleteGroup', { id }, err.message);
            throw err;
        }
    }
}

export default GroupService;
