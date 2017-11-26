const expect = require('chai').expect;
const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Bob',
      room: 'React Course'
    },
    {
      id: '3',
      name: 'Joshua',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).to.deep.equal([user]);
  });

  it('should remove a user', () => {
    let id = '1'
    let user = users.removeUser(id);
    expect(user.id).to.equal(id);
    expect(users.users.length).to.equal(2);
  });

  it('should not remove a user', () => {
    let id = '11'
    let user = users.removeUser(id);
    expect(user).to.not.exist;
    expect(users.users.length).to.equal(3);
  });

  it('should find user', () => {
    let id = '3'
    let user = users.getUser(id);
    expect(user.id).to.equal(id);
  });

  it('should not find a user', () => {
    let id = '33'
    let user = users.getUser(id);
    expect(user).to.not.exist;
  });

  it('should return names for node course', () => {
    let resUsers = users.getListUsers('Node Course');
    expect(resUsers).to.deep.equal(['Mike', 'Joshua']);
  });

  it('should return names for react course', () => {
    let resUsers = users.getListUsers('React Course');
    expect(resUsers).to.deep.equal(['Bob']);
  });

  it('should return list of rooms and number of users in each.', () => {
    let rooms = users.getListRooms();
    users.removeUser('2');
    expect(rooms.length).to.equal(2);
  });
  it('should return rooms only with users.', () => {
    users.removeUser('2');
    let rooms = users.getListRooms();
    expect(rooms.length).to.equal(1);
    expect(rooms[0].count).to.equal(2);
  });
  it('should return true if name is occupied in given room.', () => {
    expect(users.checkOccupiedName(users.users[0].name,users.users[0].room)).to.be.true;
  });
  it('should return false if name is free in given room.', () => {
    expect(users.checkOccupiedName(users.users[0].name+'s',users.users[0].room)).to.be.false;
  });
});