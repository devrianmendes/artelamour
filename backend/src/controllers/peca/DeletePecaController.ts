import { Request, Response} from 'express';
import { DeletePecaService } from '../../services/peca/DeletePecaService';

class DeletePecaController{
  async handle(req: Request, res: Response) {

    const { peca_id } = req.body;

    const deletePeca = new DeletePecaService();
    const deletedPeca = await deletePeca.execute({peca_id});

    return res.json(deletedPeca);
  }
}

export {DeletePecaController}