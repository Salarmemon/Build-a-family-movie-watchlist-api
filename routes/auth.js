import express from "express";
import { findByUsername } from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({error: "Missing credentials"});
    }
    const user = findByUsername(username);
    if(!user) {
        return res.status(401).json({error: "User not found"});
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) {
        return res.status(401).json({error: "Invalid credentials"});
    }
    const token = jwt.sign({
        id: user.id, username: user.username, role: user.role}, 
        process.env.JWT_SECRET, {expiresIn: "1d"});

    return res.status(200).json({message: "Login successful", token})

})
export default router;
