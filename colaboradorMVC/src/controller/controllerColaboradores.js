import modelColaboradores from "../model/modelColaboradores.js";

//! mudar os STATUS
//TODO mudar os console.log

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
          res.status(201).json({ msg: "registro inserido com sucesso" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "erro no servidor" });
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
            .json({ msg: "login efetuado", login });

        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  listar: async (req, res) => {
    const resultado = await modelColaboradores.listar();
    res.status(200).json(resultado);
  },
  listarNome: async (req, res) => {
    const resultado = await modelColaboradores.listarPorNome();
    res.status(200).json(resultado);
  },
  listarPorID: async (req, res) => {
    const id = req.params.id;
    if (resultado[0]) {
      res.status(200).json(resultado[0]);
    } else {
      res.status(404).json({ msg: "colaborador não encontrado" });
    }
  },
  deletarPorID: async (req, res) => {
    const id = req.params.id;
    const resultado = await modelColaboradores.deletarPorID(id);
    if (resultado.affectedRows > 0) {
      res.status(200).json({ msg: "registro deletado" });
    } else {
      res.status(204).json({ msg: "não existe esse registro" });
    }
  },
};
async function buscarEmail(email) {
  const resultado = await modelColaboradores.buscarEmail(email);
  return resultado;
}

export default controllerColaboradores;
