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
router.post('/user/create', new CreateUserController().handle);
router.post('/user/auth', new AuthUserController().handle);


//ROTAS MATERIAL
router.delete('/material/delete', isAuthenticated, checkMaterial, new DeleteMaterialController().handle);
router.post('/material/create', isAuthenticated, new CreateMaterialController().handle);
router.put('/material/update', isAuthenticated, new UpdateMaterialController().handle);
router.get('/material/list', isAuthenticated, new ListMaterialController().handle);


//ROTAS PECA
router.delete('/peca/delete', isAuthenticated, new DeletePecaController().handle);
router.post('/peca/create', isAuthenticated, new CreatePecaController().handle);
router.put('/peca/update', isAuthenticated, upload.single('file'), new UpdatePecaController().handle);
router.get('/peca/list', isAuthenticated, new ListPecaController().handle);

//ROTAS PECAMATERIAL
router.delete('/pecaMaterial/delete', isAuthenticated, new DeletePecaMateriaisController().handle);
router.post('/pecaMaterial/create', isAuthenticated, new CreatePecaMateriaisController().handle);
router.put('/pecaMaterial/update', isAuthenticated, new UpdatePecaMateriaisController().handle);
router.get('/pecaMaterial/list', isAuthenticated, new ListPecaMateriaisController().handle);


export default router;