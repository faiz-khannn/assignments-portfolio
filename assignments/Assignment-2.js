// Q1) Write a function called `isEven` that takes in a number as a parameter and returns `true` if the number is even, and `false` otherwise.

function isEven(num) {
  return num % 2 === 0;
}

console.log("1. isEven:");
console.log(isEven(4)); 
console.log(isEven(7)); 

// Q2) Convert the following function into an arrow function:
// function capitalizeWords(sentence) {
//   return sentence.split(" ").map(function(word) {
//     return word.charAt(0).toUpperCase() + word.slice(1);
//   }).join(" ");
// }

const capitalizeWords = (sentence) => 
  sentence
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    console.log("/n2. capitalizeWords:");
console.log(capitalizeWords("hello world from javascript"));

// Q3) Write a function called printSquares that takes an array of numbers as input and uses the forEach method to print the square of each number.

function printSquares(arr) {
  arr.forEach(num => console.log(num * num));
}

console.log("/n3. printSquares:");
printSquares([1, 2, 3, 4]); 

// Q4) Write a function called getDoubledValues that takes an array of numbers as input and uses the map method to return a new array with each number doubled.

function getDoubledValues(arr) {
  return arr.map(num => num * 2);
}

console.log("/n4. getDoubledValues:");
console.log(getDoubledValues([1, 2, 3])); 

// Q5) Write a function called getEvenNumbers that takes an array of numbers as input and uses the filter method to return a new array with only the even numbers.

function getEvenNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}

console.log("/n5. getEvenNumbers:");
console.log(getEvenNumbers([1, 2, 3, 4, 5, 6])); 

// Q6) Write an arrow function called getMax that takes an array of numbers as a parameter and returns the maximum number in the array using the reduce method.

const getMax = (arr) => arr.reduce((max, num) => num > max ? num : max, arr[0]);

console.log("/n6. getMax:");
console.log(getMax([3, 7, 2, 9, 5]));








 

