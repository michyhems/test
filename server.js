require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/cors");
const bodyParser = require("body-parser");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (err) {
        console.error(err);
    }
};

connectDB();
app.use(cors(corsOptions));
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//put routes here.
//app.use("/api", require("./routes/api"));



app.listen(PORT, () =>
    console.log(`Server has started and listening on port ${PORT}`)
);