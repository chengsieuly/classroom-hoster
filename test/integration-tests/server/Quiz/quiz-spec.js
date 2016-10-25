/*
 * This tests all the methods that is required for the quiz to work
 **/
import rp from 'request-promise';

describe('Quiz Functionalities', () => {
  let length = 0;
  rp(`${HOST}/quiz`)
    .then(data => (length = JSON.parse(data).length))
    .catch(err => console.error(err));

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

  describe('POST', () => {
    describe('New quizzes can be created', () => {
      it('adds another row to the current table', () => {
        console.log(length);
        // request(HOST)
        // .post('/quiz')
      });
    });
  });
});
