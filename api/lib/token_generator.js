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
      },
      secret,
      {
        expiresIn: '1d', // sets exp key in token
      },
    );
  }
}

module.exports = TokenGenerator;
