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

    sinon.stub(Team, 'findAll').resolves([
      { id: 1, teamName: 'Avaí/Kindermann' },
      { id: 2, teamName: 'Bahia' },
      { id: 3, teamName: 'Botafogo' },
      { id: 4, teamName: 'Corinthians' },
      { id: 5, teamName: 'Cruzeiro' },
      { id: 6, teamName: 'Ferroviária' }
    ] as Array<any | ITeam>);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
      .send();

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.have.property('id');
      expect(chaiHttpResponse.body[0]).to.have.property('teamName');
      expect (chaiHttpResponse.body.length).to.equal(6);
  });
});

describe('15 - A aplicação deve ter o endpoint GET /teams/:id', () => {

    beforeEach( async () => {
      exec('npm run db:reset');
    });
  
    afterEach(async () => {
      (Team.findByPk as sinon.SinonStub).restore();
    });
  
    it('retorna uma mensagem de erro se o time não for encontrado', async () => {
  
      sinon.stub(Team, 'findByPk').resolves(null);
  
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/55')
        .send();
  
        expect(chaiHttpResponse).to.be.null;
        expect(chaiHttpResponse).to.have.status(401);
    });

    it('recebe o time com o ID informado.', async () => {
  
      sinon.stub(Team, 'findByPk').resolves({
        id: 5, teamName: 'Cruzeiro',
      } as any | ITeam);
  
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5')
        .send();
  
        expect(chaiHttpResponse).not.to.be.null;
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.have.property('id');
        expect(chaiHttpResponse.body).to.have.property('teamName');
    });
  });
