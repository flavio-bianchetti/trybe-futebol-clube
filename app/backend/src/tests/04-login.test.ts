import * as sinon from 'sinon';
import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import User from '../database/models/User';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
// import { IUser } from '../database/interfaces';
import { exec } from 'child_process';
// import { setEnvironmentData } from 'worker_threads';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
chai.use(require('chai-http'));

const { expect } = chai;

// teste end-to-end
  // entra com os campos email e password
  // retorna token ou uma mensagem de erro.

  // testes:
  // A aplicação deve ter o endpoint POST /login e
  // - a aplicação não recebe os campos email e/ou password
  // - a aplicação recebe os campos email e/ou password vazios.
  // - a aplicação recebe os campos corretamente preenchidos, porém não encontra o usuário no DB.
  // - a aplicação recebe os campos corretamente preenchidos e encontra o usuário.

describe('4 - A aplicação deve ter o endpoint POST /login', () => {

  // it('não recebe os campos email e/ou password', async () => {
  //   sinon.mock(models.User)
  //     .expects('findOne')
  //     .returns([]);
    
  //   await chai
  //     .request(app).post('/login')
  //     .end(function (err) {
  //       expect(err).to.have.status(401);
  //     });
  // });

  // it('recebe os campos email e/ou password vazios.', async () => {
  //   sinon.mock(models.User)
  //     .expects('findOne')
  //     .withArgs({ where: { email: ''} })
  //     .returns([]);
    
  //   await chai
  //     .request(app).post('/login')
  //     .send({email: '', password: ''})
  //     .end(function (err) {
  //       expect(err).to.have.status(401);
  //     });
  // });

  before(() => {
    exec('npm run db:reset');
  });

  it('recebe os campos corretamente preenchidos, porém não encontra o usuário no DB.', async () => {

    // solução adaptada do site:
    // https://www.chaijs.com/guide/styles/
    const chaiHttpResponse = await chai
      .request(app).post('/login')
      .send({email: 'nonexistent@email.com', password: 'access_password'});

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(401);
  });

  it('recebe os campos corretamente preenchidos e encontra o usuário.', async () => {

    const chaiHttpResponse = await chai
      .request(app).post('/login')
      .send({email: 'admin@admin.com', password: 'secret_admin'});

      expect(chaiHttpResponse).not.to.be.null;
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.have.property('id');
      expect(chaiHttpResponse.body.user).to.have.property('role');
      expect(chaiHttpResponse.body.user).to.have.property('email');
      expect(chaiHttpResponse.body).to.have.property('token');
  });
});
