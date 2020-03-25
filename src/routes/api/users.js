import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
import authenticationToken from '../middlewares/authenticationToken';
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
    //authenticationToken,
    loggerMiddleware('getAllUsers'),
    getAllUsers
);

router.get(
    '/:id',
    //authenticationToken,
    loggerMiddleware('getUserById'),
    getUserById
);

router.post(
    '/',
    authenticationToken,
    validateSchema(schema),
    loggerMiddleware('createUser'),
    createUser
);

router.put(
    '/:id',
    authenticationToken,
    validateSchema(schema),
    loggerMiddleware('updateUser'),
    updateUser
);

router.delete(
    '/:id',
    authenticationToken,
    loggerMiddleware('softDeleteUser'),
    softDeleteUser
);

export default router;
