// Experimental Template JS 
mw.hook("wikipage.content").add(function ($content) {
	$content.find("span.import-js").each(function () {
		const jsCode = $(this).attr("data-js");
		const from = $(this).attr("data-from");
		if (!jsCode) return;

		try {
			console.log("[T:JS] Running JS from:", from);
			new Function(jsCode)();
		} catch (err) {
			console.error("[T:JS] Error in user-injected JS:", err);
		}
	});
});

// T:CSS
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});


// voting
mw.loader.using('mediawiki.util', function () {
    $(function () {
        const pageName = mw.config.get('wgPageName');
        const storageKey = 'vote_' + pageName;
        let currentVote = localStorage.getItem(storageKey) || '';

        // Utility
        function getVoteValue(vote) {
            if (vote === 'up') return 1;
            if (vote === 'down') return -1;
            return 0;
        }

        // Build interface
        const voteWidget = $('<div>').addClass('vote-widget');
        const upBtn = $('<button>').addClass('vote-button').html('▲');
        const downBtn = $('<button>').addClass('vote-button').html('▼');
        const countDisplay = $('<span>').addClass('vote-count');

        function updateDisplay() {
            const val = getVoteValue(currentVote);
            countDisplay.text(val >= 0 ? '+' + val : val);
            upBtn.toggleClass('active-up', currentVote === 'up');
            downBtn.toggleClass('active-down', currentVote === 'down');
        }

        function handleVote(vote) {
            currentVote = (currentVote === vote) ? '' : vote;
            localStorage.setItem(storageKey, currentVote);
            updateDisplay();
        }

        upBtn.click(() => handleVote('up'));
        downBtn.click(() => handleVote('down'));

        voteWidget.append(upBtn, countDisplay, downBtn);

        // Insert near Edit / Dot menu
        const interval = setInterval(() => {
            const actionBar = $('.page-header__actions');
            const dotMenu = actionBar.find('.wds-button[aria-label="More"]');
            if (actionBar.length && dotMenu.length) {
                dotMenu.after(voteWidget);
                updateDisplay();
                clearInterval(interval);
            }
        }, 100);
    });
});