/*
 * Assure the login API works
 **/

describe('Login', () => {
  describe('POST', () => {
    it('Admin can log in', (done) => {
      request(HOST)
        .post('/login')
        .set('Content-Type', /application\/json/)
        .send({ username: 'admin', password: 'password' })
        .end((err, res) => {
          res.body.should.have.keys('success');
          done();
        });
    });
  });
});
