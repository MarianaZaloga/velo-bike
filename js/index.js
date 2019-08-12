document.querySelector('.timestamp').innerText = (new Date()).toLocaleTimeString();

const XHR_STATE_DONE = 4;
const HTTP_STATUS_CODE = 200;

// JSON Sample

document.querySelector('.ajax-json').addEventListener('click', getAjaxJson);

function getAjaxJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XHR_STATE_DONE &&
            xhr.status === HTTP_STATUS_CODE) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.balance;
        }
    }
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.fetch-json').addEventListener('click', fetchJson);

function fetchJson() {
    fetch('client-data.json')
        .then(response => response.json())
        .then(clientData => {
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.balance;
        });
}

document.querySelector('.login-form input[type=submit]')
    .addEventListener('click', login);

function login(e) {
    e.preventDefault();
    fetch('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            name: document.querySelector('.login-form input[name=name]').value,
            email: document.querySelector('.login-form input[name=email]').value,
            mesagge: document.querySelector('.login-form textarea[name=message]').value
        })
    })
        .then(_ => document.querySelector('.login-form').reset());
}