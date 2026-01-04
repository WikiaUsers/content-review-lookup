mw.loader.using('mediawiki.user').then(function() {
    // Only run for logged-in users
    if (mw.config.get('wgUserName')) { // Returns the username if logged in
        // 1. Create the floating question mark button
        var $mentorBtn = $('<div id="mentor-btn">?</div>').css({
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '40px',
            height: '40px',
            'background-color': '#0078D7',
            color: 'white',
            'text-align': 'center',
            'line-height': '40px',
            'border-radius': '50%',
            'font-size': '24px',
            'cursor': 'pointer',
            'z-index': '9999',
            'box-shadow': '0 2px 6px rgba(0,0,0,0.3)'
        });
        $('body').append($mentorBtn);

        // 2. Create the mentor popup window (hidden by default)
        var $mentorWindow = $(`
            <div id="mentor-window">
                <div id="mentor-window-title">Mentor Assigned
                    <span id="close-window" style="float:right; cursor:pointer;">✖</span>
                </div>
                <div id="mentor-window-content">
                    <p><strong>You have been assigned an experienced mentor for editing help: Tom Was Taken1</strong></p>
                    <button id="ask-question-btn">Ask Question</button>
                </div>
            </div>
        `).css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            'background-color': 'white',
            border: '2px solid #0078D7',
            'border-radius': '5px',
            'box-shadow': '0 4px 15px rgba(0,0,0,0.5)',
            'text-align': 'center',
            padding: '15px',
            'z-index': '10000',
            display: 'none'
        });

        $mentorWindow.find('#mentor-window-title').css({
            'background-color': '#0078D7',
            color: 'white',
            padding: '10px',
            'font-weight': 'bold',
            'border-top-left-radius': '3px',
            'border-top-right-radius': '3px',
            'margin-bottom': '10px'
        });

        $mentorWindow.find('#mentor-window-content').css({
            padding: '15px',
            'text-align': 'center'
        });

        $('body').append($mentorWindow);

        // 3. Show the mentor window when the question mark is clicked
        $mentorBtn.on('click', function() {
            $mentorWindow.show();
        });

        // 4. Close the window when the ✖ is clicked
        $('#close-window').on('click', function() {
            $mentorWindow.hide();
        });

        // 5. Ask Question button redirects to Tom Was Taken1's message wall
        $('#ask-question-btn').on('click', function() {
            window.location.href = '/wiki/Message_Wall:Tom_Was_Taken1';
        });
    }
});

mw.hook('wikipage.content').add(function () {
	if (mw.config.get('wgAction') !== 'history') return;
	if (!mw.user.isLoggedIn()) return;

	var api = new mw.Api();

	$('.mw-history-histlinks').each(function () {
		var $links = $(this);
		if ($links.find('.revert-alert-btn').length) return;

		var $li = $('<span>')
			.addClass('revert-alert-btn')
			.css({ marginLeft: '8px', cursor: 'pointer', color: '#0645ad' })
			.text('[Revert & Alert]');

		$links.append($li);

		$li.on('click', function () {
			var $row = $links.closest('li');
			var revId = $row.data('mw-revid');
			var user = $row.find('.mw-userlink').text();

			if (!revId || !user) {
				alert('Unable to detect revision or user.');
				return;
			}

			if (!confirm('Revert this edit and notify ' + user + '?')) return;

			// Step 1: Revert the edit
			api.postWithToken('csrf', {
				action: 'edit',
				title: mw.config.get('wgPageName'),
				undo: revId,
				summary: 'Reverted unconstructive edit'
			}).done(function () {

				// Step 2: Post to Message Wall
				api.postWithToken('csrf', {
					action: 'messagewallthread',
					wall: 'Message_Wall:' + user,
					title: 'Edit reverted',
					message: 'Hello, I reverted your edit because I considered it unconstructive.'
				}).done(function () {
					alert('Edit reverted and message sent.');
					location.reload();
				}).fail(function () {
					alert('Edit reverted, but message could not be sent.');
				});

			}).fail(function () {
				alert('Revert failed.');
			});
		});
	});
});

// Optional config — leave blank to use defaults
window.welcomeMessage = {
  enabled: true,
  adminUsername: 'ItsLido BOT',     // $4
  adminNickname: 'ItsLido BOT',    // $3
  messageTitle: 'Welcome, $1!',
  messageText: 'Hey $1 — I\'m $3.\n\nThanks for your first edit on <a href="wikiurl.fandom.com/wiki/$2">$2</a>.\n\n— $3',
  debug: false,
  testAllEdits: false,
  preferTalk: false,
};

window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block because you have $1. If you wisb to appeal please see the following page: Help:I am Blocked.',
	autocheck : true
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MessageBlock/code.js'
	]
});