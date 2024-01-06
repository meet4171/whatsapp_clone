import { Server } from "socket.io";

export var activeUsers = [];
export const io = new Server(9000, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:8080'],
    }
});

io.on('connection', (socket) => {
    console.log("Connection established");

    socket.on('getUsers', (userData) => {
        addUsers(userData, socket.id);
        io.emit('activeUsers', activeUsers);
    });

    socket.on('addMessage', (message) => {
        const user = findUser(message.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', message);
        } else {
            console.log('User not found');
        }
    });

    socket.on('addFile', (message) => {
        const user = findUser(message.receiverId);
        if (user) {
            io.to(user.socketId).emit('fileDetails', message);
        } else {
            console.log('User not found');
        }
    });
});

function addUsers(userData, socketId) {
    if (activeUsers.find(user => user.sub === userData.sub) === undefined) {
        activeUsers.push({ ...userData, socketId });
    }
}

export function findUser(receiverId) {
    return activeUsers.find(user => user.sub === receiverId);
}
