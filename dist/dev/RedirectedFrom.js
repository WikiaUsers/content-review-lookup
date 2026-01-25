$(function() {
	const redirectedFrom = document.querySelector('.mw-redirectedfrom a');
	if (!redirectedFrom) return;

	const url = new URL(redirectedFrom.href);
	redirectedFrom.innerText = decodeURIComponent(url.pathname.slice(url.pathname.search('/wiki/') + 6)).replace(/_/g, ' ');
	
});