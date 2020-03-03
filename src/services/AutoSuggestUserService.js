import { Op } from '../data-access/database';
import { logGeneratedServiceMessage } from '../utils/logger';
import measureTime from '../utils/measureTime';

class AutoSuggestUserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    @measureTime
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
            .catch(err => {
                logGeneratedServiceMessage('AutoSuggestUserService', 'getAutoSuggestUsers', { substr, limit }, err.message);
                throw err;
            });
    }
}

export default AutoSuggestUserService;
