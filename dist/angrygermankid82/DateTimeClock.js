/* Year */
function updateYear() {
   var d = new Date();
   var n = d.getFullYear();
   document.getElementById("year").innerHTML = n;
}
var YearInterval = setInterval( updateYear, 1000 );
 
/* Month */
function updateMonth() {
var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];
document.getElementById("month").innerHTML = n;
}
var MonthInterval = setInterval( updateMonth, 1000 );
 
/* Date */
function updateDate() {
   var d = new Date();
   var n = d.getDate();
   document.getElementById("date").innerHTML = n;
}
var DateInterval = setInterval( updateDate, 1000 );
 
/* Day */
function updateDay() {
var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
 
var n = weekday[d.getDay()];
document.getElementById("day").innerHTML = n;
}
var DayInterval = setInterval( updateDay, 1000 );
 
/* Full date */
function updateFullDate() {
var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var n = weekday[d.getDay()] + ', ' + month[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear();
document.getElementById("fulldate").innerHTML = n;
}
var FullDateInterval = setInterval( updateFullDate, 1000 );
 
/* Clock */
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
 
function updateClock() {
    var d = new Date();
    var x = document.getElementById("clock");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    x.innerHTML = h + ":" + m + ":" + s;
}
var ClockInterval = setInterval( updateClock, 1000 );