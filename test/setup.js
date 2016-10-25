import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import request from 'supertest';

chai.use(chaiEnzyme());

/* Global exports */
// For supertest
global.request = request;
global.HOST = 'http://localhost:3000';

// For chai
global.should = chai.should();
