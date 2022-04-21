require('dotenv').config();
const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/handleError');
const Routes = require('./routes');

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', Routes.AuthRoutes);
app.use('/users', Routes.UserRoutes);
app.use('/login', Routes.LoginRoutes);

app.use(handleError);

app.listen(PORT, () => console.log(`App in listening on port ${PORT}!`));
