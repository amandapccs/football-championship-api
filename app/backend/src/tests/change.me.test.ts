import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/User';
import { app } from '../app';
import { Response } from 'superagent';
import { userMock, userMock2, mockToken } from './mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota POST /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
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

  it('verifica se o usuário não é logado o usuário não existe', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: "not_exists@email.com", password: userMock.password });
    
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

describe('Testa a rota GET /login/validate', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...userMock2,
      } as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('verifica se o usuário foi validado com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', mockToken);

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.equal({ role: userMock2.role });
  });

  it('verifica se o usuário foi não é validado se o token é inválido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', "invalid_token");

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.have.equal({ message: 'Invalid token' });
  });

  it('verifica se o usuário foi não é validado se o token não é fornecido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', "");

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.have.equal({ message: 'No token was informed' });
  });
});