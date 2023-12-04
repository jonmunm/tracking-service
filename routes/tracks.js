const router = require('express').Router()
const QueueService = require('../services/queue_service');

router.post('', async (req, res) => {
  const { body: track } = req

  try {
    await QueueService.send_track(track);
  } catch (ex) {
    res.status(500).send(ex);
  }

  //console.log(track);
  res.status(201).send()
});

module.exports = router
