const express = require('express');
const PORT = process.env.HTTP_PORT || 4001;
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('just gonna send it');
});
app.get('/flower', (req, res) => {
  console.log('flower')
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish'
  });
});
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});