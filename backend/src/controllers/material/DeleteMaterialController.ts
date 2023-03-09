import { Request, Response} from 'express';
import { DeleteMaterialService } from '../../services/material/DeleteMaterialService';

class DeleteMaterialController{
  async handle(req: Request, res: Response) {

    const {material_id} = req.body;

    const deleteMaterial = new DeleteMaterialService();
    const deletedMaterial = await deleteMaterial.execute({material_id});

    return res.json(deletedMaterial);

  }
}

export { DeleteMaterialController }