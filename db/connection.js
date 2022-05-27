require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const db = mongoose.connection;
const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/healing-clicker';

  mongoose.connect(mongoURI);


    // mongoose.connect(mongoURI, { useNewUrlParser: true },{ useUnifiedTopology: true })
    // .then(instance =>
    //   console.log(`Connected to db: ${instance.connections[0].name}`)
    // )
    // .catch(err => console.log("Connection Failed.", err));

//   .connect('mongodb://localhost/healing-clicker', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   })

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on('open', () => {
  console.log('✅ mongo connection made!');
});

module.exports = mongoose;
