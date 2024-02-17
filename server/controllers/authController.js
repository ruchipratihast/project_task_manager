const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//registerController
const register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        //check for the fields that are required for register a user
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                error: "Bad Request",
            });
        }

        //check duplicate user should exists based on the email field
        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
        });
        const userResponse = await userData.save();

        //Generate JWT token
        const token = await jwt.sign(
            { userId: userResponse._id },
            process.env.JWT_SECRET
        );

        return res.json({
            message: "User registered successfully",
            token: token,
            name: name,
        });

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}


//loginController
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check for the fields that are required for login
        if (!email || !password) {
            return res.status(400).json({
                error: "Bad Request",
            });
        }

        //check user or not
        const userDetails = await User.findOne({ email });
        if (!userDetails) {
            return res
                .status(401)
                .json({ error: "Invalid credentials" });
        }

        //check user's password is match or not
        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );
        if (!passwordMatch) {
            return res
                .status(402)
                .json({ error: "Invalid credentials" });
        }

        const token = await jwt.sign(
            { userId: userDetails._id },
            process.env.JWT_SECRET
        );
        return res.json({
            message: "User logged in successfully",
            token: token,
            name: userDetails.name,
        });

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = {
    register,
    login
}