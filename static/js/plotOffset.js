var drillDataCols = ['ROPFast','BitWeight','DownholeMSE','DSBitRPM']
var roadMapCols = ['WellName','Formation','EndDepth','AvgRop','AvgDmse','ConservativeDays']


function init(){
    d3.csv("https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Frankenstein.csv",
     function(data){ drillDataCols.forEach(col=>processData(data,'HoleDepth',col))
    } );
    d3.csv("https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Roadmap.csv",
    function(data){ roadMapCols.forEach(col=>processData(data,'EndDepth',col))
   } );
}

function processData(allRows,xValue,yValue){

    var x=[],y=[];
    let j = yValue;
    let trace = []

    for(var i=0; i<allRows.length; i++){
        row = allRows[i];
        x.push(row[xValue]);
        y.push(row[yValue]);
    }
    makePlotly(x,y,j);
}

function makePlotly(x,y,tag){
    
    if(tag ==='ConservativeDays'){
        var cumDays = []
        y.reduce(function(a,b,i){return cumDays[i]=a+b;},0);
        trace = [{
            x:cumDays,
            y:x,
            type:'lines',
            marker: {
                color: 'rgb(135, 61, 255)',
                size: 8
            }
        }]
    }
    else{
        trace = [{
            x:x,
            y:y,
            type:'lines',
            marker: {
                color: 'rgb(135, 61, 255)',
                size: 8
            }
        }]
    }

    if(tag === 'ROPFast'){
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
        }
        var config = {responsive: true}
        Plotly.newPlot('rop-plot',trace,layout,config);
    }
    else if(tag ==='BitWeight'){
        var layout = {
            xaxis: {title: "Hole Depth"},
            yaxis: {title: "WOB"},
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
        }
        var config = {responsive: true}
        Plotly.newPlot('wob-plot',trace,layout,config);
    }
    else if(tag ==='DownholeMSE'){
        var layout = {
            xaxis: {title: "Hole Depth"},
            yaxis: {title: "Downhole MSE"},
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
        }
        var config = {responsive: true}
        Plotly.newPlot('mse-plot',trace,layout,config);
    }
    else if(tag ==='DSBitRPM'){
        var layout = {
            xaxis: {title: "Hole Depth"},
            yaxis: {title: "Bit RPM"},
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
        }
        var config = {responsive: true}
        Plotly.newPlot('bit-rpm-plot',trace,layout,config);
    }
    else if(tag ==='ConservativeDays'){
      var layout = {
          xaxis: {title: "Days"},
          yaxis: {title: "Depth"},
          paper_bgcolor: 'rgba(221,221,221,1)',
          plot_bgcolor: 'rgba(221,221,221,1)',
          height: 300,
          yaxis: {autorange: 'reversed'},
          margin: {
            l: 55,
            r: 2,
            b: 55,
            t: 10,
            pad: 4
            }
      }
      var config = {responsive: true}
      Plotly.newPlot('dvd-plot',trace,layout,config);
  }
   
}

init();
