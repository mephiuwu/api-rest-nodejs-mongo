import { Router } from "express";
import { body } from "express-validator";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { authToken } from "../middlewares/authToken.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = Router();

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

router.get('/protected', authToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);

export default router;