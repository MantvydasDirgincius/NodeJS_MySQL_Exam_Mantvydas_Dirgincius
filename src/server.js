const express = require('express');
const cors = require('cors');

const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const accountsRoutes = require('./routes/accountsRoutes');
const billsRoutes = require('./routes/billRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/', userRoutes);
app.use('/', accountsRoutes);
app.use('/', billsRoutes);
app.use('/', groupRoutes);

app.listen(PORT, () => console.log('serveris veikia', PORT));
