// it will be the observer from socket.io 
// when message is sent by (subscriber)client (/assets/js/chat_engine.js)
// this observer will pass the message to the other side
module.exports.chatSockets = function(socketServer){

    let io = require('socket.io')(socketServer)
    io.sockets.on('connection',function(){
        console.log('new connection received',socket.id);
    })

    // socket.on('disconnect',function(){
    //     console.log('socket disconnect !!');
    // })

}