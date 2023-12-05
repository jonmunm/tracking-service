const router = require('express').Router()
const QueueService = require('../services/queue_service');
const TrackModel = require('../business/tracks');

router.post('', async (req, res) => {
  let { body: track } = req;

  // Fill server_timestamp and message_id
  track = TrackModel.process_track(track);

  try {
    await QueueService.send_track(track);
  } catch (ex) {
    res.status(500).send(ex);
  }

  res.status(201).send()
});

module.exports = router
