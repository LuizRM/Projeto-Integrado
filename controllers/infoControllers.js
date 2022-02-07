const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authkey");
const res = require("express/lib/response");


const router = express.Router();
router.use(authMiddleware);

router.post("/update", async (req, res) => {
    const {idG, newName} = req.body;

    console.log("Id: " + idG);

    const retorno = await User.updateOne({id: idG}, {name: newName});
    console.log(retorno.modifiedCount);
    res.send("OK");

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