const { v4: uuidv4 } = require('uuid');

const process_track = (track) => {
    track["server_timestamp"] = new Date();
    track["message_id"] = uuidv4().toString();
    return track;
}

module.exports = {
    process_track
}