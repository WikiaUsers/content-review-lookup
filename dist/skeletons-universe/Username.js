$(function() {
	// Get username
	let username;
	if(!localStorage.getItem("skeletons-universe-wiki-username")) {
		username = mw.config.get('wgUserName');
		// Cache username to increase loading speed
		localStorage.setItem("skeletons-universe-wiki-username", username);
	}
	const elements = document.querySelectorAll(".username");
	if(elements.length === 0) return;
	for(const element of elements) {
		// Fill text
		element.innerText = username;
	}
});