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
exports.CreatePecaMateriaisService = void 0;
const prisma_1 = require("../../prisma");
class CreatePecaMateriaisService {
    execute({ peca_id, material_id, qtdMatUsado, unMedidaUsado, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const create = prisma_1.prismaClient.pecaMateriais.create({
                    data: {
                        peca_id: peca_id,
                        material_id: material_id,
                        qtdMatUsado: qtdMatUsado,
                        unMedidaUsado: unMedidaUsado,
                    },
                });
                return create;
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
exports.CreatePecaMateriaisService = CreatePecaMateriaisService;
