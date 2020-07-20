importScriptPage('Countdown/code.js', 'dev');

importScriptPage('DisplayClock/code.js', 'dev');

importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');

importScriptPage('MediaWiki:Slider.js', 'joeplayground');

importScriptPage('MediaWiki:FloatingRail.js', 'joeplayground');

importScriptPage('MediaWiki:BeaverSlider.js', 'joeplayground');

function socialicons() {
   $('.SharingToolbar').append('<div style="margin:5px auto"><a href="https://www.facebook.com/PlayWarframe?fref=ts"><img src="https://images.wikia.nocookie.net/warframe/images/5/55/Facebook.png"></a></div><div style="margin:5px auto"><a href="http://www.reddit.com/r/Warframe/"><img src="https://images.wikia.nocookie.net/warframe/images/9/96/Squarereddit-logo.png"></a></div><div style="margin:5px auto"><a href="http://www.twitch.tv/warframe/profile"><img src="https://images.wikia.nocookie.net/warframe/images/f/f6/Twitchicon.png"></a></div><div style="margin:5px auto"><a href="http://www.youtube.com/user/PlayWarframe"><img src="https://images.wikia.nocookie.net/warframe/images/f/ff/Youtubelogo.png"></a></div><div style="margin:5px auto"><a href="http://store.steampowered.com/agecheck/app/230410/"><img src="https://images.wikia.nocookie.net/warframe/images/5/5c/Steamlogo.png"></a></div>');
}

$(socialicons);

/* Twitter follow button */
function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/wikia" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @Wikia</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);


function pollthankyou() {
   $('#wpPollStatusE169CFAD599E4CC61378BCAFC4733E52').append('<div>Your vote is presented by Google Android!</div>');
}
$(pollthankyou);

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}