const express = require('express');
const app = express();
const cors = require('cors');

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const dbConnect = require("./config/database");
dbConnect();

const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to the Todo App");
});