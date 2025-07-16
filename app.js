import express from "express";
import usersR from "./usersR.js";
import { config } from "dotenv";
config()

const app = express();
app.use(express.json());

// users routes
app.use('/users', usersR);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
