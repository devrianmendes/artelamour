import {Request, Response} from 'express';
import { UpdatePecaMateriaisService } from '../../services/pecaMateriais/UpdatePecaMateriaisService';

class UpdatePecaMateriaisController {
  async handle(req: Request, res: Response) {
    const {id, qtdMatUsado, unMedidaUsado} = req.body;

    const update = new UpdatePecaMateriaisService();
    const up = await update.execute({id, qtdMatUsado, unMedidaUsado});

    return res.json(up);
  }
}

export {UpdatePecaMateriaisController}