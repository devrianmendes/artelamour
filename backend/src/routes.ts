import Router from 'express';

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

import { isAuthenticated } from './middlewares/isAuthenticated'
import { ListPecaController } from './controllers/peca/ListPecaController';

const router = Router();

//ROTAS USER
router.get('/user/details', isAuthenticated, new DetailUserController().handle);
router.post('/user/create', new CreateUserController().handle);
router.post('/user/auth', new AuthUserController().handle);


//ROTAS MATERIAL
router.delete('/material/delete', isAuthenticated, new DeleteMaterialController().handle);
router.post('/material/create', isAuthenticated, new CreateMaterialController().handle);
router.put('/material/update', isAuthenticated, new UpdateMaterialController().handle);
router.get('/material/list', isAuthenticated, new ListMaterialController().handle);


//ROTAS PECA
router.delete('/peca/delete', isAuthenticated, new DeletePecaController().handle);
router.post('/peca/create', isAuthenticated, new CreatePecaController().handle);
router.put('/peca/update', isAuthenticated, new UpdatePecaController().handle);
router.get('/peca/list', isAuthenticated, new ListPecaController().handle);

//ROTAS PECAMATERIAL
router.delete('/pecaMaterial/delete', isAuthenticated, new DeletePecaMateriaisController().handle);
router.post('/pecaMaterial/create', isAuthenticated, new CreatePecaMateriaisController().handle);
router.put('/pecaMaterial/update', isAuthenticated, new UpdatePecaMateriaisController().handle);
router.get('/pecaMaterial/list', isAuthenticated, new ListPecaMateriaisController().handle);


export default router;