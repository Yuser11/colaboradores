// import express from 'express'
// import { conexao } from "./db";
import express from "express";
import conexao from "../config/db.js";
import routers from "./routes/router.js";

const app = express();

app.use(routers);
app.use(express.json());

conexao.query("select 1").then(() => {
  console.log("Conexão bem sucedida");
  app.listen(3000, () => {
    console.log("Servidor executando na url http://localhost:3000");
  });
});