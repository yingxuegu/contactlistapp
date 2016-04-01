var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require("body-parser");


/*app.get('/', function(req, res) {
	res.send("Hello world from server.js");
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist', function (req, res) {
		db.contactlist.find(function (error, doc){
			console.log(doc);
			res.json(doc);
		});

});




app.post('/contactlist', function(req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(error, doc) {
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(error, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(error, doc){
		res.json(doc);
	});
});


app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify(
		{
			query: {_id: mongojs.ObjectId(id)}, 
			update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone} },
			new: true
		}, function(error, doc){
			res.json(doc);
		}
	);
});

app.listen(3000);
console.log("port 3000 runnint");
