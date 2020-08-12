const MongoClient = require("mongodb").MongoClient; //required mongodb node express driver and imported mongo client
const assert = require("assert").strict;
const dboper = require("./operations"); //importing the operations module

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null); //used mongoclient connect method to connect to the server
  //the callback gave the client object
  console.log("Connected correctly to server");

  const db = client.db(dbname);
  //we then used that client object to access the nucampsite database
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection", result);
    //this dropping/deleting is for test purpose so not to save unnecary data
    //below is inserting a new doc into the campsites collection
    dboper.insertDocument(
      db,
      { name: "Breadcrumb trail Campground", description: "Test" },
      "campsites",
      (result) => {
        console.log("Insert Document:", result.ops);
        dboper.findDocument(db, "campsites", (docs) => {
          console.log("Found Documents:", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb trail Campground" },
            { description: "Updated Test Description" },
            "campsites",
            (result) => {
              console.log("Updated Document Count:", result.result.nModified);

              dboper.findDocument(db, "campsites", (docs) => {
                console.log("Found Documents:", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted Document Count:", result.deletedCount);

                    client.close();
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});

//look deeper at the series of nested callbacks
// really need to figure out callbacks at 14 min node mongodb pt 2
