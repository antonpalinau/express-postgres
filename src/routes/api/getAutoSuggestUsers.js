import { Router } from 'express';
import AutoSuggestUserService from '../../services/AutoSuggestUserService';
import UserModel from '../../models/UserModel';

const router = Router();

router.get('/', async (req, res) => {
    const loginSubstr = req.query.loginSubstring;
    const limit = req.query.limit;
    const autoSuggestUserServiceInstance = new AutoSuggestUserService(UserModel);
    const users = await autoSuggestUserServiceInstance.getAutoSuggestUsers(loginSubstr, limit);

    res.json(users);
});

export default router;
