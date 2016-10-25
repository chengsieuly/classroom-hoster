/*
 * This tests all the methods that is required for the quiz to work
 **/
describe('Quiz Functionalities', () => {
  let length = 0;
  request(HOST)
    .get('/quiz')
    .end((err, res) => (length = res.body.length));

  describe('POST', () => {
    describe('New quizzes can be created', () => {
      it('can post a new quiz to the database', (done) => {
        request(HOST)
          .post('/quiz')
          .set('Accept', /application\/json/)
          .expect(({ body }) => body.should.exist)
          .end(done);
      });

      it('adds another row to the current table', (done) => {
        request(HOST)
          .get('/quiz')
          .expect(({ body }) => body.should.have.length(length + 1))
          .end(done);
      });
    });
  });

  describe('GET', () => {
    describe('All quizzes can be fetched', () => {
      it('have all the necessary properties', (done) => {
        request(HOST)
          .get('/quiz')
          .expect('Content-Type', /application\/json/)
          .expect(({ body }) => {
            body[0].should.have.all.keys('_id', 'title', 'description', 'createdAt', 'updatedAt');
          })
          .end(done);
      });
    });
  });
});
