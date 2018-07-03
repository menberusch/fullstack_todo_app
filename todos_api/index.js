var express = require('express'),
    app = express(),
    port = 3001,
    bodyParser = require('body-parser')

    todoRoutes = require('./routes/todos.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function(){
  console.log('App is running on port ' + port);
});
