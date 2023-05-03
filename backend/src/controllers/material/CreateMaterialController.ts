import { Request, Response } from 'express';
import { CreateMaterialService } from '../../services/material/CreateMaterialService';

class CreateMaterialController{
  async handle(req: Request, res: Response) {
    const {nome, desc, qtdCusto, unMedCusto, custo, user} = req.body;

    const createMaterial = new CreateMaterialService();
    const material = await createMaterial.execute({nome, desc, qtdCusto, unMedCusto, custo, user})

    return res.json(material)

  }
}

export {CreateMaterialController}