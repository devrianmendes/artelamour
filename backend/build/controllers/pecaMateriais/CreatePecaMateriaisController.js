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
exports.CreatePecaMateriaisController = void 0;
const CreatePecaMateriaisService_1 = require("../../services/pecaMateriais/CreatePecaMateriaisService");
class CreatePecaMateriaisController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { peca_id, material_id, qtdMatUsado, unMedidaUsado } = req.body;
            try {
                if (!peca_id || !material_id || !qtdMatUsado || !unMedidaUsado) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao vincular material. Dados faltantes." });
                }
                const createPecaMateriais = new CreatePecaMateriaisService_1.CreatePecaMateriaisService();
                const createdPeca = yield createPecaMateriais.execute({
                    peca_id,
                    material_id,
                    qtdMatUsado,
                    unMedidaUsado,
                });
                return res.status(201).json(createdPeca);
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
exports.CreatePecaMateriaisController = CreatePecaMateriaisController;
