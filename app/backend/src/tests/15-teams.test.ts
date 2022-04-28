import * as sinon from 'sinon';
import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import Team from '../database/models/Team';

import { exec } from 'child_process';
import { ITeam } from '../database/interfaces';

chai.use(require('chai-http'));

const { expect } = chai;

describe('15 - A aplicação deve ter o endpoint GET /teams', () => {

  beforeEach( async () => {
    exec('npm run db:reset');
  });

  afterEach(async () => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('recebe uma lista com informações de todos os times cadastrados.', async () => {

    sinon.stub(Team, 'findOne').resolves([
      { id: 1, teamName: 'Avaí/Kindermann' },
      { id: 2, teamName: 'Bahia' },
      { id: 3, teamName: 'Botafogo' },
      { id: 4, teamName: 'Corinthians' },
      { id: 5, teamName: 'Cruzeiro' },
      { id: 6, teamName: 'Ferroviária' }
    ] as any);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/teams')
      .send();

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.have.property('teamName');
      expect (chaiHttpResponse.body.length).to.equal(6);
  });
});
