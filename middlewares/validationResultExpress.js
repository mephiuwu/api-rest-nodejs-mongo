import { validationResult } from "express-validator";


//middleware para validar el body que llega
export const validationResultExpress = (req, res, next) => {
    //se obtienen los resultados de la validación
    const errors = validationResult(req);

    //sí errors no es vacío (contiene algo), se muestra en array (errors.array()) los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //sí errors es vacío, entonces sigue la secuencia
    next();
}