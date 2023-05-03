import {Request, Response} from 'express';
import { ListMaterialService } from '../../services/material/ListMaterialService';

class ListMaterialController {
  async handle(req: Request, res: Response) {
    const user = req.query.user as string;

    const listMaterial = new ListMaterialService();
    const list = await listMaterial.execute({user});
    return res.json(list);
  }
}

export { ListMaterialController }