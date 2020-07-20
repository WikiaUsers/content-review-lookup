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