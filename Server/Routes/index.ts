import express from 'express';
const router = express.Router();

import { DisplayGameList, DisplayGameById,AddGame,UpdateGame,DeleteGame } from '../Controllers/games'; 


router.get('/', (req, res, next) => {  DisplayGameList(req, res, next); });

router.get('/:id', (req, res, next) => {  DisplayGameById(req, res, next); });

router.post('/add', (req, res, next) => {  AddGame(req, res, next); });

router.put('/update/:id', (req, res, next) => {  UpdateGame(req, res, next); });

router.delete('/delete/:id', (req, res, next) => {  DeleteGame(req, res, next); });

export default router;
