import e from "express";
import conexao from "../../config/db.js";
import bcrypt from "bcrypt";

const modelColaboradores = {
  cadastrar: async ([nome, email, idade, telefone, cidade, estado, senha]) => {
    try {
      const senhaHash = await bcrypt.hash(senha, 10);
      const resultado = await conexao.query(
        "INSERT INTO `colaboradores`(`NOME`, `EMAIL`, `IDADE`, `TELEFONE`, `CIDADE`, `ESTADO`, `SENHA`) VALUES(?,?,?,?,?,?,?)",
        [nome, email, idade, telefone, cidade, estado, senhaHash],
      );
      console.log(resultado);
      return resultado;
    } catch (error) {
      throw error;
    }
  },
  listar: async () => {
    try {
      const resultado = await conexao.query(
        "SELECT `ID`, `NOME`, `EMAIL`, `IDADE`, `TELEFONE`, `CIDADE`, `ESTADO`, `SENHA` FROM `colaboradores` ORDER BY `colaboradores`.`NOME` ASC ",
      );
      return resultado[0];
    } catch (error) {
      throw error;
    }
  },
  listarPorID: async (id) => {
    try {
      const resultado = await conexao.query(
        "SELECT `ID`, `NOME`, `EMAIL`, `IDADE`, `TELEFONE`, `CIDADE`, `ESTADO`, `SENHA` FROM `colaboradores` WHERE ID=? ",
        id,
      );
      return resultado[0];
    } catch (error) {
      throw error;
    }
  },
  login: async (email, senha) => {
    try {
      console.log(email, senha);
      console.log("SELECT ID, SENHA FROM COLABORADORES WHERE EMAIL = ?", email);
      const [resultado] = await conexao.query(
        "SELECT ID, SENHA FROM COLABORADORES WHERE EMAIL = ?",
        email,
      );
      console.log(resultado);
      console.log(resultado[0]);
      if (!resultado[0]) {
        return false;
      } else {
        const senhaValidada = await bcrypt.compare(senha, resultado[0].SENHA);
        console.log(senhaValidada);
        if (senhaValidada) {
          return resultado[0].ID;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  },
  deletarPorID: async (id) => {
    console.log("DELETE FROM COLABORADORES WHERE id =?", id);
    try {
      const resultado = await conexao.query(
        "DELETE FROM COLABORADORES WHERE id =?", id,
      );
      return resultado[0];
    } catch (error) {
      throw error;
    }
  },
  buscarEmail: async (email) => {
    console.log("SELECT EMAIL FROM `colaboradores` WHERE EMAIL=?", email);
    try {
      const [resultado] = await conexao.query(
        "SELECT EMAIL FROM `colaboradores` WHERE EMAIL=?",
        email,
      );
      console.log(resultado[0]);
      if (!resultado[0]) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  },
};

export default modelColaboradores;
