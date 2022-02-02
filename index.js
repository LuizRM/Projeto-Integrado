//Importacao de bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
require('dotenv').config();

//Definicoes e configuracoes
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const uri = process.env.mongodb;

//Conexão com o banco de dados
mongoose.connect(uri, (err, client) => {
    if(err){
        console.log("Erro ao se conectar no banco")
        return console.error(err);
    }
    console.log("Conectou no banco");
})

app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando!"));

//Importação dos controllers
require("./controllers/authController")(app);
require("./controllers/infoControllers")(app);
require("./controllers/productControllers")(app);

app.get("/", (req, res) => {
    res.send("Seu acesso foi computado!");
})
