const User = require('../../models/userModel')
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),

    async (req, res) => {
        try {
            const { name, email, password } = req.body;

            //check duplicate user should exists based on the email field
            const isExistingUser = await User.findOne({ email: email });
            if (isExistingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userData = new User({
                name,
                email,
                password: hashedPassword,
            });
            const userResponse = await userData.save();

            //Generate JWT token
            const token = jwt.sign(
                { userId: userResponse._id },
                process.env.JWT_SECRET
            );

            return res.status(200).json({
                message: "User registered successfully",
                token: token,
                name: name,
            });

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err });
        }
    },
];
