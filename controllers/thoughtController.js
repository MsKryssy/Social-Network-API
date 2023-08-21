const { Thought } = require('../models');

module.exports = {
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-_v');
            if (!thought) {
                return res.status(404).json({ message: 'We could not find thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        } 
    },
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'We could not find thought with that ID' });
            }
            res.json(thought)
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidator: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'We could not find thought with that ID'});
            } res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidator: true, new: true }
            );
            res.json({ message: 'We could not find thought with that ID'});
            } catch(err) {
                res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidator: true, new: true } 
            );
            res.json({ message: 'Reaction now removed'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};