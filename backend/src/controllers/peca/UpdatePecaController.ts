import { Request, Response } from "express";
import { UpdatePecaService } from "../../services/peca/UpdatePecaService";

class UpdatePecaController {
  async handle(req: Request, res: Response) {
    let { peca_id, nome, desc, hrProd, minProd, lucroDesejado } = req.body;

    hrProd = Number(hrProd);
    minProd = Number(minProd);
    lucroDesejado = Number(lucroDesejado);

    try {
      if (!peca_id || !nome || !desc || !hrProd || !minProd || !lucroDesejado) {
        return res
          .status(400)
          .json({ message: "Erro ao atualizar peça. Dados faltantes." });
      }

      const updatePeca = new UpdatePecaService();

      if (!req.file) {
        const banner = null;
        const updatedPeca = await updatePeca.execute({
          peca_id,
          nome,
          desc,
          hrProd,
          minProd,
          lucroDesejado,
          banner,
        });
        
        return res.status(201).json(updatedPeca);
      } else {
        const { filename: banner } = req.file;
        const updatedPeca = await updatePeca.execute({
          peca_id,
          nome,
          desc,
          hrProd,
          minProd,
          lucroDesejado,
          banner,
        });
       
        return res.status(201).json(updatedPeca);
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const updatePeca = new UpdatePecaService();

    // if(!req.file) {
    //   const banner = null;
    //   const updatedPeca = await updatePeca.execute({peca_id, nome, desc, hrProd, minProd, lucroDesejado, banner});

    //   return res.json(updatedPeca);
    // }
    //   else
    // {
    //   const {filename: banner} = req.file;
    //   const updatedPeca = await updatePeca.execute({peca_id, nome, desc, hrProd, minProd, lucroDesejado, banner});

    //   return res.json(updatedPeca);
    // }
  }
}

export { UpdatePecaController };
