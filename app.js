let express = require('express');
let router = require('./routes/index');
let cors = require('cors');
let app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).json({msg:"Não encontrado"})
});

module.exports = app;
