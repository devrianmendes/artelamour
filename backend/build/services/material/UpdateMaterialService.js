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
exports.UpdateMaterialService = void 0;
const prisma_1 = require("../../prisma");
class UpdateMaterialService {
    execute({ nome, desc, qtdCusto, unMedCusto, tipoMedida, custo, material_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateMaterial = yield prisma_1.prismaClient.material.update({
                    where: {
                        id: material_id,
                    },
                    data: {
                        nome: nome,
                        desc: desc,
                        quantidadeCusto: qtdCusto,
                        unidadeMedidaCusto: unMedCusto,
                        custo: custo,
                        tipoMedida: tipoMedida,
                    },
                });
                return updateMaterial;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Erro na conexão com o banco de dados. " + err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
            // const updateMaterial = await prismaClient.material.update({
            //   where: {
            //     id: material_id,
            //   },
            //   data: {
            //     nome: nome,
            //     desc: desc,
            //     quantidadeCusto: qtdCusto,
            //     unidadeMedidaCusto: unMedCusto,
            //     custo: custo,
            //     tipoMedida: tipoMedida,
            //   },
            // });
            // return updateMaterial;
        });
    }
}
exports.UpdateMaterialService = UpdateMaterialService;
