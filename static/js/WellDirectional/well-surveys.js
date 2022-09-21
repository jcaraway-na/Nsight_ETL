import { getSurveyDataByWellId } from '../ApiCalls/calls.js';
import { makePlotly, addToPlotly } from '../global-chart.js';

const autho = JSON.parse(sessionStorage.getItem('token'));
const token = autho.token;
const well = JSON.parse(sessionStorage.getItem('selectedWell'));
const wellId = well.id;

// Header info
document.getElementById('wellname').innerHTML = well.wellName;
document.getElementById('afenumber').innerHTML = well.afeNumber;
document.getElementById('apinumber').innerHTML = well.apiNumber;
document.getElementById('county').innerHTML = well.county;
document.getElementById('field').innerHTML = well.field;
document.getElementById('lat').innerHTML = well.lat;
document.getElementById('leasename').innerHTML = well.leaseName;
document.getElementById('long').innerHTML = well.long;
document.getElementById('permitnumber').innerHTML = well.permitNumber;
document.getElementById('state').innerHTML = well.state;
document.getElementById('targetformation').innerHTML = well.targetFormation;
document.getElementById('wellid').innerHTML = well.id;
// end Header info

let surveyData = await getSurveyDataByWellId(wellId,token);

// Get Subject well survey data.
async function loadSubjectSurveys(data){
    
    let over = 'style="color: white; background-color:rgba(255,0,0,.7);"'
    let under = ''
    for (var i in data) {
        var tdOver;
        if(data[i].doglegSeverity > 13){
            tdOver = over;
        }
        else{
            tdOver = under;
        }
        var row = `<tr>
                        <td>${data[i].measuredDepth}</td>
                        <td>${data[i].tvd}</td>
                        <td class="medium-font">${data[i].inclination}</td>
                        <td class="medium-font">${data[i].azimuth}</td>
                        <td ${tdOver} class="medium-font">${data[i].doglegSeverity}</td>
                        <td>${data[i].courseLength}</td>
                        <td>${data[i].subseaDepth}</td>
                        <td>${data[i].localNorthSouth}</td>
                        <td>${data[i].localEastWest}</td>
                        <td>${data[i].mapNorthing}</td>
                        <td>${data[i].mapEasting}</td>
                        <td>${data[i].lat}</td>
                        <td>${data[i].long}</td>
                        
                        <td>${data[i].toolFace}</td>
                        <td>${data[i].vertSection}</td>
                    </tr>`;
        var table = $(`#approvedsurveys`);

        table.append(row);
    }
}

async function makeSurveyPlot(data){
    var i, r;
    var x = [];
    var y = [];
    var z = [];
    var c = [];

    for(i = 0; i < data.length; i++){
        // r = 10 * Math.cos(i/10);
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

await loadSubjectSurveys(surveyData);
await makeSurveyPlot(surveyData);
