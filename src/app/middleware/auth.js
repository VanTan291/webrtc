const jwt = require('jsonwebtoken')

class Auth {
  authenticateToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'my_sercet_key', (err, data) => {
          if (err) {
            return res.sendStatus(403);
          } 
          
          req.user = data.user;
          next();
        });
    } else {
        res.sendStatus(403);
    }
  }
}

module.exports = new Auth;