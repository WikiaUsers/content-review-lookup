/* Any JavaScript here will be loaded for all users on every page load. */

// Load Tooltip.js (only if tooltips are present on page)
if (document.querySelector(".advanced-tooltip") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:Tooltip.js&action=raw&ctype=text/javascript');
}

// Load ResponsiveImageMap.js (only if imagemaps within res-img are present on the page)
if (document.querySelector(".res-img img[usemap]") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:ResponsiveImageMap.js&action=raw&ctype=text/javascript');
}

// Load WorldmapPoe1.js (only if worldmap is present on the page)
if (document.querySelector(".worldmap") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:WorldmapPoe1.js&action=raw&ctype=text/javascript');
}

// Load ContainerTable.js (only if a loot-container-table is present on the page)
if (document.querySelector(".loot-container-table") != null)
{
	mw.loader.load('/index.php?title=MediaWiki:ContainerTable.js&action=raw&ctype=text/javascript');
}

(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
	// ======
	/*
	    This snippet allows placing class="unsortable" on table rows "|-" in order to hide
	    them when sorting. One instance where this may be useful is when using colspans
	    to denote table sections. When the user clicks sort on a column, these colspans
	    shift around and may no longer make sense in the sorted context.
	*/
	
	// Defer until JQuery UI (specifically the tablesorter) has been loaded
	function deferUntilJQueryUILoaded(callback)
	{
	    if (window.jQuery != null && window.jQuery.tablesorter != null)
	        callback();
	    else
	        setTimeout(function() { deferUntilJQueryUILoaded(callback) }, 200);
	}
	
	var sortableTables = document.querySelectorAll(".wikitable.sortable");
	if (sortableTables.length > 0) deferUntilJQueryUILoaded(hideUnsortableRowsOnSort);
	
	function hideUnsortableRowsOnSort()
	{
	    sortableTables.forEach(function(t)
	    {
	        var unsortableRows = t.querySelectorAll("tr.unsortable");
	
	        // Don't continue if the table has no unsortable rows
	        if (unsortableRows.length == 0) return;
	
	        // I don't think you can .bind to a tablesorter after it has been initialized
	        // so we perform this on the click event of all headerSort cells instead
	        var headerSorts = t.querySelectorAll(".headerSort");
	        headerSorts.forEach(function(h){ h.addEventListener("click", toggleUnsortableRows); });

			// Hide the unsortable rows if the table is currently being sorted, otherwise show them
	        function toggleUnsortableRows()
	        {
				var hide = false;
				
				// Determine whether to hide or show the unsortable rows
				for (var i = 0; i < headerSorts.length; i++)
				{
					if (headerSorts[i].classList.contains("headerSortUp") ||
						headerSorts[i].classList.contains("headerSortDown"))
					{
						hide = true; 
						break;
					}
				}
				
				// Set the display style on all unsortable rows of this table
	            for (var j = 0; j < unsortableRows.length; j++)
	            {
	                unsortableRows[j].style.display = hide ? "none" : "";
	            }
	        }
	    });
	}
	
	// ======
	/*
	    This snippet re-anchors the page to rows in a table when the page loads.
	    It works on both rows (tr) and cells (td + th) that have been assigned an ID.
	    Since UCX, anchoring to a position in a really long page almost never works
	    
	    Because the wide-table-wrapper changes the structure of the DOM, the :target
	    selector gets invalidated and will not apply
	*/
	
	var lastAnchoredRow = null;
	
	function onAnchor(fromHashChange)
	{
	    if (!location.hash) return;
	    var anchor = document.getElementById(location.hash.slice(1));
	    if (!anchor) return;
	    
	    // Anchor to row or cell
	    if (anchor.tagName == "TR" || anchor.tagName == "TD" || anchor.tagName == "TH")
	    {
	        if (anchor.tagName == "TD" || anchor.tagName == "TH")
	            anchor = anchor.parentElement;
	
	        // Highlight the row if one was anchored to
	        anchor.classList.add("anchored-row");
	        
	        // Remove the anchored-row class from the last row
	        if (lastAnchoredRow != null) lastAnchoredRow.classList.remove("anchored-row");
	        lastAnchoredRow = anchor;
	    }
	}
	
	deferUntilJQueryUILoaded(onAnchor);
	window.addEventListener("hashchange", function() { onAnchor(true); });
	
	// ======
	/*
		This snippet moves elements with the class res-img-overlay so that they are
		within the parent element of the first img of res-img.
		It also ensures that said parent element has position:relative
		See Template:Res-img for more info
	*/
	var resImgOverlays = document.querySelectorAll(".res-img .res-img-overlay");
	
	if (resImgOverlays.length > 0)
	{
		resImgOverlays.forEach(function(o)
		{
			var imgParent = o.closest(".res-img").querySelector("img").parentNode;
			
			if (imgParent != null)
			{
				imgParent.insertBefore(o, imgParent.firstChild);
				imgParent.style.position = "relative";
			}
		});
	}
	
	// ======
	/*
		Because new lines are stripped from portable infoboxes, it means we can't have
		multiline tooltips anymore. This snippet fixes that, and replaces all instances
		of "\n" in ALL tooltips (to maintain consistency and expectations) with a new
		line character. Previously tooltips could use the LINE FEED entity - &#10;
	*/
	var tooltips = document.querySelectorAll(".page-content span.tooltip");
	tooltips.forEach(function(t)
	{
	   var title = t.getAttribute("title");
	   if (title) t.setAttribute("title", title.replaceAll("\\n", "\n"));
	});
	
	// ======
	/*
	    Create an IntersectionObserver which sets "isSticky" on the .fandom-community-header__background
	    when it starts being sticky. That way we can conditionally style it.
	*/
	
	new IntersectionObserver(function(e)
	{
	    var entry = e[0];
	    entry.target.classList.toggle('isSticky', entry.intersectionRatio < 1)
	    
	}, { threshold: 1.0 }).observe(document.querySelector(".fandom-community-header__background"));

	
	// ======
	/*
	    The "n more" dropdown to the right of the categories at the top of the page will overflow if
	    positioned too far to the right. This script will check whether it is likely to do so when
	    the page is resized, and invert the dropdown layout if needed.
	*/

	var categoriesDropdown = document.querySelector(".page-header__categories-dropdown");
	var categoriesDropdownContent = categoriesDropdown && categoriesDropdown.querySelector(".page-header__categories-dropdown-content");
	
	if (categoriesDropdown && categoriesDropdownContent)
	{
	    function invertCategoriesDropdown()
	    {
	        var rect = categoriesDropdown.getBoundingClientRect();
	        var isOverflowing = (rect.left + 320 > document.body.clientWidth);
	        
	        categoriesDropdownContent.classList.toggle("wds-is-left-aligned", !isOverflowing);
	        categoriesDropdownContent.classList.toggle("wds-is-right-aligned", isOverflowing);
	    }
	    
	    window.addEventListener("resize", mw.util.debounce(invertCategoriesDropdown, 150));
	    invertCategoriesDropdown();
	}
	
	// ======
	/*
		Makes the right rail toggle sticky (a la Dr.Bryan's StickyRailToggler on
		dev wiki, but JQuery-less + with modified styles set in CSS)
	*/
	
	var rightRailToggle = document.querySelector(".right-rail-toggle");
	
	if (rightRailToggle)
	{
		var sideToolsRight = document.createElement("div");
		sideToolsRight.className = "page-side-tools__right";
		
		var sideToolsWrapperRight = document.createElement("div");
		sideToolsWrapperRight.className = "page-side-tools__wrapper__right";
		sideToolsWrapperRight.append(sideToolsRight);
		
		rightRailToggle.before(sideToolsWrapperRight);
		sideToolsRight.append(rightRailToggle);
	}
	
	// ======
	/*
		Supporting JS for Template:Rank_stat
		This function links avo-rank-source and avo-rank-target, such when
		elements with "data-rank" attributes on the source are hovered over,
		the avo-rank-target element will have the same rank set on it.
		
		You can use data-selector on the source to set a more specific target,
		which will first be queried using Element.closest, and then over the
		entire document. By default the selector is .avo-rank-target
	*/
	
	function createRankStatTriggers(insideElement)
	{
		var sourceClasses = [ ".avo-abl-rank-list", ".avo-rank-source" ];
		var targetClasses = [ ".avo-abl", ".avo-rank-target" ];
		var elements = (insideElement || document).querySelectorAll(":is(" + sourceClasses.join(",") + ")");
		
		function rankMouseEvent(e)
		{
		    var rank = e.currentTarget.dataset.rank;
		    if (!rank) return;
		    
		    if (e.type == "mouseenter")
		        this.setAttribute("data-rank", rank);
		    else
		        this.removeAttribute("data-rank");
		}
		
		elements.forEach(function(source)
		{
			var target;
			
			if (source.dataset.selector)
				target = source.closest(source.dataset.selector) ||
					document.querySelector(source.dataset.selector);
			else
				target = source.closest(targetClasses.join(","));
	
			// If no target was found, it could be that it hasn't been added
			// to the page yet, so don't do anything for now
			if (!target) return;
	
			// The source can itself have a data-rank, or it can contain elements that each have data-rank
			var ranks = source.querySelectorAll(":scope[data-rank], [data-rank]");
			source.dataset.rankInit = "";
		
			// Bind the target to the rankMouseEvent function so it becomes "this"
		    var fn = rankMouseEvent.bind(target);
	
			// Add event listeners for mouseover and mouseleave
			for (var i = 0; i < ranks.length; i++)
			{
				ranks[i].addEventListener("mouseenter", fn);
				ranks[i].addEventListener("mouseleave", fn);
			}
		});
		
	}
	
	// Expose function
	window.createRankStatTriggers = createRankStatTriggers;
	
	createRankStatTriggers();
	
	// =====
	/*
		Reset state of specific modules in ResourceLoader
	*/
	var modules =
	[
		// "View image" under images
		// Ensure empty captions don't get created (which are very difficult to
		// style away with CSS alone). Could just as easily remove them after
		// creation, but it's way less effort to prevent them from being created
		// in the first place.
		"ImageGalleryIconApp-6yMQaox8.js",
		
		// Highlight search
		"ext.fandom.HighlightToAction.js"
	];
	
	for (var i = 0; i < modules.length; i++)
	{
		if (mw.loader.moduleRegistry[modules[i]])
			mw.loader.moduleRegistry[modules[i]].state = null;
	}
	
	// ======
	/*
		Make the old search button (in wiki-tools) focus on the new search bar
	*/
	var searchInput = document.querySelector(".search-app__input");
	var wikiToolsSearch = document.querySelector(".wiki-tools__search");
	
	if (wikiToolsSearch && searchInput)
	{
	    wikiToolsSearch.addEventListener("click", function(e)
	    {
	        e.stopPropagation();
	        e.preventDefault();
	        searchInput.focus();
	    })
	}
	
	// ======
	/*
		Add the "internal" class to all links within .no-popups since there are
		to allow us to selectively disable Extension:Popups popups on specific links
		or within specific containers
	*/
	var ignorePopupLinks = document.querySelectorAll(".no-popups a:not(.extiw, .image, .new, .internal, .external, .reference a, .mw-cite-backlink a,.toc a)");
	ignorePopupLinks.forEach(function(e){ e.classList.add("internal"); });
	
})();