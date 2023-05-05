import {Request, Response} from 'express';
import { AuthUserService } from '../../services/usuario/AuthUserService';

class AuthUserController{
  async handle(req: Request, res: Response) {
    const {email, senha} = req.body;

    try {
      const authService = new AuthUserService();
      const authorization = await authService.execute({email, senha});
      return res.json(authorization);
    } catch (err) {
      return res.status(401).json(err.message);
    }
  }
}

export {AuthUserController}