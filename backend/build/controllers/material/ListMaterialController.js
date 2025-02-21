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
exports.ListMaterialController = void 0;
const ListMaterialService_1 = require("../../services/material/ListMaterialService");
class ListMaterialController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.query.user;
            try {
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao listar materiais. Dados faltantes." });
                }
                const listMaterial = new ListMaterialService_1.ListMaterialService();
                const list = yield listMaterial.execute({ user });
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
            // const listMaterial = new ListMaterialService();
            // const list = await listMaterial.execute({user});
            // return res.json(list);
        });
    }
}
exports.ListMaterialController = ListMaterialController;
