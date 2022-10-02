var users = [];

// join user

const user = (id, name, socketId) => {

    var user = {
        userId: id,
        name: name,
        socketId: socketId,
    }
    users[id] = user;
    return user;
}

// current user
const currentUser = (sid) => {
    if(users){
        var id = users.find(user => sid === socketId);
    console.log(id);
    }
}



module.exports = {
    user,
    users,
    currentUser
}