
var colName = ['ROPFast','BitWeight','DownholeMSE','DSBitRPM']
var htmlTag = ['']

function init(){
    d3.csv("https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Frankenstein.csv",
     function(data){ colName.forEach(col=>processData(data,'HoleDepth',col))
    } );

}

function processData(allRows,holedepth,yValue){

    var x=[],y=[];
    let j = yValue;

    for(var i=0; i<allRows.length; i++){
        row = allRows[i];
        x.push(row[holedepth]);
        y.push(row[yValue]);
    }
    makePlotly(x,y,j);
}

function makePlotly(x,y,tag){
    

    var trace = [{
        x:x,
        y:y,
        type:'bar',
        marker: {
            color: 'rgb(135, 61, 255)',
            size: 8
        }
    }]

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
    }else if(tag ==='BitWeight'){
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
    }else if(tag ==='DownholeMSE'){
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
    }else if(tag ==='DSBitRPM'){
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
   
}

init();