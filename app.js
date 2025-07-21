import express from "express";
import usersR from "./usersR.js";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// const users = [
//   {
//     id: 1,
//     username: "moshe",
//     password: "HASHED_PASSWORD",  
//     role: "admin",
//     email: "moshe@gmail.com"
//   }
// ];

config()
console.log('JWT_SECRET =', process.env.JWT_SECRET);


const app = express();
app.use(express.json());
app.use(cookieParser());
// users routes

app.use('/users', usersR);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
