/* Any JavaScript here will be loaded for all users on every page load. */
// Time template
//test
(function() {
	function updateTime() {
		var elements = document.querySelectorAll('.display-time');
		var date = new Date();
		var month = date.getMonth();
		elements.forEach(function(i) {
			var dst = i.getAttribute('data-dst') === "true";
			var timeZone = Number(i.getAttribute('data-timezone'));
			if (isNaN(timeZone)) {
				return;
			}
			if (dst && month >= 2 && month <= 10) {
				timeZone = timeZone + 1;
			}
			var utc = new Date(date.getTime() + (new Date().getTimezoneOffset() * 60 * 1000)).getTime();
			var userDate = new Date(utc + (timeZone * 3600 * 1000));
			var hour = userDate.getHours();
			var minute = userDate.getMinutes().toString();
			minute = minute.length === 1 ? '0' + minute : minute;
			i.innerText = (hour % 12 === 0 ? '12' : (hour % 12).toString()) + ':' + (minute) + ' ' + (hour >= 12 ? 'PM' : 'AM');
		});
	}
	setInterval(updateTime, 1000);
})();

// Edit count template

(function() {
	var elements = document.querySelectorAll('.editcount');
	elements.forEach(function(i) {
		var username = i.getAttribute('data-user');
		if (username) {
			fetch('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(username)).then(function(response) {
				response.json().then(function(obj) {
					var userId = obj.query.users[0] ? obj.query.users[0].userid : null;
					if (userId) {
						fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + userId.toString()).then(function(response2) {
							response2.json().then(function(obj2) {
								i.innerText = obj2.userData.localEdits ? obj2.userData.localEdits.toString() : '0';
							});
						});
					}
				});
			});
		}
	});
})();

// Active since template

(function() {
	var elements = document.querySelectorAll('.user-active-since');
	elements.forEach(function(i) {
		var username = i.getAttribute('data-user');
		if (username) {
			fetch('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(username)).then(function(response) {
				response.json().then(function(obj) {
					var userId = obj.query.users[0] ? obj.query.users[0].userid : null;
					if (userId) {
						fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + userId.toString()).then(function(response2) {
							response2.json().then(function(obj2) {
								i.innerText = obj2.userData.registration ? obj2.userData.registration : '';
							});
						});
					}
				});
			});
		}
	});
})();

/* MessageBlock */
window.MessageBlock = {
	title: 'Blocked',
	message: 'You have been blocked for $2 for $1. If you wish to appeal this block, please do so under this message.'
};