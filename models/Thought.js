const { Schema, model, Types } = require("mongoose");

// new schema for reactions
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => currentDate(date),
  },
});

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      unique: true,
      required: true,
      min_Length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => currentDate(date),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Create a virtual property `reactionCount` that gets the amount of friends per user.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize the Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
module.exports = reactionSchema;
