//works with this p5 sketch:
//https://editor.p5js.org/jesse_harding/sketches/w02SNneXz

//variable to hold incoming data
String incomingData = "01!";
int ledPin1 = 13;//RED
int ledPin2 = 2;
int ledPin3 = 3;
int ledPin4 = 4;
int ledPin5 = 5;
int ledPin6 = 6;


void setup() {
  //set pinmodes
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(ledPin4, OUTPUT);
  pinMode(ledPin5, OUTPUT);
  pinMode(ledPin6, OUTPUT);
  
  //set baudrate for serial communication
  Serial.begin(9600);
}

void loop() {
  
//  check to see if there is a connection 
  if(Serial.available() > 0){ // Checks whether data is comming from the serial port
    //if so, read the incoming data
    incomingData = Serial.readStringUntil('!'); // Reads the data from the serial port
  }

incomingData.trim();

//RED LIGHT
 //Serial.println(incomingData);
 if (incomingData.substring(0,1) == "1") {
  digitalWrite(ledPin1, HIGH); // Turn LED ON
 }
 else if (incomingData.substring(0,1) == "0"){
  digitalWrite(ledPin1, LOW); // Turn LED OFF
 }

 
 //FIRST GREEN
 if (incomingData.substring(1,2) == "1") {
  digitalWrite(ledPin2, HIGH); //Turn LED ON
 } 
 else if (incomingData.substring(1,2) == "0") {
  digitalWrite(ledPin2, LOW); //Turn LED OFF
 } 

 
 //SECOND GREEN
if (incomingData.substring(2,3) == "1") {
  digitalWrite(ledPin3, HIGH); //Turn LED ON
 } 
 else if (incomingData.substring(2,3) == "0") {
  digitalWrite(ledPin3, LOW); //Turn LED OFF
}


//THIRD GREEN
if (incomingData.substring(3,4) == "1") {
  digitalWrite(ledPin4, HIGH); //Turn LED ON
 } 
 else if (incomingData.substring(3,4) == "0") {
  digitalWrite(ledPin4, LOW); //Turn LED OFF
}


  //FOURTH GREEN
if (incomingData.substring(4,5) == "1") {
  digitalWrite(ledPin5, HIGH); //Turn LED ON
 } 
 else if (incomingData.substring(4,5) == "0") {
  digitalWrite(ledPin5, LOW); //Turn LED OFF
}


//FIFTH GREEN
if (incomingData.substring(5,6) == "1") {
  digitalWrite(ledPin6, HIGH); //Turn LED ON
 } 
 else if (incomingData.substring(5,6) == "0") {
  digitalWrite(ledPin6, LOW); //Turn LED OFF
}
}
