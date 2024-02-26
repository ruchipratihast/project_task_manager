const User = require('../../models/userModel')
var bcrypt = require("bcrypt");

module.exports = [
    async (req, res) => {
        try {
            const { newName, oldPassword, newPassword } = req.body;
            const userId = req.params.userId;
    
            // Find the user by ID
            const user = await User.findById(userId);
    
            //check user's password is match or not
            const passwordMatch = await bcrypt.compare(
                oldPassword,
                user.password
            );
            if (!passwordMatch) {
                return res
                    .status(400)
                    .json({ error: "Incorrect old password" });
            }
    
            // Update the user's name if a new name is provided
            if (newName) {
                user.name = newName;
            }
    
            // Update the user's password if a new password is provided
            if (newPassword) {
                user.password = await bcrypt.hash(newPassword, 10);
            }
    
            // Save the updated user object
            await user.save();

            res.status(200).json({ message: 'User Updated Successfully' });
        }
        catch (err) {
            return res.status(500).json({ message: 'Error changing password' });
        }
    }
];


