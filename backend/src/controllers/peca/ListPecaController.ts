import { Request, Response } from 'express';
import { ListPecaService } from '../../services/peca/ListPecaService';

class ListPecaController {
  async handle(req: Request, res: Response) {
    const listPeca = new ListPecaService();
    const list = await listPeca.execute();

    return res.json(list);
  }
}

export { ListPecaController }