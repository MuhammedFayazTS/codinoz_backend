const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const Token = require("../Models/tokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// register controller
const registerUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create new user with hashed password
    const newUser = await new User({
      ...req.body, // Include other fields from request body
      email,
      password: hashedPassword,
    }).save();

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/users/${newUser._id}/verify/${token.token}`;

    // Send verification email
    await sendEmail(newUser.email, "Verify Email", url);

    res
      .status(201)
      .json({
        message:
          "An email has been sent to your profile, please verify your email address",
      });
  } catch (error) {
    // Handle errors
    console.error("Error in registration:", error);
    res
      .status(500)
      .json({
        message:
          "An error occurred during registration, please try again later",
      });
  }
};

// login controller
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // If user is not verified
    if (!user.isVerified) {
      let token = await Token.findOne({ userId: user._id });

      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        console.log(url);
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(200)
        .json({ message: "An Email sent to your account please verify" });
    }

    // Compare the request body password with the password in db
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // If password matches, create token using jwt with id and secret key
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h", // Expiry time
    });

    // Send response with token
    res.status(200).json({ message: "Login successful", token,userId:user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyTokenController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "Invalid link" });

    const token = await Token.findOneAndDelete({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).json({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { isVerified: true });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  verifyTokenController,
};
