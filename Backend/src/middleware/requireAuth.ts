import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
type AuthRequest = Request & {
  userId?: number;
};
export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.userId = user.id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
