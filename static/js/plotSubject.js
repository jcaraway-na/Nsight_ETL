const wellId = 111;
const orgId = '1';

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

export async function getAllWellHeaders() {
    var uri = `https://moontower-dashboard.azurewebsites.net/WellHeader/get-all-wells`
    const responce = await fetch(uri);
    const data =  responce.json();

    return data;
}

export async function getWellHeader(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/WellHeader/get-wells-by-id/${wellId}`
    const responce = await fetch(uri);
    const data = await responce.json();
    console.log(data);
    
    return data;

    // responce = axios.get(uri)
    // .then(responce => responce.json())
    // .catch(err => console.error(err)); // promise
    // return responce;
}

export async function getBitRecord(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/BitRecord/get-bitrecord-by-wellid/${wellId}`
    const responce = await fetch(uri);
    const data = await responce.json();
    console.log(data);

    for (var i in data){
        var row =   `<tr>
                        <td>${data[i].runNumber}</td>
                        <td>${data[i].holeSize}</td>
                        <td>${data[i].make}</td>
                        <td>${data[i].model}</td>
                        <td>${data[i].serialNumber}</td>
                        <td>${data[i].inDepth}</td>
                        <td>${data[i].outDepth}</td>
                        <td>${data[i].footage}</td>
                        <td>${data[i].hours}</td>
                        <td>${Number(data[i].rop).toFixed(2)}</td>
                        <td>${data[i].wob}</td>
                        <td>${data[i].rpm}</td>
                        <td>${data[i].nozzels}</td>
                        <td>${data[i].tfa}</td>
                        <td>${data[i].dullGrade}</td>
                    </tr>`;
            var table = $(`#bit-record`);

            table.append(row);
    }
}

export function getAfeBudget(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/AfeBudget/get-budget-by-wellid/${wellId}`
    responce = axios.get(uri);
    console.log(responce);
    return responce;
}

export async function getBoreHole(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/BoreHole/get-borehole-by-wellid/${wellId}`
    const responce = await fetch(uri);
    const data =  responce.json();

    return data;
}

export function getDailySummary(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/DailySummary/get-dailysummaries-by-wellid/${wellId}`
    responce = axios.get(uri);
    console.log(responce);
    return responce;
}

export function getDirectional(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/Directional/get-directional-by-wellid/${wellId}`
    responce = axios.get(uri);
    console.log(responce);
    return responce;
}

export function getFormation(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/Formation/get-tops-by-wellid/${wellId}`
    responce = axios.get(uri);
    console.log(responce);
    return responce;
}

export function getMotorSelection(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/MotorSelection/get-motors-by-wellid/${wellId}`
    responce = axios.get(uri);
    console.log(responce);
    return responce;
}

export function getRoadmap(wellId) {
    var uri = `https://moontower-dashboard.azurewebsites.net/Roadmap/get-roadmap-by-wellid/${wellId}`
    responce = axios.get(uri);
    console.log(responce);
    return responce;
}

// init(wellId);