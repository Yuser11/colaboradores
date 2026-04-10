import conexao from "../../config/db.js";
import bcrypt from 'bcrypt'

const modelUsuario = {
  cadastrarUsuario: async ([nome, idade, cidade, estado, bairro, pais, email, senha, regra]) => {
    try {
        const senhaHash = await bcrypt.hash(senha,12)
        console.log({senha:senhaHash})
      const resultado = await conexao.query(
        "INSERT INTO USUARIO (NOME,IDADE,CIDADE,ESTADO,BAIRRO,PAIS,EMAIL,SENHA,REGRA)VALUES(?,?,?,?,?,?,?,?,?)",
        [nome, idade, cidade, estado, bairro, pais, email, senhaHash, regra],
      );
      return resultado[0];
    } catch (error) {
      return(error)
    }
  },
  login: async (email,senha) => {
    try {
        console.log(email,senha)
      const resultado = await conexao.query(
        "SELECT NOME, IDADE, CIDADE, ESTADO, BAIRRO, PAIS, EMAIL, SENHA, REGRA FROM usuario WHERE EMAIL = ?",
        email
      );
     console.log(resultado[0][0].SENHA)
      return resultado[0];
    } catch (error) {
      throw error;
    }
  },
};

export default modelUsuario;
