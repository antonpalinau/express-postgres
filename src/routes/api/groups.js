import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
import authenticationToken from '../middlewares/authenticationToken';
import { schema_post, schema_put } from './groups.post.put.schema';
import {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    hardDeleteGroup
} from '../controllers/groupsController';

const router = Router();

router.get(
    '/',
    //authenticationToken,
    loggerMiddleware('getAllGroups'),
    getAllGroups
);

router.get(
    '/:id',
    //authenticationToken,
    loggerMiddleware('getGroupById'),
    getGroupById
);

router.post(
    '/',
    authenticationToken,
    validateSchema(schema_post),
    loggerMiddleware('createGroup'),
    createGroup
);

router.put(
    '/:id',
    authenticationToken,
    validateSchema(schema_put),
    loggerMiddleware('updateGroup'),
    updateGroup
);

router.delete(
    '/:id',
    authenticationToken,
    loggerMiddleware('hardDeleteGroup'),
    hardDeleteGroup
);

export default router;
