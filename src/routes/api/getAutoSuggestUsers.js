import { Router } from 'express';
import AutoSuggestUserService from '../../services/AutoSuggestUserService';
import UserModel from '../../models/UserModel';
import loggerMiddleware from '../middlewares/logger';

const router = Router();
const autoSuggestUserServiceInstance = new AutoSuggestUserService(UserModel);

router.get('/', loggerMiddleware('getAutoSuggestUsers'), async (req, res, next) => {
    const loginSubstr = req.query.loginSubstring;
    const limit = req.query.limit;
    try {
        const users = await autoSuggestUserServiceInstance.getAutoSuggestUsers(loginSubstr, limit);
        console.log('USERS', users);
        res.json(users);
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

export default router;
