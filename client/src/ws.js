
// Do WebSockets last, with socket.io (not ws)


const WS_PORT = 3001;

var ws = new WebSocket(`ws://${window.location.hostname}:${WS_PORT}`);




ws.addEventListener('error', function(e) {

	console.log('WebSocket not connected.');

});

ws.addEventListener('connect', function(e) {

	console.log('WebSocket connected');

});