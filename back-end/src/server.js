const express = require('express');
const handleError = require('./middlewares/handleError');
require('dotenv').config();
const Routes = require('./routes');

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(express.json());

app.use('/users', Routes.UserRoutes);
app.use('/login', Routes.LoginRoutes);

app.use(handleError);

app.listen(PORT, () => console.log(`App in listening on port ${PORT}!`));
