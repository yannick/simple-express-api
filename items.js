var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ricardo-crawler-2', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ricardo-crawler-2' database");
        db.collection('results_per_category', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'items' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('results_per_category', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('results_per_category', function(err, collection) {
        collection.find().toArray(function(err, results) {
            res.send(results);
        });
    });
};