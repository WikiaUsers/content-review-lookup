function timeStamp_Clock_js() {
  return "2014.03.01 15:54 (UTC-8)";
}

function displayClock() {
   var now     = new Date();
   var hours   = now.getHours();
   var minutes = now.getMinutes();
   var seconds = now.getSeconds();
   var hourUTC = now.getUTCHours();
   var minUTC  = now.getUTCMinutes();
   var secUTC  = now.getUTCSeconds();

   minutes = (minutes < 10 ? '0' + minutes : minutes);
   seconds = (seconds < 10 ? '0' + seconds : seconds);
   minUTC  = (minUTC < 10  ? '0' + minUTC  : minUTC);
   secUTC  = (secUTC < 10  ? '0' + secUTC  : secUTC);

   var AMPM    = (hours   >= 12 ? 'PM' : 'AM');
   var AMPMUTC = (hourUTC >= 12 ? 'PM' : 'AM');

   var hoursPM   = (hours > 12   ? hours   - 12 : (!hours   ? 12 : hours));
   var hourUTCPM = (hourUTC > 12 ? hourUTC - 12 : (!hourUTC ? 12 : hourUTC));

   $('.clock-local').html(hours + ':' + minutes + ':' + seconds + ' (UTC' +
      (now.getTimezoneOffset() < 0 ? '+' : '') + (-now.getTimezoneOffset() / 60) + ')');
   $('.clock-UTC').html(hourUTC + ':' + minUTC + ':' + secUTC + ' (UTC)');


   $('.clock-local-ampm').html(hoursPM + ':' + minutes + ':' + seconds + ' ' +
      AMPM + ' (UTC' + (now.getTimezoneOffset() < 0 ? '+' : '') +
      (-now.getTimezoneOffset() / 60) + ')');
   $('.clock-UTC-ampm').html(hourUTCPM + ':' + minUTC + ':' + secUTC + ' ' +
      AMPMUTC + ' (UTC)');

   $('.clock-specified').each(function(i) {
      var offset   = parseInt($(this).attr("data-id"), 10);
      var snow     = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * offset));
      var shours   = snow.getHours();
      var sminutes = snow.getMinutes();
      var sseconds = snow.getSeconds();

      sminutes = (sminutes < 10 ? '0' + sminutes : sminutes);
      sseconds = (sseconds < 10 ? '0' + sseconds : sseconds);

      $(this).html(shours + ':' + sminutes + ':' + sseconds + ' (UTC' +
         (offset >= 0 ? '+' : '') + offset + ')');
   });

   $('.clock-specified-ampm').each(function(i) {
      var offset   = parseInt($(this).attr("data-id"), 10);
      var snow     = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * offset));
      var shours   = snow.getHours();
      var sminutes = snow.getMinutes();
      var sseconds = snow.getSeconds();

      sminutes = (sminutes < 10 ? '0' + sminutes : sminutes);
      sseconds = (sseconds < 10 ? '0' + sseconds : sseconds);

      var sAMPM    = (shours >= 12 ? 'PM' : 'AM');
      var shoursPM = (shours > 12 ? shours - 12 : (!shours ? 12 : shours));

      $(this).html(shoursPM + ':' + sminutes + ':' + sseconds + ' ' +
         AMPM + ' (UTC' + (offset >= 0 ? '+' : '') + offset + ')');
   });

   setTimeout(function(){ displayClock() }, 200);
}

addOnloadHook(displayClock);

$(document).ready(function() {
   var timer = setInterval("rotateClockHands()", 1000);
});

function rotateClockHands() {
   var d = new Date();
   var hours   = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();	
   var hourRotate;
   var minRotate;
   var secRotate;

   var hRev = $('#hourhand').attr('data-revolutions');
   var mRev = $('#minhand').attr('data-revolutions');
   var sRev = $('#sechand').attr('data-revolutions');

   if (hRev === 'NaN')
      hRev = 0;
   else if (hours === 0 && minutes === 0 && seconds === 0)
      hRev ++;

   if (mRev === 'NaN')
      mRev = 0;
   else if (minutes === 0 && seconds === 0)
      mRev ++;

   if (sRev === 'NaN')
      sRev = 0;
   else if (seconds === 0)
      sRev ++;

   secRotate  = sRev * 360 + seconds * 6;
   minRotate  = mRev * 360 + minutes * 6 + seconds / 10;
   hourRotate = hRev * 360 + (hours % 12) * 30 + minutes / 2 + seconds / 180;

   var srotate = "rotate(" + secRotate + "deg)";
   var mrotate = "rotate(" + minRotate + "deg)";
   var hrotate = "rotate(" + hourRotate + "deg)";

   $('#sechand').css({"-moz-transform" : srotate, "-webkit-transform" : srotate, "-ms-transform" : srotate, 
      "-o-transform" : srotate, "transform" : srotate });
   $('#sechand').attr('data-revolutions', Math.floor(secRotate / 360));

   $('#minhand').css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate, "-ms-transform" : mrotate, 
      "-o-transform" : mrotate, "transform" : mrotate });
   $('#minhand').attr('data-revolutions', Math.floor(minRotate / 360));

   $('#hourhand').css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate, "-ms-transform" : hrotate, 
      "-o-transform" : hrotate, "transform" : hrotate });
   $('#hourhand').attr('data-revolutions', Math.floor(hourRotate / 360));
}