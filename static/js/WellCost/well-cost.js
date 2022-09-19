import { getDataByWellId,getDataByWellIdCostCode } from '../ApiCalls/calls.js';
import { makePlotly, addToPlotly} from '../global-chart.js';

const autho = JSON.parse(sessionStorage.getItem('token'));
const token = autho.token;
const well = JSON.parse(sessionStorage.getItem('selectedWell'));
const wellId = well.id;

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

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

async function loadAfeUsage(wellId){
    var costVarianceData = await getDataByWellId(wellId,token);
    let over = 'style="color: white; background-color:rgba(255,0,0,.8);"'
    let under = 'style="color: white; background-color:rgba(8,176,26,.8);"'
    for (var i in costVarianceData) {
        var tdOver;
        if(costVarianceData[i].usage > 100){
            tdOver = over;
        }
        else{
            tdOver = under;
        }
        var row = `<tr>
                        <td class="medium-font">${costVarianceData[i].costCode}</td>
                        <td>${costVarianceData[i].description}</td>
                        <td>${formatter.format(costVarianceData[i].estAmount)}</td>
                        <td>${formatter.format(costVarianceData[i].afeAmount)}</td>
                        <td ${tdOver} class="medium-font">${costVarianceData[i].usage+'%'}</td>
                    </tr>`;
        var table = $(`#afevsfe`);

        table.append(row);
    }
    await makePlotly(costVarianceData,'costCode','estAmount','afevfe',well.wellName,'bar');
    await addToPlotly(costVarianceData,'costCode','afeAmount','afevfe',well.wellName+" AFE",'bar');
}

header();
await loadAfeUsage(wellId);

$(document).ready(function(){
    $(document).on('click','#afevsfe tbody tr',async function(){
        let CostCode = $(this).find('td:eq(0)').text();
        var costCodeData = await getDataByWellIdCostCode(wellId,CostCode,token);
        console.log(costCodeData);
        $("#selectedcostcode tbody tr").remove();
        for (var i in costCodeData) {
            var row = `<tr>
                            <td class="medium-font">${costCodeData[i].reportDate}</td>
                            <td>${costCodeData[i].primaryCode}</td>
                            <td>${costCodeData[i].subCode}</td>
                            <td>${costCodeData[i].description}</td>
                            <td class="medium-font">${formatter.format(costCodeData[i].estAmount)}</td>
                            <td>${costCodeData[i].vendor}</td>
                        </tr>`;
            var table = $(`#selectedcostcode`);
            table.append(row);
        }
    });
});