import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ msg: 'invalid access token' });
            } else {
                req.user = user;
                // eslint-disable-next-line
                next();
            }
        });
    } else {
        res.status(401).json({ msg: 'no access token' });
    }
};
