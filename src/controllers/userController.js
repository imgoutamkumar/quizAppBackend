const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  try {
    //const user = await User.findById(req.params.userId);
    /* here using projection to restrict the response data */
    if (req.userId === req.params.userId) {
      const user = await User.findById(req.params.userId, {
        name: 1,
        email: 1,
      });
      /* using findOne method */
      //const user = await User.findOne({ _id: req.params.userId });
      if (user) {
        //return res.status(200).json(user);
        return res.send({ message: "user found", user: user });
      } else {
        return res.send("user not exist with this id");
      }
    } else {
      res.send("user not authorized");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await User.findById(userId);
    existingUser.name = req.body.name;
    await existingUser.save();
    return res.send({ message: "user updated", data: { existingUser } });
  } catch (error) {
    console.log(error);
  }
};

const filterUsers = async (req, res) => {
  const users = await User.find({
    location: +req.query.location,
    state: +req.query.state,
  });
  return res.status(200).json(users);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
};
