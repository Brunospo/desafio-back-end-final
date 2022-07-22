require('dotenv').config();
const  express = require('express');
const cors = require('cors');
const categoryRouter = require('./router/categoryRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/categoria', categoryRouter);


app.listen(process.env.PORT || 3000); //eslint-disable-line