import express from 'express';
import * as path from 'path';

import { getOpenings } from './lichess';

const app = express();

app.use(express.static(path.resolve('../client/build')));

const maxGames = 100;

app.get('/games/:username/:numGames', async (req, res) => {
  console.log(
    'getting',
    req.params.numGames,
    ' from ',
    req.params.username
  );
  if (req.params.numGames > maxGames) throw `Requested more than maximum ${maxGames} games`;
  const openings = await getOpenings(
    req.params.username,
    req.params.numGames
  );
  res.json(openings);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

// testing
// (async () => {
//   const result = await getOpenings('lasergun', numGames);
//   console.log('result', result);
// })();