const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const myname = prompt('Enter your name join');


socket.emit('new-user-joined', myname, (name) => {
    document.getElementById('new-user').innerHTML= 'New user joined ' + myname ;
});