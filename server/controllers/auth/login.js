const User = require('../../models/userModel')
const { body, validationResult } = require("express-validator");
var  bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = [
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),

    async (req, res) => {
    try {
        const { email, password } = req.body;

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

        const token =   jwt.sign(
            { userId: userDetails._id },
            process.env.JWT_SECRET
        );
        
        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            name: userDetails.name,
        });

    }
    catch (err) {
        res.status(500).json({ message: err });
    }  
} 
];
