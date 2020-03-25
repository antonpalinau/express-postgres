import { Router } from 'express';
import UserGroupService from '../../services/UserGroupService';
import UserGroup from '../../models/UserGroup';
import UserModel from '../../models/UserModel';
import GroupModel from '../../models/GroupModel';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
import { schema_post } from './addUsersToGroup.post.schema';
import db from '../../data-access/database';

const router = Router();

router.post('/', validateSchema(schema_post), loggerMiddleware('addUsersToGroup'), async (req, res) => {
    const { groupId, userIds } = req.body;
    const userGroupServiceInstance = new UserGroupService(UserGroup, UserModel, GroupModel, db);
    try {
        const userGroupMsg = await userGroupServiceInstance.addUsersToGroup(groupId, userIds);

        if (!userGroupMsg) {
            return res.json({ msg: `Users with the ids of ${userIds.join()} were added to the group with the id of ${groupId}.` });
        }

        res.status(400).json({ msg: userGroupMsg });
    } catch (e) {
        res.status(400).json({ err: e });
    }
});

export default router;
