import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "2a07d8f0b1d7f74b71a93e65e7e46b3a1d56c3c4a33e7f2b6d22b5aa3d6f8c10";

interface TokenPayload {
  sub: number;
  iat: number;
  exp: number;
}

export const autenticar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    // salva o id do usuário na requisição para uso futuro
    (req as any).usuarioId = decoded.sub;
    return next();
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};
