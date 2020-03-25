import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
import { schema } from './users.post.put.schema';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    softDeleteUser
} from '../controllers/usersController';

const router = Router();


router.get(
    '/',
    loggerMiddleware('getAllUsers'),
    getAllUsers
);

router.get(
    '/:id',
    loggerMiddleware('getUserById'),
    getUserById
);

router.post(
    '/',
    validateSchema(schema),
    loggerMiddleware('createUser'),
    createUser
);

router.put(
    '/:id',
    validateSchema(schema),
    loggerMiddleware('updateUser'),
    updateUser
);

router.delete(
    '/:id',
    loggerMiddleware('softDeleteUser'),
    softDeleteUser
);

export default router;
