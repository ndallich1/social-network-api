const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts (GET)
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a single thought by id (GET)
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new thought (push the created thought's id to the associated user's thoughts array field) (POST)
  async createThought(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user
        ? res.status(404).json({ message: "No user found with that ID :(" })
        : res.json(user);
      const newThought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });
      // take thought and push to user
      user.newThought.push(newThought);
      // save new thought and user
      await Promise.all([newThought.save(), user.save()]);
      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update a thought by id (PUT)
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !thought
        ? res.status(404).json({ message: "No thought with this id!" })
        : res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // remove a thought by its id (DELETE)
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      !deleteThought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(deleteThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a reaction stored in a single thought's reactions array field (POST)
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(deleteThought);
      await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // pull and remove a reaction by the reactions reactionId value (DELETE)
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought);
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reaction: { reactionId: req.params.id } } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
