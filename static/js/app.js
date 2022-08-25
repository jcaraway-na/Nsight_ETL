// const tableData = data;
var days = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
var depth = [200,1200,2500,4300,6300,7500,7500,7500];
var cost = [88000,30500,42566,30000,35000,35123,38427,40199];
var cumCost = [];
var avgRop = [88.7,240.88,300.45,324.4,150.2,0,0,0]
var tbody = d3.select("tbody");
var w = 410;
var h = 400;

cost.reduce(function(a,b,i){return cumCost[i]=a+b;},0);

// Build Formation data table
// function formationTable(data){
//     tbody.html("");

//     data.forEach((dataRow) => {
//         let row = tbody.append("tr");

//         Object.values(dataRow).forEach((val) => {
//             let cell = row.append("td");
//             cell.text(vale);
//         });
//     });
// }

// Create trace
//DVD
var dvdTrace = {
    x: days,
    y: depth,
    type: 'scatter',
    marker: {
        color: 'rgb(135, 61, 255)',
        size: 8
    },
    
};

// //CVD
var cvdTrace = {
    x: days,
    y: cumCost,
    type: 'scatter',
    marker: {
        color: 'rgb(135, 61, 255)',
        size: 8
    },
    
};

// //AVG ROP
var avgRopTrace = {
    x: days,
    y: avgRop,
    type: 'bar',
    marker: {
        color: 'rgb(135, 61, 255)',
        size: 8
    }    
};


// Define DVD layout
var dvdLayout = {
    width: w,
    height: h,
    xaxis: {title: "Days"},
    yaxis: {title: "Depth"},
    paper_bgcolor: 'rgba(221,221,221,1)',
    plot_bgcolor: 'rgba(221,221,221,1)',
    yaxis: {autorange: 'reversed'},
    margin: {
        l: 55,
        r: 2,
        b: 55,
        t: 10,
        pad: 4
      }
};

// Define CVD layout
var cvdLayout = {
    width: w,
    height: h,
    xaxis: {title: "Days"},
    yaxis: {title: "Cost"},
    paper_bgcolor: 'rgba(221,221,221,1)',
    plot_bgcolor: 'rgba(221,221,221,1)',
    margin: {
        l: 55,
        r: 2,
        b: 55,
        t: 10,
        pad: 4
      }
};

// Define CVD layout
var avgRopLayout = {
    width: w,
    height: h,
    xaxis: {title: "Days"},
    yaxis: {title: "AVG ROP"},
    paper_bgcolor: 'rgba(221,221,221,1)',
    plot_bgcolor: 'rgba(221,221,221,1)',
    margin: {
        l: 55,
        r: 2,
        b: 55,
        t: 10,
        pad: 4
      }
};

Plotly.newPlot("dvd-plot",[dvdTrace],dvdLayout)
Plotly.newPlot("cvd-plot",[cvdTrace],cvdLayout)
Plotly.newPlot("avg-rop-plot",[avgRopTrace],avgRopLayout)

