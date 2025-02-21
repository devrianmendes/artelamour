"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/usuario/AuthUserService");
class AuthUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            try {
                if (!email || !senha) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao authenticar. Dados faltantes." });
                }
                const authService = new AuthUserService_1.AuthUserService();
                const detailedUser = yield authService.execute({
                    email,
                    senha,
                });
                return res.status(201).json(detailedUser);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
            // try {
            //   const authService = new AuthUserService();
            //   const authorization = await authService.execute({email, senha});
            //   return res.json(authorization);
            // } catch (err) {
            //   return res.status(401).json(err.message);
            // }
        });
    }
}
exports.AuthUserController = AuthUserController;
