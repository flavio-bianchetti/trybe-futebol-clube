import * as sinon from 'sinon';
import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import User from '../database/models/User';

import { exec } from 'child_process';
import { IUser } from '../database/interfaces';

chai.use(require('chai-http'));

const { expect } = chai;

describe('4 - A aplicação deve ter o endpoint POST /login', () => {

  beforeEach( async () => {
    exec('npm run db:reset');
  });

  afterEach(async () => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('recebe os campos corretamente preenchidos, porém não encontra o usuário no DB.', async () => {

    sinon.stub(User, 'findOne').resolves(null);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: 'nonexistent@email.com', password: 'access_password'});

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(401);
  });

  it('recebe os campos corretamente preenchidos e encontra o usuário.', async () => {

    sinon.stub(User, 'findOne').resolves({
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com",
      "password": '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    } as any | IUser);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: 'admin@admin.com', password: 'secret_admin'});

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.have.property('id');
      expect(chaiHttpResponse.body.user).to.have.property('role');
      expect(chaiHttpResponse.body.user).to.have.property('email');
  });
});
