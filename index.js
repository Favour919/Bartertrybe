const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { pool } = require('./database/database'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('requestUserData', () => {
        pool.query(`SELECT * FROM users`, (err, result) => {
            if (err) {
                socket.emit('userData', { error: err.message });
            } else {
                socket.emit('userData', result);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));