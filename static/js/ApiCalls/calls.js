const wellId = localStorage;
const orgId = '1';
const username = sessionStorage.username;

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


export async function getAllWellHeaders(token) {

    var uri = `https://moontower-dashboard.azurewebsites.net/WellHeader/get-all-wells`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/WellHeader/get-wells-by-id/${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    console.log(data);
    
    return data;

}

export async function getBitRecord(wellId,token) {
    var uri = `https://moontower-dashboard.azurewebsites.net/BitRecord/get-bitrecord-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/AfeBudget/get-budget-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/BoreHole/get-borehole-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/DailySummary/get-dailysummaries-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/Directional/get-directional-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/Formation/get-tops-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/MotorSelection/get-motors-by-wellid/${wellId}`
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
    var uri = `https://moontower-dashboard.azurewebsites.net/Roadmap/get-roadmap-by-wellid/${wellId}`
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
    // var uri = `https://moontower-dashboard.azurewebsites.net/Roadmap/get-roadmap-by-wellid/${wellId}`
    // const responce = await fetch(uri);
    // const data = await responce.json();
    
    // return data;
}

export async function getTimeData(wellId,token){
    var uri = `https://moontower-dashboard.azurewebsites.net/DrillingTime/get-drilldata-by-wellid/${wellId}`
    const responce = await fetch(uri,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await responce.json();
    console.log(data);
    return data;
}