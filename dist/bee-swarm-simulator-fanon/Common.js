/* Any JavaScript here will be loaded for all users on every page load. */

// TIME TEMPLATE
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
// END TIME TEMPLATE

// EDIT COUNT TEMPLATE
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
// END EDIT COUNT TEMPLATE

// ACTIVE SINCE TEMPLATE
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
// END ACTIVE SINCE TEMPLATE

// MARKBLOCKED CUSTOMIZATION
window.mbTooltip = 'blocked by $2 for $1 with the reason, \"$3\" ($4 ago)';
// END MARKBLOCKED

// GRADIENT TEXT
@import "/load.php?articles=MediaWiki:GradientText.css&only=styles&mode=articles";

export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`
  };

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}