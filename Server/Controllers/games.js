"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGame = exports.UpdateGame = exports.AddGame = exports.DisplayGameById = exports.DisplayGameList = void 0;
const games_1 = __importDefault(require("../Models/games"));
const Util_1 = require("../Util");
function DisplayGameList(req, res, next) {
    games_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Game List Retrieved and Displayed", data: data });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error retrieving game list", data: [] });
    });
}
exports.DisplayGameList = DisplayGameList;
function DisplayGameById(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a game", data: "" });
    }
    else {
        games_1.default.findById(id)
            .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Game Retrieved and Displayed", data: data });
            }
            else {
                res.status(404).json({ success: false, msg: "Game not found", data: "" });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error retrieving game", data: "" });
        });
    }
}
exports.DisplayGameById = DisplayGameById;
function AddGame(req, res, next) {
    let genres = req.body.genres ? (0, Util_1.SanitizeArray)(req.body.genres) : [];
    let developers = req.body.developers ? (0, Util_1.SanitizeArray)(req.body.developers) : [];
    let designers = req.body.designers ? (0, Util_1.SanitizeArray)(req.body.designers) : [];
    let publishers = req.body.publishers ? (0, Util_1.SanitizeArray)(req.body.publishers) : [];
    let artists = req.body.artists ? (0, Util_1.SanitizeArray)(req.body.artists) : [];
    let game = new games_1.default({
        title: req.body.title,
        genres: genres,
        platforms: req.body.platforms,
        releaseDate: req.body.releaseDate,
        developers: developers,
        designers: designers,
        publishers: publishers,
        rating: req.body.rating,
        description: req.body.description,
        imageURL: req.body.imageURL,
        artists: artists,
        modes: req.body.modes
    });
    games_1.default.create(game)
        .then(() => {
        res.status(200).json({ success: true, msg: "Game added", data: game });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error adding game", data: "" });
    });
}
exports.AddGame = AddGame;
function UpdateGame(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a game", data: "" });
    }
    else {
        let genres = req.body.genres ? (0, Util_1.SanitizeArray)(req.body.genres) : [];
        let developers = req.body.developers ? (0, Util_1.SanitizeArray)(req.body.developers) : [];
        let designers = req.body.designers ? (0, Util_1.SanitizeArray)(req.body.designers) : [];
        let publishers = req.body.publishers ? (0, Util_1.SanitizeArray)(req.body.publishers) : [];
        let artists = req.body.artists ? (0, Util_1.SanitizeArray)(req.body.artists) : [];
        let gameToUpdate = {
            title: req.body.title,
            genres: genres,
            platforms: req.body.platforms,
            releaseDate: req.body.releaseDate,
            developers: developers,
            designers: designers,
            publishers: publishers,
            rating: req.body.rating,
            description: req.body.description,
            imageURL: req.body.imageURL,
            artists: artists,
            modes: req.body.modes
        };
        games_1.default.findByIdAndUpdate(id, gameToUpdate, { new: true })
            .then((updatedGame) => {
            if (updatedGame) {
                res.status(200).json({ success: true, msg: "Game updated", data: updatedGame });
            }
            else {
                res.status(404).json({ success: false, msg: "Game not found", data: "" });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error updating game", data: "" });
        });
    }
}
exports.UpdateGame = UpdateGame;
function DeleteGame(req, res, next) {
    let id = req.params.id;
    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a game", data: "" });
    }
    else {
        games_1.default.findByIdAndDelete(id)
            .then((deletedGame) => {
            if (deletedGame) {
                res.status(200).json({ success: true, msg: "Game deleted", data: id });
            }
            else {
                res.status(404).json({ success: false, msg: "Game not found", data: "" });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error deleting game", data: "" });
        });
    }
}
exports.DeleteGame = DeleteGame;
//# sourceMappingURL=games.js.map