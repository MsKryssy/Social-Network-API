const { Schema } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => {
            return new Schema.Types.ObjectId
        },
    },
    reactionBody: {
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: Date,
        default: Date.now,
        get: (date) => {
            return date.toLocaleDateString();
        }
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
});    
module.exports = reactionSchema;
