/* Any JavaScript here will be loaded for all users on every page load. */


/* UserTags code testing */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
	}
};

// Code originally taken from the TDS wiki //

// This function gets the badge ID and the awarded count, then updates all elements with class "id{badgeId}"
window.__updateBadgeCount = function(id, count) {
  document.querySelectorAll('.id' + id).forEach(el => {
    el.textContent = count.toLocaleString(); // Format number with commas (e.g., 12,345)
  });
};

// Find all elements with a class that contains "id" followed by digits (e.g., id2124475816)
document.querySelectorAll('[class*="id"]').forEach(el => {
  const match = el.className.match(/id(\d{5,})/); // extract the badge ID from the class name
  if (!match) return; // skip if no match found

  const badgeId = match[1]; // extracted badge ID
  const script = document.createElement('script');
  script.src = 'https://occulticnine.vercel.app/badges?id=' + badgeId;

  document.head.appendChild(script); // Append badge count to class
});

/* LockOldComments thing */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.limit = 35;

	function getUserStatus(data) {
		var recentEdits = data.query && (data.query.usercontribs.length + data.query.logevents.length);
		if (recentEdits > 0 && recentEdits < 10) {
			return {
				status: i18n.msg('online').plain(),
				color: 'var(--Yes-colour)',
				image: 'https://static.wikia.nocookie.net/r-interminable-rooms/images/d/da/OnlineIcon_20.png/revision/latest?cb=20260520102745&format=original'
			};
		} else if (recentEdits > 0) {
			return {
				status: i18n.msg('busy').plain(),
				color: 'var(--Maybe-colour)',
				image: 'https://static.wikia.nocookie.net/r-interminable-rooms/images/a/ac/BusyIcon_20.png/revision/latest?cb=20260520102746&format=original'
			};
		} else {
			return {
				status: i18n.msg('offline').plain(),
				color: 'var(--No-colour)',
				image: 'https://static.wikia.nocookie.net/r-interminable-rooms/images/9/96/OfflineIcon_20.png/revision/latest?cb=20260520102747&format=original'
			};
		}
	}
	function addToContent($content) {
		var $statusElements = $content.find('span[data-user-status]:not(.loaded)');
		if (!$statusElements.length) {
			return;
		}
		$statusElements.each(function() {
			var $element = $(this).addClass('loaded');
			if (!$element.data('userStatus')) {
				return;
			}
			getRecentEdits($element.data('userStatus')).done(function(data) {
				var userStatus = getUserStatus(data);
				$element
					.css('color', userStatus.color)
					.text(userStatus.status)
					.append(
						' ',
						$('<img>', {
							src: userStatus.image
						})
					);
			});
		});
	}