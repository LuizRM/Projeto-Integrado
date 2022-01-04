const express = require("express");

const router = express.Router();

router.get("/produtos", (req, res) => {
    res.send({ok: true});
    console.log(res);
});

module.exports = app => app.use("/info", router);