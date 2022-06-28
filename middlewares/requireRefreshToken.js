import { errorTokens } from "../helpers/errorTokens.js";
import jwt from 'jsonwebtoken';

//Los middlewares necesitan tener el req, res y next
export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;

        if(!refreshTokenCookie) throw new Error('No existe el token');

        //retorna el payload, lo que sería la información del usuario, para extraer el id del user
        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({ error: errorTokens(error.message) });
    }
}