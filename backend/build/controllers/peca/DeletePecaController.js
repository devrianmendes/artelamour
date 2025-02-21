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
exports.DeletePecaController = void 0;
const DeletePecaService_1 = require("../../services/peca/DeletePecaService");
class DeletePecaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { peca_id } = req.body;
            try {
                if (!peca_id) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao deletar peça. Dados faltantes." });
                }
                const createPeca = new DeletePecaService_1.DeletePecaService();
                const deletedPeca = yield createPeca.execute({
                    peca_id,
                });
                return res.status(201).json(deletedPeca);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
            // const deletePeca = new DeletePecaService();
            // const deletedPeca = await deletePeca.execute({peca_id});
            // return res.json(deletedPeca);
        });
    }
}
exports.DeletePecaController = DeletePecaController;
