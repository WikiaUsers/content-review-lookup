/* Any JavaScript here will be loaded for users using the mobile site */

// === Scrollable wikitables ===
if (document.readyState !== "loading") { wrapWikitables(); }
else { window.addEventListener("DOMContentLoaded", wrapWikitables); }

// Automatically encloses wikitables in a div with overflow-x:auto so they don't
// extend beyond the boundary of the window/page.
// I'm fairly sure this can't be done with CSS alone (I tried)
function wrapWikitables()
{
	var wikitables = document.querySelectorAll("table.wikitable");
	var wrapCount = 0;
	var handledCount = 0;
	
	console.log("Found " + wikitables.length + " wikitables on page");
	
	// Don't continue if we found no tables
	if (wikitables.length == 0)
		return;
	
	wikitables.forEach(function(wt)
	{
	    var parent = wt.parentNode;
	    var alreadyHandled = false;
	
	    // Recursively check to see if the wikitable's parent
	    // is already handling overflow-x (up to the mw-parser-output)
	    while (parent != null && parent != undefined && !parent.classList.contains("mw-parser-output"))
	    {
	        if (parent.style.overflowX != "")
	        {
	            alreadyHandled = true;
	            break;
	        }
	
	        parent = parent.parentNode;
	    }
	
	    // Don't continue if already handled overflow
	    if (alreadyHandled)
	    {
	        handledCount++;
	        return;
	    }
	    else
		{
	        wrapCount++;
		}
		
	    // Create a new div element to wrap/enclose the wikitable in
	    var wrapper = document.createElement("div");
	
	    // Insert the wrapper before the wikitable
	    wt.parentNode.insertBefore(wrapper, wt);
	
	    // Move the wikitable into the wrapper
	    wrapper.appendChild(wt);
	
	    // Add styles needed to replicate the top/bottom margin
	    // collapse behaviour of adjacent wikitables
	    wrapper.style.overflowX = "auto";
	    wrapper.style.margin = "1em 0 1em 0";
	    wt.style.margin = 0;
	});
	
	console.log("Wrapped " + wrapCount + " wikitables, skipped " + handledCount);
}

// === End scrollable wikitables ===

mw.loader.using("mobile.site.styles");