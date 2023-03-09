import { Request, Response } from 'express';
import { DetailsUserService } from '../../services/usuario/DetailsUserService';

class DetailUserController {
  async handle(req: Request, res: Response) {

      const {user_id} = req;
      const detailUser = new DetailsUserService();
      const detail = await detailUser.execute({user_id});

      return res.json(detail);
  }
}

export { DetailUserController }