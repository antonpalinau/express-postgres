import { Router } from 'express';
import validateSchema from '../middlewares/validation';
import loggerMiddleware from '../middlewares/logger';
import { schema_post, schema_put } from './groups.post.put.schema';
import GroupService from '../../services/GroupService';
import GroupModel from '../../models/GroupModel';
import db from '../../data-access/database';

const router = Router();
const groupServiceInstance = new GroupService(GroupModel, db);

router.get('/', loggerMiddleware('getAllGroups'), async (req, res) => {
    const groups = await groupServiceInstance.getAllGroups();

    res.json(groups);
});

router.get('/:id', loggerMiddleware('getGroupById'), async (req, res, next) => {
    try {
        const group = await groupServiceInstance.getGroupById(req.params.id);

        if (group) {
            return res.json(group);
        }

        res.json({ msg: 'Group not found' });
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

router.post('/', validateSchema(schema_post), loggerMiddleware('createGroup'), async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const group = await groupServiceInstance.createGroup(name, permissions);

        if (!group) {
            return res.status(400).json({ msg: 'Group with the same name already exists' });
        }

        res.json({ msg: 'New group is created', group });
    } catch (e) {
        res.status(400).json({ msg: 'error', e });
        console.log(e);
    }
});

router.put('/:id', validateSchema(schema_put), loggerMiddleware('updateGroup'), async (req, res) => {
    const id = req.params.id;
    const { name, permissions } = req.body;

    try {
        const group = await groupServiceInstance.updateGroup(name, permissions, id);

        if (group) {
            return res.json({ msg: `Group with the id of ${id} was updated`, group: group[1] });
        }
        res.status(400).json({ msg: `No group with the id of ${id}` });
    } catch (e) {
        res.status(400).json({ msg: 'error', e });
        console.log('Error', e);
    }
});

router.delete('/:id', loggerMiddleware('hardDeleteGroup'), async (req, res) => {
    const id = req.params.id;

    try {
        const group = await groupServiceInstance.hardDeleteGroup(id);

        if (group) {
            return res.json({ msg: `Group with the id of ${id} was hard deleted`, group: group[1] });
        }
        res.status(400).json({ msg: `No group with the id of ${id}` });
    } catch (e) {
        res.status(400).json({ msg: 'error', e });
        console.log('Error', e);
    }
});

export default router;
