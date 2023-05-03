import { Request, Response } from "express";
import { CreatePecaService } from "../../services/peca/CreatePecaService";

class CreatePecaController {
  async handle(req: Request, res: Response) {
    const {nome, desc, hrProd, minProd, lucroDesejado, user} = req.body;

    const createPeca = new CreatePecaService();
    const peca = await createPeca.execute({nome, desc, hrProd, minProd, lucroDesejado, user});
    return res.json(peca)
  }
}

export { CreatePecaController }