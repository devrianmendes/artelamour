import { Request, Response } from "express";
import { CreatePecaService } from "../../services/peca/CreatePecaService";

class CreatePecaController {
  async handle(req: Request, res: Response) {
    const { nome, desc, hrProd, minProd, lucroDesejado, user } = req.body;

    try {
      if (!nome || !desc || !hrProd || !minProd || !lucroDesejado || !user) {
        return res
          .status(400)
          .json({ message: "Erro ao criar peça. Dados faltantes." });
      }
      const createPeca = new CreatePecaService();
      const peca = await createPeca.execute({
        nome,
        desc,
        hrProd,
        minProd,
        lucroDesejado,
        user,
      });

      return res.status(201).json(peca);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
  }
}

export { CreatePecaController };
