const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    removeThought,
    createThought,
    updateThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController');
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);
router.route('/:thoughtId/reactions/').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;