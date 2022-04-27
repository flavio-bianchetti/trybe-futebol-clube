import { Router } from 'express';
import * as cors from 'cors';
import UserController from '../controllers';
import LoginValidatorMiddleware from '../middlewares';

const routes = Router();

routes.use(cors());

routes.post('/login', LoginValidatorMiddleware.validate, UserController.create);

export default routes;
