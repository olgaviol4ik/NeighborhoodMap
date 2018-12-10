const URL = 'mongodb://localhost:27017/waterparks';
var db;

exports.get = function(callback, errCallback) {
    if (db) {
        callback(db);
    } else {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(URL, function(err, client) {
            const newDb = client.db('waterparks');
            db = newDb;
            if (!err) {
                callback(db);
            } else {
                if (typeof errCallback == 'function') {
                    errCallback(err);
                }
            }
        })
    }
};

exports.find = function(collection, queryObj, callback) {
    exports.get(function(db) {
        var result = [];
        var cursor = db.collection(collection).find(queryObj);
        cursor.each(function(err, doc) {
            if (err) {
                callback(null, err)
            } else {
                if (doc != null) {
                    result.push(doc);
                } else {
                    callback(result, err);
                }
            }
        });
    });
};

exports.findOne = function(collection, queryObj, callback) {
    exports.find(collection, queryObj, function(recs, err) {
        console.log(recs);
        if (recs.length > 0) {
            callback(recs[0], err);
        } else {
            callback(null, err);
        }
    })
};

exports.insert = function(collection, obj, callback) {
    exports.get(function(db) {
        var result = db.collection(collection).insert(obj, function(err, docs) {
            callback(docs, err);
        });
    });
};

exports.insertOne = function(collection, obj, callback) {
    exports.get(function(db) {
        db.collection(collection).insertOne(obj, callback);
    });
};