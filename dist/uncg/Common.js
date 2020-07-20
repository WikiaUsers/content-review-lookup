/*
* Adding google module calendar to wiki pages
* put <div class="gmod_calendar"></div>
* on the page to get it
* By [[w:User:Skizzerz]]
*/

function addCalendars() {
  var calendars = getElementsByClassName(document, 'div', 'gmod_calendar');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/calendar-for-your-site.xml&up_showCalendar2=1&up_showAgenda=1&up_calendarFeeds=(%7B%7D)&up_firstDay=Sunday&up_syndicatable=true&up_stylesheet=&up_sub=1&up_c0u=&up_c0c=&up_c1u=&up_c1c=&up_c2u=&up_c2c=&up_c3u=&up_c3c=&up_min=&up_start=&up_timeFormat=1%3A00pm&up_calendarFeedsImporte';
  for(var i=0; i<calendars.length; i++) {
    calendars[i].appendChild(script);
  }
}

addOnloadHook(addCalendars);

/*** Calendar extension JavaScript - see http://www.mediawiki.org/wiki/Extension:Calendar_%28Barrylb%29 ****/
function makeRequest(url) {
  var httpRequest;                             
 
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }
 
  if (!httpRequest) {
    alert("Giving up :( Cannot create an XMLHTTP instance");
    return false;
  }
  httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
  httpRequest.open("GET", url, true);
  httpRequest.send(null);
}
 
function alertContents(httpRequest) {
 
  if (httpRequest.readyState == 4) {
    if (httpRequest.status == 200) {
        document.getElementById("p-calendar").innerHTML = httpRequest.responseText;
    } else {
        document.getElementById("p-calendar").innerHTML = "<p>There was a problem with the request.</p>";
    }
  }
}