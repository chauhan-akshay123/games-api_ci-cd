const exp = require("constants");
const cors = require("cors");
const express = require("express");

const { getAllGames, getGameById } = require("./controllers");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to get all games
app.get("/games", async (req, res) => {
 const games = getAllGames();
 res.status(200).json({ games });
});

// Endpoint to game details by Id
app.get("/games/details/:id", async (req, res) => {
 const game = getGameById(parseInt(req.params.id));
 res.status(200).json({ game });
});

module.exports = { app };
