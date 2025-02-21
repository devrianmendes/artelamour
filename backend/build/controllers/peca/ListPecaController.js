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
exports.ListPecaController = void 0;
const ListPecaService_1 = require("../../services/peca/ListPecaService");
class ListPecaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.query.user;
            try {
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao listar peças. Dados faltantes." });
                }
                const listPeca = new ListPecaService_1.ListPecaService();
                const list = yield listPeca.execute({
                    user,
                });
                return res.status(201).json(list);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
            // const listPeca = new ListPecaService();
            // const list = await listPeca.execute({user});
            // return res.json(list);
        });
    }
}
exports.ListPecaController = ListPecaController;
