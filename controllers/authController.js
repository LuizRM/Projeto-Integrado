const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const User = require("../models/user")


const router = express.Router();


router.post("/register", async (req, res) => {
    const {email} = req.body
    try{
        if (await User.findOne({email})){
            return res.status(400).send("User already exists!");
        }
        const novoUsuario = await User.create(req.body);

        return res.send(novoUsuario);
    } catch (err) {
        console.log("Erro a seguir: ");
        console.log(err);
        res.status(400).send({
            error: "Registration error!", 
            recebido: req.body,
            erro: err,
        });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).send("Email or password missing from request");
    }
    const usuario = await User.findOne({email}).select("+password");

    if (!usuario){
        return res.status(404).send("Error: User not found");
    }

    if (! await bcrypt.compare(password, usuario.password)){
        return res.status(403).send("Error: email or password wrong");
    }

    //A partir daqui, usuario existe e entrou com a senha correta.
    usuario.password = undefined;
    const token =jwt.sign({ id: usuario.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    return res.send({usuario, token});
})

module.exports = (app) => app.use("/auth", router);