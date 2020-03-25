import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
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
    loggerMiddleware('getAllGroups'),
    getAllGroups
);

router.get(
    '/:id',
    loggerMiddleware('getGroupById'),
    getGroupById
);

router.post(
    '/',
    validateSchema(schema_post),
    loggerMiddleware('createGroup'),
    createGroup
);

router.put(
    '/:id',
    validateSchema(schema_put),
    loggerMiddleware('updateGroup'),
    updateGroup
);

router.delete(
    '/:id',
    loggerMiddleware('hardDeleteGroup'),
    hardDeleteGroup
);

export default router;
