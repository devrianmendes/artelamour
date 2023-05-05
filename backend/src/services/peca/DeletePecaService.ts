import { prismaClient } from "../../prisma";
import { unlink } from 'node:fs';

interface DeletePeca{
  peca_id: string
}

class DeletePecaService{
  async execute({peca_id}: DeletePeca) {
    const bannerVerify = await prismaClient.peca.findFirst({
      where: {
        id: peca_id
      },
      select: {
        banner: true
      }
    })
    
    if(!!bannerVerify.banner) {
      unlink(`tmp/${bannerVerify.banner}`, (err) => {
        if(err) console.log(err);
      })
    }
    
    const deletePeca = await prismaClient.peca.delete({
      where: {
        id: peca_id
      },
      select: {
        nome: true,
        desc: true  
      }
    });
    
    await prismaClient.pecaMateriais.deleteMany({
      where: {
        peca_id: peca_id
      }
    });

    return deletePeca;
  }
}

export {DeletePecaService}