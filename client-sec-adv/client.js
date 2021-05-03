const grant_type = "client_credentials";
const accessTokenUrl = "https://pxl-security.eu.auth0.com/oauth/token";
const audience = "https://pxlsecadvapi/";

let token = "";
let printTextElement;
let textNode = document.createTextNode("");

window.addEventListener("load", () => {
    document.getElementById("getTokenButton").addEventListener("click", getToken);
    document.getElementById("buttonPoem").addEventListener("click", getPoem);
    document.getElementById("buttonTeam").addEventListener("click", getTeam);
    printTextElement = document.getElementById("text");
    printTextElement.appendChild(textNode);
})

async function getToken() {
    let clientId = document.getElementById("clientId").value;
    let clientSecret = document.getElementById("clientSecret").value;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let data = {
        grantType: grant_type,
        id: clientId,
        secret: clientSecret,
        dataAudience: audience
    }

    fetch(accessTokenUrl, {
        method: "POST",
        headers: myHeaders,
        body: data
    }).then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        token = `${data.token_type} ${data.access_token}`
    }).catch(error => {
        console.log(error);
    })
}

async function getPoem() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token)

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://localhost:44302/team", requestOptions)
        .then(response => {
            return response.text();
        })
        .then(result => {
            textNode.value = result;
        })
        .catch(error => console.log('error', error));
}

async function getTeam() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token)

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://localhost:44302/gedicht", requestOptions)
        .then(response => {
            return response.text();
        })
        .then(result => {
            textNode.value = result;
        })
        .catch(error => console.log('error', error));
}