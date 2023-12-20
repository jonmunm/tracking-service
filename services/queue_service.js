const axios = require('axios');
const crypto = require('crypto');

// Also known as topic
const eventHubName = "tracks";
const eventHubNameSpace = "eh-tracks"
const baseEventHubUri = `https://${eventHubNameSpace}.servicebus.windows.net/${eventHubName}`
const simpleMessageEndpoint = `${baseEventHubUri}/messages?timeout=60&api-version=2014-01`
const saName = "SendKey";
const saKey = "rZAHfWkrxMnkFv0HzKMGTxl63f2MXC1s2+AEhAhy74o="

function createSharedAccessToken(uri, saName, saKey) { 
  if (!uri || !saName || !saKey) { 
    throw "Missing required parameter"; 
  } 
  var encoded = encodeURIComponent(uri); 
  var now = new Date(); 
  var week = 60*60*24*7;
  var ttl = Math.round(now.getTime() / 1000) + week;
  var signature = encoded + '\n' + ttl; 
  var hash = crypto.createHmac('sha256', saKey).update(signature, 'utf8').digest('base64'); 
  return 'SharedAccessSignature sr=' + encoded + '&sig=' + encodeURIComponent(hash) + '&se=' + ttl + '&skn=' + saName; 
}

const sas = createSharedAccessToken(baseEventHubUri, saName, saKey);

const send_track = async (track) => { 
    const response = await axios.post(simpleMessageEndpoint, track, { "headers" : { "Authorization" : sas, "Content-Type" : "application/atom+xml;type=entry;charset=utf-8" } });

    if (response.status === 401) {
        throw new Error("Authorization failure");
    }

    if (response.status === 500) {
        throw new Error(response);
    }   
}

module.exports = {
    send_track
}