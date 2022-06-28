import { validationResult } from "express-validator";
import { body } from "express-validator";

//middleware para validar el body que llega
export const validationExpress = (req, res, next) => {
    //se obtienen los resultados de la validación
    const errors = validationResult(req);

    //sí errors no es vacío (contiene algo), se muestra en array (errors.array()) los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //sí errors es vacío, entonces sigue la secuencia
    next();
}

export const bodyRegisterValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Formato de password incorrecta')
        .trim()
        .isLength({min: 6})
        .custom((value, {req}) => {
            if (value != req.body.repassword) {
                throw new Error('No coinciden las contraseñas');
            }
            return value;
        }),
    validationExpress
];

export const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Formato de password incorrecta')
        .trim()
        .isLength({min: 6}),
    validationExpress
];