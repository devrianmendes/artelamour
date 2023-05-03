import { Request, Response } from 'express';
import { ListPecaService } from '../../services/peca/ListPecaService';

class ListPecaController {
  async handle(req: Request, res: Response) {

    const user = req.query.user as string;

    const listPeca = new ListPecaService();
    const list = await listPeca.execute({user});

    return res.json(list);
  }
}

export { ListPecaController }