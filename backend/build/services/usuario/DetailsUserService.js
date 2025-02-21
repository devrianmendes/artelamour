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
exports.DetailsUserService = void 0;
const prisma_1 = require("../../prisma");
class DetailsUserService {
    execute({ user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detailUser = prisma_1.prismaClient.user.findFirst({
                    where: {
                        id: user_id,
                    },
                    select: {
                        id: true,
                        apelido: true,
                        email: true,
                    },
                });
                return detailUser;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Erro na conexão com o banco de dados. " + err.message);
                }
                else {
                    throw new Error("Erro genérico.");
                }
            }
            // const detailUser = prismaClient.user.findFirst({
            //   where: {
            //     id: user_id,
            //   },
            //   select: {
            //     id: true,
            //     apelido: true,
            //     email: true,
            //   },
            // });
            // return detailUser;
        });
    }
}
exports.DetailsUserService = DetailsUserService;
