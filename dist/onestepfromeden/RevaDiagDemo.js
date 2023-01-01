/* Any JavaScript here will be loaded for all users on every page load.*/

  var target = document.getElementById("reva-diag-demo");
  if(target)
  {

    var myImg = new Image();
    myImg.src = 'https://gamepedia.cursecdn.com/onestepfromeden_gamepedia_en/6/64/Boss_Reva.png';
    
    var c = document.createElement("CANVAS");
    c.setAttribute("id","playfield");
    c.setAttribute("width","338");
    c.setAttribute("height","168");
    var ctx = c.getContext("2d");
    var xPos;
    var yPos;
    target.appendChild(c);
    
    var showHighlights=true;
    var showStraightHighlight=true;
    var showUpHighlight=true;
    var showDownHighlight=true;
    randomPosition();
    createButtons();
  }
  
  function draw()
  {
    ctx.clearRect(0,0,338,168);
    if(showHighlights)
      drawHighlights();
    drawReva();
  }
  
  function drawReva()
  {
    myImg.onload = function (e)
    {
      ctx.drawImage(myImg, offsetX(xPos)-(myImg.width/6), offsetY(yPos)-(myImg.height/3)+7,myImg.width/3,myImg.height/3);
    }
    ctx.drawImage(myImg, offsetX(xPos)-(myImg.width/6), offsetY(yPos)-(myImg.height/3)+7,myImg.width/3,myImg.height/3);
  }
  
  function randomPosition()
  {
    xPos = Math.floor(Math.random() * 4) + 5;
    yPos = Math.floor(Math.random() * 4) + 1;
    draw();
  }
  
  function toggleHighlights()
  {
    showHighlights = !showHighlights;
    draw();
  }
  
  function toggleStraightHighlight()
  {
    showStraightHighlight = !showStraightHighlight;
    draw();
  }
  
  function toggleUpHighlight()
  {
    showUpHighlight = !showUpHighlight;
    draw();
  }
  
  function toggleDownHighlight()
  {
    showDownHighlight = !showDownHighlight;
    draw();
  }
  
  function drawHighlights()
  {
    if(showStraightHighlight)
      drawHighlightLine(-1,0,8);
    if(showDownHighlight)
      drawHighlightLine(-1,-1,8);
    if(showUpHighlight)
      drawHighlightLine(-1,1,8);
  }
  
  function drawHighlightLine(deltaX, deltaY,iterations)
  {
    var tileX = xPos-1;
    var tileY = yPos;
    for(i=0; i<iterations; i++)
    {
      if(tileX <= 1)
      {
        tileX = 1;
        if(deltaX!=0)
          deltaX = 1;
      }
      else if(tileX >= 8)
      {
        tileX = 8;
        if(deltaX!=0)
          deltaX = -1;
      }
      if(tileY <= 1)
      {
        tileY = 1;
        if(deltaY!=0)
          deltaY = 1;
      }
      else if(tileY >= 4)
      {
        tileY = 4;
        if(deltaY!=0)
          deltaY = -1;
      }
      ctx.fillStyle = "#FFDD00";
      ctx.fillRect(offsetX(tileX)-17, offsetY(tileY)-10, 34, 19);
      //debugprint(tileX +" " + tileY +"\n");
      tileX = parseInt(tileX) + parseInt(deltaX);
      tileY = parseInt(tileY) + parseInt(deltaY);
    }
  }
  
  function createButtons()
  {
    var buttonBox = document.getElementById("reva-diag-demo-buttons");
    
    var randomButtonDiv = document.createElement("DIV");
    var randomButton = document.createElement("BUTTON");
        randomButtonDiv.setAttribute("style","text-align:center;");
        randomButton.setAttribute("id","randombutton");
        randomButton.setAttribute("type","button");
        randomButton.setAttribute("style","width:100px;");
        randomButton.innerHTML = "Random";
        randomButtonDiv.appendChild(randomButton);
    
    var upButtonDiv = document.createElement("DIV");
    var upButton = document.createElement("BUTTON");
        upButtonDiv.setAttribute("style","text-align:center;");
        upButton.setAttribute("id","upbutton");
        upButton.setAttribute("type","button");
        upButton.setAttribute("style","width:100px;");
        upButton.innerHTML = "Up";
        upButtonDiv.appendChild(upButton);

    var leftRightButtonDiv = document.createElement("DIV");
    var leftButton = document.createElement("BUTTON");
        leftRightButtonDiv.setAttribute("style","text-align:center;");
        leftButton.setAttribute("id","leftbutton");
        leftButton.setAttribute("type","button");
        leftButton.setAttribute("style","width:100px;");
        leftButton.innerHTML = "Left";
        leftRightButtonDiv.appendChild(leftButton);
        
    var rightButton = document.createElement("BUTTON");
        rightButton.setAttribute("id","rightbutton");
        rightButton.setAttribute("type","button");
        rightButton.setAttribute("style","width:100px;");
        rightButton.innerHTML = "Right";
       leftRightButtonDiv.appendChild(rightButton);

    var downButtonDiv = document.createElement("DIV");
    var downButton = document.createElement("BUTTON");
        downButtonDiv.setAttribute("style","text-align:center;");
        downButton.setAttribute("id","downbutton");
        downButton.setAttribute("type","button");
        downButton.setAttribute("style","width:100px;");
        downButton.innerHTML = "Down";
        downButtonDiv.appendChild(downButton);
        
    var highlightButtonsDiv = document.createElement("DIV");
        highlightButtonsDiv.setAttribute("style","float:left; width:200px;")
    var highlightsButtonDiv = document.createElement("DIV");
        highlightsButtonDiv.setAttribute("style","text-align:center; width:175px;");
    var highlightsButton = document.createElement("BUTTON");
        highlightsButton.setAttribute("id","highlightsbutton");
        highlightsButton.setAttribute("type","button");
        highlightsButton.setAttribute("style","width:175px;");
        highlightsButton.innerHTML = "Show Beams";
        highlightsButtonDiv.appendChild(highlightsButton);
    var upHighlightButtonDiv = document.createElement("DIV");
        upHighlightButtonDiv.setAttribute("style","text-align:center; width:175px;");
    var upHighlightButton = document.createElement("BUTTON");
        upHighlightButton.setAttribute("id","uphighlightbutton");
        upHighlightButton.setAttribute("type","button");
        upHighlightButton.setAttribute("style","width:175px;");
        upHighlightButton.innerHTML = "Up Beams";
        upHighlightButtonDiv.appendChild(upHighlightButton);
    var straightHighlightButtonDiv = document.createElement("DIV");
        straightHighlightButtonDiv.setAttribute("style","text-align:center; width:175px;");
    var straightHighlightButton = document.createElement("BUTTON");
        straightHighlightButton.setAttribute("id","straighthighlightbutton");
        straightHighlightButton.setAttribute("type","button");
        straightHighlightButton.setAttribute("style","width:175px;");
        straightHighlightButton.innerHTML = "Straight Beams";
        straightHighlightButtonDiv.appendChild(straightHighlightButton);
    var downHighlightButtonDiv = document.createElement("DIV");
        downHighlightButtonDiv.setAttribute("style","text-align:center; width:175px;");
    var downHighlightButton = document.createElement("BUTTON");
        downHighlightButton.setAttribute("id","downhighlightbutton");
        downHighlightButton.setAttribute("type","button");
        downHighlightButton.setAttribute("style","width:175px;");
        downHighlightButton.innerHTML = "Down Beams";
        downHighlightButtonDiv.appendChild(downHighlightButton);
        
        highlightButtonsDiv.appendChild(highlightsButtonDiv);
        highlightButtonsDiv.appendChild(upHighlightButtonDiv);
        highlightButtonsDiv.appendChild(straightHighlightButtonDiv);
        highlightButtonsDiv.appendChild(downHighlightButtonDiv);
        
        buttonBox.appendChild(highlightButtonsDiv);
        buttonBox.appendChild(randomButtonDiv);
        buttonBox.appendChild(upButtonDiv);
        buttonBox.appendChild(leftRightButtonDiv);
        buttonBox.appendChild(downButtonDiv);
  }
  
  $("#randombutton").click(function(){randomPosition()});
  $("#upbutton").click(function()    {changeValue( 0, 1)});
  $("#leftbutton").click(function()  {changeValue(-1, 0)});
  $("#rightbutton").click(function() {changeValue( 1, 0)});
  $("#downbutton").click(function()  {changeValue( 0,-1)});
  
  $("#highlightsbutton").click(function()        {toggleHighlights()});
  $("#uphighlightbutton").click(function()       {toggleUpHighlight()});
  $("#straighthighlightbutton").click(function() {toggleStraightHighlight()});
  $("#downhighlightbutton").click(function()     {toggleDownHighlight()});
  
  function changeValue(x,y)
  {
    var newX=parseInt(xPos)+parseInt(x);
    var newY=parseInt(yPos)+parseInt(y);
    if(newX >=5 && newX <=8)
      xPos = newX;
    if(newY >=1 && newY <=4)
      yPos = newY;
    draw();
  }
  
  function offsetX(x)
  {
    return 29 + ((x-1)*40);
  }
  
  function offsetY(y)
  {
    return 146 + ((y-1)*-25);
  }