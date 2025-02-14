import { Request, Response } from "express";
import { UpdateMaterialService } from "../../services/material/UpdateMaterialService";

class UpdateMaterialController {
  async handle(req: Request, res: Response) {
    const { nome, desc, qtdCusto, tipoMedida, unMedCusto, custo, material_id } =
      req.body;

    try {
      if (
        !nome ||
        !desc ||
        !qtdCusto ||
        !tipoMedida ||
        !unMedCusto ||
        !custo ||
        !material_id
      ) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar material. Dados faltantes." });
      }
      const updateMaterial = new UpdateMaterialService();
      const updatedMaterial = await updateMaterial.execute({
        nome,
        desc,
        qtdCusto,
        tipoMedida,
        unMedCusto,
        custo,
        material_id,
      });

      
      return res.status(201).json(updatedMaterial);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const updateMaterial = new UpdateMaterialService();
    // const updatedMaterial = await updateMaterial.execute({
    //   nome,
    //   desc,
    //   qtdCusto,
    //   tipoMedida,
    //   unMedCusto,
    //   custo,
    //   material_id,
    // });

    // return res.json(updatedMaterial);
  }
}

export { UpdateMaterialController };
