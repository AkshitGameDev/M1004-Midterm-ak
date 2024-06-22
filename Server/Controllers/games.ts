import { Request, Response, NextFunction } from 'express';
import Game from '../Models/games'; // Assuming the Game model is defined similarly
import { SanitizeArray } from '../Util'; // Assuming SanitizeArray utility function is defined

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayGameList(req: Request, res: Response, next: NextFunction): void {
    Game.find({})
    .then((data) => {
        res.status(200).json({ success: true, msg: "Game List Retrieved and Displayed", data: data });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error retrieving game list", data: [] });
    });
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayGameById(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a game", data: "" });
    } else {
        Game.findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Game Retrieved and Displayed", data: data });
            } else {
                res.status(404).json({ success: false, msg: "Game not found", data: "" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error retrieving game", data: "" });
        });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddGame(req: Request, res: Response, next: NextFunction): void {
    let genres = req.body.genres ? SanitizeArray(req.body.genres as string) : [];
    let developers = req.body.developers ? SanitizeArray(req.body.developers as string) : [];
    let designers = req.body.designers ? SanitizeArray(req.body.designers as string) : [];
    let publishers = req.body.publishers ? SanitizeArray(req.body.publishers as string) : [];
    let artists = req.body.artists ? SanitizeArray(req.body.artists as string) : [];

    let game = new Game({
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

    Game.create(game)
    .then(() => {
        res.status(200).json({ success: true, msg: "Game added", data: game });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error adding game", data: "" });
    });
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateGame(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a game", data: "" });
    } else {
        let genres = req.body.genres ? SanitizeArray(req.body.genres as string) : [];
        let developers = req.body.developers ? SanitizeArray(req.body.developers as string) : [];
        let designers = req.body.designers ? SanitizeArray(req.body.designers as string) : [];
        let publishers = req.body.publishers ? SanitizeArray(req.body.publishers as string) : [];
        let artists = req.body.artists ? SanitizeArray(req.body.artists as string) : [];

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

        Game.findByIdAndUpdate(id, gameToUpdate, { new: true })
        .then((updatedGame) => {
            if (updatedGame) {
                res.status(200).json({ success: true, msg: "Game updated", data: updatedGame });
            } else {
                res.status(404).json({ success: false, msg: "Game not found", data: "" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error updating game", data: "" });
        });
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteGame(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a game", data: "" });
    } else {
        Game.findByIdAndDelete(id)
        .then((deletedGame) => {
            if (deletedGame) {
                res.status(200).json({ success: true, msg: "Game deleted", data: id });
            } else {
                res.status(404).json({ success: false, msg: "Game not found", data: "" });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error deleting game", data: "" });
        });
    }
}
