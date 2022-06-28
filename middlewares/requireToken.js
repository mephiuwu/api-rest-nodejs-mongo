import jwt from 'jsonwebtoken';
import { errorTokens } from '../helpers/errorTokens.js';

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error('No existe el token en el header. Usa Bearer.');

        token = token.split(" ")[1];
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({ error: errorTokens(error.message) });
    }
}