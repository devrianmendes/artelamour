import { Request, Response } from "express";
import { ListPecaMateriaisService } from "../../services/pecaMateriais/ListPecaMateriaisService";

class ListPecaMateriaisController{
  async handle(req: Request, res: Response) {

    const peca_id = req.query.peca_id as string;
    const listPecaMateriais = new ListPecaMateriaisService();
    const list = await listPecaMateriais.execute({peca_id})

    return res.json(list);
  }
}

export {ListPecaMateriaisController}