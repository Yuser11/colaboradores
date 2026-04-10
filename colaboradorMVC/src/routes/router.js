import express from 'express'
import controllerColaboradores from '../controller/controllerColaboradores.js';

const routers = express();

routers.use(express.json());
 
routers.get('/', controllerColaboradores.raiz)
routers.post('/cadastrar', controllerColaboradores.cadastrar)
routers.get('/listar', controllerColaboradores.listar)
routers.get('/listar/id=:id', controllerColaboradores.listarPorID)
routers.post('/login', controllerColaboradores.login)
routers.delete('/deletar', controllerColaboradores.deletarPorID)


export default routers