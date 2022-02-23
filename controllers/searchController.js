const {google} = require('googleapis');
const customSearch = google.customsearch("v1");
require('dotenv').config();

const express = require("express");
const router = express.Router();

router.get("/:term", async (req, res) => {
    const response = await customSearch.cse.list({
        auth: process.env.googleAPIkey,
        cx:  "bda28e1c47e5cc127",
        q: req.params.term,
        num: 5
    })

    return res.status(200).send(response.data.items);
})


module.exports = (app) => app.use("/search", router);