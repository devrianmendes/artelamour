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
exports.DetailUserController = void 0;
const DetailsUserService_1 = require("../../services/usuario/DetailsUserService");
class DetailUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req;
            try {
                if (!user_id) {
                    return res
                        .status(400)
                        .json({ message: "Erro ao carregar usuário. Dados faltantes." });
                }
                const detailUser = new DetailsUserService_1.DetailsUserService();
                const detailedUser = yield detailUser.execute({
                    user_id,
                });
                return res.status(201).json(detailedUser);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(500).json({ message: "Erro inesperado." });
                }
            }
            // const detailUser = new DetailsUserService();
            // const detail = await detailUser.execute({user_id});
            // return res.json(detail);
        });
    }
}
exports.DetailUserController = DetailUserController;
