import express from "express";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (user) {
            console.log("User already exists");
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
            },
            select: {
                id: true,
                username: true,
            }
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ err: "Failed to create user", error : error });
    }
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});