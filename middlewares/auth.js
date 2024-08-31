const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // console.log("cookie", req.cookies.token);
        // console.log("body", req.body.token);
        // console.log("header", req.header("Authorization").replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        //verify token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch (error) {
            console.log("Unauthorized", error);
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal Error in auth"
        });
    }
};
