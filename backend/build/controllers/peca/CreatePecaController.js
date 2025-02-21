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
exports.CreatePecaController = void 0;
const CreatePecaService_1 = require("../../services/peca/CreatePecaService");
class CreatePecaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, desc, hrProd, minProd, lucroDesejado, user } = req.body;
            try {
                if (!nome || !desc || !hrProd || !minProd || !lucroDesejado || !user) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao criar peça. Dados faltantes." });
                }
                const createPeca = new CreatePecaService_1.CreatePecaService();
                const peca = yield createPeca.execute({
                    nome,
                    desc,
                    hrProd,
                    minProd,
                    lucroDesejado,
                    user,
                });
                return res.status(201).json(peca);
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
exports.CreatePecaController = CreatePecaController;
