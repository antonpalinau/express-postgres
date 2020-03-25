import UserService from '../../services/UserService';
import UserModel from '../../models/UserModel';
import db from '../../data-access/database';

const userServiceInstance = new UserService(UserModel, db);

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userServiceInstance.getAllUsers();

        res.json(users);
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
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
};

export const createUser = async (req, res) => {
    const { login, password, age } = req.body;
    const user = await userServiceInstance.createUser(login, password, age, false);

    if (!user) {
        return res.status(400).json({ msg: 'User with the same login already exists' });
    }

    res.json({ msg: 'New user is created', user });
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { login, password, age } = req.body;
    const user = await userServiceInstance.updateUser(login, password, age, id);

    if (user) {
        return res.json({ msg: `User with the id of ${id} was updated`, user: user[1] });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
};

export const softDeleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await userServiceInstance.softDeleteUser(id);

    if (user) {
        return res.json({ msg: `User with the id of ${id} was softly deleted`, user: user[1] });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
};
