$('document').ready(function(){
  if ($("#clockBanner").length > 0 && $("#book").length > 0 && $("#evo").length > 0 && $("#clock").length > 0){
    $('#clockBanner').addClass("clockbanner");
    var now = QuizServerTime.now();
    updateClockBanner();
    showBookHour(now);
    showEvoMat(now);
  }
});

// Add a preceding zero for values below 10
function padZero(x) {
  return (x < 10 ? "0" : "") + x;
}

function formatHour(str) {
  return "<span style='font-family:monospace'>" + str + "</span>";
}

// Show current server time, with blinking ':'
function showSvrTime(now) {
  var w = now.getDay();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var wday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var whm = wday[w] + " " + padZero(h) + (s%2 ? ":" : " ") + padZero(m);

  // update banner
  $("#clock").html("Current server time: " + formatHour(whm));
}

// Show current or next book
function showBookHour(now) {
  var h = now.getHours();
  var d = now.getDate();
  var w = now.getDay();
  var books = ["Gold pots", "Red books", "Blue books", "Yellow books", "Red books", "Blue books", "Yellow books"];
  var disp;
 
  // book start time differs on even & odd days
  if (d % 2 == 0) {
    st = 1;
  } else {
    st = 2;
  }
  var bt = (h - st + 4) % 4;

  if (bt == 0) {              // it's Book time
    disp = books[w] + " currently going on!";
  }
  else if (h < 20 + st) {     // more book awaits
    disp = "Next " + books[w] + " at " + formatHour(padZero(h + 4 - bt) + ":00");
  }
  else {                      // book another day
    now = new Date(now.valueOf() + 86400000);  // tomorrow
    d = now.getDate();
    w = now.getDay();
    disp = "Next " + books[w] + " at " + formatHour((d%2 ? "02" : "01") + ":00");
  }

  // update banner
  $("#book").html(disp);
}

// Show current evo mat
function showEvoMat(now) {
  var w = now.getDay();
  var h = now.getHours();
  var evomat = ["Rocher", "Flower", "Mushroom", "Tree", "Raccoon"];
  var mat;

  // get current evo mat
  if (1 <= w && w <= 5) {
    // whole day evo mat
    mat = evomat[w-1];
  } else {
    // weekend evo rotation
    if (w == 0) {  // adjust for Sunday
      h += 24;
    }
    if (h < 3) {  // first evo starts at 3am
      mat = "None";
    } else {
      mat = evomat[(h-3) % 5];
    }
  }

  // update banner
  if (mat != "None") {
    $("#evo").html("Current evo mat: " + mat);
  } else {
    // this can only happen at 0 - 3am Saturday
    $("#evo").html(evomat[0] + " at " + formatHour("03:00"));
  }
}

// Run every second to update clock banner
function updateClockBanner() {
  var now = QuizServerTime.now();
  showSvrTime(now);
  if (now.getMinutes() == 0) {
    showBookHour(now);
    showEvoMat(now);
  }
  setTimeout(updateClockBanner, 1000);
}