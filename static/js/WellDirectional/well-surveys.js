import { getSurveyDataByWellId } from '../ApiCalls/calls.js';
import { makePlotlySurvey, addToPlotlySurvey } from '../global-chart.js';

let loader = document.querySelector(".loader-big");
let dropdown = document.getElementById('selDataset');

loader.style.display = "flex";
loader.style.height = '100vh'
loader.style.width = '100vw'

const autho = JSON.parse(sessionStorage.getItem('token'));
const token = autho.token;
const well = JSON.parse(sessionStorage.getItem('selectedWell'));
const wellId = well.id;
const offsetWells = JSON.parse(sessionStorage.getItem('wellList'));
console.log(offsetWells);

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

let surveyData = await getSurveyDataByWellId(wellId, token);

function init(data) {
    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].wellName;
        option.value = data[i].wellId;
        dropdown.add(option);
    }
}

// Get Subject well survey data.
async function loadSubjectSurveys(data) {

    let over = 'style="color: white; background-color:rgba(255,0,0,.7);"'
    let under = ''
    for (var i in data) {
        var tdOver;
        if (data[i].doglegSeverity > 13) {
            tdOver = over;
        }
        else {
            tdOver = under;
        }
        var row = `<tr>
                        <td>${data[i].measuredDepth}</td>
                        <td>${data[i].tvd}</td>
                        <td class="medium-font">${data[i].inclination}</td>
                        <td class="medium-font">${data[i].azimuth}</td>
                        <td ${tdOver} class="medium-font">${data[i].doglegSeverity}</td>
                        <td>${data[i].toolFace}</td>
                        <td>${data[i].vertSection}</td>
                    </tr>`;
        var table = $(`#approvedsurveys`);

        table.append(row);
    }
}


async function changed(id) {
    //fetch data offset surveys
    let data = await getSurveyDataByWellId(wellId, token);
    await addToPlotlySurvey(data);
}

await loadSubjectSurveys(surveyData);
await makePlotlySurvey(surveyData);
init(offsetWells);

loader.style.display = "none";
loader.style.height = '0vh'
loader.style.width = '0vw'