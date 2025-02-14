import { Request, Response } from "express";
import { ListMaterialService } from "../../services/material/ListMaterialService";

class ListMaterialController {
  async handle(req: Request, res: Response) {
    const user = req.query.user as string;

    try {
      if (!user) {
        return res
          .status(400)
          .json({ message: "Erro ao listar materiais. Dados faltantes." });
      }
      const listMaterial = new ListMaterialService();
      const list = await listMaterial.execute({ user });

      
      return res.status(201).json(list);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const listMaterial = new ListMaterialService();
    // const list = await listMaterial.execute({user});
    // return res.json(list);
  }
}

export { ListMaterialController };
