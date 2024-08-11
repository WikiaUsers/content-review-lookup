/* Any JavaScript here will be loaded for all users on every page load. */

window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for not following our local rules or continueing to break our rules, to appeal, please contact us on Community Central or reply to this message.'
};

// RevealAnonIP
 
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

// Delay until element exists to run function
function waitFor(query, callback, extraDelay) {
	if ("function" == typeof callback && "string" == typeof query) {
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

// Rail Module
window.AddRailModule = [{prepend: true}];

// Moves sticky-modules-wrapper to prepend custom railmodule, removes railmodule, adds separators
waitFor("section.railModule ~ div.sticky-modules-wrapper", function(){
	$(".sticky-modules-wrapper").prepend($("section.railModule"));
	$(".railModule .rail-module").unwrap();
	document.querySelectorAll(".rail-module:not(:last-child)").forEach(function(section){
		if (!section.nextElementSibling.classList.contains("right-rail-separator")) {
			var sep = document.createElement("div");
			sep.classList.add("right-rail-separator");
			section.after(sep);
		}
	});
});
// Makes default rail-modules collapsible
mw.loader.using("jquery.makeCollapsible").then(function(){
	waitFor(".page-tools-module ~ .activity-module", function(){
		document.querySelectorAll(".rail-module__list").forEach(function(el){
			$(el.previousElementSibling).wrap('<div class="mw-customtoggle" aria-expanded="true" tabindex="0"></div>');
			$(el).makeCollapsible({$customTogglers: el.previousElementSibling, collapsed: true});
		});
	});
});
// Sticky stuff
waitFor(".sticky-modules-wrapper .rail-module .mw-customtoggle-rail-links", function() {
	if (document.querySelector('#before-sidebar')) { return; }
	var $sidebar = $(".sticky-modules-wrapper");
	$('<div id="before-sidebar"></div>').insertBefore($sidebar);
	var $before = $("#before-sidebar");
	
	var lastSD = "d";
	var lastH = $sidebar.outerHeight();
    var lastVH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var lastST = $(window).scrollTop();
    var lastT = $sidebar.offset().top;
    var smaller = lastH <= lastVH ? true : false;
    var stuck = false;
	
	var sidebarFunction = function() {
		var h = $sidebar.outerHeight();
		var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		
		if (h != lastH || vh != lastVH) {
			if (h <= vh) {
				$sidebar.css("top", 36);
				$before.css("margin-top", 0);
				smaller = true;
			} else {
				$sidebar.css("top", vh - h);
				$sidebar.css("bottom", vh - h - 36);
				if (smaller) {
					margin = $(window).scrollTop() > 160 ? $(window).scrollTop() - 124 : 0;
					$before.css("margin-top", margin);
					smaller = false;
				}
			}
			lastH = h;
			lastVH = vh;
		}
		
		var st = $(window).scrollTop();
		
		if (st != lastST) {
			if (!smaller) {
				var t = $sidebar.offset().top;
				if (st > lastST) {
					sd = "d";
				} else {
					sd = "u";
				}
				if (sd != lastSD) {
					lastSD = sd;
					
					if (stuck) {
						margin = sd == "d" ? t - 124 : t - 160;
						margin = margin <= 0 ? 0 : margin;
						
						$before.css("margin-top", margin);
					}
				}
				stuck = t != lastT ? true : false;
				lastT = t;
			}
			lastST = st;
		}
	};
	
	$(window).on("resize.mikeLib scroll.bttmstick DOMContentLoaded.bttmstick load.bttmstick", sidebarFunction);
	$(".rail-module .mw-customtoggle").on("click",sidebarFunction);
});



mw.hook("wikipage.content").add(function(){

// Changes "Add New Page" URL and listeners.
document.querySelectorAll(".wiki-tools__add-new-page").forEach(function(link){
	link.setAttribute("href", "/wiki/Project:Create_Page");
	link.classList.remove("wiki-tools__add-new-page");
});


// collapsible rows in a table without making the whole table collapse

$(function() {
    $('table.fandom-table.mw-collapsible').each(function(){
        var t = $(this);
        var t_id = t.attr('id');
        t.find($('a.mw-collapsible-text')).click(function() {
            if ($(this).parent().hasClass('mw-collapsible-toggle-expanded')) {
            var top = t[0].getBoundingClientRect().top; // position of table.
            var fandomHeaderHeight = 46; // floating Fandom header height.
            var y = top + window.pageYOffset - fandomHeaderHeight;
            if (top < 46) { // Don't scroll into view if already in view.
                window.scrollTo({top: y})
            }
        });
    });
});