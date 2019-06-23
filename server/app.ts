import express from 'express';
import * as path from 'path';

import { getOpenings } from './lichess';

const app = express();

app.use(express.static(path.resolve('../client/build')));

const numGames = 50;

app.get('/games/:username', async (req, res) => {
  const openings = await getOpenings(
    req.params.username,
    req.params.color,
    numGames
  );
  res.json(openings);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

// testing
// (async () => {
//   const f = await getOpenings('drnykterstein', 'black', numGames);
//   console.log(f);
// })();
