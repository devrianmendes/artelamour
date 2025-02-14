import { Request, Response } from "express";
import { CreatePecaMateriaisService } from "../../services/pecaMateriais/CreatePecaMateriaisService";

class CreatePecaMateriaisController {
  async handle(req: Request, res: Response) {
    const { peca_id, material_id, qtdMatUsado, unMedidaUsado } = req.body;

    try {
      if (!peca_id || !material_id || !qtdMatUsado || !unMedidaUsado) {
        return res
          .status(400)
          .json({ message: "Erro ao vincular material. Dados faltantes." });
      }
      const createPecaMateriais = new CreatePecaMateriaisService();
      const createdPeca = await createPecaMateriais.execute({
        peca_id,
        material_id,
        qtdMatUsado,
        unMedidaUsado,
      });

      
      return res.status(201).json(createdPeca);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // console.log(peca_id, material_id, qtdMatUsado, unMedidaUsado)
    // const createPecaMateriais = new CreatePecaMateriaisService();
    // const create = await createPecaMateriais.execute({peca_id, material_id, qtdMatUsado, unMedidaUsado})

    // return res.json(create);
  }
}

export { CreatePecaMateriaisController };
