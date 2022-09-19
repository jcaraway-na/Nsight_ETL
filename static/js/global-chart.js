
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
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: ylabel,
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
    }]
    Plotly.addTraces(divlabel,trace)
}