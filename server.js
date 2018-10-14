var express = require('express');
var upload = require('express-fileupload'); 
var app = express();
var server = require('http').Server(app);
server.listen(3000);

//app.use(express.static(__dirname+'/static/main'));
app.use(express.static(__dirname+'/static/planner'));
app.use(upload());

//app.get('/', function(req,res){
 //  res.sendFile(__dirname+'/static/main/index.html');
 // });
app.get('/', function(req,res){
    res.sendFile(__dirname+'/static/planner/index.html');
  });
app.post('/fileinfo', function(req,res){
    let filexml=req.files.file.data.toString('utf16le');
    console.log(filexml);
    res.end(filexml);
})