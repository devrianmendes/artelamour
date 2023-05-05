import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.status(401).end("O usuário precisa estar logado");
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, process.env.SECRET) as Payload;
    req.user_id = sub;
    next();
  } catch (error) {
    return res.status(401).end('Erro ao conectar')
  }
}