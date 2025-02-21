"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use(routes_1.default);
dotenv_1.default.config();
// console.log(__dirname + '/../tmp')
server.use('/images', express_1.default.static(__dirname + '/../tmp'));
const port = 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
