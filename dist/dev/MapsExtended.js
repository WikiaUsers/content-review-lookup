/*

    MapsExtended.js
    Author: Macklin

    Provides a framework for extending Interactive Maps, adding some useful functions in the process

*/
(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
    function mx()
    {
        var urlParams = new URLSearchParams(window.location.search);
        var isDebug = urlParams.get("debugMapsExtended") == "1";
        var isDisabled = urlParams.get("disableMapsExtended") == "1";

        if (isDebug)
            var log = console.log.bind(window.console);
        else
            var log = function(){};

        if (isDisabled)
            return;
        
        console.log("Loaded MapsExtended.js!" + (isDebug ? " (DEBUG MODE)" : "") + " (location is " + window.location + ")");

        // Do not run on pages without interactive maps
        var test = document.querySelector(".interactive-maps-container");
        if (test == undefined)
        {
            log("No interactive maps found on page. document.readyState is \"" + document.readyState + "\". Page content element is:\n" + document.querySelector(".page-content").innerHTML.toString());
            return;
        }

        /*
            EventHandler

            This is similar to the event handler model in C#. You can subscribe or "listen" to an event to be notified when it triggered.
            Unlike addEventListener, these events don't need to be attached to elements in the DOM,

            Usage:
            var onSomething = new EventHandler();
            onSomething.subscribe(function(args)
            {
                // This function is called when invoke is called
            })

            onSomething.invoke({ someString: "someValue" });

        */

        function EventHandler(sender) {
            this._sender = sender;
            this._listeners = [];
            this._listenersOnce = [];
        }

        EventHandler.prototype =
        {
            subscribe: function(listener)
            {
                this._listeners.push(listener);
            },
            
            subscribeOnce: function(listener)
            {
                this._listenersOnce.push(listener);
            },
            
            unsubscribe: function(listener)
            {
                var index = this._listeners.indexOf(listener);
                if (index != -1)
                {
                    this._listeners.splice(index, 1);
                    this._listernerParams.splice(index, 1);
                }
            },
            
            invoke: function(args)
            {
                if (this._listeners)
                {
                    for (var i = 0; i < this._listeners.length; i++)
                    {
                        //this._listeners[i](this._sender, args);
                        this._listeners[i](args);
                    }
                }

                if (this._listenersOnce)
                {
                    for (var i = 0; i < this._listenersOnce.length; i++)
                        this._listenersOnce[i](args);

                    this._listenersOnce = [];
                }
            }
        };

        // Deep copies the value of all keys from source to target, in-place and recursively
        // This is an additive process. If the key already exists on the target, it is unchanged.
        // This way, the target is only ever added to, values are never modified or removed
            
        // Arrays are not recursed, and are treated as a value unless recurseArrays is true

        // The string array ignoreList may be used to skip copying specific keys (at any depth) from the source
        function traverseCopyValues(source, target, ignoreList, recurseArrays)
        {
            // Return if the source is empty
            if (!source) return target;

            // Intialize target if it's not defined
            if (!target)
            {
                if (Array.isArray(source))
                    target = [];
                else
                    target = {};
            }
            
            if (typeof source != typeof target)
            {
                console.error("Type mismatch");
                return target;
            }

            if (Array.isArray(source))
            {
                if (!recurseArrays) return target;

                /*
                if (Array.isArray(source) && source.length != target.length)
                {
                    console.error("Length mismatch between source and target");
                    return;
                }
                */
            }

            // This traverses both objects and arrays
            for (var key in source)
            {
                if (!source.hasOwnProperty(key) || (ignoreList && ignoreList.includes(key))) continue;
                
                // Replicate this value on the target if it doesn't exist
                if (target[key] == undefined)
                {
                    // If the source is an object or array, traverse into it and create new values
                    if (typeof source[key] === "object")
                        target[key] = traverseCopyValues(source[key], target[key], ignoreList, recurseArrays);
                    else
                        target[key] = source[key];
                }

                // If the value on the target does exist
                else
                {
                    // If the source is an object or array, traverse into it (non-modify)
                    if (key !== "e" && typeof source[key] === "object")
                        traverseCopyValues(source[key], target[key], ignoreList, recurseArrays);
                }
            }

            return target;
        }

        function capitalizeFirstLetter(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function preventDefault(e){ e.preventDefault(); }
        function stopPropagation(e){ e.stopPropagation(); }

        // This function returns a new function that can only be called once.
        // When the new function is called for the first time, it will call the "fn"
        // function with the given "context" and arguments and save the result.
        // On subsequent calls, it will return the saved result without calling "fn" again.
        function once(fn, context)
        {     
            var result;
            return function()
            { 
                if (fn)
                {
                    result = fn.apply(context || this, arguments);
                    fn = context = null;
                }
                return result;
            };
        }
        
        // This function finds a rule with a specific selector. We do this to modify some built-in rules so they don't have to be redefined
        function findCSSRule(selectorString, styleSheet)
        {
            // helper function searches through the document stylesheets looking for @selectorString
            // will also recurse through sub-rules (such as rules inside media queries)
            function recurse(node, selectorString)
            {
                if (node.cssRules)
                {
                    for (var i = 0; i < node.cssRules.length; i++)
                    {
                        if (node.cssRules[i].selectorText == selectorString)
                            return node.cssRules[i];
                        if (node.cssRules[i].cssRules)
                        {
                            var rule = recurse(node.cssRules[i], selectorString);
                            if (rule) return rule;
                        }
                    }
                }
                
                return false;
            }


            // Find from a specific sheet
            if (styleSheet)
            {
                var rule = recurse(styleSheet, selectorString);
                if (rule) return rule;
            }

            // Find from all stylesheets in document
            else
            {
                for (var i = 0; i < document.styleSheets.length; i++)
                {
                    var sheet = document.styleSheets[i];
                    try
                    {
                        if (sheet.cssRules)
                        {
                            var rule = recurse(sheet, selectorString);
                            if (rule) return rule;
                        }
                    }
                    catch(e)
                    {
                        continue;
                    }
                    
                }
            }
            
            console.error("Could not find a CSS rule with the selector \"" + selectorString + "\"");
            return;
        }

        function getIndexOfCSSRule(cssRule, styleSheet)
        {
            if (!styleSheet.cssRules)
                return -1;
            
            for (var i = 0; i < styleSheet.cssRules.length; i++)
            {
                if (styleSheet.cssRules[i].selectorText == cssRule.selectorText)
                    return i;
            }

            return -1;
        }

        function deleteCSSRule(selector, styleSheet)
        {
            var rule = findCSSRule(selector, styleSheet);

            if (rule != null)
            {
                var ruleIndex = getIndexOfCSSRule(rule, rule.parentStyleSheet);
                rule.parentStyleSheet.deleteRule(ruleIndex);
            }
        }

        // Modifies the first CSS rule found with a <selector> changing it to <newSelector>
        function changeCSSRuleSelector(selector, newSelector, styleSheet)
        {
            var rule = findCSSRule(selector, styleSheet);
            if (rule != null) rule.selectorText = newSelector;
            return rule;
        }

        function appendCSSRuleSelector(selector, additionalSelector, styleSheet)
        {
            var rule = findCSSRule(selector, styleSheet);
            if (rule != null) rule.selectorText = ", " + additionalSelector;
            return rule;
        }

        // Modifies a CSS rule with a <selector>, setting it's new style block declaration entirely
        function changeCSSRuleText(selector, cssText, styleSheet)
        {
            var rule = findCSSRule(selector, styleSheet);
            if (rule != null) rule.style.cssText = cssText;
            return rule;
        }

        // Modifies a CSS rule with a <selector>, setting the value of a specific property
        function changeCSSRuleStyle(selector, property, value, styleSheet)
        {
            var rule = findCSSRule(selector, styleSheet);
            if (rule != null) rule.style[property] = value;
            return rule;
        }

        /*
            ExtendedMap

            This prototype stores everything to do with the map in context of MapExtensions
            It uses the original definitions from the JSON (and keeps the original objects intact)

            Unfortunately while MediaWiki can use ES6, user-created scripts are stuck with using ES5 syntax (not types!) due to the ancient syntax parser
        */

        // Contructor function, takes the root Element of the map (a child of the element with
        // the class interactive-maps-container, with an unique id like "interactive-map-xxxxxxxx")
        function ExtendedMap(root)
        {
            this.creationTime = performance.now();
            this.id = root.className;

            // This element is permanently part of the parser output, as it is transcluded from the Map: page
            this.rootElement = root;
            
            this.openPopups = [];

            // This element is the container in which Leaflet operates
            // It is created by Interactive Maps after the page is loaded, and will always be present when
            // this script is first fired (we don't need to check for its existence)
            this.elements = {};
            this.elements.rootElement = root;
            this.elements.rootElementParent = root.parentElement;
            this.elements.mapModuleContainer = root.querySelector(".Map-module_container__dn27-");

            // Copy each of the properties from the already-existing deserialization of the JSON into ExtendedMap
            // We could use Object.assign(this, map) (a shallow copy), then any objects are shared between the original map and the extended map
            // This isn't ideal, we want to preserve the original for future use (and use by other scripts), so we must do a deep copy
            // jQuery's extend is the fastest deep copy we have on hand
            jQuery.extend(true, this, mw.config.get("interactiveMaps")[this.id]);

            // Lookup tables (iterating interactiveMap.markers is slow when the map has a lot of markers)
            // markerLookup may contain markers that do not yet have an associated element!
            this.markerLookup = new Map();
            this.categoryLookup = new Map();

            // Unscaled size / bounds
            this.size = { width: Math.abs(this.bounds[1][0] - this.bounds[0][0]),
                         height: Math.abs(this.bounds[1][1] - this.bounds[0][1]) };
            
            // Remove marker query parameter from URL so that when the map goes fullscreen, it isn't zoomed into the marker again
            var url = window.location;
            urlParams.delete("marker");
            window.history.replaceState({}, document.title, url.origin + url.pathname + (urlParams != "" ? "?" : "") + urlParams.toString() + url.hash);
            

            // Get the map config from one of the marker definitions
            for (var i = 0; i < this.markers.length; i++)
            {
                if (this.markers[i].config)
                {
                    // Move the configuration to the map itself
                    if (!this.config) this.config = this.markers[i].config;

                    // Delete the config from the definition
                    delete this.markers[i].config;
                }
            }

            if (!this.config) this.config = {};

            // Copy the global configuration over the per-map config, keeping any value already set in the per-map config
            this.config = jQuery.extend(true, mapsExtended.config, this.config);
            //traverseCopyValues(mapsExtended.config, this.config, [], true);

            // Short circuit if the config says this map should be disabled
            if (this.config.disabled == true)
                return;

            // Hook ExtendedMap events into MapsExtended events, effectively forwarding all events to the mapsExtended events object
            Object.keys(this.events).forEach(function(eventKey)
            {
                mapsExtended.events = mapsExtended.events || {};

                // Create EventHandler for this event if it doesn't exist on the mapsExtended object
                if (!mapsExtended.events.hasOwnProperty(eventKey))
                    mapsExtended.events[eventKey] = new EventHandler();

                // Get reference to the source event on this map, and the targetEvent on the mapsExtended object
                var sourceEvent = this.events[eventKey];
                var targetEvent = mapsExtended.events[eventKey];
                
                // Add a listener to the source event, which invokes the target event with the same args
                if (targetEvent && targetEvent instanceof EventHandler &&
                    sourceEvent && sourceEvent instanceof EventHandler)
                    sourceEvent.subscribe(function(args){ targetEvent.invoke(args); });
                
            }.bind(this));

            
            // Generate custom anchor style so we don't need to determine it for each and every marker
            this.config.iconAnchorStyles = {};

            // Vertical portion of iconAnchor
            if (this.config.iconAnchor.startsWith("top"))         this.config.iconAnchorStyles["margin-top"] = "0px";
            else if (this.config.iconAnchor.startsWith("center")) this.config.iconAnchorStyles["margin-top"] = "-13px";
            else if (this.config.iconAnchor.startsWith("bottom")) this.config.iconAnchorStyles["margin-top"] = "-26px";
            else console.error("Invalid vertical iconAnchor config! Should be one of: top, center, bottom");

            // Horizontal portion of iconAnchor
            if (this.config.iconAnchor.endsWith("left"))        this.config.iconAnchorStyles["margin-left"] = "0px";
            else if (this.config.iconAnchor.endsWith("center")) this.config.iconAnchorStyles["margin-left"] = "-13px";
            else if (this.config.iconAnchor.endsWith("right"))  this.config.iconAnchorStyles["margin-left"] = "-26px";
            else console.error("Invalid horizontal iconAnchor config! Should be one of: left, center, right");

            
            // Process category definitions
            for (var i = 0; i < this.categories.length; i++)
                this.categories[i] = new ExtendedCategory(this, this.categories[i]);

            // Process marker definitions
            for (var i = 0; i < this.markers.length; i++)
                this.markers[i] = new ExtendedMarker(this, this.markers[i]);

            // Sort marker definitions, but instead of rearranging the original array, store the index of the sorted marker
            var sortedMarkers = this.markers.slice().sort(this.markerCompareFunction(this.config.sortMarkers));
            for (var i = 0; i < sortedMarkers.length; i++) sortedMarkers[i].order = i;

            // Correct the coordinateOrder
            // It's very important we do this AFTER processing the marker definitions,
            // so that they know what coordinateOrder and origin to expect
            if (this.coordinateOrder == "yx")
            {
                this.coordinateOrder = "xy";
                
                // Swap x and y of mapBounds
                var y0 = this.bounds[0][0];
                var y1 = this.bounds[1][0];

                this.bounds[0][0] = this.bounds[0][1];
                this.bounds[0][1] = y0;
                this.bounds[1][0] = this.bounds[1][1];
                this.bounds[1][1] = y1;
            }

            // Correct the origin to always use top-left
            // Don't need to correct mapBounds since it will be the same anyway
            if (this.origin == "bottom-left")
                this.origin = "top-left";
            
            // Set up a MutationObserver which will observe all changes from the root interactive-map-xxxxxxx
            // This is used in the rare occasion that this constructor is called before .Map-module_container__dn27- is created
            this.rootObserved = function(mutationList, observer)
            {
                // Stop observing root if the map has already been initialized
                if (this.initialized == true)
                {
                    observer.disconnect();
                    return;
                }
                
                // If there were any added or removed nodes, check whether the map is fully created now
                if (mutationList.some(function(mr) { return mr.addedNodes.length > 0 || mr.removedNodes.length > 0; }) && this.isMapCreated())
                {
                    // Resolve waitForPresence
                    if (this._waitForPresenceResolve)
                    {
                        this._waitForPresenceResolve();
                        this._waitForPresenceResolve = undefined;
                    }

                    // Stop observing
                    observer.disconnect();

                    // Init
                    this.init();
                }
            }.bind(this);

            // Set up a MutationObserver which will look at the parent of the leaflet-container Element for node removals
            // This is important because the leaflet map will be completely recreated if the map is ever hidden and shown again
            this.selfObserved = function(mutationList, observer)
            {
                for (var i = 0; i < mutationList.length; i++)
                {
                    var mutationRecord = mutationList[i];

                    // Map was removed, invalidating any elements
                    if (this.initialized && mutationRecord.removedNodes.length > 0 &&
                        mutationRecord.removedNodes[0] == this.elements.leafletContainer)
                    {
                        this.deinit();
                    }

                    // Map was added, connect to the elements
                    if (!this.initialized && mutationRecord.addedNodes.length > 0 &&
                        mutationRecord.addedNodes[0].classList.contains("leaflet-container"))
                    {
                        if (this._waitForPresenceResolve)
                        {
                            this._waitForPresenceResolve();
                            this._waitForPresenceResolve = undefined;
                        }
                        
                        this.init();
                    }
                }
            }.bind(this);

            var attributeObserverConfig =
            [
                {
                    targetClass: "leaflet-container",
                    toggledClass: "leaflet-drag-target",
                    booleanName: "isDragging",
                    eventName: "onMapDragged"
                },
                {
                    targetClass: "leaflet-map-pane",
                    toggledClass: "leaflet-zoom-anim",
                    booleanName: "isZooming",
                    eventName: "onMapZoomed"
                }
            ];

            // This function is used to observe specific leaflet elements for attribute changes which indicate the map is being zoomed or dragged
            this.leafletAttributeObserved = function(mutationList, observer)
            {
                for (var i = 0; i < mutationList.length; i++)
                {
                    var mutationRecord = mutationList[i];
                    if (mutationRecord.type != "attributes" || mutationRecord.attributeName != "class") continue;

                    for (var j = 0; j < attributeObserverConfig.length; j++)
                    {
                        // Using a config just saves us having to repeat the same ol' steps for every attribute
                        var config = attributeObserverConfig[j];

                        if (mutationRecord.target.classList.contains(config.targetClass))
                        {
                            var value = mutationRecord.target.classList.contains(config.toggledClass);

                            // Only fire if the value changes
                            if (this[config.booleanName] != value)
                            {
                                log(config.booleanName + " - " + value);
                                this[config.booleanName] = value;
                                this.events[config.eventName].invoke({ map: this, value: value });
                            }
                            
                        }
                    }
                }
            }.bind(this);

            // Create a MutationObserver function to know when marker elements are added
            this.markerObserved = function (mutationList, observer)
            {
                var addedMarkers = 0;
                var removedMarkers = 0;
                var matched = 0;

                for (var i = 0; i < mutationList.length; i++)
                {
                    if (mutationList[i].type != "childList") continue;

                    if (mutationList[i].removedNodes.length > 0 &&
                        mutationList[i].removedNodes[0].classList.contains("leaflet-marker-icon") &&
                    !mutationList[i].removedNodes[0].classList.contains("marker-cluster"))
                    {
                        removedMarkers++;
                    }
                    
                    // Check that it was indeed a marker that was added
                    if (mutationList[i].addedNodes.length > 0 &&
                        mutationList[i].addedNodes[0].classList.contains("leaflet-marker-icon") &&
                    !mutationList[i].addedNodes[0].classList.contains("marker-cluster"))
                    {
                        var markerElement = mutationList[i].addedNodes[0];
                        var markerJson = null;

                        // Check if the marker has not yet been associated, by assuming that ids are always present on associated marker elements
                        if (markerElement.id == false)
                        {
                            addedMarkers++;

                            // Try to match the newly-added element with a marker in the JSON definition
                            for (var j = 0; j < this.markers.length; j++)
                            {
                                if (this.compareMarkerAndJsonElement(markerElement, this.markers[j]))
                                {
                                    markerJson = this.markers[j];
                                    break;
                                }
                            }

                            // If a match was found...
                            if (markerJson)
                            {
                                matched++;
                                markerJson.init(markerElement);
                                this.events.onMarkerShown.invoke({ map: this, marker: markerJson });
                            }

                            // Otherwise error out
                            else
                            {
                                var unscaledPos = ExtendedMarker.prototype.getUnscaledMarkerPosition(markerElement);
                                log("Could not associate marker element at position " + unscaledPos + " with a definition in the JSON.");
                            }
                        }
                    }
                }

                if (addedMarkers > 0)
                    log(addedMarkers + " markers appeared, matched " + matched + " to markers in the JSON definition");
                if (removedMarkers > 0)
                    log(removedMarkers + " markers removed");
                
            }.bind(this);

            // Create a MutationObserver function to know when a popup is created/shown (and destroyed/hidden)
            this.popupObserved = function (mutationList, observer)
            {
                if (mutationList[0].type != "childList")
                    return;
                
                // Nodes removed
                if (mutationList[0].removedNodes.length > 0)
                {
                    var removedPopupElement = mutationList[0].removedNodes[0];

                    if (removedPopupElement.popup)
                    {
                        var removedPopup = removedPopupElement.popup;
                        var removedPopupMarker = removedPopup.marker;
                        var removedPopupMarkerId = removedPopupElement.id;
                    }
                    else if (removedPopupElement.id.startsWith("popup_"))
                    {
                        var removedPopupMarkerId = mutationList[0].removedNodes[0].id.replace("popup_", "");
                        var removedPopupMarker = mutationList[0].removedNodes[0].marker || this.markerLookup.get(removedPopupMarkerId);
                        var removedPopup = removedPopupMarker.popup;
                    }
                    else
                    {
                        // Popup wasn't associated to a marker before it was removed, likely a custom popup
                        return;
                    }
                    
                    log("Popup removed: " + removedPopupMarkerId);
                    this.events.onPopupHidden.invoke({ map: this, marker: removedPopupMarker });
                }

                // Nodes added
                if (mutationList[0].addedNodes.length > 0 && mutationList[0].addedNodes[0] instanceof Element)
                {
                    var popupElement = mutationList[0].addedNodes[0];
                    var marker = null;

                    // Popup content is created on-demand, on the first time the popup is shown.
                    // Check to see whether the popup content hasn't been created, and if so skip this
                    // (another mutation will be observed as Interactive Maps creates the content)

                    // Return on addition of root popup element without content
                    if (popupElement.classList.contains("leaflet-popup") && !popupElement.querySelector(".MarkerPopup-module_content__9zoQq"))
                        return;

                    // Rescope to root popup on addition of content in subtree
                    else if (popupElement.classList.contains("MarkerPopup-module_popup__eNi--"))
                        popupElement = popupElement.closest(".leaflet-popup");

                    // If we can't get an element, return
                    if (!popupElement) return;

                    // If the last marker clicked doesn't have an associated marker object (i.e. it didn't have an ID), try and associate it now
                    if (!this.lastMarkerClicked && !this.lastMarkerHovered)
                    {
                        var markerElement = this.lastMarkerElementClicked;
                        var markerPos = this.getTranslateXY(popupElement);

                        // Try to find the marker definition in the JSON file that matches the marker element in the DOM,
                        // using the content of the popup that was just shown as the basis of comparison
                        var elements = ExtendedPopup.prototype.fetchPopupElements(popupElement);

                        if (elements.popupTitle)
                            var popupTitle = elements.popupTitle.textContent.trim();
                        if (elements.popupDescription)
                            var popupDesc = elements.popupDescription.textContent.trim();

                        if (elements.popupLinkLabel)
                        {
                            var wikiPath = mw.config.get("wgServer") + mw.config.get("wgArticlePath").replace("$1", "");
                            var popupLinkUrl = elements.popupLinkLabel.getAttribute("href").replace(wikiPath, "");
                            var popupLinkLabel = elements.popupLinkLabel.textContent.trim();
                        }
                        else
                        {
                            var popupLinkUrl = "";
                            var popupLinkLabel = "";
                        }
        
                        marker = this.markers.find(function(m)
                        {
                            // Rather than matching for true, take the path of invalidating options one at a time until it HAS to be the same marker
                            // Skip if the marker already has an associated element
                            if ((m.markerElement) ||
                                (m.popup.title && popupTitle != m.popup.title) ||
                                (m.popup.link.url && popupLinkUrl != m.popup.link.url) || 
                                (m.popup.link.label && popupLinkLabel == m.popup.link.label))
                                return false;

                            return true;
                        });

                        if (marker)
                        {
                            marker.init(this.lastMarkerElementClicked);
                            log("Associated clicked marker with " + marker.id + " using its popup");
                        }
                        else
                        {
                            log("Could not associate clicked marker!");
                            return;
                        }
                    }
                    else
                    {
                        if (this.config.openPopupsOnHover == true)
                            marker = this.lastMarkerHovered;
                        else
                            marker = this.lastMarkerClicked || this.lastMarkerHovered;
                    }

                    if (marker)
                    {
                        // Check if this is a "new" popup, and if so, cache it
                        // Leaflet doesn't recreate popups, and will remove the element from the DOM once it disappears (but cache it for later)
                        // The exception to this rule is when a marker is hidden (for example when the category is unchecked), in which case a new popup will be created

                        // Deinit popup if the marker already has an associated popup (and if it's not this one)
                        if (marker.popup.initialized && !marker.popup.isCustomPopup && marker.popup.elements && marker.popup.elements.popupElement != popupElement)
                            marker.popup.deinitPopup();

                        // Init popup if the marker doesn't already have an associated popup
                        if (!marker.popup.initialized && !marker.popup.elements)
                        {
                            marker.popup.initPopup(popupElement);

                            // Re-grab the popupElement reference since it may have changed
                            popupElement = marker.popup.elements.popupElement;
                        }

                        log("Popup shown: " + popupElement.id);
                        
                        if (marker.popup._waitForPresenceResolve)
                        {
                            marker.popup._waitForPresenceResolve(marker);
                            marker.popup._waitForPresenceResolve = undefined;
                        }
                    
                        // Fire onPopupShown
                        this.events.onPopupShown.invoke({ map: this, marker: marker });
                    }
                }

            }.bind(this);

            this.rootObserver = new MutationObserver(this.rootObserved);
            this.selfObserver = new MutationObserver(this.selfObserved);
            this.leafletAttributeObserver = new MutationObserver(this.leafletAttributeObserved);
            this.popupObserver = new MutationObserver(this.popupObserved);
            this.markerObserver = new MutationObserver(this.markerObserved);
            
            // Finally, connect to the DOM
            
            // At this point Interactive Maps may have created the container (underneath the interactive-map-xxxxxxx stub),
            // but Leaflet may not have actually created the map.
            // If we decide to initialize the map now without checking, it may not have any marker elements to connect to
            if (this.isMapCreated() == false)
            {
                // Leaflet not finished initializing
                console.log("Leaflet not yet initialized for \"" + this.id + "\". Init will be deferred");
                this.rootObserver.observe(this.elements.rootElement, { subtree: true, childList: true });
            }
            else
            {
                // Leaflet finished initializing
                this.init(root);
            }
        }

        ExtendedMap.prototype = 
        {
            events: 
            {
                // Fired when a category for this map is toggled. Contains the args: map, category, value
                onCategoryToggled: new EventHandler(),

                // Fired when a popup is created for the first time. Contains the args: map, marker, popup
                onPopupCreated: new EventHandler(),

                // Fired when a popup in this map is shown. Contains the args: map, marker, isNew (bool)
                onPopupShown: new EventHandler(),

                // Fired when a popup for this map is hidden. Contains the args: map, marker
                onPopupHidden: new EventHandler(),

                // Fired when a marker appears for the first time on this map. Contains the args: map, marker
                onMarkerShown: new EventHandler(),

                // Fired when a marker is hovered. Contains the args: map, marker, value, event
                onMarkerHovered: new EventHandler(),

                // Fired when a marker is clicked on this map. Contains the args: map, marker, event
                onMarkerClicked: new EventHandler(),

                // Fired when the map appears on the page or is otherwise initialized. Contains the args: map, isNew.
                // This may be a refresh of the existing map (which occurs when the map is resized), in which case isNew is false.
                // A refreshed map should be treated like a new map - any references to the old map and its markers will be invalid and should be discarded
                onMapInit: new EventHandler(),

                // Fired when the map disappears from the page, or is otherwise deinitialized before it is refreshed
                onMapDeinit: new EventHandler(),

                onMapDragged: new EventHandler(),
                onMapZoomed: new EventHandler(),
            },

            // Init associates the map to the DOM.
            // It should be passed the root element with the class "interactive-map-xxxxxxxx",
            // though it will use the rootElement in this.element.rootElement if not
            init: function(root)
            {
                if (this.initialized)
                {
                    log("Tried to initialize " + this.id + " when it was already initialized");
                    return;
                }

                var isNew = !this.initializedOnce;
                this.initialized = true;
                this.initializedOnce = true;

                if (!root) root = this.elements != null ? this.elements.rootElement : null;
                if (!root) console.error("ExtendedMap.init did not find a reference to the root interactive-map-xxxxxxxx element!");

                // References to Leaflet elements in the DOM        
                this.elements = this.elements || {};
                this.elements.rootElement = root;
                this.elements.mapModuleContainer = root.querySelector(".Map-module_container__dn27-");

                // Filters/category elements
                this.elements.filtersList = root.querySelector(".interactive-maps__filters-list");
                this.elements.filtersDropdown = this.elements.filtersList.querySelector(".interactive-maps__filters-dropdown");
                this.elements.filtersDropdownContent = this.elements.filtersDropdown.querySelector(".wds-dropdown__content");
                this.elements.filtersDropdownButton = this.elements.filtersDropdown.querySelector(".interactive-maps__filters-dropdown-button");
                this.elements.filtersDropdownList = this.elements.filtersDropdown.querySelector(".interactive-maps__filters-dropdown-list");
                this.elements.filterAllCheckboxInput = this.elements.filtersDropdownList.querySelector(".interactive-maps__filter-all input");
                this.elements.filterElements = this.elements.filtersDropdownList.querySelectorAll(".interactive-maps__filter");

                // Leaflet-specific elements
                this.elements.leafletContainer = root.querySelector(".leaflet-container");
                this.elements.leafletMapPane = this.elements.leafletContainer.querySelector(".leaflet-map-pane");
                this.elements.leafletControlContainer = this.elements.leafletContainer.querySelector(".leaflet-control-container");
                this.elements.leafletControlContainerBottomRight = this.elements.leafletControlContainer.querySelector(".leaflet-bottom.leaflet-right");
                this.elements.leafletMarkerPane = this.elements.leafletMapPane.querySelector(".leaflet-marker-pane");
                this.elements.leafletPopupPane = this.elements.leafletMapPane.querySelector(".leaflet-popup-pane");
                this.elements.leafletOverlayPane = this.elements.leafletMapPane.querySelector(".leaflet-overlay-pane");
                this.elements.leafletTooltipPane = this.elements.leafletMapPane.querySelector(".leaflet-tooltip-pane");
                this.elements.leafletBaseImageLayer = this.elements.leafletOverlayPane.querySelector(".leaflet-image-layer");

                // Leaflet control elements
                this.elements.zoomInButton = this.elements.leafletControlContainerBottomRight.querySelector(".leaflet-control-zoom-in");
                this.elements.zoomOutButton = this.elements.leafletControlContainerBottomRight.querySelector(".leaflet-control-zoom-out");
                
                // List of all marker elements
                var markerElements = this.elements.leafletMarkerPane.querySelectorAll(".leaflet-marker-icon:not(.marker-cluster)");

                // Things to do only once (pre-match)
                if (isNew)
                {
                    this.selfObserver.observe(this.elements.mapModuleContainer, { childList: true });
                    
                    // Associate category/filter elements with the categories in the JSON
                    // We only need to do this once because it's not part of Leaflet and will never be destroyed   
                    for (var i = 0; i < this.elements.filterElements.length; i++)
                    {
                        var filterElement = this.elements.filterElements[i]
                        var categoryId = filterElement.querySelector("input").getAttribute("value");
                        var category = this.categories.find(function(x) { return x.id == categoryId; });
            
                        // Initialize the category with the filter element
                        if (category) category.init(filterElement);
                    }

                    // Create fullscreen button
                    this.initFullscreen();
                    
                    // Create category groups
                    this.initCategoryGroups();

                    // Create search dropdown
                    this.initSearch();

                    // Set up events for hover popups
                    this.initOpenPopupsOnHover();

                    // Set up tooltips
                    this.initTooltips();
                }
                else
                {
                    // Changing the size of the leafet container causes it to be remade (and the fullscreen button control destroyed)
                    // Re-add the fullscreen button to the DOM
                    if (this.elements.leafletControlContainerBottomRight && this.config.enableFullscreen == true)
                        this.elements.leafletControlContainerBottomRight.prepend(this.elements.fullscreenControl);
                }

                this.initMapEvents();
        
                var skipIndexAssociation = false;
                var skipAssociationForCategories = [];

                for (var i = 0; i < this.markers.length; i++)
                {
                    var marker = this.markers[i];
                    var markerElement = null;
                    
                    // Check to see if the category of the marker is hidden, if so the marker won't be in the DOM
                    // and we shouldn't bother trying to associate the category
                    if (marker.category && marker.category.visible == false)
                    {
                        if (!skipAssociationForCategories.includes(marker.category.id))
                        {
                            skipAssociationForCategories.push(marker.category.id);
                            log("Skipping association of markers with the category \"" + marker.category.id + "\", as they are currently filtered");
                        }
        
                        continue;
                    }
        
                    // Associate markers in the JSON definition with the marker elements in the DOM                
        
                    // Index-based matching
        
                    // If all markers are present, we can just pick the element at the same position/index as the element
                    // This is the most bulletproof method, and works most of the time, hence why it is used here.
        
                    // The Leaflet-created marker elements don't always have identifying information that can be used
                    // to associate them with markers in the JSON. However they are created in the same order they
                    // appear in the JSON, and we can use this to associate the two (assuming all are present)
        
                    // Without any extensions, the amount of elements will always match the definition, since there
                    // is no way to disable certain categories by default. I assume there will be a way to do so in
                    // the future, so there's no harm writing some preemptive code for it
        
                    if (markerElements.length == this.markers.length && !skipIndexAssociation)
                    {
                        // Even if the amount of elements and definitions is equal, if some categories are disabled by
                        // default, when they are re-enabled, the new markers will be added to the bottom of the DOM,
                        // and therefore will be out of order. Although we don't really need to (see the last paragraph
                        // above), here we test for this just to make sure:
        
                        // Properly test to make sure - Compare based on position
                        // Even though this is what tryAssociateMarkerJson does anyway, by using the index
                        // we save having to iterate every marker definition to test them one-by-one
                        if (this.compareMarkerAndJsonElement(markerElements[i], marker) == true)
                        {
                            markerElement = markerElements[i];
                        }
        
                        // If *any* of the elements tested negative, we can't take any chances on matching this way
                        else
                        {
                            log("Could not confirm index association between the marker " + marker.id + " and the element at index " + i);
                            log("All markers are present in the DOM, but they appear to be out of order. Falling back to position matching.");
        
                            // Abort and set a flag to always try to associate programmatically
                            skipIndexAssociation = true;
                        }
                    }
        
                    // More complex matching
        
                    // Otherwise it's a bit tricker, as we try to associate using their id (may not always be present), position, and colour
                    // This could also mean some markers will not have a markerElement attached!
                    if (!markerElement)
                    {
                        // Skip if the marker already has an associated element
                        if (marker.initialized || marker.markerElement)
                            continue;

                        // Try to find the marker element in the DOM that matches this marker definition in the JSON file.
                        // If a marker element was found, it is returned
                        for (var j = 0; j < markerElements.length; j++)
                        {
                            if (this.compareMarkerAndJsonElement(markerElements[j], marker))
                            {
                                markerElement = markerElements[j];
                                break;
                            }
                        }
                    }
        
                    // If a marker element was found...
                    if (markerElement)
                        marker.init(markerElement);
                    else
                    {
                        // Couldn't associate (will attempt popup contents matching later)
                        log("Could not associate marker definition " + marker.id + " with an element in the DOM.");
                    }
                }

                // After matching
                if (!isNew)
                {
                    // Because we lost the marker references, we need to re-show and re-highlight the markers in the search results
                    // Could just do the marker icon-centric stuff, but it's easier to update everything
                    if (this.lastSearch)
                        this.updateSearchList(this.lastSearch);
                    if (this.searchSelectedMarker)
                        this.toggleMarkerHighlight(this.searchSelectedMarker, true);
                }

                this.toggleMarkerObserver(true);
                this.togglePopupObserver(true);

                this.leafletAttributeObserver.disconnect();
                this.leafletAttributeObserver.observe(this.elements.leafletContainer, { attributes: true });    
                this.leafletAttributeObserver.observe(this.elements.leafletMapPane, { attributes: true });    
                
                var associatedCount = this.markers.filter(function(x) { return x.markerElement; }).length;
                console.log(this.id + " (" + this.name + ") - Initialized, associated " + associatedCount + " of " + this.markers.length + " markers (using " + markerElements.length + " elements), isNew: " + isNew);

                // Invoke init event
                this.events.onMapInit.invoke({ map: this, isNew: isNew });
            },

            initMapEvents: function()
            {
                // Is called on mousemove after mousedown, and for subsequent mousemove events until dragging more than 2px
                this._onMouseMove = function(e)
                {
                    // If the position of the move is 2px away from the mousedown position
                    if (Math.abs(e.pageX - this._mouseDownPos[0]) > 2 ||
                        Math.abs(e.pageY - this._mouseDownPos[1]) > 2)
                    {
                        // This is a drag
                        this.isDragging = true;
                        e.target.removeEventListener("mousemove", this._onMouseMove);
                    }   
                }.bind(this);

                // Mouse down event on leaflet container
                // Set up an event to cache the element that was last clicked, regardless of if it's actually a associated marker or not
                this.elements.leafletContainer.addEventListener("mousedown", function(e)
                {
                    // Ignore right clicks
                    if (e.button == 2) return;
                    
                    var elem = e.target;

                    // Save the position of the event, and subscribe to the mousemove event
                    this._mouseDownPos = [ e.pageX, e.pageY ];
                    e.target.addEventListener("mousemove", this._onMouseMove);
                    this._invalidateLastClickEvent = false;

                    // Traverse up the click element until we find the marker or hit the root of the map
                    // This is because markers may have sub-elements that may be the target of the click
                    while (true)
                    {
                        // No more parent elements
                        if (!elem || elem == e.currentTarget)
                            break;
                        
                        if (elem.classList.contains("leaflet-marker-icon"))
                        {
                            this.lastMarkerClicked = elem.marker;
                            this.lastMarkerElementClicked = elem;
                            
                            break;
                        }

                        elem = elem.parentElement;
                    }
                }.bind(this));

                // Mouse up event on leaflet container
                this.elements.leafletContainer.addEventListener("mouseup", function(e)
                {
                    // If mousing up after dragging, invalidate click event on whatever marker is hovered at the moment
                    if (this.isDragging == true && this.lastMarkerHovered)
                        this._invalidateLastClickEvent = true;

                    // mouseup on the leafletContainer itself
                    if (e.currentTarget == e.target && this.config.useCustomPopups == true && this.isDragging == false && this.lastPopupShown)
                        this.lastPopupShown.hide();

                    // No longer dragging
                    this.isDragging = false;
                    e.target.removeEventListener("mousemove", this._onMouseMove);
                    
                }.bind(this));

                // Intercept wheel events to normalize zoom
                // This doesn't actually cancel the wheel event (since it cannot be cancelled)
                // but instead clicks the zoom buttons so that the wheel zoom doesn't occur
                
                // Remove non-navigating hrefs, which show a '#' in the navbar, and a link in the bottom-left
                this.elements.zoomInButton.removeAttribute("href");
                this.elements.zoomOutButton.removeAttribute("href");
                this.elements.zoomInButton.style.cursor = this.elements.zoomOutButton.style.cursor = "pointer";
                this.elements.zoomInButton.addEventListener("click", preventDefault);
                this.elements.zoomOutButton.addEventListener("click", preventDefault);

                /*
                this.elements.leafletContainer.addEventListener("wheel", function(e)
                {
                    var button = e.deltaY < 0 ? this.elements.zoomInButton : this.elements.zoomOutButton;
                    
                    var rect = button.getBoundingClientRect();
                    var x = rect.left + window.scrollX + (button.clientWidth / 2);
                    var y = rect.top + window.scrollY + (button.clientHeight / 2);
                    
                    var clickEvent = new MouseEvent("click", { clientX: x, clientY: y, shiftKey: e.shiftKey });
                    button.dispatchEvent(clickEvent);
                    
                    e.preventDefault();
                }.bind(this));
                */

                this.events.onMapZoomed.subscribe(function(args)
                {
                    this._isScaledMapImageSizeDirty = true;
                    
                }.bind(this));
            },
            
            // Deinit effectively disconnects the map from any elements that may have been removed in the DOM (with the exception of filter elements)
            // After a map is deinitialized, it should not be used until it is reinitialized with init
            deinit: function()
            {
                if (!this.initialized)
                {
                    console.logError("Tried to de-initialize " + this.id + " when it wasn't initialized");
                    return;
                }

                this.toggleMarkerObserver(false);
                this.togglePopupObserver(false);
                
                this.leafletAttributeObserver.disconnect();
                this.isDragging = this.isZooming = false;
                this._isScaledMapImageSizeDirty = true;
                
                this.initialized = false;

                for (var i = 0; i < this.markers.length; i++)
                    this.markers[i].deinit();

                for (var i = 0; i < this.categories.length; i++)
                    this.categories[i].deinit();

                console.log(this.id + " (" + this.name + ") - Deinitialized");

                // Invoke deinit event
                this.events.onMapDeinit.invoke({map: this});
            },

            // Returns a Promise which is fulfilled when the elements of a map become available, or were already available
            // and rejected if it will never become available in the current state (i.e. map container hidden)
            waitForPresence: function()
            {
                if (this.initialized)
                {
                    return Promise.resolve(this.id + " (" + this.name + ") - The map was initialized immediately (took " + (performance.now() - this.creationTime) + "ms)");
                }
                
                return new Promise(function(resolve, reject)
                {
                    // Store resolve function (it will be called by selfObserver above)
                    this._waitForPresenceResolve = function()
                    {
                        resolve(this.id + " (" + this.name + ") - Successfully deferred until Leaflet fully initialized (took " + (performance.now() - this.creationTime) + "ms)");
                    };
                    
                    // Alternatively timeout after 10000ms
                    setTimeout(function(){ reject(this.id + " (" + this.name + ") - Timed out after 10 sec while waiting for the map to appear."); }.bind(this), 10000);
                }.bind(this));
            },

            isMapCreated: function()
            {
                var mapModuleContainer = this.elements.rootElement.querySelector(".Map-module_container__dn27-");
                var leafletContainer = this.elements.rootElement.querySelector(".leaflet-container");

                // The process for creating the map is
                // 0. interactive-maps-xxxxxx stub exists
                // 1. interactive-maps created
                // 2. interactive-maps__filters-list and all filters created 
                // 3. Map-module_container__dn27- created
                // 4. img Map-module_imageSizeDetect__YkHxA created (optionally)
                // 5. leaflet-container created
                // 6. leaflet-map-pane created (and all empty pane containers underneath it)
                // 7. leaflet-control-container created (and all empty top/bottom/left/right underneath it)
                // 8. leaflet-proxy created under leaflet-map-pane
                // At this point the map may be destroyed and recreated from step 3.
                // 8. leaflet-control-zoom added under leaflet-control-container
                // 9. leaflet-image-layer added under leaflet-overlay-pane
                // 10. leaflet-marker-icons added under leaflet-marker-pane
                // 11. interactive-maps__edit-control added under leaflet-control-container

                // We can check whether it is still creating the map by:
                // -> The lack of a Map-module_container__dn27- element (this is created first)
                // -> The lack of a leaflet-container element (this is created second)
                // -> The lack of any children under Map-module_container__dn27-
                // -> The lack of any children under leaflet-container

                // Still loading
                // -> The existence of an img "Map-module_imageSizeDetect__YkHxA" under "Map-module_container__dn27-" (this is removed first)
                // -> The existence of a div "LoadingOverlay-module_overlay__UXv3B" under "leaflet-container"
                // -> The lack of any elements under leaflet-overlay-pane
                // -> The lack of the zoom controls
                if (mapModuleContainer == null || leafletContainer == null ||
                    mapModuleContainer.childElementCount == 0 || leafletContainer.childElementCount == 0 ||
                    mapModuleContainer.querySelector("img.Map-module_imageSizeDetect__YkHxA") != null ||
                    leafletContainer.querySelector(".LoadingOverlay-module_overlay__UXv3B") != null || 
                    leafletContainer.querySelector(".leaflet-map-pane > .leaflet-overlay-pane > *") == null || 
                    leafletContainer.querySelector(".leaflet-control-container .leaflet-control-zoom") == null)
                {
                    return false;
                }
                return true;
            },

            isMapHidden: function()
            {
                return (this.rootElement.offsetParent == null);
            },

            isMapVisible: function()
            {
                return !this.isMapHidden();
            },

            // Determine whether the element is displayed
            isElementVisible: function(element)
            {
                return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
            },

            getMapLink: function(asHtmlString)
            {
                return "<a href=\"/wiki/Map:" + encodeURIComponent(this.name) + "\">Map:" + this.name + "</a>";
            },

            togglePopupObserver: function(state)
            {
                this.popupObserver.disconnect();
                if (state) this.popupObserver.observe(this.elements.leafletPopupPane, { childList: true, subtree: true });
            },

            toggleMarkerObserver: function(state)
            {
                this.markerObserver.disconnect();
                if (state) this.markerObserver.observe(this.elements.leafletMarkerPane, { childList: true });    
            },

            // This mess is to mitigate a bug that occurs after panning a map with the popup open
            // whereby no click events after that will actually register
            clickPositionOfElement: function(elem)
            {
                var rect = elem.getBoundingClientRect();
                var x = rect.left + window.scrollX + (elem.clientWidth / 2);
                var y = rect.top + window.scrollY + (elem.clientHeight / 2);

                var eventArgs =
                {
                    "bubbles": true,
                    "cancelable": true
                };
                
                var mouseDownEvent = new MouseEvent("mousedown", eventArgs);
                var mouseUpEvent = new MouseEvent("mouseup", eventArgs);
                var clickEvent = new MouseEvent("click", eventArgs);

                //var e = document.elementFromPoint(x, y);

                elem.dispatchEvent(mouseDownEvent);
                elem.dispatchEvent(mouseUpEvent);
                elem.dispatchEvent(clickEvent);//click();
                document.activeElement.blur();
            },

            compareMarkerAndJsonElement: function(markerElem, markerJson)
            {
                return markerJson.compareMarkerAndJsonElement(markerElem);
            },

            // Returns a function that can be used to compare markers
            markerCompareFunction: function(sortType)
            {
                sortType = sortType.toLowerCase();

                if (sortType == "latitude" || sortType == "latitude-asc")
                    return function(a, b) { return a.position[1] - b.position[1]; };
                else if (sortType == "latitude-desc")
                    return function(a, b) { return b.position[1] - a.position[1]; };
                else if (sortType == "longitude" || sortType == "longitude-asc")
                    return function(a, b) { return a.position[0] - b.position[0]; };
                else if (sortType == "longitude-desc")
                    return function(a, b) { return b.position[0] - a.position[0]; };
                else if (sortType == "category"  || sortType == "category-asc")
                    return function(a, b){ return (b.map.categories.indexOf(b.category) - a.map.categories.indexOf(a.category)) || (a.position[1] - b.position[1]); };
                else if (sortType == "category-desc")
                    return function(a, b) { return (a.map.categories.indexOf(a.category) - b.map.categories.indexOf(b.category)) || (a.position[1] - b.position[1]); };
                else if (sortType == "name" || sortType == "name-asc")
                {
                    var compare = new Intl.Collator().compare;
                    return function(a, b) { return compare(a.popup.title, b.popup.title); };
                }
            },

            // Scale a "unscaled" position to current map size, returning the scaled position
            // An unscaled position is one which matches the JSON definition
            // A scaled position takes into account the current zoom level
            unscaledToScaledPosition: function(unscaledPos)
            {
                var scaledPos = [];
                var imageSize = this.getScaledMapImageSize();

                // Scale the position to the current size of the map, from the original coordinates, and round
                scaledPos[0] = Math.round(((unscaledPos[0] - this.bounds[0][0]) / this.size.width) * imageSize[0]);
                scaledPos[1] = Math.round(((unscaledPos[1] - this.bounds[0][1]) / this.size.height) * imageSize[1]);

                return scaledPos;
            },

            // Converts a scaled position at an arbitrary zoom level to an unscaled pixel position
            // A scaled position is the finally translate3d position of the marker element on the map
            scaledToUnscaledPosition: function(scaledPos)
            {
                var unscaledPos = [];
                var imageSize = this.getScaledMapImageSize();

                var imagePos = this.getTranslateXY(this.elements.leafletBaseImageLayer);

                // Scale the position back up to the original range, and round
                unscaledPos[0] = ((scaledPos[0] - imagePos[0]) / imageSize[0]) * this.size.width;
                unscaledPos[1] = ((scaledPos[1] - imagePos[1]) / imageSize[1]) * this.size.height;

                return unscaledPos;
            },

            // Get the current background image size at the current zoom level
            getScaledMapImageSize: function()
            {
                // Return the cached size if we have one and it doesn't need to be updated
                if (!this._isScaledMapImageSizeDirty && this.scaledMapImageSize)
                    return this.scaledMapImageSize;
                
                var size = [ this.elements.leafletBaseImageLayer.width, this.elements.leafletBaseImageLayer.height ];

                // If the map was just shown, the base image layer may not have a width and height
                // However, the style will always be correct, so we can fetch the size from that instead (at a minor performance penalty)
                if (size[0] == 0 && size[1] == 0)
                {
                    size[0] = parseFloat(this.elements.leafletBaseImageLayer.style.width);
                    size[1] = parseFloat(this.elements.leafletBaseImageLayer.style.height);
                }

                this._isScaledMapImageSizeDirty = false;
                this.scaledMapImageSize = size;
                return size;
            },

            // Get the current size of the viewport
            getViewportSize: function()
            {
                return [ this.elements.leafletContainer.clientWidth, this.elements.leafletContainer.clientHeight ];
            },

            // Get the transform:translate XY position from an element
            getTranslateXY: function(element, accurate)
            {
                // Throw error if the passed element is not in fact an element
                if (!(element instanceof Element))
                {
                    console.error("getTranslateXY expects an Element but got the following value: " + element.toString());
                    return [0, 0];
                }

                // This is the more programatic way to get the position, calculating it 
                if (accurate && this.elements.leafletMapPane.contains(element))
                {
                    var pos = $(element).position();
                    return [ pos.left, pos.top ];
                    
                    var mapRect = this.elements.leafletMapPane.getBoundingClientRect();
                    var elemRect = element.getBoundingClientRect();

                    // We can't just use half the width and height to determine the offsets
                    // since the user may have implemented custom offsets
                    var computedStyle = window.getComputedStyle(element);
                    var elemOffset = [ parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight),
                                       parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom) ];

                    return [ (elemRect.x - mapRect.x) - elemOffset[0],
                             (elemRect.y - mapRect.y) - elemOffset[1] ];
                }
                
                if (element._leaflet_pos)
                    return [ element._leaflet_pos.x, element._leaflet_pos.y ];
                else
                {
                    var values = element.style.transform.split(/\w+\(|\);?/);
                    if (!values[1] || !values[1].length) return {};
                    values = values[1].split(/,\s?/g);

                    return [ parseInt(values[0], 10), parseInt(values[1], 10), parseInt(values[2], 10) ];
                }
                /*
                else
                {
                    var style = window.getComputedStyle(element)
                    var matrix = new DOMMatrixReadOnly(style.transform)
                    return {
                        x: matrix.m41,
                        y: matrix.m42
                    }
                }
                */
            },

            // openPopupsOnHover

            initOpenPopupsOnHover: function()
            {
                // Mouse enter marker element - Stop timeout for popup
                if (this.config.openPopupsOnHover != true)
                    return;
                
                this.events.onMarkerHovered.subscribe(function(args)
                {
                    var e = args.e;
                    var marker = args.marker || e.currentTarget.marker || this.markerLookup.get(e.currentTarget.id) || null;
                    if (!marker) return;
                    
                    // Mouse enter marker element
                    if (args.value == true)
                    {
                        // Stop the hide timer
                        if (this.config.popupHideDelay > 0.0)
                            marker.popup.stopPopupHideDelay();

                        // Start the show timer
                        if (this.config.popupShowDelay > 0.0)
                            marker.popup.startPopupShowDelay();

                        // Or just show if there is no delay
                        else
                            marker.popup.show();
                    }
                    
                    // Mouse leave marker element - Start timeout for popup
                    else
                    {
                        // Stop the show timer
                        if (this.config.popupShowDelay > 0.0)
                            marker.popup.stopPopupShowDelay();

                        // Start the hide timer
                        if (this.config.popupHideDelay > 0.0)
                            marker.popup.startPopupHideDelay();

                        // Or just hide if there is no delay
                        else
                            marker.popup.hide();
                    }
                    
                }.bind(this));
            },

            // Tooltips

            initTooltips: function()
            {
                // Don't continue if tooltips are disabled
                if (this.config.enableTooltips == false)
                    return;

                var tooltipElement = document.createElement("div");
                tooltipElement.className = "leaflet-tooltip leaflet-zoom-animated leaflet-tooltip-left";
                tooltipElement.style.opacity = "0.9";
                this.elements.tooltipElement = tooltipElement;

                // This function is called by requestAnimationFrame and will update the transform of the tooltip
                // to match the transform of the marker element every frame (plus an offset for the local transform)
                var start, prev, zoomStepId, zoomStepFn = function(time)
                {
                    if (!this.tooltipMarker) return;
                    
                    // Record the start time
                    if (!start) start = time;
                    
                    // Only apply the new transform if the time actually changed
                    if (prev != time) tooltipElement.style.transform = this.tooltipMarker.markerElement.style.transform + " " + tooltipElement.localTransform;

                    // Queue the next frame as long as the elapsed time is less than 300ms
                    // This is more a timeout feature than anything
                    if (time - start < 300) zoomStepId = window.requestAnimationFrame(zoomStepFn);

                    prev = time;
                    
                }.bind(this);

                // Show tooltip on marker hover enter, hide it on hover exit
                this.events.onMarkerHovered.subscribe(function(args)
                {
                    if (args.value == true)
                        this.showTooltipForMarker(args.marker);
                    else
                        this.hideTooltip();
                    
                }.bind(this));

                // Hide the tooltip with display:none when the popup for a marker is shown
                this.events.onPopupShown.subscribe(function(args)
                {
                    if (args.marker == this.tooltipMarker && this.elements.tooltipElement.isConnected)
                        this.elements.tooltipElement.style.display = "none";
                        
                }.bind(this));

                // Re-show the tooltip when the popup for a marker is hidden again
                this.events.onPopupHidden.subscribe(function(args)
                {
                    // Only if the popup is of the marker that is also the tooltip marker
                    if (args.marker == this.tooltipMarker && this.elements.tooltipElement.isConnected)
                        this.elements.tooltipElement.style.display = "";
                    
                }.bind(this));

                // When the map is zoomed, animate the tooltip with the zoom
                this.events.onMapZoomed.subscribe(function()
                {
                    if (this.isTooltipShown == true)
                    {
                        window.cancelAnimationFrame(zoomStepId);
                        window.requestAnimationFrame(zoomStepFn);
                    }
                    
                }.bind(this));
            },

            showTooltipForMarker: function(marker)
            {
                this.isTooltipShown = true;
                this.tooltipMarker = marker;
                var tooltipElement = this.elements.tooltipElement;
                
                // Show the marker on top of everything else
                marker.markerElement.style.zIndex = marker.order + this.markers.length;
                
                // Set the content of the tooltip
                tooltipElement.textContent = marker.popup.title;
                tooltipElement.style.display = marker.popup.isPopupShown() ? "none" : "";

                // Change whether the tooltip is shown on the left or right side of the marker depending
                // on the marker's position relative to the viewport.
                // Markers on the right side of the viewport will show a tooltip on the left and vice versa
                var isShownOnLeftSide =  marker.getViewportMarkerPosition()[0] > this.getViewportSize()[0] / 2;

                tooltipElement.classList.toggle("leaflet-tooltip-left", isShownOnLeftSide);
                tooltipElement.classList.toggle("leaflet-tooltip-right", !isShownOnLeftSide);
                
                var localTransform = "translate(" + (isShownOnLeftSide ? "-100%" : "0") + ", -50%)";
                
                // Offset the tooltip based on the iconAnchor
                if (marker.iconAnchor.startsWith("top"))
                    tooltipElement.style.marginTop = "13px";
                else if (marker.iconAnchor.startsWith("bottom"))
                    tooltipElement.style.marginTop = "-13px";

                if (marker.iconAnchor.endsWith("left"))
                    tooltipElement.style.marginLeft = isShownOnLeftSide ? "7px" : "19px";
                else if (marker.iconAnchor.endsWith("right"))
                    tooltipElement.style.marginLeft = isShownOnLeftSide ? "-19px" : "-7px";
                
                // We use two transforms, the transform of the marker and a local one which shifts the tooltip
                tooltipElement.localTransform = localTransform;
                tooltipElement.style.transform = marker.markerElement.style.transform + " " + localTransform;

                // Finally, add the tooltip to the DOM
                this.elements.leafletTooltipPane.appendChild(tooltipElement);
            },

            hideTooltip: function()
            {
                this.isTooltipShown = false;
                var marker = this.tooltipMarker;
                
                // Don't set zIndex if the marker is highlighted in search
                if (marker && !marker.markerElement.classList.contains(".search-result-highlight"))
                    marker.markerElement.style.zIndex = marker.order;
                
                this.elements.tooltipElement.remove();
                this.tooltipMarker = undefined;
            },

            // Fullscreen

            // Transition the map to and from fullscreen
            setFullscreen: function(value)
            {
                // Don't do anything if we're currently transitioning to or from fullscreen
                if (this.isFullscreenTransitioning == true) return;

                // Return if the map is already the requested state
                if (this.isFullscreen == value) return;

                this.isFullscreenTransitioning = true;

                if (value == true)
                    return this.elements.rootElement.requestFullscreen();
                else if (value == false)
                    return document.exitFullscreen();
                else
                    return Promise.resolve();
            },

            setWindowedFullscreen: function(value)
            {
                this.isWindowedFullscreen = value;
                
                // Save the scroll position
                if (value) this.fullscreenScrollPosition = window.scrollY;
                
                // Toggle some classes which do most of the heavy lifting
                document.documentElement.classList.toggle("windowed-fullscreen", value);

                // Toggle the fullscreen class on the root element
                this.elements.rootElement.classList.toggle("mapsExtended_fullscreen", value);

                // Enter windowed fullscreen
                if (value)
                {
                    // Move element to end of body
                    document.body.appendChild(this.elements.rootElement);
                }

                // Exit windowed fullscreen
                else
                {
                    // Move element to end of original parent
                    this.elements.rootElementParent.appendChild(this.elements.rootElement);

                    // Restore the scroll position
                    window.scroll({ top: this.fullscreenScrollPosition, left: 0, behavior: "auto" });
                }

                // Change the tooltip that is shown to the user on hovering over the button
                this.elements.fullscreenControlButton.setAttribute("title", value ? mapsExtended.i18n.msg("fullscreen-exit-tooltip").plain()
                                                                                : mapsExtended.i18n.msg("fullscreen-enter-tooltip").plain());

                this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-in", !this.isWindowedFullscreen);
                this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-out", this.isWindowedFullscreen);
            },

            toggleFullscreen: function(value)
            {
                this.setFullscreen(!this.isFullscreen);
            },

            toggleWindowedFullscreen: function(value)
            {
                this.setWindowedFullscreen(!this.isWindowedFullscreen);
            },

            initFullscreenStyles: once(function()
            {
                // This works around Chrome's dumbass renderer which makes everything fuzzy when animating an opacity value via a CSS transition
                mapsExtended.stylesheet.insertRule(".leaflet-marker-pane .leaflet-marker-icon img { backface-visibility: hidden; }");
                
                // Change scope of rule covering .leaflet-control-zoom to cover all leaflet-control
                changeCSSRuleSelector(".Map-module_interactiveMap__135mg .leaflet-control-zoom",
                                ".Map-module_interactiveMap__135mg .leaflet-control");
                changeCSSRuleSelector(".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out",
                                ".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-fullscreen-button, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-popup-button");
                changeCSSRuleSelector(".leaflet-control-zoom-in, .leaflet-control-zoom-out",
                                ".leaflet-control-zoom-in, .leaflet-control-zoom-out, .leaflet-control-fullscreen-button, .leaflet-control-popup-button");
                changeCSSRuleSelector(".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:hover",
                                ".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-fullscreen-button:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-popup-button:hover");
                changeCSSRuleSelector(".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:active",
                                ".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-fullscreen-button:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-popup-button:active");

                changeCSSRuleText(".leaflet-touch .leaflet-bar a:first-child", "border-top-left-radius: 3px; border-top-right-radius: 3px;");
                changeCSSRuleText(".leaflet-touch .leaflet-bar a:last-child", "border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;");

                // Rule to match 3px border-radius of other buttons
                mapsExtended.stylesheet.insertRule(".leaflet-control-fullscreen-button { border-radius:3px; cursor:pointer; }");

                // Rule to hide zoom-out SVG when zoom-in button should be shown and vice versa
                mapsExtended.stylesheet.insertRule(".leaflet-control-fullscreen-button-zoom-in > svg[data-id=\"wds-icons-zoom-out-small\"] { display:none; }");
                mapsExtended.stylesheet.insertRule(".leaflet-control-fullscreen-button-zoom-out > svg[data-id=\"wds-icons-zoom-in-small\"] { display:none; }");

                
                // Rule to override the size of the map when in fullscreen so it fills the screen
                mapsExtended.stylesheet.insertRule(".fullscreen .mapsExtended_fullscreen .leaflet-container, .windowed-fullscreen .mapsExtended_fullscreen .leaflet-container { height:100vh !important; width:100vw !important; }");

                // Rule to move the filters dropdown to within the map body when in fullscreen
                mapsExtended.stylesheet.insertRule(".fullscreen .mapsExtended_fullscreen  .interactive-maps .interactive-maps__filters-list, .windowed-fullscreen .mapsExtended_fullscreen .interactive-maps .interactive-maps__filters-list { width:fit-content; margin:12px 0 0 12px; position:absolute; z-index:9999; }")

                // Rule to add background back to pill buttons
                //mapsExtended.stylesheet.insertRule(".fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button, .windowed-fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button { color: var(--theme-accent-label-color); background-color: var(--theme-accent-color); box-shadow: 0 1px 3px 0 rgb(14 25 26 / 30%); border: none; }")
                //mapsExtended.stylesheet.insertRule(".fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button:hover, .windowed-fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button:hover { background-color: var(--theme-accent-color--hover); box-shadow: inset 0 0 18px 36px hsl(0deg 0% 100% / 10%); }")
                mapsExtended.stylesheet.insertRule(".fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button, .windowed-fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button { background-color: rgba(var(--theme-page-background-color--rgb), 0.75); box-shadow: 0 1px 3px 0 rgb(14 25 26 / 30%); }");
                mapsExtended.stylesheet.insertRule(".fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button:hover, .windowed-fullscreen .mapsExtended_fullscreen .interactive-maps__filters-list .wds-pill-button:hover { box-shadow: inset 0 0 18px 36px hsl(0deg 0% 100% / 10%); }");
                
                // Rule to make map root absolutely positioned when in windowedFullscreen
                mapsExtended.stylesheet.insertRule(".windowed-fullscreen .mapsExtended_fullscreen { position: fixed; top: 0; left: 0; }");
                
                // These rules control hiding or moving of specific elements when we're in windowed fullscreen
                mapsExtended.stylesheet.insertRule(".windowed-fullscreen { overflow: hidden !important; }");
                mapsExtended.stylesheet.insertRule(".windowed-fullscreen .notifications-placeholder { transition: left 0.2s ease-in-out; left: 18px; }");
                mapsExtended.stylesheet.insertRule(".windowed-fullscreen .fandom-sticky-header { transform: translateY(-1px); }");
                mapsExtended.stylesheet.insertRule(".windowed-fullscreen .global-navigation, .windowed-fullscreen .main-container, .windowed-fullscreen .global-navigation, .windowed-fullscreen #WikiaBar { display: none !important; }");
                
            }, window),

            // Creates a fullscreen button for the map, sets up various events to control fullscreen
            initFullscreen: function(isNew)
            {
                this.isFullscreen = this.isWindowedFullscreen = false;
                
                // Modify and set up some styles - this is only executed once
                this.initFullscreenStyles();

                // Create a new leaflet-control before the zoom control which when clicked will toggle fullscreen
                mw.hook("dev.wds").add(function(wds)
                {
                    var leafletControlContainerBottomRight = this.elements.leafletControlContainer.querySelector(".leaflet-bottom.leaflet-right");
                    
                    // Fullscreen button
                    var fullscreenControl = document.createElement("div");
                    fullscreenControl.className = "leaflet-control-fullscreen leaflet-bar leaflet-control";

                    var fullscreenControlButton = document.createElement("a");
                    fullscreenControlButton.className = "leaflet-control-fullscreen-button leaflet-control-fullscreen-button-zoom-in";
                    fullscreenControlButton.setAttribute("title", mapsExtended.i18n.msg("fullscreen-enter-tooltip").plain());

                    var zoomInIcon = wds.icon("zoom-in-small");
                    var zoomOutIcon = wds.icon("zoom-out-small");
                    fullscreenControlButton.appendChild(zoomInIcon);
                    fullscreenControlButton.appendChild(zoomOutIcon);
                    
                    fullscreenControl.appendChild(fullscreenControlButton);
                    leafletControlContainerBottomRight.prepend(fullscreenControl);
                    
                    this.elements.fullscreenControl = fullscreenControl;
                    this.elements.fullscreenControlButton = fullscreenControlButton;
                    this.elements.leafletControlContainerBottomRight = leafletControlContainerBottomRight;

                    // Remove the fullscreen button if fullscreen is disabled
                    if (this.config.enableFullscreen == false)
                        fullscreenControl.remove();

                    var removedMarkerQueryParam = false;

                    function stopPropagation(e)
                    {
                        e.stopPropagation();
                    }

                    // Click event on fullscreen button
                    fullscreenControlButton.addEventListener("click", function(e)
                    {
                        // Always exit fullscreen if in either mode
                        if (this.isFullscreen || this.isWindowedFullscreen)
                        {
                            if (this.isFullscreen)         this.setFullscreen(false);
                            if (this.isWindowedFullscreen) this.setWindowedFullscreen(false);
                        }

                        // If control key is pressed, use the opposite mode
                        else if (e.ctrlKey || e.metaKey)
                        {
                            if (this.config.fullscreenMode == "screen")
                                this.setWindowedFullscreen(true);
                            else if (this.config.fullscreenMode == "window")
                                this.setFullscreen(true);
                        }

                        // Otherwise use the default mode
                        else
                        {
                            if (this.config.fullscreenMode == "screen")
                                this.setFullscreen(true);
                            else if (this.config.fullscreenMode == "window")
                                this.setWindowedFullscreen(true);
                        }
                        
                        e.stopPropagation();
                        
                    }.bind(this));
                    
                    fullscreenControlButton.addEventListener("dblclick", stopPropagation);
                    fullscreenControlButton.addEventListener("mousedown", stopPropagation);

                    this.elements.rootElement.addEventListener("fullscreenchange", function(e)
                    {
                        this.isFullscreen = document.fullscreenElement == e.currentTarget;
                        this.isFullscreenTransitioning = false;

                        // Toggle the fullscreen class on the document body
                        document.documentElement.classList.toggle("fullscreen", this.isFullscreen);

                        // Toggle the fullscreen class on the root element
                        this.elements.rootElement.classList.toggle("mapsExtended_fullscreen", this.isFullscreen);

                        // Change the tooltip that is shown to the user on hovering over the button
                        this.elements.fullscreenControlButton.setAttribute("title", this.isFullscreen || this.isWindowedFullscreen ? mapsExtended.i18n.msg("fullscreen-exit-tooltip").plain() : mapsExtended.i18n.msg("fullscreen-enter-tooltip").plain());

                        // Toggle classes on the fullscreen A element to influence which icon is displayed
                        this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-in", !this.isFullscreen && !this.isWindowedFullscreen);
                        this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-out", this.isFullscreen || this.isWindowedFullscreen);
                        
                    }.bind(this));

                    document.addEventListener("keydown", function(e)
                    {
                        // F11 pressed
                        if (e.keyCode == 122)
                        {
                            // ...while in windowed fullscreen but not normal fullscreen -> Enter normal fullscreen
                            // ...while in windowed fullscreen and normal fullscreen -> Exit normal fullscreen
                            if ((this.isWindowedFullscreen && !this.isFullscreen) || 
                                (this.isWindowedFullscreen && this.isFullscreen))
                            {
                                this.toggleFullscreen();
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }

                        // Escape pressed while in windowed fullscreen
                        if (e.keyCode == 27 && this.isWindowedFullscreen) // Escape
                            this.setWindowedFullscreen(false);
                    
                    }.bind(this));

                }.bind(this));
            },

            // Search

            initSearchStyles: once(function()
            {
                // Keep search dropdown open when search box is focused
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchDropdown.wds-dropdown:focus-within .wds-dropdown__content { display: block; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchDropdown.wds-dropdown:focus-within:not(.wds-no-chevron):after, .mapsExtended_searchDropdown.wds-dropdown:focus-within:not(.wds-no-chevron):before { display: block; }");
                
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchDropdown > .wds-dropdown__content { width: 250px; padding: 0; overflow: hidden; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_search { display: flex; flex-direction: column; }");
                
                // Search box styling
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchBox { width: 100%; padding: 18px 12px; margin: 0 !important; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchBox > .wds-input__hint-container > .wds-input__hint { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }");
        
                // Search results styling
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults { width: 100%; overflow-y: auto; font-size: 14px; font-weight: normal; line-height: 1em; user-select: none; position: relative; flex-grow: 1; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_headerWrapper { position: sticky; top: -0.5px; background-color: var(--theme-page-background-color--secondary); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_header { padding: 12px; display: flex; align-items: center; background-color: rgba(var(--theme-page-text-color--rgb), 0.2); cursor: pointer; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_items:not(:empty) { overflow-y: hidden; padding: 8px 0; border-bottom: 1px solid var(--theme-border-color); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_item { padding: 12px 24px; padding-bottom: 10px; cursor: pointer; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_item.selected { color: var(--theme-accent-label-color); background-color: var(--theme-accent-color); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_item.selected:hover { background-color: var(--theme-accent-color--hover); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_item.selected:hover:active { background-color: var(--theme-accent-color); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_item > div:last-of-type { font-size: 10px; color:var(--theme-page-text-mix-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_item.selected > div:last-of-type { color: var(--theme-accent-dynamic-color-2); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container:not(.filtered) .mapsExtended_searchResults_item:hover:not(.selected) { background-color: rgba(var(--theme-page-text-color--rgb), 0.1); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_header:hover { background-color: rgba(var(--theme-page-text-color--rgb), 0.3); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container:not(.filtered) .mapsExtended_searchResults_item:hover:active, .mapsExtended_searchResults_header:hover:active { background-color: rgba(var(--theme-page-text-color--rgb), 0.2); }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container { margin: 8px 0; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container.filtered { opacity: 0.5; cursor: default; }")
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container.filtered > .mapsExtended_searchResults_items > .mapsExtended_searchResults_item { cursor: default; pointe-events: none; }")
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container.collapsed { border-bottom: none; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchResults_container.collapsed > .mapsExtended_searchResults_items { display: none; }");
        
                // Leaflet marker highlight
                mapsExtended.stylesheet.insertRule(".leaflet-marker-icon.search-result-highlight:before { content: ''; width: 64px; height: 64px; border-width: 2px; border-style: solid; border-color: var(--theme-accent-color); border-radius: 50%; background-color: rgba(var(--theme-accent-color--rgb), 65%); transition-property: filter, border-color; transition-duration: 0.2s; transition-timing-function: ease-in-out; position: absolute; left: calc(50% - 32px); top: calc(50% - 32px); z-index: -1 !important; }");
                mapsExtended.stylesheet.insertRule(".leaflet-marker-icon.search-result-highlight.search-result-highlight-fixed:before { border-color: var(--theme-page-dynamic-color-1); filter: drop-shadow(0px 0px 8px var(--theme-page-dynamic-color-1)); }");
        
                // When mapsExtended_searchFiltered is applied to the root leaflet-container, any markers not with the search-result class will be hidden
                mapsExtended.stylesheet.insertRule(".mapsExtended_searchFiltered .leaflet-marker-icon:not(.search-result), .mapsExtended_searchFiltered .mapsExtended_searchResults .mapsExtended_searchResults_item:not(.search-result), .mapsExtended_searchFiltered .mapsExtended_searchResults > .mapsExtended_searchResults_container:not(.search-result) { display: none !important; }");
                
            }, mapsExtended),
            
            initSearch: function()
            {
                // Modify and set up some styles - this is only run once
                this.initSearchStyles();

                // Create the search dropdown
                var searchDropdown = document.createElement("div");
                searchDropdown.className = "mapsExtended_searchDropdown wds-dropdown"
                searchDropdown.innerHTML = "<div class=\"wds-dropdown__toggle\" role=\"button\"><button type=\"button\" class=\"wds-pill-button mapsExtended_searchDropdownButton\"><span class=\"wds-pill-button__icon-wrapper\"></span></button></div><div class=\"wds-dropdown__content wds-is-left-aligned wds-is-not-scrollable\"><div class=\"mapsExtended_search\"><div class=\"mapsExtended_searchBox wds-input has-hint\"><input class=\"wds-input__field\" id=\"mapsExtended_searchInput\" type=\"text\" placeholder=\"Search\"><div class=\"wds-input__hint-container\"><div class=\"wds-input__hint\">No results found</div></div></div><div class=\"mapsExtended_searchResults interactive-maps__filters-dropdown-list--can-scroll-down interactive-maps__filters-dropdown-list--can-scroll-up\"></div></div></div>";

                // Add a search icon from wds-icons to the dropdown
                mw.hook("dev.wds").add(function(wds)
                {
                    var searchIcon = wds.icon("magnifying-glass-tiny");
                    var dropdownIcon = wds.icon("dropdown-tiny");
                    dropdownIcon.classList.add("wds-icon", "wds-pill-button__toggle-icon")

                    var wdsIconWrapper = searchDropdown.querySelector(".wds-pill-button__icon-wrapper");
                    wdsIconWrapper.appendChild(searchIcon);
                    wdsIconWrapper.after(dropdownIcon);
                });

                var searchRoot = searchDropdown.querySelector(".mapsExtended_search");
                var searchBox = searchRoot.querySelector(".mapsExtended_searchBox");
                var searchBoxText = searchBox.querySelector("#mapsExtended_searchInput");
                var searchBoxHint = searchBox.querySelector(".wds-input__hint");
                var searchResultsList = searchRoot.querySelector(".mapsExtended_searchResults");
                var searchDropdownButton = searchDropdown.querySelector(".mapsExtended_searchDropdownButton");

                // Cache the elements
                this.elements.searchRoot = searchRoot;
                this.elements.searchBox = searchBox;
                this.elements.searchBoxText = searchBoxText;
                this.elements.searchBoxHint = searchBoxHint;
                this.elements.searchResultsList = searchResultsList;
                this.elements.searchDropdownButton = searchDropdownButton;

                // Set some strings from i18n
                searchBoxText.setAttribute("placeholder", mapsExtended.i18n.msg("search-placeholder").plain());
                this.updateSearchSubtitle();

                // Resize the searchRoot to be a bit less than the height of the root map container
                searchRoot.style.maxHeight = (this.elements.rootElement.clientHeight - 36) + "px";

                /* Events and functions */

                // Add a listener which fires when the input value of the search box changes. This drives search
                searchBoxText.addEventListener("input", function(e)
                {
                    if (e.target.value == "" || e.target.value == undefined)
                        this.updateSearchList(this.emptySearch);
                    else
                        this.updateSearchList(this.searchMarkers(e.target.value));

                }.bind(this));

                // Add a listener which changes the min height of the search box when it is opened
                searchDropdownButton.addEventListener("mouseenter", function(e)
                {
                    // Resize the searchRoot to be a bit less than the height of the root map container
                    this.elements.searchRoot.style.maxHeight = (this.elements.rootElement.clientHeight - (this.isFullscreen || this.isWindowedFullscreen ? 60 : 36)) + "px";
                    
                }.bind(this));

                var onListItemHovered = function(e)
                {
                    var marker = e.currentTarget.marker;
                    this.toggleMarkerHighlight(marker, e.type == "mouseenter");
                    
                }.bind(this);

                var onListItemClicked = function(e)
                {
                    var marker = e.currentTarget.marker;
                    if (!marker || !marker.markerElement) return;

                    if (!marker.category.visible || marker.category.disabled) return;

                    // Determine whether this item should be selected or unselected
                    var selected = marker.searchResultsItem.classList.contains("selected");
                    selected = !selected;
                    
                    // Deselect the previous marker
                    if (selected == true && this.searchSelectedMarker && marker != this.searchSelectedMarker)
                    {
                        var deselectedMarker = this.searchSelectedMarker;
                        this.searchSelectedMarker = undefined;
                        this.toggleMarkerHighlight(deselectedMarker, false);
                        this.toggleMarkerSelected(deselectedMarker, false);
                    }

                    this.toggleMarkerSelected(marker, selected);
                    
                }.bind(this);

                var onCategoryHeaderHovered = function(e)
                {
                    var category = e.currentTarget.category;
                    var show = e.type == "mouseenter";
                    this.toggleCategoryMarkerHighlight(category, show);
                    
                }.bind(this);

                var onCategoryHeaderClicked = function(e)
                {
                    var category = e.currentTarget.category;
                    var container = category.elements.searchResultsContainer;
                    var items = category.searchResultsItemsList;
                    var header = category.elements.searchResultsHeader;

                    var listRect = searchResultsList.getBoundingClientRect();
                    var containerRect = container.getBoundingClientRect();
                    var headerRect = header.getBoundingClientRect();

                    container.collapsed = !container.collapsed || false;
                    container.classList.toggle("collapsed", container.collapsed);

                    // Scroll to item if we've scrolled past it
                    if (searchResultsList.scrollTop > container.offsetTop)
                        searchResultsList.scrollTop = container.offsetTop;

                    //searchResultsList.scrollTop = container.;
                    
                }.bind(this);

                this.events.onCategoryToggled.subscribe(function(args)
                {
                    if (args.category.disabled) return;
                    
                    // Deselect the current marker if it belongs to the category being filtered out
                    if (args.value == false && this.searchSelectedMarker && this.searchSelectedMarker.categoryId == args.category.id)
                        this.toggleMarkerSelected(this.searchSelectedMarker, false);
                    
                    args.category.elements.searchResultsContainer.classList.toggle("filtered", !args.value);
                    this.updateSearchSubtitle();
                    
                }.bind(this));

                for (var i = 0; i < this.categories.length; i++)
                {
                    var category = this.categories[i];
                    if (category.disabled || category.startDisabled) continue;

                    // Create a container for markers in this category
                    var container = document.createElement("div");
                    container.className = "mapsExtended_searchResults_container" + (category.visible ? "" : " filtered");
                    category.elements.searchResultsContainer = container;

                    // Create a header list item
                    var header = document.createElement("div");
                    header.className = "mapsExtended_searchResults_header";
                    header.category = category;
                    header.addEventListener("mouseenter", onCategoryHeaderHovered);
                    header.addEventListener("mouseleave", onCategoryHeaderHovered);
                    header.addEventListener("click", onCategoryHeaderClicked);

                    var headerIcon = category.elements.checkboxLabelIcon.cloneNode(true);
                    header.appendChild(headerIcon);

                    var headerTextWrapper = document.createElement("div");
                    var headerText = document.createElement("span");
                    headerText.textContent = category.name;
                    var headerCount = document.createElement("span");
                    headerTextWrapper.appendChild(headerText);
                    headerTextWrapper.appendChild(new Text(" "));
                    headerTextWrapper.appendChild(headerCount);
                    header.appendChild(headerTextWrapper);

                    category.elements.searchResultsHeader = header;
                    category.elements.searchResultsHeaderText = headerText;
                    category.elements.searchResultsHeaderCount = headerCount;

                    // Create a header wrapper
                    var headerWrapper = document.createElement("div");
                    headerWrapper.className = "mapsExtended_searchResults_headerWrapper";
                    headerWrapper.appendChild(header);

                    // Create an item wrapper
                    var itemsList = document.createElement("div");
                    itemsList.className = "mapsExtended_searchResults_items";
                    category.elements.searchResultsItemsList = itemsList;
                    
                    container.appendChild(headerWrapper);
                    container.appendChild(itemsList);

                    // Create a new array of the markers in this category, sorted by their popup title
                    var sortedMarkers = category.markers.slice().sort(this.markerCompareFunction("name"));

                    // Create a marker list item for each marker
                    for (var j = 0; j < sortedMarkers.length; j++)
                    {
                        var item = document.createElement("div");
                        item.className = "mapsExtended_searchResults_item";
                        item.marker = sortedMarkers[j];

                        var itemText = document.createElement("div");
                        itemText.textContent = sortedMarkers[j].popup.title;
                        item.appendChild(itemText);

                        var itemId = document.createElement("div");
                        itemId.textContent = "(" + sortedMarkers[j].id + ")";
                        item.appendChild(itemId);
                        
                        itemsList.appendChild(item); 

                        sortedMarkers[j].searchResultsItem = item;
                        sortedMarkers[j].searchResultsItemText = itemText;
                        
                        item.addEventListener("mouseenter", onListItemHovered);
                        item.addEventListener("mouseleave", onListItemHovered);
                        item.addEventListener("click", onListItemClicked);
                    }

                    searchResultsList.appendChild(container);
                };

                // Hide the seach box if the config says to
                if (this.config.enableSearch == false)
                    searchDropdown.style.display = "none";

                // Finally, add the searchDropdown to the map
                this.elements.filtersList.prepend(searchDropdown);
                
                // Initialize search with an empty-term "full" search
                var emptySearch = { searchTerm: "" };
                emptySearch.results = this.markers;
                emptySearch.categories = this.categories;
                emptySearch.markerMatches = [],
                emptySearch.categoryMatches = [],
                emptySearch.counts = {};
                emptySearch.isEmptySearch = true;
                
                for (var i = 0; i < this.categories.length; i++)
                    emptySearch.counts[this.categories[i].id] = this.categories[i].markers.length;
                
                this.emptySearch = emptySearch;

                // Construct update the search list with a full search
                this.updateSearchList();
            },

            // Updates the search list using a completed search. The search object should be { searchTerm, results }
            // Pass this.emptySearch, or null to reset the search list
            updateSearchList: function(search)
            {
                var t0 = performance.now();
                if (!search) search = this.emptySearch;

                var numFilteredCategories = 0;
                var numDisplayedCategories = 0;

                // Toggle mapsExtended_searchFiltered class on if the search has results
                this.elements.rootElement.classList.toggle("mapsExtended_searchFiltered", !search.isEmptySearch);
                
                for (var i = 0; i < this.markers.length; i++)
                {
                    var marker = this.markers[i];

                    // Skip if marker category is disabled
                    if (marker.category.disabled) continue;
                    
                    var isInResults = search.results.includes(marker);
                    var isInMatches = search.markerMatches.includes(marker);
                    var wasInMatches = this.lastSearch != undefined && this.lastSearch.markerMatches.includes(marker);
                    
                    if (marker.markerElement)
                        marker.markerElement.classList.toggle("search-result", isInResults);
                    if (marker.searchResultsItem)
                        marker.searchResultsItem.classList.toggle("search-result", isInResults);

                    if (isInMatches)
                        this.highlightTextWithSearchTerm(marker.searchResultsItemText, marker.popup.title, marker.nameNormalized, search.searchTerm);
                    else if (wasInMatches)
                        marker.searchResultsItemText.textContent = marker.popup.title;
                }
        
                // Show or hide categories depending on whether there are markers in the results in the category
                for (var i = 0; i < this.categories.length; i++)
                {
                    // If any of the results have a categoryId of this category, we should show the category header
                    var category = this.categories[i];

                    // Skip if category is disabled
                    if (category.disabled) continue;
                    
                    var isInResults = search.categories.includes(category);
                    var isInMatches = search.categoryMatches.includes(category);
                    var wasInMatches = this.lastSearch != undefined && this.lastSearch.categoryMatches.includes(category);

                    // Update the highlighted search string in the category header
                    if (isInMatches && !search.isEmptySearch)
                        this.highlightTextWithSearchTerm(category.elements.searchResultsHeaderText, category.name, category.nameNormalized, search.searchTerm);
                    else if (wasInMatches)
                        category.elements.searchResultsHeaderText.replaceChildren(category.name);

                    // Toggle the hidden class on if markers of the category don't appear in the results - this hides the category
                    category.elements.searchResultsContainer.classList.toggle("search-result", isInResults);

                    // Toggle the filtered class on if this category is not visible - this greys out the category
                    category.elements.searchResultsContainer.classList.toggle("filtered", !category.visible);

                    // Update the current marker highlights if the category header is still being hovered over
                    if (category.elements.searchResultsHeader.matches(":hover"))
                        this.toggleCategoryMarkerHighlight(category, true);

                    // Update the label to reflect the amount of markers in the results
                    category.elements.searchResultsHeaderCount.textContent = "(" + (search.counts[category.id] || 0) + ")";
                }

                this.lastSearch = search;
                this.updateSearchSubtitle();
                
                var t1 = performance.now();
                log("Updating search elements took " + (t1 - t0) + " milliseconds.");
            },

            highlightTextWithSearchTerm: function(element, text, textNormalized, searchTerm)
            {
                if (!element || !searchTerm || !text)
                    return;
                
                // Get index of the search term in the text
                var index = textNormalized.toLowerCase().indexOf(searchTerm.toLowerCase());

                if (index == -1)
                    console.error("Tried to highlight term \"" + searchTerm + "\" that was not found in the text \"" + textNormalized + "\"");

                // Create a new element that represents the highlighted term, adding the search term found within the text to it
                var highlight = document.createElement("mark");
                highlight.textContent = text.slice(index, index + searchTerm.length);

                // Replace all children on the element with
                // 1. The first part of the string, before the term
                // 2. The highlighted search term
                // 3. The last part of the string, after the term
                element.replaceChildren(new Text(text.slice(0, index)), highlight, new Text(text.slice(index + searchTerm.length)));
            },

            toggleCategoryMarkerHighlight: function(category, value)
            {
                for (var i = 0; i < category.markers.length; i++)
                {
                    this.toggleMarkerHighlight(category.markers[i], value && this.lastSearch.results.includes(category.markers[i]));
                }
            },

            toggleMarkerSelected: function(marker, value)
            {
                if (!marker || !marker.markerElement || !marker.searchResultsItem) return;

                if (value == true)
                {
                    this.lastMarkerClicked = marker;
                    this.lastMarkerElementClicked = marker.markerElement;
                }
                
                this.searchSelectedMarker = value ? marker : undefined;
                
                // Set/unset the selected class on the list item
                marker.searchResultsItem.classList.toggle("selected", value);

                // Set/unset the search-result-highlight-fixed class on the marker element
                marker.markerElement.classList.toggle("search-result-highlight", value);
                marker.markerElement.classList.toggle("search-result-highlight-fixed", value);

                // Show/hide the marker popup
                marker.popup.toggle(value);
            },

            // This sets and unsets a highlighting circle that is shown behind a marker
            // (this used to be animated, but it feels much better having it be snappy)
            toggleMarkerHighlight: function(marker, value)
            {
                if (!(marker && marker.markerElement)) return;

                // Don't allow highlighting a marker that is already selected in the search list
                if (this.searchSelectedMarker == marker) return;

                // Set the value if it wasn't passed to the opposite of whatevr it currently is
                if (value == undefined)
                    value = !marker.markerElement.classList.contains("search-result-highlight");

                marker.markerElement.classList.toggle("search-result-highlight", value);
                marker.markerElement.style.zIndex = (value ? (9999999 + marker.order) : marker.order).toString();
            },

            // This updates the hint shown under the search box to reflect the state of the search
            updateSearchSubtitle: function()
            {
                var lastSearch = this.lastSearch;
                var hasResults = lastSearch && lastSearch.results && lastSearch.results.length > 0;
                this.elements.searchBox.classList.toggle("has-error", lastSearch && !hasResults);
                
                if (lastSearch)
                {
                    if (hasResults)
                    {
                        var numMarkers = lastSearch.results.length;
            
                        // Number of categories that are represented in the search and displayed
                        var numDisplayedCategories = lastSearch.categories.length;
            
                        // Number of categories that are represented in the search and hidden/filtered
                        var numFilteredCategories = lastSearch.categories.filter(function(c) { return c.visible == false; }).length;

                        if (numFilteredCategories > 0)
                            this.elements.searchBoxHint.textContent = mapsExtended.i18n.msg("search-hint-resultsfiltered", numMarkers, numDisplayedCategories, numFilteredCategories).plain();
                        else
                            this.elements.searchBoxHint.textContent = mapsExtended.i18n.msg("search-hint-results", numMarkers, numDisplayedCategories).plain();
                    }
                    else
                    {
                        this.elements.searchBoxHint.textContent = mapsExtended.i18n.msg("search-hint-noresults", lastSearch.searchTerm).plain();
                    }
                }
            },

            // Searches the "popup.title" field of all markers to check whether it contains a specific search term
            // This utilizes memoizing, where we save past searches to reduce the amount of markers that need to be searched through,
            // should an old search term include a term that is used in the new search term
            // Use an empty string "" or don't pass a searchTerm to get all markers
            searchMarkers: function(searchTerm)
            {
                var t0 = performance.now();

                if (this.searches == undefined)
                    this.searches = [ this.emptySearch ];

                if (!searchTerm || searchTerm == "")
                    return emptySearch;
                
                searchTerm = searchTerm.toLowerCase();
                
                var closestSearchIndex = -1;

                // For the closest matching previous search, this is the amount of characters that were added to the new search
                var closestSearchMinimumDiff = Infinity;

                for (var i = this.searches.length - 1; i >= 0; i--)
                {
                    // If the new search term was exactly the same as a previous term, don't bother repeating the search
                    if (searchTerm == this.searches[i].searchTerm)
                    {
                        closestSearchIndex = i;
                        closestSearchMinimumDiff = 0;
                        break;
                    }

                    // If the old search term is found within the new search term
                    else if (searchTerm.includes(this.searches[i].searchTerm))
                    {
                        // ...determine how many character less it has
                        var diff = searchTerm.length - this.searches[i].searchTerm.length;

                        /// And if it has the smallest difference so far, remember it
                        if (diff < closestSearchMinimumDiff)
                        {
                            closestSearchIndex = i;
                            closestSearchMinimumDiff = diff;
                        }
                    }
                }

                var baseSearch;
                var search =
                {
                    searchTerm: searchTerm,
                    results: [],              // A combination of all markers of the below
                    categories: [],           // Categories of markerMatches or categoryMatches
                    markerMatches: [],        // Markers whose name or category name matched the search term
                    categoryMatches: [],      // Categories whose name matched the search term
                    counts: {}                // Object with keys of all category.id in categories, and values of the amount of markers in the results in that category
                };

                // Reuse previous search results as a basis for the new results
                if (closestSearchIndex != -1)
                {
                    baseSearch = this.searches[closestSearchIndex];
                    log("Centering search on \"" + baseSearch.searchTerm + "\" with " + baseSearch.markerMatches.length + " marker matches and " + baseSearch.categoryMatches.length + " category matches");
                }

                // Otherwise base off all markers
                else
                {
                    baseSearch = this.emptySearch;
                    log("Centering search on all markers");
                }
                
                // Only perform search if the search is different to the one it is based off, and the last search had results
                // This executes even with empty results, as we want to retrieve the amount of results regardless
                if (closestSearchMinimumDiff > 0 && baseSearch && baseSearch.results.length > 0)
                {
                    var category;
                    
                    for (var i = 0; i < baseSearch.categories.length; i++)
                    {
                        category = baseSearch.categories[i];
                        
                        // Skip if this category is disabled
                        if (category.disabled) continue;

                        // Find all category names that include the search term
                        if (category.nameNormalized.toLowerCase().includes(searchTerm))
                        {
                            // Add all markers in this category to the results
                            var length = category.markers.length;
                            for (var j = 0; j < length; j++)
                            {
                                search.results.push(category.markers[j]);
                            }

                            // Store the length in the counts element for this category
                            search.counts[category.id] = length;

                            // Add this category to the results
                            search.categories.push(category);
                            search.categoryMatches.push(category);
                        }
                    }
                    
                    var len = baseSearch.results.length;
                    var marker;
                    
                    for (var i = 0; i < len; i++)
                    {
                        marker = baseSearch.results[i];

                        // Skip if this category is disabled
                        if (marker.category.disabled) continue;

                        // Find all markers that include the search term
                        if (marker.nameNormalized.toLowerCase().includes(searchTerm))
                        {
                            // Add matcher to markerMatches
                            search.markerMatches.push(marker);
                            
                            // Don't re-add to results if this marker's category was included as the result of a categoryMatch
                            if (!search.categoryMatches.includes(marker.category))
                            {
                                // Add marker to results
                                search.results.push(marker);

                                // Add 1 to the count for this category
                                search.counts[marker.category.id] = search.counts[marker.category.id] + 1 || 1;

                                // Add category to results (need to check because we only want to add one of each)
                                if (!search.categories.includes(marker.category))
                                    search.categories.push(marker.category);
                            }
                        }
                    }

                    // Add this search to the search history
                    this.searches.push(search);

                    // Remove the first item in the search history if it exceeds 100 searches
                    if (this.searches.length > 100)
                        this.searches.unshift();
                }

                // Search is idential
                else if (closestSearchMinimumDiff == 0)
                {
                    log("Search was identical, using previous results");
                    search = baseSearch;
                }

                var t1 = performance.now();
                log("Search took " + (t1 - t0) + " milliseconds.");

                return search;
            },

            // Category groups

            initCategoryGroupsStyles: once(function()
            {
                // Change selectors that are rooted to interactive-maps__filters-dropdown to instead be rooted to interactive-maps__filters-list
                // so that they apply to all dropdowns within interactive-maps__filters-list
                changeCSSRuleSelector(".interactive-maps__filters-dropdown .wds-dropdown::after, .interactive-maps__filters-dropdown .wds-dropdown::before",
                                   ".interactive-maps__filters-list .wds-dropdown::after, .interactive-maps__filters-list .wds-dropdown::before");
                changeCSSRuleSelector(".interactive-maps__filters-dropdown .wds-dropdown__content", ".interactive-maps__filters-list .wds-dropdown__content");
                
                // Change some of the scroll up/down shadows
                deleteCSSRule(".interactive-maps__filters-dropdown-list--can-scroll-down::after, .interactive-maps__filters-dropdown-list--can-scroll-up::before");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-dropdown-list--can-scroll-up::before, .interactive-maps__filters-dropdown-list--can-scroll-down::after { opacity: 1; }");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-dropdown-list::before { box-shadow: rgb(0 0 0 / 20%) 0px -20px 12px 8px; }");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-dropdown-list::after { box-shadow: rgb(0 0 0 / 20%) 0px 20px 12px 8px }");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-dropdown-list::before, .interactive-maps__filters-dropdown-list::after { content: \"\"; position: sticky; display: block; width: 100%; transition: opacity 0.2s linear; opacity: 0; }");
                
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-list .wds-dropdown__content { padding: 0; overflow: hidden; background-color: rgba(var(--theme-page-background-color--secondary--rgb), 0.95); }");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-dropdown-list { padding: 18px 12px; max-height: inherit; }");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-list { margin-bottom: 12px; width: 100%; }");
                mapsExtended.stylesheet.insertRule(".interactive-maps__filters-list > .wds-dropdown { margin-right: 6px; }");
                
                // mapsExtended_categoryGroup rules
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroup { overflow-y: hidden; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroup .wds-checkbox { width:100%; }");

                // mapsExtended_categoryGroupHeader rules
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroupHeader { position: relative; user-select: none; }");

                // mapsExtended_categoryGroupHeaderLabel rules
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroupHeaderLabel { align-self: center; cursor: pointer; line-height: 1; }");

                // mapsExtended_categoryGroupHeaderArrow rules
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroupHeaderArrow { color: rgba(var(--theme-page-text-color--rgb), 0.5); font-size: 10px; margin-left: 10px; cursor: pointer; align-self: center; flex-grow: 1; }");
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroupHeaderArrow:hover { color: var(--theme-page-text-color); }");

                // mapsExtended_categoryGroupChildren rules
                mapsExtended.stylesheet.insertRule(".mapsExtended_categoryGroupChildren { margin-left: 16px; transition: max-height 0.25s ease-in-out; max-height: fit-content; overflow-y: hidden; }");

                // Insert a new rule which negates the margin-bottom on filters
                mapsExtended.stylesheet.insertRule(".interactive-maps__filter-all, .interactive-maps__filter:not(:last-child) { margin-bottom: 0; }");

                // Insert a new rule which tightens the padding on filters
                mapsExtended.stylesheet.insertRule(".interactive-maps__filter, .interactive-maps__filter-all { padding: 4px 3px; }");

                // Insert new style rules to add indeterminate support to WDS checkboxes
                var indeterminateSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 18 18'%3E%3Cpath d='M 3 15 L 15 15 L 15 3 L 3 3 L 3 15 Z M 16 1 L 2 1 C 1.447 1 1 1.447 1 2 L 1 16 C 1 16.552 1.447 17 2 17 L 16 17 C 16.552 17 17 16.552 17 16 L 17 2 C 17 1.447 16.552 1 16 1 Z' fill-rule='evenodd'/%3E%3Crect x='3.733' y='6.172' width='8.5' height='2.25' rx='1' ry='1' style='fill-rule: evenodd;' transform='matrix(1, -0.000663, 0, 1, 1.017, 1.708293)'/%3E%3C/svg%3E";
                mapsExtended.stylesheet.insertRule(".wds-checkbox input[type=checkbox]:indeterminate+label:after { " +
                    "background-color: var(--wds-checkbox-check-color);" +
                    "mask-image: url(\"" + indeterminateSvg + "\");" + 
                    "-webkit-mask-image: url(\"" + indeterminateSvg + "\");" + 
                    "-webkit-mask-repeat: no-repeat;" +
                    "mask-repeat: no-repeat;" +
                "}");
                mapsExtended.stylesheet.insertRule(".wds-checkbox input[type=checkbox]:indeterminate:hover:not(:disabled)+label:after { background-color: var(--wds-checkbox-check-color--hover); }");
                mapsExtended.stylesheet.insertRule(".wds-checkbox input[type=checkbox]:indeterminate:hover:not(:disabled)+label:after { background-color: var(--wds-checkbox-check-color); }");
                
            }, mapsExtended),

            // This function creates all the categoryGroups from the definitions in the categoryGroups array
            // It's fairly complex since it supports nesting categories to any depth
            initCategoryGroups: function()
            {
                // Simplify the filters dropdown by making interactive-maps__filters-dropdown and .wds-dropdown the same object
                var filtersDropdownInner = this.elements.filtersDropdown.querySelector(".wds-dropdown");
                this.elements.filtersDropdown.classList.add("wds-dropdown");
                filtersDropdownInner.before(this.elements.filtersDropdown.querySelector(".wds-dropdown__toggle"));
                filtersDropdownInner.before(this.elements.filtersDropdown.querySelector(".wds-dropdown__content"));
                filtersDropdownInner.remove();
                
                // Modify and set up some styles - this is only executed once
                this.initCategoryGroupsStyles();
                
                // If there are no category groups, or if the object is not an array
                // just map the categories directly so that all categories are at the root
                if (!this.config.categoryGroups || !Array.isArray(this.config.categoryGroups))
                    this.config.categoryGroups = this.categories.map(function(c){ return c.id; });

                // Remove original "Select all" checkbox
                var selectAllFilterElement = this.elements.filterAllCheckboxInput.closest(".interactive-maps__filter-all");
                var selectAllLabelText = this.elements.filterAllCheckboxInput.nextElementSibling.textContent;
                selectAllFilterElement.remove();

                // To simplify the hierarchical structure, create a brand new root "Select all" group
                // and put all the categoryGroups within it (they will be created recursively in the ctor)
                var rootGroup = new CategoryGroup(
                {
                    label: selectAllLabelText,
                    children: this.config.categoryGroups.slice(),
                    map: this
                });

                this.config.categoryGroups = [ rootGroup ];
                var categoryGroupTree = rootGroup.flattenedGroups;
                categoryGroupTree[rootGroup.id] = rootGroup;
                
                // Use filter() to get a list of category matching the predicate
                // In this case, all categories that have not been assigned to any of the
                // category groups at any level in the hierarchy
                var ungroupedCategories = this.categories.filter(function(c)
                {
                    // Check if any category group in the config contains this category
                    return !Object.values(categoryGroupTree).some(function(cg)
                    {
                        // Check if a category group contains a category with this ID
                        return cg.categories.some(function(cgc)
                        {
                            // Check if this category ID matches the testing ID
                            return cgc.id == c.id;
                        });
                    });
                });
                
                // If there are ungrouped categories
                if (ungroupedCategories.length > 0)
                {
                    // Add any categories that aren't grouped to the rootGroup
                    ungroupedCategories.forEach(function(uc)
                    {
                        rootGroup.addCategoryToGroup(uc.id);
                        rootGroup.children.push(uc);
                    });

                    // Update the checked visual state
                    rootGroup.updateCheckedVisualState();
                }

                // Resize the searchRoot to be a bit less than the height of the root map container
                this.elements.filtersDropdownContent.style.maxHeight = (this.elements.rootElement.clientHeight - 36) + "px";

                // Add a listener which changes the min height of the search box when it is opened
                this.elements.filtersDropdownButton.addEventListener("mouseenter", function(e)
                {
                    // Resize the list to be a bit less than the height of the root map container
                    this.elements.filtersDropdownContent.style.maxHeight = (this.elements.rootElement.clientHeight - (this.isFullscreen || this.isWindowedFullscreen ? 60 : 36)) + "px";
                    
                }.bind(this));
            }
        };

        function CategoryGroup(group, parentGroup)
        {
            // Save some fields from the definition
            this.isRoot = !parentGroup;
            this.id = this.isRoot ? "root" : group.label.toLowerCase().replace(" ", "_"),
            this.label = group.label;
            this.path = this.isRoot ? "root" : parentGroup.path + "." + this.id;
            this.parentGroup = parentGroup;
            this.collapsible = (group.collapsible == true || group.collapsible == undefined) && !this.isRoot;
            this.collapsed = group.collapsed == true;
            this.hidden = group.hidden;
            this.children = group.children;
            this.map = group.map || parentGroup.map;
            this.isValid = this.isGroupValid();
            
            this.categories = [];
            this.subgroups = [];
            this.flattenedGroups = {};
            this.checkboxes = [];
            this.elements = this.elements || {};

            // Don't create an invalid group
            if (!this.isValid)
            {
                log("Category group " + this.id + " does not contain any valid categories and will not be created");
                return;
            }
            
            if (this.isRoot)
            {
                // Set the initial maxHeight on all collapsible elements as soon as the filters dropdown is opened
                // This is because the elements are created when the dropdown is hidden, and so the heights aren't
                // calculated/valid isn't set until the element is first displayed and its height is determined
                this.map.elements.filtersDropdownButton.addEventListener("mouseenter", function(e){ this.setInitialHeight(); }.bind(this), { once: true });
            }
            
            var groupElem = document.createElement("div");
            groupElem.className = "mapsExtended_categoryGroup";

            // Create a header element
            var headerElem = document.createElement("div");
            headerElem.className = "mapsExtended_categoryGroupHeader interactive-maps__filter";
            
            // Create the checkbox elements
            var checkboxId = this.map.id + "__checkbox-categoryGroup-" + this.path;

            var checkboxRoot = document.createElement("div");
            checkboxRoot.className = "wds-checkbox";

            var checkboxInput = document.createElement("input");
            checkboxInput.setAttribute("type", "checkbox");
            checkboxInput.setAttribute("name", checkboxId);
            checkboxInput.setAttribute("id", checkboxId);

            var checkboxLabel = document.createElement("label");
            checkboxLabel.setAttribute("for", checkboxId);

            // Create a header label element
            var headerLabel = document.createElement("div");
            headerLabel.className = "mapsExtended_categoryGroupHeaderLabel";
            headerLabel.textContent = this.label.toString();

            // Create header dropdown arrow element (to indicate collapsed state)
            var headerArrow = document.createElement("div");
            headerArrow.className = "mapsExtended_categoryGroupHeaderArrow";
            headerArrow.textContent = this.collapsed == true ? "▲" : "▼";
            headerArrow.style.display = this.collapsible == false ? "none" : "";

            this.elements.root = groupElem;
            this.elements.header = headerElem;
            this.elements.headerLabel = headerLabel;
            this.elements.checkbox = checkboxInput;
            this.elements.headerArrow = headerArrow;

            checkboxRoot.appendChild(checkboxInput);
            checkboxRoot.appendChild(checkboxLabel);
            checkboxLabel.appendChild(headerLabel);
            checkboxRoot.appendChild(headerArrow);
            headerElem.appendChild(checkboxRoot);

            // Create a container element
            var containerElem = document.createElement("div");
            containerElem.className = "mapsExtended_categoryGroupChildren";
            containerElem.style.marginLeft = this.isRoot ? "0" : "";
            this.elements.container = containerElem;
            
            // Insert the header and the container in the group itself
            groupElem.appendChild(headerElem);
            groupElem.appendChild(containerElem);

            // Append the group as a child of its parent
            if (this.isRoot)
                this.map.elements.filtersDropdownList.appendChild(groupElem);
            else
                parentGroup.elements.container.appendChild(groupElem);

            // Move actual category filters into group
            for (var j = 0; j < this.children.length; j++)
            {
                var newChild = undefined;

                // Child is category ID
                if (typeof this.children[j] == "string")
                    newChild = this.addCategoryToGroup(this.children[j]);

                // Child is subgroup
                else if (typeof this.children[j] == "object")
                    newChild = this.addSubgroupToGroup(this.children[j]);

                // Replace element at this index with the category, or the new CategoryGroup object
                if (newChild)
                    this.children[j] = newChild;

                // If it was invalid, remove it at this index
                else
                {
                    this.children.splice(j, 1);
                    j--;
                }
            }

            // Events
            
            // Click event on "parent" group checkbox
            this.elements.checkbox.addEventListener("click", function(e)
            {
                this.visible = e.currentTarget.checked;

                for (var i = 0; i < this.checkboxes.length; i++)
                {
                    // Don't bother propegating click to disabled categories
                    if (!(this.children[i] instanceof CategoryGroup))
                    {
                        if (this.children[i].disabled == true)
                            continue;
                    }

                    // Remove child listener to prevent stack overflow
                    this.checkboxes[i].removeEventListener("click", this.checkboxes[i].clickHandler);
                    
                    // Can't set checked unfortunately, have to simulate a click to toggle it
                    // this also means we have to prevent the above event from being fired
                    // (hence the removeEventListener above and addEventListener below)
                    if (this.checkboxes[i].checked != this.elements.checkbox.checked)
                        this.checkboxes[i].click();

                    // Re-add child listener
                    this.checkboxes[i].addEventListener("click", this.checkboxes[i].clickHandler);
                }
                
            }.bind(this));

            // If this category group should be hidden, hide it (click all checkboxes if they are checked)
            if (this.hidden == true)
            {
                for (var i = 0; i < this.checkboxes.length; i++)
                {
                    if (this.checkboxes[i].checked)
                        this.checkboxes[i].click();
                }
            }

            // Update the visual checked state of the group checkbox
            this.updateCheckedVisualState();

            // Set up collapsible on group
            headerArrow.addEventListener("click", function(e)
            {
                if (this.elements.container.style.maxHeight == "0px")
                {
                    this.collapsed = false;
                    this.elements.container.style.maxHeight = this.expandedHeight + "px";
                    this.elements.headerArrow.textContent = "▼";
                }
                else
                {
                    this.collapsed = true;
                    this.elements.container.style.maxHeight = "0px";
                    this.elements.headerArrow.textContent = "▲";
                }
            }.bind(this));
            /*
            // Cursor enters the group element
            groupElem.addEventListener("mouseenter", function(e)
            {
                // Show (set maxHeight to full scrollHeight)
                var container = e.currentTarget.lastElementChild;
                container.style.maxHeight = container.scrollHeight + "px";

                // Hide every other group
                this.config.categoryGroups.forEach(function(cg)
                {
                    if (cg.groupElement != e.currentTarget) cg.containerElement.style.maxHeight = "0px";
                });
            }.bind(this));

            // Cursor leaves the group element
            groupElem.addEventListener("mouseleave", function(e)
            {
                // Don't hide if this is the last element
                if (e.currentTarget.parentElement.lastElementChild == e.currentTarget)
                    return;
                
                // Hide (set maxHeight to 0)
                var container = e.currentTarget.lastElementChild;
                container.style.maxHeight = "0px";
            });
            */
        }

        CategoryGroup.prototype = 
        {
            isGroupValid: function()
            {
                // The root group is always valid since it will contain all ungrouped categories (they are added after the fact)
                if (this.isRoot == true) return true;
                
                var validCategories = Array.from(this.map.categoryLookup.keys());
                
                function checkIsValid(group)
                {
                    if (!group.children || !Array.isArray(group.children) || group.children.length == 0)
                        return false;
                    
                    return group.children.some(function(c)
                    {
                        if (typeof c == "string")
                            return validCategories.includes(c);
                        else if (typeof c == "object")
                            return checkIsValid(c);
        
                        return false;
                    });
                }

                return checkIsValid(this);
            },
            
            // Adds a category to this group, given a category ID
            addCategoryToGroup: function(categoryId)
            {
                var category = this.map.categoryLookup.get(categoryId);
                    
                if (!category)
                {
                    log("A category with the ID \"" + categoryId + "\" defined in the category group \"" + this.label + "\" does not exist!");
                    return;
                }

                this.elements.container.appendChild(category.elements.filter);
                this.categories.push(category);
                this.registerCheckbox(category.elements.checkboxInput);

                return category;
            },

            // Adds a subgroup to this group, given a group definition (see docs)
            // A group definition is an object containing { label, children } at least
            addSubgroupToGroup: function(group)
            {
                var childGroup = new CategoryGroup(group, this);
                
                if (childGroup.isValid == false)
                    return null;
                
                this.subgroups.push(childGroup);
                this.registerCheckbox(childGroup.elements.checkbox);
                this.flattenedGroups[this.id + "/" + childGroup.id] = childGroup;

                for (var key in childGroup.flattenedGroups)
                    this.flattenedGroups[this.id + "/" + key] = childGroup.flattenedGroups[key];

                return childGroup;
            },

            // Assigns a checkbox to this CategoryGroup, setting up some events so that it
            // is properly updated when the category group checkbox changes, and vice versa
            registerCheckbox: function(checkbox)
            {
                this.checkboxes.push(checkbox);

                // Updated the checked visual state when the child checkbox is clicked
                // For each checkbox in the group, add a click event listener
                checkbox.clickHandler = this.updateCheckedVisualState.bind(this);
                checkbox.addEventListener("click", checkbox.clickHandler);
            },

            // Updates the checked and indeterminate state of a group, based on its children
            // Recurses up the group tree repeating the same action for all parent groups
            updateCheckedVisualState: function()
            {
                var group = this;

                do
                {
                    // Count the number of checked checkboxes in the group
                    var checkedCount = group.checkboxes.filter(function(c) { return c.checked; }).length;
                    var indeterminateCount = group.checkboxes.filter(function(c) { return c.indeterminate; }).length;
                
                    // Check the parent checkbox if there are any checked children.
                    group.elements.checkbox.checked = checkedCount > 0;

                    // If there are any checked children, but not all of them, set the group checkbox to be indeterminate
                    group.elements.checkbox.indeterminate = (checkedCount > 0 && checkedCount < group.checkboxes.length) || indeterminateCount > 0;
                    
                    group = group.parentGroup;
                }
                while (group != undefined);

            },

            setInitialHeight: function()
            {
                // Cache the expanded height so we don't need to keep fetching the scroll height
                // also because the scroll height will differ if any child groups are collapsed
                this.expandedHeight = this.elements.root.clientHeight;

                // Set the height of this group
                this.elements.container.style.maxHeight = (this.collapsed && this.collapsible)
                                                        ? "0px"
                                                        : this.expandedHeight + "px";

                // Set the maxHeight of all child groups of this group
                this.subgroups.forEach(function(childGroup){ childGroup.setInitialHeight(); });
            }

        };

        /*

            ExtendedCategory

        */

        function ExtendedCategory(map, categoryJson)
        {
            Object.assign(this, categoryJson);

            this.id = this.id.toString();
            this.markers = [];
            this.map = map;
            this.nameNormalized = this.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")

            map.categoryLookup.set(this.id, this);

            // Process hints (strings added after double underscore, separated by a single underscore)
            var lastIndex = this.id.lastIndexOf("__");
            this.hints = lastIndex >= 0 ? this.id.slice(lastIndex + 2).split("_") : [];

            // Determine whether the category should be hidden by default
            this.startHidden = this.hints.includes("hidden") || (Array.isArray(map.config.hiddenCategories) && map.config.hiddenCategories.includes(this.id));

            // Determine whether the category should be disabled
            this.startDisabled = this.hints.includes("disabled") || (Array.isArray(map.config.disabledCategories) && map.config.disabledCategories.includes(this.id));

            // Categories always start visible, because we have not yet connected them to the DOM
            this.visible = true;

            // Categories always start enabled, for the same reason
            this.disabled = false;

            this.elements = {};
        }

        ExtendedCategory.prototype =
        {
            toggle: function(value)
            {
                if (this.elements && this.elements.checkboxInput)
                {
                    // Toggle by simulating click (can't set checked directly unfortunately)
                    if (this.elements.checkboxInput.checked != value)
                        this.elements.checkboxInput.click();
                }
                    
                this.visible = value;
            },

            init: function(filterElement)
            {
                // Fetch all elements from root filter
                this.elements.filter = filterElement
                this.elements.checkboxInput = this.elements.filter.querySelector("input");
                this.elements.checkboxLabel = this.elements.filter.querySelector("label");
                this.elements.checkboxLabelIcon = this.elements.checkboxLabel.querySelector(".interactive-maps__filters-marker-icon");
                this.elements.checkboxLabelText = this.elements.checkboxLabel.querySelector("span:last-child");

                // Set some values on the filter element itself
                filterElement.category = this;
                filterElement.id = "filter_" + this.id;

                // Subscribe to the change event on the checkbox input to update the visible bool, and invoke a toggled event
                this.elements.checkboxInput.addEventListener("change", function(e)
                {
                    this.visible = e.target.checked;
                    this.map.events.onCategoryToggled.invoke({ map: this.map, category: this, value: e.target.checked });
                    
                }.bind(this));

                // Hide categories that should start hidden (this is done *before* matching markers)
                // When markers are hidden, they are destroyed, therefore matching markers in a category that will be hidden immediately after is a waste of time
                // In a clustered map, this will trigger recreation of all markers (hence why we do it before initialization)
                if (this.startDisabled == true)
                {
                    this.disabled = true;
                    this.elements.filter.style.display = "none";
                }
                
                if (this.startHidden == true || this.startDisabled == true) this.toggle(false);
            },

            deinit: function()
            {
                // Don't actually need to do anything here since no category elements are removed on refresh                
            }
        }


        /*

            ExtendedMarker

        */

        function ExtendedMarker(map, markerJson)
        {
            // Copy all properties from markerJson into ExtendedMarker
            Object.assign(this, markerJson);

            // Generate a new ID for the marker if the editor hasn't set one
            if (!this.id) this.id = this.calculateMarkerHash();

            // Warn if there already exists a marker with this ID
            if (map.markerLookup.has(this.id))
            {
                console.error("Multiple markers exist with the id " + this.id + "!");
                return null;
            }

            // Add a reference to this marker in the markerLookup
            map.markerLookup.set(this.id, this);

            // Get the category of the marker
            this.category = map.categoryLookup.get(this.categoryId);

            // Add reference to this marker in the category it belongs to
            this.category.markers.push(this);

            this.map = map;
            this.popup = new ExtendedPopup(this);
            this.name = this.popup.title;
            this.nameNormalized = this.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

            // Correct the position to always use xy
            if (map.coordinateOrder == "yx")
            {
                // Swap x and y
                var y = this.position[0];
                this.position[0] = this.position[1];
                this.position[1] = y;
            }

            // Correct the position to always use top-left
            if (map.origin == "bottom-left")
            {
                this.position[1] = map.size.height - this.position[1];
            }

            // Enforce string IDs
            if (typeof this.id == "number")
            {
                this.id = this.id.toString();
            }

            // Set iconAnchor from config
            if (this.usesCustomIcon())
                this.iconAnchor = this.map.config.iconAnchor;
            else
                this.iconAnchor = "bottom-center";
        }

        ExtendedMarker.prototype = 
        {
            // Marker (element in DOM - we don't know this yet)
            markerElement: null,

            // Stores references between the marker definition in the JSON and the marker element and sets up some events
            // Used to be called associateMarkerWithElement
            init: function(markerElement)
            {
                this.initialized = true;
                this.markerElement = markerElement;
                markerElement.marker = this;
                markerElement.id = this.id;
                markerElement.style.zIndex = this.order;

                // Update the iconAnchor if this is a custom marker
                if (this.usesCustomIcon())
                {
                    for (var key in this.map.config.iconAnchorStyles)
                    {
                        if (this.map.config.iconAnchorStyles.hasOwnProperty(key))
                            markerElement.style[key] = this.map.config.iconAnchorStyles[key];
                    }
                }
                
                // Add click events to the element
                markerElement.addEventListener("click", this.onMarkerActivated.bind(this), true);
                markerElement.addEventListener("keydown", this.onMarkerActivated.bind(this), true);

                // Prevent zoom when double clicking on marker
                markerElement.addEventListener("dblclick", function(e){ e.stopPropagation(); });

                // Add mouseenter and mouseleave events to the element
                markerElement.addEventListener("mouseenter", function(e)
                {
                    this.map.lastMarkerHovered = this;
                    this.map.lastMarkerElementHovered = this.markerElement;
                    this.map.events.onMarkerHovered.invoke({ map: this.map, marker: this, value: true, event: e });
                }.bind(this));
                markerElement.addEventListener("mouseleave", function(e){ this.map.events.onMarkerHovered.invoke({ map: this.map, marker: this, value: false, event: e }); }.bind(this));
            },

            // Used to be called deassociateMarkerWithElement
            deinit: function()
            {
                this.initialized = false;
                
                if (this.markerElement)
                {
                    this.markerElement.marker = undefined;
                    this.markerElement.id = "";
                    this.markerElement.style.zIndex = "";
                }

                this.markerElement = undefined;
                this.popup.deinitPopup();
            },

            // Click event on marker
            onMarkerActivated: function(e)
            {
                if (this.map.config.enablePopups == false)
                {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
                
                // While using a custom popup, don't ever pass click events on to Leaflet so that the leaflet popup doesn't get recreated
                // ! Keep this check at the top because we should always cancel it regardless !
                if (this.map.config.useCustomPopups)
                    e.stopPropagation();
                
                // Don't activate marker if the click was the end of a drag
                if (this.map._invalidateLastClickEvent == true)
                {
                    log("Invalidated click event on " + this.id + " because it followed the end of a drag");
                    this.map._invalidateLastClickEvent = false;
                    return;
                }
                
                if (e instanceof KeyboardEvent)
                {
                    if (e.key != "Enter")
                        return;
                }

                if (this.map.config.useCustomPopups)
                    this.popup.toggle();

                // If popups should open only on hover, only non-trusted events (those initiated from scripts)
                // should allow the popup to be opened. Discard click events that are sourced from the browser
                if (this.map.config.openPopupsOnHover == true && e.isTrusted == true)
                {
                    e.stopPropagation();
                    return;
                }
                
                this.map.events.onMarkerClicked.invoke({ map: this.map, marker: this, event: e });
            },

            // Performs a direct comparison between a marker element and a marker definition just to be sure they are equal
            compareMarkerAndJsonElement: function(markerElem, markerJson)
            {
                if (!markerJson) markerJson = this;

                // Valid if these two are already associated
                if (markerJson.markerElement == markerElem && markerJson.id == markerElem.id)
                    return true;
                
                // ID-based hint
                var markerElemId = this.getMarkerId(markerElem);
                var markerJsonId = this.getMarkerId(markerJson);
                
                // Sanity check to see if at least the ids match (id may NOT be present on all marker elements)
                // No match if the id is present on both, but differs
                if (markerElemId && markerJsonId && markerElemId != markerJsonId)
                    return false;

                // Color-based hint
                var markerElemColor = this.getMarkerColor(markerElem);
                var markerJsonColor = this.getMarkerColor(markerJson);
                
                // Sanity check to see if at least the colors match (color may NOT be present on all marker elements)
                // No match if the color is present on both, but differs
                if (markerElemColor && markerJsonColor && markerElemColor != markerJsonColor)
                    return false;

                // Icon-based hint
                var markerElemIcon = this.getMarkerIcon(markerElem);
                var markerJsonIcon = this.getMarkerIcon(markerJson);
                
                // Sanity check to see if at least the icons match (icon may NOT be present on all marker elements)
                // No match if the icon is present on both, but differs
                if (markerElemIcon && markerJsonIcon && markerElemIcon != markerJsonIcon)
                    return false;
                
                // Position-based matching
                
                // Because the element positions are scaled (and rounded) from the original fractional definition position,
                // scaling them back up to the original "unscaled" state will very likely yield significant error
                // So instead, we do the comparison at the current scale of the map, which should be much more representative
                
                // Get position of marker element, scaled to the current zoom level
                var markerElemPos = this.getScaledMarkerPosition(markerElem);
                // Get position of the marker definition in the JSON, scaled to the current zoom level
                var markerJsonPos = this.getScaledMarkerPosition(markerJson);

                // The actual comparison is almost always position-based, since it's by far the most accurate
                // We have 1px of error here
                return Math.abs(markerElemPos[0] - markerJsonPos[0]) <= 1 &&
                       Math.abs(markerElemPos[1] - markerJsonPos[1]) <= 1;
            },

            // Returns the ID of the marker element or JSON definition.
            getMarkerId: function(marker)
            {
                if (!marker) marker = this;

                // This was added in the release of Interactive Maps. The "id" field of the marker in the JSON is
                // directly exposed in the DOM, via the data-testId attribute on the child SVG element of the marker
                // element. However this is only present on markers with the default marker image, not when custom
                // marker graphics are used.
                
                // In addition, uniqueness on marker IDs aren't enforced, so this ID may be shared by multiple elements
                if (marker instanceof Element && !marker.id)
                {
                    var svg = marker.querySelector("svg");

                    // Cache the marker id
                    if (svg) marker.id = svg.getAttribute("data-testid").replace("default-marker-with-id-", "");
                }

                return marker.id;
            },

            // Returns the color of the marker element or JSON definition.
            // This appears exactly as entered in the JSON, which supports any valid CSS color
            // When comparing, we use string comparison and not actual color value comparison.
            // This is fine because the colour is always converted to a hex code when it is deserialized
            getMarkerColor: function(marker)
            {
                if (!marker) marker = this;

                // Get value of --marker-icon-color variable in the CSS
                if (marker instanceof Element)
                {
                    // Don't fetch the colour multiple times
                    // Only markers containing the class .MapMarker-module_markerIcon__dHSar have a colour
                    if (!marker.markerColor && marker.classList.contains("MapMarker-module_markerIcon__dHSar"))
                    {
                        var svg = marker.querySelector("svg");

                        // Cache the marker color so we don't have to re-retrieve it
                        if (svg) marker.markerColor = svg.style.getPropertyValue("--marker-icon-color").toLowerCase().trim();
                    }

                    // This may intentionally return undefined
                    return marker.markerColor;
                }

                // Get the color string from the category this marker belongs to
                else
                {
                    if (this.map.categoryLookup.has(marker.categoryId))
                    {
                        return this.map.categoryLookup.get(marker.categoryId).color.toLowerCase().trim();
                    }
                }

                return;
            },

            // Returns true if the marker uses a custom icon. Does not require an element reference
            usesCustomIcon: function()
            {
                /*
                if (this.markerElement)
                    return this.markerElement.classList.contains("MapMarker-module_markerCustomIcon__YfQnB");
                else
                */
                    return this.icon != undefined || this.category.icon != undefined;
            },

            // Returns the icon texture filename of the marker element or JSON definition.
            // Set fileNameOnly to true to return just the file name of the icon, otherwise the full URL is returned
            getMarkerIcon: function(marker, fileNameOnly)
            {
                if (!marker) marker = this;

                if (marker instanceof Element)
                {
                    // Don't fetch the icon multiple times if it is cached
                    // Only markers containing the class MapMarker-module_markerCustomIcon__YfQnB have an icon
                    if (!marker.icon && marker.classList.contains("MapMarker-module_markerCustomIcon__YfQnB"))
                    {
                        var img = marker.querySelector("img");

                        if (img)
                        {
                            // Cache the marker icon in the element object so we don't have to re-retrieve it
                            marker.icon = { url: img.src };

                            // Fetch the file name using the URL
                            var stripIndex = marker.icon.url.indexOf("/revision/");
                            marker.icon.title = marker.icon.url.substring(0, stripIndex);
                            var lastSlashIndex = marker.icon.title.lastIndexOf("/");
                            marker.icon.title = marker.icon.title.substring(lastSlashIndex + 1);
                        }
                    }

                    if (!marker.icon)
                        return;

                    return fileNameOnly ? marker.icon.title : marker.icon.url;
                }

                // Get the icon filename from either the marker itself, or the category this marker belongs to
                else
                {
                    // Icon object (either directly from marker or from the category it belongs to)
                    // containing title, url, width, height
                    var icon = marker.icon || marker.category.icon;

                    // If a custom icon is present, either from the marker itself, or from the category the marker belongs to
                    if (icon)
                    {
                        if (fileNameOnly)
                        {
                            // Remove any file: prefix (the comparing src attribute will never have this)
                            // Convert any spaces to underscores
                            var fileName = icon.title.replace("file:", "").replace("File:", "").replace(" ", "_");
                            
                            // Ensure that the first letter is upper case (the img src will always be)
                            fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

                            return fileName;
                        }
                        else
                        {
                            // Just return the url
                            return icon.url;
                        }
                    }
                }

                return;
            },

            // Returns the "unscaled" position of a marker element or JSON definition
            // This is the original unchanging pixel position, or as close to it as possible.
            getUnscaledMarkerPosition: function(marker)
            {
                if (!marker) marker = this;

                var pos = [];

                // Get unscaled position of a marker element in DOM
                if (marker instanceof Element)
                {
                    pos = marker.markerPos;

                    if (pos == undefined)
                    {
                        pos = this.getScaledMarkerPosition(marker);
                        var imageSize = this.getScaledMapImageSize();

                        // Scale the position back up to the original range, and round
                        pos[0] = Math.round((pos[0] / imageSize[0]) * this.map.size.width);
                        pos[1] = Math.round((pos[1] / imageSize[1]) * this.map.size.height);

                        // Cache this info in the element itself so we don't have to recalculate (or store it elsewhere)
                        marker.markerPos = pos;
                    }
                }

                // Get unscaled position of a marker definition from JSON
                else
                {
                    pos[0] = marker.position[0];
                    pos[1] = marker.position[1];
                }

                return pos;
            },

            // Returns the "scaled" position of a marker element or JSON position
            // This is pixel position adjusted to the current viewport (zoom level and pan position)
            // It is not accurate to the transform:translate CSS position, as it factors out the base layer position
            getScaledMarkerPosition: function(marker)
            {
                if (!marker) marker = this;
                var pos = [];

                // Get scaled position of a marker element in DOM
                // For elements, it's easier to simply get the transform:translate from the styles
                if (marker instanceof Element)
                {
                    // Get base layer transform position. This needs to be calculated on the fly as it will change as the user zooms
                    var baseLayerPos = this.map.getTranslateXY(this.map.elements.leafletBaseImageLayer);

                    // Subtract the current position of the map overlay to the marker position to get the scaled position
                    pos = this.map.getTranslateXY(marker);
                    pos[0] -= baseLayerPos[0];
                    pos[1] -= baseLayerPos[1];
                }

                // Get unscaled position of a marker definition from JSON
                else
                {
                    pos = this.map.unscaledToScaledPosition([ marker.position[0],
                                                              marker.position[1] ]);
                }

                return pos;
            },

            // Returns the position of the marker or marker element relative to the viewport
            // for example a marker at 0,0 will be at the top left corner of the container (not the map itself!)
            getViewportMarkerPosition: function(marker)
            {
                marker = marker || this;
                
                var viewportRect = this.map.elements.leafletContainer.getBoundingClientRect();
                var markerRect;

                if (marker instanceof Element)
                    markerRect = marker.getBoundingClientRect();
                else
                    markerRect = marker.markerElement.getBoundingClientRect();

                return [ markerRect.x - viewportRect.x , markerRect.y - viewportRect.y ];
            },

            // If a marker definition doesn't have a (unique) ID, we can identify it based on its position+title+desc
            calculateMarkerHash: function(marker)
            {
                marker = marker || this;
                var str = "" + marker.position[0] + marker.position[1] + marker.popup.title + marker.popup.description + marker.popup.link.url + marker.popup.link.label;

                var hash = 0;
                if (str.length == 0)
                    return hash.toString();

                for (var i = 0; i < str.length; i++)
                {
                    var char = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash; // Convert to 32-bit integer
                }

                return hash.toString();
            }
        };
        
        /*
        
        Many of these functions simply make it easier to change parts of the popup

        It takes into account cases where a popup element isn't associated, and will store the
        pending changes and wait for the popup element to appear before making them
        
        */

        function ExtendedPopup(marker)
        {
            // Shallow copy, objects are assigned by reference, this is fine because in the
            // ExtendedMarker constructor, the marker (including its popup) were deep cloned already)
            Object.assign(this, marker.popup);

            // Store references to map and marker
            this.marker = marker;
            this.map = marker.map;

            // Sanitize descriptionHtml)
            if (this.description) this.descriptionHtml = this.descriptionHtml.replace(/<!--[\s\S]*?-->/g, "");
        }

        ExtendedPopup.prototype =
        {
            // This should be called after the popupElement reference is found
            initPopup: function(popupElement)
            {
                this.initialized = true;
                
                if (this.map.config.useCustomPopups == true)
                {
                    this.isCustomPopup = true;

                    // This code is used to circumvent the bug that causes the map to freeze when it is dragged
                    popupElement = this.createCustomPopup();
                    
                    this.initCustomPopupStyles();
                    this.applyCustomPopupEvents();
                }
                
                // Get references to all the popup elements
                this.elements = this.elements || this.fetchPopupElements(popupElement);
                
                // Process any popup changes that are pending
                this.processPendingChanges();
                
                popupElement.id = "popup_" + this.marker.id;
                popupElement.popup = this;

                // Note that when using custom popups, the transform position is the exact same as the marker
                // where default Leaflet-created popups use a transform that places the popup above the marker
                // Because of this, we need to use two different popup offsets
                if (this.map.config.useCustomPopups == true)
                {
                    popupElement.style.bottom = "0";
                    popupElement.style.left = "-150px";

                    // Vertical offset
                    if (this.marker.iconAnchor.startsWith("top"))
                        popupElement.style.marginBottom = "13px"; // 0 + 9 (popup tip) + 4 (gap)
                    else if (this.marker.iconAnchor.startsWith("center"))
                        popupElement.style.marginBottom = "26px"; // 13 + 9 (popup tip) + 4 (gap)
                    else if (this.marker.iconAnchor.startsWith("bottom"))
                        popupElement.style.marginBottom = "35px"; // 26 (icon height) + 9 (popup tip) + 4 (gap)

                    // Horizontal offset
                    if (this.marker.iconAnchor.endsWith("left"))
                        popupElement.style.marginLeft = "13px"
                    if (this.marker.iconAnchor.endsWith("center"))
                        popupElement.style.marginLeft = "0px"
                    if (this.marker.iconAnchor.endsWith("right"))
                        popupElement.style.marginLeft = "-13px"
                }
                else
                {
                    // Leaflet uses a bottom and left position of 7px and -152px, which is forced every time the popup is shown.
                    // This means we have to add these offsets to the margins in order to obtain our desired position
                    popupElement.style.marginLeft = "2px";

                    // Vertical offset
                    if (this.marker.iconAnchor.startsWith("top"))
                        popupElement.style.marginBottom = "-6px"; // -26 (negate full icon height) + 9 (popup tip) + 4 (gap) + 7 (negate bottom)
                    else if (this.marker.iconAnchor.startsWith("center"))
                        popupElement.style.marginBottom = "7px"; // -13 (negate half icon height) + 9 (popup tip) + 4 (gap)  + 7 (negate bottom)
                    else if (this.marker.iconAnchor.startsWith("bottom"))
                        popupElement.style.marginBottom = "20px"; // 9 (popup tip) + 4 (gap) + 7 (negate bottom)
                    
                    // Horizontal offset (same as above but adds 2px)
                    if (this.marker.iconAnchor.endsWith("left"))
                        popupElement.style.marginLeft = "15px"
                    if (this.marker.iconAnchor.endsWith("center"))
                        popupElement.style.marginLeft = "2px"
                    if (this.marker.iconAnchor.endsWith("right"))
                        popupElement.style.marginLeft = "-11px"
                }

                if (this.marker.map.config.openPopupsOnHover == true)
                {
                    popupElement.addEventListener("mouseenter", function(e){ this.stopPopupHideDelay();}.bind(this));
                    popupElement.addEventListener("mouseleave", function(e){ this.startPopupHideDelay();}.bind(this));
                }

                // Invoke onPopupCreated
                log("Popup created: " + this.marker.id);
                this.map.events.onPopupCreated.invoke({ map: this.map, marker: this.marker, popup: this });
            },

            // This should be called before a new popupElement is set, to invalidate the old no-longer-used popup element
            deinitPopup: function()
            {
                this.initialized = false;
                this.elements = null;
            },

            initCustomPopupStyles: once(function()
            {
                // This allows images to use their own size to expand the height of the popup, rather than using padding
                //mapsExtended.stylesheet.insertRule(".MarkerPopup-module_image__7I5s4 { position: initial; }");

                // Remove a rule that fixes the opacity to 1
                deleteCSSRule(".leaflet-fade-anim .leaflet-map-pane .leaflet-popup");

            }, mapsExtended),

            cloneCreateCustomPopup: function()
            {
                // Hide the popup that was created as part of Leaflet, clone it and reshow
                // the clone on our own terms (this does mean we have to handle our own animation and whatnot)
                var origElements = this.fetchPopupElements(popupElement);

                // Clone the original popup, with events and all, converting it to a custom popup
                popupElement = origElements.popupElement.cloneNode(true);
                
                // Hide the original popup, both via scripting and visually by setting the opacity to 0
                origElements.popupCloseButton.click();
                origElements.popupElement.remove();

                return popupElement;
            },

            createCustomPopup: function()
            {
                var customPopup = document.createElement("div");
                customPopup.className = "leaflet-popup  leaflet-zoom-animated";
                customPopup.style.cssText = "opacity: 1; bottom: 0; left: -150px;";

                // This is the maximum required HTML for a popup
                customPopup.innerHTML = "<div class=\"leaflet-popup-content-wrapper\"><div class=\"leaflet-popup-content\" style=\"width: 301px;\"><div class=\"MarkerPopup-module_popup__eNi--\"><div class=\"MarkerPopup-module_content__9zoQq\"><div class=\"MarkerPopup-module_contentTopContainer__qgen9\"><div class=\"MarkerPopup-module_title__7ziRt\"><!-- Title --></div><div class=\"MarkerPopup-module_actionsContainer__q-GB8\"><div class=\"wds-dropdown MarkerPopupActions-module_actionsDropdown__Aq3A2\"><div class=\"wds-dropdown__toggle MarkerPopupActions-module_actionsDropdownToggle__R5KYk\" role=\"button\"><span></span><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 18 18\" width=\"1em\" height=\"1em\" class=\"wds-icon wds-icon-small wds-dropdown__toggle-chevron\"><defs><path id=\"prefix__more-small\" d=\"M9 5c1.103 0 2-.896 2-2s-.897-2-2-2-2 .896-2 2 .897 2 2 2m0 8c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2m0-6c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2\"></path></defs><use fill-rule=\"evenodd\" xlink:href=\"#prefix__more-small\"></use></svg></div><div class=\"wds-dropdown__content wds-is-not-scrollable\"><ul class=\"MarkerPopupActions-module_dropdownContent__GYl-7\"><li class=\"MarkerPopupActions-module_action__xeKO9\" data-testid=\"copy-link-marker-action\"><span class=\"MarkerPopupActions-module_actionIcon__VyVPj\"><svg class=\"wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-link-small\"></use></svg></span><span class=\"MarkerPopupActions-module_actionLabel__yEa0-\">Copy link</span></li><li class=\"MarkerPopupActions-module_action__xeKO9\" data-testid=\"marker-report-action\"><span class=\"MarkerPopupActions-module_actionIcon__VyVPj\"><svg class=\"wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-alert-small\"></use></svg></span><span class=\"MarkerPopupActions-module_actionLabel__yEa0-\">Report Marker</span></li></ul></div></div></div></div><div class=\"MarkerPopup-module_scrollableContent__0N5PS\"><div class=\"MarkerPopup-module_description__fKuSE\"><div class=\"page-content MarkerPopup-module_descriptionContent__-ypRG\"><!-- Description --></div></div><div class=\"MarkerPopup-module_imageWrapper__HuaF2\"><img class=\"MarkerPopup-module_image__7I5s4\"></div></div><div class=\"MarkerPopup-module_link__f59Lh\"><svg class=\"wds-icon wds-icon-tiny MarkerPopup-module_linkIcon__q3Rbd\"><use xlink:href=\"#wds-icons-link-tiny\"></use></svg><a href=\"<!-- Link url -->\" target=\"_blank\" rel=\"noopener noreferrer\"><!-- Link label --></a></div></div></div></div></div><div class=\"leaflet-popup-tip-container\"><div class=\"leaflet-popup-tip\"></div></div>";
                customPopup.style.transform = this.marker.markerElement.style.transform;
                this.elements = this.fetchPopupElements(customPopup);

                // Set title content
                if (this.title)
                    this.setTitle(this.title);
                else
                    this.elements.popupTitle = undefined;

                // Set description
                if (this.description)
                    this.setDescription(this.descriptionHtml);
                else
                {
                    this.elements.popupDescription.remove();
                    this.elements.popupDescription = undefined;
                }

                // Set image
                if (this.image && this.image.title && this.image.url)
                    this.setImage(this.image.title, this.image.url);
                else
                {
                    this.elements.popupImageWrapper.remove();
                    this.elements.popupImage.remove();
                    this.elements.popupImageWrapper = this.elements.popupImage = undefined;
                }

                // Remove scrollable content if not present
                if (!this.description && !this.image)
                    this.elements.popupScrollableContent.remove();

                // Set link label and url
                if (this.link && this.link.label && this.link.url)
                {
                    this.setLinkLabel(this.link.label);
                    this.setLinkUrl(this.link.url);
                }
                else
                {
                    this.elements.popupLinkWrapper.remove();
                    this.elements.popupLinkWrapper = this.elements.popupLink = undefined;
                }

                return customPopup;
            },

            applyCustomPopupEvents: function()
            {
                // The following function updates the transform at each frame such that the marker and popup zoom at the same rate
                var start, prev, zoomStep = function(time)
                {
                    // Record the start time
                    if (!start) start = time;
                    
                    // Only apply the new transform if the time actually changed
                    if (prev != time)
                    {
                        this.elements.popupElement.style.transform = this.marker.markerElement.style.transform;
                        this.applyPopupOffsets();
                    }

                    // Queue the next frame as long as the elapsed time is less than 300ms
                    // This is more a timeout feature than anything
                    if (time - start < 300) this._zoomStep = window.requestAnimationFrame(zoomStep);

                    prev = time;
                    
                }.bind(this);

                // Subscribe to an event that fires on the start and end of the zoom
                // in order to animate the popup transform alongside the marker transform
                this.map.events.onMapZoomed.subscribe(function(e)
                {
                    // Don't bother if the popup isn't actually shown
                    if (!this.isPopupShown()) return;

                    // Cancel the last callback so that we're not running two at the same time
                    window.cancelAnimationFrame(this._zoomStep);
                    
                    // Zoom start
                    if (e.value == true)
                    {
                        // Start a new animation
                        this._zoomStep = window.requestAnimationFrame(zoomStep);
                    }

                    // Zoom end
                    else
                    {
                        // Apply the final transform
                        this.elements.popupElement.style.transform = this.marker.markerElement.style.transform;
                        this.applyPopupOffsets();
                    }
                    
                }.bind(this));

                // Prevent mousedown's on the custom popup from causing a drag
                this.elements.popupElement.addEventListener("mousedown", stopPropagation);

                // Prevent double clicks on the custom popup from causing a zoom
                this.elements.popupElement.addEventListener("dblclick", stopPropagation);

                // Recreate the "copy link" button
                this.elements.popupCopyLinkButton.addEventListener("click", function(e)
                {
                    var markerUrl = window.location.origin + window.location.pathname + "?" + new URLSearchParams({ marker: this.marker.id });

                    navigator.clipboard.writeText(markerUrl).then(function()
                    {
                        new BannerNotification(mapsExtended.i18n.msg("copy-link-banner-success").plain(), "confirm", null, 5000).show();
                    })
                    .catch(function()
                    {
                        new BannerNotification(mapsExtended.i18n.msg("copy-link-banner-failure").plain(), "confirm", null, 5000).show();
                    });
                }.bind(this));
            },

            applyPopupOffsets: function()
            {
                return;
                var leafletContainerRect = this.map.elements.leafletContainer.getBoundingClientRect();
                var popupRect = this.elements.popupElement.getBoundingClientRect();
                var offsetElement = this.elements.popupElement.lastElementChild;

                var offsets =
                [
                    popupRect.left < leafletContainerRect.left ? leafletContainerRect.left - popupRect.left :
                    popupRect.right > leafletContainerRect.right ? leafletContainerRect.right - popupRect.right : 0,
                    popupRect.top < leafletContainerRect.top ? leafletContainerRect.top - popupRect.top :
                    popupRect.bottom > leafletContainerRect.bottom ? leafletContainerRect.bottom - popupRect.bottom : 0
                ];

                // Cache offsets
                this._offsets = offsets;
                
                if (offsets[0] != 0 || offsets[1] != 0)
                {
                    offsetElement.style.left = offsets[0] + "px";
                    this.elements.popupTipContainer.style.left = "calc(50% - " + offsets[0] + "px)";
                }
                else
                {
                    this.elements.popupElement.style.left = "-150px";
                    this.elements.popupTipContainer.style.left = "";
                }
            },

            // Returns an object containing all the sub-elements of the root popup element
            // Operates without using "this" so can be uses as a psuedo-static function via ExtendedPopup.prototype
            fetchPopupElements: function(popupElement)
            {
                var e = {};
                e.popupElement = popupElement;

                // Module content - will always exist
                e.popupContent = e.popupElement.querySelector(".MarkerPopup-module_content__9zoQq");

                // Content top container element (containing title) - will always exist
                e.popupContentTopContainer = e.popupContent.querySelector(".MarkerPopup-module_contentTopContainer__qgen9");
                e.popupTitle = e.popupContentTopContainer.querySelector(".MarkerPopup-module_title__7ziRt");
                
                // Scrollable content (containing description and image) - will not exist if a description or image is not present
                e.popupScrollableContent = e.popupContent.querySelector(".MarkerPopup-module_scrollableContent__0N5PS");
                if (e.popupScrollableContent)
                {
                    e.popupDescription = e.popupScrollableContent.querySelector(".MarkerPopup-module_descriptionContent__-ypRG");
                    e.popupImageWrapper = e.popupContent.querySelector(".MarkerPopup-module_imageWrapper__HuaF2");
                    
                    if (e.popupImageWrapper)
                        e.popupImage = e.popupImageWrapper.querySelector(".MarkerPopup-module_image__7I5s4");
                }

                // Link element, will only exist if link is present
                e.popupLinkWrapper = e.popupContent.querySelector(".MarkerPopup-module_link__f59Lh");
                if (e.popupLinkWrapper)
                    e.popupLink = e.popupLinkWrapper.querySelector("a");

                // Close button - Hidden by default
                e.popupCloseButton = e.popupElement.querySelector(".leaflet-popup-close-button");
                if (e.popupCloseButton) e.popupCloseButton.addEventListener("click", preventDefault);

                e.popupCopyLinkButton = e.popupElement.querySelector(".MarkerPopupActions-module_action__xeKO9[data-testid=\"copy-link-marker-action\"]");
                e.popupReportMarkerButton = e.popupElement.querySelector(".MarkerPopupActions-module_action__xeKO9[data-testid=\"marker-report-action\"]");

                e.popupTipContainer = e.popupElement.querySelector(".leaflet-popup-tip-container");
                
                return e;
            },

            isPopupShown: function()
            {
                return this.elements && this.elements.popupElement
                && this.elements.popupElement.isConnected == true;
            },

            // Returns a function which resolves when this popup appears
            waitForPresence: function()
            {
                if (!this._waitForPresencePromise)
                {
                    this._waitForPresencePromise = new Promise(function(resolve, reject)
                    {
                        // Store resolve function (it will be called by popupObserver above)
                        // The resolved result will be the marker containing the popup element that was shown
                        this._waitForPresenceResolve = function(marker)
                        {
                            resolve(marker);
                            this._waitForPresenceResolve = undefined;
                            this._waitForPresencePromise = undefined;
                        };
                    }.bind(this));
                }

                return this._waitForPresencePromise;
            },

            // Shows the popup
            show: function(force)
            {
                // Don't show popups if enablePopups is false
                // Don't show if already shown
                // Don't show if we're dragging
                if (this.map.config.enablePopups == false ||
                   (this.isPopupShown() && !force) ||
                    this.map.isDragging == true) return;

                log("Showing popup " + this.marker.id);

                if (this.map.config.useCustomPopups == true)
                {
                    // Popup is currently a custom popup
                    if (this.initialized)
                    {
                        // Hide the last popup that was shown if it isn't this one
                        if (this.map.lastPopupShown && this.map.lastPopupShown != this)
                            this.map.lastPopupShown.hide();

                        this.map.lastPopupShown = this;
                        
                        this.map.elements.leafletPopupPane.appendChild(this.elements.popupElement);
                        this.elements.popupElement.style.transform = this.marker.markerElement.style.transform;
                        this.elements.popupElement.style.opacity = "0";
    
                        // Remove the event listener that was added in hide to prevent the small chance that both
                        // are active at the same time, which would cause the element from the DOM while it's being shown
                        this.elements.popupElement.removeEventListener("transitionend", this._hideDelay);
    
                        // Set opacity next frame so that the transition doesn't immediately start at the end
                        window.cancelAnimationFrame(this._showDelay);
                        this._showDelay = window.requestAnimationFrame(function()
                        {
                            this.elements.popupElement.style.opacity = "1";
                            this.applyPopupOffsets();
                        }.bind(this));
                    }

                    // Custom popup has not yet been created - create it!
                    else
                    {
                        this.initPopup();

                        // And call show again
                        this.show(true);
                        return;
                    }
                }
                else
                    this.marker.markerElement.click();
            },

            // Hides the popup
            hide: function(force)
            {
                // Don't hide if already hidden
                if (!this.isPopupShown() && !force) return;

                log("Hiding popup " + this.marker.id);
                if (this.map.config.useCustomPopups == true)
                {
                    if (this.initialized)
                    {
                        // Cancel any imminent showing of the popup
                        window.cancelAnimationFrame(this._showDelay);

                        // Cancel any imminent hiding of the popup
                        this.elements.popupElement.removeEventListener("transitionend", this._hideDelay);
                        
                        var currentOpacity = window.getComputedStyle(this.elements.popupElement).opacity;

                        // If the opacity is already nearly 0, hide immeidately
                        if (currentOpacity < 0.1)
                        {
                            this.elements.popupElement.remove();
                        }

                        // Otherwise transition it to 0 and remove after
                        else
                        {
                            // Set the opacity to 0
                            this.elements.popupElement.style.opacity = "0";
        
                            // Remove the element from the DOM at the end of the transition
                            this._hideDelay = function(e)
                            {
                                if (e.propertyName != "opacity") return;
                                this.elements.popupElement.remove();
                                
                            }.bind(this);
                            this.elements.popupElement.addEventListener("transitionend", this._hideDelay, { once: true });
                        }
                    }
                    else
                        log("Tried to hide custom popup that was not yet initialized!");
                }
                else
                {
                    // Defer hide until drag has finished (since hiding clicks the map and will end the drag) 
                    if (this.map.isDragging == true)
                    {
                        this.map.events.onMapDragged.subscribeOnce(function(isDragging)
                        {
                            if (isDragging == false) this.hide();
                        }.bind(this));
    
                        return;
                    }
                    
                    this.map.clickPositionOfElement(this.marker.markerElement);
                }
            },

            // Hides the popup if it is shown, shows the popup if it is hidden
            // Can be passed a value to force a specific state
            toggle: function(value)
            {
                if (value == undefined)
                    value = !this.isPopupShown();
                
                if (value)
                    this.show();
                else
                    this.hide();
            },

            hasPopupDelayTimeout: function(type)
            {
                return getPopupDelayTimeout(type) >= 0;
            },

            // Share globally cached delay for non-custom popups so that we're not showing multiple at once
            getPopupDelayTimeout: function(type)
            {
                if (this.map.config.useCustomPopups == true)
                    return this["popupDelayTimeout_" + type];
                else
                    return this.map["popupDelayTimeout_" + type];
            },

            setPopupDelayTimeout: function(type, timeout)
            {
                if (this.map.config.useCustomPopups == true)
                    this["popupDelayTimeout_" + type] = timeout;
                else
                    this.map["popupDelayTimeout_" + type] = timeout;
            },

            // Gets the popup delay value from the map config for either type (popupHideDelay or popupShowDelay)
            getPopupDelayValueMs: function(type)
            {
                if (type == "hide")
                    return this.map.config.popupHideDelay * 1000;
                else if (type == "show")
                    return this.map.config.popupShowDelay * 1000;

                return 0.0;
            },

            // Starts a timer that shows (if type == "show") or hides (if type == "hide") a popout after a delay specified in the config
            startPopupDelay: function(type)
            {
                // Start the timeout at the specified delay, calling this.show or this.hide once it finishes
                var timeout = window.setTimeout(function()
                {
                    // Call show or hide
                    this[type]();

                    // Clear the timeout (so we can tell if it's still going)
                    this.setPopupDelayTimeout(type, -1);
                    
                }.bind(this), this.getPopupDelayValueMs(type));

                // Save the ID of the timeout so that it may be cancelled with stop
                this.setPopupDelayTimeout(type, timeout);
            },

            // Stops a timer that shows or hides the popup
            stopPopupDelay: function(type)
            {
                var timeout = this.getPopupDelayTimeout(type);
                
                if (timeout >= 0)
                {
                    window.clearTimeout(timeout);
                    this.setPopupDelayTimeout(type, -1);
                }
            },

            startPopupShowDelay: function() { this.startPopupDelay("show"); },
            stopPopupShowDelay: function() { this.stopPopupDelay("show"); },
            startPopupHideDelay: function() { this.startPopupDelay("hide"); },
            stopPopupHideDelay: function() { this.stopPopupDelay("hide"); },
       
            validPopupTextElementTypes: [ "title", "description", "link-label", "link-url" ],

            // Get the text of a specific element type from the JSON definition, or if fromElement is true, from the HTML of a specific popup element
            // If the definition was empty, or the element does not exist, it will return nothing
            getPopupText: function(type, fromElement)
            {
                if (fromElement && !this.elements.popupElement)
                    return;
                
                switch (type)
                {
                    case "title":
                        return fromElement ? this.elements.popupTitle && this.elements.popupTitle.textContent
                                           : this.title;
                    case "description":
                        return fromElement ? this.elements.popupDescription && this.elements.popupDescription.textContent
                                           : this.description;
                    case "link-label":
                        return fromElement ? this.elements.popupLinkLabel && this.elements.popupLink.textContent
                                           : this.link && this.link.label;
                    case "link-url":
                        return fromElement ? this.elements.popupLinkUrl && this.elements.popupLink.getAttribute("href")
                                           : this.link && this.link.url;
                }
            },

            // Sets the text or HTML of a specific popup element (see validPopupTextElementTypes above)
            // This function is really only used to avoid duplicated code, and to make calling from processPendingChanges easier
            // set forceHtml to true to use innerHTML instead of textContent
            setPopupText: function(type, str, forceHtml)
            {
                if (!this.validPopupTextElementTypes.includes(type))
                {
                    console.error("Popup text type " + type + " is invalid. Valid types are:\n" + this.validPopupTextElementTypes.toString());
                    return;
                }
                
                // Keep track of which strings have been modified from their default
                this.modifiedTexts = this.modifiedTexts || { };
                
                // Newly edited - If the field actually differs, flag modifiedTexts
                if (!this.modifiedTexts[type] && str != this.getPopupText(type))
                    this.modifiedTexts[type] = true;
                
                // Have a popup element reference
                if (this.elements.popupElement)
                {
                    // Links are treated a bit differently
                    if (type == "link-label" || type == "link-url")
                    {
                        // Create popup link elements if they aren't already present
                        this.createPopupLinkElement();
                        this.link[type.replace("link-")] = str;

                        if (type == "link-label")
                            this.elements.popupLink[forceHtml ? "innerHTML" : "textContent"] = str;
                        else
                        {
                            // Add article path if using a local page name
                            if (!str.startsWith("http://"))
                                str = mw.config.get("wgArticlePath").replace("$1", str);

                            this.elements.popupLink.setAttribute("href", str);
                        }
                    }
                    else
                    {
                        // Ensure elements are created first
                        if (type == "description" && !this.elements.popupDescription)
                            this.createPopupDescriptionElement();
                        
                        this[type + forceHtml ? "Html" : ""] = str;
                        this.elements["popup" + (type[0].toUpperCase() + type.slice(1))][forceHtml ? "innerHTML" : "textContent"] = str;
                    }
                }

                // Don't yet have a popup element reference, add this to "pending"
                else
                {
                    this.pendingChanges = this.pendingChanges || { };
                    this.pendingChanges[type] = str;
                }
            },

            // Sets the popup title innerHTML (both plain text and html are supported)
            setTitle: function(str)
            {
                this.setPopupText("title", str);
            },

            // Sets the popup description
            setDescription: function(str, isWikitext)
            {
                if (isWikitext == true)
                {
                    var api = new mw.Api();
                    api.parse(str, { "disablelimitreport": true }).done(function(data)
                    {
                        this.setPopupText("description", data, true);
                    }.bind(this));
                }
                else
                    this.setPopupText("description", str, true);
            },

            // Sets the popup link label innerHTML (both plain text and html are supported)
            setLinkLabel: function(str)
            {
                this.setPopupText("link-label", str);
            },

            // Sets the popup link href
            // Page can be a full url, or the name of a page on the wiki
            setLinkUrl: function(page)
            {
                this.setPopupText("link-url", page);
            },

            setImage: function(imageTitle, imageUrl)
            {
                if (!this.elements.popupImage)
                    return;
                
                this.elements.popupImage.src = imageUrl;
                this.elements.popupImage.setAttribute("alt", imageTitle);

                // Full API call is /api.php?action=query&titles=File:Example.png&prop=imageinfo&iiprop=url&iiurlwidth=100 but this is a lot slower
                if (!imageUrl)
                {
                    // Use Special:Redirect to generate a file URL
                    var url = mw.util.getUrl("Special:Redirect/file/" + imageTitle) + "?width=300";

                    // The response will contain the file URL
                    fetch(url).then(function(response)
                    {
                        if (response.ok) imageUrl = response.url;
                    });
                }
                
                // Set the src attribute on the image
                if (imageUrl) this.elements.popupImage.src = imageUrl;
            },

            // Create a new scrollable content element (which holds the discription and image)
            // This is neccesary if the JSON didn't define a description
            createPopupScrollableContentElement: function()
            {
                if (!this.elements.popupScrollableContent)
                {
                    this.elements.popupScrollableContent = document.createElement("div");
                    this.elements.popupScrollableContent.className = "MarkerPopup-module_scrollableContent__0N5PS";

                    // Place after top container
                    if (this.elements.popupContentTopContainer)
                        this.elements.popupContentTopContainer.after(this.elements.popupScrollableContent);
                    // Or as the first child of popupContent
                    else if (this.elements.popupContent)
                        this.elements.popupContent.prepend(this.elements.popupScrollableContent);
                    else
                        log("Couldn't find a suitable position to add scrollable content element");
                }

                return this.elements.popupScrollableContent;
            },

            createPopupDescriptionElement: function()
            {
                if (!this.elements.popupDescription)
                {
                    var e = document.createElement("div");
                    e.className = "MarkerPopup-module_description__fKuSE";
                    var c = document.createElement("div");
                    c.className = "page-content MarkerPopup-module_descriptionContent__-ypRG";
                    e.appendChild(c);

                    this.elements.popupDescription = c;

                    var scrollableContentElement = this.createPopupScrollableContentElement();
                    // Place before imageWrapperElement
                    if (this.elements.popupImage)
                        this.elements.popupImage.parentElement.before(this.elements.popupDescription);
                    // Or just as first child of scrollableContent
                    else if (scrollableContentElement)
                        scrollableContentElement.prepend(this.elements.popupDescription);
                    else
                        log("Couldn't find a suitable position to add popup description element");
                }

                return this.elements.popupDescription;
            },

            // If a popup link isn't present in the JSON definition, one will not be created in the DOM
            // If this is the case, this function can be called to create an empty link element
            createPopupLinkElement: function()
            {
                if (!this.elements.popupLink)
                {
                    var fandomPopupContentRoot = this.elements.popupElement.querySelector(".map-marker-popup");
                    fandomPopupContentRoot.insertAdjacentHTML("beforeend", "<div class=\"MarkerPopup-module_link__f59Lh\"><svg class=\"wds-icon wds-icon-tiny MarkerPopup-module_linkIcon__q3Rbd\"><use xlink:href=\"#wds-icons-link-tiny\"></use></svg><a href=\"\" target=\"\" rel=\"noopener noreferrer\"></a></div>");
                    this.elements.popupLink = this.elements.popupElement.querySelector(".MarkerPopup-module_link__f59Lh > a");
                    this.elements.popup.link = {};
                }

                return this.elements.popupLink;
            },

            // Processes all the unapplied changes that were set prior to having a popup associated with this marker
            processPendingChanges: function()
            {
                if (this.isCustomPopup == true) return;
                
                if (this.pendingChanges && Object.keys(this.pendingChanges).length > 0)
                {
                    for (var key in this.pendingChanges)
                    {
                        this.setPopupText(key, this.pendingChanges[key]);
                    }
                }

                if (this.modifiedTexts && Object.keys(this.modifiedTexts).length > 0)
                {
                    for (var key in this.modifiedTexts)
                    {
                        this.setPopupText(key, this[key]);
                    }
                }
            }
            
        };

        // Finally we are done with all the prototype definitions    
        // ---------

        // mapsExtended stores some variables relating to MapExtensions
        var mapsExtended =
        {
            // Array of maps currently active
            maps: [],

            // ExtendedMap constructor
            ExtendedMap: ExtendedMap,

            // Events - This object is automatically filled from the EventHandlers in the "events" object of ExtendedMap
            // Using this interface is a quick way to to listen to events on ALL maps on the page rather than just a specific one
            events: {}
        };

        // Cache mapsExtended in window.dev
        window.dev = window.dev || {};
        window.dev.mapsExtended = mapsExtended;
        
        mapsExtended.loaded = true;
        mapsExtended.config = mapsExtended.config || {};

        var defaultConfig =
        {
            disabled: false,
            hiddenCategories: [],
            disabledCategories: [],
            sortMarkers: "latitude",
            iconAnchor: "center",
            enablePopups: true,
            openPopupsOnHover: false,
            popupHideDelay: 0.5,
            popupShowDelay: 0.1,
            enableFullscreen: true,
            fullscreenMode: "window",
            enableSearch: true,
            enableTooltips: true,
            useCustomPopups: false
        };

        // Load settings from an existing "global" configuration object (set in Common.js for example)
        // Copy the default config over the global config, keeping any values set in the global
        //mapsExtended.config = traverseCopyValues(defaultConfig, window.mapsExtendedConfig);
        mapsExtended.config = jQuery.extend(true, {}, defaultConfig, window.mapsExtendedConfig);
        delete window.mapsExtendedConfig;

        // Add some utility functions to the mapsExtended object
        mapsExtended.util =
        {
            once: once,
            findCSSRule: findCSSRule,
            preventDefault: preventDefault,
            capitalizeFirstLetter: capitalizeFirstLetter,
            stopPropagation: stopPropagation,
            getIndexOfCSSRule: getIndexOfCSSRule,
            deleteCSSRule: deleteCSSRule,
            changeCSSRuleSelector: changeCSSRuleSelector,
            appendCSSRuleSelector: appendCSSRuleSelector,
            changeCSSRuleText: changeCSSRuleText,
            changeCSSRuleStyle: changeCSSRuleStyle
        };

        // Create a stylesheet that can be used for some MapsExtended specific styles
        mapsExtended.stylesheet = mw.util.addCSS("");

        // Reset the currently-active map when it throws a "Maximum call stack size exceeded"
        /*
        window.addEventListener("error", function(e)
        {
        if (e.message == "Uncaught RangeError: Maximum call stack size exceeded")
        {
                // Select visible map
                var activeMap = window.dev.mapsExtended.maps.find(function(m) { return m.isMapVisible(); });

                // Set the display of the leaflet-container to none, this resets leaflet
                if (activeMap.isDragging == true || activeMap.isZooming == true)
                    return;
                    activeMap.elements.leafletContainer.style.display = "none";
        }
            
        });
        */

        // These keys will not be copied to the target
        var ignoreSourceKeys = ["mapBounds", "useMarkerClustering"];

        // Unfortunately Interactive Maps doesn't deserialize all properties of the JSON into the
        // interactiveMaps object (in mw.config) (notably markers always includes custom properties,
        // but everything else does not).

        // Custom properties are used to configure MapsExtended, and in order to fetch them we must
        // manually load the Map page content rather than use the existing deserialized maps in mw.config.
        // The custom properties will be written directly back into mw.config.get("interactiveMaps")
        // which in turn is copied to each ExtendedMap

        // Update:
        // Any custom field (outside of marker objects) are now sanitized/stripped when the JSON
        // is saved, meaning that the only fields that may be present are those that are allowed :(
        // The following code is kept just in case this is added back

        new Promise(function(resolve, reject)
        {
            // Just resolve immediately
            return resolve();

            // If editing an interactive map in source mode, use the JSON text directly from the editor
            // (this will always be valid because the script won't run unless there's an interactive map on the page)
            if (mw.config.get("wgPageContentModel") == "interactivemap" && (mw.config.get("wgAction") == "edit" || mw.config.get("wgAction") == "submit"))
            {
                mw.hook("wikipage.editform").add(function(editform)
                {
                    var textBox = document.getElementById("wpTextbox1");

                    // The definition exactly parsed from the JSON with no processing
                    var editorMapDefinition = JSON.parse(textBox.value);
                    editorMapDefinition.name = mw.config.get("wgTitle");

                    // The definition as parsed by Interactive Maps
                    var localMapDefinition = Object.values(mw.config.get("interactiveMaps"))[0];

                    traverseCopyValues(editorMapDefinition, localMapDefinition, ignoreSourceKeys, true);

                    resolve();
                });
            }

            // If viewing an interactive map (be it one or more transclusions or on the map page),
            // fetch the text directly from the page with the MediaWiki revisions API
            else
            {
                // Build a chain of map titles, like Map:x|Map:y|Map:z, which is sorted alphabetically and does not contain dupes
                // 1. Convert interactiveMaps to object array
                // 2. Create an array based on a function which returns Map:map.name
                // 3. Create a set from the array (which removes duplicates)
                // 4. Sort the array
                // 5. Join each of the elements in an array to form a string
                var titles = Array.from(new Set(Array.from(Object.values(mw.config.get("interactiveMaps")), function(m) { return "Map:" + m.name; }))).sort().join("|");

                // Build revisions API url, fetching the content of the latest revision of each Map page
                var params = new URLSearchParams(
                {
                    action: "query",    // Query action (Fetch data from and about MediaWiki)
                    prop: "revisions",  // Which properties to get (the revision information)
                    rvprop: "content",  // Which properties to get for each revision (content of each revision slot)
                    rvslots: "main",    // Which revision slots to return data for (main slot - the public revision)
                    format: "json",     // The format of the returned data (JSON format)
                    formatversion: 2,   // Output formatting
                    redirects: 1,       // Follow redirects
                    maxage: 300,        // Set the max-age HTTP cache control header to this many seconds (10 minutes)
                    smaxage: 300,       // Set the s-maxage HTTP cache control header to this many seconds (10 minutes)
                    titles: titles      // A list of titles to work on
                });

                var url = mw.config.get("wgServer") + "/api.php?" + params.toString();

                // Perform the request
                fetch(url)

                // When the HTTP response is returned...
                .then(function(response)
                {
                    // Determine whether the response contains JSON
                    var contentTypeHeader = response.headers.get("content-type");
                    var isJson = contentTypeHeader && contentTypeHeader.includes("application/json");
                    var data = isJson ? response.json() : null;
                        
                    if (!response.ok)
                    {
                        var error = (data && data.message) || response.status;
                        return Promise.reject({ type: "request", value: error });
                    }

                    return data;
                })

                // When the response body text is parsed as JSON
                // An example of the returned response is:
                // https://pillarsofeternity.fandom.com/api.php?action=query&prop=revisions&rvprop=content&rvslots=*&format=json&formatversion=2&redirects=1&titles=Map:The+Goose+and+Fox+-+Lower|Map:The+Goose+and+Fox+-+Upper
                .then(function(data)
                {
                    var pageData = Object.values(data.query.pages);
                    var localDefinitions = Array.from(Object.values(mw.config.get("interactiveMaps")));
                    var errors = [];

                    for (var i = 0; i < pageData.length; i++)
                    {
                        // Instead of throwing, just log any errors to pass back
                        if (pageData[i].invalid || pageData[i].missing || pageData[i].accessdenied || pageData[i].rvaccessdenied)
                        {
                            if (pageData[i].invalid)
                                errors.push("API query with title \"" + pageData[i].title + "\" was invalid - " + pageData[i].invalidreason);
                            else if (pageData[i].missing)
                                errors.push("A page with the title \"" + pageData[i].title + "\" does not exist!");
                            else if (pageData[i].accessdenied || pageData[i].rvaccessdenied)
                                errors.push("You do not have permission to view \"" + pageData[i].title + "\"");
                            else if (pageData[i].texthidden)
                                errors.push("The latest revision of the page \"" + pageData[i].title + "\ was deleted");
                            continue;
                        }

                        try
                        {
                            // Parse the content of the page as JSON into a JS object (adding the map name because the JSON will not contain this)
                            var remoteMapDefinition = JSON.parse(pageData[i].revisions[0].slots.main.content);
                            remoteMapDefinition.name = pageData[i].title.replace("Map:", "");
                            
                            var localMapDefinition = localDefinitions.find(function(d) { return d.name == remoteMapDefinition.name; });

                            // Copy the values of the remote definition onto the values of the local definition
                            traverseCopyValues(remoteMapDefinition, localMapDefinition, ignoreSourceKeys, true);
                        }
                        catch(error)
                        {
                            errors.push("Error while parsing map data or deep copying into local map definition: " + error);
                            continue;
                        }
                    }

                    // Reject the promise, returning any errors
                    if (errors.length > 0) Promise.reject({type: "response", value: errors });
                })

                // Catch and log any errors that occur
                .catch(function(reason)
                {
                    var str = "One or more errors occurred while " + (reason.type == "request" ? "performing HTTP request" : "parsing the HTTP response") + ". Custom properties may not be available!\n";

                    if (typeof reason.value == "object")
                        str + "--> " + reason.value.join("\n--> ");
                    else
                        str + "--> " + reason.value;

                    console.error(str);
                })

                // Always just resolve no matter the outcome
                .finally(function()
                {
                    resolve();
                });
            }
        })

        // Fetch and load i18n messages before processing individual maps
        .then(function()
        {
            // i18n overrides (for testing purposes only)
            /*
            window.dev = window.dev || {};
            window.dev.i18n = window.dev.i18n || {};
            window.dev.i18n.overrides = window.dev.i18n.overrides || {};
            window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};
            window.dev.i18n.overrides["MapsExtended"]["category-collected-label"] = "$1 of $2 collected";
            window.dev.i18n.overrides["MapsExtended"]["clear-collected-button"] = "Clear collected";
            window.dev.i18n.overrides["MapsExtended"]["clear-collected-confirm"] = "Clear collected markers?";
            window.dev.i18n.overrides["MapsExtended"]["clear-collected-banner"] = "Cleared $1 collected markers on $2.";
            window.dev.i18n.overrides["MapsExtended"]["collected-all-banner"] = "Congratulations! You collected all <b>$1</b> of <b>$2</b> \"$3\" markers on $4.";
            window.dev.i18n.overrides["MapsExtended"]["search-placeholder"] = "Search";
            window.dev.i18n.overrides["MapsExtended"]["search-hint-noresults"] = "No results found for \"$1\"";
            window.dev.i18n.overrides["MapsExtended"]["search-hint-results"] = "$1 markers in $2 categories";
            window.dev.i18n.overrides["MapsExtended"]["search-hint-resultsfiltered"] = "$1 markers in $2 categories ($3 filtered)";
            window.dev.i18n.overrides["MapsExtended"]["fullscreen-enter-tooltip"] = "Enter fullscreen";
            window.dev.i18n.overrides["MapsExtended"]["fullscreen-exit-tooltip"] = "Exit fullscreen";
            window.dev.i18n.overrides["MapsExtended"]["copy-link-banner-success"] = "Copied to clipboard";
            window.dev.i18n.overrides["MapsExtended"]["copy-link-banner-failure"] = "There was a problem copying the link to the clipboard";
            */

            // The core module doesn't use any translations, but we might as well ensure it's loaded before running other modules
            return new Promise(function(resolve, reject)
            {
                mw.hook("dev.i18n").add(function(i18n)
                {
                    var CACHE_VERSION = 3; // Increment manually to force cache to update (do this when new entries are added)

                    i18n.loadMessages("MapsExtended", { cacheVersion: CACHE_VERSION }).done(function(i18n)
                    {
                        // Save i18n instance to mapsExtended object
                        mapsExtended.i18n = i18n;
                        resolve();
                    });
                });
            });
        })

        // Get existing maps on the page and create ExtendedMaps for them
        .then(function()
        {
            var mapContainers = document.querySelectorAll(".interactive-maps-container > [class^=\"interactive-map-\"]");
            var initPromises = [];

            mapContainers.forEach(function(fandomMapRoot)
            {
                var map = new ExtendedMap(fandomMapRoot);
                mapsExtended.maps.push(map);

                // We may have to wait a few frames for Leaflet to initialize, so
                // create a promise which resolves then the map has fully loaded
                initPromises.push(map.waitForPresence());
            });

            // Wait for all maps to appear
            return Promise.allSettled(initPromises);
        })

        // Finishing off...
        .then(function(results)
        {
            // Log the result of the map initialization
            results.forEach(function(r)
            {
                if (r.status == "fulfilled")
                    console.log(r.value);
                else if (r.status == "rejected")
                    console.error(r.reason);
            });

            // Fire hook to tell other scripts that mapsExtended has finished
            mw.hook("dev.mapsExtended").fire(mapsExtended);
        })

        .catch(function(reason)
        {
            console.error(reason);
        });

        // Load dependencies
        importArticles(
        {
            type: "script",
            articles: [
                //"u:dev:MediaWiki:MapsExtended.css", // <- Uncomment after a CSS is made containing all rules defined in this script
                "u:dev:MediaWiki:I18n-js/code.js",
                "u:dev:MediaWiki:BannerNotification.js",
                "u:dev:MediaWiki:WDSIcons/code.js"
            ]
        });
        
    };

    /*

        MapsExtended_Collectibles.js
        Author: Macklin

        This script allows map markers (of Fandom Interactive Maps) to be marked as "collected", via a checkbox
        that will be added to the popup when it is first created.

        Collected markers will be dimmed to indicate to the user that it has been collected, and the label of
        the associated category/filter will have (x of y collected) added to them

    */

    function mxc(mapsExtended)
    {
        // Intended to be applied to category definitions
        var categoryFunctions =
        {
            isAnyCollected: function()
            {
                return this.collectible ? this.markers.some(function(m) { return m.collected == true; }) : false;
            },

            getNumCollected: function()
            {
                var count = 0;
                if (!this.collectible) return count;

                for (var i = 0; i < this.markers.length; i++)
                {
                    if (this.markers[i].collected)
                        count++;
                }

                return count;
            },

            getNumCollectible: function()
            {
                return this.collectible ? this.markers.length : 0;
            },
            
            updateCollectedLabel: function()
            {
                if (!this.collectible)
                    return;
                
                // Align icon to top of flex
                if (!this.elements.collectedLabel)
                {
                    if (this.elements.checkboxLabelIcon) this.elements.checkboxLabelIcon.style.alignSelf = "flex-start";
        
                    var categoryLabel = this.elements.checkboxLabelText;
        
                    // Add amount collected "<collected> of <total> collected"
                    var collectedLabel = document.createElement("div");
                    collectedLabel.style.cssText = "font-size:small; opacity:50%";
                    var collectedLabelText = document.createTextNode("");
                    collectedLabel.appendChild(collectedLabelText);

                    // Add collectedLabel as child of categoryLabel
                    categoryLabel.appendChild(collectedLabel);

                    this.elements.collectedLabel = collectedLabelText;
                }

                var count = this.getNumCollected();
                var total = this.markers.length;
                var perc = Math.round((count / total) * 100); // <- Not used in default label, but may be specified
                var msg = mapsExtended.i18n.msg("category-collected-label", count, total, perc).plain();
                
                this.elements.collectedLabel.textContent = msg;
            },

            clearAllCollected: function(){ this.setMarkersCollected(false); },
            markAllCollected: function(){ this.setMarkersCollected(true); },

            setMarkersCollected: function(state)
            {
                for (var j = 0; j < this.markers.length; j++)
                    this.map.setMarkerCollected(this.markers[j], state, true, false, true);

                // Update label
                this.updateCollectedLabel();
            }
        };

        // Modify the ExtendedMap prototype to add some collectible-specifc methods
        Object.assign(mapsExtended.ExtendedMap.prototype,
        {
            hasCollectibles: false,

            // Get the amount of markers that have been collected in total
            getNumCollected: function()
            {
                var count = 0;
                for (var i = 0; i < this.categories.length; i++)
                {
                    count = count + this.categories[i].getNumCollected();
                }

                return count;
            },
            
            // Get the key used to store the collected states in localStorage
            getStorageKey: function()
            {
                return mw.config.get("wgDBname") + "_Map:" + this.name.replaceAll(" ", "_") + "_states";
            },

            // Trigger the collected setter on all markers to update their opacity
            nudgeCollectedStates: function()
            {
                for (var i = 0; i < this.categories.length; i++)
                {
                    if (!this.categories[i].collectible)
                        continue;

                    for (var j = 0; j < this.categories[i].markers.length; j++)
                        this.setMarkerCollected(this.categories[i].markers[j], this.categories[i].markers[j].collected, true, false, false);
                    
                    this.categories[i].updateCollectedLabel();
                }   
            },

            // Clear the collected state on all markers for this map, and then also the data of this map in localStorage
            clearCollectedStates: function()
            {
                for (var i = 0; i < this.categories.length; i++)
                {
                    // Clear the collected states
                    for (var j = 0; j < this.categories[i].markers.length; j++)
                        this.setMarkerCollected(this.categories[i].markers[j], false, true, false, false);

                    // Update label
                    this.categories[i].updateCollectedLabel();
                }
                
                var storageKey = this.getStorageKey();
                localStorage.removeItem(storageKey);
            },
        
            // Iterates over all markers in a map and stores an array of the IDs of "collected" markers
            saveCollectedStates: function()
            {
                var collectedMarkers = [];
                for (var i = 0; i < this.markers.length; i++)
                {
                    if (this.markers[i].collected) collectedMarkers.push(this.markers[i].id);
                }
        
                var storageKey = this.getStorageKey();
                localStorage.setItem(storageKey, JSON.stringify(collectedMarkers));
            },
        
            // Fetch the collected state data from localStorage and set the "collected" bool on each marker that is collected
            loadCollectedStates: function()
            {
                var storageKey = this.getStorageKey();
                var stateJson = localStorage.getItem(storageKey) || "[]";
                var stateData = JSON.parse(stateJson);
        
                for (var i = 0; i < stateData.length; i++)
                {
                    if (this.markerLookup.has(stateData[i]))
                    {
                        var marker = this.markerLookup.get(stateData[i]);
        
                        // Ensure that this marker is a collectible one
                        if (marker && marker.category.collectible == true)
                            this.setMarkerCollected(marker, true, true, false, false);
                    }
                }
            },

            // Sets the collected state of the marker.
            // This should be called instead of setting collected directly and is called
            // by user interactions, as well as on clear and initial load
            setMarkerCollected: function(marker, state, updatePopup, updateLabel, canShowBanner)
            {
                // Don't try to collect markers that aren't collectible
                if (!marker.category.collectible) return;
                
                // Set the collected state on the marker
                marker.collected = state;

                if (marker.markerElement)
                {
                    // Set the marker collected style using a class rather than an inline attribute
                    // This is required because with clustered markers, the opacity is overridden as part of the zoom animation on EVERY marker
                    if (state == true)
                        marker.markerElement.classList.add("mapsExtended_collectedMarker_" + this.id);
                    else
                        marker.markerElement.classList.remove("mapsExtended_collectedMarker_" + this.id);
                }

                // Set the collected state on the connected popup (if shown)
                // This does not trigger the checked change event
                if (updatePopup && marker.popup.isPopupShown())
                {
                    var checkbox = marker.popup.elements.popupCollectedCheckbox;
                    checkbox.checked = state;
                }

                // Update the collected label
                if (updateLabel) marker.category.updateCollectedLabel();

                // Show a congratulatory banner if all collectibles were collected
                if (canShowBanner && mapsExtended.config.collectibles.enableCollectedAllNotification && state == true)
                {
                    // Check if all were collected
                    var numCollected = marker.category.getNumCollected();
                    var numTotal = marker.category.markers.length;
                    
                    // Show a banner informing the user that they've collected all markers
                    if (numCollected == numTotal)
                    {
                        var msg = mapsExtended.i18n.msg("collected-all-banner", numCollected, numTotal, marker.category.name, this.getMapLink()).plain();
                        this.collectedMessageBanner.setContent(msg);
                        this.collectedMessageBanner.show();
                    }
                }
            }
        });
        
        var defaultCollectiblesConfig =
        {
            collectibleCategories: [],
            collectedMarkerOpacity: "50%",
            enableCollectedAllNotification: true
        };

        // Apply the defaultCollectibles if the user has not set them - do this by Object.assign'ing
        // both the properties read from the config (in Common.js) and default ones and applying this back to the object
        mapsExtended.config.collectibles = Object.assign({}, defaultCollectiblesConfig, mapsExtended.config.collectibles);

        var initMapCollectibleStyles = mapsExtended.util.once(function()
        {
            // Set up some reusable styles
            mapsExtended.stylesheet.insertRule(".mapsExtended_collectibleClearButton { text-align: right; font-weight: 700; letter-spacing: .25px; text-transform: uppercase; font-size: 12px; margin: 12px; cursor: pointer; user-select: none; -webkit-user-select: none }");
    
            // Change filters box to better accomodate the clear collected button
            mapsExtended.stylesheet.insertRule(".interactive-maps__filters-dropdown.wds-dropdown:hover > .wds-dropdown__content { display: flex !important; flex-direction: column; }")
    
            var rule = mapsExtended.util.findCSSRule(".interactive-maps__filters-dropdown-list", mapsExtended.stylesheet);
            if (rule)
            {
                rule.style.paddingBottom = "0";
                rule.style.maxHeight = "none";
            }
        });

        // Called on each of the maps to set up collectibles
        function initMapCollectibles(map)
        {
            // Apply the per-map configuration over the global configuration, overwriting any values set in the global
            map.config.collectibles = Object.assign({}, mapsExtended.config.collectibles, map.config.collectibles);

            // Add a rule controlling the selected marker opacity
            window.dev.mapsExtended.stylesheet.insertRule(".mapsExtended_collectedMarker_" + map.id + " { opacity: " + map.config.collectibles.collectedMarkerOpacity.toString() + " !important; }");

            // Set up the checked summary on each of the collectible category labels
            for (var i = 0; i < map.categories.length; i++)
            {
                var category = map.categories[i];
                Object.assign(category, categoryFunctions);

                // Collectible categories are those whose ID's end with __c or __ch or __hc
                // or categories included in the collectibleCategories array in the map config
                // or categories where the custom property "collectible" is true
                category.collectible = category.hints.includes("collectible")
                                    || (Array.isArray(map.config.collectibleCategories) && map.config.collectibleCategories.includes(category.id))
                                    || (Array.isArray(map.config.collectibles.collectibleCategories) && map.config.collectibles.collectibleCategories.includes(category.id))
                                    || category.collectible;
                
                if (!category.collectible)
                    continue;

                map.hasCollectibles = true;

                if (category.elements && category.elements.filter)
                {
                    category.elements.filter.addEventListener("click", function(e)
                    {
                        if (e.ctrlKey == true || e.metaKey == true)
                        {
                            if (this.isAnyCollected())
                                this.clearAllCollected();
                            else
                                this.markAllCollected();

                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }.bind(category));
                }

                // Set up markers of this category
                /*
                for (var j = 0; j < category.markers.length; j++)
                {
                    // Set up clicked event on marker
                    if (this.markerElement)
                    {
                        this.markerElement.addEventListener("click", this.onMarkerActivated);
                    }
                }
                */
            }

            // Skip this map if there are no collectibles
            if (map.hasCollectibles == false) return;

            initMapCollectibleStyles();

            // Add a "Clear collected" button to the filter box
            var clearButton = document.createElement("a");
            clearButton.className = "mapsExtended_collectibleClearButton";
            clearButton.textContent = mapsExtended.i18n.msg("clear-collected-button").plain();
            map.elements.clearCollectedButton = clearButton;
            map.elements.filtersDropdownList.after(clearButton);
            
            mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function()
            {
                // When BannerNotifications is loaded, 
                mw.hook("dev.banners").add(function(banners)
                {
                    map.collectedMessageBanner = new BannerNotification("", "confirm", null, 5000);

                    // When the "Clear collected" button is clicked in the filters dropdown
                    map.elements.clearCollectedButton.addEventListener("click", function()
                    {
                        var confirmMsg = mapsExtended.i18n.msg("clear-collected-confirm").plain();

                        // Create a simple OOUI modal asking the user if they really want to clear the collected state on all markers
                        OO.ui.confirm(confirmMsg).done(function(confirmed)
                        {
                            if (confirmed)
                            {
                                var bannerMsg = mapsExtended.i18n.msg("clear-collected-banner", map.getNumCollected(), map.getMapLink()).plain();
                                new BannerNotification(bannerMsg, "notify", null, 5000).show();
                                map.clearCollectedStates();
                            }
                            else
                                return;
                        });
                    });
                });
            });
            
            // Load collected states from localStorage
            map.loadCollectedStates();

            // Update the collected labels to reflect the collected states
            map.categories.forEach(function(c) { c.updateCollectedLabel(); });

            // Events

            // Update all collected labels and nudge collected states when the map is refreshed
            map.events.onMapInit.subscribe(function(args)
            {
                // Nudge collected states
                args.map.nudgeCollectedStates();

                // Update labels
                args.map.categories.forEach(function(c) { c.updateCollectedLabel(); });
            });

            // New marker shown - Set it's collected state to itself update the marker opacity
            map.events.onMarkerShown.subscribe(function(args)
            {
                args.map.setMarkerCollected(args.marker, args.marker.collected, true);
            });

            // New popup created
            map.events.onPopupCreated.subscribe(function(args)
            {
                var marker = args.marker;
                var map = args.map;
                var category = map.categoryLookup.get(marker.categoryId);
                
                // Check if the marker that triggered this popup is a collectible one
                if (category.collectible == true)
                {
                    // Stop observing popup changes while we change the subtree of the popup
                    map.togglePopupObserver(false);
                    
                    // Create checkbox container
                    var popupCollectedCheckbox = document.createElement("div");
                    popupCollectedCheckbox.className = "wds-checkbox";
            
                    // Create the checkbox itself
                    var popupCollectedCheckboxInput = document.createElement("input");
                    popupCollectedCheckboxInput.setAttribute("type", "checkbox");
                    popupCollectedCheckboxInput.id = "checkbox_" + map.id + "_" + marker.id;
                    popupCollectedCheckboxInput.marker = marker; // <- Store reference to marker on checkbox so we don't have to manually look it up
                    popupCollectedCheckboxInput.checked = marker.collected;
                    marker.popup.elements.popupCollectedCheckbox = popupCollectedCheckboxInput;
            
                    // Create label adjacent to checkbox
                    var popupCollectedCheckboxLabel = document.createElement("label");
                    popupCollectedCheckboxLabel.setAttribute("for", popupCollectedCheckboxInput.id);

                    // Add checkbox input and label to checkbox container
                    popupCollectedCheckbox.appendChild(popupCollectedCheckboxInput);
                    popupCollectedCheckbox.appendChild(popupCollectedCheckboxLabel);

                    // Add checkbox container after title element
                    marker.popup.elements.popupTitle.after(popupCollectedCheckbox);

                    // Checked changed event
                    popupCollectedCheckboxInput.addEventListener("change", function(e)
                    {
                        map.setMarkerCollected(e.currentTarget.marker, e.currentTarget.checked, false, true, true);
                    });
            
                    map.togglePopupObserver(true);
                }
            });

            // Marker clicked - Toggle collected state on control-click
            map.events.onMarkerClicked.subscribe(function(args)
            {
                // Check if click was control-click
                if (args.event.ctrlKey == true || args.event.metaKey == true)
                {
                    // Invert collected state on marker
                    args.map.setMarkerCollected(args.marker, !args.marker.collected, true, true, true);

                    // Don't open the popup with a control-click
                    args.event.stopPropagation();
                }
            });
        }

        // Initialize each existing map with collectibles
        mapsExtended.maps.forEach(function(map) { initMapCollectibles(map); });

        // Do not continue this script if all maps do not have collectibles
        if (mapsExtended.maps.every(function(map) { return map.hasCollectibles == false; }))
            return;
        
        // Save collected states when the tab loses focus
        addEventListener("beforeunload", function(event)
        {
            mapsExtended.maps.forEach(function(map)
            {
                if (map.hasCollectibles)
                    map.saveCollectedStates();
            });
        });

        // Map added/initialized
        mapsExtended.events.onMapInit.subscribe(function(args)
        {
            // Initialize new maps (never do this more than once for a map)
            if (args.isNew == true) initMapCollectibles(args.map);
        });

        // Fire hook to tell other scripts that mapsExtended-collectibles has finished
        mw.hook("dev.mapsExtended-collectibles").fire();
    }

    /*

        Initialization
        
        Sometimes the document is still loading even when this script is executed
	    (this often occurs when the page is opened in a new tab or window).
	    
	    In order to prevent a situation where the script is run but the page has not
	    been fully loaded, check the readyState and listen to a readystatechange
	    event if the readystate is loading

    */

    function init()
    {
        // Do not fire this script more than once
        if (window.dev && window.dev.mapsExtended && window.dev.mapsExtended.loaded == true)
        {
            console.error("MapsExtended - Not running script more than once on page!");
            return;
        }
        
        mx();
        
        // Wait for the core module to finish before running this module
        // The recieving function is just passed a shortcut to Window.dev.mapsExtended
        mw.hook("dev.mapsExtended").add(mxc);
    }

    // The document cannot change readyState between the if and else
    if (document.readyState == "loading")
        document.addEventListener("readystatechange", init);
    else
        init();

})();