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
exports.AuthUserService = void 0;
const prisma_1 = require("../../prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute({ email, senha }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authUser = yield prisma_1.prismaClient.user.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (!authUser) {
                    throw new Error("Usuário não existe");
                }
                const authSenha = yield (0, bcryptjs_1.compare)(senha, authUser.senha);
                if (!authSenha) {
                    throw new Error("Usuário ou senha incorreta.");
                }
                const token = (0, jsonwebtoken_1.sign)({
                    nome: authUser.nome,
                    apelido: authUser.apelido,
                    email: authUser.email,
                }, process.env.SECRET, {
                    subject: authUser.id,
                    expiresIn: "30d",
                });
                return {
                    id: authUser.id,
                    nome: authUser.nome,
                    apelido: authUser.apelido,
                    email: authUser.email,
                    token: token,
                };
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
            // const authUser = await prismaClient.user.findFirst({
            //   where: {
            //     email: email
            //   }
            // })
            // if(!authUser) {
            //   throw new Error('Usuário não existe')
            // }
            // const authSenha = await compare(senha, authUser.senha);
            // if(!authSenha) {
            //   throw new Error('Usuário ou senha incorreta.');
            // }
            // const token = sign(
            //   {
            //     nome: authUser.nome,
            //     apelido: authUser.apelido,
            //     email: authUser.email
            //   },
            //   process.env.SECRET,
            //   {
            //     subject: authUser.id,
            //     expiresIn: '30d'
            //   }
            // )
            // return {
            //   id: authUser.id,
            //   nome: authUser.nome,
            //   apelido: authUser.apelido,
            //   email: authUser.email,
            //   token: token
            // }
        });
    }
}
exports.AuthUserService = AuthUserService;
