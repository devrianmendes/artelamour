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
exports.CreateUserService = void 0;
const prisma_1 = require("../../prisma");
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute({ nome, apelido, email, senha }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailAlreadyExist = yield prisma_1.prismaClient.user.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (emailAlreadyExist) {
                    throw new Error("E-mail já cadastrado.");
                }
                const senhaHash = yield (0, bcryptjs_1.hash)(senha, 8);
                const user = yield prisma_1.prismaClient.user.create({
                    data: {
                        nome: nome,
                        apelido: apelido,
                        email: email,
                        senha: senhaHash,
                    },
                    select: {
                        id: true,
                        nome: true,
                        apelido: true,
                        email: true,
                    },
                });
                return user;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
            // if (!nome || !apelido || !email || !senha) {
            //   return "Preencha os dados";
            // }
            // const emailAlreadyExist = await prismaClient.user.findFirst({
            //   where: {
            //     email: email,
            //   },
            // });
            // if (emailAlreadyExist) {
            //   return "Email já cadastrado";
            // }
            // const senhaHash = await hash(senha, 8);
            // const user = await prismaClient.user.create({
            //   data: {
            //     nome: nome,
            //     apelido: apelido,
            //     email: email,
            //     senha: senhaHash,
            //   },
            //   select: {
            //     id: true,
            //     nome: true,
            //     apelido: true,
            //     email: true,
            //   },
            // });
            // return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
