import { validationResult } from 'express-validator';
import Poster from '../models/PosterModel.js';

export async function createPoster(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
        const poster = await Poster.create({ title, content, userId });
        res.status(201).json({ message: 'Poster successfully created', poster });
    } catch (error) {
        res.status(500).json({ message: 'There was an error creating the poster', error });
    }
}