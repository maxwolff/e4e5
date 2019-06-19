import axios from 'axios';
import _ from 'lodash';

export const getOpenings = async (username, numGames) => {
  const result = await axios.get(
    `https://lichess.org/api/games/user/${username}?max=${numGames}&opening=true`
  );
  const gameData = result.data.split('\n').reduce(
    (acc, curr, idx, src) => {
      if (curr !== '') {
        if (src[idx - 1] === '' && src[idx - 2] !== '') {
          // moves delimiter
          acc[acc.length - 1].moves = curr;
        } else {
          if (src[idx - 1] === '' && src[idx - 2] === '') {
            // new game
            acc.push({});
          }
          const key = _.camelCase(curr.slice(1, -1).split(' ')[0]);
          const value = curr.split(`"`)[1];
          acc[acc.length - 1][key] = value;
        }
      }
      return acc;
    },
    [{}]
  );
  const parsedData = gameData.reduce((acc, curr) => {
    if (curr.variant === 'Standard') {
      // add opening for the first time
      if (_.isUndefined(acc[curr.opening]) === true) {
        acc[curr.opening] = { count: 1 };
      } else {
        // increment
        acc[curr.opening].count = acc[curr.opening].count + 1;
      }
    }
    return acc;
  }, {});
  const arr = _.keys(parsedData).map(key => {
    return { eco: key, count: parsedData[key].count };
  });
  return _.sortBy(arr, ['count']).reverse();
};
