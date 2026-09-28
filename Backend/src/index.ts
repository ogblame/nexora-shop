import { message } from "antd";
import express from "express";
import "dotenv/config";

import cors from "cors";
import authRouter from "./routes/auth.routes";
import { prisma } from "./prisma.ts";
import userRouter from "./routes/user.routes.ts";
import { upload } from "./middleware/upload.ts";
import { requireAdmin } from "./middleware/requireAdmin.ts";
import { requireAuth } from "./middleware/requireAuth.ts";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use("/uploads", express.static("uploads"));

const PORT = 3000;

app.get("/api/products", async (req, response) => {
  try {
    const products = await prisma.product.findMany();
    response.json(products);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/products/:id", async (request, response) => {
  const id = Number(request.params.id);

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    response.status(404);
    response.send("Продукт не найден =(");
  } else {
    response.json(product);
  }
});

app.post(
  "/api/products/",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    const { name, price, description, quantity } = req.body;
    console.log("FILE:", req.file);
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        quantity: Number(quantity),
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      },
    });
    res.status(201).json(product);
  },
);

app.patch("/api/products/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { name, price, description, quantity } = req.body;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      description,
      quantity,
    },
  });
  res.json(product);
});

app.delete("/api/products/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);

  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  res.json(product);
});

app.get("/api/users", requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(users);
});

app.patch("/api/users/:id/role", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { role } = req.body;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });

  res.json(user);
});

app.get("/", (request, response) => {
  response.send("Backend работает");
});

app.get("/api/orders/my", requireAuth, async (req, res) => {
  const userId = req.userId;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  res.json({ orders });
});

app.post("/api/orders", requireAuth, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const { deliveryAddress, phone, items } = req.body;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.some(
      (item) =>
        !Number.isInteger(item.id) ||
        !Number.isInteger(item.count) ||
        item.count <= 0,
    )
  ) {
    return res.status(400).json({
      message: "Invalid order items",
    });
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.id),
      },
    },
  });

  const productMap = new Map(products.map((product) => [product.id, product]));

  if (items.some((item) => !productMap.has(item.id))) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  const orderItems = items.map((item) => {
    const product = productMap.get(item.id)!;

    return {
      productId: product.id,
      count: item.count,
      price: product.price,
    };
  });

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  const order = await prisma.order.create({
    data: {
      userId,
      phone,
      deliveryAddress,
      totalPrice,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
    },
  });

  return res.status(201).json(order);
});

app.listen(PORT);
