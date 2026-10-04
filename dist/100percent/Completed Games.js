mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
	if (!mw.config.get('wgUserName')) {
		return;
	}

	if (mw.config.get('wgNamespaceNumber') !== 0) {
		return;
	}

	var pageName = mw.config.get('wgPageName').replace(/_/g, ' ');
	var userName = mw.config.get('wgUserName');
	var completedPage = 'User:' + userName + '/Completed';

	var api = new mw.Api();

	api.get({
		action: 'query',
		titles: pageName,
		prop: 'categories',
		cllimit: 'max',
		formatversion: 2
	}).done(function(data) {
		var page = data.query.pages[0];

		if (!page || !page.categories) {
			return;
		}

		var isGameOrDLC = page.categories.some(function(category) {
			return category.title === 'Category:Games' ||
				category.title === 'Category:DLC';
		});

		if (!isGameOrDLC) {
			return;
		}

		createCompletedButton();
	});

	function createCompletedButton() {
		var button = $('<button>')
			.addClass('completed-button');

		$('#content').prepend(button);

		var content = '';
		var completed = false;

		function setButtonState() {
			if (completed) {
				button
					.text('✓ Completed')
					.addClass('completed-button--completed')
					.prop('disabled', false)
					.css('cursor', 'pointer');
			} else {
				button
					.text('Mark as Completed')
					.removeClass('completed-button--completed')
					.prop('disabled', false)
					.css('cursor', 'pointer');
			}
		}

		function titleIsCompleted(text) {
			var escapedTitle = pageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

			return new RegExp(
				'^\\*\\s*\\[\\[' + escapedTitle + '(?:\\|[^\\]]+)?\\]\\]\\s*$',
				'im'
			).test(text);
		}

		function addGame() {
			var newContent = content;

			if (newContent && !/\n$/.test(newContent)) {
				newContent += '\n';
			}

			newContent += '*[[' + pageName + ']]\n';

			button
				.text('Adding...')
				.prop('disabled', true);

			api.postWithToken('csrf', {
				action: 'edit',
				title: completedPage,
				text: newContent,
				summary: 'Mark [[' + pageName + ']] as completed',
				formatversion: 2
			}).done(function(result) {
				if (!(result.edit && result.edit.result === 'Success')) {
					setButtonState();
					return;
				}

				content = newContent;
				completed = true;
				setButtonState();

				initializeUserPage();
			}).fail(function() {
				setButtonState();
			});
		}

		function initializeUserPage() {
			var userPage = 'User:' + userName;

			api.get({
				action: 'query',
				prop: 'revisions',
				titles: userPage,
				rvprop: 'content',
				rvslots: 'main',
				formatversion: 2
			}).done(function(data) {
				var page = data.query.pages[0];
				var userPageContent = '';

				if (page && page.revisions && page.revisions[0]) {
					userPageContent = page.revisions[0].slots.main.content || '';
				}

				if (/\{\{\s*Completed Games\s*\}\}/i.test(userPageContent)) {
					return;
				}

				var newUserPageContent = '{{Completed Games}}\n\n' + userPageContent;

				api.postWithToken('csrf', {
					action: 'edit',
					title: userPage,
					text: newUserPageContent,
					summary: 'Add Completed Games section'
				});
			});
		}

		function removeGame() {
			var escapedTitle = pageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

			var newContent = content.replace(
				new RegExp(
					'^\\*\\s*\\[\\[' + escapedTitle + '(?:\\|[^\\]]+)?\\]\\]\\s*\\n?',
					'im'
				),
				''
			);

			button
				.text('Removing...')
				.prop('disabled', true);

			api.postWithToken('csrf', {
				action: 'edit',
				title: completedPage,
				text: newContent,
				summary: 'Remove [[' + pageName + ']] from completed games',
				formatversion: 2
			}).done(function(result) {
				if (result.edit && result.edit.result === 'Success') {
					content = newContent;
					completed = false;
					setButtonState();
				} else {
					setButtonState();
				}
			}).fail(function() {
				setButtonState();
			});
		}

		api.get({
			action: 'query',
			prop: 'revisions',
			titles: completedPage,
			rvprop: 'content',
			rvslots: 'main',
			formatversion: 2
		}).done(function(data) {
			var page = data.query.pages[0];

			if (page && page.revisions && page.revisions[0]) {
				content = page.revisions[0].slots.main.content || '';
			}

			completed = titleIsCompleted(content);
			setButtonState();

			button.on('click', function() {
				if (completed) {
					removeGame();
				} else {
					addGame();
				}
			});
		});
	}
});