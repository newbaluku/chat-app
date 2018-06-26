// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let removedUser;
    const index = this.users.findIndex((user) => {
      if (user.id === id) {
        removedUser = user;
        return true;
      }
    });
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return removedUser;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  getUserList(room) {
    const userListByRoom = this.users.filter(user => user.room === room);
    return userListByRoom.map(user => user.name);
  }
}

module.exports = { Users };