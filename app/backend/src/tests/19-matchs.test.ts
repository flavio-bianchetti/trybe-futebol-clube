import * as sinon from 'sinon';
import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import Match from '../database/models/Match';

import { exec } from 'child_process';
import { IMatch } from '../database/interfaces';

chai.use(require('chai-http'));

const { expect } = chai;

describe('19 - A aplicação deve ter o endpoint GET /matches', () => {

  beforeEach(() => {
    exec('npm run db:reset');
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('recebe uma lista com as partidas.', async () => {

    sinon.stub(Match, 'findAll').resolves([
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
        "teamName": "São Paulo"
        },
        "teamAway": {
        "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
        "teamName": "São Paulo"
        },
        "teamAway": {
        "teamName": "Internacional"
        }
      }
    ] as Array<any | IMatch>);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .send();

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.have.property('id');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
      expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
      expect(chaiHttpResponse.body[0].teamHome).to.have.property('teamName');
      expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
      expect(chaiHttpResponse.body[0].teamAway).to.have.property('teamName');
      expect (chaiHttpResponse.body.length).to.equal(2);
  });
});

describe('20 - A aplicação deve ter o endpoint GET /matches', () => {

    beforeEach(() => {
      exec('npm run db:reset');
    });
  
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('acessando a query "matches?inProgress=true" deve retornar partidas em andamento', async () => {
  
      sinon.stub(Match, 'findAll').resolves([
        {
          "id": 2,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
          "teamName": "São Paulo"
          },
          "teamAway": {
          "teamName": "Internacional"
          },
        }
      ] as Array<any | IMatch>);
  
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')
        .send();
  
        expect(chaiHttpResponse).not.to.be.null;
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body[0].inProgress).to.be.true;
        expect (chaiHttpResponse.body.length).to.equal(1);
    });
  });

describe('20 - A aplicação deve ter o endpoint GET /matches', () => {

    beforeEach(() => {
      exec('npm run db:reset');
    });
  
    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('acessando a query "matches?inProgress=false" deve retornar partidas finalizadas', async () => {
  
      sinon.stub(Match, 'findAll').resolves([
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Grêmio"
          }
        },
      ] as Array<any | IMatch>);
  
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')
        .send();
  
        expect(chaiHttpResponse).not.to.be.null;
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body[0].inProgress).to.be.false;
        expect (chaiHttpResponse.body.length).to.equal(1);
    });
  });
