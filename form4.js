var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn=mysql.createConnection({
host : 'localhost',
user : 'rsp',
password : 'Rupesh@123',
database : 'test_1'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
/*app.use('/form', (req, res) => {
  console.log(req.body);
  var name=req.body.txt1;
  var mobile=req.body.txt2;
  var email=req.body.txt3;
  console.log(name,mobile,email);
});*/
app.get('/', function(request,response){
	response.sendFile('index2.html', {root: path.join(__dirname,'./assets')});
})
console.log("it works");
app.post('/form', function(request,response){

	//console.log(request.is('json'));
	var name=request.body.txt1;
    var mobile=request.body.txt2;
    var email=request.body.txt3;
    console.log(name,mobile,email);
var queryString="insert into customers(name,mobile,email) VALUES(?,?,?)";
conn.query(queryString, [name,mobile,email], function(error,data,fields)
{
if(error)
{
throw error;
}
else{

console.log("success");
}
}
)
conn.end();
response.write("insertion success");


response.end();
});
app.listen(8888,function() {
	console.log('Server at 8888');
})