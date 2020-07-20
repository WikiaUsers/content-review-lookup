/* Any JavaScript here will be loaded for all users on every page load. */

/*Extremely basic jst clock by shinyafro @ aigis.wikia.com/wiki/User:ShinyAfro*/
function gettime() {
  //Grab the local users system time
  var days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
  var months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']
  var rawtime = new Date();
 
  //Add the difference to UTC, then add another 9 hours to that to get JST (UTC+9:00)
  var jptime = new Date(rawtime.getTime()+(rawtime.getTimezoneOffset()*60*1000)+(32400000));
 
  //Get seconds, minutes and hours, add a 0 infront of them and set the last 2 numbers as a variable.
  var seconds = ('0'+(jptime.getSeconds()))	.slice(-2);
  var minutes = ('0'+(jptime.getMinutes()))	.slice(-2);
  var hours   = ('0'+(jptime.getHours	())).slice(-2);
  var day = days[jptime.getDay()];
  var date = jptime.getDate()
  var month = months[jptime.getMonth()];
  var year = jptime.getFullYear();
  //Add the hours, minutes, seconds and seperators together to form the countdown to next day in JST.
  var timer = hours+':'+minutes+':'+seconds;
 
  //Show timer on all divs with the class of "timer"
	$(".JSTClock.time").text(timer);
	$(".JSTClock.day").text(day);
	$(".JSTClock.date").text(date);
	$(".JSTClock.month").text(month);
	$(".JSTClock.year").text(year);
 
}
setInterval(gettime, 1000);
        /*Extremely basic jst clock by shinyafro @ aigis.wikia.com/wiki/User:ShinyAfro*/