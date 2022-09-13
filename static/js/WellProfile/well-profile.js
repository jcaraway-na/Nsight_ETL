import { getBitRecord, getWellHeader, getTimeData, getBoreHole,getFormation, getDailySummary } from '../ApiCalls/calls.js'
import { dvdChart,predictedTimeData,timeDrillingData } from '../Analytics/charts.js'


const autho = JSON.parse(sessionStorage.getItem('token'));
const token = autho.token;
const well = JSON.parse(sessionStorage.getItem('selectedWell'));
const wellId = well.id;

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

async function bitRecord(id) {
    var bits = await getBitRecord(id,token);

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
    var data = await getBoreHole(id,token);

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

async function formationDetails(id){
    var data = await getFormation(id,token);

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


async function dailySummaries(id){
    var data = await getDailySummary(id,token);
    await dvdChart(data,'Subject');
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

    await dvdChart(data.reportDate,data.reportTimeDepth);

}

await header();
await dailySummaries(wellId);
await bitRecord(wellId);
await boreHole(wellId);
await formationDetails(wellId);
await predictedTimeData();
await timeDrillingData(await getTimeData(wellId,token),'Subject');
