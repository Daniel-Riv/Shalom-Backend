const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../helper/nodemailer");
const { generateJWT } = require("../helper/jwt");


const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }
        user = new User(req.body);
        const salt =  await bcrypt.genSalt(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        await sendEmail({
            email: user.email,
            subject: "Bienvenido a la Muebles Shalom",
            message: `Hola ${user.name} ${user.lastName}, tenemos los mejores muebles a un precio accesible `
        });

        const token = await generateJWT(
            user.id,
            user.name,
            user.lastName,
            user.email,
            user.city,
            user.address,
            user.phone,
            user.role
        );
        return res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                city: user.city,
                address: user.address,
                phone: user.phone,
                role: user.role
            },
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }

}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "El usuario no existe" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "El password es incorrecto" });
        }
        const token = await generateJWT(
            user.id,
            user.name,
            user.lastName,
            user.email,
            user.city,
            user.address,
            user.phone,
            user.role
        );
        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                city: user.city,
                address: user.address,
                phone: user.phone,
                role: user.role
            },
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    signUp,
    signIn
}