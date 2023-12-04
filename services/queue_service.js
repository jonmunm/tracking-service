const { EventHubProducerClient } = require("@azure/event-hubs");
const connectionString = "Endpoint=sb://ehtracking.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=W01ObgobV3BA9aKSQ2UVW4dZIQAHaNo17+AEhAnKX7Y=";
const eventHubName = "refunds"

const send_track = async (track) => {
  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch one events.
  let batch = await producer.createBatch();

  const added = batch.tryAdd({ body: track });  
  if ( !added) {
    throw new Error("The message was not added to the batch")
  }
  console.log(`Added event to the batch`);

  // Send the batch to the event hub.
  await producer.sendBatch(batch);
  console.log(`Sent ${batch.count} messages`);

  if (batch.count > 0) {
    console.log(`Sending remaining ${batch.count} messages as a single batch.`);
    await producer.sendBatch(batch);
  }

  // Close the producer client.
  await producer.close();  
}

module.exports = {
    send_track
}