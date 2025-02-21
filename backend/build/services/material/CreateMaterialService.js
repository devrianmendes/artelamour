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
exports.CreateMaterialService = void 0;
const prisma_1 = require("../../prisma");
class CreateMaterialService {
    execute({ nome, desc, qtdCusto, unMedCusto, tipoMedida, custo, user, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const createMaterial = await prismaClient.material.create({
            //   data: {
            //     nome: nome,
            //     desc: desc,
            //     quantidadeCusto: qtdCusto,
            //     unidadeMedidaCusto: unMedCusto,
            //     custo: custo,
            //     user: user,
            //     tipoMedida: tipoMedida
            //   },
            //   select: {
            //     nome: true,
            //     desc: true,
            //     tipoMedida: true,
            //     quantidadeCusto: true,
            //     unidadeMedidaCusto: true,
            //     custo: true
            //   }
            // })
            // return createMaterial;
            try {
                const createMaterial = yield prisma_1.prismaClient.material.create({
                    data: {
                        nome: nome,
                        desc: desc,
                        quantidadeCusto: qtdCusto,
                        unidadeMedidaCusto: unMedCusto,
                        custo: custo,
                        user: user,
                        tipoMedida: tipoMedida,
                    },
                    select: {
                        nome: true,
                        desc: true,
                        tipoMedida: true,
                        quantidadeCusto: true,
                        unidadeMedidaCusto: true,
                        custo: true,
                    },
                });
                return createMaterial;
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
exports.CreateMaterialService = CreateMaterialService;
