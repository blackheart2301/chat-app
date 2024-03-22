//importing express
const express= require('express');
//make an express app
const app= express();
//setting communication b/w server and my app
const server= require('http').Server(app);
//integrating my public folder with backend server
app.use(express.static('public'));
//integrating server with io
const io= require('socket.io')(server);
//server will be having io
io.on('coonection',(socket) => {
    console.log('connection established', socket.id);
    // socketA -> io -> socketB
    //socketA is triggering a message event
    socket.on('message',(data) => { // user is sending message 
        io.emit('message',data); // io is emitting message to all sockets
    })
    //if connection with user lost
    socket.on('disconnect',() => {
        console.log(socket.id,'->left the chatroom');
    })
})

const PORT= 9000;
server.listen(PORT,() => {
    console.log("TEST!")
});