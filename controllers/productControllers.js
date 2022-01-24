const Product = require("../models/product");
const User = require("../models/user");
const express = require("express");
const authMiddleware = require("../middlewares/authkey");


const router = express.Router();
router.use(authMiddleware);

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
        const produtoAchado = await Product.findById(req.params.productid);
        if (!produtoAchado){
            return res.status(404).send("Product not found")
        }
        return res.status(200).send(produtoAchado);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Bad request");
    }
})

router.get("/user/:userid", async (req, res) => {
    try{
        const produtosAchados = await Product.find({user: req.params.userid});
        return res.status(200).send(produtosAchados);
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