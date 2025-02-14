import { Request, Response } from "express";
import { ListPecaService } from "../../services/peca/ListPecaService";

class ListPecaController {
  async handle(req: Request, res: Response) {
    const user = req.query.user as string;


    try {
      if (!user) {
        return res
          .status(400)
          .json({ message: "Erro ao listar peças. Dados faltantes." });
      }
      const listPeca = new ListPecaService();
      const list = await listPeca.execute({
        user,
      });

      return res.status(201).json(list);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const listPeca = new ListPecaService();
    // const list = await listPeca.execute({user});

    // return res.json(list);
  }
}

export { ListPecaController };
