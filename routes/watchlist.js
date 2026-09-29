import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";

const router = express.Router();
router.use(authenticate);


router.get("/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const watchlist = getWatchlist(userId);
    res.status(200).json({ watchlist })
})

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const added = addMovie(userId, req.body);
    if(!added) {
        return res.status(404).json({error: "User not found"});

    }
    return res.status(201).json({message: "Movie added successfully"});

})

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const updated = updateMovie(userId, movieId, req.body);
    if(!updated) {
        return res.status(404).json({error: "User not find"});
    }
    return res.status(200).json({message: "Movie updated succefully"});
})

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const deleted = deleteMovie(userId, movieId);
    if(!deleted) {
        return res.status(404).json({error: "User not found"});
    }
    return res.status(200).json({message: "Movie deleted successfully"});
})
export default router;
