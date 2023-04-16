var skQuadDemo = document.getElementById("sk-quadrants-demo");

var saffron = new Image();
saffron.src = 'https://onestepfromeden.gamepedia.com/Special:FilePath/'+'Hero_Saffron.png';

var c = document.createElement("CANVAS");
c.setAttribute("id","playfield");
c.setAttribute("width","338");
c.setAttribute("height","168");
var ctx = c.getContext("2d");
skQuadDemo.appendChild(c);
var patternDuration= 125;
var patternTime    = 0;
var colorA  = "#FF0000";
var colorAA = "#FFAAAA";
var colorB  = "#00FF00";
var colorBB = "#AAFFAA";
var colorC  = "#0000FF";
var colorCC = "#AAAAFF";
var colorD  = "#FFFF00";
var colorDD = "#FFFFAA";
var timerInterval= 100;
var timerOn=true;
createTimer();

$("#startButton").click(function(){setTimer(0)});
$("#prevButton").click(function()    {previousFrame()});
$("#playButton").click(function()  {toggleTimer()});
$("#nextButton").click(function() {nextFrame()});

var timer = setInterval(draw,timerInterval);

function createTimer()
{
  var timerBox = document.getElementById("sk-timer-buttons");
  
  var buttonDiv = document.createElement("DIV");
      buttonDiv.setAttribute("style","text-align:center;");
      
  var startButton = document.createElement("BUTTON");
      startButton.setAttribute("type","button");
      //startButton.setAttribute("onclick","setTimer(0)");
      startButton.setAttribute("id","startButton");
      startButton.innerHTML = "|<";
      
  var prevButton = document.createElement("BUTTON");
      prevButton.setAttribute("type","button");
      //prevButton.setAttribute("onclick","previousFrame()");
      prevButton.setAttribute("id","prevButton");
      prevButton.innerHTML = "<";
      
  var playButton = document.createElement("BUTTON");
      playButton.setAttribute("type","button");
      //playButton.setAttribute("onclick","toggleTimer()");
      playButton.setAttribute("id","playButton");
      playButton.innerHTML = "Stop";
      
  var nextButton = document.createElement("BUTTON");
      nextButton.setAttribute("type","button");
      //nextButton.setAttribute("onclick","nextFrame()");
      nextButton.setAttribute("id","nextButton");
      nextButton.innerHTML = ">";
      
      buttonDiv.appendChild(startButton);
      buttonDiv.appendChild(prevButton);
      buttonDiv.appendChild(playButton);
      buttonDiv.appendChild(nextButton);
      
      timerBox.appendChild(buttonDiv);
}

function setTimer(time)
{
  patternTime=time;
  draw();
}

function previousFrame()
{
  if(!timerOn && patternTime > 0)
  {
    patternTime-=2;
    draw();
  }
}

function nextFrame()
{
  if(!timerOn && patternTime < patternDuration)
  {
    draw();
  }
}

function toggleTimer()
{
  timerOn=!timerOn;
  if(timerOn)
  {
    timer = setInterval(draw,timerInterval);
  }
  else
  {
    clearInterval(timer);
  }
}

function draw()
{
  ctx.clearRect(0,0,338,168);
  document.getElementById("current-time").innerHTML = patternTime;
  drawPattern();
  ctx.restore();
}

function drawPattern()
{
  var patternNumber = patternTime;
  var repeat=true;
  if(patternTime>42)
  {
    if(patternTime>(42+37))
    {
      repeat=false;
      patternNumber-=(37*2);
    }
    else
    {
      patternNumber-=37;
    }
  }
  else
  {
    patternNumber=patternTime;
  }
  
  switch(patternNumber)
  {
    case 0:
      highlight(2,4,colorA);
      entity(3,3,saffron);
      break;
    case 1:
      highlight(2,4,colorA);
      highlight(1,4,colorA);
      entity(3,3,saffron);
      break;
    case 2:
      highlight(1,4,colorA);
      entity(3,3,saffron);
      break;
    case 3:
      highlight(1,4,colorA);
      highlight(2,3,colorA);
      entity(3,3,saffron);
      break;
    case 4:
      highlight(2,3,colorA);
      entity(3,3,saffron);
      break;
    case 5:
      highlight(2,3,colorA);
      highlight(1,3,colorA);
      entity(3,3,saffron);
      break;
    case 6:
      highlight(1,3,colorA);
      entity(3,3,saffron);
      break;
    case 7:
      highlight(1,3,colorA);
      highlight(2,2,colorB);
      entity(3,3,saffron);
      break;
    case 8:
      highlight(1,3,colorAA);
      highlight(2,2,colorB);
      highlight(1,2,colorB);
      entity(3,2,saffron);
      break;
    case 9:
      highlight(1,3,colorAA);
      highlight(1,4,colorAA);
      highlight(1,2,colorB);
      entity(3,2,saffron);
      break;
    case 10:
      highlight(1,3,colorAA);
      highlight(1,4,colorAA);
      highlight(1,2,colorB);
      highlight(2,1,colorB);
      entity(3,2,saffron);
      break;
    case 11:
      highlight(1,4,colorAA);
      highlight(1,2,colorB);
      highlight(2,1,colorB);
      entity(3,2,saffron);
      break;
    case 12:
      highlight(1,4,colorAA);
      highlight(2,3,colorAA);
      highlight(2,1,colorB);
      entity(3,2,saffron);
      break;
    case 13:
      highlight(1,4,colorAA);
      highlight(2,3,colorAA);
      highlight(2,1,colorB);
      highlight(1,1,colorB);
      entity(3,2,saffron);
      break;
    case 14:
      highlight(2,3,colorAA);
      highlight(2,1,colorB);
      highlight(1,1,colorB);
      entity(3,2,saffron);
      break;
    case 15:
      highlight(2,3,colorAA);
      highlight(2,4,colorAA);
      highlight(1,1,colorB);
      entity(3,2,saffron);
      break;
    case 16:
      highlight(2,4,colorAA);
      highlight(1,1,colorB);
      entity(3,2,saffron);
      break;
    case 17:
      highlight(2,4,colorAA);
      highlight(3,3,colorC);
      entity(3,2,saffron);
      break;
    case 18:
      highlight(4,4,colorC);
      highlight(3,3,colorC);
      entity(2,2,saffron);
      break;
    case 19:
      highlight(4,4,colorC);
      highlight(3,3,colorC);
      highlight(3,4,colorC);
      entity(2,2,saffron);
      break;
    case 20:
      highlight(4,4,colorC);
      highlight(3,4,colorC);
      entity(2,2,saffron);
      break;
    case 21:
      highlight(4,4,colorC);
      highlight(3,4,colorCC);
      highlight(4,3,colorC);
      entity(2,2,saffron);
      break;
    case 22:
      highlight(3,4,colorCC);
      highlight(4,3,colorCC);
      entity(2,2,saffron);
      break;
    case 23:
      highlight(4,4,colorCC);
      highlight(3,4,colorCC);
      highlight(4,3,colorCC);
      entity(2,2,saffron);
      break;
    case 24:
      highlight(4,4,colorCC);
      highlight(3,3,colorCC);
      highlight(4,3,colorCC);
      entity(2,2,saffron);
      break;
    case 25:
      highlight(4,4,colorCC);
      highlight(3,3,colorCC);
      highlight(4,2,colorD);
      entity(2,3,saffron);
      break;
    case 26:
      highlight(3,3,colorCC);
      highlight(4,2,colorD);
      entity(2,3,saffron);
      break;
    case 27:
      highlight(4,2,colorD);
      entity(2,3,saffron);
      break;
    case 28:
      highlight(4,2,colorD);
      highlight(3,2,colorD);
      highlight(1,1,colorBB);
      entity(2,3,saffron);
      break;
    case 29:
      highlight(3,2,colorD);
      highlight(1,1,colorBB);
      entity(2,3,saffron);
      break;
    case 30:
      highlight(3,2,colorD);
      highlight(4,1,colorD);
      highlight(1,1,colorBB);
      highlight(1,2,colorBB);
      entity(2,3,saffron);
      break;
    case 31:
      highlight(4,1,colorD);
      highlight(1,2,colorBB);
      entity(2,3,saffron);
      break;
    case 32:
      highlight(4,1,colorD);
      highlight(3,1,colorD);
      highlight(2,1,colorBB);
      highlight(1,2,colorBB);
      entity(2,3,saffron);
      break;
    case 33:
      highlight(3,1,colorD);
      highlight(2,1,colorBB);
      entity(2,3,saffron);
      break;
    case 34:
      highlight(3,1,colorD);
      highlight(2,1,colorBB);
      highlight(2,2,colorBB);
      entity(2,3,saffron);
      break;
    case 35:
      highlight(3,1,colorDD);
      highlight(2,2,colorBB);
      entity(3,3,saffron);
      break;
    case 36:
      highlight(3,1,colorDD);
      highlight(3,2,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(2,4,colorA);
      }
      break;
    case 37:
      highlight(3,2,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(2,4,colorA);
      }
      break;
    case 38:
      highlight(3,2,colorDD);
      highlight(4,1,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(2,4,colorA);
        highlight(1,4,colorA);
      }
      break;
    case 39:
      highlight(4,1,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(1,4,colorA);
      }
      break;
    case 40:
      highlight(4,1,colorDD);
      highlight(4,2,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(1,4,colorA);
        highlight(2,3,colorA);
      }
      break;
    case 41:
      highlight(4,2,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(2,3,colorA);
      }
      break;
    case 42:
      highlight(4,2,colorDD);
      entity(3,3,saffron);
      if(repeat)
      {
        highlight(2,3,colorA);
        highlight(1,3,colorA);
      }
      break;
    case 42:
      highlight(1,3,colorA);
      // Go back to 6
      break;
    default:
      entity(3,3,saffron);
  }
  
  patternTime+=1;
  if(patternTime>patternDuration)
  {
    patternTime=0;
  }
}

function entity(tileX,tileY,img)
{
  img.onload = function (e)
  {
    ctx.drawImage(img, offsetX(tileX)-(img.width/6), offsetY(tileY)-(img.height/3)+7,img.width/3,img.height/3);
  }
  ctx.drawImage(img, offsetX(tileX)-(img.width/6), offsetY(tileY)-(img.height/3)+7,img.width/3,img.height/3);
}

function highlight(tileX,tileY,color)
{
  ctx.fillStyle = color;
  ctx.fillRect(offsetX(tileX)-17, offsetY(tileY)-10, 34, 19);
}

function offsetX(x)
{
  return 29 + ((x-1)*40);
}

function offsetY(y)
{
  return 146 + ((y-1)*-25);
}