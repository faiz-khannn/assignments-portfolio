// JavaScript Functions and Array Methods

// Q1. Write a function called `isEven` that takes in a number as a parameter and returns `true` if the number is even, and `false` otherwise.

function isEven(number) {
  return number % 2 === 0;
}
console.log(isEven(4)); 
console.log(isEven(7)); 


// Q2. Convert the following function into an arrow function:
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

console.log(capitalizeWords("hello i am faiz khan")); 


// Q3. Write an arrow function called getMax that takes in an array of numbers as a parameter and returns the maximum number in the array.

const getMax = (numbers) => Math.max(...numbers);

console.log(getMax([3, 9, 1, 7])); // 9


// Q4.Write a function called printSquares that takes an array of numbers as input and uses the forEach method to print the square of each number.

function printSquares(numbers) {
  numbers.forEach(num => console.log(num * num));
}

printSquares([2, 4, 6]); 


// Q5.Write a function called getDoubledValues that takes an array of numbers as input and uses the map method to return a new array with each number doubled.

function getDoubledValues(numbers) {
  return numbers.map(num => num * 2);
}

console.log(getDoubledValues([1, 3, 5])); 


// Q6.Write a function called getEvenNumbers that takes an array of numbers as input and uses the filter method to return a new array with only the even numbers.

function getEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0);
}

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6]));
