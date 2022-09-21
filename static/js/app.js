// Test that data is being grabbed
//<!--./index.js-->

fetch('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json')
    .then((response) => response.json())
    .then((json) => console.log(json));


//----------- Top 10 OTUs Horizontal Bar Chart ----------------------
// Reverse the array
let numArray4 = [1, 2, 3];
numArray4.reverse()
console.log(numArray4);

// Sort the array in ascending order, using an arrow function
let numArray3 = [3, 2, 1];
numArray3.sort((a, b) => a - b);
console.log(numArray3);


//------------- Bubble Chart displaying each sample ------------------




//---------------- Display metadata ------------------------------




//--------------------- Dropdown functionality -------------------------