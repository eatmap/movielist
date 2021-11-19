// Set all required environment variables
require('dotenv').config();

const mongoose = require('mongoose');

/**
 * Setup connection to MongoDB
 */
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.log(err));

const app = require('./server');

app.listen(process.env.PORT || 8080, () => {
  console.log('Starting the server');
});
