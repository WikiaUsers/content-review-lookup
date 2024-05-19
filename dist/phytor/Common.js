window.AddRailModule = [{prepend: true}];


mw.hook('wikipage.content').add(function(){

// Changes "Add New Page" URL and listeners.
document.querySelectorAll('.wiki-tools__add-new-page').forEach(function(link){
	link.setAttribute('href', '/wiki/Project:Create_Page');
	link.classList.remove('wiki-tools__add-new-page');
});

// Leaderboard Template
if (document.querySelector(".leaderboard-placeholder")) {
	fetch("/wiki/Special:Leaderboard")
	.then(function(response){ return response.text() })
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
waitFor('.sticky-modules-wrapper', function(){
	document.querySelectorAll('.rail-module__list').forEach(function(el){
		$(el.previousElementSibling).wrap('<div class="mw-customtoggle" aria-expanded="true" tabindex="0"></div>');
		$(el).makeCollapsible({$customTogglers: el.previousElementSibling});
	});
});


// Copy Text Template
$('body').on('click.ct', 'div.copy-text', function copyText(event) {
	var textContent = event.currentTarget.getAttribute('data-text') || '';
	$input = $('<textarea>', { type: 'text' }).val(textContent).appendTo('body').select();
	var success = document.execCommand('Copy');
	$input.remove();
	if (success) {
		mw.notify('Copied the text: ' + textContent); //Optional
	} else {
		if (window.navigator && navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(function () {
				mw.notify('Copied the text: ' + textContent); //Optional
			});
		}
	}
});


// Delay until element exists to run function
function waitFor(query, callback, extraDelay) {
	if ('function' == typeof callback && 'string' == typeof query) {
		extraDelay = extraDelay || 0;
		if (document.querySelector(query)) {
			setTimeout(callback, extraDelay);
		} else {
			// set up the mutation observer
			var observer = new MutationObserver(function (mutations, me) {
				// mutations is an array of mutations that occurred
				// me is the MutationObserver instance
				var targetNode = document.querySelector(query);
				if (targetNode) {
					setTimeout(callback, extraDelay);
					me.disconnect(); // stop observing
					return;
				}
			});
            
			// start observing
			observer.observe(document, {
			childList: true,
			subtree: true
			});
		}
	}
}


});