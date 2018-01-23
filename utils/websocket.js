'use strict';

export default function wsconn(url) {
    return new Promise(function(resolve, reject) {
        let socket = new WebSocket('ws://' + url + '/api/ws');

        socket.onopen = function () {
            resolve(socket);
        };
        socket.onmessage = function (message) {
            console.log("server echo: " + message.data);
        };
        socket.onerror = function (error) {
            console.log('WebSocket error: ' + error);
            reject(error);
        };
        socket.onclose = function (event) {
            console.log("Websocket socket closed: " + JSON.stringify(event));
        };
    });
}