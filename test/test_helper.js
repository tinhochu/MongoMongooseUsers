const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

beforeEach(() => {
  mongoose.connection.collections.users.drop();
});
