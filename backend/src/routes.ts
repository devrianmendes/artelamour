import Router from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/usuario/CreateUserController';
import { AuthUserController } from './controllers/usuario/AuthUserController';
import { DetailUserController } from './controllers/usuario/DetailUserController';

import { CreateMaterialController } from './controllers/material/CreateMaterialController';
import { DeleteMaterialController } from './controllers/material/DeleteMaterialController';
import { UpdateMaterialController } from './controllers/material/UpdateMaterialController';
import { ListMaterialController } from './controllers/material/ListMaterialController';


import { CreatePecaController } from './controllers/peca/CreatePecaController';
import { DeletePecaController } from './controllers/peca/DeletePecaController';
import { UpdatePecaController } from './controllers/peca/UpdatePecaController';

import { CreatePecaMateriaisController } from './controllers/pecaMateriais/CreatePecaMateriaisController';
import { ListPecaMateriaisController } from './controllers/pecaMateriais/ListPecaMateriaisController';
import { DeletePecaMateriaisController } from './controllers/pecaMateriais/DeletePecaMateriaisController';
import { UpdatePecaMateriaisController } from './controllers/pecaMateriais/UpdatePecaMateriaisController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { checkMaterial } from './middlewares/checkMaterial';
import { ListPecaController } from './controllers/peca/ListPecaController';

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//ROTAS USER
router.get('/user/details', isAuthenticated, new DetailUserController().handle);
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

//ROTAS PECA
router.delete('/peca/:id/delete', isAuthenticated, new DeletePecaController().handle);
router.post('/peca', isAuthenticated, new CreatePecaController().handle);
router.patch('/peca/:id', isAuthenticated, upload.single('file'), new UpdatePecaController().handle);
router.get('/peca', isAuthenticated, new ListPecaController().handle);

//ROTAS MATERIAL
router.delete('/material/:id/delete', isAuthenticated, checkMaterial, new DeleteMaterialController().handle);
router.post('/material', isAuthenticated, new CreateMaterialController().handle);
router.put('/material/:id/update', isAuthenticated, new UpdateMaterialController().handle);
router.get('/material', isAuthenticated, new ListMaterialController().handle);

//ROTAS PECAMATERIAL
router.delete('/pecaMaterial/:id', isAuthenticated, new DeletePecaMateriaisController().handle);
router.post('/pecaMaterial', isAuthenticated, new CreatePecaMateriaisController().handle);
router.patch('/pecaMaterial/:id', isAuthenticated, new UpdatePecaMateriaisController().handle);
router.get('/pecaMaterial', isAuthenticated, new ListPecaMateriaisController().handle);

export default router;