import uuid from 'uuid';

class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    getAllGroups() {
        return this.groupModel.findAll()
            .then(groups => groups)
            .catch(err => console.log(err));
    }

    getGroupById(id) {
        return this.groupModel.findByPk(id)
            .then(group => group)
            .catch(err => console.log(err));
    }

    async createGroup(name, permissions) {
        const groupExists = await this.groupModel.findOne({
            where: {
                name
            }
        });

        if (groupExists) {
            return null;
        }

        return await this.groupModel.create({
            id: uuid.v4(),
            name,
            permissions
        });
    }

    async updateGroup(name, permissions, id) {
        const groupToUpdate = await this.getGroupById(id);

        if (!groupToUpdate) {
            return null;
        }

        return this.groupModel.update({ name, permissions }, {
            where: {
                id
            },
            returning: true
        })
            .then(group => group)
            .catch(err => console.log(err));
    }

    async hardDeleteGroup(id) {
        const groupToDelete = await this.getGroupById(id);

        if (!groupToDelete) {
            return null;
        }

        return this.groupModel.destroy({
            where: {
                id
            },
            returning: true
        })
            .then(group => group)
            .catch(err => console.log(err));
    }
}

export default GroupService;
