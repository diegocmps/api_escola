const { Router } = require('express');
const { auth } = require('../middleware/auth');
const CursoController = require('../controllers/CursoController');

const cursoRoutes = new Router();

cursoRoutes.get('/:id?', auth, CursoController.listar)

cursoRoutes.post('/', CursoController.cadastrar)

cursoRoutes.put('/:id', auth, CursoController.atualizar)

cursoRoutes.delete('/:id', auth, CursoController.deletar)

module.exports = cursoRoutes