import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { createUser } from "./api.js";

dotenv.config({
    path: "./atlas-credentials.env"
});

const app = express();

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {

    try {

        await client.connect();

        console.log("MongoDB connected");

        const db = client.db("myDatabase");

        const users = db.collection("users");

        app.get("/", (req, res) => {
            res.send("Server is running");
        });

        app.post("/users", (req, res) => {
            createUser(req, res, users);
        });

        app.listen(4000, () => {
            console.log("Server running on port 4000");
        });

    } catch (error) {

        console.log("Error:", error);

    }
}

startServer();