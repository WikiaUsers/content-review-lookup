// Primarily for main page nav
document.body.addEventListener('click', function(e){
    if (e.target.hasAttribute('data-goto')) {
        window.location.href = 'https://thanos-simulator-official.fandom.com' + e.target.getAttribute("data-goto");
    } else if (e.target.parentElement.hasAttribute('data-goto')) {
    	window.location.href = 'https://thanos-simulator-official.fandom.com' + e.target.parentElement.getAttribute("data-goto");
    }
});

// Message block reason
window.MessageBlock = {
	title: 'Blocked from ' + mw.config.get("wgSiteName"),
	message: 'You have been blocked from our wiki for \'$1\'. DURATION: $2.',
	autocheck: true
};