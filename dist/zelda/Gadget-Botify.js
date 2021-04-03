// --------------------------------------------------------
// Will Bot the user just before the Replace Text starts
// Notes: https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.Api
// --------------------------------------------------------

const REBOT_BUTTON_ID = "t-botify";
const UNBOT_BUTTON_ID = "t-unbot";
const BANNER_CLASS = "bot-mode-banner";

$(document).ready(function(){
	botOnReplaceText();
	addToolboxLinks();
	addBotModeBanner();
	isBot().then(toggleState);
});

/* Adds an Event Listener for the Replace Text submit button */
function botOnReplaceText() {
	
	if (mw.config.get('wgPageName') === 'Special:ReplaceText' && document.getElementById('choose_pages')) {
		
		var reason = ''
		  , replaceFrom = $('#choose_pages > input[name=target]').val()
		  , replaceTo   = $('#choose_pages > input[name=replacement]').val();
		reason = 'Text replacement - "' + replaceFrom + '" to "' + replaceTo + '"';
		
		$('#choose_pages').on('submit', function(e){
			e.preventDefault();
			botify('add', reason, function(){
				$('#choose_pages').off('submit').submit();
			});
		});
	}
}

function addToolboxLinks() {
	addToolboxItem({
		id: REBOT_BUTTON_ID,
		text: 'Bot mode 🤖',
		title: 'Click to add yourself to the bot group',
		onClick: function() {
			botify('add');
			toggleState(true);
		}
	});
	addToolboxItem({
		id: UNBOT_BUTTON_ID,
		text: 'Unbot',
		title: 'Click to unbot',
		onClick: function() {
			botify('remove');
			toggleState(false);
		}
	});
}

function addToolboxItem(item) {
	var toolbox = document.getElementById('p-tb-list');
	var listItem = $('<li>', { id: item.id });
	var it = $('<a>' + item.text + '</a>', { title: item.title})
		.click(function(e) {
			e.preventDefault();
	    	item.onClick();
		})
		.wrap(listItem)
		.parent()
		.appendTo(toolbox);
}

/* Either Bots or Unbots the current user */
function botify( addOrRemove, reason, callback ) {
	
	var hasCallback = !!callback;
	
	//Create api options object
	var apiOptions = {
		action: 'userrights',
		user: mw.config.get("wgUserName"),
	};
	apiOptions[addOrRemove] = 'bot';
	if (reason) apiOptions.reason = reason;
	
	//Use POST to change bot userright
	(new mw.Api()).postWithToken('userrights', apiOptions).done(function(data){
		console.log(data);
		console.log("Botify: '" + addOrRemove + "' success.");
		mw.notify("Botify: '" + addOrRemove + "' success.");
		
		if (hasCallback) callback();
		
	}).fail(function(){
		console.log("Error in botify: '" + addOrRemove + "'.");
		mw.notify("Error in botify: '" + addOrRemove + "'.");
	});
}

// Adds the "bot mode" indication banner, which is hidden by default.
function addBotModeBanner() {
	const banner = $("<div>Bot mode is on.</div>").addClass(BANNER_CLASS);
	$("body").prepend(banner);
}

function isBot() {
	return new mw.Api().get({
		action: "query",
		meta: "userinfo",
		uiprop: "groups",
	}).then(function(result) {
		return result.query.userinfo.groups.includes("bot");
	});
}

// Determine which portlet link to show, and whether to show the "bot mode" banner
function toggleState(isBot) {
	if (isBot) {
		$("#"+REBOT_BUTTON_ID).css("display", "none");
		$("#"+UNBOT_BUTTON_ID).css("display", "");
		$("."+BANNER_CLASS).addClass(BANNER_CLASS+"--enabled");
	}
	else {
		$("#"+UNBOT_BUTTON_ID).css("display", "none");
		$("#"+REBOT_BUTTON_ID).css("display", "");
		$("."+BANNER_CLASS).removeClass(BANNER_CLASS+"--enabled");
	}
}