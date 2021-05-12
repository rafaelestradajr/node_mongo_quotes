const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();

MongoClient.connect(
  "mongodb+srv://yoda:URZSKSCff76iBv.@cluster0.i9kll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.use(/* ... */);
    app.get(/* ... */);
    app.post(/* ... */);
    app.listen(/* ... */);
  })
  .catch(console.error);

app.listen(3000, function () {
  console.log("listening on 3000");
});

// app.get('/', (req, res) => {
// res.send('Hello World')
//}}

// Make sure you place body-parser before your CRUD handlers!
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});
app.post("/quotes", (req, res) => {
  quotesCollection
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));

  //console.log(req.body);
});
