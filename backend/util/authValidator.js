const jwt = require('jsonwebtoken');
const { User } = require('../model');

const JWT_SECRET = 'myetsysuperdupersecret';

const validate = async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.id;
    console.log(decoded);

    const user = await User.findOne({ _id: userId });
    if (!user) {
        return false;
    }

    return {user: decoded.id, valid: true};
};

module.exports = validate;
