import { prismaClient } from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthService {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthService) {
    try {
      const authUser = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!authUser) {
        throw new Error("Usuário não existe");
      }

      const authSenha = await compare(senha, authUser.senha);
      if (!authSenha) {
        throw new Error("Usuário ou senha incorreta.");
      }

      const token = sign(
        {
          nome: authUser.nome,
          apelido: authUser.apelido,
          email: authUser.email,
        },
        process.env.SECRET,
        {
          subject: authUser.id,
          expiresIn: "30d",
        }
      );
      return {
        id: authUser.id,
        nome: authUser.nome,
        apelido: authUser.apelido,
        email: authUser.email,
        token: token,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const authUser = await prismaClient.user.findFirst({
    //   where: {
    //     email: email
    //   }
    // })

    // if(!authUser) {
    //   throw new Error('Usuário não existe')
    // }

    // const authSenha = await compare(senha, authUser.senha);
    // if(!authSenha) {
    //   throw new Error('Usuário ou senha incorreta.');
    // }

    // const token = sign(
    //   {
    //     nome: authUser.nome,
    //     apelido: authUser.apelido,
    //     email: authUser.email
    //   },
    //   process.env.SECRET,
    //   {
    //     subject: authUser.id,
    //     expiresIn: '30d'
    //   }
    // )
    // return {
    //   id: authUser.id,
    //   nome: authUser.nome,
    //   apelido: authUser.apelido,
    //   email: authUser.email,
    //   token: token
    // }
  }
}

export { AuthUserService };
