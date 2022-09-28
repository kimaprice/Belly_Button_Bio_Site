// Test that data is being grabbed
//<!--./index.js-->
// Get the endpoint
const bellyButton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

initPage();

// ------------- Initialization Function --------------------//
function initPage() {
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
  d3.json(bellyButton).then(data => {
    let samples = data.samples;
    let selectedArray = samples.filter(s => s.id == sample);
    let result = selectedArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'

      }
    };
    var data = [trace1];
    var layout = {
      showlegend: false,
      hovermode: 'closest',
      title: 'Bacteria Cultures per Sample',
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot('bubble', data, layout);
  });
}

//Create Horizontal Bar Function
function createBarGraph(sample){
  d3.json(bellyButton).then(function(data) {
    let samples = data.samples;
    let selectedArray = samples.filter(s => s.id == sample);
    let result = selectedArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    let y_val = otu_ids.slice(0,10).reverse();

    var trace1 = {
      x: sample_values.slice(0,10).reverse(),
      y: y_val.map(otu => `OTU ${otu}`).reverse(),
      type: 'bar',
      text: otu_labels.slice(0,10).reverse(),
      orientation: 'h'
    };
    var data = [trace1];
    var layout = {
      showlegend: false,
      title: 'Top 10 Bacteria Cultures Found'
    };
    Plotly.newPlot('bar', data, layout);
  });
}

//Create MetaData Table Function
function createMetaData(sample){
  console.log(sample);

}

//Create Guage Function
function createGuage(sample){
  d3.json(bellyButton).then(function(data) {
    let metaData = data.metadata;
    let selectedData = metaData.filter(m => m.id == sample);
    let result = selectedData[0];


    let washes = result.wfreq;
    var data = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: washes,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
        gauge: {
          axis: { range: [-.5, 9.5], tickwidth: 1, tick0: 0, dtick: "L1"},
          bgcolor: "white",
          bar: { thickness:0},
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [-.5, .5], color: "#d4d9cc" },
            { range: [.5, 1.5], color: "#c3ccb4" },
            { range: [1.5, 2.5], color: "#bbc9a3" },
            { range: [2.5, 3.5], color: "#b2c491" },
            { range: [3.5, 4.5], color: "#abc280" },
            { range: [4.5, 5.5], color: "#98b368" },
            { range: [5.5, 6.5], color: "#8eb053" },
            { range: [6.5, 7.5], color: "#79a32f" },
            { range: [7.5, 8.5], color: "#6c9c17" },
            { range: [8.5, 9.5], color: "#558501"}
          ],
          threshold: {
            line: { color: "black", width: 4 },
            thickness: 0.75,
            value: washes + .00001
          }
        }
      }
    ];
    var layout = {
      font: { color: "black", family: "Arial" }
    };

    Plotly.newPlot('gauge', data, layout);
  });
}

//-------------  On DropDown Change function ---------------//
function optionChanged(sample){

  //create graphs and tables with data for that value
  createBarGraph(sample);
  createBubbleChart(sample);
  createMetaData(sample);
  createGuage(sample);
}