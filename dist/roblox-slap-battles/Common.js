/* Any JavaScript here will be loaded for all users on every page load. */

/* AutoCreateUserPages configurations */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'Defaultuserpage}}',
        3: false,
        1202: false
    },
    summary: 'Making my new user page!',
    notify: '<a href="/wiki/User:$2">Welcome to the wiki! You can start by visiting your userpage, $1!</a>'
};

/* MessageBlock configurations */
window.MessageBlock = {
	title : 'You have been blocked!',
	message : 'You have been blocked for the reason of \'$1\', your ban duration is $2.',
	autocheck : true
};

/* MarkBlocked configurations */
window.mbPartialStyle = 'opacity: 0.5; color: #cc4949;';
window.mbTempStyle = 'opacity: 0.7; text-decoration: line-through; color: #b03030;';
window.mbIndefStyle = 'opacity: 0.4; font-style: italic; text-decoration: line-through; color: #782626;';

/* LockOldComments configurations */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.limit = 30;

/* LockOldDiscussionVotes */
(function() {
	if (!/\/f/.test(location.pathname)) return;

	var limit = 60 * 24 * 60 * 60 * 1000;
	var msg = 'You can no longer upvote this post as it is over 60 days old.';
	var btnSel = [
		'button[class*="vote" i]',
		'button[class*="upvote" i]',
		'button[class*="kudos"]',
		'button[class*="like" i]',
		'button[aria-label*="vote" i]',
		'button[aria-label*="upvote" i]',
		'[role="button"][class*="vote" i]',
		'[role="button"][class*="upvote" i]'
	].join(',');

	function addNotice(el) {
		if (el.querySelector('.old-vote-notice')) return;
		var d = document.createElement('div');
		d.className = 'old-vote-notice';
		d.style.cssText = 'font-size:12px;color:#aaa;background:rgba(30,30,30,.85);border-left:3px solid #666;padding:5px 10px;margin-bottom:8px;border-radius:0 3px 3px 0;';
		d.textContent = msg;
		el.insertBefore(d, el.firstChild);
	}

	function lockBtn(btn) {
		if (btn.dataset.locked) return;
		btn.dataset.locked = '1';
		btn.style.opacity = '0.4';
		btn.style.pointerEvents = 'none';
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
		}, true);
	}

	function processTime(el) {
		if (el.dataset.done) return;
		el.dataset.done = '1';
		var dt = el.getAttribute('datetime');
		if (!dt) return;
		var age = Date.now() - new Date(dt).getTime();
		if (isNaN(age) || age < limit) return;

		var node = el.parentElement;
		while (node && node !== document.body) {
			var btn = node.querySelector(btnSel);
			if (btn) {
				addNotice(node);
				lockBtn(btn);
				return;
			}
			node = node.parentElement;
		}
	}

	function scan() {
		document.querySelectorAll('time[datetime]').forEach(processTime);
	}

	new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
	[500, 1500, 3000, 5000].forEach(function(ms) { setTimeout(scan, ms); });
}());