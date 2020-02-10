import uuid from 'uuid';

class GroupService {
    constructor(groupModel, db) {
        this.groupModel = groupModel;
        this.db = db;
    }

    getAllGroups() {
        return this.groupModel.findAll()
            .then(groups => groups)
            .catch(err => console.log(err));
    }

    getGroupById(id, transaction) {
        return this.groupModel.findByPk(id, { ...(transaction && { transaction }) })
            .then(group => group)
            .catch(err => console.log(err));
    }

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
        } catch (e) {
            if (transaction) await transaction.rollback();
            console.log(e);
            throw e;
        }
    }

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
        } catch (e) {
            if (transaction) await transaction.rollback();
            console.log(e);
            throw e;
        }
    }

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
        } catch (e) {
            if (transaction) await transaction.rollback();
            console.log(e);
            throw e;
        }
    }
}

export default GroupService;
