import jquery from 'jquery';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import "./index.css";
import data from "./data/newdata.json";


const moment = extendMoment(Moment);

var myArray = data.users;
var filteredArray = [];

for (var key in myArray)
  {
          if(myArray[key].absent===false)
            {
                filteredArray.push(myArray[key]);
            }
  }

console.log('The filteredArray length is ',filteredArray.length);
const counter = Object.keys(filteredArray).length;
console.log(counter);

var index = 0;


  const getMyData =()=> {
   var newindex = index + 1;
    console.log('Index  is ', index);
    //console.log('IndexComp val is ', newindex);

    if(index<newindex && index>=1){
      filteredArray.shift();
    }

     const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
     let output = [];
     let result = {
         today: null,
         average: null,
         name: null
     }



    for (var i=0; i< filteredArray.length; i++) {



      const start =  moment(filteredArray[i].lastUpdated)
      const end = moment();
      const range = moment.range(start, end);
      const days = range.diff('days');

        if (days >= 0 && days < 7)
        {

        result.today = filteredArray[i].availabilityArray[days];
        var intermAve =  arrAvg(filteredArray[i].availabilityArray.splice(days + 1));
        result.average =  Math.round(intermAve);
        result.name = filteredArray[i].name;
        output.push(result);
        index++;


        console.log('New Index is ', index);

        }

        return { result }

       }


  }

const range1 = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
//  console.log('The arr is ', arr);
  return arr;
};


export function makeData(len = filteredArray.length) {
  return range1(len).map(d => {
    return {
      ...getMyData(),
      children: range1().map(getMyData)
    };
  });
}
