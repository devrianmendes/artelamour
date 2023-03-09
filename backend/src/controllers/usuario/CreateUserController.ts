import {Request, Response} from 'express';
import { CreateUserService } from "../../services/usuario/CreateUserService"


class CreateUserController {
  async handle(req: Request, res: Response) {
    const {nome, apelido, email, senha} = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({nome, apelido, email, senha});
    return res.json(user)
  }
}

export {CreateUserController}