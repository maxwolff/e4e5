"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lichess_1 = require("./lichess");
// const app = express();
// app.use(express.static(path.resolve('../client/build')));
// const numGames = 30;
// app.get('/games/:username', async (req, res) => {
//   const openings = await getOpenings(req.params.username, numGames);
//   res.json(openings);
// });
// const port = process.env.PORT || 5000;
// app.listen(port);
// console.log('App is listening on port ' + port);
(() => __awaiter(this, void 0, void 0, function* () {
    const f = yield lichess_1.getOpenings('drnykterstein', 50, 'black');
    console.log(f);
}))();
//# sourceMappingURL=app.js.map