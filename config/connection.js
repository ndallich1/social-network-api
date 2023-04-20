const { connect, connection } = require("mongoose");

// this wraps Mongoose around the local connection to MongoDB
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/usersDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// export the connection
module.exports = connection;
