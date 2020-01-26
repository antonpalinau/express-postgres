import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import { schema } from './users.post.put.schema';
import UserService from '../../services/UserService';
import UserModel from '../../models/UserModel';

const router = Router();

router.get('/', async (req, res) => {
    const userServiceInstance = new UserService(UserModel);
    const users = await userServiceInstance.getAllUsers();

    res.json(users);
});

router.get('/:id', async (req, res) => {
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.getUserById(req.params.id);

    if (user) {
        return res.json(user);
    }

    res.json({ msg: 'User not found' });
});

router.post('/', validateSchema(schema), async (req, res) => {
    const { login, password, age } = req.body;
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.createUser(login, password, age, false);

    if (!user) {
        res.json({ msg: 'User with the same login already exists' });
    }

    res.json({ msg: 'New user is created', user });
});

router.put('/:id', validateSchema(schema), async (req, res) => {
    const id = req.params.id;
    const { login, password, age } = req.body;
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.updateUser(login, password, age, id);

    if (user) {
        return res.json({ msg: `User with the id of ${id} was updated`, user: user[1] });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.softDeleteUser(id);

    if (user) {
        return res.json({ msg: `User with the id of ${id} was softly deleted`, user: user[1] });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
});

export default router;
