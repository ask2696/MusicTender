// Import modules
var express  =   require('express'),
    path     =   require('path');

//Import routes
var index = require('./routes/index');

var app = express();

//set views and view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use('/', index);

app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});
