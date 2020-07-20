/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){
  // Get and store the mouse position:
  var mouseX = mouseY = -100; 
  $("#c").mousemove(function(e) { mouseX = e.pageX; mouseY = e.pageY; });

  var elements = [];              // Array of elements.
  var MAX = 1000;                 // Max elements projected.

  var Element = function(x, y, width, height, rot, slide, fall){
    var xState = x;
    var yState = y;
    var rotation = rot;
    var rotationState = 0;
    
    this.draw = function(ctx){
      if(mouseX > xState-width  && mouseX < xState+width &&
         mouseY > yState-height && mouseY < yState+height ){
        xState = mouseX-(width/2);
        yState = mouseY-(height/2);
      }else{
        xState += slide;
        yState += fall;
      }
      rotationState += rotation;
      ctx.save();
      ctx.translate(xState+(width/2), yState+(height/2));
      ctx.rotate(rotationState * Math.PI / 180);
      ctx.strokeStyle = "#FFF";
      ctx.strokeRect(0-(width/2), 0-(height/2), width, height);
      ctx.restore();
    }

    this.checkIfOut = function(width, height){
      return yState > height || xState > width;
    }
  }

  /**
  * Animate the given canvas, by putting some elements on it!
  * @param canvas Given canvas.
  */
  function animate(canvas){
    var ctx = canvas.getContext("2d");                  // Get context
    ctx.clearRect(0,0,canvas.width, canvas.height);     //  & clear canvas

    for(var i = 0; i < MAX; i++){            // For each element in the canvas:
      var o = elements[i];                     // Extract the element..
      if(o == null){                           // If the element is non-existing,
        o = new Element(                     //   create a new one:
          canvas.width * Math.random(),        // x
          0-50,                                // y
          40,40,                               // height & width
          10* Math.random(),                   // rotation angle speed
          4 * (Math.random()*2-1),             // Slide right/left (x axis)
          10* Math.random());                  // fall (y axis)
      }

      o.draw(ctx);

      if(o.checkIfOut(canvas.width, canvas.height)){
        o = null;
      }

      elements[i] = o;                            // Put back object
    }
  }

  var canvas = $("#c")[0];                           // Get canvas & set fullscreen:
  canvas.height = $(window).height();
  canvas.width = $(window).width();

  setInterval(function(){ animate(canvas)},50);   // Set interval to animate canvas
});