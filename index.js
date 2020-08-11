const MongoClient = require("mongodb").MongoClient;//required mongodb node express driver and imported mongo client
const assert = require("assert").strict;

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null);//used mongoclient connect method to connect to the server 
        //the callback gave the client object
  console.log("Connected correctly to server");

  const db = client.db(dbname);
        //we then used that client object to access the nucampsite database
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection", result);
    //this dropping/deleting is for test purpose so not to save unnecary data
    const collection = db.collection("campsites");
    //below is inserting a new doc into the campsites collection 
    collection.insertOne(
      { name: "Breadcrumb trail Campground", description: "Test" },
      (err, result) => {
        assert.strictEqual(err, null);
        console.log("Insert Document:", result.ops);
            //below allows us to console log all the docs in an array
        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null);
          console.log("Found Documents:", docs);

          client.close();//closes the clients connection to the server
        });
      }
    );
  });
});
//look deeper at the series of nested callbacks