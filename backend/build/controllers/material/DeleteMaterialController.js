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
exports.DeleteMaterialController = void 0;
const DeleteMaterialService_1 = require("../../services/material/DeleteMaterialService");
class DeleteMaterialController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { material_id } = req.body;
            // const deleteMaterial = new DeleteMaterialService();
            // const deletedMaterial = await deleteMaterial.execute({ material_id });
            // return res.json(deletedMaterial);
            try {
                if (!material_id) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao deletar material. Dados faltantes." });
                }
                const deleteMaterial = new DeleteMaterialService_1.DeleteMaterialService();
                const deletedMaterial = yield deleteMaterial.execute({ material_id });
                return res.status(201).json(deletedMaterial);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
        });
    }
}
exports.DeleteMaterialController = DeleteMaterialController;
