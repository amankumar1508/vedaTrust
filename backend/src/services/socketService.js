let io;

exports.init = (server) => {
    const { Server } = require("socket.io");
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Join user to their private room
        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    return io;
};

exports.getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

/**
 * @desc Send real-time notification to specific user
 */
exports.notifyUser = (userId, event, data) => {
    if (io) {
        io.to(userId).emit(event, data);
    }
};

/**
 * @desc Broadcast to all connected users
 */
exports.broadcast = (event, data) => {
    if (io) {
        io.emit(event, data);
    }
};
