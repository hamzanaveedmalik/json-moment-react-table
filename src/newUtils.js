import jquery from 'jquery';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import "./index.css";
import data from "./data/newdata.json";

const moment = extendMoment(Moment);

const counter = Object.keys(data.users).length;
console.log( 'The counter is ', counter);
var myArray = data.users;

var filteredArray = [];
for (var key in myArray) {
if(myArray[key].absent==false)
{  filteredArray.push(myArray[key]);
}
}
console.log('The filteredArray is ', filteredArray);




console.log('My Array is ', myArray);

  const getMyData =()=> {

     const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
     let output = [];
     let result = {
         today: null,
         average: null,
         name: null
     }
    for (var key in data.users) {
      const start =  moment(data.users[key].lastUpdated)
      const end = moment();
      const range = moment.range(start, end);
      const days = range.diff('days');
      if (days >= 0 && days < 7) {

      result.today = data.users[key].availabilityArray[days];
      result.average = arrAvg(data.users[key].availabilityArray.splice(days + 1));
      result.name = data.users[key].name;
      var absentVal = result.absent=   data.users[key].absent
  }
        console.log('Executing this command ', key);
        if(absentVal===true)
        {
          output.push(result);
          console.log('The output is ', output);
          return { output }
        }
          console.log('End of return result',result );

       }

  }

const range1 = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  console.log('The arr is ', arr);
  return arr;
};



// export function makeData(len = counter.length){
//   return range1(len).map(d=> {
//     return getMyData();
//   }
// );
//
// }

export function makeData(len = counter) {
  return range1(len).map(d => {
    return {
      ...getMyData(),
      children: range1(1).map(getMyData)
    };
  });
}
