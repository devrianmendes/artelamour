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
exports.ListPecaMateriaisController = void 0;
const ListPecaMateriaisService_1 = require("../../services/pecaMateriais/ListPecaMateriaisService");
class ListPecaMateriaisController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const peca_id = req.query.peca_id;
            try {
                if (!peca_id) {
                    return res
                        .status(400)
                        .json({
                        message: "Erro ao listar materiais vinculados. Dados faltantes.",
                    });
                }
                const listPecaMateriais = new ListPecaMateriaisService_1.ListPecaMateriaisService();
                const list = yield listPecaMateriais.execute({
                    peca_id,
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
            // const listPecaMateriais = new ListPecaMateriaisService();
            // const list = await listPecaMateriais.execute({peca_id})
            // return res.json(list);
        });
    }
}
exports.ListPecaMateriaisController = ListPecaMateriaisController;
