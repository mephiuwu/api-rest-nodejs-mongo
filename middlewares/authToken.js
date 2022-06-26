import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if (!token) throw new Error('No existe el token en el header. Usa Bearer.');

        token = token.split(" ")[1];

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {

        const TokenVerificationErrors = {
            ["invalid signature"]: "La firma del JWT no es válida",
            ["JWT expired"]: "JWT Expirado",
            ["invalid token"]: "Token no válido",
            ["No Bearer"]: "Utiliza formato Bearer",
        };

        return res.status(401).send({error: TokenVerificationErrors[error.message]});
    }
}