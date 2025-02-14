import { Request, Response } from "express";
import { CreateMaterialService } from "../../services/material/CreateMaterialService";

class CreateMaterialController {
  async handle(req: Request, res: Response) {
    const { nome, desc, qtdCusto, tipoMedida, unMedCusto, custo, user } =
      req.body;

    try {
      if (
        !nome ||
        !desc ||
        !qtdCusto ||
        !tipoMedida ||
        !unMedCusto ||
        !custo ||
        !user
      ) {
        return res
          .status(400)
          .json({ message: "Erro ao criar material. Dados faltantes." });
      }
      const createMaterialService = new CreateMaterialService();
      const material = await createMaterialService.execute({
        nome,
        desc,
        qtdCusto,
        tipoMedida,
        unMedCusto,
        custo,
        user,
      });
      
      return res.status(201).json(material);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }

    // const createMaterial = new CreateMaterialService();
    // const material = await createMaterial.execute({
    //   nome,
    //   desc,
    //   qtdCusto,
    //   tipoMedida,
    //   unMedCusto,
    //   custo,
    //   user,
    // });

    // return res.json(material);
  }
}

export { CreateMaterialController };
