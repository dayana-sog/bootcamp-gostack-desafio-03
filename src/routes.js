import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DistributeController from './app/controllers/DistributeController';
import DeliveredController from './app/controllers/DeliveredController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/recipients', RecipientsController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/recipients', RecipientsController.store);

routes.get('/deliveryman/:id/deliveries', DistributeController.index);
routes.put(
  '/deliveryman/:deliveryman_id/deliveries/:id',
  DistributeController.update
);
routes.get('/deliveryman/:id/delivered', DeliveredController.index);

routes.post('/file', upload.single('file'), FileController.store);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveriesController.index);
routes.post('/deliveries', DeliveriesController.store);
routes.put('/deliveries/:id', DeliveriesController.update);
routes.delete('/deliveries/:id', DeliveriesController.delete);

export default routes;
