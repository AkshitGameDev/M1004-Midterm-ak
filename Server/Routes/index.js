"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const games_1 = require("../Controllers/games");
router.get('/', (req, res, next) => { (0, games_1.DisplayGameList)(req, res, next); });
router.get('/:id', (req, res, next) => { (0, games_1.DisplayGameById)(req, res, next); });
router.post('/add', (req, res, next) => { (0, games_1.AddGame)(req, res, next); });
router.put('/update/:id', (req, res, next) => { (0, games_1.UpdateGame)(req, res, next); });
router.delete('/delete/:id', (req, res, next) => { (0, games_1.DeleteGame)(req, res, next); });
exports.default = router;
//# sourceMappingURL=index.js.map