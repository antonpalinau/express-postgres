import GroupService from '../../services/GroupService';
import GroupModel from '../../models/GroupModel';
import db from '../../data-access/database';

const groupServiceInstance = new GroupService(GroupModel, db);

export const getAllGroups = async (req, res, next) => {
    try {
        const groups = await groupServiceInstance.getAllGroups();

        res.json(groups);
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
};

export const getGroupById = async (req, res, next) => {
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
};

export const createGroup = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const group = await groupServiceInstance.createGroup(name, permissions);

        if (!group) {
            return res.status(400).json({ msg: 'Group with the same name already exists' });
        }

        res.json({ msg: 'New group is created', group });
    } catch (e) {
        res.status(400).json({ msg: 'error', e });
    }
};

export const updateGroup = async (req, res) => {
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
    }
};

export const hardDeleteGroup = async (req, res) => {
    const id = req.params.id;

    try {
        const group = await groupServiceInstance.hardDeleteGroup(id);

        if (group) {
            return res.json({ msg: `Group with the id of ${id} was hard deleted`, group: group[1] });
        }
        res.status(400).json({ msg: `No group with the id of ${id}` });
    } catch (e) {
        res.status(400).json({ msg: 'error', e });
    }
};
