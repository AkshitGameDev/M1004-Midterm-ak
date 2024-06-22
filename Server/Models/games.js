"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    gameId: String,
    title: String,
    genres: [String],
    platforms: [String],
    releaseDate: Date,
    developers: [String],
    designers: [String],
    publishers: [String],
    rating: String,
    description: String,
    imageURL: String,
    artists: [String],
    modes: [String]
});
const Game = (0, mongoose_1.model)('Game', gameSchema);
exports.default = Game;
//# sourceMappingURL=games.js.map