const mongoose = require("mongoose");

// connect db with monog uri
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'shareCodeSnippet',
});

// get the connection status using connection
const connection = mongoose.connection

// if connected
connection.on("connected", () => {
  console.log("MongoDB connected");
});

// if error in connection
connection.on("error", () => {
  console.log("Error in mongoDB connection");
});

module.exports = mongoose;
