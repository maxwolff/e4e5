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

interface IRawOpeningCount {
  [opening: string]: number;
}

interface IIndexedOpenings {
  white: IRawOpeningCount;
  black: IRawOpeningCount;
}

interface IOpeningResult {
  opening: string;
  count: number;
}

interface IOpeningResultColors {
  white: IOpeningResult[];
  black: IOpeningResult[];
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

const parseData = (data: string, username: string): IOpeningResultColors => {
  const games: string[] = data.split('\n\n\n').slice(0, -1);
  const gameData: IUserGame[] = games.reduce((acc, curr) => {
    acc.push(parseGameString(curr));
    return acc;
  }, []);
  const indexedOpenings: IIndexedOpenings = gameData.reduce<IIndexedOpenings>(
    (acc, curr) => {
      if (curr.variant === 'Standard') {
        const userColor: string = curr.white === username ? 'white' : 'black';
        const minimizedOpening: string = curr.opening.split(':')[0]; // Queen's Gambit: Declined => Queen's Gambit
        acc[userColor][minimizedOpening] = _.isUndefined(
          acc[userColor][minimizedOpening]
        )
          ? 1
          : acc[userColor][minimizedOpening] + 1;
      }
      return acc;
    },
    { white: {}, black: {} }
  );
  return _.mapValues<IOpeningResultColors>(indexedOpenings, objByColor => {
    const unsorted: IOpeningResultColors = _.keys(objByColor).map(opening => {
      return { opening: opening, count: objByColor[opening] };
    });
    return _.sortBy(unsorted, ['count']).reverse();
  });
};

export const getOpenings = async (
  username: string,
  numGames: number
): Promise<IOpeningResultColors> => {
  const result = await axios.get(
    `https://lichess.org/api/games/user/${username}?max=${numGames}&opening=true`
  );
  return parseData(result.data, username);
};
