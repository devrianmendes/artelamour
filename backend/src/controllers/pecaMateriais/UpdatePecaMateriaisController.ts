import { Request, Response } from "express";
import { UpdatePecaMateriaisService } from "../../services/pecaMateriais/UpdatePecaMateriaisService";

class UpdatePecaMateriaisController {
  async handle(req: Request, res: Response) {
    const { id, qtdMatUsado, unMedidaUsado } = req.body;

    try {
      if (!id || !qtdMatUsado || !unMedidaUsado) {
        return res.status(400).json({
          message: "Erro ao atualizar materiais vinculados. Dados faltantes.",
        });
      }
      const update = new UpdatePecaMateriaisService();
      const up = await update.execute({
        id,
        qtdMatUsado,
        unMedidaUsado,
      });

      return res.status(201).json(up);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { UpdatePecaMateriaisController };
