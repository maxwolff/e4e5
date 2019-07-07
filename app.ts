import axios from 'axios';
import express from 'express';
import * as path from 'path';

import { parseData } from './lichess';

const app = express();

app.use(express.static(path.resolve('./client/build')));

const maxGames = 100;

app.get('/api/:username/:numGames', async (req, res) => {
  if (req.params.numGames > maxGames) throw new Error(`Requested more than maximum ${maxGames} games`);
  console.log('getting', req.params.numGames,' from ',req.params.username);
  const url = `https://lichess.org/api/games/user/${req.params.username}?max=${req.params.numGames}&opening=true`
  console.log(url)
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
  console.log(response.data)
  const openings =  parseData(response.data, req.params.username);
  res.json(openings);
});
 
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.resolve('./client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);