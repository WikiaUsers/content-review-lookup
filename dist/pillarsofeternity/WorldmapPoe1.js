/*
    A rather thrown-together pan-and-zoom implementation mimicing the world map of Pillars of Eternity.
    Most of the visuals are CSS, this script handles the actual panning and zooming, as well
    as the logic for the arrows that appear when dragging the map around (and disappear if the
    map is at the edge of the container).

    This is used in conjunction with Template:Worldmap_poe1 and MediaWiki:Common.css

    Author: Macklin (Pillars of Eternity wiki)
*/

(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
    // Fetch all references
    var root = document.querySelector(".worldmap");
    var sidebar = root.querySelector(".worldmap-sidebar");
    var namebar = root.querySelector(".worldmap-namebar");
    var frame = root.querySelector(".worldmap-frame");
    var rootParent = root.parentElement;

    var container = root.querySelector(".worldmap-content-inner");

    var content = null;

    if (container.children.length > 1)
    {
        var multipleMapCurrentMap = container.firstElementChild;
        var multipleMaps = [];

        multipleMaps = Array.from(container.children);

        // Content element is container holding all maps
        content = document.createElement("div");
        container.appendChild(content);

        // Move all elements in container under content
        for (var i = 0; i < multipleMaps.length; i++)
        {
            content.appendChild(multipleMaps[i]);

            // Give element an ID if it doesn't already
            if (multipleMaps[i].id == "") multipleMaps[i].id = "worldmap_" + i;
        }

        var switchMap = function(id)
        {
            if (!id) return;
            
            var mapToSwitchTo = multipleMaps.find(function(m){ return m.id == id; });
            var mapToSwitchFrom = multipleMapCurrentMap;
            
            if (!mapToSwitchTo || mapToSwitchTo == mapToSwitchFrom) return;

            // Save position and scale of last map
            mapToSwitchFrom.dataset.lastScale = scaleFactor;
            mapToSwitchFrom.dataset.lastPosition = JSON.stringify(pos);

            for (var i = 0; i < multipleMaps.length; i++)
                multipleMaps[i].style.display = (multipleMaps[i].id == id) ? "" : "none";

            // Set position and scale to new map's last scale
            try { pos = JSON.parse(mapToSwitchTo.dataset.lastPosition) }
            catch(e) { pos = { x: 0, y: 0 }; }
            scaleFactor = parseFloat(mapToSwitchTo.dataset.lastScale) || 0.0;
            //contentScaler.style.transform = mapToSwitchTo.dataset.lastScale || "scale(1.0)";
            //content.style.transform = mapToSwitchTo.dataset.lastPosition || "";

            multipleMapCurrentMap = mapToSwitchTo;
        }

        // If a hash is set in the URL, and it refers to a direct child of worldmap-content-inner, use it as the first map
        if (location.hash)
        {
            var hashElem = document.getElementById(location.hash.replace("#", ""));
            if (hashElem.parentElement == content)
            {
                switchMap(hashElem.id);
            }
        }

        // Switch maps on hash change. Maps must all be back-to-back within worldmap-content-inner
        window.addEventListener("hashchange", function(e)
        {
            var hash = new URL(e.newURL).hash.replace("#", "");
            switchMap(hash);
        });

        // Make nodes with an a href that have a hash instead change the map
        var mapSwitchNodes = content.querySelectorAll(".poe1mapnode a[href^='#']");
        mapSwitchNodes.forEach(function(switchNode)
        {
            switchNode.addEventListener("click", function(e)
            {
                switchMap(switchNode.hash.replace("#", ""));
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }
    else
    {
        // Content element is first (and only) map
        content = container.firstElementChild;
    }

    // Encapsulate the content in a div with transform: scale
    // This makes it far simpler to deal with than stacking transforms on one element
    var contentScaler = document.createElement("div");
    contentScaler.classList.add("worldmap-content-inner-scaler");
    contentScaler.style.transform = "scale(1.0)";
    contentScaler.style.width = "100%";
    contentScaler.style.height = "100%";
    container.appendChild(contentScaler);
    contentScaler.appendChild(content);

    var overlay = root.querySelector(".worldmap-content.overlay");
    var arrowLeft = root.querySelector(".worldmap-content-arrow-left");
    var arrowRight = root.querySelector(".worldmap-content-arrow-right");
    var arrowUp = root.querySelector(".worldmap-content-arrow-up");
    var arrowDown = root.querySelector(".worldmap-content-arrow-down");

    var mapNodes = root.querySelectorAll(".mapnode[data-scale=\"dynamic\"]");

    var namebarButton = namebar.querySelector(".worldmap-namebar-button")
    var namebarButtonMinimal = root.querySelector(".worldmap-close-button-minimal");

    var namebarButtonMinimalNew = document.createElement("a");
    namebarButtonMinimalNew.style.cssText = namebarButtonMinimal.style.cssText;
    namebarButtonMinimalNew.classList = namebarButtonMinimal.classList;
    namebarButtonMinimalNew.appendChild(document.createTextNode("×"));
    namebarButtonMinimal.replaceWith(namebarButtonMinimalNew);
    namebarButtonMinimal = namebarButtonMinimalNew;
    namebarButtonMinimalNew = undefined;

    // These attributes are important for function
    content.setAttribute("draggable", false);
    container.setAttribute("ondragstart", "return false;");

    // These attributes are important to prevent screwy draggables
    container.setAttribute("tabindex", -1);

    var pos = { x:0, y:0 };
    var delta = { x:0, y:0 }; // <- Drag delta
    var bounds = { left:0, right:0, top:0, bottom: 0 };
    var scaleFactor = 1.0;
    var scaleDirty = true;

    var startedDrag = false; // <- True on mouse down within the content, remains true during drag
    var isDragging = false;  // <- True as soon as the mouse moves after starting a drag
    var endedDrag = false;   // <- True on mouse up after isDragging is true

    var atLeftEdge, atRightEdge, atTopEdge, atBottomEdge = false;

    // Values above 1 are larger than the original image size
    const MAX_SCALE = 2.0;
    const ARROW_DISABLED_CLASS = "worldmap-content-arrow-disabled";

    // After dragging this distance (in pixels), it is considered dragging.
    // This is important to invalidate click events when the drag is significant enough
    const DRAG_THRESHOLD = 5;

    var aspectRatio = 1.0;

    // The frame display mode
    // Full    - Everything is shown
    // Partial - Namebar and sidebar is hidden
    // Minimal - The above, frame and background is hidden
    // Auto    - Cookie setting, or full
    const FRAME_MODE_LS = "poewiki_worldmapscalingmode";
    var frameMode = root.dataset.frameMode;

    // Frame mode wasn't passed, use cookie setting or full
    if (frameMode == undefined || frameMode == "auto")
        frameMode = window.localStorage.getItem(FRAME_MODE_LS) || "full";
    toggleFrameMode(frameMode);

    // Whether to scale the size of the frame
    // fixed - Keep the container at a fixed height. The container width will be the full width of the page, and the content will be enveloped to fit inside it.
    //         In this mode, the container size will almost always be at a different aspect ratio to the content
    // dynamic - Keep the frame at a height that matches the aspect ratio of the content within the container
    //         In this mode, the container size will always match the aspect ratio of the content
    //         This may not work for all types of content
    var scalingMode = root.dataset.scalingMode || "fixed";

    // How the sidebar is shown, and whether to automatically show or hide the sidebar
    // Hiding the sidebar initially is done in wikitext to prevent flicker
    // show - Always show sidebar
    // hide - Always hide sidebar
    // auto - (Default) Show or hide the sidebar depending on the available space
    var sidebarMode = root.dataset.sidebar || "auto";

    // This is a switch to enable or disable auto. It has no effect if sidebarMode is not auto
    var autoSidebar = true && frameMode == "full";

    // Override with data-sidebar attribute
    if (sidebarMode == "show")
        toggleSidebar(true);
    else if (sidebarMode == "hide")
        toggleSidebar(false);

    // Assign some references to the root .worldmap element so they may be used by other scripts
    root.isRectFullyWithinRect = isRectFullyWithinRect;
    root.resetPositionAndScale = resetPositionAndScale;
    root.centerOnElement = centerOnElement;
    root.centerOnElements = centerOnElements;
    root.centerOnPosition = centerOnPosition;
    root.scaleMapToValue = scaleMapToValue;

    // JQuery ready event
    $(document).ready(function(e)
    {
        aspectRatio = content.scrollWidth / content.scrollHeight;
        scaleFactor = 1.0;

        // Initially show/hide sidebar
        showOrHideSidebar();

        calculateTransformBounds();
        
        if (scalingMode == "dynamic" )
        {
            scaleFactor = getMinScale();  // <- Start completely zoomed out
            scaleToFit();
        }

        clampCurrentScale();
        updateTransformScale();
        updateTransformPos();

    });

    // Mouse down on content
    content.addEventListener("mousedown", function(e)
    {
        if (e.button != 0)
            return;

        //container.focus(); // <- Uncomment to scroll to fit container on focus

        delta.x = delta.y = 0;
        startedDrag = true;
    });

    // Mouse up anywhere on window
    window.addEventListener("mouseup", e => endDrag(e));

    // Mouse move anywhere on document
    // This is necessary in order to continue drag when the cursor is outside of the window and container
    document.addEventListener('mousemove', function(e)
    {
        if (startedDrag)
        {
            delta.x += e.movementX;
            delta.y += e.movementY;

            // Determine whether this is a proper drag
            // This flag is used to enable arrows, and to disqualify click events that happen to be over a link
            if (isDragging == false)
            {
                // Calculate the delta magnitude (the linear distance travelled from the drag start)
                var magnitude = Math.sqrt((delta.x * delta.x) + (delta.y * delta.y));

                //if (Math.abs(delta.x) > DRAG_THRESHOLD || Math.abs(delta.y) > DRAG_THRESHOLD)
                if (Math.abs(magnitude) > DRAG_THRESHOLD)
                {
                    isDragging = true
                    toggleArrows(true);
                }
            }

            // Add the movement delta to the x/y position
            // The movement is scaled based on the current zoom level
            pos.x += e.movementX * (1 / scaleFactor);
            pos.y += e.movementY * (1 / scaleFactor);

            clampCurrentPos();
            updateTransformPos()

            // Update the arrows if we're above the drag threshold
            toggleArrows(isDragging);
        }
    });

    // Click on link in anywhere in content
    content.addEventListener("click", function(e)
    {
        // If this is the end of a drag, don't allow the click event to propegate to links that may be under the cursor
        if (endedDrag)
        {
            e.stopPropagation();
            e.preventDefault();
            endedDrag = false;
        }
    });

    // Mouse wheel over container
    container.addEventListener("wheel", function(e)
    {
        // This check prevents the map from capturing scroll when the mouse is over it.
        // To zoom, first the user should click on the map to focus it
        // (Perhaps a better solution would be to focus after the cursor is over the map for a certain amount of time?)
        //if (document.activeElement == container || container.contains(document.activeElement))
        {
            // If the container (or any items within the container) are focused
            // stop propegating the wheel event to prevent scrolling the page
            // Because the event listener is on the container, wheel events are only
            // fired when the mouse is over the container.
            e.preventDefault();
            e.stopPropagation();

            // Ignore mouse delta as it's different across all browsers,
            // simply treat the mouse event as one increment in a direction
            var direction = e.deltaY > 0 ? 1 : -1;

            scaleFactor -= direction * 0.05;
            scaleDirty = true;

            // Round the scale to the nearest 0.05 (do before clamping)
            scaleFactor = 1.0 / 20 * Math.floor(20 * scaleFactor);

            // Clamp scale
            clampCurrentScale();

            // Clamp position
            clampCurrentPos();

            updateTransformPos();
            updateTransformScale();
        }
    });

    // Create a new ResizeObserver for the parent of the worldmap
    // This is apparently faster than a resize event, but idk
    resizeObserver = new ResizeObserver(() =>
    {
        showOrHideSidebar();

        if (scalingMode == "dynamic")
        {
            scaleToFit();
        }
        
        calculateTransformBounds();
        clampCurrentScale();
        clampCurrentPos();
        updateTransformPos();
        updateTransformScale();
    });

    resizeObserver.observe(rootParent);

    // Namebar button event
    namebarButton.addEventListener("click", nextFrameMode);
    namebarButtonMinimal.addEventListener("click", nextFrameMode);

    function endDrag(e)
    {
        // Set this flag to signal that the drag ended
        if (isDragging) endedDrag = true;

        startedDrag = false;
        isDragging = false;
        toggleArrows(false);
    }

    // Enables or disables arrows depending on the atXEdge variables
    // Call with true or with no param to update arrows
    function toggleArrows(value)
    {
        if (arrowLeft != undefined) toggleArrow(arrowLeft, value && !atLeftEdge);
        if (arrowRight != undefined) toggleArrow(arrowRight, value && !atRightEdge);
        if (arrowUp != undefined) toggleArrow(arrowUp, value && !atTopEdge);
        if (arrowDown != undefined) toggleArrow(arrowDown, value && !atBottomEdge);
    }

    // Actually does the enabling/disabling of arrows
    // A disabled arrow element has the class ARROW_DISABLED_CLASS
    function toggleArrow(arrow, value)
    {
        if (value && arrow.classList.contains(ARROW_DISABLED_CLASS))
            arrow.classList.remove(ARROW_DISABLED_CLASS);
        else if (!value && !arrow.classList.contains(ARROW_DISABLED_CLASS))
            arrow.classList.add(ARROW_DISABLED_CLASS);
    }

    // Enable or disable the sidebar automatically depending on the size of the frame
    function showOrHideSidebar()
    {
        if (autoSidebar == false || sidebarMode != "auto")
            return;

        if (scalingMode == "dynamic")
        {
            var rootRect = root.getBoundingClientRect();

            // Find out what the width of the content would be at the smallest height of the container
            // 620 is the sidebar min-height. 109 is the difference between the main area size and the container size
            var minContainerHeight = 620 - 109;
            var minContainerWidth = (content.scrollWidth / content.scrollHeight) * minContainerHeight;

            // Add together the sidebar width (154), padding (44), and the minContainerWidth to get the smallest size of the root
            var minRootWidth = 154 + 44 + minContainerWidth;

            toggleSidebar(rootRect.width >= minRootWidth);
        }
        else
        {
            toggleSidebar(root.offsetWidth > 835);
        }
    }

    function toggleSidebar(state)
    {
        if (state == false)
        {
            sidebar.style.display = "none";
            namebar.style.textIndent = "0";
        }
        else
        {
            sidebar.style.display = "";
            namebar.style.textIndent = "";
        }
    }

    // Switch to the next frame mode
    // This should be the only way to change the frame mode
    // Full -> Partial -> Minimal -> Full...
    function nextFrameMode()
    {
        if (frameMode == "full")
            frameMode = "partial";
        else if (frameMode == "partial")
            frameMode = "minimal";
        else if (frameMode == "minimal")
            frameMode = "full";

       toggleFrameMode(frameMode);
       window.localStorage.setItem(FRAME_MODE_LS, frameMode);
    }

    // Change the current frame mode of the map
    function toggleFrameMode(mode)
    {
        if (mode == "full")
        {
            autoSidebar = true;
            root.style.margin = "";
            namebar.style.display = "";
            sidebar.style.display = "";
            frame.style.display = "";
            namebarButtonMinimal.style.display = "none";

            if (!root.classList.contains("worldmap-background"))
                root.classList.add("worldmap-background");

            showOrHideSidebar();
        }
        
        if (mode == "partial")
        {
            autoSidebar = false;
            root.style.margin = "30px";
            namebar.style.display = "none";
            sidebar.style.display = "none";
            frame.style.display = "";
            namebarButtonMinimal.style.display = "";
            namebarButtonMinimal.innerText = "×";

            if (!root.classList.contains("worldmap-background"))
                root.classList.add("worldmap-background");
        }

        if (mode == "minimal")
        {
            autoSidebar = false;
            root.style.margin = "0";
            namebar.style.display = "none";
            sidebar.style.display = "none";
            frame.style.display = "none";
            namebarButtonMinimal.style.display = "";
            namebarButtonMinimal.innerText = "+";

            if (root.classList.contains("worldmap-background"))
                root.classList.remove("worldmap-background");
        }

        // Recalculate the bounds
        calculateTransformBounds();

        // Scale transform
        clampCurrentScale();

        // Clamp position
        clampCurrentPos();

        updateTransformPos();
        updateTransformScale();
    }

    // Changes the size to shrink the content scale to completely fit within the available container space
    function scaleToFit()
    {
        // Calculate the largest size that the container can be in the current state
        // Parent width - worldmap margins left/right (30 + 30) - sidebar width minus negative margin (154 - 26) - worldmap-main margin (9 + 9) - worldmap-content-margin (26 + 26)
        // These values shouldn't change unless the style changes, so don't bother "actually" retrieving them
        var maxContainerWidth = rootParent.offsetWidth - (frameMode != "minimal" ? (30 + 30) : 0) - (sidebar.offsetWidth > 0 ? sidebar.offsetWidth - 26 : 0) - (9 + 9) - (26 + 26);
        maxContainerWidth = Math.min(maxContainerWidth, 1084);

        // Transform scale the content to fit the current size of the container, so it doesn't just stay the same size when scaling the window
        // Only do this if the content is fully zoomed out, as to preserve zoom level if the user has zoomed in
        if (Math.abs(scaleFactor - getMinScale()) < 0.001)
        {
            scaleFactor = maxContainerWidth / content.scrollWidth;
            scaleDirty = true;
        }

        // Physically resize in width/height
        // The resize is needed so the container shrinks to fit the scaled down content
        content.style.width = maxContainerWidth + "px";
        content.style.height = ((content.scrollHeight / content.scrollWidth) * maxContainerWidth) + "px";
    }

    function getMinScale()
    {
        var minScaleX = container.offsetWidth / content.scrollWidth;
        var minScaleY = container.offsetHeight / content.scrollHeight;
        return Math.max(minScaleX, minScaleY);
    }

    // Clamp the scale so that the content is never smaller than the container
    function clampCurrentScale()
    {
        scaleFactor = clampScale(scaleFactor);
        zoomedOut = scaleFactor >= getMinScale();
    }

    // Clamp the scale so that the content is never smaller than the container
    function clampScale(value)
    {
        var minScale = getMinScale();

        if (value < minScale)   value = minScale;
        if (value >= MAX_SCALE) value = MAX_SCALE;

        return value;
    }

    function clampCurrentPos()
    {
        pos = clampPos(pos, scaleFactor);
    }

    // Clamps a transform:translate position so that all edges of the content appear outside
    // of the container, and not within the viewport.
    // Also handles atXEdge boolean setting
    // clampPos() relies on scaleFactor and bounds. These should be finalized before clamping
    function clampPos(pos, scaleFactor)
    {
        // Get the size of the container "viewport" in scaled units
        var containerWidthScaled = (container.clientWidth * (1 / scaleFactor));
        var containerHeightScaled = (container.clientHeight * (1 / scaleFactor));
        var containerHalfWidthScaled = containerWidthScaled / 2;
        var containerHalfHeightScaled = containerHeightScaled / 2;

        if (pos.x + containerHalfWidthScaled > bounds.left)    pos.x = bounds.left - containerHalfWidthScaled;
        if (pos.x - containerHalfWidthScaled < bounds.right)   pos.x = bounds.right + containerHalfWidthScaled;
        if (pos.y + containerHalfHeightScaled > bounds.top)    pos.y = bounds.top - containerHalfHeightScaled;
        if (pos.y - containerHalfHeightScaled < bounds.bottom) pos.y = bounds.bottom + containerHalfHeightScaled;

        // Here we just check if the pos is "close" to the edges.
        // This is not related to clamping, but we might as well take advantage of the values calculated here
        atLeftEdge = pos.x + containerHalfWidthScaled + 10 >= bounds.left;
        atRightEdge = pos.x - containerHalfWidthScaled - 10 <= bounds.right;
        atTopEdge = pos.y + containerHalfHeightScaled + 10 >= bounds.top;
        atBottomEdge = pos.y - containerHalfHeightScaled - 10 <= bounds.bottom;

        return pos;
    }

    // Clamp an unscaled pixel position so that if the map is centered on it,
    // all the edges of the map will be outside the edge of the container
    function clampPixelPos(pos, scaleFactor)
    {
        var containerWidth = container.clientWidth;
        var containerHeight = container.clientHeight;
        var containerHalfWidth = containerWidth / 2;
        var containerHalfHeight = containerHeight / 2;

        var containerWidthScaled = containerWidth * (1 / scaleFactor);
        var containerHeightScaled = containerHeight * (1 / scaleFactor);
        var containerHalfWidthScaled = containerWidthScaled / 2;
        var containerHalfHeightScaled = containerHeightScaled / 2;

        if (pos.x < containerHalfWidthScaled)
            pos.x = containerHalfWidthScaled;
        if (pos.x > content.scrollWidth - containerHalfWidthScaled)
            pos.x = content.scrollWidth - containerHalfWidthScaled;
        if (pos.y < containerHalfHeightScaled)
            pos.y = containerHalfHeightScaled;
        if (pos.y > content.scrollHeight - containerHalfHeightScaled)
            pos.y = content.scrollHeight - containerHalfHeightScaled;

        return pos;
    }
        

    // Calculate the left/right/top/bottom coordinates in transform space
    function calculateTransformBounds()
    {
        var containerHalfWidth = container.clientWidth / 2;
        var containerHalfHeight = container.clientHeight / 2;

        // Calculate the bounds of the content in content transform space
        bounds.left = containerHalfWidth;
        bounds.right = containerHalfWidth - content.scrollWidth;
        bounds.top = containerHalfHeight;
        bounds.bottom = containerHalfHeight - content.scrollHeight;
    }

    // Updates the transform of the content given the current pos
    function updateTransformPos()
    {
        // The order of operations here is extremely important
        content.style.transform = "translate(" + pos.x + "px, " + pos.y + "px)";
    }

    // Updates the transform of the contentScaler given the current scaleFactor
    function updateTransformScale()
    {
        contentScaler.style.transform = "scale(" + scaleFactor + ")";

        if (scaleDirty)
        {
            scaleMapNodes();
            scaleDirty = false;
        }
    }

    // Converts a position in real unscaled pixel space (size of the original content)
    // to a position in "scaled" transform pixel space for use in the transform translate.

    // When the "camera" is in the top left at scaleFactor 1 the translate is 0,0
    // This does not change when zooming in, however the camera will no longer be in the "top left"
    // Instead, the top left is now represented as a position offset (-X,+Y) by the size
    // difference caused by the change in scale.
    
    // Note that this is simply a shift of all coordinates so that the 0,0 is in the center
    // (might be able to simplify the logic below based on this observation)
    function contentPositionToTransformPosition(x, y)
    {
        // Determine the range of transform values, keeping in mind:
        // 0,0 is the center of the viewport when the "camera" is in the top left at scaleFactor 1
        // +X moves the content right, making the center of the container appear towards the left of the content
        // +Y moves the content up, making the center of the container appear toward the bottom
        var left = container.clientWidth / 2;
        var right = left - content.clientWidth;
        var top = container.clientHeight / 2;
        var bottom = top - content.clientHeight;

        // Next simply scale from a range 0 to content size

        // This function just scales from one range to another
        var scaleFloat = (value, fromMin, fromMax, toMin, toMax) => (toMax - toMin) * (value - fromMin) / (fromMax - fromMin) + toMin;

        var tx = scaleFloat(x, 0, content.scrollWidth, left, right);
        var ty = scaleFloat(y, 0, content.scrollWidth, top, bottom);

        return { x:tx, y:ty };
    }

    // This may just be the same as the above (lol)
    function unscaledPositionToTransformPosition(x, y)
    {
        return {x: -(x - (container.clientWidth * 0.5)),
                y: -(y - (container.clientHeight * 0.5)) };
    }

    // Calculates the unscaled position of an element, typically a mapnode, within the content
    // The position is in pixel units, but has decimal precision
    function getUnscaledPositionOfElement(element)
    {
        var pos = { x:undefined, y:undefined };

        // Check if the element contains left/top style attributes
        if (element.style.left != "") pos.x = parseFloat(element.style.left);
        if (element.style.top != "")  pos.y = parseFloat(element.style.top);

        // Otherwise determine the position using getBoundingClientRect, which needs to be scaled back
        // to pixel units, since it changes with scale
        if (pos.x == undefined || pos.y == undefined)
        {
            var elementRect = element.getBoundingClientRect();
            var contentRect = content.getBoundingClientRect();

            // This just changes the position to be relative to the top/left of the content
            // as well as centering it in the center of the elementRect, instead of the corner
            // The last multiplication changes the coordinate from scaled to unscaled
            pos.x = (elementRect.x - contentRect.x + (elementRect.width / 2)) * (1 / scaleFactor);
            pos.y = (elementRect.y - contentRect.y + (elementRect.height / 2)) * (1 / scaleFactor);
        }

        return pos;
    }

// Rect functions

    function isRectFullyWithinRect(inner, outer)
    {
        return (inner.left > outer.left &&
                inner.right < outer.right &&
                inner.top > outer.top &&
                inner.bottom < outer.bottom);
    }

    function getBoundingClientRectPlusOverflow(element)
    {
        var elementRect = element.getBoundingClientRect();
        var rects = [ elementRect ];

        for (var i = 0; i < element.childNodes.length; i++)
            rects.push(element.childNodes[i].getBoundingClientRect());

        elementRect = combineBoundingRectsList(rects);
        return elementRect;
    }

    // Converts a rect from viewport space (directly from getBoundingClientRect) to one which is in
    // the coordinate space of the map, relative to the content
    function clientRectToMapRect(rect)
    {
        const contentRect = content.getBoundingClientRect();
        const inverseScale = 1 / scaleFactor;

        return new DOMRect
        (
            (rect.x - contentRect.x) * inverseScale,
            (rect.y - contentRect.y) * inverseScale,
            rect.width * inverseScale,
            rect.height * inverseScale
        );
    }

    function combineBoundingRects(a, b)
    {
        combineBoundingRectsList([a, b]);
    }

    function combineBoundingRectsList(rects)
    {
        var left = Number.MAX_VALUE;
        var right = Number.MIN_VALUE;
        var top = Number.MAX_VALUE;
        var bottom = Number.MIN_VALUE;

        for (var i = 0; i < rects.length; i++)
        {
            if (rects[i].left < left)       left = rects[i].left;
            if (rects[i].right > right)     right = rects[i].right;
            if (rects[i].bottom > bottom)   bottom = rects[i].bottom;
            if (rects[i].top < top)         top = rects[i].top;
        }

        return new DOMRect(left, top, right - left, bottom - top);
    }

    function scaleRect(rect, scale)
    {
        rect.x = rect.x * scale;
        rect.y = rect.y * scale;
        rect.width = rect.width * scale;
        rect.height = rect.height * scale;

        return rect;
    }

    function addPaddingToRect(rect, padding)
    {
        rect.x -= padding;
        rect.width += padding * 2;
        rect.y -= padding;
        rect.height += padding * 2;

        return rect;
    }

// Map position/scale animation

    function resetPositionAndScale()
    {
        var scale = getMinScale();
        scaleMapToValue(scale);
        var pos = { x:content.scrollWidth / 2, y:content.scrollHeight / 2 };
        centerOnPosition(pos.x, pos.y);
    }

    // Animates the worldmap transform:translate to center on a specific element
    // The element must be contained within the content
    function centerOnElement(element, onComplete = null)
    {
        // Do not center if the element is null or is not contained within the worldmap content
        if (element == null || !content.contains(element))
        {
            if (onComplete != null) onComplete();
            return;
        }

        var scale = MAX_SCALE;
        scaleMapToValue(scale);

        var pos = getUnscaledPositionOfElement(element);
        pos = clampPixelPos(pos, scale);
        centerOnPosition(pos.x, pos.y, onComplete);
    }

    // Animates the worldmap transform:translate to center on a number of elements
    // The position is centered on the average of all positions,
    // The scale is set so they all fit within the edges of the map
    function centerOnElements(elements, onComplete)
    {
        // We accomplish this by creating a rect encompassing all nodes
        var rects = [];

        for (var i = 0; i < elements.length; i++)
            rects.push(getBoundingClientRectPlusOverflow(elements[i]));

        // Combine all rects.
        var rect = combineBoundingRectsList(rects);

        // Convert client rect to map rect
        rect = clientRectToMapRect(rect);

        // Add some padding to the rect
        rect = addPaddingToRect(rect, 8);

        centerOnRect(rect, onComplete);
    }

    // Animates the transform to center the map on a number of elements, by averaging their positions

    // Animates the transform:translate AND transform:scale to center on, and to fit a
    // rectangle (in scaled coordinates) such that all four sides are within the map container
    // Assumes that the rectangle is directly from getBoundingClientRect(), and is not relative
    // to the content, container, and has not been adjusted to account for the scale
    function centerOnClientRect(elementRect, onComplete = null)
    {
        var rect = clientRectToMapRect(elementRect);
        centerOnRect(rect, onComplete);
    }

    // Animates the transform:translate AND transform:scale to center on, and to fit a
    // rectangle (in unscaled coordinates) such that all four sides are within the map container
    function centerOnRect(rect, onComplete = null)
    {
        // Positioning is pretty simple
        // Keep in mind that this is in unscaled pixel units, not transform units
        var x = rect.x + rect.width * 0.5;
        var y = rect.y + rect.height * 0.5;

        // And so is the scale
        var scale = Math.min(container.clientWidth / rect.width, container.clientHeight / rect.height);
        scale = clampScale(scale);
        
        var pos = clampPixelPos({x:x, y:y}, scale);

        scaleMapToValue(scale);
        centerOnPosition(pos.x, pos.y, onComplete);
    }

    // Animates the transform:translate to center on the input unscaled position (within the size of the background image)
    // The position is not clamped! This has to be done by the calling function with clampPos
    function centerOnPosition(x, y, onComplete = null)
    {
        var from = {x: pos.x, y: pos.y };
        var to = unscaledPositionToTransformPosition(x, y);

        // Calculate the duration based on the distance between the two points,
        // effectively making this a speed-based animation
        var offset = { x: to.x - from.x, y: to.y - from.y };
        var magnitude = Math.sqrt((offset.x * offset.x) + (offset.y * offset.y));
        //var duration = magnitude / 500 * 1000;

        // Skip animating if the end position is < 100px away
        if (Math.abs(magnitude) < 100)
        {
            if (onComplete != null) onComplete();
        }

        // This is a jQuery animation on a value going from from to to
        // with a step function which sets the pos and subsequently the transform style
        $({ x:from.x, y:from.y} ).animate({ x:to.x, y:to.y },
        {
            duration: 500,
            step: function(now, fx)
            {
                // Update actual position in the step function
                // Keep in mind jQuery calls step for each property being animated
                // So we only update the transform on y
                if (fx.prop == "x") pos.x = now;
                if (fx.prop == "y")
                {
                    pos.y = now;
                    updateTransformPos();
                }
            },
            complete: function()
            {
                if (onComplete != null) onComplete();
            }
        });
    }

    // Animates the scale to a specific value
    function scaleMapToValue(scale, onComplete = null)
    {
        //scale = clampScale(scale);
        
        var from = scaleFactor;
        var to = scale;

        // Animate from the current scale to the new scale
        $({ n:from } ).animate({ n:to },
        {
            duration: 500,
            step: function(now, fx)
            {
                scaleFactor = now;
                updateTransformScale();
                scaleMapNodes();
            },
            complete: function()
            {
                if (onComplete != null) onComplete();
            }
        });
    }

    function scaleMapNodes()
    {
        mapNodes.forEach(function(n)
        {
            // Because we can't set transforms individually, we need to modify the existing transform
            // string to replace the existing scale (if any) with a new one, while retaining other transforms
            var transforms = [ "scale(" + (1.0 / scaleFactor) + ")" ];

            var start = 0;
            var depth = 0;

            // Loop through the string and find transforms using brackets - e.g. "scale(...)"
            for (let i = 0; i < n.style.transform.length; i++)
            {
                if (n.style.transform[i] == '(')
                    depth++;
                else if (n.style.transform[i] == ")")
                {
                    // Detect returning to depth 0 (closure of bracket)
                    if (depth == 1)
                    {
                        let str = n.style.transform.substring(start, i + 1).trim();

                        if (!str.startsWith("scale"))
                            transforms.unshift(str);

                        start = i + 1;
                    }

                    depth--;
                }
            }

            // Construct a new transform string with all of the existing (non-scale) transforms
            n.style.transform = transforms.join(" ");
        });
    }
})();