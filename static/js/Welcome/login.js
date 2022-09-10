import { postLogin } from '../ApiCalls/calls.js'

async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const token = await postLogin(username, password);
    console.log(token);

    if(token['statusCode'] === 200){

        sessionStorage.setItem('token',JSON.stringify({
            token: token['result']['token'],
            username: token['result']['username'],
            role: token['result']['role']
        }));

        window.location.href="well-list.html";
    }
    else{
        alert("Bad login.");
    }
}


document.getElementById('login-btn').addEventListener('click',login);