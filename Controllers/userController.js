const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

// register controller
const registerUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create new user with hashed password
    const newUser = new User({
      ...req.body, // Include other fields from request body
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(403).json({ message: "User not verified email" });
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
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
