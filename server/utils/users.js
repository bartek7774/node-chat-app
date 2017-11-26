
const _ = require('lodash');
class Users {
  constructor() {
    this.users = [];
  }
  checkOccupiedName(name, room) {
    let user = this.users.find(x => x.name === name && x.room === room);
    return !!user;
  }
  addUser(id, name, room) {
    let user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    /*
    let idx = -1;
    this.users.find((user, index) => {
      if (user.id === id) {
        idx = index;
      }
    });
    return (idx > -1) ? this.users.splice(idx, 1) : null;
    */
    let user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.find(user => user.id === id);
  }
  getListUsers(room) {
    let users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
  getListRooms() {
    let rooms = _.groupBy(this.users, 'room');
    let rooms_obj = [];
    Object.keys(rooms).forEach(key => {
      rooms_obj.push({ name: key, count: rooms[key].length });
    });
    return rooms_obj.sort((x, y) => x.count > y.count ? -1 : (x.count < y.count ? 1 : 0));
  }

}

module.exports = { Users };

// class Person {
//   constructor(id, name, room) {
//     this.name=name;
//     this.id=id;
//   }
//   getUserDescription(){
//     return `${this.name} and ${this.id}`;
//   }
// }

// let p = new Person(123, 'Adrew', 'gay');
// console.log(p.getUserDescription());

