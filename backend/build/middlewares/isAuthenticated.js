"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end("O usuário precisa estar logado");
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        req.user_id = sub;
        next();
    }
    catch (error) {
        return res.status(401).end('Erro ao conectar');
    }
};
exports.isAuthenticated = isAuthenticated;
