import { Router } from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const router = Router();

/*
router.<METODO>(
    '<RUTA>',
    [
    **VALIDACIONES**
    body('<PARÁMETRO>','<MENSAJE PERSONALIZADO>').<VALIDACIÓN>(),
    ],
    <MIDDLEWARE>,
    <MÉTODO CONTROLADOR>
)
*/

router.post('/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);

router.get('/protected', requireToken, infoUser);
router.get("/refresh", requireRefreshToken , refreshToken);
router.get("/logout", logout);

export default router;