import { Router } from 'express';
import * as cors from 'cors';
import {
  UserController,
  TeamController,
  MatchController,
} from '../controllers';
import {
  LoginValidatorMiddleware,
  FindTeamParameterValidator,
  TokenValidator,
  MatchValidatorMiddleware,
} from '../middlewares';

const routes = Router();

routes.use(cors());

routes.post('/login', LoginValidatorMiddleware.validate, UserController.create);
routes.get('/login/validate', TokenValidator.validate, UserController.getRole);

routes.get('/teams', TeamController.findAll);
routes.get(
  '/teams/:id',
  FindTeamParameterValidator.validate,
  TeamController.findByPk,
);

routes.get('/matches', MatchController.findAll);
routes.post(
  '/matches',
  TokenValidator.validate,
  MatchValidatorMiddleware.validate,
  MatchController.create,
);

export default routes;
