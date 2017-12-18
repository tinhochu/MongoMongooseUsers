const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

  let user;

  function validationResults(user) {
    let validationResult = user.validateSync();
    let { message } = validationResult.errors.name;
    return message;
  };

  it('requires a username', done => {
    user = new User({ name: undefined });

    assert(validationResults(user) === 'Name is required.');
    done();
  });

  it('requires a user name longer than 2 characters', done => {
    user = new User({ name: 'Al'});

    assert(validationResults(user) === 'Name must be longer than 2 characters.');
    done();
  });

  it('disallows invalid records from being saved', done => {
    user = new User({ name: 'Al' });

    user.save()
      .catch( (validationResult) => {
        const { message } = validationResult.errors.name;

        assert( message === 'Name must be longer than 2 characters.');
        done();
      });
  });
});
