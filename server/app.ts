import express from 'express';
import * as path from 'path';

import { getOpenings } from './lichess';

const app = express();

app.use(express.static(path.resolve('../client/build')));

app.get('/games/:username', async (req, res) => {
  console.log(req.params.username);
  const openings = await getOpenings(req.params.username, 10);
  console.log(openings);
  res.json(openings);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
