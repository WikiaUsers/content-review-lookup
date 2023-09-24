/* Any JavaScript here will be loaded for all users on every page load. */
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
  innerH = ""
  metaArr = []
  arr=metadata.split('^')
  arr.forEach(function(entry) {
    entry=entry.split('~')
    if(entry[0])
    {
       metaArr[entry[0]] = entry[1];
       //innerH = innerH + entry[0] + ": "+ entry[1]+"<br>";
    }
  })
  innerH = "<table>"
  innerH += "<tr><td colspan=2 style='font-weight:bold; font-size:17px;'><div style='display:inline-block; width:32px;height:32px; line-height:40px; align:center;'><img src='http://secretsofgrindea.wikia.com/wiki/Special:Filepath?file="+metaArr['icon']+"' style='max-width:32px; max-height:32px; align:center;'></div>"+metaArr['name']+"</td></tr>"
  innerH += "<tr><td style='font-weight:bold;'>Type</td><td>"+metaArr['type']+"</td></tr>"
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
  i = document.createElement('DIV');
  i.id = "tooltipbox"
  i.innerHTML = "Tooltip test"
  i.style.cssText = "position:absolute; width:200px; top:100px; left:100px; visibility:hidden; z-index:200; border:10px; background:#85582f; border-radius:15px; border-image: url(https://images.wikia.nocookie.net/__cb20141029143609/secretsofgrindea/images/5/55/Dialogue.png) 10 10 stretch; color:white;"

  document.getElementsByTagName('body')[0].appendChild(i);

  var arr = [].slice.call(document.getElementsByClassName('has-tooltip'));
  arr.forEach(function(entry) {
    var metadata = entry.firstChild.innerHTML
    entry.removeChild(entry.firstChild);
    entry.onmouseover = function(){ showtip(metadata) }
    entry.onmouseout = function(){ hidetip() }
    subnodes = [].slice.call(entry.getElementsByTagName("A"));
    subnodes.forEach(function(subentry) {
       subentry.title = ""
    })
    console.log("Added tooltip");
  });

  ttip = document.getElementById('tooltipbox');
  this.addEventListener('mousemove', mouse_monitor);
}