import { Request, Response } from "express";
import { DeletePecaService } from "../../services/peca/DeletePecaService";

class DeletePecaController {
  async handle(req: Request, res: Response) {
    const { peca_id } = req.body;

    try {
      if (!peca_id) {
        return res
          .status(400)
          .json({ message: "Erro ao deletar peça. Dados faltantes." });
      }
      const createPeca = new DeletePecaService();
      const deletedPeca = await createPeca.execute({
        peca_id,
      });

      
      return res.status(201).json(deletedPeca);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const deletePeca = new DeletePecaService();
    // const deletedPeca = await deletePeca.execute({peca_id});

    // return res.json(deletedPeca);
  }
}

export { DeletePecaController };
