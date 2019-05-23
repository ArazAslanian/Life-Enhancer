/*
  HC-SR04 Ping distance sensor]
  VCC to arduino 5v GND to arduino GND
  Echo to Arduino pin 13 Trig to Arduino pin 12
  Red POS to Arduino pin 11
  Green POS to Arduino pin 10
  560 ohm resistor to both LED NEG and GRD power rail
  More info at: http://goo.gl/kJ8Gl
  Original code improvements to the Ping sketch sourced from Trollmaker.com
  Some code and wiring inspired by http://en.wikiversity.org/wiki/User:Dstaub/robotcar
*/

int vibe = 5;                     //vibration motor
const int buttonPin = 1;          //button
int tilt = 3;                     //tilt sensor

int reading;                      //tilt sensor reading
int previous;                     //previous tilt sensor reading


//variables needed for tilt sensor
long time = 0;
long debounce = 50;


//variables needed for button
int currentButtonState = 0;
int previousButtonState = 0;


int incomingBytes = 0;


//variables controlling when certain messages are sent depending on which stage of image display the program is at
int counter = 0;
boolean sendMsg = true;



#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>


int status = WL_IDLE_STATUS;
#include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;            // your network SSID (name)
char pass[] = SECRET_PASS;           // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;                   // your network key Index number (needed only for WEP)

unsigned int localPort = 5067;    // local port to listen on

char packetBuffer[255]; //buffer to hold incoming packet

WiFiUDP Udp;


void setup() {

  pinMode(tilt, INPUT);
  digitalWrite(tilt, HIGH);       //turn on the built in pull-up resistor
  pinMode(vibe, OUTPUT);
  pinMode(buttonPin, INPUT);




  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempt to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  Serial.println("Connected to wifi");
  printWiFiStatus();

  Serial.print("Initializing WiFiUDP library and listening on port ");
  Serial.println(localPort);
  Udp.begin(localPort);

  digitalWrite(2, LOW);
}

void loop() {


  // if there's data available, read a packet
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    //    Serial.println(packetSize);
    Serial.print("Received packet of size ");
    Serial.print(packetSize);
    Serial.print(" from address ");
    IPAddress remoteIp = Udp.remoteIP();
    Serial.print(remoteIp);
    Serial.print(", port ");
    Serial.println(Udp.remotePort());

    // read the packet into packetBufffer
    int len = Udp.read(packetBuffer, 150);
    Serial.println("I just turned vibration motor on");


    incomingBytes = packetBuffer[0];
    Serial.print(incomingBytes);
    if (incomingBytes == 4) {
      if (counter == 0) {
        analogWrite(vibe, 255);
        counter += 1;
        sendMsg = true;

      }

    }


  }


  IPAddress receivingDeviceAddress(); // add the IP Address of your network here!
  unsigned int receivingDevicePort = 7067;


  //after the user "checks their phone", this button will send a message to the server so that they move on to the next stage and see what their phone has to say
  currentButtonState = digitalRead(buttonPin);
  if (currentButtonState == 1 && previousButtonState == 0) {
    Serial.println("it's high");
    if (counter == 1) {
      Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);
      Udp.write(8);
      Udp.endPacket();
      counter = 0;
    }
  }

  previousButtonState = currentButtonState;

 //this code checks wether the watch is an upright position (mimicking how one looks at a watch), and only when a user is "looking" at a watch, the watch appears on the screen
  int switchstate;
  reading = digitalRead(tilt);

  if (reading != previous) {
    time = millis();
  }

  if ((millis() - time) > debounce) {
    switchstate = reading;
  }

  if (switchstate == LOW) {
    Serial.println("yallah pls");
    //    Serial.println("show hand");
    Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);
    Udp.write(1);
    Udp.endPacket();
    analogWrite(vibe, 0);

  }

  previous = reading;



}

void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("My IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
