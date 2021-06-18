module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket) {
        console.log('New Connection received', socket.id);

        socket.on('disconnect', function() {
            console.log(" Socket disconnected ");
        });

        // Request to join the room
        socket.on('join_room', function(data) {
            console.log('Joining request received', data);

            socket.join(data.chatroom); // allowing user to join the chatroom

            io.in(data.chatroom).emit('user_joined', data); // to emit the message to all other users in the room
        });

        
    })
}