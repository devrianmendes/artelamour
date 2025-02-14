import { Request, Response } from "express";
import { ListPecaMateriaisService } from "../../services/pecaMateriais/ListPecaMateriaisService";

class ListPecaMateriaisController {
  async handle(req: Request, res: Response) {
    const peca_id = req.query.peca_id as string;
    try {
      if (!peca_id) {
        return res
          .status(400)
          .json({
            message: "Erro ao listar materiais vinculados. Dados faltantes.",
          });
      }
      const listPecaMateriais = new ListPecaMateriaisService();
      const list = await listPecaMateriais.execute({
        peca_id,
      });

      
      return res.status(201).json(list);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }

    // const listPecaMateriais = new ListPecaMateriaisService();
    // const list = await listPecaMateriais.execute({peca_id})

    // return res.json(list);
  }
}

export { ListPecaMateriaisController };
