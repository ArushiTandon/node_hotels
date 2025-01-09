const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //check if authorization header is present
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token not found'});

    //check if token is present in the header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized'});

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized'}); 
    }
}

//generate token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: '24h'});
}
module.exports = {jwtAuthMiddleware, generateToken};