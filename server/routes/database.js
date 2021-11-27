const express = require('express');
const movie = require('../models/movie');
const watchList = require('../models/watchList');
const watchList = require('../models/user');

const router = Router();

//create - put

router.post('/register', async (req, res) => {
    const user = await getUserByUsername(username);
    const newList = createNewWatchList(name, description);
    user.update(
        {username: user.name}
        {$push : newList}
    )
    return res.status(200).json({
            newWatchList: newList
            allWatchLists: user.watchLists,
        });

});

//edit - post
router.post('/register', async (req, res) => {
    const user = await getUserByUsername(username);
    user.update(
        {username: user.name}
        {$push : newList}
    )
    return res.status(200).json({
            allWatchLists: user.watchLists,
        });

});

//delete - delete
router.delete('/register', async (req, res) => {
    const user = await getUserByUsername(username);
    user.update(
         {username: user.name}
         {$push : newList}
    )
    return res.status(200).json({
          allWatchLists: user.watchLists,
    });
});

//get
router.get('/getWatchLists', (req, res) => {
    Array watchList = getWatchLists();

    return res.status(200).json({
          message: 'Watchlist deleted',
        });
});

//functions

async function getWatchLists(username){
    if (!username) {
        throw Error('Please provide a valid username');
      }
      const user = await User.findOne({ username }).exec();
      return user.watchLists;
}

async function createNewWatchList(name, description){
    if (!name) {
        throw Error('Please provide a name for your watchlist');
      }
      const newList = await WatchList.create(parseNewList);

      return newList;
}

function parseNewList(name, description) {
  return { username, password };
}

async function updateWatchList(newName, newDescription){
    if (!newName || (name == newName)) {
        throw Error('Please provide a new name for your watchlist');
      }
      const newList = await WatchList.create(parseNewList);

      return newList;
}