import { prismaClient } from "../../prisma";
import { hash } from 'bcryptjs'

interface CreateUser{
  nome: string,
  apelido: string,
  email: string,
  senha: string
}

class CreateUserService {
  async execute ({nome, apelido, email, senha}: CreateUser)

  {
    if(!nome || !apelido || !email || !senha) {
      return "Preencha os dados";
    }

    const emailAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })
    
    if(emailAlreadyExist) {
      return "Email já cadastrado"
    }

    const senhaHash = await hash(senha, 8);

    const user = await prismaClient.user.create({
      data: {
        nome: nome,
        apelido: apelido,
        email: email,
        senha: senhaHash
      },
      select: {
        id: true,
        nome: true,
        apelido: true,
        email: true
      }
    })
    return user;
  }
}

export { CreateUserService }