import { Op } from '../config/database';

class AutoSuggestUserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    getAutoSuggestUsers(substr, limit) {
        return this.userModel.findAll({
            where: {
                login: {
                    [Op.substring]: substr
                }
            },
            order: [
                ['login', 'ASC']
            ],
            limit
        })
            .then(users => users)
            .catch(err => console.log(err));
    }
}

export default AutoSuggestUserService;
