import { Router } from 'express';
import * as cors from 'cors';
import {
  UserController,
  TeamController,
  MatchController,
  LeaderboardController,
} from '../controllers';
import {
  LoginValidatorMiddleware,
  FindTeamParameterValidator,
  TokenValidator,
  // MatchValidatorMiddleware,
  // UpdateMatchValidatorMiddleware,
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
  // MatchValidatorMiddleware.validate,
  MatchController.create,
);
routes.patch(
  '/matches/:id',
  // UpdateMatchValidatorMiddleware.validate,
  MatchController.updateMatch,
);
routes.patch('/matches/:id/finish', MatchController.finishMatch);

routes.get('/leaderboard/home', LeaderboardController.findAll);

export default routes;
