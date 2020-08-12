const assert = require("assert").strict;//setting assert to require strict equality
//for inserting a document
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);//can use coll to interact with a specific collection in the server
  coll.insertOne(document, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);//these callbacks have not been established yet
  });
};//all the methods chained with coll are from express driver
//for finding and listing documents 
exports.findDocument = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find().toArray((err, docs) => {
    assert.strictEqual(err, null);//this is checking if there is no error
    callback(docs);
  });
};
//for removing documents
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);
  });
};
// for updating documents
exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);
  });
};
