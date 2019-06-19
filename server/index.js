const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve('../client/build')));

app.get('/games', (req, res) => {
  res.json('1,2,3');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
