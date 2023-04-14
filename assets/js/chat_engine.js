// it will receive message from front-end or client
// it is called subscriber for socket.io (observer)

class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:6000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connect',function(){
            console.log('Connection established using sockets ...')
        });
    }
}

//working :
// when server starts from home.ejs , frontend script is called to establish connection by calling chatEngine
// code flow comes to this file and using io it establishes connection with the given port number like this {this.socket = io.connect('http://localhost:5000');} and socket is produced
// then code flow takes returned socket to the observer (chat_socket.js) and observer confirms the connection establishment automatically whenever front end tries to connect and gives valid scoket
// 