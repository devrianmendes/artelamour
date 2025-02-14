import { Request, Response } from "express";
import { AuthUserService } from "../../services/usuario/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: "Erro ao authenticar. Dados faltantes." });
      }
      const authService = new AuthUserService();
      const detailedUser = await authService.execute({
        email,
        senha,
      });

      
      return res.status(201).json(detailedUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado." });
      }
    }
    // try {
    //   const authService = new AuthUserService();
    //   const authorization = await authService.execute({email, senha});
    //   return res.json(authorization);
    // } catch (err) {
    //   return res.status(401).json(err.message);
    // }
  }
}

export { AuthUserController };
