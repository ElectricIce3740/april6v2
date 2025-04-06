const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment port for hosting, default to 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data from the backend!' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});