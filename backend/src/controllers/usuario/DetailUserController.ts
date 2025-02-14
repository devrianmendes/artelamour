import { Request, Response } from "express";
import { DetailsUserService } from "../../services/usuario/DetailsUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    try {
      if (!user_id) {
        return res
          .status(400)
          .json({ message: "Erro ao carregar usuário. Dados faltantes." });
      }
      const detailUser = new DetailsUserService();
      const detailedUser = await detailUser.execute({
        user_id,
      });

      
      return res.status(201).json(detailedUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const detailUser = new DetailsUserService();
    // const detail = await detailUser.execute({user_id});

    // return res.json(detail);
  }
}

export { DetailUserController };
