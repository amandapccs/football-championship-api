import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/User';
import { app } from '../app';
import { Response } from 'superagent';
import userMock from './mocks';
import UserService from '../database/services/userService';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota POST /login', () => {
  let chaiHttpResponse: Response;
  const userModel = User;
  const userService = new UserService(userModel);

  beforeEach(async () => {
    sinon
      .stub(userService, "getLogin")
      .resolves({
        ...userMock,
      } as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('verifica se o usuário foi criado com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
        .send({ email: userMock.email, password: userMock.password });

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('verifica se ao passar uma senha inválida o usuário não é logado', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: userMock.email, password: 2 });
    
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.have.equal({ message: 'Incorrect email or password' });
  });

  it('verifica se o usuário não enviar o email a requisição falha', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: userMock.password });
    
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.have.equal({ message: 'All fields must be filled' });
  });
});
