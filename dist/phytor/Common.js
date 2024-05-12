window.AddRailModule = [{prepend: true}];


mw.hook('wikipage.content').add(function(){

// Changes "Add New Page" URL and listeners.
document.querySelectorAll('.wiki-tools__add-new-page').forEach(function(link){
	link.setAttribute('href', '/wiki/Project:Create_Page');
	link.classList.remove('wiki-tools__add-new-page');
});

// Leaderboard Template
if (document.querySelector(".leaderboard-placeholder")) {
	fetch("/wiki/Special:Leaderboard");
	.then(function(response){ return response.text() });
	.then(function(text) {
		var parser = new DOMParser();
		var html = parser.parseFromString(text, "text/html");
		var leaderboard = html.getElementById("LeaderboardTable");
		console.log(leaderboard);
		var loadLB = function() {
			document.querySelectorAll(".leaderboard-placeholder").forEach(function(lb){
				var nlb = leaderboard.cloneNode(true);
				var wrap = document.createElement('div');
				wrap.classList.add('leaderboard-loaded');
				wrap.appendChild(nlb);
				lb.after(wrap);
				lb.remove();
			});
		};
		loadLB();
		mw.hook('AddRailModule.module').add(loadLB);
	});
};


// Rail Module
document.querySelectorAll('.rail-module:not(:last-child)').forEach(function(section){
	if (!section.classList.contains('railModule') && section.nextElementSibling && !section.nextElementSibling.classList.contains('right-rail-separator')) {
		var sep = document.createElement('div');
		sep.classList.add('right-rail-separator');
		section.after(sep);
	};
});
//document.querySelectorAll('.rail-module__list').forEach(function(el){
//	$(el).makeCollapsible({$customTogglers: el.previousElementSibling});
//});


});