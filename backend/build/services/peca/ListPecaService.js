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
exports.ListPecaService = void 0;
const prisma_1 = require("../../prisma");
class ListPecaService {
    execute({ user }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listPeca = yield prisma_1.prismaClient.peca.findMany({
                    where: {
                        user: user,
                    },
                });
                return listPeca;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Erro na conexão com o banco de dados. " + err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
            // const listPeca = await prismaClient.peca.findMany({
            //   where: {
            //     user: user
            //   }
            // });
            // return listPeca;
        });
    }
}
exports.ListPecaService = ListPecaService;
