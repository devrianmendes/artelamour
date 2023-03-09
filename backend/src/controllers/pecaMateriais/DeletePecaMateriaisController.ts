import {Request, Response} from 'express';
import { DeletePecaMateriaisService } from '../../services/pecaMateriais/DeletePecaMateriaisService';

class DeletePecaMateriaisController {
  async handle(req: Request, res: Response) {
    
    const {id} = req.body;

    const deleteService = new DeletePecaMateriaisService();
    const deleteMaterial = await deleteService.execute({id});
    
    return res.json(deleteMaterial);
  }
}

export {DeletePecaMateriaisController};