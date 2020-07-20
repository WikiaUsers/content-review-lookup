/* Any JavaScript here will be loaded for all users on every page load. */
var mainMenu = true; 
var start = false; 
var gameStarted = false; 
var scoreButton = false; 
var pauseGame = false; 
var gameOver = false;

var grassX = 0;
var textY = 100; 
var speed = 2;
var dudeX = 0;
var dudeY = 0;
var dudeSize = 2.5;
var translateX = 75;
var translateY = 150;
var pipeX = [500,750];
var pipeY = 0;
var pipeHeight = [random(50,165),random(50,165)];
var score = 0; 
var fallingAngle = -25;
var flyingAngle = 90;
var fly = false;
var fall = true;
var dudeYSpeed = 0;
var dudeXSpeed = 0;
var dudeJumping = false;
var jumpSpeed = -8;
var gravity = 1;
var mouseDown = 0; 

//Bird Array
var flappydude = [

    [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],

    [0,0,0,0,1,1,5,5,5,1,2,2,1,0,0,0,0],

    [0,0,0,1,5,5,4,4,1,3,2,2,2,1,0,0,0],

    [0,1,1,1,1,4,4,4,1,3,2,2,1,2,1,0,0],

    [1,3,3,3,3,1,4,4,1,3,2,2,1,2,1,0,0],

    [1,3,3,3,3,3,1,4,4,1,3,2,2,2,1,0,0],

    [1,5,3,3,3,5,1,4,4,4,1,1,1,1,1,1,0],

    [0,1,5,5,5,1,4,4,4,1,7,7,7,7,7,7,1],

    [0,0,1,1,1,6,6,6,1,7,1,1,1,1,1,1,0],

    [0,0,1,6,6,6,6,6,6,1,7,7,7,7,7,1,0],

    [0,0,0,1,1,6,6,6,6,6,1,1,1,1,1,0,0],

    [0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

];

//Buttons 
var button = function(x,y,width,height) {

strokeWeight(3);

//Buttons
noStroke();
//Outer Black Button
fill(0, 0, 0);
rect(x,y,width,height);
//Inner Red Button with white Stroke 
fill(255, 0, 0);
stroke(255, 255, 255);
rect(x+5,y+5,width-10,height-10);
};

//Pipe 1
var pipe1 = function(xPos,height) {

fill(0, 125, 0);
stroke(0, 0, 0);
strokeWeight(2);

//Top Pipe 
rectMode(CORNER);
rect(xPos+pipeX[0],pipeY,50,height);
rect(xPos+pipeX[0]-2,pipeY+height,54,20);

//Bottome Pipe
rectMode(CORNERS);
rect(xPos+pipeX[0],pipeY+350,xPos+pipeX[0]+50, height+150);
rect(xPos+pipeX[0]-2,height+150,xPos+pipeX[0]+54,height+170);
};

//Pipe 2
var pipe2 = function(xPos,height) {

fill(0, 125, 0);//Green
stroke(0, 0, 0);//Black
strokeWeight(2);

//Top Pipe 
rectMode(CORNER);
rect(xPos+pipeX[1],pipeY,50,height);
rect(xPos+pipeX[1]-2,pipeY+height,54,20);

//Bottome Pipe
rectMode(CORNERS);
rect(xPos+pipeX[1],pipeY+350,xPos+pipeX[1]+50, height+150);
rect(xPos+pipeX[1]-2,height+150,xPos+pipeX[1]+54,height+170);
};

//Bird
var bird = function(){
    
rectMode(CORNER);

for(var dudeHeight = 0; dudeHeight<flappydude.length; dudeHeight++){
for(var dudeWidth = 0; dudeWidth<flappydude.length; dudeWidth++){

if(flappydude[dudeWidth][dudeHeight] === 0){

noStroke();
fill(255, 255, 255, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 1){

noStroke();
fill(0, 0, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 2){

noStroke();
fill(255, 255, 255);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 3){

noStroke();
fill(242, 239, 239);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 4){

noStroke();
fill(255, 242, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize,dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 5){

noStroke();
fill(255, 255, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 6){

noStroke();
fill(237, 148, 23);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 7){

noStroke();
fill(255, 68, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}
}
}
};

//Black and White Bird
var blackandwhitebird = function(){
    
rectMode(CORNER);

for(var dudeHeight = 0; dudeHeight<flappydude.length; dudeHeight++){
for(var dudeWidth = 0; dudeWidth<flappydude.length; dudeWidth++){

if(flappydude[dudeWidth][dudeHeight] === 0){

noStroke();
fill(255, 255, 255, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 1){

noStroke();
fill(0, 0, 0);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 2){

noStroke();
fill(255, 255, 255);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 3){

noStroke();
fill(242, 239, 239);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 4){

noStroke();
fill(175, 175, 175);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize,dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 5){

noStroke();
fill(125, 125, 125);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 6){

noStroke();
fill(175, 175, 175);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}

if(flappydude[dudeWidth][dudeHeight] === 7){

noStroke();
fill(150, 150, 150);
rect(dudeHeight*dudeSize+dudeX, dudeWidth*dudeSize+dudeY, dudeSize, dudeSize);
}
}
}
};

var mousePressed = function(){
    
mouseDown = true;
fly = true;  
fall = false; 
flyingAngle = fallingAngle;
};

var mouseReleased = function(){
    
mouseDown = false;
fly = false;  
fall = true; 
fallingAngle = -45;
translateX = 75;
};

var mouseEvents = function(){

if(mouseDown && dudeJumping === false){
dudeJumping = true;
dudeYSpeed = jumpSpeed;
} 

else{
translateY += dudeYSpeed;
dudeYSpeed += gravity;
dudeJumping = false;
} 

translateX+=dudeXSpeed;
};

var draw = function() {
    
//Universal Formating
textAlign(CENTER,CENTER);
textFont(createFont("fantasy"));
strokeWeight(3);
rectMode(CORNER);
    
/**Main Menu**/    
if(mainMenu ===true){
    
//Background
background(85, 160, 200);

//Clouds
noStroke();
fill(255, 255, 255);
rect(0,255,400,75);

for(var i = 25; i<475; i+=125){
    arc(i, 255, 75, 50, 180, 360);
    arc(i+65, 265, 75, 50, 180, 360);
}

//Buildings
stroke(75, 130, 180);
fill(175, 190, 225);

for(var i = 0; i<475; i+=150){
    rect(i,262,25,50);
    rect(i-10,277,25,55);
    rect(i+85,268,30,55);
    rect(i+95,288,30,55);
    rect(i+20,292,50,25);
    beginShape();
    vertex(i+225-175, 210+50);
    vertex(i+240-175, 210+50);
    vertex(i+240-175, 200+52);
    vertex(i+255-175, 200+52);
    vertex(i+255-175, 270+50);
    vertex(i+225-175, 260+50);
    endShape(CLOSE);
}

//Bushes
stroke(45, 125, 45);
fill(80, 175, 80);
rect(-5,310,410,50);

for(var i = 50; i<475; i+=100){
    fill(80, 175, 80);
    arc(i, 350-35, 65, 25, 180, 360);
    arc(i-40, 355-35, 65, 25, 180, 360);
    arc(i, 365-35, 65, 25, 180, 360);
}

//Background
noStroke();
fill(175, 165, 85);
rect(0,365,400,35);
fill(90, 155, 50);
rect(0,350,400,12);
fill(145, 135, 50);
rect(0,362,400,4);

//Text 
fill(140, 103, 0);
textFont(createFont("sans-serif"));
textSize(20.25);
text("Created By: Matthew Simon",201,383);
textSize(20);
fill(255, 255, 255);
text("Created By: Matthew Simon",200,380);
textFont(createFont("fantasy"));

//Grass
fill(65, 135, 35);

for (var x = 10; x < 800; x += 25){
    rect(grassX+x,350,12,4);
    rect(grassX+x-5,354,12,4);
    rect(grassX+x-10,358,12,4);
}

grassX-=5;

if(grassX<-400){
    grassX = 0;    
}

stroke(0, 0, 0);
line(0,349,400,349);

//Flappy Bird Title 
fill(0, 0, 0);
textSize(36);
text("Flappy ",122,textY+3);
text("Bird",202,textY+3);
textSize(35);
fill(65, 135, 35);
text("Flappy Bird",150,textY);
pushMatrix();
translate(250,textY-15);
bird();
popMatrix();

textY+=speed;
    
if(textY>105){
    speed=-1;   
}

if(textY<100){
    speed=1;      
}

//Buttons
noStroke();
fill(0, 0, 0);
button(55,270,110,40);
button(230,270,110,40);
fill(255, 255, 255);
textSize(22);
text("Start",110,290);
text("Score",285,290);

//If start is pressed 
if(mouseIsPressed&&mouseX>55&&mouseX<165&&mouseY>270&&mouseY<310){
    start = true;    
    mainMenu = false; 
    pipeX = [500,750];
    pipeHeight = [random(50,165),random(50,165)];
    score = 0;
}

//If score is pressed 
if(mouseIsPressed&&mouseX>230&&mouseX<340&&mouseY>270&&mouseY<310){
    scoreButton = true;    
    mainMenu = false;   
}
}

/**Score Button is Pressed**/   
if(scoreButton === true){
    
background(85, 160, 200);
fill(255, 255, 255);
textSize(50);
text("Top Scores",200,40);
fill(215, 130, 20);
textSize(49);
text("Top Scores",201.5,43);
textSize(25);
fill(65, 135, 35);

text("1. Name:                                 0",200.5,100+25);
text("2. Name:                                 0",200.5,130+25);
text("3. Name:                                 0",200.5,160+25);
text("4. Name:                                 0",200.5,190+25);
text("5. Name:                                 0",200.5,220+25);

button(145,345,110,40);
textSize(22);
fill(255, 255, 255);
text("Menu",200,365);

if(mouseIsPressed&&mouseX>145&&mouseX<255&&mouseY>345&&mouseY<385){
    scoreButton = false;    
    mainMenu = true;   
}
}

/**Start is Pressed**/   
if(start === true){
    
//Background
background(85, 160, 200);

//Clouds
noStroke();
fill(255, 255, 255);
rect(0,255,400,75);

for(var i = 25; i<475; i+=125){
    arc(i, 255, 75, 50, 180, 360);
    arc(i+65, 265, 75, 50, 180, 360);
}

//Buildings
stroke(75, 130, 180);
fill(175, 190, 225);

for(var i = 0; i<475; i+=150){
    rect(i,262,25,50);
    rect(i-10,277,25,55);
    rect(i+85,268,30,55);
    rect(i+95,288,30,55);
    rect(i+20,292,50,25);
    beginShape();
    vertex(i+225-175, 210+50);
    vertex(i+240-175, 210+50);
    vertex(i+240-175, 200+52);
    vertex(i+255-175, 200+52);
    vertex(i+255-175, 270+50);
    vertex(i+225-175, 260+50);
    endShape(CLOSE);
}

//Bushes
stroke(45, 125, 45);
fill(80, 175, 80);
rect(-5,310,410,50);

for(var i = 50; i<475; i+=100){
    fill(80, 175, 80);
    arc(i, 350-35, 65, 25, 180, 360);
    arc(i-40, 355-35, 65, 25, 180, 360);
    arc(i, 365-35, 65, 25, 180, 360);
}

//Background
noStroke();
fill(175, 165, 85);
rect(0,365,400,35);
fill(90, 155, 50);
rect(0,350,400,12);
fill(145, 135, 50);
rect(0,362,400,4);
fill(65, 135, 35);

for (var x = 10; x < 800; x += 25){
rect(grassX+x,350,12,4);
rect(grassX+x-5,354,12,4);
rect(grassX+x-10,358,12,4);
}

grassX-=5;

if(grassX<-400){
grassX = 0;    
}

stroke(0, 0, 0);
line(0,349,400,349); 

if(gameOver===false){
textSize(37);
fill(0, 0, 0);
text(score,198,33);
textSize(35);
fill(255, 255, 255);
text(score,200,35);
}

/**Pre-Game Screen**/  
if(gameStarted === false){

fill(255, 255, 255);
textSize(40);
text("Get Ready",200,75);
fill(215, 130, 20);
textSize(39);
text("Get Ready",200.5,78);
fill(255, 0, 0);
stroke(255, 255, 255);
beginShape();
vertex(225,200);
vertex(275,200);
vertex(275,225);
vertex(225,225);
vertex(210,212.5);
endShape(CLOSE);
textSize(20);
fill(255, 255, 255);
text("CLICK",248,212);

pushMatrix();
translate(75,textY+50);
bird();
popMatrix();

textY+=speed;
    
if(textY>105){
speed=-1;   
}

if(textY<100){
speed=1;      
}

pushMatrix();
translate(175,115);
blackandwhitebird();
popMatrix();

if(mouseIsPressed&&mouseX>20&&mouseX<55&&mouseY>20&&mouseY<55){
    pauseGame = true;     
}

button(20,20,35,35);
noStroke();
fill(255, 255, 255);
rect(30,30,5,15);
rect(40,30,5,15);


if(pauseGame===true){
    
    fill(0, 0, 0, 200);    
    rect(0,0,width,height);
    button(345,20,35,35);
    noStroke();
    fill(255, 255, 255);
    triangle(32+325,30,32+325,45,45+325,37.5);
    button(145,100,110,40);
    fill(255, 255, 255);
    textSize(22);
    text("Menu",200,120);
    grassX+=5;
    
if(mouseIsPressed&&mouseX>345&&mouseX<380&&mouseY>20&&mouseY<55){
    pauseGame = false;     
}
        
if(mouseIsPressed&&mouseX>145&&mouseX<255&&mouseY>100&&mouseY<140){
    start = false;
    gameStarted = false;
    mainMenu = true; 
    pauseGame = false;
}
}

if(mouseIsPressed&&mouseY>140&&mouseY<270){
    gameStarted = true;
    translateX = 75;
    translateY = 150;
}
}

/**Actual Game**/   
if(gameStarted === true){
    
//var distance = dist(pipeX[0], 200, pipeX[1], 200);

//Pipe 1 
pipe1(0,pipeHeight[0]);

//Pipe 2
pipe2(0,pipeHeight[1]); 

//Return the Pipe onto the Screen with a Different Height
if(pipeX[0]<=-50){

    pipeX[0] = 450;
    pipeHeight[0] = random(50,165);
    score++;
}

//Return the Pipe onto the Screen with a Different Height
if(pipeX[1]<=-50){

    pipeX[1] = 450;
    pipeHeight[1] = random(50,165);
    score++;
}

pipeX[0]-=5;
pipeX[1]-=5;

if(pauseGame===false&&gameOver===false){
mouseEvents();
}

if(fall===true){
    
pushMatrix();
pushStyle();
rectMode(CENTER);
translate(translateX,translateY);
rotate(fallingAngle);
bird();
popStyle();
popMatrix(); 

fallingAngle+=3.5;

if(fallingAngle>90){
    
    fallingAngle-=3.5;  
}

if(fallingAngle<85){
    
    translateX+=1.15;}
}


if(fly===true){

pushMatrix();
pushStyle();
rectMode(CENTER);
translate(translateX,translateY);
rotate(flyingAngle);
bird();
popStyle();
popMatrix(); 

flyingAngle-=5;

if(flyingAngle<-25){
    
    flyingAngle+=5;  
}

if(flyingAngle>-20){
    
    translateX-=1.5;
}
}

fill(255, 0, 0);
textSize(12);

//First Top Pipe 
if(translateX+dudeSize*16.5>pipeX[0]&&translateX<pipeX[0]+50&&translateY<pipeHeight[0]+20){
    
    gameOver = true;
}

//First Bottom Pipe 
if(translateX+dudeSize*16.5>pipeX[0]&&translateX<pipeX[0]+50&&translateY+dudeSize*12>pipeHeight[0]+150){
    
    gameOver = true;
}

//Second Top Pipe 
if(translateX+dudeSize*16.5>pipeX[1]&&translateX<pipeX[1]+50&&translateY<pipeHeight[1]+20){
    
    gameOver = true;
}

//Second Bottom Pipe 
if(translateX+dudeSize*16.5>pipeX[1]&&translateX<pipeX[1]+50&&translateY+dudeSize*12>pipeHeight[1]+150){
    
    gameOver = true;
}

//Ground 
if(translateY>300){
    
    gameOver = true;
}

rectMode(CORNER);

if(gameOver === true){

pushMatrix();
translate(0,-50);
noStroke();
textSize(50);
fill(0, 0, 0);
text("Game Over", 200,85);
textSize(48.5);
fill(255, 120, 0);
text("Game Over", 200.5,87);
strokeWeight(3);
stroke(0, 0, 0);
fill(175, 165, 85);//Tan
rect(50,125,300,150);
strokeWeight(3);
stroke(175, 125, 25);//Tan
rect(60,135,280,130);
fill(175, 125, 25);//Tan
textSize(25);
text("Score", 265,165);
text("Medal", 135,165);
textSize(37);
fill(0, 0, 0);
text(score,263,213);
textSize(35);
fill(255, 255, 255);
text(score,265,215);
noStroke();

if(score<10){
fill(150, 145, 75);//No coin 
ellipse(135,225,50,50);
}
if(score>=10&&score<20){
fill(135, 75, 35);//Bronze 
ellipse(135,225,50,50);
pushMatrix();
translate(112,210);
blackandwhitebird();
popMatrix();
}
if(score>=20&&score<50){
fill(135, 135, 125);//Silver 
ellipse(135,225,50,50);
pushMatrix();
translate(112,210);
blackandwhitebird();
popMatrix();
}
if(score>=50){
fill(200, 200, 35);//Gold
ellipse(135,225,50,50);
pushMatrix();
translate(112,210);
blackandwhitebird();
popMatrix();
}
popMatrix();

button(145,270,110,40);
fill(255, 255, 255);
textSize(22);
text("Menu",200,290);
pipeX[0]+=5;
pipeX[1]+=5;
grassX+=5;

if(translateY<300){
translateY+=15;    
}


if(mouseIsPressed&&mouseX>165&&mouseX<230&&mouseY>270&&mouseY<310){
    start = false;
    gameStarted = false;
    mainMenu = true; 
    pauseGame = false;
    gameOver = false; 
}
}
   
if(mouseIsPressed&&mouseX>20&&mouseX<55&&mouseY>20&&mouseY<55){
    pauseGame = true;     
}

button(20,20,35,35);
noStroke();
fill(255, 255, 255);
rect(30,30,5,15);
rect(40,30,5,15);


if(pauseGame===true){
    
    fill(0, 0, 0, 200);    
    rect(0,0,width,height);
    button(345,20,35,35);
    noStroke();
    fill(255, 255, 255);
    triangle(32+325,30,32+325,45,45+325,37.5);
    button(145,100,110,40);
    fill(255, 255, 255);
    textSize(22);
    text("Menu",200,120);
    pipeX[0]+=5;
    pipeX[1]+=5;
    grassX+=5;
    
if(mouseIsPressed&&mouseX>345&&mouseX<380&&mouseY>20&&mouseY<55){
    pauseGame = false;  
}
        
if(mouseIsPressed&&mouseX>145&&mouseX<255&&mouseY>100&&mouseY<140){
    start = false;
    gameStarted = false;
    mainMenu = true; 
    pauseGame = false;
}
}
}
}

//textSize(12);
//fill(0, 0, 0);
//text("scoreButton "+ scoreButton,200,150);
//text("pauseGame "+ pauseGame,200,50+125);
//text("mainMenu "+ mainMenu,200,50+150);
//text("start "+ start,200,50+175);
//text("gameStarted "+ gameStarted,200,150+100);
//text(pipeX[0],100,200);
//text(pipeX[1],300,200);
//text(pipeHeight[0],100,250);
//text(pipeHeight[1],300,250);
//text(distance,300,250);
};