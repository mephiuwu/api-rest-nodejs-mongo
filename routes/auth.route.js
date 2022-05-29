import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

/*
router.<METODO>(
    '<RUTA>',
    [
    **VALIDACIONES**
    body('<PARÁMETRO>','<MENSAJE PERSONALIZADO>').<VALIDACIÓN>(),
    ],
    <MIDDLEWARE>,
    <CONSTANTE DESDE CONTROLADOR>
)
*/

router.post(
    '/register', 
    [
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
    ],
    validationResultExpress,
    register
);

router.post(
    '/login', 
    [
        body('email', 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Formato de password incorrecta')
            .trim()
            .isLength({min: 6}),
    ],
    validationResultExpress,
    login
);

export default router;