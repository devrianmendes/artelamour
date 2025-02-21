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
exports.UpdateMaterialController = void 0;
const UpdateMaterialService_1 = require("../../services/material/UpdateMaterialService");
class UpdateMaterialController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, desc, qtdCusto, tipoMedida, unMedCusto, custo, material_id } = req.body;
            try {
                if (!nome ||
                    !desc ||
                    !qtdCusto ||
                    !tipoMedida ||
                    !unMedCusto ||
                    !custo ||
                    !material_id) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao atualizar material. Dados faltantes." });
                }
                const updateMaterial = new UpdateMaterialService_1.UpdateMaterialService();
                const updatedMaterial = yield updateMaterial.execute({
                    nome,
                    desc,
                    qtdCusto,
                    tipoMedida,
                    unMedCusto,
                    custo,
                    material_id,
                });
                return res.status(201).json(updatedMaterial);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
            // const updateMaterial = new UpdateMaterialService();
            // const updatedMaterial = await updateMaterial.execute({
            //   nome,
            //   desc,
            //   qtdCusto,
            //   tipoMedida,
            //   unMedCusto,
            //   custo,
            //   material_id,
            // });
            // return res.json(updatedMaterial);
        });
    }
}
exports.UpdateMaterialController = UpdateMaterialController;
