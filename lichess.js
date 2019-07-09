"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var parseGameString = function (game) {
    return game.split('\n').reduce(function (acc, curr) {
        if (curr[0] === '1') {
            acc.moves = curr;
        }
        else if (curr) {
            var key = lodash_1["default"].camelCase(curr.slice(1, -1).split(' ')[0]);
            var value = curr.split("\"")[1];
            acc[key] = value;
        }
        return acc;
    }, {});
};
exports.parseData = function (data, username) {
    var games = data.split('\n\n\n').slice(0, -1);
    var gameData = games.reduce(function (acc, curr) {
        acc.push(parseGameString(curr));
        return acc;
    }, []);
    var indexedOpenings = gameData.reduce(function (acc, curr) {
        if (curr.variant === 'Standard') {
            var userColor = curr.white.toLowerCase() === username.toLowerCase() ? 'white' : 'black';
            var minimizedOpening = curr.opening.split(':')[0]; // Queen's Gambit: Declined => Queen's Gambit
            acc[userColor][minimizedOpening] = lodash_1["default"].isUndefined(acc[userColor][minimizedOpening])
                ? 1
                : acc[userColor][minimizedOpening] + 1;
        }
        return acc;
    }, { white: {}, black: {} });
    var openingResultColors = lodash_1["default"].mapValues(indexedOpenings, function (objByColor) {
        var unsorted = lodash_1["default"].keys(objByColor).map(function (opening) {
            return { opening: opening, count: objByColor[opening] };
        });
        return lodash_1["default"].sortBy(unsorted, ['count']).reverse();
    });
    openingResultColors.blackCount = openingResultColors.black.reduce(function (acc, curr) {
        return acc + curr.count;
    }, 0);
    openingResultColors.whiteCount = openingResultColors.white.reduce(function (acc, curr) {
        return acc + curr.count;
    }, 0);
    return openingResultColors;
};
