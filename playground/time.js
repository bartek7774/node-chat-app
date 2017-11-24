const moment=require('moment');
// Jan 1st 1970 00:00:00 am
// let date=new Date();
// let months=['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];

// console.log(months[date.getMonth()]);

// let date=moment();
// date.add(100,'y').subtract(3,'months');
// console.log(date.format('MMM Do, YYYY'));

let createdAt=1523442131223;
let date=moment(createdAt);
let timeStamp=moment().valueOf();
console.log(timeStamp);
console.log(date.format('k:mm MM YYYY'));