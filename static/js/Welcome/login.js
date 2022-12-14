import { postLogin,getApiByOrgId } from '../ApiCalls/calls.js'
let loader = document.querySelector(".loader");
loader.style.display = "none";

async function login() {
    loader.style.display = "";
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;


    const token = await postLogin(username, password);

    if(token['statusCode'] === 200){

        sessionStorage.setItem('token',JSON.stringify({
            token: token['result']['token'],
            username: token['result']['user']['username'],
            role: token['result']['user']['role'],
            orgid: token['result']['user']['orgId']
        }));
   
        const tok = JSON.parse(sessionStorage.getItem('token'));
        var calls = await getApiByOrgId(tok.orgid,tok.token);

        sessionStorage.setItem('apiCalls',JSON.stringify({
            GetAllWellHeaders: calls['0']['uri'],
            GetWellHeaderById: calls['1']["uri"],
            GetBitRecordByWellId: calls['2']["uri"],
            GetAfeBudgetByWellId: calls['3']["uri"],
            GetBoreHoleByWellId: calls['4']["uri"],
            GetDailySummaryByWellId: calls['5']["uri"],
            GetDirectionalByWellId: calls['6']["uri"],
            GetFormationByWellId: calls['7']["uri"],
            GetMotorSelectionByWellId: calls['8']["uri"],
            GetRoadMapByWellId: calls['9']["uri"],
            GetSectionSummaryByWellId: calls['10']["uri"],
            GetTimeDataByWellId: calls['11']["uri"],
            GetFieldEstByWellId: calls['12']["uri"],
            GetBudgetVsFeByWellId: calls['13']["uri"],
            GetAccountCostByWellIdCostCode: calls['14']["uri"],
            GetSurveysByWellId: calls['15']["uri"],
            GetParameterHeatmapData: calls['16']["uri"]
        }));
        const api = JSON.parse(sessionStorage.getItem('apiCalls'));



        window.location.href="well-list.html";
    }
    else{
        loader.style.display = "none";
        alert("Bad login.");
    }
}

document.getElementById('login-btn').addEventListener('click',login);