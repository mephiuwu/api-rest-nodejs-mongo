import { User } from "../models/User.js";

export const register = async (req, res) => {
    //recibe los valores el request
    const {email, password} = req.body;

    try {
        //busca si existe alguien con el mismo email
        let user = await User.findOne({email});

        //sí existe alguien con el email sale de la llamada indicando el error
        if (user) throw res.status(400).json({msg: 'Ya existe este usuario'});

        //se le pasan los valores al modelo User
        user = new User({email, password});

        //guarda (inserta) el registro
        await user.save();

        //jwt token
        return res.json({ok:true})
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    res.json({ok: 'login'});
};
