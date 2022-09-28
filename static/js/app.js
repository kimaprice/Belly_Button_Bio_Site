// Test that data is being grabbed
//<!--./index.js-->

initPage();

// ------------- Initialization Function --------------------//
function initPage() {

  // Get the endpoint
  const bellyButton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data and console log it
  d3.json(bellyButton).then(function(data) {
      console.log(data);
      let names = data.names;
      let dropDown = d3.select("#selDataset")

      //Populate dropdown
      names.forEach((n) => {
        let opt = dropDown.append("option")
        opt.text(n);
        opt.property("value", n);
      });

    //Get selected value
    let dropDownId = dropDown.property("value");

    //create graphs and tables with data for that value
    createBarGraph(dropDownId);
    createBubbleChart(dropDownId);
    createMetaData(dropDownId);
    createGuage(dropDownId);

  });
}

//----------------- Functions for Graphs and Table ---------//

//Create Bubble Chart Function
function createBubbleChart(sample){
  var trace1 = {
    x: [],
    y: [],
    mode: 'markers',
    marker: {
      size: []
    }
  };
  var data = [trace1];
  var layout = {
    showlegend: false
  };
  Plotly.newPlot('bubble', data, layout);
}

//Create Horizontal Bar Function
function createBarGraph(sample){
  var trace1 = {
    x: [],
    y: [],
    type: 'bar',
    orientation: 'h'
  };
  var data = [trace1];
  var layout = {
    showlegend: false,
  };
  Plotly.newPlot('bar', data, layout);
}

//Create Guage Function
function createBarGraph(sample){
  let washes = 0;
  var data = [
    {
      type: "indicator",
      mode: "gauge",
      title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
      gauge: {
        axis: { range: [0, 9], tickwidth: 1,},
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "#d4d9cc" },
          { range: [1, 2], color: "#c3ccb4" },
          { range: [2, 3], color: "#bbc9a3" },
          { range: [3, 4], color: "#b2c491" },
          { range: [4, 5], color: "#abc280" },
          { range: [5, 6], color: "#98b368" },
          { range: [6, 7], color: "#8eb053" },
          { range: [7, 8], color: "#79a32f" },
          { range: [8, 9], color: "#6c9c17" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: washes
        }
      }
    }
  ];
  var layout = {
    margin: { t: 25, r: 25, l: 25, b: 25 },
    font: { color: "black", family: "Arial" }
  };

  Plotly.newPlot('gauge', data, layout);
}

// TODOS:
// 4.  Create on dropdown change event
//   1.  get the selected value in dropdown - day3-act5
//   2.  Gather the data for the selected name
//   3.  Refresh the graphs and tables with name specific data
//     a.  MetaData
          //1. dynamically build table - day3-act4
//     b.  Bubble
//     c.  Horizontal Bar (sort ascending, slice top 10)
//     d.  Guage

//-------Code Snippets from class to use--------------//
  // Sort the array in ascending order, using an arrow function
    // let numArray3 = [3, 2, 1];
    // numArray3.sort((a, b) => a - b);
  
  //Slicing
    // Slice the first two names
      // let left = names.slice(0, 2);

  //Get json
    // Get the Roadster endpoint
      // const roadster = "<URL>";

    // Fetch the JSON data and console log it
      // d3.json(roadster).then(function(data){
      //     console.log(data);
      // });

  //Plotly Charts
      // let myName = 'Travis Taylor';

      // let title = `${myName}'s First Plotly Chart`;
      
      // let books = ["The Visual Display of Quantitative Information", "Automate the Boring Stuff", "Data Science from Scratch"];
      
      // let timesRead = [100, 50, 25];
      
      // let trace1 = {
      //   x: books,
      //   y: timesRead,
      //   type: 'bar'
      // };
      
      // let data = [trace1];
      
      // let layout = {
      //   title: title
      // };
      
      // Plotly.newPlot("plot", data, layout);
