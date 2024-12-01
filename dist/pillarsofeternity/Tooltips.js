/*

	Tooltips.js
	Author: Macklin

	(Yet another) tooltips script, purpose built for Avowed tooltips, but generic
	enough to be used with anything. This is a partial rewrite of my previous
	implementation (MediaWiki:Tooltip.js) to simplify it somewhat.

	Documentation can be found at Template:Tooltips

*/
(function()
{
	// Exit early if the script has already run
	window.dev = window.dev || {};
	if (window.dev.tooltips) return;
	
	function hashFromString(str)
	{
		var hash = 0;
	
		str = str.toString();
	
		for (var i = 0; i < str.length; i++)
		{
			hash = ((hash << 5) - hash) + str.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}
	
		return hash;
	}
		
	
	/* === Caching === */
		
	
	// Get the cache of parsed tooltips
	var currentTime = Math.floor(Date.now() / 1000);
	var tooltipCacheExpiry = 604800; // 1 week in seconds
	var tooltipStorageKey = mw.config.values.wgDBname + "_tooltip_cache";
	var tooltipCache = JSON.parse(localStorage.getItem(tooltipStorageKey));
	var tooltipCacheDirty = false;
	
	// If we don't yet have a cache, create it (it'll be stored later if we actually add anything)
	if (tooltipCache == null || typeof tooltipCache != "object")
		tooltipCache = {};
	
	// Trim the cache
	for (var key in tooltipCache)
	{
		// Remove any cached wikitext that has expired
		if ((tooltipCache[key].expiry || 0) - currentTime < 0)
		{
			delete tooltipCache[key];
			tooltipCacheDirty = true;
		}
	}
	
	// Detect tab unload so we can save the cached tooltips
	window.addEventListener("beforeunload", function(e)
	{
		if (tooltipCacheDirty) localStorage.setItem(tooltipStorageKey, JSON.stringify(tooltipCache));
	});
	
		
	/* === Tooltip class === */
	
	
	var Tooltip = function(content)
	{
		tooltips.allTooltips.push(this);
		
		this.onMouseMove = this.onMouseMove.bind(this);
		this.toggleLock = this.toggleLock.bind(this);
		
		// This element will house the content and be positioned
		this.overlay = document.createElement("div");
		this.overlay.className = "tooltip-overlay";
	
		// Bind the overlay itself to act as a toggle when the cursor leaves it
		this.overlay.addEventListener("mouseleave", this.triggerLeave.bind(this));
	
		if (content)
		{
			this.content = content;
			this.content.classList.add("tooltip-content");
			if (content.id)
			{
				this.id = this.content.id;
				this.content.removeAttribute("id");
			}
	
			// While the content element is still in position, collect the triggers for it
			this.collectTriggers(this.content);
			
			// Add the content to the overlay, if any exists
			this.overlay.append(this.content);
		
			// Remove the tooltip content from the DOM
			content.remove();
		}
	};
	
	// Creates a tooltip given a tooltip container
	// The container can have a child tooltip, or a tooltip referenced by ID, or a template used to create a tooltip
	Tooltip.fromContainer = function(container)
	{
		if (!container.classList.contains("tooltip-container"))
			return;
	
		var tooltipElem = container.querySelector(".tooltip-content");
	
		var hasTooltipChild = tooltipElem != null;
		var hasTooltipID = "tooltipId" in container.dataset;
		var hasTooltipTemplate = "tooltipTemplate" in container.dataset;
		
		var tooltip;
	
		if (hasTooltipChild)
		{
			tooltip = Tooltip.fromElement(tooltipElem);
	
			if (hasTooltipID)
			{
				console.error("Cannot specify both a child tooltip and a data-tooltip-id. Only the former will be used.");
				container.removeAttribute("data-tooltip-id");
			}
			if (hasTooltipTemplate)
			{
				console.error("Cannot specify both a child tooltip and a data-tooltip-template. Only the former will be used.");
				container.removeAttribute("data-tooltip-template");
			}
		}
		else if (hasTooltipID)
		{
			tooltipElem = document.getElementById(container.dataset.tooltipId);
	
			if (tooltipElem)
				tooltip = Tooltip.fromElement(tooltipElem);
			else
			{
				console.error("A data-tooltip-id was specified, but no tooltip-content element with that ID was found on the page");
				container.removeAttribute("data-tooltip-id");
			}
			if (hasTooltipTemplate)
			{
				console.error("Cannot specify both a child tooltip and a data-tooltip-template. Only the former will be used.");
				data.removeAttribute("data-tooltip-template");
			}
		}
		else if (hasTooltipTemplate)
		{
			tooltip = Tooltip.fromTemplate(container.dataset.tooltipTemplate, container.dataset.tooltipParams);
			delete container.dataset.tooltipTemplate;
			delete container.dataset.tooltipParams;
		}
	
		if (tooltip)
		{
			// Bind the container to the tooltip
			tooltip.bindTrigger(container);
		}
	
		return tooltip;
	};
	
	// Create a tooltip from the content element on the page
	Tooltip.fromElement = function(elem)
	{
		if (!elem.classList.contains("tooltip-content"))
			return;
	
		// If this element is shared by another Tooltip, reuse that other Tooltip
		var duplicateTooltip = tooltips.allTooltips.find(function(t){ return t.elem == elem; });
		if (duplicateTooltip) return duplicateTooltip;
		
		var tooltip;
	
		var hasTooltipTemplate = "template" in elem.dataset;
		var hasContent = elem.childNodes.length > 0;
		
		if (hasTooltipTemplate)
		{
			if (hasContent)
			{
				elem.replaceChildren();
				console.warning("Tooltip with the template \"" + elem.dataset.template + "\" and params \"" + elem.dataset.params + "\" is not empty, but has supplied template parameters. The content in the element will be deleted.");
			}
			
			tooltip = Tooltip.fromTemplate(elem.dataset.template, elem.dataset.params, elem);
			delete elem.dataset.template;
			delete elem.dataset.params;
		}
		else
		{
			tooltip = new Tooltip(elem);
		}
		
		return tooltip;
	};
	
	// Create a tooltip from a template and params
	Tooltip.fromTemplate = function(template, params, tooltipElem)
	{
		var templateTitle = mw.Title.newFromText(template, 10);
		
		// Error if the title wasn't valid
		if (templateTitle == null)
		{
			console.error("data-tooltip-template " + template + " is not a valid template title");
			return;
		}
		
		// Create a template call from data-tooltip-template and data-tooltip-params
		var wikitext = "{{" + templateTitle.getMainText() + (params != null ? "|" + params : "") + "}}";
		var wikitextKey = hashFromString(wikitext);
	
		// Find an existing tooltip with the same wikitext
		tooltip = tooltips.allTooltips.find(function(t){ return wikitextKey == t.wikitextKey; });
	
		// Otherwise create a new tooltip
		if (!tooltip)
		{
			tooltip = new Tooltip();
			tooltip.wikitext = wikitext;
			tooltip.wikitextKey = wikitextKey;
		}
		else if (tooltipElem)
		{
			tooltip.collectTriggers(tooltipElem);
			tooltipElem.remove();
		}
		
		return tooltip;
	};
	
	Tooltip.prototype =
	{
		// Collect the triggers either for the tooltip element itself, or for a specified element
		collectTriggers: function(elem)
		{
			if (!elem) return;
			
			// If the element was a child of a container, that container is a trigger
			var containerByParent = elem.closest(".tooltip-container");
			if (containerByParent) this.bindTrigger(containerByParent);
			
			// If the tooltip has an ID, it's likely referenced with a data-tooltip-id on a container
			if (this.id)
			{
				var containersById = document.querySelectorAll(".tooltip-container[data-tooltip-id=\"" + this.id + "\"]");
				
				if (containersById.length > 0)
				{
					// Add the containers to the tooltip
					for (var i = 0; i < containersById.length; i++)
						this.bindTrigger(containersById[i]);
				}
			}
		},
		
		// Binds the tooltip to a container trigger, such that when the container is hovered
		// over, the tooltip is shown, and it is repositioned to match the container
		bindTrigger: function(trigger)
		{
			trigger.addEventListener("mouseover", this.triggerEnter.bind(this));
			trigger.addEventListener("mouseleave", this.triggerLeave.bind(this));

			// Toggle pointer-events of trigger off and on after 100ms
			// This is so that if the user is already hovering over the trigger
			// before the events are added, the tooltip will still be shown
			trigger.style.pointerEvents = "none";
			setTimeout(function(){ trigger.style.removeProperty("pointer-events"); }, 100);
		},
	
		fetchContent: function()
		{
			if (!this.wikitext) return;
			
			// If we're already performing a parse request, return
			if (this.requesting) return;
			this.requesting = true;
	
			var promise;
	
			// Check for an existing tooltip in the cache first, using the key we generated earlier
			if (this.wikitextKey in tooltipCache && tooltipCache[this.wikitextKey].html != null)
			{
				promise = Promise.resolve(tooltipCache[this.wikitextKey].html);
			}
	
			// Otherwise parse the wikitext
			else
			{
				var urlParams = new URLSearchParams(
				{
					format: "json",
					formatversion: 2,
					maxage: 259200, // 3 days in seconds
					smaxage: 259200,
					action: "parse",
					prop: "text",
					contentmodel: "wikitext",
					disablelimitreport: 1,
					pst: 1,
					wrapoutputclass: "",
					useskin: "fandomdesktop",
					uselang: "en",
					text: this.wikitext
				});
		
				promise = fetch(mw.config.values.wgServer + "/api.php?" + urlParams.toString())
				.then(function(response){ return response.json(); })
				.then(function(data)
				{
					var htmlText = data.parse.text;
	
					// Save the newly-parsed HTML to the tooltipCache
					tooltipCache[this.wikitextKey] =
					{
						expiry: Math.floor(Date.now() / 1000) + tooltipCacheExpiry,
						html: htmlText
					};
	
					tooltipCacheDirty = true;
					return htmlText;
					
				}.bind(this));
			}
	
			promise.then(function(htmlText)
			{
				this.content = document.createElement("div");
				this.content.className = "tooltip-content";
				this.content.innerHTML = htmlText;
	
				// If the immediate child of the parent is a tooltip-content, use that instead
				var child = this.content.querySelector(":scope > .tooltip-content");
				if (child != null)
				{
					child.remove();
					this.content.remove();
					this.content = child;
				}
	
				// Then, add the content to the overlay
				this.overlay.append(this.content);
				this.updatePosition();
	
				createRankStatTriggers(this.content);
				
				this.created = true;
				this.requesting = false;
				
			}.bind(this));

			return promise;
		},
	
		// Fires then a mouse moves into a tooltip container
		triggerEnter: function(e)
		{
			// Don't enter when shift key is held
			if (e.shiftKey) return;
			
			var container = e.currentTarget;
			this.showTooltip(container, e);
		},
	
		// Fires then a mouse leaves a tooltip container
		triggerLeave: function(e)
		{
			// Don't leave when shift is held
			if (e.shiftKey) return;
			
			// Don't leave if the mouse is within the tooltip itself
			// This can happen if the user has locked the tooltip with the shift key
			if (this.overlay.contains(e.relatedTarget))
				return;
			
			this.hideTooltip();
		},
	
		showTooltip: function(container, e)
		{
			// If this tooltip is already active, don't do anything
			if (tooltips.activeTooltip == this) return;
			
			// If another tooltip is showing, hide it
			if (tooltips.activeTooltip != null)
				tooltips.activeTooltip.hideTooltip();
				
			// Start a request if one hasn't already started
			if (this.wikitext && !this.created && !this.requesting)
			{
				this.fetchContent().then(function(){ createRankStatTriggers(container); });
			}
			
			// Append the overlay to the document body
			document.body.append(this.overlay);
			
			if (container)
			{
				this.container = container;
	
				// Right now we always follow the cursor
				this.followCursor = true;
		
				// Set the active class on the container
				container.classList.add("tooltip-container-active");
		
				// Set position
				if (this.followCursor)
				{
					this.onMouseMove(e);
		
					// Add mousemove listener to update position when the user moves the mouse
					container.addEventListener("mousemove", this.onMouseMove);
				}
				else
				{
					this.updatePosition();
				}
			}
			
			this.active = true;
			tooltips.activeTooltip = this;
	
			// Listen to keydown and keyup event on document
			document.addEventListener("keydown", this.toggleLock);
	
			// As a last step, make the tooltip visible.
			this.overlay.classList.add("tooltip-visible");
		},
	
		hideTooltip: function()
		{
			if (this.container)
			{
				// Remove the tooltip shown flag from the container
				this.container.classList.remove("tooltip-container-active");
		
				// Stop listening to the mousemove event on the container
				if (this.followCursor) this.container.removeEventListener("mousemove", this.onMouseMove);
	
				// Remove the reference to the container
				this.container = null;
			}
	
			// Unset the tooltip as active
			this.active = false;
			if (tooltips.activeTooltip == this)
				tooltips.activeTooltip = null;
	
			// Remove any lock on the tooltip
			this.toggleLock(false);
			
			// Stop listening to keydown event on document
			document.removeEventListener("keydown", this.toggleLock);
			
			this.overlay.classList.remove("tooltip-visible");
			this.overlay.remove();
		},
	
		updatePosition: function()
		{
			if (!this.active || this.lock) return;
			
			var tooltipRect = this.overlay.getBoundingClientRect();
			var containerRect = this.container.getBoundingClientRect();
			var x, y;
			
			if (this.followCursor)
			{
				x = this.mouseMoveEvent.pageX;
				y = this.mouseMoveEvent.pageY;
			}
			else
			{
				x = window.scrollX + containerRect.x;
				y = window.scrollY + containerRect.y;
			}
	
			// Flip based on the half of the viewport the position (minus half the container size) is in
			//var flipX = this.mouseMoveEvent.clientX >= (document.documentElement.clientWidth / 2);
			var flipY = this.mouseMoveEvent.clientY >= (document.documentElement.clientHeight / 2);
	
			// Flip based on whether the tooltip is overflowing the right or bottom edge of the viewport to begin with
			var flipX = this.mouseMoveEvent.clientX + tooltipRect.width >= document.documentElement.clientWidth;
			//var flipY = this.mouseMoveEvent.clientY + tooltipRect.height >= document.documentElement.clientHeight;
	
			// Get the amount that the tooltip protrudes over the right and bottom edge of the screen
			var overflowX = flipX ? Math.min(this.mouseMoveEvent.clientX - tooltipRect.width, 0)
								  : Math.max(this.mouseMoveEvent.clientX + tooltipRect.width - document.documentElement.clientWidth, 0);
			var overflowY = flipY ? Math.min(this.mouseMoveEvent.clientY - tooltipRect.height, 0)
								  : Math.max(this.mouseMoveEvent.clientY + tooltipRect.height - document.documentElement.clientHeight, 0);
			
			if (overflowX > 0)
				x = (window.scrollX + document.documentElement.clientWidth) - tooltipRect.width;
			else if (overflowX < 0)
				x = window.scrollX + tooltipRect.width;
			if (overflowY > 0)
				y = (window.scrollY + document.documentElement.clientHeight) - tooltipRect.height;
			else if (overflowY < 0)
				y = window.scrollY + tooltipRect.height;
			
			this.overlay.style.removeProperty("left");
			this.overlay.style.removeProperty("top");
	
			// Positioning with a transform as opposed to left/top forces a GPU render
			var transform = "translate(" + x + "px, " + y + "px)";
			if (flipX) transform += " translateX(-100%)";
			if (flipY) transform += " translateY(-100%)";
			this.overlay.style.transform = transform;
		},
	
		onMouseMove: function(e)
		{
			this.mouseMoveEvent = e;
			this.updatePosition();
		},
		
		toggleLock: function(e)
		{
			var lock = typeof e == "boolean" ? e :
					   e.type == "keydown" && e.key == "Shift" ? true :
					   e.type == "mouseleave" ? false : null;
	
			if (lock == true)
			{
				document.dispatchEvent(new KeyboardEvent('keyup',{'key':'Shift'}));
			}
	
			if (lock == null) return;
			
			this.lock = lock;
			this.overlay.classList.toggle("tooltip-locked", lock);
		}
	};
	

	/* === Tooltip store (in window.dev) === */
	

	var tooltips = window.dev.tooltips =
	{
		// A collection of all tooltips
		allTooltips: [],
		
		// The currently-active tooltip
		activeTooltip: null,

		// The store of parsed tooltip wikitext
		cache: tooltipCache,
		cacheKey: tooltipStorageKey,

		Tooltip: Tooltip
	};
	
	
	/* === Initialization == */
	
	
	function initTooltips()
	{
		var tooltipElements = Array.from(document.querySelectorAll(".tooltip-content"));
		var tooltipContainers = Array.from(document.querySelectorAll(".tooltip-container"));
		var tooltipOverlay;
		
		tooltipContainers.forEach(function(container)
		{
			var tooltip = Tooltip.fromContainer(container);
		});
		
		tooltipElements.forEach(function(element)
		{
			var tooltip = Tooltip.fromElement(element);
		});
	}
	
	if (document.readyState == "loading")
		document.addEventListener("readystatechange", initTooltips);
	else
		initTooltips();

})();