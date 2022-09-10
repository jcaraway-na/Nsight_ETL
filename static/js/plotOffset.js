var drillDataCols = ['ROPFast', 'BitWeight', 'DownholeMSE', 'DSBitRPM'];
var roadMapCols = ['WellName', 'Formation', 'EndDepth', 'AvgRop', 'AvgDmse', 'CumConservativeDays'];
var tbody = d3.select("#roadmap");
const roadMapCsv = "https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Roadmap.csv"

function init() {
    d3.csv("https://raw.githubusercontent.com/jcaraway-na/Nsight_ETL/main/resources/Optimal_MSE_Frankenstein.csv",
        function (data) {
            drillDataCols.forEach(col => processData(data, 'HoleDepth', col))
        });
    d3.csv(roadMapCsv,
        function (data) { roadMapCols.forEach(col => processData2(data, 'EndDepth', 'Formation', col)) });
    fillFormationTable();
}

function processData(allRows, xValue, yValue) {

    var x = [], y = [], x2 = [];
    let j = yValue;
    let trace = []

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        x.push(row[xValue]);
        y.push(row[yValue]);
    }
    makePlotly(x, x2, y, j);
}

function processData2(allRows, xValue, xFormation, yValue) {

    var x = [], y = [], x2 = [];
    let j = yValue;
    let trace = []

    for (var i = 0; i < allRows.length; i++) {
        row = allRows[i];
        x.push(row[xValue]);
        x2.push(row[xFormation]);
        y.push(row[yValue]);
    }
    makePlotly(x, x2, y, j);
}

function makePlotly(x, x2, y, tag) {

    if (tag === 'CumConservativeDays') {
        trace = [{
            x: y,
            y: x,
            type: 'lines',
            marker: {
                color: 'rgba(13, 18, 27,0.5)',
                size: 8
            }
        }]
    }
    else if (tag === 'AvgRop') {
        trace = [{
            x: x2,
            y: y,
            type: 'bar',
            marker: {
                color: 'rgba(13, 18, 27,0.5)',
                size: 8
            }
        }]
    }
    else {
        trace = [{
            x: x,
            y: y,
            fill: 'tozeroy',
            type: 'lines',
            fillcolor: 'rgba(13, 18, 27, 0.5)',
            mode: 'none'
        }]
    }

    if (tag === 'ROPFast') {
        var layout = {
            xaxis: {
                title: "Hole Depth",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "Avg ROP",
                gridcolor: 'rgba(0,0,0,.2)'
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
        var config = { responsive: true }
        Plotly.newPlot('rop-plot', trace, layout, config);
    }
    else if (tag === 'BitWeight') {
        var layout = {
            xaxis: {
                title: "Hole Depth",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "WOB",
                gridcolor: 'rgba(0,0,0,.2)'
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
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('wob-plot', trace, layout, config);
    }
    else if (tag === 'DownholeMSE') {
        var layout = {
            xaxis: {
                title: "Hole Depth",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "DMSE",
                gridcolor: 'rgba(0,0,0,.2)',
                range: [0, 40]
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
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('mse-plot', trace, layout, config);
    }
    else if (tag === 'DSBitRPM') {
        var layout = {
            xaxis: {
                title: "Hole Depth",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "Bit RPM",
                gridcolor: 'rgba(0,0,0,.2)'
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
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('bit-rpm-plot', trace, layout, config);
    }
    else if (tag === 'CumConservativeDays') {
        var layout = {
            xaxis: {
                title: "Days",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: "Depth",
                gridcolor: 'rgba(0,0,0,.2)'
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 400,
            width: 500,
            yaxis: { autorange: 'reversed' },
            margin: {
                l: 55,
                r: 2,
                b: 55,
                t: 10,
                pad: 4
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('dvd-plot', trace, layout, config);
    }
    else if (tag === 'AvgRop') {
        var layout = {
            yaxis: { title: "Avg ROP" },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 400,
            width: 480,
            margin: {
                l: 55,
                r: 2,
                b: 150,
                t: 10,
                pad: 4
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('avg-rop-plot', trace, layout, config);
    }

}

function fillFormationTable() {

    var rmCol = ['WellName', 'Formation', 'StartDepth', 'EndDepth',
        'Footage', 'AvgRop', 'AvgDiff', 'MaxSurfaceMse', 'AvgDmse', 'MinWob',
        'AvgWob', 'MinRpm', 'MaxRpm', 'MinFlowIn', 'MaxFlowIn', 'MinTdTorque',
        'MaxTdTorque'];
    var rows;
    d3.csv(roadMapCsv, function (loadedRows) {
        rows = loadedRows;
        loadedRows.forEach(function (formation) {
            let row = tbody.append("tr");

            Object.entries(formation).forEach(function ([key, value]) {
                // Append a cell to the row for each value
                // in the weather report object

                for (var c = 0; c < rmCol.length; c++) {
                    if (key === rmCol[c]) {
                        if (key === 'WellName' || key === 'Formation'){
                            let cell = row.append("td");
                            cell.text(value);
                        }
                        else{
                            let cell = row.append("td");
                            cell.text(Number(value).toFixed(3));
                        }
                    }
                }
            });
        });
    });

}

// init();
