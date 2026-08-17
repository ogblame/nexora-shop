import { Router } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const isUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUser) {
    await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
    });
  } else {
    return res.json({ message: "Пользователь уже создан" });
  }

  res.json({
    message: "Пользователь успешно зарегистрирован",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.json({ message: "Пользователь не найден!" });
  }

  if (user) {
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" },
      );
      console.log(token);
      return res.json({ token: token });
    } else {
      res.json({ message: "Неверный пароль!" });
    }
  }
});

export default router;

router.get("/me", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
});
