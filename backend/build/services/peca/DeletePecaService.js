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
exports.DeletePecaService = void 0;
const prisma_1 = require("../../prisma");
const node_fs_1 = require("node:fs");
class DeletePecaService {
    execute({ peca_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerVerify = yield prisma_1.prismaClient.peca.findFirst({
                    where: {
                        id: peca_id,
                    },
                    select: {
                        banner: true,
                    },
                });
                if (!!bannerVerify.banner) {
                    (0, node_fs_1.unlink)(`tmp/${bannerVerify.banner}`, (err) => {
                        if (err)
                            console.log(err);
                    });
                }
                const deletePeca = yield prisma_1.prismaClient.peca.delete({
                    where: {
                        id: peca_id,
                    },
                    select: {
                        nome: true,
                        desc: true,
                    },
                });
                yield prisma_1.prismaClient.pecaMateriais.deleteMany({
                    where: {
                        peca_id: peca_id,
                    },
                });
                return deletePeca;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Erro na conexão com o banco de dados. " + err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
        });
    }
}
exports.DeletePecaService = DeletePecaService;
