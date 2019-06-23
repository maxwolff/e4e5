"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const parseGameString = (game) => {
    return game.split('\n').reduce((acc, curr) => {
        if (curr[0] === '1') {
            acc.moves = curr;
        }
        else if (curr) {
            const key = lodash_1.default.camelCase(curr.slice(1, -1).split(' ')[0]);
            const value = curr.split(`"`)[1];
            acc[key] = value;
        }
        return acc;
    }, {});
};
exports.parseData = (data) => {
    const games = data.split('\n\n\n').slice(0, -1);
    const gameData = games.reduce((acc, curr) => {
        acc.push(parseGameString(curr));
        return acc;
    }, []);
    console.log('gamedata', gameData.length);
    const parsedData = gameData.reduce((acc, curr) => {
        if (curr.variant === 'Standard') {
            console.log(curr.opening, acc[curr.opening], lodash_1.default.isUndefined(acc[curr.opening]));
            acc[curr.opening] = lodash_1.default.isUndefined(acc[curr.opening])
                ? 1
                : acc[curr.opening] + 1;
        }
        return acc;
    }, {});
    const indexedOpenings = lodash_1.default.keys(parsedData).map(key => {
        return { opening: key, count: parsedData[key] };
    });
    const sortedOpenings = lodash_1.default.sortBy(indexedOpenings, ['count']).reverse();
    return { openings: sortedOpenings };
};
exports.getOpenings = (username, numGames, color) => __awaiter(this, void 0, void 0, function* () {
    const result = yield axios_1.default.get(`https://lichess.org/api/games/user/${username}?color${color}&max=${numGames}&opening=true`);
    return exports.parseData(result.data);
});
//# sourceMappingURL=lichess.js.map