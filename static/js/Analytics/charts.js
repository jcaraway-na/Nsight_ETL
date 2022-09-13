const roadMapCsv = 'https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Roadmap.csv'
const frankensteinTimeData = 'https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Frankenstein.csv'


export async function dvdChart(data, well) {

    var x = [], y = []
    var row;

    if (well === 'Subject') {
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            x.push(i);
            y.push(row['reportTimeDepth'])
        }
        await makePlotly(x, y, 'dvd')
    }
}

export async function timeDrillingData(data, well) {
    var x = [], y = []
    var row;

    if (well === 'Subject') {
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            x.push(row['measuredDepth']);
            y.push(row['ropFast'])
        }
        await addToPlotly(x, y, 'ROPFast');
    }
}

export async function predictedTimeData() {
    // name columns to plot
    let timeDataCol = ['ROPFast', 'DownholeMSE']

    //read csv data
    d3.csv(frankensteinTimeData,
        function (data) {
            timeDataCol.forEach(col => processData(data, 'HoleDepth', col))
        });
}

async function processData(allRows, xValue, yValue, subject) {

    var x = [], y = [];
    let tag = yValue;
    var row;

    //pushes values to empty arrays
    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        x.push(row[xValue]);
        y.push(row[yValue]);
    }

    if (tag === 'ROPFast') {
        //makes new ROPFast plot
        await makePlotly(x, y, tag);

    }
    else if (tag === 'DownholeMSE') {
        //adds values to ROPFast plot

    }

}

async function makePlotly(x, y, tag) {


    if (tag === 'ROPFast') {
        let pRopTrace = []
        //create trace
        pRopTrace = [{
            x: x,
            y: y,
            name: 'Predicted ROP',
            fill: 'tozeroy',
            type: 'scatter',
            marker: {
                color: 'rgba(13, 18, 27,0.2)',
                size: 8
            }
        }]

        var layout = {
            xaxis: {
                title: "Hole Depth",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "Avg ROP",
                gridcolor: 'rgba(0,0,0,.2)'
            },

            showlegend: true,
            legend: { "orientation": "h" },
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
        var config = { responsive: true }
        Plotly.newPlot('ROPFast', pRopTrace, layout, config);
    }
    else if (tag === 'dvd') {

        let dvdTrace = []
        //create trace
        dvdTrace = [{
            x: x,
            y: y,
            name: 'Subject Well',
            type: 'scatter',
            marker: {
                color: 'rgba(135, 61, 255, 1)',
                size: 8
            }
        }]

        var layout = {
            xaxis: {
                title: "Days",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "Hole Depth (MD)",
                gridcolor: 'rgba(0,0,0,.2)',
                autorange: 'reversed'
            },

            showlegend: true,
            legend: { "orientation": "h" },
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
        var config = { responsive: true }
        Plotly.newPlot('dvd', dvdTrace, layout, config);
    }
}

async function addToPlotly(x, y, tag) {
    if (tag === 'ROPFast') {
        let subjectTrace = [{
            x: x,
            y: y,
            name: 'Subject ROP',
            type: 'scatter',
            marker: {
                color: 'rgba(135, 61, 255, 1)',
                size: 8
            }
        }]
        Plotly.addTraces('ROPFast', subjectTrace)
    }
}
