class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    getAllUsers() {
        return this.userModel.findAll()
            .then(users => users)
            .catch(err => console.log(err));
    }

    getUserById(id) {
        return this.userModel.findByPk(id)
            .then(user => user)
            .catch(err => console.log(err));
    }

    createUser(login, password, age, isDeleted) {
        return this.userModel.create({
            login,
            password,
            age,
            isDeleted
        })
            .then(user => user)
            .catch(err => console.log(err));
    }

    async updateUser(login, password, age, id) {
        const userToUpdate = await this.getUserById(id);

        if (!userToUpdate) {
            return null;
        }

        return this.userModel.update({ login, password, age }, {
            where: {
                id
            },
            returning: true
        })
            .then(user => user)
            .catch(err => console.log(err));
    }

    async softDeleteUser(id) {
        const userToUpdate = await this.getUserById(id);

        if (!userToUpdate) {
            return null;
        }

        return this.userModel.update({ isDeleted: true }, {
            where: {
                id
            },
            returning: true
        })
            .then(user => user)
            .catch(err => console.log(err));
    }
}

export default UserService;
