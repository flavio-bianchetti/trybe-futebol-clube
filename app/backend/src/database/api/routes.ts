import { Router } from 'express';
import * as cors from 'cors';
import { UserController, TeamController, MatchController } from '../controllers';
import {
  LoginValidatorMiddleware,
  FindTeamParameterValidator,
  TokenValidator,
} from '../middlewares';

const routes = Router();

routes.use(cors());

routes.post('/login', LoginValidatorMiddleware.validate, UserController.create);
routes.get('/login/validate', TokenValidator.validate, UserController.getRole);

routes.get('/teams', TokenValidator.validate, TeamController.findAll);
routes.get(
  '/teams/:id',
  TokenValidator.validate,
  FindTeamParameterValidator.validate,
  TeamController.findByPk,
);

routes.get('/matches', TokenValidator.validate, MatchController.findAll);

export default routes;
