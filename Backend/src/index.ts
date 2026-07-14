import express from "express";

const app = express();

const PORT = 3000;

const products = [
  {
    id: 1,
    name: "Ноутбук ASUS",
    price: 89990,
  },
  {
    id: 2,
    name: "Монитор LG",
    price: 32990,
  },
];

app.use(express.json());

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || typeof price !== "number") {
    return res.status(400).json({
      message: "Нужно передать name и price",
    });
  }
  const newProduct = {
    id: products.length + 1,
    name: name,
    price: price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.get("/", (request, response) => {
  response.send("Backend работает");
});

app.get("/api/products", (request, response) => {
  response.json(products);
});

app.get("/api/products/:id", (request, response) => {
  const id = Number(request.params.id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    response.status(404);
    response.send("Продукт не найден =(");
  }

  response.json(product);
});

app.listen(PORT);
