import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
// import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import contactRoutes from "./routes/ContactRoutes.js";
import messagesRoutes from "./routes/MessagesRutes.js";

dotenv.config();

// const express = require('express');
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
// const PORT = 8747;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: ['http://localhost:5173', 'https://localhost:5173'],
    // origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
})
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages",messagesRoutes);

const server = app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});

setupSocket(server);

mongoose.connect(databaseURL).then(() => console.log('DB Connection Successful')).catch(err=>console.log(err.Message));