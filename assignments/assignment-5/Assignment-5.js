// Assignment-5

// Q1) Write a program to capitalize the first letter of each word in a sentence.

function capitalizeeveryword(sentence){
    return sentence
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

console.log(capitalizeeveryword("hello world from js"))

// Q2) Create a program to find the largest and smallest numbers in an array.

function findlargestandsmallest(arr){
    let largest = Math.max(...arr);
    let smallest = Math.min(...arr);
    return {largest, smallest};
}

console.log(findlargestandsmallest([3, 5, 1, 8, 2]));

// Q3) Create a program that sorts an array of numbers in ascending order.

function sortArrayAscending(arr) {
    return arr.sort((a, b) => a - b);
}

console.log(sortArrayAscending([5, 32, 89, 111, 20]));

// Q4) Create a program that represents a car with properties like make, model, and year.

let car = {
    make: "Ford",
    model: "Mustang",
    year: 2021,
};

console.log(car);

// Q5) Implement a function to reverse a string.

function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(reverseString("hello world"));

// Q6) Create an Object representing a person with properties like name, age, and address.

let person = {
    name: "Faiz",
    age: 21,
    address: "Bhopal, India",
};

console.log(person);

// Q7) Write a program to print the numbers from 1 to 10 using a for loop.

for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// Q8) Create a program to find the sum of all numbers in an array using a for loop.

function sumarray(arr){
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}

console.log(sumarray([20, 2, 54, 23, 3]));