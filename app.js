const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: 'brHRPebrS5dhdaMZrXw4if9RdSlE1DJwAaUoJThdiZpdwE2xL7jDe9SlJnDWZHFIu/HQCq3et2vsnFiydgQbnR3Q7MbA4Gz2phonlflhbKsDX1jZrHvpZaF6Tae2TmCGs+ZXCMzQ2Vuo+5fPFUhA6AdB04t89/1O/w1cDnyilFU='
};

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(event => {
    console.log(event);
    return Promise.resolve(null); // 不回覆任何訊息
  }))
  .then(result => res.json(result))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
