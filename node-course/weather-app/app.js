console.log("Starting");

setTimeout(() => {
  console.log("2 second timer");
}, 2000);

setTimeout(() => {
    console.log("0 second timer")
}, 0);

console.log("Stopping");

const add = (a, b) => {
    return a + b;
}

console.log(add(1, 2));

(() => {
    console.log("Arrow function");
})();   

async function doWork() {
    return "Andrew";
    // throw new Error("Something went wrong");
}   
