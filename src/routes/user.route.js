const {Router} = require('express');
const userController = require('../controllers/UserController');
const { hasPermission } = require('../middleware/hasPermission');

const userRouter = new Router()

userRouter.get('/', hasPermission(['ler_usuarios']), userController.findAll);
userRouter.get('/:id', hasPermission(['ler_usuarios']), userController.findById);
userRouter.post('/', userController.createNewUser);
userRouter.put('/:id', hasPermission(['editar_usuario']), userController.updateUser);
userRouter.delete('/:id', hasPermission(['deletar_usuario']), userController.deleteUser);

module.exports = userRouter;