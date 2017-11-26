const { Users } = require('../server/utils/users');

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


console.log(users.getUser('33'));