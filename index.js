var express = require("express")
var app = express();
var port = 3701;

//template
app.set('views', __dirname + '/template');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res)
{
    res.render("index");
});

//socket
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function(socket){
    socket.emit('message', { message: 'Welcome to hoplongchat'});
socket.on('send', function(data){
    io.sockets.emit('message', data);
});
});
