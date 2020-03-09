var url = "../../../data/samples.json";

/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    createBarchart(newSample)
    createBubbleChart(newSample);
    buildMetadata(newSample);
}
/***********************************************/
function buildMetadata(sample) {
    // write code to create the buildMetadata
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)

    d3.json(url).then(function(data) {
        var metadata = data.metadata.filter(m=> m.id.toString() === sample)[0];
        // console.log(metadata);

        var demographic = d3.select('#sample-metadata');

        demographic.html("");

        Object.entries(metadata).forEach(([key,value]) => {   
            demographic.append("h6").text(`${key}:${value}`);    
        });
    });

    // bonus only
    // buildGauge()
}
/***********************************************/
function createBubbleChart(sample) {
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)

    d3.json(url).then(function(data){
        var samples = data.samples.filter(s=> s.id.toString() === sample)[0];

        var x_val = samples.otu_ids;
        var y_val = samples.sample_values;
        var marker_size = samples.sample_values;
        var colors = samples.otu_ids;
        var text = samples.otu_labels;

        var trace1 = {
            x: x_val,
            y: y_val,
            text: text,
            mode: "markers",
            marker: {
                color: colors,
                size: marker_size
            }
        };
  
        // set the layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };
  
        // creating data variable 
        var bubbleData = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", bubbleData, layout); 

    });
}

/***********************************************/
function createBarchart(sample) {
    // write code to create barchart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json(url).then(function(data) {
        var sampleData = data.samples.filter(s => s.id.toString() === sample)[0];
        
        var otu_10 = sampleData.otu_ids.slice(0,10).reverse();
        var sample_values = sampleData.sample_values.slice(0,10).reverse();
        var otu_id = otu_10.map(d=> "OTU " + d);
        // console.log(otu_id)


        var trace1 = {
            x: sample_values,
            y: otu_id,
            text: otu_10,
            type: 'bar',
            orientation: 'h'
        };

        var chartData = [trace1];

        var layout = {
            title: 'OTUs',
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }
        Plotly.newPlot('bar', chartData, layout);
    });

}
/***********************************************/
function fillDropDown() {
  // write code to pupulate the dropdown
  console.log(`Entering ${arguments.callee.name}`)

  // get reference to dropdown menu:
  var dropdown = d3.select('#selDataset');

  d3.json(url).then(function(data) {
    data.names.forEach((name) => {
        dropdown
            .append("option")
            .text(name)
            .property("value", name);
    });
    createBarchart(data.names[0])
    createBubbleChart(data.names[0]);
    buildMetadata(data.names[0]);

  });
}
/***********************************************/

fillDropDown()
