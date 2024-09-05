import express from 'express';
const routes = express.Router();
import userController from '../controller/userController'

routes.post('/users', userController.createUser);
routes.get('/users', userController.getUsers);
routes.delete('/users/:id', userController.deleteUser);
routes.put('/users/:id', userController.updateUser);

export default routes