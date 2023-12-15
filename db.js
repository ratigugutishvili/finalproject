const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ratigugutishvili2004:TMS31K6t8YIe96jw@cluster0.qs5f5rq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {

})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });