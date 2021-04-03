/* Any JavaScript here will be loaded for all users on every page load. */

// Marioalexsan's functions

// overview functions are supposed to be used for Module:Map

function overviewDragging(e) {
  target = e.currentTarget;
  pos    = target.querySelector('.overview-map-pos');
  parent = target.parentNode;

  // Pray to all gods that this thing grabs the map image first
  image  = target.querySelector('img');
  
  e.preventDefault();

  // get the previous mouse position
  prevMousePosX = target.getAttribute('data-startX');
  prevMousePosY = target.getAttribute('data-startY');
  
  // calculate mouse movement
  deltaMousePosX = e.clientX - prevMousePosX;
  deltaMousePosY = e.clientY - prevMousePosY;

  // calculate the new position for the <span> element
  newSpanPosX = parseInt(pos.style.left, 10) + deltaMousePosX;
  newSpanPosY = parseInt(pos.style.top, 10) + deltaMousePosY;
  
  // calculate safe area in which the <span> can reside
  // safe area prevents the image from moving outside of the container partially or completely
  safeX = parent.clientWidth - image.clientWidth;
  safeY = parent.clientHeight - image.clientHeight;

  /*
  console.log('safeX = ' + safeX);
  console.log('safeY = ' + safeY);
  */

  // limit span position to safe area to avoid moving the image out
  // bottom right point is by default (0, 0), top left is specified by safe area

  if( newSpanPosX < safeX ){
      newSpanPosX = safeX;
  }
  else if (newSpanPosX > 0){
      newSpanPosX = 0;
  }
  
  if( newSpanPosY < safeY ){
      newSpanPosY = safeY;
  }
  else if (newSpanPosY > 0){
      newSpanPosY = 0;
  }
  
  // set the new position for <span>
  pos.style.left = newSpanPosX + "px";
  pos.style.top = newSpanPosY + "px";

  // save mouse pointer location for next event  
  target.setAttribute('data-startX', e.clientX);
  target.setAttribute('data-startY', e.clientY);
}

function overviewDragStop(e) {
  target = e.currentTarget;
  
  // stop moving when mouse button is released, or if cursor exits the <div>'s area
  target.onmouseup = null;
  target.onmousemove = null;
  target.onmouseleave = null;
}
            
function overviewDragStart(e) {
  target = e.currentTarget;
  
  e.preventDefault();

  // save the mouse position for first mousemove event
  target.setAttribute('data-startX', e.clientX);
  target.setAttribute('data-startY', e.clientY);
  
  // set mouse move and mouse up event handlers
  target.onmousemove  = overviewDragging;

  target.onmouseup    = overviewDragStop;
  target.onmouseleave = overviewDragStop;
}

// Rokker84's functions

var currentX = 0,
    currentY = 0;

var mouse_monitor = function(e)
{
  currentX = e.pageX;
  currentY = e.pageY;
  ttip.style.left = (currentX+20)+"px";
  ttip.style.top = (currentY+5)+"px";
}

function showtip(metadata)
{

  qualityclass = "itemborder_0";
  if(metadata.quality == 1)
  {
    qualityclass = "itemborder_1";
  }
  else if(metadata.quality == 2)
  {
    qualityclass = "itemborder_2";
  }
  metadata.special = metadata.special.split('[').join('').split(']').join('').split('{:').join('').split('{').join('').split('}').join('').split('|').join('')
  innerH = "<table>"
  innerH += "<tr><td colspan=2 class='tooltipH1'><div class='"+qualityclass+"_0'><img id='itemicon' class='itemicon' src='http://secretsofgrindea.wikia.com/wiki/Special:Filepath?file="+metadata.icon+"' onLoad='iO=document.getElementById(\"itemicon\");if(iO!=null){iW=iO.naturalWidth;iH=iO.naturalHeight;if(iW>=iH){iO.style.width=\"100%\"}else{iO.style.height=\"100%\"}}'></div><div class='"+qualityclass+"_1'><div style='display:inline-block;margin-left:12px; margin-right:6px;'>"+metadata.name+"</div></div><div  class='"+qualityclass+"_2'></div></td></tr>"
  innerH += "<tr><td style='width:60px'></td><td style='width:auto;'></td></tr>"
  if(metadata.type){innerH += "<tr><td class='tooltipH3'>Type</td><td class='tooltipP'>"+metadata.type+"</td></tr>"}
  if(metadata.def){innerH += "<tr><td class='tooltipH3'>DEF</td><td class='tooltipP'>"+metadata.def+"</td></tr>"}
  if(metadata.maxhp){innerH += "<tr><td class='tooltipH3'>MaxHP</td><td class='tooltipP'>"+metadata.maxhp+"</td></tr>"}
  if(metadata.maxep){innerH += "<tr><td class='tooltipH3'>MaxEP</td><td class='tooltipP'>"+metadata.maxep+"</td></tr>"}
  if(metadata.atk){innerH += "<tr><td class='tooltipH3'>ATK</td><td class='tooltipP'>"+metadata.atk+"</td></tr>"}
  if(metadata.matk){innerH += "<tr><td class='tooltipH3'>MATK</td><td class='tooltipP'>"+metadata.matk+"</td></tr>"}
  if(metadata.aspd){innerH += "<tr><td class='tooltipH3'>ASPD</td><td class='tooltipP'>"+metadata.aspd+"</td></tr>"}
  if(metadata.cspd){innerH += "<tr><td class='tooltipH3'>CSPD</td><td class='tooltipP'>"+metadata.cspd+"</td></tr>"}
  if(metadata.epreg){innerH += "<tr><td class='tooltipH3'>EPReg</td><td class='tooltipP'>"+metadata.epreg+"</td></tr>"}
  if(metadata.crit){innerH += "<tr><td class='tooltipH3'>Crit</td><td class='tooltipP'>"+metadata.crit+"</td></tr>"}
  if(metadata.critchance){innerH += "<tr><td class='tooltipH3'>Crit Chance</td><td class='tooltipP'>"+metadata.critchance+"</td></tr>"}
  if(metadata.shieldhp){innerH += "<tr><td class='tooltipH3'>ShieldHP</td><td class='tooltipP'>"+metadata.shieldhp+"</td></tr>"}
  if(metadata.special){innerH += "<tr><td colspan='2' style='height:7px'></td></tr><tr><td class='tooltipSP' colspan='2'>"+metadata.special+"</td></tr>"}
  if(metadata.buy||metadata.sell){innerH += "<tr><td colspan='2' style='height:7px'></td></tr>"}
  if(metadata.buy){innerH += "<tr><td class='tooltipH3'>Buy</td><td class='tooltipP'><div class='goldborder_0'></div><div class='goldborder_1'><div style='display:inline-block;margin-left:12px; margin-right:6px;'>"+metadata.buy+"</div></div><div class='goldborder_2'></div></td></tr>"}
  if(metadata.sell){innerH += "<tr><td class='tooltipH3'>Sell</td><td class='tooltipP'><div class='goldborder_0'></div><div class='goldborder_1'><div style='display:inline-block;margin-left:12px; margin-right:6px;'>"+metadata.sell+"</div></div><div class='goldborder_2'></div></td></tr>"}
  if(metadata.drop){innerH += "<tr><td class='tooltipH3'>Drop from</td><td class='tooltipP'>"+metadata.drop+"</td></tr>"}
  innerH += "</table>"

  ttip.innerHTML = innerH;
  ttip.style.visibility = 'visible';
}

function hidetip()
{
  ttip.innerHTML = "";
  ttip.style.visibility = 'hidden';
}


window.onload = function()
{
  // Rokker84's edits
  i = document.createElement('DIV');
  i.id = "tooltipbox"
  i.innerHTML = "tooltip"
  i.classList.add("tooltipbox")
  document.getElementsByTagName('body')[0].appendChild(i);

  var arr = [].slice.call(document.getElementsByClassName('has-tooltip'));
  arr.forEach(function(entry) {
    var metadata = entry.dataset;
    //console.log(metadata)
    entry.onmouseover = function(){ showtip(metadata) }
    entry.onmouseout = function(){ hidetip() }
    subnodes = [].slice.call(entry.getElementsByTagName("A"));
    subnodes.forEach(function(subentry) {
       subentry.title = ""
    })
    //console.log("Added tooltip");
  });

  ttip = document.getElementById('tooltipbox');
  this.addEventListener('mousemove', mouse_monitor);


  /* Marioalexsan's edits
   * Code for handling Module:Map behavior
   * Assigns a mousedown event handler to all <div> elements with the CSS class "overlay-map"
   * The CSS class itself is assigned in the Lua module
  */

  mapCollection = document.getElementsByClassName('overview-map');
  Array.from(mapCollection).forEach(function(elem){
    elem.onmousedown = overviewDragStart;
  });
}