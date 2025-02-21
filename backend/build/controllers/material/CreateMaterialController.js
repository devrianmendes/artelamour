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
exports.CreateMaterialController = void 0;
const CreateMaterialService_1 = require("../../services/material/CreateMaterialService");
class CreateMaterialController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, desc, qtdCusto, tipoMedida, unMedCusto, custo, user } = req.body;
            try {
                if (!nome ||
                    !desc ||
                    !qtdCusto ||
                    !tipoMedida ||
                    !unMedCusto ||
                    !custo ||
                    !user) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao criar material. Dados faltantes." });
                }
                const createMaterialService = new CreateMaterialService_1.CreateMaterialService();
                const material = yield createMaterialService.execute({
                    nome,
                    desc,
                    qtdCusto,
                    tipoMedida,
                    unMedCusto,
                    custo,
                    user,
                });
                return res.status(201).json(material);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
            // const createMaterial = new CreateMaterialService();
            // const material = await createMaterial.execute({
            //   nome,
            //   desc,
            //   qtdCusto,
            //   tipoMedida,
            //   unMedCusto,
            //   custo,
            //   user,
            // });
            // return res.json(material);
        });
    }
}
exports.CreateMaterialController = CreateMaterialController;
