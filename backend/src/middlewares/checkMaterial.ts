import {Request, Response, NextFunction} from 'express';
import { prismaClient } from '../prisma';

export const checkMaterial = async (req: Request, res: Response, next: NextFunction) => {
  const {material_id} = req.body;

  const check = await prismaClient.pecaMateriais.findFirst({
    where: {
      material_id: material_id,
    }
  })

  if(check === null) {
    next();
  } else {
    return res.status(400).json({error: "Este material está vinculado a uma ou mais peças.", id: 1});
  }
}

