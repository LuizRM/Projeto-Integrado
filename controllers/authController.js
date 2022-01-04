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
            res.status(400).send("User already exists!");
        }
        const novoUsuario = await User.create(req.body);

        return res.send(novoUsuario);
    } catch (err) {
        console.log("Erro a seguir: ");
        console.log(err);
        res.status(400).send({
            error: "registration error!", 
            recebido: req.body,
            erro: err,
        });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const usuario = await User.findOne({email}).select("+password");

    if (!usuario){
        res.status(404).send("Error: User does not exist");
    }

    if (! await bcrypt.compare(password, usuario.password)){
        res.status(403).send("Error: passwords do not match");
    }

    //A partir daqui, usuario existe e entrou com a senha correta.
    usuario.password = undefined;
    const token =jwt.sign({ id: usuario.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({usuario, token});
})

module.exports = (app) => app.use("/auth", router);