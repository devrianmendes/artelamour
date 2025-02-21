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
exports.UpdatePecaController = void 0;
const UpdatePecaService_1 = require("../../services/peca/UpdatePecaService");
class UpdatePecaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { peca_id, nome, desc, hrProd, minProd, lucroDesejado } = req.body;
            hrProd = Number(hrProd);
            minProd = Number(minProd);
            lucroDesejado = Number(lucroDesejado);
            try {
                if (!peca_id || !nome || !desc || !hrProd || !minProd || !lucroDesejado) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao atualizar peça. Dados faltantes." });
                }
                const updatePeca = new UpdatePecaService_1.UpdatePecaService();
                if (!req.file) {
                    const banner = null;
                    const updatedPeca = yield updatePeca.execute({
                        peca_id,
                        nome,
                        desc,
                        hrProd,
                        minProd,
                        lucroDesejado,
                        banner,
                    });
                    return res.status(201).json(updatedPeca);
                }
                else {
                    const { filename: banner } = req.file;
                    const updatedPeca = yield updatePeca.execute({
                        peca_id,
                        nome,
                        desc,
                        hrProd,
                        minProd,
                        lucroDesejado,
                        banner,
                    });
                    return res.status(201).json(updatedPeca);
                }
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
exports.UpdatePecaController = UpdatePecaController;
