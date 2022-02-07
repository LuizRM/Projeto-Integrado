const Product = require("../models/product");
const User = require("../models/user");
const express = require("express");
const authMiddleware = require("../middlewares/authkey");


const router = express.Router();
router.use(authMiddleware);

router.put("/", async (req, res) => {
    try{
        let cadastro = req.body;
        cadastro.user = req.userId;
        const novoProduto = await Product.create(cadastro);
        return res.status(200).send(novoProduto);
    } catch (err) {
        return res.status(500).send("Error: " + err);
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
        return res.status(500).send(err.name + ". Path: " + err.path + ". Value: " + err.value);
    }
})

router.get("/user/:userid", async (req, res) => {
    if (req.userId !== req.params.userid){
        return res.status(403).send("You do not own these products!");
    }
    try{
        const produtosAchados = await Product.find({user: req.params.userid});
        if (produtosAchados.length === 0){
            return res.status(404).send("No products found for this user");
        }
        return res.status(200).send(produtosAchados);
    } catch (err) {
        return res.status(500).send(err.name + ". Path: " + err.path + ". Value: " + err.value);
    }
})

router.delete("/:productid", async (req, res) => {
    try{
        const produtoAchado = await Product.findById(req.params.productid);
        if (!produtoAchado){
            return res.status(404).send("Product not found");
        }
        if (req.userId !== produtoAchado.user.toString()){
            return res.status(403).send("You do not own this product!");
        }
        await Product.findByIdAndDelete(req.params.productid);
        return res.status(200).send("Product deleted");
    } catch (err) {
        return res.status(500).send(err.name + ". Path: " + err.path + ". Value: " + err.value);
    }
})

module.exports = app => app.use("/product", router);