import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    try {
        //recibe los valores el request
        const {email, password} = req.body;
        let message = 'Usuario creado exitosamente';

        //busca si existe alguien con el mismo email
        let user = await User.findOne({email});

        //sí existe alguien con el email sale de la llamada indicando el error
        //if (user) return res.status(400).json({status: false, msg: 'Ya existe este usuario'});
        if (user) throw { code: 400 , message: 'Ya existe este usuario.'};

        //se le pasan los valores al modelo User
        user = new User({email, password});

        //guarda (inserta) el registro
        await user.save();

        //jwt token
        return res.status(200).json({status: true, message: message})

    } catch (error) {
        return res.status(error.code || 500).json({status: false, message: error.message});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        let message = 'Usuario logeado exitosamente';

        let user = await User.findOne({email});

        if (!user) throw { code: 403 , message: 'No existe este usuario.' };

        const responsePassword = await user.comparePassword(password);

        if (!responsePassword) throw { code: 403 , message: 'Credenciales incorrectas.' };

        //Generar token
        const {token, expiresIn} = generateToken(user.id);

        return res.status(200).json({status: true, token, expiresIn, message})
    } catch (error) {
        return res.status(error.code || 500).json({status: false, message: error.message});
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}
