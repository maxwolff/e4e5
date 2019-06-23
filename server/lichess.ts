import axios from 'axios';
import _ from 'lodash';

interface IUserGame {
  event?: string; // Game type
  site?: string; // lichess link to game
  date?: string; // game time, ex: 2019.06.12
  white?: string; // white username
  black?: string; // black username
  result?: string; // white-black, ex '1-0'
  utcTime?: string; // 01:23:55
  whiteElo?: string;
  blackElo?: string;
  whiteRatingDiff?: string;
  blackRatingDiff?: string;
  variant?: string; // Game type.
  timeControl?: string;
  eco?: string; // ECO code
  opening?: string; // opening name
  moves?: string; // String of all moves in the game
  termination?: string; // normal, time out, etc
}

interface IParseOpenings {
  opening?: number; // number of openings observed
}

interface IOpeningCount {
  opening: string;
  count: number;
}

const parseGameString = (game: string): IUserGame => {
  return game.split('\n').reduce((acc: IUserGame, curr) => {
    if (curr[0] === '1') {
      acc.moves = curr;
    } else if (curr) {
      const key = _.camelCase(curr.slice(1, -1).split(' ')[0]);
      const value = curr.split(`"`)[1];
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const parseData = (data: string) => {
  const games: string[] = data.split('\n\n\n').slice(0, -1);
  const gameData: IUserGame[] = games.reduce((acc, curr) => {
    acc.push(parseGameString(curr));
    return acc;
  }, []);
  const parsedData = gameData.reduce((acc, curr) => {
    if (curr.variant === 'Standard') {
      acc[curr.opening] = _.isUndefined(acc[curr.opening])
        ? 1
        : acc[curr.opening] + 1;
    }
    return acc;
  }, {});
  const indexedOpenings: IOpeningCount[] = _.keys(parsedData).map(key => {
    return { opening: key, count: parsedData[key] };
  });
  const sortedOpenings = _.sortBy(indexedOpenings, ['count']).reverse();
  return { openings: sortedOpenings };
};

export const getOpenings = async (
  username: string,
  color: string,
  numGames: number
) => {
  const result = await axios.get(
    `https://lichess.org/api/games/user/${username}?color${color}&max=${numGames}&opening=true`
  );
  return parseData(result.data);
};
