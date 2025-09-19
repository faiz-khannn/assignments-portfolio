// Task 1: Array Manipulation
// Write a program that performs the following operations on an array:
// 1. Create an array of numbers.
// 2. Use the array methods to add, remove, or modify elements in the array.
// 3. Display the updated array in the console a􀅌er each operation.

function arrayManipulation() {
  let numbers = [10, 20, 30, 40];
  console.log("Initial array:", numbers);

  // Add
  numbers.push(50);
  console.log("After push:", numbers);

  // Remove
  numbers.pop();
  console.log("After pop:", numbers);

  
  numbers.unshift(5);
  console.log("After unshift:", numbers);

  
  numbers.shift();
  console.log("After shift:", numbers);

  
  numbers[1] = 25;
  console.log("After modification:", numbers);
}

arrayManipulation();


// Task 2: Array Filtering and Transformation
// Write a program that performs the following operations on an array of objects:
// 1. Create an array of objects with different properties.
// 2. Use array methods like filter, map, or reduce to filter and transform the array based on
// specific conditions.
// 3. Display the updated array in the console after each operation.

function arrayFilteringTransformation() {
  let students = [
    { name: "Alice", grade: 85 },
    { name: "Bob", grade: 45 },
    { name: "Charlie", grade: 72 },
    { name: "David", grade: 90 }
  ];

  console.log("Original students:", students);

  // Filter
  let passed = students.filter(student => student.grade >= 60);
  console.log("Passed students:", passed);

  // Map
  let names = students.map(student => student.name);
  console.log("Student names:", names);

  // Reduce
  let total = students.reduce((sum, student) => sum + student.grade, 0);
  let average = total / students.length;
  console.log("Average grade:", average);
}

arrayFilteringTransformation();
