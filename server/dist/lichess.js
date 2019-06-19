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
exports.getOpenings = (username, numGames) => __awaiter(this, void 0, void 0, function* () {
    const result = yield axios_1.default.get(`https://lichess.org/api/games/user/${username}?max=${numGames}&opening=true`);
    const gameData = result.data.split('\n').reduce((acc, curr, idx, src) => {
        if (curr !== '') {
            if (src[idx - 1] === '' && src[idx - 2] !== '') {
                // moves delimiter
                acc[acc.length - 1].moves = curr;
            }
            else {
                if (src[idx - 1] === '' && src[idx - 2] === '') {
                    // new game
                    acc.push({});
                }
                const key = lodash_1.default.camelCase(curr.slice(1, -1).split(' ')[0]);
                const value = curr.split(`"`)[1];
                acc[acc.length - 1][key] = value;
            }
        }
        return acc;
    }, [{}]);
    const parsedData = gameData.reduce((acc, curr) => {
        if (curr.variant === 'Standard') {
            // add opening for the first time
            if (lodash_1.default.isUndefined(acc[curr.opening]) === true) {
                acc[curr.opening] = { count: 1 };
            }
            else {
                // increment
                acc[curr.opening].count = acc[curr.opening].count + 1;
            }
        }
        return acc;
    }, {});
    const arr = lodash_1.default.keys(parsedData).map(key => {
        return { eco: key, count: parsedData[key].count };
    });
    return lodash_1.default.sortBy(arr, ['count']).reverse();
});
//# sourceMappingURL=lichess.js.map