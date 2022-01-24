const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).send({"error":"Authorization token not provided"});
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2){
        return res.status(400).send({"error":"Token error"});
    }

    const [type, token] = parts;

    if(!/^Bearer$/i.test(type)){ //checa se o header de autorizacao comeca com 'Bearer'
        return res.status(400).send({"error": "Token format is wrong"});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({"error": "Invalid auth token"});
        }

        req.userId = decoded.id;
        return next();
    })
}