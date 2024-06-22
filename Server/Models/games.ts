import { Schema, model, Document } from 'mongoose';

export interface IGame extends Document {
    gameId: string;
    title: string;
    genres: string[];
    platforms: string[];
    releaseDate: Date;
    developers: string[];
    designers: string[];
    publishers: string[];
    rating: string;
    description: string;
    imageURL: string;
    artists: string[];
    modes: string[];
}

const gameSchema = new Schema<IGame>({
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

const Game = model<IGame>('Game', gameSchema);

export default Game;
