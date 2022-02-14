const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authkey");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");


const router = express.Router();
router.use(authMiddleware);

router.post("/update", async (req, res) => {
    let update = req.body

    try{
        if(update.password){
            const hashNovo = await bcrypt.hash(update.password, bcrypt.genSaltSync());
            update.password = hashNovo;
        }
        const retorno = await User.findByIdAndUpdate(req.userId, update);
        return res.status(200).send(retorno);
    } catch (error) {
        console.log("Erro ao atualizar usuario");
        return res.status(500).send("Server error while updating user info");
    }

});

router.delete("/", async (req, res) => {
    try{
        const retorno = await User.findByIdAndDelete(req.userId);
        if(retorno){
            console.log(retorno);
            return res.status(200).send("User deleted!");
        }
    }
    catch(err) {
        return res.status(500).send(err);
    }
});

module.exports = app => app.use("/info", router);