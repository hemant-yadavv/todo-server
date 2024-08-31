const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

// Sign up route handler
exports.signup = async (req, res) => {
    try {
        // get data
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            })
        }

        // check if user already exist 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }


        // Secured password 
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        

        // Create Entry for User
        let user = await User.create({
            name, email, password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: user
        });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}


// login  route handler
exports.login = async (req, res) => {
    try {
        // get data
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            })
        }

        // check for registered user 
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exists, Please sign up",
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
        }

        // verify password and genetrate JWT token
        if (await bcrypt.compare(password, user.password)) {
            
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
            
            user = user.toObject();
            user.token = token;  
            user.password = undefined;
            

            const options = {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // would expire after 3 days
                httpOnly: true, // The cookie only accessible by the web server
            }

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged In Successfully"
            });

        }
        else {
            // password does't match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            });
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be login, Please try again later",
        })
    }
}