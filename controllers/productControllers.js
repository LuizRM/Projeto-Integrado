const Product = require("../models/product");
const User = require("../models/user");
const express = require("express");

const router = express.Router();

router.put("/", async (req, res) => {
    try{
        const novoProduto = await Product.create(req.body);
        return res.status(200).send(novoProduto);
    } catch (err) {
        console.log("Erro a seguir: ");
        console.log(err);
        return res.status(400).send("No good");
    }
})

router.get("/:productid", async (req, res) => {
    try{
        const produtoAchado = await Product.find({user: req.params.productid});
        return res.status(200).send(produtoAchado);
    } catch (err) {
        console.log(err);
        return res.status(404).send("Product not found");
    }
})

router.delete("/:productid", async (req, res) => {
    try{
        const produtoAchado = await Product.findByIdAndDelete(req.params.productid);
        return res.status(200).send(produtoAchado);
    } catch (err) {
        console.log(err);
        return res.status(404).send("Product not found");
    }
})

module.exports = app => app.use("/product", router);