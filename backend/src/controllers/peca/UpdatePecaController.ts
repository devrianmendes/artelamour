import { Request, Response} from 'express';
import { UpdatePecaService } from '../../services/peca/UpdatePecaService';

class UpdatePecaController{
  async handle(req: Request, res: Response) {

    const { peca_id, nome, desc, hrProd, minProd, lucroDesejado } = req.body;
    const updatePeca = new UpdatePecaService();
    const updatedPeca = await updatePeca.execute({peca_id, nome, desc, hrProd, minProd, lucroDesejado});

    return res.json(updatedPeca);
  }
}

export { UpdatePecaController }