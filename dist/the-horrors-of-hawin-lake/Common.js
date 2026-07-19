/* =========
	ARTICLE
   ========= */
// Apply "vanilla" Fandom data-set tooltips to various buttons
/* Article Page Action buttons */
var articleButtons = document.querySelectorAll(".page-header__actions > .page-header__action-button");

articleButtons.forEach(function(e) {
	var tooltipText = e.textContent.trim();
	
	if (e.querySelector(".page-header__collections-text-main")) {
		tooltipText = e.querySelector(".page-header__collections-text-main").textContent.trim();
	}
	
	applyTooltip(e, tooltipText, "bottom");
});

/* Activity Summary Help button */
var activityHelpButton = document.querySelector(".activity-summary a.wds-button");
applyTooltip(activityHelpButton, "Help", "bottom");



/* ===========
	FUNCTIONS
   =========== */
// Cleaned up and simplified re-implementation of Fandom's built-in dataset tooltips
// Done for the purposes of expanding accessibility and being as close to the "vanilla" Fandom look as possible

/* Modifies and appends tooltip child node */
/* { NODE: Element receiving tooltip, NODE: Tooltip element to append } */
function showTooltip(targetElement, tooltipElement) {
	var tooltipPosition = targetElement.dataset.wdsTooltipPosition;
	var tooltipRect     = targetElement.getBoundingClientRect();
	
	tooltipElement.remove();
	tooltipElement.setAttribute("class", "wds-tooltip");
	tooltipElement.textContent = targetElement.dataset.wdsTooltip || "";
	tooltipElement.classList.add("is-" . concat(tooltipPosition));
	
	switch (tooltipPosition) {
		case "top":
            tooltipElement.style.top  = "" . concat(tooltipRect.top - 6, "px");
            tooltipElement.style.left = "" . concat((tooltipRect.right - tooltipRect.left) / 2 + tooltipRect.left, "px");
			break;
			
		case "left":
            tooltipElement.style.left = "".concat(tooltipRect.left - 6, "px");
            tooltipElement.style.top  = "".concat((tooltipRect.bottom - tooltipRect.top) / 2 + tooltipRect.top, "px");
			break; 
			
		case "right":
			tooltipElement.style.left = "" . concat(tooltipRect.right + 6, "px");
            tooltipElement.style.top  = "" . concat((tooltipRect.bottom - tooltipRect.top) / 2 + tooltipRect.top, "px");
			break;
			
		case "bottom":
            tooltipElement.style.top  = "".concat(tooltipRect.bottom + 6, "px");
            tooltipElement.style.left = "".concat((tooltipRect.right - tooltipRect.left) / 2 + tooltipRect.left, "px");
			break;
	}
	
	document.body.appendChild(tooltipElement);
}

/* Hides tooltip */
/* { NODE: Tooltip element to remove } */
function hideTooltip(tooltipElement) {
	tooltipElement.remove();
}

/* Adds eventListeners to target element to handle showing/hiding of tooltip */
/* { NODE: Element to receive tooltip } */
function handleElementWithTooltip(targetElement) {
    if (!targetElement.dataset.tooltipAttached && targetElement.dataset.wdsTooltip) {
        var tooltipElement = document.createElement("div");
        
        targetElement.addEventListener("mouseenter", function() {
            showTooltip(targetElement, tooltipElement);
        });
        
        targetElement.addEventListener("focus", function() {
            showTooltip(targetElement, tooltipElement);
        });
        
        targetElement.addEventListener("mouseleave", function() {
            hideTooltip(tooltipElement);
        });
        
        targetElement.addEventListener("blur", function() {
            hideTooltip(tooltipElement);
        });
        
        targetElement.addEventListener("click", function() {
            hideTooltip(tooltipElement);
        });
        
        targetElement.dataset.tooltipAttached = "1";
    }
}

/* Add tooltip to specified element */
/* { NODE: Element to receive tooltip, STRING: Text to display on tooltip, STRING: Which side of element tooltip will display on } */
function applyTooltip(targetElement, tooltipText, tooltipPosition) {
    targetElement.removeAttribute("title");
    targetElement.setAttribute("aria-label", tooltipText);
    
    targetElement.dataset.wdsTooltip = tooltipText;
    targetElement.dataset.wdsTooltipPosition = tooltipPosition;
    
    handleElementWithTooltip(targetElement);
}