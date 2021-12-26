//SAME IDEA AS LOCALTIME.JS, BUT USES THE UTC TIME IN A 24-HOUR FORMAT
function startTime() {
  offset = 2; //2 IS THE UTC OFFSET
  var today = new Date();
  var h = today.getUTCHours();
  var m = today.getUTCMinutes();
  var s = today.getUTCSeconds();
  h += offset;
  if (h > 24) {
    h -= 24;
  }
  if (h < 0) {
    h += 24;
  }
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('utcclock').innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(function() {
    startTime()
  }, 500);
}

function checkTime(i) {
  return (i < 10) ? "0" + i : i;
}

startTime()