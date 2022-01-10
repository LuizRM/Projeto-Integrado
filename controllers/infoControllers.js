const express = require("express");
const User = require("../models/user");


const router = express.Router();

router.post("/update", async (req, res) => {
    const {idG, newName} = req.body;

    console.log("Id: " + idG);

    const retorno = await User.updateOne({id: idG}, {name: newName});
    console.log(retorno.modifiedCount);
    res.send("OK");

});

module.exports = app => app.use("/info", router);