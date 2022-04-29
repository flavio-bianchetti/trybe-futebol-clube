import { Router } from 'express';
import * as cors from 'cors';
import { UserController, TeamController } from '../controllers';
import LoginValidatorMiddleware from '../middlewares';

const routes = Router();

routes.use(cors());

routes.post('/login', LoginValidatorMiddleware.validate, UserController.create);
routes.get('/login/validate', UserController.getRole);

routes.get('/teams', TeamController.findAll);

export default routes;
