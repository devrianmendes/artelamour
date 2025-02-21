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
exports.checkMaterial = void 0;
const prisma_1 = require("../prisma");
const checkMaterial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { material_id } = req.body;
    const check = yield prisma_1.prismaClient.pecaMateriais.findFirst({
        where: {
            material_id: material_id,
        }
    });
    if (check === null) {
        next();
    }
    else {
        return res.status(400).json({ error: "Este material está vinculado a uma ou mais peças.", id: 1 });
    }
});
exports.checkMaterial = checkMaterial;
