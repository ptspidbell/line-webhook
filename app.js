const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

app.post('/webhook', async (req, res) => {
  req.body.events.forEach(async event => {
    if (event.source?.type === 'group') {
      const gid = event.source.groupId;
      console.log('📌 群組 ID：', gid);
      await axios.post('https://api.line.me/v2/bot/message/reply', {
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: '群組 ID 是：' + gid }]
      }, { headers: { 'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN }});
    }
  });
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Running on port', port));
