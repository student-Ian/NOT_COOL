import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
app.use(bodyParser.json());

app.post('/register-token', async (req, res) => {
  const { token } = req.body;
  console.log('Received push token:', token);

  // Optional: store to DB or send test push
  const message = {
    to: token,
    sound: 'default',
    title: 'Test Push',
    body: 'This is a push notification from backend',
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  res.send({ success: true });
});

app.listen(3000, () => {
  console.log('🚀 Backend running on http://localhost:3000');
});
