/* MonsterVerze Admin Update Creator */

(function () {
	'use strict';

	function getUserGroups() {
		if (window.mw && mw.config && mw.config.get('wgUserGroups')) {
			return mw.config.get('wgUserGroups') || [];
		}

		if (window.wgUserGroups) {
			return window.wgUserGroups || [];
		}

		return [];
	}

	function isAdmin() {
		var groups = getUserGroups();

		return groups.indexOf('sysop') !== -1 ||
			groups.indexOf('bureaucrat') !== -1 ||
			groups.indexOf('interface-admin') !== -1 ||
			groups.indexOf('staff') !== -1;
	}

	function normalizeUpdatePageName(value) {
		value = String(value || '').trim();

		if (!value) {
			return '';
		}

		if (value.toLowerCase().indexOf('updates/') === 0) {
			return value;
		}

		return 'Updates/' + value;
	}

	function makeCreateUrl(pageName) {
		var safePage = pageName
			.split('/')
			.map(function (part) {
				return encodeURIComponent(part);
			})
			.join('/');

		return location.origin +
			'/wiki/' +
			safePage +
			'?action=edit&preload=Template:Updates/preload';
	}

	function initUpdateCreator() {
		var box = document.getElementById('mv-admin-update-creator');

		if (!box) {
			return;
		}

		if (!isAdmin()) {
			box.remove();
			return;
		}

		box.innerHTML =
			'<div class="mv-admin-update-box">' +
				'<div class="mv-admin-update-title">Create a new update page</div>' +
				'<div class="mv-admin-update-row">' +
					'<input class="mv-admin-update-input" type="text" placeholder="0.9.1 or Updates/0.9.1">' +
					'<button class="mv-admin-update-button" type="button">Create Update Page</button>' +
				'</div>' +
			'</div>';

		var input = box.querySelector('.mv-admin-update-input');
		var button = box.querySelector('.mv-admin-update-button');

		function createPage() {
			var pageName = normalizeUpdatePageName(input.value);

			if (!pageName) {
				input.focus();
				return;
			}

			window.location.href = makeCreateUrl(pageName);
		}

		button.addEventListener('click', createPage);

		input.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				createPage();
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initUpdateCreator);
	} else {
		initUpdateCreator();
	}
}());