const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

/**
 * This class is used to generate a JWT authentication
 * token for a specific user.
 */
class TokenGenerator {
  static jsonwebtoken(user_id) {
    return JWT.sign(
      {
        user_id: user_id,
        iat: Math.floor(Date.now() / 1000),

        // Set the JWT token to expire in 1 day ( 24 hours * 60 minutes * 60 seconds)
        // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      },
      secret,
      {
        expiresIn: '1d', // sets exp key in token
      },
    );
  }
}

module.exports = TokenGenerator;
