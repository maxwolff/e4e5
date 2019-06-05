const axios = require('axios');
const _ = require('lodash');

export const getGameData = async (username, numGames) => {
  const result = await axios.get(
    `https://lichess.org/api/games/user/${username}?max=${numGames}&opening=true`
  );
  return result.data.split('\n').reduce(
    (acc, curr, idx, src) => {
      if (curr !== '') {
        if (src[idx - 1] === '' && src[idx - 2] !== '') {
          // moves delimiter
          acc[acc.length - 1]['moves'] = curr;
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
};

export const parseOpenings = (gameData, username) => {
  const obj = gameData.reduce((acc, curr) => {
    if (curr.variant === 'Standard') {
      if (_.isUndefined(acc[curr.opening]) === true) {
        acc[curr.opening] = { count: 1 };
      } else {
        acc[curr.opening].count = acc[curr.opening].count + 1;
      }
    }
    return acc;
  }, {});
  const arr = _.keys(obj).map(key => {
    return { eco: key, count: obj[key].count };
  });
  return _.sortBy(arr, ['count']).reverse();
};
