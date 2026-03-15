import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
    console.log("Client connected");
    await prisma.user.create({
        data: {
            username: Math.random().toString(),
            password: "1234",
        }
    });
    ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server started on port 8080");