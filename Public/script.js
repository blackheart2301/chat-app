let username='';
const socket= io();

document.getElementById('join-btn').addEventListener('click',(e) => {
    e.preventDefault(); // stopping page from refreshing on clicking button i.e. stopping default behaviour of webpage
    username= document.getElementById('username-input').ariaValueMax;

    if(username.trim() != ''){
        //visible on home page only
        document.querySelector('.form-username').style.display='none';
        //visible on chat page
        document.querySelector('.chatroom-container').style.display='block';

    }
})
document.getElementById('send-btn').addEventListener('click',(e) => {
    e.preventDefault();
    const data= {
        username: username,
        message: document.getElementById('message-input').value,
    }
    //sending data to io
    socket.emit('message',data);
    //showing that message on ui
    addSentMessage(data);
})

//receiving message from io
socket.io('message',(data) =>{
    //sender dont need to get it back
    if(data.username !== username){
        addReceivedMessage(data);
    }
})
//function for sent messages
function addSentMessage(data){
    var msgDiv= document.createElement('div');
    msgDiv.innerText= `${data.username}:${data.message}`;
    msgDiv.setAttribute('class', 'message-sent');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}
//function for received messages
function addReceivedMessage(data){
    var msgDiv= document.createElement('div');
    msgDiv.innerText= `${data.username}:${data.message}`;
    msgDiv.setAttribute('class', 'message-received');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}
