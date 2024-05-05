// Changes "Add New Page" URL and listeners.
mw.hook('wikipage.content').add(function(){
	document.querySelectorAll('.wiki-tools__add-new-page').forEach(function(link){
		link.setAttribute('href', '/wiki/Project:Create_Page');
		link.classList.remove('wiki-tools__add-new-page');
	});
});

// Leaderboard Template
var leaderboardElem = document.querySelector(".leaderboard-placeholder");
if (leaderboardElem)
{
	fetch("/wiki/Special:Leaderboard")
	.then(function(response){ return response.text() })
	.then(function(text)
	{
		var parser = new DOMParser();
		var html = parser.parseFromString(text, "text/html");
		var leaderboard = html.getElementById("LeaderboardTable");

		leaderboardElem.append(leaderboard);
	});
}

// Rail Module
window.AddRailModule = [{prepend: true}];
mw.hook('wikipage.content').add(function(){
	document.querySelectorAll('.page__right-rail .sticky-modules-wrapper > section:not(:last-child)').forEach(function(section){
		var sep = document.createElement('div')
		sep.classList.add('right-rail-separator');
		if (section.nextElementSibling && !section.nextElementSibling.classList.contains('right-rail-separator')) { section.after(sep); }
	});
});