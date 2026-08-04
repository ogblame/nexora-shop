import e, { Router } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  console.log(prisma);
  console.log(prisma.user);

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
      return res.json({ message: "Вы успешно авторизованы!" });
    } else {
      res.json({ message: "Неверный пароль!" });
    }
  }
});

export default router;
