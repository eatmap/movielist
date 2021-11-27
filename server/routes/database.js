const express = require('express');
const movie = require('../models/movie');
const watchList = require('../models/watchList');
const watchList = require('../models/user');
const { addToWatchlist, getWatchList, removeFromWatchlist } = require('../services/DatabaseService');

const router = Router();

//get
router.get('/getWatchList', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({
            message: 'Please provide user credentials',
        });
    }

    const watchList = getWatchList(username);

    return res.status(200).json({
        watchList
    });
});

router.put('/addToWatchlist', async (req, res) => {
    const { username, movieId, movieTitle, moviePosterPath } = req.body;

    if (!username || !movieId || !movieTitle || !moviePosterPath) {
        return res.status(400).json({
            message: 'Please provide the correct parameters.',
        });
    }

    try {
        addToWatchlist(username, movieId, movieTitle, moviePosterPath);
    } catch {
        return res.status(500).json({
            message: 'Something went wrong.',
        });
    }

    return res.status(200).json({
        message: 'Movie added to the watchlist.',
    });

});

router.delete('/removeFromWatchlist', async (req, res) => {
    const { username, movieId } = req.body;

    removeFromWatchlist(username, movieId);

    return res.status(200).json({
          message: 'Movie removed from watchlist.',
    });
});