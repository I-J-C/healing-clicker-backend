const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { handleErrors, handleValidationErrors } = require('./middleware/custom_errors');

const userController = require('./controllers/users');
// const gamestateController = require('./controllers/gamestates');

const app = express();

app.get('/', (req, res) => {
	res.redirect('/api');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userController);
// app.use('/api/save', gamestateController);



// // The last middleware receives any error as its first argument
// app.use((err, req, res, next) => {
//     // If the error contains a statusCode, set the variable to that code
//     // if not, set it to a default 500 code
//     const statusCode = err.statusCode || 500;
//     // If the error contains a message, set the variable to that message
//     // if not, set it to a generic 'Internal Server Error'
//     const message = err.message || 'Internal Server Error';
//     // Set the status and send the message as a response to the client
//     res.status(statusCode).send(message);
//   });

app.set('port', process.env.PORT || 4000);

app.use(handleValidationErrors);
app.use(handleErrors);


// Run server on designated port
app.listen(app.get('port'), () => {
  console.log('listening on port ' + app.get('port'));
});
