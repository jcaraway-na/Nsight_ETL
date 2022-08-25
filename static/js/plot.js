var w = 410;
var h = 400;

function makeplotRigData() {
    d3.csv("https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Frankenstein.csv", function(data){ processData(data,'HoleDepth','ROPFast') } );
    d3.csv("https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Roadmap.csv", function(data){ processData(data) } );
  };
  
  function processData(allRows,holdepth,rop,mse,wob,bitrpm) {
  
    console.log(allRows);
    var x = [], y = [], standard_deviation = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row[holdepth] );
      yRop.push( row[rop] );
      yMse.push( row[mse] );
      yWob.push( row[wob] );
      yBitRpm.push( row[bitrpm] );
    }
    makePlotly( x, yRop,yMse,yWob,yBitRpm, standard_deviation );
  }
  
  function makePlotly( x, rop,mse,wob,bitrpm, standard_deviation ){
    var plotDiv = document.getElementById("rop-plot");

    var traceRop = [{
      x: x,
      y: rop,
      type: 'scatter',
      marker: {
        color: 'rgb(135, 61, 255)',
        size: 8
    }, 
    }];

    var traceMse = [{
      x: x,
      y: mse,
      type: 'scatter',
      marker: {
        color: 'rgb(135, 61, 255)',
        size: 8
    }, 
    }];

    var layout = {
        xaxis: {title: "Hole Depth"},
        yaxis: {title: "ROP"},
        paper_bgcolor: 'rgba(221,221,221,1)',
        plot_bgcolor: 'rgba(221,221,221,1)',
        height: 300,
        margin: {
            l: 55,
            r: 55,
            b: 30,
            t: 10,
            pad: 4
          }
    };

    var config = {responsive: true,
    displayModeBar: true,
    scrollZoom: true};

    Plotly.newPlot('rop-plot', traceRop,layout,config);
    Plotly.newPlot('mse-plot', traces,layout,config);
    Plotly.newPlot('wob-plot', traces,layout,config);
    Plotly.newPlot('bit-rpm-plot', traces,layout,config);
  };
  makeplotRigData();
