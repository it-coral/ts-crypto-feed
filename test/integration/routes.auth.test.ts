process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../../src/App';

const should = chai.should();
const environment = "test";
const config = require('../../knexfile.js')[environment];
export var knex = require('knex')(config);

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('********* routes : auth *********', function(){

  // this.timeout(30000);
  // before(() => {

  //   return knex.migrate.rollback()
  //   .then(() => { return knex.migrate.latest(); })
  //   .then(() => { return knex.seed.run(); })
  // });

  // after(() => {
  //   return knex.migrate.rollback();
  // });

  // describe('POST /api/v1/auth/register', () => {
  //   it('should register a new user', (done) => {
  //     chai.request(app)
  //     .post('/api/v1/auth/register')
  //     .send({
  //       email: 'newuser@test.net',
  //       password: 'password',
  //     })
  //     .end((err, res) => {
  //       should.not.exist(err);
  //       res.status.should.eql(200);
  //       res.type.should.eql('application/json');
  //       res.body.should.include.keys('success', 'token');
  //       res.body.success.should.eql(1);
  //       done();
  //     });
  //   });
  // });

  // describe('POST /api/v1/auth/login', () => {
  //   it('should login with a new user', (done) => {
  //     chai.request(app)
  //     .post('/api/v1/auth/login')
  //     .send({
  //       email: 'newuser@test.net',
  //       password: 'password',
  //     })
  //     .end((err, res) => {
  //       should.not.exist(err);
  //       res.status.should.eql(200);
  //       res.type.should.eql('application/json');
  //       res.body.should.include.keys('success', 'token', 'user');
  //       res.body.success.should.eql(1);
  //       done();
  //     });
  //   });
  // });

  // describe('POST /api/v1/auth/login', () => {
  //   it('should login with a new user', (done) => {
  //     chai.request(app)
  //     .post('/api/v1/auth/login')
  //     .send({
  //       email: 'newuser@tsest.net',
  //       password: 'password',
  //     })
  //     .end((err, res) => {
  //       should.not.exist(err);
  //       res.status.should.eql(200);
  //       res.type.should.eql('application/json');
  //       res.body.should.include.keys('success', 'message');
  //       res.body.success.should.eql(0);
  //       res.body.message.should.eql("Invalid email address");
  //       done();
  //     });
  //   });
  // });


  // describe('POST /api/v1/auth/login', () => {
  //   it('should log in a registered user', (done) => {
  //     chai.request(app)
  //     .post('/api/v1/auth/login')
  //     .send({
  //       email: 'seed1@test.net',
  //       password: 'password'
  //     })
  //     .end((err, res) => {
  //       should.not.exist(err);
  //       //res.redirects.length.should.eql(0);
  //       res.status.should.eql(200);
  //       res.type.should.eql('application/json');
  //       res.body.should.include.keys('success', 'token', 'user');
  //       res.body.success.should.eql(1);
  //       should.exist(res.body.token);
  //       done();
  //     });
  //   });

  //   // it('should not log in invalid password', (done) => {
  //   //   chai.request(app)
  //   //   .post('/api/v1/auth/login')
  //   //   .send({
  //   //     username: 'seed1@test.net',
  //   //     password: 'wrongpassword'
  //   //   })
  //   //   .end((err, res) => {
  //   //     res.status.should.eql(200);
  //   //     res.type.should.eql('application/json');
  //   //     res.body.should.include.keys('success', 'message');
  //   //     res.body.success.should.eql(0);
  //   //     res.body.message.should.eql("Invalid password");
  //   //     done();
  //   //   });
  //   // });
  
  // });
});
