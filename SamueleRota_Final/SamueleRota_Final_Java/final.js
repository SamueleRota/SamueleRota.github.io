//may not work on safari
// Declare a "SerialPort" object
let serial;

// fill in the name of your serial port here:
//copy this from the serial control app
let portName = "/dev/tty.usbmodem101";

//backgroung
let operationImg;
//BodyParts
let bellyImg;
let belly;
let boneImg;
let bone;
let heartImg;
let heart;
let lungsImg;
let lungs;
let throatImg;
let throat;
//ForEyes
let lookAmtx;
let lookAmty;
//MousePossition
// let diffX;
// let diffY;

let msg = ["0", "0", "0", "0", "0", "0", "!"];

function preload() {
operationImg = loadImage('operation.png');
  bellyImg = loadImage('belly.png');
  boneImg = loadImage('bone.png');
  heartImg = loadImage('heart.png');
  lungsImg = loadImage('lungs.png');
  throatImg = loadImage('throat.png');
}


function setup() {
  createCanvas(650, 650);
  
    // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);

  rectMode(CENTER); //center mode for rects and images
  imageMode(CENTER);
  belly  = new draggable(194, 302, 40, 50,"rect", bellyImg); //create instance of class
  bone  = new draggable(83, 337, 40, 40,"rect", boneImg); //create instance of class
  heart  = new draggable(73, 435, 40, 40,"rect", heartImg);
  lungs  = new draggable(497, 306, 50, 50, "rect", lungsImg);
  throat = new draggable (560, 448, 40, 40, "rect", throatImg);

}

function draw() {
   image(operationImg,650/2,650/2,650,650);
   // image(bellyImg, 194, 302, 40, 50);
  //image(boneImg, 83, 337, 40, 40);
  // image(heartImg, 73, 435, 40, 40);
  // image(lungsImg, 497, 306, 50, 50);
  // image(throatImg, 560, 448, 40, 40);
  
  belly.update(); //class methods
  belly.display();
  
   bone.update(); //class methods
  bone.display();
  
   heart.update(); //class methods
  heart.display();
  
   lungs.update(); //class methods
  lungs.display();
  
  throat.update(); //class methods
  throat.display();
  
  
  
  //BELLY
  if (belly.x == 382 && belly.y == 591 && belly.clicked){
    belly.placed = true;
    console.log("exactly placed");
  }
  
  if (belly.placed && !belly.clicked){
    console.log("belly victory");
    msg[0] = "1";
  }
  //BONE
  if (bone.x == 168 && bone.y == 523 && bone.clicked){
    bone.placed = true;
    console.log("exactly placed");
  }
  
  if (bone.placed && !bone.clicked){
    console.log("bone victory");
    msg[1] = "1";
  
  }
  //HEART
  if (heart.x == 384 && heart.y == 435 && heart.clicked){
    heart.placed = true;
    console.log("exactly placed");
  }
  
  if (heart.placed && !heart.clicked){
    console.log("heart victory");
    msg[2] = "1";
  }
  //LUNGS
   if (lungs.x == 297 && lungs.y == 463 && lungs.clicked){
    lungs.placed = true;
    console.log("exactly placed");
  }
  
  if (lungs.placed && !lungs.clicked){
    console.log("lungs victory");
    msg[3] = "1";
  }
  //THROAT
     if (throat.x == 328 && throat.y == 373 && throat.clicked){
    throat.placed = true;
    console.log("exactly placed");
  }
  
  if (throat.placed && !throat.clicked){
    console.log("throat victory");
    msg[4] = "1";
  }
  
   //console.log(throat.x + "," + throat.y);
  // console.log (mouseX + ", " + mouseY);
   lookAmtx= map(mouseX, 0, width,-7,7,1);
   lookAmty= map(mouseY, 0, height,-3.5,6.3,1);
   //left eye
   fill (255);
   ellipse(280, 170, 36, 28);
  push();
  translate(lookAmtx,lookAmty);
  //eye color
  fill(171, 98, 2);
  ellipse (280, 168, 15, 15);
  // pupil
  fill (0, 0, 0);
  ellipse (280, 168, 7, 7);
  //reflection
   fill (255);
  ellipse (280, 166, 5, 5);
  pop();
  
  fill(255, 187, 168);
    //eyelid
  arc(280, 170, 36, 28, 3*PI/2 - 1, 3*PI/2 + 1, CHORD);
  
     //right eye
   fill (255);
   ellipse(370, 170, 36, 28);
  push();
  translate(lookAmtx,lookAmty);
  //eye color
  fill(171, 98, 2);
  ellipse (370, 168, 15, 15);
  // pupil
  fill (0, 0, 0);
  ellipse (370, 168, 7, 7);
  //reflection
   fill (255);
  ellipse (370, 166, 5, 5);
  pop();
  
  fill(255, 187, 168);
    //eyelid
  arc(370, 170, 36, 28, 3*PI/2 - 1, 3*PI/2 + 1, CHORD);
  
  serial.write(join(msg,""));
}



class draggable{
  constructor(x,y,w,h,mode, asset){ //attributes passed in when making instance
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.mode = mode; //can be "rect" or "circle"
    this.clicked = false;
    this.asset = asset;
    this.placed = false;
  }
  update(){
    if (this.mode == "circle" && mouseIsPressed && dist(mouseX, mouseY, this.x, this.y) < this.w/2){ //if mouse is in circle area and mouse is pressed
      this.clicked = true;
      
    }
    else if (this.mode == "rect" && mouseIsPressed && mouseX > this.x-this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2){ //if mouse is in rect area and mouse is pressed
      this.clicked = true;
    }
    if (this.clicked){ //if object is clicked, update x & y based on mouse movement
      this.x += mouseX - pmouseX;
      this.y += mouseY - pmouseY;
    }
    if (!mouseIsPressed){ //when mouse is released, set clicked attribute to false
      this.clicked = false;
    }
  }
  display(){
    image(this.asset, this.x, this.y, this.w, this.h);
  //   image(boneImg, 83, 337, 40, 40);
  //   image(heartImg, 73, 435, 40, 40);
  // image(lungsImg, 497, 306, 50, 50);
  // image(throatImg, 560, 448, 40, 40);
  }
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    // console.log(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
}