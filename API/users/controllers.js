/* Requires */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

// Database
const { User } = require("../../db/models");
const { Profile } = require("../../db/models/");
/* Requires */

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    // create profile after creating the user
    const newProfile = await Profile.create({ userId: newUser.id });
    newUser.update({ profileId: newProfile.id });

    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
      image: newProfile.image,
      bio: newProfile.bio,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;

  // fetch profile to include image and bio to match signup payload

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
    // image: profile.image,
    // bio: profile.bio,
  };

  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
