import { prismaClient } from "../../prisma";

interface CreatePeca{
  nome: string,
  desc: string,
  hrProd: number,
  minProd: number,
  lucroDesejado: number
}

class CreatePecaService{
  async execute({nome, desc, hrProd, minProd, lucroDesejado}: CreatePeca) {
    
    const createPeca = await prismaClient.peca.create({
      data: {
        nome: nome,
        desc: desc,
        hrProd: hrProd,
        minProd: minProd,
        lucroDesejado: lucroDesejado
      },
      select: {
        nome: true,
        desc: true  
      }
    })
    return createPeca;
  }
}

export {CreatePecaService}