import { logGeneratedServiceMessage } from '../utils/logger';
import measureTime from '../utils/measureTime';

class AuthorizationService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    @measureTime
    async login(login, password) {
        try {
            const user = await this.userModel.findOne({
                where: {
                    login,
                    password
                }
            });

            return user;
        } catch (err) {
            logGeneratedServiceMessage('AuthorizationService', 'login', { login, password }, err.message);
            throw err;
        }
    }
}

export default AuthorizationService;
