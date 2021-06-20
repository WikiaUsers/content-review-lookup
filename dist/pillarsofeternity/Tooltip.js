/*
    This JavaScript handles positioning and display of "advanced" tooltips. It is used in conjunction with Template:Tooltip_poe2 (and its accompanying CSS in MediaWiki:Hydradark.css)

    This script does three main things:
    1: Disables default link tooltips (as a result of the title attribute in the a element) when using advanced-tooltip
    2. Replaces the CSS hover psuedo-selector with mouseenter and mouseleave events to allow for easier per-tooltip settings and configurable delays.
       This way all of the function is here, and all of the styling is in CSS.
    3. Positions the tooltip content using the anchors and offsets stored in data-* attributes
    
    Author: Macklin (Pillars of Eternity Wiki)
    I'm not super familiar with JavaScript/jQuery beyond what you see below, so feel free to make/suggest changes :)
*/

(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
	var mouseEventTypes = ["auxclick", "click", "contextmenu", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseout", "mouseup", "pointerlockchange", "pointerlockerror", "select", "wheel"];
	var tooltipHolder;
	var globalWrapper;
	
	// When the document is loaded, run init
	$(document).ready(advancedTooltipsInit);
	
	function advancedTooltipsInit()
	{
	    var t0 = performance.now();
	
	    // Get all elements with the advanced-tooltip class
	    var advancedTooltips = $(".advanced-tooltip");
	
	    if (advancedTooltips.length)
	    {
	        // For some reason the body element has a fixed pixel size.
	        // This makes it difficult to get the document height in pure CSS, which we need to
	        // prevent tooltips from overflowing the document when they're drawn off the screen
	        // So instead we use the height of the global-wrapper class
	        globalWrapper = $(document.querySelector("#global-wrapper, .main-container"));
	
	        /*
	        $(window).resize(function()
	        {
	            tooltipHolder.style.height = globalWrapper.height() + "px";
	        })
	        */
	
	        // --- Create tooltip holder ---
	        // An explicitly-sized holder is required to prevent expanding the page when a tooltip is overflowing the window
	        // If we didn't need to do this, overflow: visible could be set on a zero sized holder without issue

	        // As far as I know the only way to do this is with a container to define the overflow bounds.
	        // We could also use the new overflow clip, e.g "position: absolute; width:100%; overflow: visible; overflow-x: clip;"",
	        // but Safari is (as usual) slow to support it <- This is what we're doing for now - Safari can go do one

	        tooltipHolder = document.createElement("div");
	
	        // Set id and height (remaining properties are in CSS)
	        tooltipHolder.setAttribute("id", "advanced-tooltip-holder");
	        //tooltipHolder.style.height = globalWrapper.height() + "px";
	
	        // Add it to the top of the document body
	        document.body.prepend(tooltipHolder);
	
	        // Loop over advancedTooltips and call initTooltip for each
	        advancedTooltips.each(initTooltip);
	
	        t1 = performance.now();
	        console.log("Initialized " + advancedTooltips.length + " tooltips in " + (t1 - t0).toFixed() + "ms");
	    }
	}
	
	function initTooltip(index, element)
	{
	    var container = $(this);
	
	    // --- Remove title attribute from a elements ---
	
	    // Get an "a" element directly under advanced-tooltip
	    var a = container.children("a");
	
	    // If an a element is present
	    if (a.length)
	    {
	        // On mouse enter (only once ever)
	        // Remove the "title" attribute from the a element
	        container.one("mouseenter", function(e){ a.removeAttr("title"); });
	    }
	
	    // ---
	
	    // Get the content class directly under advanced-tooltip
	    var content = container.children(".advanced-tooltip-content");
	
	    // Return if the content class doesn't exist
	    if (!content.length || content.length == 0)
	        return;
	
	    // Replace newline "\n" with paragraph "<p></p>"
	    // Kinda hacky, but I cannot for the life of me figure out how to properly do multi-line parameters in templates
	    content.html(content.html().replace("\n", "<p></p>"));
	
	    // Move tooltip to tooltip holder.
	    // Even though the tooltip is drawn on top, it is still clipped by the parent div (typically the parser output div)
	    // The tooltipHolder is a zero-size child element of <body>, so tooltips here should only be clipped by body margins (e.g. the top bar)
	    tooltipHolder.appendChild(content.get(0));
	
	    // All values below are only fetched/calculated once on init.
	    // If they need to be changed dynamically they should be re-fetched/recalculated within an event callback.
	    // All positioning is done using top and left style properties, relative to the container.
	
	    // Cache container and content sizes
	    var containerWidth = container.width();
	    var containerHeight = container.height();
	    var contentWidth = content.width();
	    var contentHeight = content.height();
	
	    // Note that the above content height/width is only correct if the display property is NOT none
	    // If the content starts with display:none, and then is set to display:something, the width/height will change
	    // .advanced-tooltip-content needs to not have a display value set.
	
	    // However, we still want to completely hide it from the layout when the tooltip is hidden,
	    // so after we have retrieved the width/height, set the display value to none
	    content.css("display", "none");
	
	    // --- Animation delays ---
	
	    // Get show/hide delays from data attributes
	    var showDelay = Math.floor(parseFloat(content.data("show-delay")) * 1000);
	    var hideDelay = Math.floor(parseFloat(content.data("hide-delay")) * 1000);
	    if (Number.isNaN(showDelay)) showDelay = 0;
	    if (Number.isNaN(hideDelay)) hideDelay = 0;
	
	    // --- Animation times ---
	
	    var fadeInTime = Math.floor(parseFloat(content.data("fade-in-time")) * 1000);
	    var fadeOutTime = Math.floor(parseFloat(content.data("fade-out-time")) * 1000);
	    if (Number.isNaN(fadeInTime)) fadeInTime = 150;
	    if (Number.isNaN(fadeOutTime)) fadeOutTime = 50;
	
	    // -- Anchors and offsets ---
	
	    // Get anchor, container-anchor and local-anchor from data attributes
	    var anchor = content.data("anchor");
	    var contAnchor = content.data("container-anchor");
	    var localAnchor = content.data("local-anchor");
	
	    var containerOffsetX = 0;
	    var containerOffsetY = 0;
	    var localOffsetX = 0;
	    var localOffsetY = 0;
	
	    // If anchor is set, override container-anchor and local-anchor
	    if (anchor != undefined)
	    {
	         // Warn if both anchor and container-anchor/local-anchor are already defined
	        if (contAnchor != undefined)
	            console.log("Tooltip should not define both anchor and container-anchor!");
	        if (localAnchor != undefined)
	            console.log("Tooltip should not define both anchor and local-anchor!");
	
	        // This switch converts anchor to an equivalent container-anchor and local-anchor
	        switch (anchor.toString())
	        {
	            case "top-left":     contAnchor = "top-left";     localAnchor = "bottom-right"; break;
	            case "top":          contAnchor = "top";          localAnchor = "bottom";      break;
	            case "top-right":    contAnchor = "top-right";    localAnchor = "bottom-left"; break;
	            case "left":         contAnchor = "left";         localAnchor = "right";       break;
	            case "center":       contAnchor = "center";       localAnchor = "center";      break;
	            case "right":        contAnchor = "right";        localAnchor = "left";        break;
	            case "bottom-left":  contAnchor = "bottom-left";  localAnchor = "top-right";   break;
	            case "bottom":       contAnchor = "bottom";       localAnchor = "top";         break;
	            case "bottom-right": contAnchor = "bottom-right"; localAnchor = "top-left";    break;
	            default:
	                console.log("Parameter \"anchor\" is invalid!");
	                break;
	        }
	    }
	
	    // If container-anchor is defined
	    if (contAnchor != undefined)
	    {
	        // Convert container-anchor to container-offset-x/y
	        containerOffsetX = anchorToOffsetX(contAnchor, containerWidth);
	        containerOffsetY = anchorToOffsetY(contAnchor, containerHeight);
	    }
	
	    // Fetch container-offsets and parse to pixel values
	    // Note that we use attr instead of data, as attr will always return the string representation (and not some arbitrary type)
	    // Stacking offsets with anchors isn't typical, but we can deal with it by adding the values
	    containerOffsetX += offsetStrToPixelValue(content.attr("data-container-offset-x"), containerWidth);
	    containerOffsetY += offsetStrToPixelValue(content.attr("data-container-offset-y"), containerHeight);
	
	    // If local-anchor is defined
	    if (localAnchor != undefined)
	    {
	        // Convert local-anchor to local-offset-x/y
	        localOffsetX = -anchorToOffsetX(localAnchor, contentWidth);
	        localOffsetY = -anchorToOffsetY(localAnchor, contentHeight);
	    }
	
	    // Fetch local-offsets and parse to pixel values
	    // Note that we use attr instead of data, as attr will always return the string representation (and not some arbitrary type)
	    localOffsetX += offsetStrToPixelValue(content.attr("data-local-offset-x"), contentWidth);
	    localOffsetY += offsetStrToPixelValue(content.attr("data-local-offset-y"), contentHeight);
	
	    // --- Update event ---
	
	    // Get update-event from data attribute, default to mouseenter
	    var updateEvent = content.data("update-event");
	    if (typeof updateEvent != "string") updateEvent = "mouseenter";
	
	    // --- Follow cursor ---
	
	    // The follow-cursor attribute defines whether the tooltip position should be influenced by the cursor position
	    var followCursor = content.attr("data-follow-cursor");
	    var followCursorX = followCursor != undefined && (followCursor == "true" || followCursor.includes("x"));
	    var followCursorY = followCursor != undefined && (followCursor == "true" || followCursor.includes("y"));
	
	    // Force the updateEvent to mousemove
	    if (followCursor == "true")
	        updateEvent = "mousemove";
	
	    // Cached cursor positions
	    var isMouseEvent = mouseEventTypes.includes(updateEvent);
	    var cursorX = 0;
	    var cursorY = 0;
	
	    // If the updateEvent is not a mouse event, but we're expecting it to follow the cursor,
	    // add another event used to capture the mouse position for use in the "actual" updateEvent
	    if ((followCursorX || followCursorY) && !isMouseEvent)
	    {
	        container.on("mousemove", function(e)
	        {
	            cursorX = e.pageX;
	            cursorY = e.pageY;
	        });
	    }
	
	    // --- Viewport clamping ---
	
	    var clampMode = content.attr("data-clamp-viewport");
	    var clampAxes = content.attr("data-clamp-viewport-axes");
	    var clampViewportX = clampMode != undefined && clampMode != "none" && (clampAxes == undefined || clampAxes.includes("x"));
	    var clampViewportY = clampMode != undefined && clampMode != "none" && (clampAxes == undefined || clampAxes.includes("y"));
	
	    // --- Update position ---
	
	    // On updateEvent (mouseenter by default)
	    container.on(updateEvent, function(e)
	    {
	        // Default to top:0, left:0 (meaning the top-left corner of the container).
	        // Calculate left and top with the offsets (these are x/y relative to the container)
	        var left = 0 + containerOffsetX + localOffsetX;
	        var top = 0 + containerOffsetY + localOffsetY;
	        var containerPos = container.offset();
	
	        // Offset by cursor
	        if (followCursorX)
	            left += (((!isMouseEvent ? cursorX : e.pageX) - container.offset().left) - containerOffsetX);
	        if (followCursorY)
	            top += (((!isMouseEvent ? cursorY : e.pageY) - container.offset().top) - containerOffsetY);
	        
	        if (clampViewportX || clampViewportY)
	        {
	            var topOfTooltip = containerPos.top + top;
	            var bottomOfTooltip = topOfTooltip + contentHeight;
	            var leftOfTooltip = containerPos.left + left;
	            var rightOfTooltip = leftOfTooltip + contentWidth;
	            var topOfWindow = $(window).scrollTop();
	            var bottomOfWindow = topOfWindow + $(window).height();
	            var leftOfWindow = 0;
	            var rightOfWindow = $(window).width();
	
	            // Check to see if the tooltip is outside the top of the window
	            if (clampViewportY && topOfTooltip < topOfWindow) 
	            {
	                if (clampMode == "invert-local")
	                {
	                    top += contentHeight;
	                }
	                else if (clampMode == "push")
	                {
	                    // Push back
	                    top += topOfWindow - topOfTooltip;
	                }
	                else if (clampMode == "invert")
	                {
	                    // Push back
	                    top += topOfWindow - topOfTooltip;
	
	                    // Check to see if the tooltip is covering the container
	                    // And if there's enough space between the bottom of the container and the bottom of the window
	                    if (tooltipCoveringContainer(left, top, contentWidth, contentHeight, containerWidth, containerHeight) &&
	                        bottomOfWindow - bottomOfTooltip >= contentHeight)
	                    {
	                        // If so, push it to below the container
	                        top = containerHeight;
	                    }
	                }
	            }
	
	            // Check to see if the tooltip is outside the bottom of the window
	            if (clampViewportY && bottomOfTooltip > bottomOfWindow)
	            {
	                if (clampMode == "invert-local")
	                {
	                    top -= (contentHeight + localOffsetY) + localOffsetY;
	                }
	                else if (clampMode == "push")
	                {
	                    // Push back
	                    top -= bottomOfTooltip - bottomOfWindow;
	                }
	                else if (clampMode == "invert")
	                {
	                    // Push back
	                    top -= bottomOfTooltip - bottomOfWindow;
	                    
	                    // Check to see if the tooltip is covering the container
	                    // And if there's enough space between the top of the container and the top of the window
	                    if (tooltipCoveringContainer(left, top, contentWidth, contentHeight, containerWidth, containerHeight) &&
	                        topOfTooltip - topOfWindow >= contentHeight)
	                    {
	                        // If so, push it to above the container
	                        top = -contentHeight;
	                    }
	                }
	            }
	
	            // Check to see if the tooltip is outside the left of the window
	            if (clampViewportX && leftOfTooltip < leftOfWindow)
	            {
	                if (clampMode == "invert-local")
	                {
	                    left += contentWidth;
	                }
	                else if (clampMode == "push")
	                {
	                    // Push back
	                    left += leftOfWindow - leftOfTooltip; // aka 0
	                }
	                else if (clampMode == "invert")
	                {
	                    // Push back
	                    left += leftOfWindow - leftOfTooltip; // aka 0
	
	                    // Check to see if the tooltip is covering the container
	                    // And if there's enough space between the right of the container and the right of the window
	                    if (tooltipCoveringContainer(left, top, contentWidth, contentHeight, containerWidth, containerHeight) &&
	                        rightOfWindow - rightOfTooltip >= contentWidth)
	                    {
	                        // If so, push it to the right of the container
	                        left = containerWidth;
	                    }
	                }
	            }
	
	            // Check to see if the tooltip is outside the right of the window
	            if (clampViewportX && rightOfTooltip > rightOfWindow)
	            {
	                if (clampMode == "invert-local")
	                {
	                    left -= (contentWidth + localOffsetX) + localOffsetX;
	                }
	                else if (clampMode == "push")
	                {
	                    // Push back
	                    left -= rightOfTooltip - rightOfWindow;
	                }
	                else if (clampMode == "invert")
	                {
	                    // Push back
	                    left -= rightOfTooltip - rightOfWindow;
	
	                    // Check to see if the tooltip is covering the container
	                    // And if there's enough space between the left of the container and the left of the window
	                    if (tooltipCoveringContainer(left, top, contentWidth, contentHeight, containerWidth, containerHeight) &&
	                        leftOfTooltip - leftOfWindow >= containerWidth)
	                    {
	                        // If so, push it to the left of the container
	                        left = -contentWidth;
	                    }
	                }
	            }
	        }
	
	        // Convert from tooltip container relative to document-body relative
	        top = (containerPos.top - globalWrapper.offset().top) + top;
	        left = (containerPos.left - globalWrapper.position().left) + left;
	
	        content.css({"top":top, "left":left});
	    });
	
	    // --- Update hover ---
	
	    // This accomplishes the same as the CSS hover psuedo-selector + CSS transitions
	    // but allows more per-element control, rather than having everything in CSS which
	    // can be a pain to work with programatically
	
	    function fadeIn()
	    {
	        // Fade in (stop existing animations, clear queue, delay before animating)
	        content.stop(true, false).delay(showDelay).animate({ opacity: 1 },
	        {
	            // Adjust the duration based on the opacity so that a full duration doesn't occur every time
	            duration:(1 - parseFloat(content.css("opacity"))) * fadeInTime,
	            start: function()
	            {
	                // Before fading in, show the content (make visible)
	                content.css({"visibility":"visible", "display": "inherit"});
	            }
	        });
	    };
	
	    function fadeOut()
	    {
	        // Fade out (stop existing animations, clear queue)
	        // If the content is already shown, delay before animating it out - otherwise start immediately
	        content.stop(true, false).delay(content.css("opacity") >= 1 ? hideDelay : 0).animate({ opacity: 0 },
	        {
	            // Adjust the duration based on the opacity so that a full duration doesn't occur every time
	            duration:parseFloat(content.css("opacity")) * fadeOutTime,
	            done: function()
	            {
	                // After the content has faded out, hide it completely
	                content.css({"visibility":"hidden", "display": "none"});
	            }
	        });
	    }
	
	    // --- Display mode ---
	
	    var displayMode = content.attr("data-display-mode");
	
	    if (displayMode == undefined || displayMode == "none")
	    {
	        // Mouse enter
	        container.on("mouseenter", fadeIn);
	
	        // Mouse leave
	        container.on("mouseleave", fadeOut);
	    }
	    else
	    {
	        if (displayMode == "always")
	        {
	            // Show content immediately, don't set up events
	            content.css({"visibility":"visible", "display": "inherit", "opacity": 1});
	
	            // Trigger updateEvent
	            container.trigger(updateEvent);
	        }
	        else if (displayMode == "never")
	        {
	            // Hide content immediately, don't set up eventsevents
	            content.css({"visibility":"hidden", "display": "none", "opacity": 0});
	        }
	        else if (displayMode == "stay")
	        {
	            content.css("pointer-events", "auto");
	            container.on("mouseenter", fadeIn);
	            container.on("mouseleave", fadeOut);
	            content.on("mouseenter", fadeIn);
	            content.on("mouseleave", fadeOut);
	        }
	    }
	}
	
	// Get the highest width of all decendants, includes padding, margins, etc.
	function maxWidthOfElements(element)
	{
	    var width = element.outerWidth(true);
	    var childWidth;
	
	    // Get child elements recursively and find highest width
	    element.find("*").each(function()
	    {
	        childWidth = $(this).outerWidth(true);
	        if (childWidth > width) width = childWidth;
	    });
	
	    return width;
	}
	
	// Get the highest width of all decendants, includes padding, margins, etc.
	function maxHeightOfElements(element)
	{
	    var height = element.outerHeight(true);
	    var childHeight;
	
	    // Get child elements recursively and find highest width
	    element.find("*").each(function()
	    {
	        childHeight = $(this).outerHeight(true);
	        if (childHeight > height) height = childHeight;
	    });
	
	    return height;
	}
	
	// Check if a tooltip is covering the container on a specific axis
	function tooltipCoveringContainer_(pos, tooltipSize, containerSize)
	{
	    // If the top of the tooltip is above the top of the container, and the bottom of the tooltip is below the top of the container
	    // If the top of the tooltip is within the container
	    return (pos < 0 && pos + tooltipSize >= 0) || (pos >= 0 && pos < containerSize);
	}
	
	// Check to see if the tooltip at x/y relative to the container is covering the container (on both axes)
	function tooltipCoveringContainer(x, y, tooltipWidth, tooltipHeight, containerWidth, containerHeight)
	{
	    return tooltipCoveringContainer_(x, tooltipWidth, containerWidth) || tooltipCoveringContainer_(y, tooltipHeight, containerHeight);
	}
	
	// Converts an offset string to a pixel value (and handle parcentage conversion).
	// Returns 0 if the str is in an invalid format
	// str - The string to convert
	// size - The size of area, used for the percentage calculation
	function offsetStrToPixelValue(str, size)
	{
	    if (typeof str === "string")
	    {
	        var offset = parseFloat(str);
	
	        if (Number.isNaN(offset) || !Number.isFinite(offset))
	            return 0;
	
	        if (str.endsWith("%"))
	            return offset * size / 100;
	        else
	            return offset;
	    }
	
	    return 0;
	}
	
	
	// Convert anchor to offset-x conversion
	function anchorToOffsetX(anchor, width)
	{
	    if (typeof anchor !== "string" || !isFinite(width))
	        return 0;
	    
	    switch (anchor)
	    {
	        case "top-left": case "left": case "bottom-left":       return 0;
	        case "top": case "center": case "bottom":               return 50 * width / 100;
	        case "top-right": case "right": case "bottom-right":    return 100 * width / 100;
	        default:                                                return 0;
	    }
	}
	
	// Convert anchor to offset-y conversion
	function anchorToOffsetY(anchor, height)
	{
	    if (typeof anchor !== "string" || !isFinite(height))
	        return 0;
	    
	    switch (anchor)
	    {
	        case "top-left": case "top": case "top-right":          return 0;
	        case "left": case "center": case "right":               return 50 * height / 100;
	        case "bottom-left": case "bottom": case "bottom-right": return 100 * height / 100;
	        default:                                                return 0;
	    }
	}

})();