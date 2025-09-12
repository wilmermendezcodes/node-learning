const square = (x) => x * x;

console.log(square(3));


array = [1, 2, 3, 4, 5];
//filter the array to get the desired value
const arrayFilter = array.filter((x) => x === 3);
//map the array to iterate and transform to a new array
const arrayMap = array.map((x) => x * 2);

console.log(arrayFilter, "this is array filter");
console.log(arrayMap, "this is array map");

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList () {
        console.log('Guest list for ' + this.name, ':');
        this.guestList.forEach((guest) => console.log(guest + ' is attending ' + this.name));
    }
};

event.printGuestList();
        