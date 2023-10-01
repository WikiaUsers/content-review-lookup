// ES5 JavaScript script to display the current hour according to the user's timezone, in 12 hour format.
var date = new Date();
var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var userTimezoneDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
var hour = userTimezoneDate.getHours();

// Convert the hour to 12 hour format.
if (hour > 12) {
  hour -= 12;
  ampm = " PM";
} else {
  ampm = " AM";
}

// Display the hour and AM/PM indicator.
var clock = document.getElementById("clock");
clock.innerHTML = hour + ampm;