/* UDP server talks to Arduino */
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4')
var MY_PORT_FOR_ARDUINO = 7067;
var ARDUINO_PORT_FOR_ME= 5067;
var ARDUINO_IP_ADDRESS = ''; // add the IP address that Arduino gives you here!


/* HTTP server talks to browser */
const http = require('http')
const express = require('express'); // web server application
const app = express();        // instantiate express server
const httpServer = http.Server(app);  // connects http library to server
const HTTP_SERVER_PORT = 8090; 


// Express creates the simple web page
// The argument says where to find pages and scripts
app.use(express.static('public'));  

// websockets so that webpage can talk back to server
const webSocket = require('socket.io')(httpServer);  


/* Arduino UDP server callback functions */

function ArduinoUDPServerIsListening() {
	console.log('Arduino UDP Server is listening');
}


function ArduinoUDPServerReceivedMessage(message, sender) {

	// If the message is a byte we need to read a byte
	if (message.readUInt8(0) == 8) {

		//send message so that the browser server can react to it on the client side
		//this message is when the user wants to check what their phone is trying to tell them
		webSocket.emit('user wants to check phone');
		console.log("I just sent it to browser");
	}

	if (message.readUInt8(0) == 1 ) {
		//
		//this message is when the user wants to check why their watch is vibrating
		console.log( "user wants to check watch notification");
		webSocket.emit('receivedOne');
	}

}


/* Register the UDP callback functions */
udpServer.bind( MY_PORT_FOR_ARDUINO );
udpServer.on('listening', ArduinoUDPServerIsListening);
udpServer.on('message', ArduinoUDPServerReceivedMessage);
// udpServer.on('message', sendEmail);

/* HTTP callback functions */

httpServer.listen(HTTP_SERVER_PORT, () => {
	console.log('web server: Listening at', httpServer.address());
});

httpServer.on('connection', () => {
  console.log("web server: An HTTP client has connected")
});


webSocket.on('connect', (socket) => {
	// array for the message
	// sound[0] = LED number 
	// sound[1] = LED state 
	const SIZEOF_LED_DATA = 2;
	var sound = new Uint8Array(SIZEOF_LED_DATA ); 
  
	//sending alerts to make vibration motor go off, indicating that the watch has a notification
	console.log('Web server socket: Client connected');
    socket.on('sendAlert', function () {
      console.log('Web server socket: received alert message from web client');
      // this is where we would send the message to Arduino
			sound[0] = 4;  // Red is LED number 0

		
    // Send the message to Arduino
    	udpServer.send(
			sound,
			0, // offset to the message start in the buffer
			SIZEOF_LED_DATA,
			ARDUINO_PORT_FOR_ME, 
			ARDUINO_IP_ADDRESS);

    	console.log("message sent to arduino to turn on vibration motor");
    });




  // if you get the 'disconnect' message, say the user disconnected
  socket.on('disconnect', () => {
    console.log('Web server socket: user disconnected');
  });
});