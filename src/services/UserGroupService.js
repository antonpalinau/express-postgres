import db from '../data-access/database';

class UserGroupService {
    constructor(userGroupModel, userModel, groupModel) {
        this.userGroupModel = userGroupModel;
        this.userModel = userModel;
        this.groupModel = groupModel;
    }

    async addUsersToGroup(groupId, userIds) {
        let transaction;
        try {
            transaction = await db.transaction();
            const group = await this.groupModel.findByPk(groupId, { transaction });

            if (!group) {
                console.log('Group id is wrong');
                await transaction.rollback();
                return null;
            }

            for (const userId of userIds) {
                const user = await this.userModel.findByPk(userId, { transaction });

                if (!user) {
                    console.log('User id is wrong');
                    await transaction.rollback();
                    return null;
                }

                const userGroup = await this.userGroupModel.create({
                    userId,
                    groupId
                }, { transaction });
                console.log('userGroup', userGroup);
            }

            await transaction.commit();
        } catch (e) {
            console.log(e);
            if (transaction) await transaction.rollback();
        }
    }
}

export default UserGroupService;
