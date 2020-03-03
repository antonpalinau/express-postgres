import { logGeneratedServiceMessage } from '../utils/logger';
import measureTime from '../utils/measureTime';

class UserGroupService {
    constructor(userGroupModel, userModel, groupModel, db) {
        this.userGroupModel = userGroupModel;
        this.userModel = userModel;
        this.groupModel = groupModel;
        this.db = db;
    }
    @measureTime
    async addUsersToGroup(groupId, userIds) {
        let transaction;
        try {
            transaction = await this.db.transaction();
            const group = await this.groupModel.findByPk(groupId, { transaction });

            if (!group) {
                await transaction.rollback();

                return `Group with the id of ${groupId} doesn't exist.`;
            }

            for (const userId of userIds) {
                const user = await this.userModel.findByPk(userId, { transaction });

                if (!user) {
                    await transaction.rollback();

                    return `User with the id of ${userId} doesn't exist.`;
                }

                await this.userGroupModel.create({
                    userId,
                    groupId
                }, { transaction });
            }

            await transaction.commit();
        } catch (err) {
            if (transaction) await transaction.rollback();
            logGeneratedServiceMessage('UserGroupService', 'addUsersToGroup', { groupId, userIds }, err.message);
            throw err;
        }
    }
}

export default UserGroupService;
