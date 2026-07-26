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



/* =========================
	TOOLTIP FADE TRANSITION
   ========================= */
// Allows tooltips to fade out using CSS-defined transitions as a basis
var nativeRemove  = Element.prototype.remove;
var nativeAppend  = Element.prototype.appendChild;
var computedStyle = window.getComputedStyle(document.body);
var removeTimers  = new WeakMap();
var tooltipFadeSpeed  = computedStyle.getPropertyValue("--custom-tooltip-speed");
	tooltipFadeSpeed  = parseInt(tooltipFadeSpeed);
var tooltipFadeOffset = computedStyle.getPropertyValue("--custom-tooltip-offset");

// Intercept tooltip element removal to handle fade transition
Element.prototype.remove = function() {
	// Retain native .remove() functionality if not dataset tooltip
	if (!this.matches(".wds-tooltip")) {
		return nativeRemove.call(this);
	}
	
	if (removeTimers.has(this)) {
		return;
	}
	
	var tooltipClasslist = this.classList;
	this.style.setProperty("opacity", "0");
	
	switch (true) {
		case tooltipClasslist.contains("is-top"):
			this.style.setProperty("margin-top", tooltipFadeOffset);
	        break;
		case tooltipClasslist.contains("is-left"):
			this.style.setProperty("margin-left", tooltipFadeOffset);
	        break;
		case tooltipClasslist.contains("is-right"):
			this.style.setProperty("margin-left", "calc(" + tooltipFadeOffset + " * -1)");
	        break;
	    case tooltipClasslist.contains("is-bottom"):
			this.style.setProperty("margin-top", "calc(" + tooltipFadeOffset + " * -1)");
	        break;
	    default: // Fallback
	        nativeRemove.call(this);
	}
	
	// Allow time for transition before calling .remove()
	var tooltipRemoveTimer = setTimeout(() => {
		removeTimers.delete(this);
		nativeRemove.call(this);
	}, tooltipFadeSpeed);
	
	removeTimers.set(this, tooltipRemoveTimer);
};


// Intercept tooltip element creation to handle fade transition
Node.prototype.appendChild = function(child) {
	if (child instanceof Element && child.matches(".wds-tooltip")) {
		var tooltipRemoveTimer = removeTimers.get(child);
		
		if (!tooltipRemoveTimer || tooltipRemoveTimer == undefined) {
			return nativeAppend.call(this, child);
		}
		
		clearTimeout(tooltipRemoveTimer);
		removeTimers.delete(child);
		child.style.removeProperty("opacity");
		child.style.removeProperty("margin-top");
		child.style.removeProperty("margin-left");
		child.style.removeProperty("margin-right");
		child.style.removeProperty("margin-bottom");
	}

	return nativeAppend.call(this, child);
};



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