const { Users } = require('../server/utils/users');
const _ = require('lodash');
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
  room: 'Angular Course'
},
{
  id: '4',
  name: 'Bryson',
  room: 'Node Course'
},
{
  id: '5',
  name: 'Bob',
  room: 'Angular Course'
},
{
  id: '6',
  name: 'Miguel',
  room: 'Angular Course'
}
];
// users.removeUser('2');

let user=null;
console.log(users.checkOccupiedName(users.users[0].name,users.users[0].room));
