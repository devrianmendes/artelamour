import {Request, Response} from 'express';
import { ListMaterialService } from '../../services/material/ListMaterialService';

class ListMaterialController {
  async handle(req: Request, res: Response) {
    const listMaterial = new ListMaterialService();
    const list = await listMaterial.execute();
    return res.json(list);
  }
}

export { ListMaterialController }