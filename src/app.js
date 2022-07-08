const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('./database/connect');
require('dotenv').config();

const app = express()
app.use(morgan('dev'));

app.set('port',process.env.PORT  || 5000);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use('/api/product',require('./routes/product'));
app.use('/api/auth',require('./routes/auth'));


app.listen(app.get('port'),()=>{
    console.log(`Listen in port ${app.get('port')}`)
})