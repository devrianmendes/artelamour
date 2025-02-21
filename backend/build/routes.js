"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/usuario/CreateUserController");
const AuthUserController_1 = require("./controllers/usuario/AuthUserController");
const DetailUserController_1 = require("./controllers/usuario/DetailUserController");
const CreateMaterialController_1 = require("./controllers/material/CreateMaterialController");
const DeleteMaterialController_1 = require("./controllers/material/DeleteMaterialController");
const UpdateMaterialController_1 = require("./controllers/material/UpdateMaterialController");
const ListMaterialController_1 = require("./controllers/material/ListMaterialController");
const CreatePecaController_1 = require("./controllers/peca/CreatePecaController");
const DeletePecaController_1 = require("./controllers/peca/DeletePecaController");
const UpdatePecaController_1 = require("./controllers/peca/UpdatePecaController");
const CreatePecaMateriaisController_1 = require("./controllers/pecaMateriais/CreatePecaMateriaisController");
const ListPecaMateriaisController_1 = require("./controllers/pecaMateriais/ListPecaMateriaisController");
const DeletePecaMateriaisController_1 = require("./controllers/pecaMateriais/DeletePecaMateriaisController");
const UpdatePecaMateriaisController_1 = require("./controllers/pecaMateriais/UpdatePecaMateriaisController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const checkMaterial_1 = require("./middlewares/checkMaterial");
const ListPecaController_1 = require("./controllers/peca/ListPecaController");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.default)();
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//ROTAS USER
router.get('/user/details', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.post('/user', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
//ROTAS PECA
router.delete('/peca/:id/delete', isAuthenticated_1.isAuthenticated, new DeletePecaController_1.DeletePecaController().handle);
router.post('/peca', isAuthenticated_1.isAuthenticated, new CreatePecaController_1.CreatePecaController().handle);
router.patch('/peca/:id', isAuthenticated_1.isAuthenticated, upload.single('file'), new UpdatePecaController_1.UpdatePecaController().handle);
router.get('/peca', isAuthenticated_1.isAuthenticated, new ListPecaController_1.ListPecaController().handle);
//ROTAS MATERIAL
router.delete('/material/:id/delete', isAuthenticated_1.isAuthenticated, checkMaterial_1.checkMaterial, new DeleteMaterialController_1.DeleteMaterialController().handle);
router.post('/material', isAuthenticated_1.isAuthenticated, new CreateMaterialController_1.CreateMaterialController().handle);
router.put('/material/:id/update', isAuthenticated_1.isAuthenticated, new UpdateMaterialController_1.UpdateMaterialController().handle);
router.get('/material', isAuthenticated_1.isAuthenticated, new ListMaterialController_1.ListMaterialController().handle);
//ROTAS PECAMATERIAL
router.delete('/pecaMaterial/:id', isAuthenticated_1.isAuthenticated, new DeletePecaMateriaisController_1.DeletePecaMateriaisController().handle);
router.post('/pecaMaterial', isAuthenticated_1.isAuthenticated, new CreatePecaMateriaisController_1.CreatePecaMateriaisController().handle);
router.patch('/pecaMaterial/:id', isAuthenticated_1.isAuthenticated, new UpdatePecaMateriaisController_1.UpdatePecaMateriaisController().handle);
router.get('/pecaMaterial', isAuthenticated_1.isAuthenticated, new ListPecaMateriaisController_1.ListPecaMateriaisController().handle);
exports.default = router;
