import { Router } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { schema } from './login.post.schema';
import validateSchema from '../middlewares/validation';
import AuthorizationService from '../../services/AuthorizationService';
import UserModel from '../../models/UserModel';
import loggerMiddleware from '../middlewares/logger';

const router = Router();
const authorizationServiceInstance = new AuthorizationService(UserModel);

router.post('/', validateSchema(schema), loggerMiddleware('login'), async (req, res, next) => {
    const { login, password } = req.body;

    try {
        const user = await authorizationServiceInstance.login(login, password);

        if (!user) {
            return res.status(403).json({ msg: 'Wrong username or password' });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 });
        res.json({ token });
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

export default router;
