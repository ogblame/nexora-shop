import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
  response.send("Backend работает");
});

app.listen(PORT);
