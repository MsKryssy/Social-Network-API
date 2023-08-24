const { User, Thought } = require('../models');

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
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('thought');
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
            res.json({ message: 'Your thought has been deleted' })
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        console.log(req.body);
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
                { new: true }
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
                { $addToSet: { reaction: req.params.reactionId } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'We could not find thought with that ID' })
            }
            res.json({ message: 'Your reaction has been added!' });
            } catch(err) {
                res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true } 
            );
            if (!thought) {
                return res.status(404).json({ message: 'We could not find thought with that ID' });
            }
            res.json({ message: 'Reaction now removed'});
            } catch (err) {
                res.status(500).json(err);
        }
    }
};