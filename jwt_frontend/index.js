const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const meRoute = require('./routes/auth/me');
const registerRoute = require('./routes/auth/register');
const verifyRoute = require('./routes/auth/verify');
const adminRoute = require('./routes/auth/admin');
const deleteRoute = require('./routes/auth/delete');
const updateUserRoute = require('./routes/auth/update');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(cookieParser());


app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(registerRoute);
app.use(verifyRoute);
app.use(adminRoute);
app.use(updateUserRoute);
app.use(deleteRoute);

app.use(express.static('client/build'));
app.use('/media', express.static(path.join(__dirname, '../jwt_backend/')));
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
