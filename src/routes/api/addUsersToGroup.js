import { Router } from 'express';
import UserGroupService from '../../services/UserGroupService';
import UserGroup from '../../models/UserGroup';
import UserModel from '../../models/UserModel';
import GroupModel from '../../models/GroupModel';
import validateSchema from '../middlewares/validation';
import { schema_post } from './addUsersToGroup.post.schema';

const router = Router();

router.post('/', validateSchema(schema_post), async (req, res) => {
    const { groupId, userIds } = req.body;
    const userGroupServiceInstance = new UserGroupService(UserGroup, UserModel, GroupModel);
    const userGroupMsg = await userGroupServiceInstance.addUsersToGroup(groupId, userIds);

    if (!userGroupMsg) {
        return res.json({ msg: `Users with the ids of ${userIds.join()} were added to the group with the id of ${groupId}.` });
    }

    res.status(400).json({ msg: userGroupMsg });
});

export default router;
