
export async function makePlotly(data,xlabel,ylabel,divlabel,well,type){
    var x = [], y = [];
    var row;

    //pushes values to empty arrays
    for (var i = 0; i < data.length; i++) {
        row = data[i];
        x.push(row[xlabel]);
        y.push(row[ylabel]);
    }
    
    let trace = [];

    trace = [{
        x:x,
        y:y,
        name:well,
        type:type,
        marker: {
            color: 'rgba(135, 61, 255, .8',
            size: 8
        }
    }];

    if(divlabel === 'dvd'){
        var layout = {
            xaxis: {
                title: 'Days',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Depth',
                gridcolor: 'rgba(0,0,0,.2)',
                autorange: 'reversed'
            },

            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
              },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 300,
            margin: {
                l: 55,
                r: 55,
                b: 30,
                t: 10,
                pad: 4
            },

        }
    }
    else if(divlabel==='costcodebar'){
        var layout = {
            xaxis: {
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: ylabel,
                gridcolor: 'rgba(0,0,0,.2)',
            },

            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
              },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 380,
            margin: {
                l: 55,
                r: 55,
                b: 100,
                t: 50,
                pad:4
                
            },

        }
    }
    else{
        var layout = {
            xaxis:{
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis:{
                title: ylabel,
                gridcolor: 'rgba(0,0,0,.2)'
    
            },
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
              },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 320,
            margin: {
                l: 55,
                r: 10,
                b: 100,
                t: 20,
                pad: 1
            }
        }
    }

    var config = {responsive: true};
    Plotly.newPlot(divlabel,trace,layout,config);
}

export async function addToPlotly(data,xlabel,ylabel,divlabel,well,type){
    var x = [], y = [];
    var row;

    for(var i = 0; i < data.length; i++){
        row = data[i];
        x.push(row[xlabel]);
        y.push(row[ylabel]);
    }
    
    let trace = [];

    //create trace
    trace =[{
        x:x,
        y:y,
        name:well,
        type:type,
        marker: {
            color: 'rgba(170, 174, 193, .8)',
            size: 8
        }
    }];
    Plotly.addTraces(divlabel,trace);
}

export async function makePlotlySurvey(data){

    var i, r;
    var x = [];
    var y = [];
    var z = [];
    var c = [];

    for(i = 0; i < data.length; i++){
        // r = 10 * Math.cos(i/10);
        if(data[i].annotation === "ACTUAL")
        x.push(data[i].localEastWest);
        y.push(data[i].localNorthSouth);
        z.push(-1*data[i].tvd);
        c.push(data[i].doglegSeverity);
    }

    let trace = [{
        type: 'scatter3d',
        mode: 'lines',
        x: x,
        y: y,
        z: z,
        name:'Actual',
        line: {
          width: 10,
          color: c,
          colorscale: "Portland"},
        marker: {
          size: 3.5,
          color: c,
          colorscale: "Greens",
          cmin: -20,
          cmax: 50
        }
    }];
    
    var layout = {
        scene:{

          xaxis: {
           nticks: 9,
           range: [-1500, 1500],
         },
          yaxis: {
           nticks: 7,
           range: [0, 15000],
         }},
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        autosize: true,
        margin: {
            l: 55,
            r: 20,
            b: 50,
            t: 0,

        },
    };
    
    var config = { responsive: true }
    Plotly.newPlot('planvactual', trace, layout, config);
}

export async function addToPlotlySurvey(data){
    var i, r;
    var x = [];
    var y = [];
    var z = [];
    var c = [];

    for(i = 0; i < data.length; i++){
        if(data[i].annotation === "PLAN")
        // r = 10 * Math.cos(i/10);
        x.push(data[i].localEastWest);
        y.push(data[i].localNorthSouth);
        z.push(-1*data[i].tvd);
        c.push(data[i].doglegSeverity);
    }

    let planTrace = [{
        type: 'scatter3d',
        mode: 'lines',
        x: x,
        y: y,
        z: z,
        name:'Plan',
        line: {
          width: 10,
          color: 'red'},
        marker: {
          size: 3.5,
          cmin: -20,
          cmax: 50
        }
    }];
    Plotly.addTraces('planvactual',planTrace);
}