const { User } = require('../models');

module.exports = {
    async getUsers (req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thought').populate('friends')
            .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'We could not find a user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        } 
    },
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userIdId });
            if (!user) {
                return res.status(404).json({ message: 'We could not find a user with that ID' });
            }
            res.json({ message: 'User has been deleted' })
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        console.log(req.body);
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'We could not find a user with that ID'});
            } res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'We could not find a user with that ID' })
            }
            res.json({ message: 'Friend successfully added to your list' });
            } catch(err) {
                res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { friends:req.params.friendId } },
                { new: true } 
            );
            if (!user) {
                return res.status(404).json({ message: 'User does not exist'});
            }
            res.json({ message: 'Friend has been removed' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};