const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: 'b981a81418527397aa894f7fbcb37c24'
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
