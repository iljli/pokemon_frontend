const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/pokemon');

const app = express();
const port = process.env.PORT || 4000;  // Frontend


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pokemon', usersRouter);

app.listen(port, () => { 
    console.log(`App is listening at http://localhost:${port}`); 
});


module.exports = app;
