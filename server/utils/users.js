
class Users {
  constructor() {
    this.users = [];
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
    let user=this.getUser(id);
    if(user){
      this.users=this.users.filter(user=>user.id!==id);
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

