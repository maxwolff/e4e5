import express from 'express';
import * as path from 'path';

import { getOpenings } from './lichess';

const app = express();

app.use(express.static(path.resolve('./client/build')));

const maxGames = 100;

app.get('/api/:username/:numGames', async (req, res) => {
  console.log(
    'getting',
    req.params.numGames,
    ' from ',
    req.params.username
  );
  // if (req.params.numGames > maxGames) throw `Requested more than maximum ${maxGames} games`;
  const openings = await getOpenings(
    req.params.username,
    req.params.numGames
  );
  res.json(openings);
});
 
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.resolve('./client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

// testing
// (async () => {
//   const result = await getOpenings('lasergun', numGames);
//   console.log('result', result);
// })();
