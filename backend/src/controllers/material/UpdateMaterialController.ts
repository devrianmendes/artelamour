import { Request, Response} from 'express';
import { UpdateMaterialService } from '../../services/material/UpdateMaterialService';

class UpdateMaterialController{
  async handle(req: Request, res: Response) {

    const { nome, desc, qtdCusto, unMedCusto, custo, material_id } = req.body;

    const updateMaterial = new UpdateMaterialService();
    const updatedMaterial = await updateMaterial.execute({nome, desc, qtdCusto, unMedCusto, custo,material_id});

    return res.json(updatedMaterial);

  }
}

export {UpdateMaterialController}