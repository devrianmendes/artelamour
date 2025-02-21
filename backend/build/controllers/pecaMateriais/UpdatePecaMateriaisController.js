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
exports.UpdatePecaMateriaisController = void 0;
const UpdatePecaMateriaisService_1 = require("../../services/pecaMateriais/UpdatePecaMateriaisService");
class UpdatePecaMateriaisController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, qtdMatUsado, unMedidaUsado } = req.body;
            try {
                if (!id || !qtdMatUsado || !unMedidaUsado) {
                    return res.status(400).json({
                        message: "Erro ao atualizar materiais vinculados. Dados faltantes.",
                    });
                }
                const update = new UpdatePecaMateriaisService_1.UpdatePecaMateriaisService();
                const up = yield update.execute({
                    id,
                    qtdMatUsado,
                    unMedidaUsado,
                });
                return res.status(201).json(up);
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
exports.UpdatePecaMateriaisController = UpdatePecaMateriaisController;
