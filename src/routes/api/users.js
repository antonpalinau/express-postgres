import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
import authenticationToken from '../middlewares/authenticationToken';
import { schema } from './users.post.put.schema';
import UserService from '../../services/UserService';
import UserModel from '../../models/UserModel';
import db from '../../data-access/database';

const router = Router();
const userServiceInstance = new UserService(UserModel, db);

router.get('/', authenticationToken, loggerMiddleware('getAllUsers'), async (req, res, next) => {
    try {
        const users = await userServiceInstance.getAllUsers();

        res.json(users);
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

router.get('/:id', authenticationToken, loggerMiddleware('getUserById'), async (req, res, next) => {
    try {
        const user = await userServiceInstance.getUserById(req.params.id);

        if (user) {
            return res.json(user);
        }

        res.json({ msg: 'User not found' });
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

router.post('/', authenticationToken, validateSchema(schema), loggerMiddleware('createUser'), async (req, res) => {
    const { login, password, age } = req.body;
    const user = await userServiceInstance.createUser(login, password, age, false);

    if (!user) {
        return res.status(400).json({ msg: 'User with the same login already exists' });
    }

    res.json({ msg: 'New user is created', user });
});

router.put('/:id', authenticationToken, validateSchema(schema), loggerMiddleware('updateUser'), async (req, res) => {
    const id = req.params.id;
    const { login, password, age } = req.body;
    const user = await userServiceInstance.updateUser(login, password, age, id);

    if (user) {
        return res.json({ msg: `User with the id of ${id} was updated`, user: user[1] });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
});

router.delete('/:id', authenticationToken, loggerMiddleware('softDeleteUser'), async (req, res) => {
    const id = req.params.id;
    const user = await userServiceInstance.softDeleteUser(id);

    if (user) {
        return res.json({ msg: `User with the id of ${id} was softly deleted`, user: user[1] });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
});

export default router;
