// Get all playfields on page
var playfields = document.getElementsByClassName("infobox-playfield-js");
var imageCache = [];

// Process each playfield
for(i = 0; i < playfields.length; i++)
{
  // Set a variable for the current playfield
  var target = playfields[i];
  
  // Create a canvas
  var c = document.createElement("CANVAS");
  c.setAttribute("width","338");
  c.setAttribute("height","168");
  var ctx = c.getContext("2d");
  target.appendChild(c);
  
  // Iterate through and draw each entity in a playfield
  var childEntities = playfields[i].getElementsByClassName("playfield-entity");
  for(j = 0; j < childEntities.length; j++)
  {
    drawEntity(ctx, childEntities[j]);
  }
}

// Draw an element
function drawEntity(canvas, drawable)
{
  // Separate and store data in the entities innerHTML into an array
  var entityData = [];
  var entityString = drawable.innerHTML;
  var startIndex = 0;
  var endIndex = 0;
  var forcebreak = 5;
  var forcebreakindex = 0;
  while(startIndex < entityString.length)
  {
    // Find the semicolon so we can make a snippet
    endIndex = entityString.indexOf(";",startIndex);
    
    // Get the snippet 
    var stringSnip = entityString.substring(startIndex, endIndex);
    
    // Find the equal sign
    var equalIndex = stringSnip.indexOf("=");
    
    // Get the variable name and value
    var varName = stringSnip.substring(0,equalIndex);
    var varValue = stringSnip.substring(equalIndex+1);
    
    entityData[varName] = varValue;
    
    startIndex = endIndex+1;
  }
  
  // Grabs all applicable attributes from the element
  var x = entityData["x"];
  var y = entityData["y"];
  var xOffset = entityData["yOffset"];
  var yOffset = entityData["xOffset"];
  var filename = entityData["filename"];
  var image = new Image();
  image.onload = function()
  {
    canvas.drawImage(image, imageX, imageY, image.width, image.height);
  }
  
  image.src = 'https://onestepfromeden.gamepedia.com/Special:FilePath/'+ filename;
  var imageX, imageY, offsetX, offsetY, imageScaleX, imageScaleY;
  image.width = image.width/3;
  image.height = image.height/3;
  if(x) { imageX = tileToPixel("x", x); } else { imageX = tileToPixel("x", 2); }
  imageX -= image.width/2;
  if(y) { imageY = tileToPixel("y", y); } else { imageY = tileToPixel("y", 2); }
  imageY -= image.height;
}

function determineImage(filename)
{
  var candidate = new Image();
  candidate = imageCache[filename];
  if(!candidate)
  {
    candidate = new Image();
    candidate.src = 'https://onestepfromeden.gamepedia.com/Special:FilePath/'+ filename;
    imageCache[filename] = candidate;
  }
    debugprint(imageCache[filename].src);
  return candidate;
}

function tileToPixel(axis, tiles)
{
  tileToPixel(axis,tiles,"feet");
}

function tileToPixel(axis, tiles, align)
{
  var pixels;
  switch(axis)
  {
    case "x":
      pixels = 29 + ((tiles-1)*40);
      break;
    case "y":
      pixels = 146 + ((tiles-1)*-25);
      switch(align)
      {
        case "center":
          break;
        case "baseline":
          pixels += 9;
          break;
        default:
          pixels += 5;
      }
      break;
    default:
      pixels = 0;
  }
  return pixels;
}

  function debugprint(text)
  {
    //document.getElementById("debug").append(text.toString());
    document.getElementById("debug").innerHTML += text + "<br>";
  }