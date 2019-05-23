/* 
important note: your browser might be blocking mp3 autoplay, so you might have to put an exception in the settings to allow autoplay from your local host
This is the websocket library which will allow us to send messages
back to the web server 
*/
var socket = io();
var counter = 0;					//to control which image/audio is executed
var alerting = false;				// only when there is a notification sent to arduino, you can check to see the watch




//display different watch pictures
socket.on('receivedOne', (data) => {
	console.log('received button released from webserver: ' + data);
	if (counter == 0 && alerting) {
		$('body').css('background-image', 'url(../images/insta.png)');
		alerting = false;
    	var x = document.getElementById("myAudio");
    	x.src = "audio/instaWatch.mp3"
    	x.play();
	}
	if (counter == 1 && alerting) {
		$('body').css('background-image', 'url(../images/bbc.png)');
		alerting = false;
		var x = document.getElementById("myAudio");
    	x.src = "audio/bbcWatch.mp3"
    	x.play();
	}
	if (counter == 2 & alerting) {
		$('body').css('background-image', 'url(../images/messenger.png)');
		alerting = false;
	}
	if (counter == 3 & alerting) {
		$('body').css('background-image', 'url(../images/facebook.png)');
		alerting = false;
	}



});

//code used to display images, send alerts to arduino, and play audio files corresponding to the counter number
socket.on('receivedEight', (data) => {

	if (counter == 0){
	$('body').css('background-image', 'url(../images/instaPhone.png)');
	$('body').css('height', '750');

	setTimeout(function(){
	$('body').css('background-image', 'url(../images/friends1.jpg)');
	var x = document.getElementById("myAudio");
    x.src = "audio/friends1.mp3"
    x.play();
}, 1500);
	setTimeout(function(){
	socket.emit('sendAlert');
    console.log("Button clicked on browser");
    alerting = true;
    counter++;
}, 7000);
	
}
	if (counter == 1){
	console.log("hello there2");
	console.log("hamdulilah I got it");
	$('body').css('background-image', 'url(../images/bbcPhone.png)');
	$('body').css('height', '750');
	var x = document.getElementById("myAudio");
    x.src = "audio/bbcPhone.mp3"
    x.play();
	setTimeout(function(){
	$('body').css('background-image', 'url(../images/friends2.jpg)');
	var x = document.getElementById("myAudio");
    x.src = "audio/friends2.mp3"
    x.play();
}, 3000);
	setTimeout(function(){
	$('body').css('background-image', 'url(../images/brekkie1.jpg)');
	var x = document.getElementById("myAudio");
    x.src = "audio/brekkie1.mp3"
    x.play();
}, 17000);
	setTimeout(function(){
	// $('body').css('background-image', 'url(../images/facebook.png)');
	socket.emit('sendAlert');
    console.log("Button clicked on browser");
    alerting = true;
    counter++;
}, 25000);
	
}

if (counter == 2){
	console.log("hello there3");
	console.log("hamdulilah I got it");
	$('body').css('height', '750');
	$('body').css('background-image', 'url(../images/messengerPhone.png)');
	var x = document.getElementById("myAudio");
    x.src = "audio/messengerPhone.mp3"
    x.play();
	setTimeout(function(){
	$('body').css('background-image', 'url(../images/brekkie2.jpg)');
	var x = document.getElementById("myAudio");
    x.src = "audio/brekkie2.mp3"
    x.play();

}, 7000);
	setTimeout(function(){
	$('body').css('background-image', 'url(../images/class1.jpg)');
	var x = document.getElementById("myAudio");
    x.src = "audio/class1.mp3"
    x.play();
}, 16000);
	setTimeout(function(){
	// $('body').css('background-image', 'url(../images/messenger.png)');
	socket.emit('sendAlert');
    console.log("Button clicked on browser");
    alerting = true;
    counter++;
}, 18000);
	
}

if (counter == 3){
	console.log("hello there3");
	console.log("hamdulilah I got it");
	$('body').css('background-image', 'url(../images/facebookPhone.png)');
	$('body').css('height', '750');
	setTimeout(function(){
	$('body').css('background-image', 'url(../images/class2.jpg)');
	var x = document.getElementById("myAudio");
    x.src = "audio/class2.mp3"
    x.play();
}, 3000);
	setTimeout(function(){
	$('body').css('background-image', 'url(../images/blankWatch.png)');
	var x = document.getElementById("myAudio");
    x.src = "audio/closing.mp3"
    x.play();
}, 10000);
	
}


	

});



//the first page of the website when no user input is needed first
setTimeout(function(){
    var x = document.getElementById("myAudio");
    x.play();
    $('body').css('background-image', 'url(../images/blankWatch.png)');



}, 3000);

setTimeout(function(){
    $('body').css('background-image', 'url(../images/studying.png)');
    var x = document.getElementById("myAudio");
    x.src = "audio/studying.mp3"
    x.play();
}, 20000);



setTimeout(function(){
    socket.emit('sendAlert');
    console.log("Button clicked on browser");
    alerting = true;

}, 31000);










