const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    handle: {
        type: String,
        required: true,
        max: 20
    },
    bio: {
        type: String
    },
    interests: {
        type: [String]
    }
});

module.exports = profile = mongoose.model('profile', ProfileSchema);