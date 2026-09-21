import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export async function requireAdmin(
  req: Request,
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
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  } catch (err) {
    console.error("requireAdmin error:", err);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
