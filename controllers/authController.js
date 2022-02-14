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
        res.status(500).send({
            message: "Internal server error. Registration error!", 
            received: req.body,
            error: err,
        });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    //Requisicao faltando informacoes
    if (!email || !password){
        return res.status(400).send("Email or password missing from request");
    }

    //Busca no banco
    try{
        const usuario = await User.findOne({email}).select("+password");
        //Usuario nao encontrado
        if (!usuario){
            return res.status(404).send("Error: User not found");
        }
        //Senha nao corresponde
        if (! await bcrypt.compare(password, usuario.password)){
            return res.status(403).send("Error: email or password wrong");
        }

        //A partir daqui, usuario existe e entrou com a senha correta.
        usuario.password = undefined;
        const token =jwt.sign({ id: usuario.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        return res.send({usuario, token});
    } catch (error) {
        return res.status(500).send("Internal server error. Login error!");
    }
})

module.exports = (app) => app.use("/auth", router);