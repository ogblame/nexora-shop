import express from "express";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const app = express();
app.use(express.json());
const PORT = 3000;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({
  adapter,
});

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

  response.json(product);

  if (!product) {
    response.status(404);
    response.send("Продукт не найден =(");
  }

  response.json(product);
});

app.post("/api/products/", async (req, res) => {
  const { name, price, description, quantity } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      quantity,
    },
  });
  res.status(201).json(product);
});

app.patch("/api/products/:id", async (req, res) => {
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

app.delete("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);

  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  res.json(product);
});

app.get("/", (request, response) => {
  response.send("Backend работает");
});

app.listen(PORT);
