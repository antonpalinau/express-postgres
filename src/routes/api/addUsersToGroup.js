import { Router } from 'express';
import UserGroupService from '../../services/UserGroupService';
import UserGroup from '../../models/UserGroup';
import UserModel from '../../models/UserModel';
import GroupModel from '../../models/GroupModel';

const router = Router();

router.post('/', async (req, res) => {
    const { groupId, userIds } = req.body;
    console.log('groupId', groupId);
    console.log('userIds', userIds);
    //return;
    const userGroupServiceInstance = new UserGroupService(UserGroup, UserModel, GroupModel);
    const userGroup = await userGroupServiceInstance.addUsersToGroup(groupId, userIds);

    res.json(userGroup);
});

export default router;
