const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Read header token
    const token = req.header('x-auth-token');

    console.log(token);

    //Check if there is a token
    if(!token) {
        return res.status(401).json({ msg: 'No token, invalid permission' });
    };

    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'No token, invalid permission' })
    }

    //Validate token
}