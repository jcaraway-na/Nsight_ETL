var w = 410;
var h = 400;

function makeplot() {
    d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_apple_stock.csv", function(data){ processData(data) } );
  
  };
  
  function processData(allRows) {
  
    console.log(allRows);
    var x = [], y = [], standard_deviation = [];
  
    for (var i=0; i<allRows.length; i++) {
      row = allRows[i];
      x.push( row['AAPL_x'] );
      y.push( row['AAPL_y'] );
    }
    makePlotly( x, y, standard_deviation );
  }
  
  function makePlotly( x, y, standard_deviation ){
    var plotDiv = document.getElementById("rop-plot");

    var traces = [{
      x: x,
      y: y,
      automargin: true,
      marker: {
        color: 'rgb(135, 61, 255)',
        size: 8
    }, 
    }];

    var layout = {
        xaxis: {title: "Days"},
        yaxis: {title: "Depth"},
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

    Plotly.newPlot('rop-plot', traces,layout,config);
    Plotly.newPlot('mse-plot', traces,layout,config);
    Plotly.newPlot('wob-plot', traces,layout,config);
    Plotly.newPlot('bit-rpm-plot', traces,layout,config);
  };
    makeplot();
