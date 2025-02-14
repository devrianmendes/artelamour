import { Request, Response } from "express";
import { DeleteMaterialService } from "../../services/material/DeleteMaterialService";

class DeleteMaterialController {
  async handle(req: Request, res: Response) {
    const { material_id } = req.body;

    // const deleteMaterial = new DeleteMaterialService();
    // const deletedMaterial = await deleteMaterial.execute({ material_id });

    // return res.json(deletedMaterial);

    try {
      if (!material_id) {
        return res
          .status(400)
          .json({ message: "Erro ao deletar material. Dados faltantes." });
      }
      const deleteMaterial = new DeleteMaterialService();
      const deletedMaterial = await deleteMaterial.execute({ material_id });

      
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

export { DeleteMaterialController };
