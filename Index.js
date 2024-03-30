const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(cors());

const server = http.createServer(app); // Create HTTP server

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


app.get("/hello", (req, res) => {
    res.send("hello world");
});



// Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

io.on("connection", (socket) => {
    // Listen for "current-location" event from the client
    console.log("Connected Client");

    socket.on("disconnect", () => {
        console.log(`Client disconnected. Socket ID: ${socket.id
            }`);
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});