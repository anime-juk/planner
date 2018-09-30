var express = require('express');
var upload = require('express-fileupload'); 
var app = express();
var server = require('http').Server(app);
server.listen(3000);

app.use(express.static('static'));
app.use(upload());

app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
  });
app.post('/fileinfo', function(req,res){
    let filexml=req.files.file.data.toString('utf16le');
    console.log(filexml);
    res.end(filexml);
})