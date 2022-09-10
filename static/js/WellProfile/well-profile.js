import { getBitRecord, getWellHeader, getBoreHole,getFormation } from '../ApiCalls/calls.js'
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
    console.log('casing data....');
    console.log(data);
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
    console.log('formation data....');
    console.log(data);
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


await header();
await bitRecord(wellId);
await boreHole(wellId);
await formationDetails(wellId);
