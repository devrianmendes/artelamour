import {Request, Response} from 'express';
import { CreatePecaMateriaisService } from '../../services/pecaMateriais/CreatePecaMateriaisService';

class CreatePecaMateriaisController{
  async handle(req: Request, res: Response) {
    const {peca_id, material_id, qtdMatUsado, unMedidaUsado} = req.body;

    const createPecaMateriais = new CreatePecaMateriaisService();
    const create = await createPecaMateriais.execute({peca_id, material_id, qtdMatUsado, unMedidaUsado})
    
    return res.json(create)
  }
}

export {CreatePecaMateriaisController}