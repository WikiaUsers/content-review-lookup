/* Any JavaScript here will be loaded for all users on every page load. */

// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//
// If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
// Set the date we're counting down to

// hide 'nocountdown' 
var nocountdowns = document.getElementsByClassName('nocountdown');
for (var l=0; l<nocountdowns.length; l++) {
	nocountdowns[l].style.display = 'none';
}

// show 'countdown'
var countdowns = document.getElementsByClassName('countdown');
for (var h=0; h<countdowns.length; h++) {
	countdowns[h].style.display = 'inline';
}

var dates = [];

// Source: https://www.w3schools.com/howto/howto_js_countdown.asp
setInterval(function() {
	// Get today's date and time
	var now = new Date().getTime();

	// Update all count downs
	for (var i=0; i<countdowns.length; i++) {
		var element = countdowns[i].getElementsByClassName('countdowndate')[0];

		if (element) {
			// Find the distance between now and the count down date
			dates[i] = dates[i] || new Date(element.textContent).getTime();
			var distance = dates[i] - now;

			// Calculate time and display the result
			element.textContent = (distance < 0) ? 'EXPIRED' :
				Math.floor(distance / 86400000) + " days " +
				Math.floor((distance % 86400000) / 3600000) + " hours " +
				Math.floor((distance % 3600000) / 60000) + " minutes " +
				Math.floor((distance % 60000) / 1000) + " seconds ";
		}
	}
}, 1000);