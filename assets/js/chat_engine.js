class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000'); // io is global variable available due to cdn (socket)

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    // This will handle the to and fro interactions with the observer and subscribers
    connectionHandler() {
        let self = this;

        this.socket.on('connect', function(){
            console.log("Connection established using sockets ... ");

            // Request by client to join the room
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeorzo'
            });

            self.socket.on('user_joined', function(data){
                console.log(" a user joined ", data);
            })
        });

    }
} 