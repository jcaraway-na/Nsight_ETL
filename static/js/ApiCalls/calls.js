const wellId = localStorage;
const orgId = '1';
const username = sessionStorage.username;
const api = JSON.parse(sessionStorage.getItem('apiCalls'));

export function init(wellId) {
    var allHeaders = getAllWellHeaders(wellId);
    var header = getWellHeader(wellId);
    var bitRecord = getBitRecord(wellId);
    // const boreHole = getBoreHole(wellId);
    // const dailySummary = getDailySummary(wellId);
    // const directional = getDirectional(wellId);
    // const formations = getFormation(wellId);
    // const motors = getMotorSelection(wellId);
    // const roadmap = getRoadmap(wellId);

}

export async function postLogin(username, password){

    const data = {username,password};

    const options ={
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    };
    
    const responce = await fetch(`https://moontower-dashboard.azurewebsites.net/User/login`,options);
    return responce.json();
}

export async function getApiByOrgId(orgid,token) {

    var uri = `https://moontower-dashboard.azurewebsites.net/Api/get-api-by-orgid/${orgid}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getAllWellHeaders(token) {

    var uri = api.GetAllWellHeaders
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getWellHeader(wellId,token) {
    var uri = api.GetWellHeaderById+`${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;

}

export async function getBitRecord(wellId,token) {
    var uri = `${api.GetBitRecordByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;

    
}

export async function getAfeBudget(wellId,token) {
    var uri = `${api.GetAfeBudgetByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getBoreHole(wellId,token) {
    var uri = `${api.GetBoreHoleByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getDailySummary(wellId,token) {
    var uri = `${api.GetDailySummaryByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getDirectional(wellId,token) {
    var uri = `${api.GetDirectionalByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getFormation(wellId,token) {
    var uri = `${api.GetFormationByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getMotorSelection(wellId,token) {
    var uri = `${api.GetMotorSelectionByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getRoadmap(wellId,token) {
    var uri = `${api.GetRoadMapByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    
    return data;
}

export async function getDepthData(wellId,token){

}

export async function getSectionSummary(wellId,token){
    var uri = `${api.GetSectionSummaryByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getTimeData(wellId,token){
    var uri = `${api.GetTimeDataByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getDataByWellId(wellId,token){
    var uri = `${api.GetBudgetVsFeByWellId}${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getDataByWellIdCostCode(wellId,costCode,token){
    var uri = `${api.GetAccountCostByWellIdCostCode}${wellId}/${costCode}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getSurveyDataByWellId(wellId,pa,token){
    var uri = `${api.GetSurveysByWellId}${wellId}/${pa}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}

export async function getHeatmapData(wellId,startDepth,endDepth,token){
    var uri = `${api.GetParameterHeatmapData}${wellId}/${startDepth}/${endDepth}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();

    return data;
}