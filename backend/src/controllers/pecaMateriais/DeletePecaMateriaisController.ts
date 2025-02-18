import { Request, Response } from "express";
import { DeletePecaMateriaisService } from "../../services/pecaMateriais/DeletePecaMateriaisService";

class DeletePecaMateriaisController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    try {
      if (!id) {
        return res
          .status(400)
          .json({ message: "Erro ao desvincular material. Dados faltantes." });
      }
      const deleteService = new DeletePecaMateriaisService();
      const deletedMaterial = await deleteService.execute({
        id
      });

      return res.status(201).json(deletedMaterial);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { DeletePecaMateriaisController };
