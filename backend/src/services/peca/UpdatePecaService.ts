import { prismaClient } from "../../prisma";

interface UpdatePeca{
  peca_id: string,
  nome: string,
  desc: string,
  hrProd: number,
  minProd: number,
  lucroDesejado: number
}

class UpdatePecaService{
  async execute({nome, desc, hrProd, minProd, lucroDesejado, peca_id}: UpdatePeca) {
    const updatePeca = await prismaClient.peca.update({
      where: {
        id: peca_id
      },
      data: {
        nome,
        desc,
        hrProd,
        minProd,
        lucroDesejado
      }
    })
    return updatePeca;
  }
}

export { UpdatePecaService }