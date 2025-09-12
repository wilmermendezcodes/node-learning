const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = "Wilmer";
data.planet = "Mars";
data.age = 29;

const userJSON = JSON.stringify(data);
fs.writeFileSync('1-json.json', userJSON);

//const book = {
//    title: 'Ego is the Enemy', 
//    author: 'Ryan Holiday'
//}
//
//const bookJSON = JSON.stringify(book);
//console.log(bookJSON);
//console.log(typeof bookJSON); 
//
//fs.writeFileSync('1-json.json', bookJSON);

//const dataBuffer = fs.readFileSync('1-json.json', 'utf8');
//const dataJSON = dataBuffer.toString();
//const data = JSON.parse(dataJSON);
//console.log(data.title);