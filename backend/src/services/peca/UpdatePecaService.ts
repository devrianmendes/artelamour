import { prismaClient } from "../../prisma";
import { unlink } from 'node:fs';

interface UpdatePeca{
  peca_id: string,
  nome: string,
  desc: string,
  hrProd: number,
  minProd: number,
  lucroDesejado: number
  banner: string
}

class UpdatePecaService{
  async execute({nome, desc, hrProd, minProd, lucroDesejado, peca_id, banner}: UpdatePeca) {
    
    if(banner === null) {
      const deleteFile = await prismaClient.peca.findFirst({
        where: {
          id: peca_id
        },
        select: {
          banner: true
        }
      })

      unlink(`tmp/${deleteFile.banner}`, (err) => {
        if(err) console.log(err);
        console.log(`${deleteFile.banner} foi apagada.`);
      })
    }

    const updatePeca = await prismaClient.peca.update({
      where: {
        id: peca_id
      },
      data: {
        nome,
        desc,
        hrProd,
        banner,
        minProd,
        lucroDesejado,
      }
    })
    return updatePeca;
  }
}

export { UpdatePecaService }