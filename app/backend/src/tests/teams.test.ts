import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Team from '../database/models/Team';
import { app } from '../app';
import { Response } from 'superagent';
import { teamsMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota POST /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([...teamsMock] as any);
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('verifica se os times são exibidos', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.length(2);
  });
});

describe('Testa a rota GET /teams/:id', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves({
        ...teamsMock[0],
      } as any);
  });

  afterEach(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('verifica se o time é exibido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id', 'teamName');
  });
});