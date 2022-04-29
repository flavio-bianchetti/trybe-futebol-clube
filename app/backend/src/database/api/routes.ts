import { Router } from 'express';
import * as cors from 'cors';
import { UserController, TeamController } from '../controllers';
import { LoginValidatorMiddleware, FindTeamParameterValidator } from '../middlewares';

const routes = Router();

routes.use(cors());

routes.post('/login', LoginValidatorMiddleware.validate, UserController.create);
routes.get('/login/validate', UserController.getRole);

routes.get('/teams', TeamController.findAll);
routes.get('/teams/:id', FindTeamParameterValidator.validate, TeamController.findByPk);

export default routes;
