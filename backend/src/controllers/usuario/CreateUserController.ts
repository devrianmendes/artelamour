import { Request, Response } from "express";
import { CreateUserService } from "../../services/usuario/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { nome, apelido, email, senha } = req.body;

    try {
      if (!nome || !apelido || !email || !senha) {
        return res
          .status(400)
          .json({ message: "Erro ao criar usuário. Dados faltantes." });
      }
      const createUser = new CreateUserService();
      const deletedMaterial = await createUser.execute({
        nome,
        apelido,
        email,
        senha,
      });

      
      return res.status(201).json(deletedMaterial);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // const createUser = new CreateUserService();
    // const user = await createUser.execute({nome, apelido, email, senha});
    // return res.json(user)
  }
}

export { CreateUserController };
