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
    return game.split("\n").reduce((acc, curr) => {
        if (curr[0] === "1") {
            acc.moves = curr;
        }
        else if (curr) {
            const key = lodash_1.default.camelCase(curr.slice(1, -1).split(" ")[0]);
            const value = curr.split(`"`)[1];
            acc[key] = value;
        }
        return acc;
    }, {});
};
const parseData = (data, username) => {
    const games = data.split("\n\n\n").slice(0, -1);
    const gameData = games.reduce((acc, curr) => {
        acc.push(parseGameString(curr));
        return acc;
    }, []);
    const indexedOpenings = gameData.reduce((acc, curr) => {
        if (curr.variant === "Standard") {
            const userColor = curr.white == username ? "white" : "black";
            const minimizedOpening = curr.opening.split(':')[0]; // Queen's Gambit: Declined => Queen's Gambit
            acc[userColor][minimizedOpening] = lodash_1.default.isUndefined(acc[userColor][minimizedOpening])
                ? 1
                : acc[userColor][minimizedOpening] + 1;
        }
        return acc;
    }, { white: {}, black: {} });
    console.log('indxed openged', indexedOpenings);
    return lodash_1.default.mapValues(indexedOpenings, (objByColor) => {
        // for every color, 
        const unsorted = lodash_1.default.keys(objByColor).map((opening) => {
            // for every opening, reformat
            return { opening: opening, count: objByColor[opening] };
        });
        return lodash_1.default.sortBy(unsorted, ['count']).reverse();
    });
    // const unsortedResult: IOpeningResultColors = _.keys(indexedOpenings).map(color => {
    //   _.keys(indexedOpenings[color]).map(opening => {
    //     return { opening: opening, count: indexedOpenings[color][opening] }
    //   })
    // });
    // console.log('unsorted result', unsortedResult)
    // return _.keys(unsortedResult).map(color => {
    //   return _.sortBy(unsortedResult[color], ['count']).reverse();
    // })
};
exports.getOpenings = (username, numGames) => __awaiter(this, void 0, void 0, function* () {
    const result = yield axios_1.default.get(`https://lichess.org/api/games/user/${username}?max=${numGames}&opening=true`);
    return parseData(result.data, username);
});
//# sourceMappingURL=lichess.js.map