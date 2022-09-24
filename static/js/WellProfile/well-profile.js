import { getBitRecord, getSectionSummary, getTimeData, getBoreHole, getFormation, getDailySummary, init } from '../ApiCalls/calls.js'
import { dvdChart, predictedTimeData, timeDataSubject } from '../Analytics/charts.js'
import { makePlotly, addToPlotly } from '../global-chart.js';
let loader = document.querySelector(".loader-big");
loader.style.display = "flex";
loader.style.height = '100vh'
loader.style.width = '100vw'

const autho = JSON.parse(sessionStorage.getItem('token'));
const token = autho.token;
const well = JSON.parse(sessionStorage.getItem('selectedWell'));
const wellId = well.id;
const offsetWells = JSON.parse(sessionStorage.getItem('wellList'));
// const offset = well.id;
console.log(offsetWells);

// var wellHeader = await getWellHeader(wellId,token);

async function header() {

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
}

async function sectionSummary(id) {
    var data = await getSectionSummary(id, token);

    await makePlotly(data, 'holeSection', 'avgROP', 'sectionsummary', well.wellName, 'bar');

    if (Object.keys(data).length !== 0) {

        document.getElementById('onbtmhrs-surf').innerHTML = data[0]['onBtmHrs'];
        document.getElementById('onbtmhrs-inti').innerHTML = data[1]['onBtmHrs'];
        document.getElementById('onbtmhrs-curve').innerHTML = data[2]['onBtmHrs'];
        document.getElementById('onbtmhrs-prod').innerHTML = data[3]['onBtmHrs'];

        document.getElementById('offbtmhrs-surf').innerHTML = data[0]['offBtmHrs'];
        document.getElementById('offbtmhrs-inti').innerHTML = data[1]['offBtmHrs'];
        document.getElementById('offbtmhrs-curve').innerHTML = data[2]['offBtmHrs'];
        document.getElementById('offbtmhrs-prod').innerHTML = data[3]['offBtmHrs'];

        document.getElementById('sldhrs-surf').innerHTML = data[0]['sldHrs'];
        document.getElementById('sldhrs-inti').innerHTML = data[1]['sldHrs'];
        document.getElementById('sldhrs-curve').innerHTML = data[2]['sldHrs'];
        document.getElementById('sldhrs-prod').innerHTML = data[3]['sldHrs'];

        document.getElementById('rothrs-surf').innerHTML = data[0]['rotHrs'];
        document.getElementById('rothrs-inti').innerHTML = data[1]['rotHrs'];
        document.getElementById('rothrs-curve').innerHTML = data[2]['rotHrs'];
        document.getElementById('rothrs-prod').innerHTML = data[3]['rotHrs'];

        document.getElementById('avgrop-surf').innerHTML = data[0]['avgROP'];
        document.getElementById('avgrop-inti').innerHTML = data[1]['avgROP'];
        document.getElementById('avgrop-curve').innerHTML = data[2]['avgROP'];
        document.getElementById('avgrop-prod').innerHTML = data[3]['avgROP'];

        document.getElementById('avgbitrpm-surf').innerHTML = data[0]['avgBitRPM'];
        document.getElementById('avgbitrpm-inti').innerHTML = data[1]['avgBitRPM'];
        document.getElementById('avgbitrpm-curve').innerHTML = data[2]['avgBitRPM'];
        document.getElementById('avgbitrpm-prod').innerHTML = data[3]['avgBitRPM'];

        document.getElementById('avgdiffp-surf').innerHTML = data[0]['avgDiffP'];
        document.getElementById('avgdiffp-inti').innerHTML = data[1]['avgDiffP'];
        document.getElementById('avgdiffp-curve').innerHTML = data[2]['avgDiffP'];
        document.getElementById('avgdiffp-prod').innerHTML = data[3]['avgDiffP'];

        document.getElementById('avgdiffp-surf').innerHTML = data[0]['avgDiffP'];
        document.getElementById('avgdiffp-inti').innerHTML = data[1]['avgDiffP'];
        document.getElementById('avgdiffp-curve').innerHTML = data[2]['avgDiffP'];
        document.getElementById('avgdiffp-prod').innerHTML = data[3]['avgDiffP'];

    }

}
async function bitRecord(id) {
    var bits = await getBitRecord(id, token);

    for (var i in bits) {
        var row = `<tr>
                        <td>${bits[i].runNumber}</td>
                        <td>${bits[i].holeSize}</td>
                        <td>${bits[i].make}</td>
                        <td>${bits[i].model}</td>
                        <td>${bits[i].serialNumber}</td>
                        <td>${bits[i].inDepth}</td>
                        <td>${bits[i].outDepth}</td>
                        <td>${bits[i].footage}</td>
                        <td>${bits[i].hours}</td>
                        <td>${Number(bits[i].rop).toFixed(2)}</td>
                        <td>${bits[i].wob}</td>
                        <td>${bits[i].rpm}</td>
                        <td>${bits[i].nozzels}</td>
                        <td>${bits[i].tfa}</td>
                        <td>${bits[i].dullGrade}</td>
                    </tr>`;
        var table = $(`#bit-record`);

        table.append(row);
    }
}

async function boreHole(id) {
    var data = await getBoreHole(id, token);

    for (var i in data) {
        var row = `<tr>
                        <td>${data[i].holeSection}</td>
                        <td>${data[i].measuredDepth}</td>
                        <td>${data[i].verticalDepth}</td>
                        <td>${data[i].item}</td>
                        <td>${data[i].csgOd}</td>
                        <td>${data[i].csgId}</td>
                        <td>${data[i].wt}</td>
                        <td>${data[i].grade}</td>
                        <td>${data[i].threads}</td>
                        <td>${data[i].csgConnection}</td>
                        <td>${data[i].settingDepth}</td>
                    </tr>`;
        var table = $(`#casing-design`);

        table.append(row);
    }
}

async function formationDetails(id) {
    var data = await getFormation(id, token);

    for (var i in data) {
        var row = `<tr>
                        <td>${data[i].formationName}</td>
                        <td>${data[i].startDepth}</td>
                        <td>${data[i].endDepth}</td>
                        <td>${data[i].tvdSs}</td>
                        <td>${data[i].md}</td>
                    </tr>`;
        var table = $(`#formation-details`);

        table.append(row);
    }
}

async function dailySummaries(id) {
    var data = await getDailySummary(id, token);
    // await dvdChart(data,'Subject');
    for (var i in data) {
        var row = `<tr>
                        <td>${data[i].reportDate}</td>
                        <td>${data[i].reportTimeDepth}</td>
                        <td>${data[i].progress}</td>
                        <td>${data[i].drillHrs}</td>
                        <td>${data[i].avgRop}</td>
                        <td>${data[i].avgWob}</td>
                        <td>${data[i].avgDiff}</td>
                        <td>${data[i].avgFlowIn}</td>
                        <td>${data[i].avgBitRpm}</td>
                        <td>${data[i].tvd}</td>
                        <td>${data[i].inc}</td>
                        <td>${data[i].azm}</td>
                    </tr>`;
        var table = $(`#daily-summaries`);

        table.append(row);
    }

    await dvdChart(data.reportDate, data.reportTimeDepth);

}
async function dvdRopPlot() {
    var ropData = await getTimeData(wellId, token);
    await makePlotly(ropData, 'measuredDepth', 'ropFast', 'ROPFast', well.wellName, 'lines')
    await makePlotly(ropData, 'cumDays', 'measuredDepth', 'dvd', well.wellName, 'lines')
}

async function addDvdRopPlot(id) {
    var ropData = await getTimeData(id, token);
    await addToPlotly(ropData, 'measuredDepth', 'ropFast', 'ROPFast', well.wellName, 'lines')
    await addToPlotly(ropData, 'cumDays', 'measuredDepth', 'dvd', well.wellName, 'lines')
}


await header();
await dailySummaries(wellId);
await bitRecord(wellId);
await boreHole(wellId);
await formationDetails(wellId);
await sectionSummary(wellId);
await dvdRopPlot();
loader.style.display = "none";
loader.style.height = '0vh'
loader.style.width = '0vw'


