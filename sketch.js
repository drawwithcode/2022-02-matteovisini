var mySong;
var myImage;
var myImage2;
var textValue =255;
var stars = [];
var speed;
var swing;
var y=100;
var ShipSpeed = 1;

function preload() {
  myImage = loadImage("./assets/Prova.png");
  myImage2 = loadImage("./assets/Prova2.png");
  Suisse = loadFont('./assets/SuisseIntl-Regular.otf');
  mySong = loadSound ('./assets/Cantina_band.mp3');
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);

  //set the number of the stars
 for (var i = 0; i < 1200; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background('black');

  //text settings
  push()
  fill(textValue);
  noStroke();
  textAlign(CENTER);
  textSize(20);
  textFont(Suisse);
  text('Move your mouse to jump to Lightspeed', windowWidth/2, 250);
  translate (0,25);
  textSize(12);
  text('...also press any key to play some travel music :)', windowWidth/2, 250);
  pop()

  //set the velocity of the stars
  speed = map(mouseY+1, 0, height, 0, 150);
   translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  } 
  //put the falcon in the canvas and set the swing
  swing = (width /2 - mouseX)/65;
    rotate (swing);
    FalconDown();
    push()
    drawingContext.filter= 'blur(8px)';
   fill (184, 254, 255);
    translate(0,90);
    if (mouseY>= height-250){
      scale(mouseY/90);
    }
    beginShape();
    vertex(-5,0);
    vertex(5,0);
    vertex(35,60 );
    vertex(-35,60 );
    endShape(CLOSE);
  pop()
  FalconUp();
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    //stars in perspective
    this.update = function () {
      this.z = this.z - speed;
      if (this.z < 1) {
        this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.pz = this.z;
      }
    }
    //stars in current position
    this.show = function () {
      fill(230, 254, 255);
      noStroke();
      var sx = map(this.x / this.z, 0, 1, 0, width);
      var sy = map(this.y / this.z, 0, 1, 0, height);
      var r = map(this.z, 0, width, 5, 0);
      ellipse(sx, sy, r, r);

      var px = map(this.x / this.pz, 0, 1, 0, width);
      var py = map(this.y / this.pz, 0, 1, 0, height);
      this.pz = this.z;

      stroke(230, 254, 255);
      strokeWeight(2)
      line(px, py, sx, sy);
    };
  }
}
//images and movement of the Falcon
function FalconUp (){
  image(myImage2, 0, 0+y, 200,190);
  if (y>=110){
    ShipSpeed=-mouseY/500
  }
  if (y<=100){
    ShipSpeed=mouseY/500
  }
 y=y+ShipSpeed;
}
function FalconDown (){
   image(myImage, 0, 0+y, 200,190);
  }
//make the text disappear with the Mouse
  function mouseMoved() {
    textValue = textValue - 150;
  }
//play and stop Music with any key
  function keyPressed() {
    if (mySong.isPlaying()) {
      mySong.stop();
      background(255, 0, 0);
    } else {
      mySong.play();
      background(0, 255, 0);
    }}

//resize page
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
  wi = windowWidth / 2;
  he = windowHeight / 2;
}

