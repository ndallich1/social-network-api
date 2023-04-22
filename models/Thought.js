const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: String,
    unique: true,
    required: true,
  },
  username: {},
  reactions: {},
});
