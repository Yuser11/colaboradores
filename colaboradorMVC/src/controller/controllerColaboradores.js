import modelColaboradores from "../model/modelColaboradores.js";

//! muda os STATUS
//TODO muda os console log

const controllerColaboradores = {
  raiz: async (req, res) => {
    res.status(200).json({
      ATIVIDADE: "ColaboradoresMVC",
      MSG: "A API ESTA ONLINE",
    });
  },

  cadastrar: async (req, res) => {
    try {
      const { nome, email, idade, telefone, cidade, estado, senha } = req.body;
      if (
        !nome ||
        !email ||
        !idade ||
        !telefone ||
        !cidade ||
        !estado ||
        !senha
      ) {
        res.status(400).json({ msg: "insira todos os campos" });
      } else {
        const emailBanco = await buscarEmail(email);
        console.log(emailBanco);

        if (emailBanco) {
          res.status(400).json({ msg: "Email já existe" });
        } else {
          modelColaboradores.cadastrar([
            nome,
            email,
            idade,
            telefone,
            cidade,
            estado,
            senha,
          ]);
          res.status(200).json({ msg: "inserido com sucesso" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "erro no servidor" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        res.status(400).json({ msg: "insira todos os campos" });
      } else {
        const login = await modelColaboradores.login(email, senha);
        if (!login) {
          res
            .status(400)
            .json({ msg: "login não efetuado, email ou senha errados" });
          }
          else{
          res
            .status(200)
            .json({ msg: "login efetuado", id : login });

        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  listar: async (req, res) => {
    const resultado = await modelColaboradores.listar();
    console.log(resultado);
    res.status(200).json(resultado);
  },
  listarNome: async (req, res) => {
    const resultado = await modelColaboradores.listarPorNome();
    console.log(resultado);
    res.status(200).json(resultado);
  },
  listarPorID: async (req, res) => {
    const id = req.params.id;
    const resultado = await modelColaboradores.listarPorID(id);
    console.log(resultado[0]);
    if (resultado[0]) {
      res.status(200).json(resultado[0]);
    } else {
      res.status(404).json({ msg: "não encontrado" });
    }
  },
  deletarPorID: async (req, res) => {
    console.log(req.body);
    const { id } = req.body;
    console.log(id);
    const resultado = await modelColaboradores.deletarPorID(id);
    console.log(resultado.affectedRows);
    if (resultado.affectedRows > 0) {
      res.status(200).json({ msg: "registro deletado" });
    } else {
      res.status(200).json({ msg: "não tem esse id" });
    }
  },
};
async function buscarEmail(email) {
  console.log(email);
  const resultado = await modelColaboradores.buscarEmail(email);
  console.log("resultadooo \n\n\n");
  return resultado;
}

export default controllerColaboradores;
