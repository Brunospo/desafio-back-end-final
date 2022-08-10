require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');

const categoryRouter = require('./router/categoryRouter');
const userRouter = require('./router/userRouter');
const authenticationRouter = require('./router/authenticationRouter');
const productRouter = require('./router/productRouter');
const clientRouter = require('./router/clientRouter');
const orderRouter = require('./router/orderRouter');
const uploadImageRouter = require('./router/uploadImageRouter');

const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/categoria', categoryRouter);
app.use('/usuario', userRouter);
app.use('/login', authenticationRouter);
app.use('/produto', productRouter);
app.use('/cliente', clientRouter);
app.use('/pedido', orderRouter);
app.use('/upload', uploadImageRouter);

//Catch all
app.use(errorMiddleware);

app.listen(process.env.PORT, () => { console.log('Servidor rodando') });; //eslint-disable-line