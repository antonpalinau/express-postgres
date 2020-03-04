import { Router } from 'express';
import AutoSuggestUserService from '../../services/AutoSuggestUserService';
import UserModel from '../../models/UserModel';
import loggerMiddleware from '../middlewares/logger';
import authenticationToken from '../middlewares/authenticationToken';

const router = Router();
const autoSuggestUserServiceInstance = new AutoSuggestUserService(UserModel);

router.get('/', authenticationToken, loggerMiddleware('getAutoSuggestUsers'), async (req, res, next) => {
    const loginSubstr = req.query.loginSubstring;
    const limit = req.query.limit;
    try {
        const users = await autoSuggestUserServiceInstance.getAutoSuggestUsers(loginSubstr, limit);

        res.json(users);
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

export default router;
