const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.send("user already exist with this email");
      throw new Error("user already exist with this email");
    }
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      "longtoughsecretkey",
      { expiresIn: 60 * 60 }
    );
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.send("user not found");
    } else {
      const match = await bcrypt.compare(password, isUserExist.password);
      if (match) {
        const token = jwt.sign(
          {
            userId: isUserExist._id,
            role: isUserExist.role,
          },
          "longtoughsecretkey",
          { expiresIn: 60 * 60 }
        );
        return res.send({
          message: "login success",
          userId: isUserExist._id,
          jwt: token,
          role: isUserExist.role,
        });
      } else {
        return res.send("incorrect password");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };
