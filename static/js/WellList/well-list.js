import { getAllWellHeaders } from '../ApiCalls/calls.js'
const autho = JSON.parse(sessionStorage.getItem('token'));
const token = autho.token;

async function init() {
    var data = await getAllWellHeaders(token);
    sessionStorage.setItem('wellList',JSON.stringify(data));
    for (var i in data) {
        var row = `<tr>
                    <td>${data[i].wellId}</td>
                    <td>${data[i].wellName}</td>
                    <td>${data[i].leaseName}</td>
                    <td>${data[i].field}</td>
                    <td>${data[i].state}</td>
                    <td>${data[i].county}</td>
                    <td>${data[i].targetFormation}</td>
                    <td>${data[i].permitNumber}</td>
                    <td>${data[i].apiNumber}</td>
                    <td>${data[i].afeNumber}</td>
                    <td>${data[i].latitude}</td>
                    <td>${data[i].longitude}</td>
                </tr>`;
        var table = $(`#welllist`);

        table.append(row);
    }
}

$(document).ready(function(){
    $(document).on('click','#welllist tbody tr',function(){
        let wellid = $(this).find('td:eq(0)').text();
        let wellName = $(this).find('td:eq(1)').text();
        let wellLeaseName = $(this).find('td:eq(2)').text();
        let wellField = $(this).find('td:eq(3)').text();
        let wellState = $(this).find('td:eq(4)').text();
        let wellcounty = $(this).find('td:eq(5)').text();
        let wellTargetFormation = $(this).find('td:eq(6)').text();
        let wellPermitNumber = $(this).find('td:eq(7)').text();
        let wellApiNumber = $(this).find('td:eq(8)').text();
        let wellAfeNumber = $(this).find('td:eq(9)').text();
        let wellLat = $(this).find('td:eq(10)').text();
        let wellLong = $(this).find('td:eq(11)').text();
        
        sessionStorage.setItem('selectedWell',JSON.stringify({
            id: wellid,
            wellName: wellName,
            leaseName: wellLeaseName,
            field: wellField,
            state: wellState,
            county: wellcounty,
            targetFormation: wellTargetFormation,
            permitNumber: wellPermitNumber,
            apiNumber: wellApiNumber,
            afeNumber: wellAfeNumber,
            lat: wellLat,
            long: wellLong
        }));

        window.location.href="well-profile.html"
    });
});

init();


