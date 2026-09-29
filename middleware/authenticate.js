import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export function authenticate(req, res, next) {
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.toLowerCase().startsWith("bearer ")) {
        return res.status(401).json({error: "No token provided."});
    }
    const token = authHeaders.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
         return res.status(401).json({error: "Invalid or expired token."});

    }
   

}
