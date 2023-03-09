import {Request, Response} from 'express';
import { AuthUserService } from '../../services/usuario/AuthUserService';

class AuthUserController{
  async handle(req: Request, res: Response) {
    const {email, senha} = req.body;

    const authService = new AuthUserService();
    const authorization = await authService.execute({email, senha});
    return res.json(authorization);
  }
}

export {AuthUserController}