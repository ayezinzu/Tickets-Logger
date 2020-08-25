const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@cluster0.ntgpc.mongodb.net/user?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
console.log(err);
});




const autoSchema = mongoose.Schema({
userid: String,
msgid: String,
logNumber: String,
});

module.exports = mongoose.model("UserRecords", autoSchema);