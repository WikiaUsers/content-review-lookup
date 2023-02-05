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

        // Do not fire this script more than once
        if (window.dev && window.dev.mapsExtended && window.dev.mapsExtended.loaded == true)
        {
            log("Not running script more than once on page.");
            return;
        };

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
        function findCSSRule(selectorString)
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
            
            console.error("Could not find a CSS rule with the selector \"" + selectorString + "\"");
            return false;
        }

        function getIndexOfRule(cssRule, styleSheet)
        {
            if (!styleSheet.cssRyles)
                return -1;
            
            for (var i = 0; i < styleSheet.cssRules.length; i++)
            {
                if (styleSheet.cssRyles[i].selectorText == cssRule.selectorText)
                    return i;
            }

            return -1;
        }

        // Modifies the first CSS rule found with a <selector> changing it to <newSelector>
        function changeRuleSelector(selector, newSelector)
        {
            var rule = findCSSRule(selector);
            if (rule != null) rule.selectorText = newSelector;
            return rule;
        }

        function appendRuleSelector(selector, additionalSelector)
        {
            var rule = findCSSRule(selector);
            if (rule != null) rule.selectorText = ", " + additionalSelector;
            return rule;
        }

        // Modifies a CSS rule with a <selector>, setting it's new style block declaration entirely
        function changeRuleCSSText(selector, cssText)
        {
            var rule = findCSSRule(selector);
            if (rule != null) rule.style.cssText = cssText;
            return rule;
        }

        // Modidifies a CSS rule with a <selector>, setting the value of a specific property
        function changeRuleCSSStyle(selector, property, value)
        {
            var rule = findCSSRule(selector);
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
            // Rebind onMarkerActivated's this to *this* because addEventListener changes its scope (or whatever)
            this.onMarkerActivated = this.onMarkerActivated.bind(this);
            
            this.id = root.className;

            // This element is permanently part of the parser output, as it is transcluded from the Map: page
            this.rootElement = root;

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

            // Firstly, get the map config from one of the marker definitions
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
            traverseCopyValues(mapsExtended.config, this.config, [], true);

            // Short circuit if the config says this map should be disabled
            if (this.config.disabled == true)
                return;

            // Process category definitions
            for (var i = 0; i < this.categories.length; i++)
            {
                var category = this.categories[i];
                category.id = category.id.toString();
                category.markers = [];
                category.map = this;
                category.nameNormalized = category.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")

                this.categoryLookup.set(category.id, category);

                // Process hints (strings added after double underscore, separated by a single underscore)
                var lastIndex = category.id.lastIndexOf("__");
                category.hints = lastIndex >= 0 ? category.id.slice(lastIndex + 2).split("_") : [];

                // Determine whether the category should be disabled
                category.startDisabled = category.hints.includes("disabled") || (Array.isArray(this.config.disabledCategories) && this.config.disabledCategories.includes(category.id));

                // Determine whether the category should be hidden by default
                category.startHidden = category.hints.includes("hidden") || (Array.isArray(this.config.hiddenCategories) && this.config.hiddenCategories.includes(category.id));

                // Add some helper functions
                category.setLabelText = function(str){ this.elements.checkboxLabelText.innerHTML = str; };

                category.toggle = function(value)
                {
                    if (this.elements && this.elements.checkboxInput)
                    {
                        // Toggle by simulating click (can't set checked directly unfortunately)
                        if (this.elements.checkboxInput.checked != value)
                        {
                            this.elements.checkboxInput.click();
                        }
                    }
                        
                    this.visible = value;
                };

                Object.defineProperty(category, "disabled",
                {
                    get: function ()
                    {
                        if (this.elements && this.elements.filter)
                            return this.elements.filter.style.display == "none";

                        return false;
                    },

                    set: function (value)
                    {
                        if (this.elements && this.elements.filter)
                        {
                            // Toggle by simulating click (can't set checked directly unfortunately)
                            this.elements.filter.style.display = value ? "none" : "";
                        }
                    },
                });

                // Categories always start visible, because we have not yet connected them to the DOM
                category.visible = true;
            }

            // Process marker definitions
            for (var i = 0; i < this.markers.length; i++)
            {
                // Marker (definition in JSON)
                var markerJson = this.markers[i];

                // Marker (element in DOM - we don't know this yet)
                var markerElement = null;

                // Get the category of the marker
                var category = this.categoryLookup.get(markerJson.categoryId);

                // Generate a new ID for the marker if the editor hasn't set one
                if (!markerJson.id) markerJson.id = this.calculateMarkerHash(markerJson);

                // Warn if there already exists a marker with this ID
                if (this.markerLookup.has(markerJson.id))
                {
                    console.error("Multiple markers exist with the id " + markerJson.id + "!");
                    continue;
                }

                // Store a reference to the marker (both JSON and element - once it is retrieved - in the lookup)
                else
                {
                    this.markerLookup.set(markerJson.id, markerJson);

                    // Add reference to this marker in the category it belongs to
                    if (category) category.markers.push(markerJson);
                }

                // Store a reference to the map and category containing this marker on the marker itself
                markerJson.map = this;
                markerJson.category = category;
                markerJson.popup.map = this;
                markerJson.popup.marker = markerJson;
                markerJson.name = markerJson.popup.title;
                markerJson.nameNormalized = markerJson.popup.title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

                // Copy popupFunctions to popup
                Object.assign(markerJson.popup, popupFunctions);

                // Correct the position to always use xy
                if (this.coordinateOrder == "yx")
                {
                    // Swap x and y
                    var y = markerJson.position[0];
                    markerJson.position[0] = markerJson.position[1];
                    markerJson.position[1] = y;
                }

                // Correct the position to always use top-left
                if (this.origin == "bottom-left")
                {
                    markerJson.position[1] = this.size.height - markerJson.position[1];
                }

                // Enforce string IDs
                if (typeof markerJson.id == "number")
                {
                    markerJson.id = markerJson.id.toString();
                }
            }

            // Sort marker definitions, but instead of rearranging the original array, store the index of the sorted marker
            var sortedMarkers = this.markers.slice().sort(this.markerCompareFunction(this.config.sortMarkers));
            for (var i = 0; i < sortedMarkers.length; i++) sortedMarkers[i].order = i;

            // Correct the coordinateOrder
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
            if (this.origin == "bottom-left")
            {
                this.origin = "top-left";

                // Don't need to correct mapBounds since it will be the same anyway
            }

            
            // Remove marker query parameter from URL so that when the map goes fullscreen, it isn't zoomed into the marker again
            var url = window.location;
            urlParams.delete("marker");
            window.history.replaceState({}, document.title, url.origin + url.pathname + (urlParams != "" ? "?" : "") + urlParams.toString() + url.hash);
            
            
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
                    if (mutationRecord.type != "attributes" && mutationRecord.attributeName != "class") return;

                    for (var j = 0; j < attributeObserverConfig.length; j++)
                    {
                        // Using a config just saves us having to repeat the same ol' steps for every attribute
                        var config = attributeObserverConfig[j];

                        if (mutationRecord.target.classList.contains(config.targetClass))
                        {
                            var value = mutationRecord.target.classList.contains(config.toggledClass);
                            this[config.booleanName] = value;
                            this[config.eventName].invoke(value);
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
                            markerJson = this.tryAssociateMarkerElement(markerElement);

                            // If a match was found...
                            if (markerJson)
                            {
                                matched++;
                                this.associateMarkerWithElement(markerJson, markerElement);
                                mapsExtended.onMarkerShown.invoke({ map: this, marker: markerJson });
                            }

                            // Otherwise error out
                            else
                            {
                                var unscaledPos = this.getUnscaledMarkerPosition(markerElement);
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
                    var removedPopupId = mutationList[0].removedNodes[0].id;
                    var removedPopupMarkerId = removedPopupId.replace("popup_", "");
                    var removedPopupMarker = mutationList[0].removedNodes[0].marker || this.markerLookup.get(removedPopupMarkerId);

                    log("Popup removed: " + removedPopupId);
                    mapsExtended.onPopupHidden.invoke({ map: this, marker: removedPopupMarker });

                    // Nullify "currentPopup" if it is currently the removed element
                    if (this.currentPopup && this.currentPopup.id == removedPopupId)
                        this.currentPopup = undefined;
                    if (this.currentPopupMarker && this.currentPopupMarker.id == removedPopupMarkerId)
                        this.currentPopupMarker = undefined;
                    if (this.currentPopupElement && this.currentPopupElement.id == removedPopupId)
                        this.currentPopupElement = undefined;
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
                    this.currentPopupElement = popupElement;

                    // If the last marker clicked doesn't have an associated marker object (i.e. it didn't have an ID), try and associate it now
                    if (!this.lastMarkerClicked)
                    {
                        marker = this.tryAssociateMarkerElementUsingPopup(this.lastMarkerElementClicked, popupElement);

                        if (marker)
                        {
                            this.associateMarkerWithElement(marker, this.lastMarkerElementClicked);
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
                        marker = this.lastMarkerClicked;
                    }

                    if (marker)
                    {
                        var isNew = false;

                        // Check if this is a "new" popup, and if so, cache it
                        // Leaflet doesn't recreate popups, and will remove the element from the DOM once it disappears (but cache it for later)
                        // The exception to this rule is when a marker is hidden (for example when the category is unchecked), in which case a new popup will be created

                        // Deinit popup if the marker already has an associated popup (and if it's not this one)
                        if (marker.popup.elements && marker.popup.elements.popupElement != popupElement)
                        {
                            // Deassociate the old element
                            marker.popup.invalidatePopupElement();
                        }

                        // Init popup if the marker doesn't already have an associated popup
                        if (!marker.popup.elements)
                        {
                            marker.popup.initPopup(popupElement, marker);
                            isNew = true;
                        }
                        
                        this.currentPopup = marker.popup;
                        this.currentPopupMarker = marker;
                        this.currentPopupElement = popupElement;
                        
                        log("Popup added: " + popupElement.id + " (isNew: " + isNew + ")");
                        
                        if (marker.popup._waitForPresenceResolve)
                        {
                            marker.popup._waitForPresenceResolve(marker);
                            marker.popup._waitForPresenceResolve = undefined;
                        }
                    
                        // Fire onPopupShown
                        mapsExtended.onPopupShown.invoke({ map: this, marker: marker, isNew: isNew });
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
            // Fired when a popup for this map is shown. Contains the args: map, marker, isNew (bool)
            onPopupShown: new EventHandler(),

            // Fired when a popup for this map is hidden. Contains the args: map, marker
            onPopupHidden: new EventHandler(),

            // Fired when a marker appears for the first time on this map. Contains the args: map, marker
            onMarkerShown: new EventHandler(),

            // Fired when a marker on this map is clicked. Contains the args: map, marker, e
            onMarkerClicked: new EventHandler(),

            onMapDragged: new EventHandler(),
            onMapZoomed: new EventHandler(),

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
                this.elements.leafletBaseImageLayer = this.elements.leafletOverlayPane.querySelector(".leaflet-image-layer");
                
                // List of all marker elements
                var markerElements = this.elements.leafletMarkerPane.querySelectorAll(".leaflet-marker-icon:not(.marker-cluster)");

                // Things to do only once
                if (isNew)
                {
                    this.selfObserver.observe(this.elements.mapModuleContainer, { childList: true });
                    
                    // Associate category/filter elements with the categories in the JSON
                    // We only need to do this once because it's not part of Leaflet and will never be destroyed   
                    for (var i = 0; i < this.elements.filterElements.length; i++)
                    {
                        var filterElement = this.elements.filterElements[i];

                        var elements = {};
                        elements.filter = filterElement
                        elements.checkboxInput = elements.filter.querySelector("input");
                        elements.checkboxLabel = elements.filter.querySelector("label");
                        elements.checkboxLabelIcon = elements.checkboxLabel.querySelector(".interactive-maps__filters-marker-icon");
                        elements.checkboxLabelText = elements.checkboxLabel.querySelector("span:last-child");

                        var categoryId = elements.checkboxInput.getAttribute("value");
                        var category = this.categories.find(function(x) { return x.id == categoryId; });
            
                        if (category)
                        {
                            filterElement.category = category;
                            filterElement.id = "filter_" + category.id;
                            category.elements = elements;

                            elements.checkboxInput.addEventListener("change", function(e)
                            {
                                this.visible = e.target.checked;
                                mapsExtended.onCategoryToggled.invoke({ map: this.map, category: this, value: e.target.checked });
                                
                            }.bind(category));
                        }
                    }

                    // Create fullscreen button
                    this.initFullscreen();
                    
                    // Hide categories that should start hidden *before* matching markers
                    // When markers are hidden, they are destroyed, therefore matching markers in a category that will be hidden immediately after is a waste of time
                    // In a clustered map, this will trigger recreation of all markers (hence why we do it before initialization)
                    this.categories.forEach(function(c, i, o)
                    {
                        if (c.startHidden == true || c.startDisabled == true) c.toggle(false);
                        if (c.startDisabled == true) c.disabled = true;
                    });
                    
                    // Create category groups
                    this.initCategoryGroups();

                    // Create search dropdown
                    this.initSearch();
                }
                else
                {
                    // Changing the size of the leafet container causes it to be remade (and the fullscreen button control destroyed)
                    // Re-add the fullscreen button to the DOM
                    if (this.elements.leafletControlContainerBottomRight && this.config.allowFullscreen)
                        this.elements.leafletControlContainerBottomRight.prepend(this.elements.fullscreenControl);
                }
        
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
                    if (!markerElement) markerElement = this.tryAssociateMarkerJson(marker);
        
                    // If a marker element was found...
                    if (markerElement)
                        this.associateMarkerWithElement(marker, markerElement);
                    else
                    {
                        // Couldn't associate (will attempt popup contents matching later)
                        log("Could not associate marker definition " + marker.id + " with an element in the DOM.");
                    }
                }

                this.toggleMarkerObserver(true);
                this.togglePopupObserver(true);

                this.leafletAttributeObserver.disconnect();
                this.leafletAttributeObserver.observe(this.elements.leafletContainer, { attributes: true });    
                this.leafletAttributeObserver.observe(this.elements.leafletMapPane, { attributes: true });    
                
                var associatedCount = this.markers.filter(function(x) { return x.markerElement; }).length;
                console.log(this.id + " (" + this.name + ") - Initialized, associated " + associatedCount + " of " + this.markers.length + " markers (using " + markerElements.length + " elements), isNew: " + isNew + ", isVisible: " + this.isMapVisible());

                // Invoke init event
                mapsExtended.onMapInit.invoke({ map: this, isNew: isNew });
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
                
                this.initialized = false;

                for (var i = 0; i < this.markers.length; i++)
                {
                    this.markers[i].markerElement = undefined;
                    this.markers[i].popup.invalidatePopupElement();
                }

                for (var i = 0; i < this.categories.length; i++)
                {
                    //this.categories[i].elements = undefined;
                }

                console.log(this.id + " (" + this.name + ") - Deinitialized");

                // Invoke deinit event
                mapsExtended.onMapDeinit.invoke({map: this});
            },

            // Returns a Promise which is fulfilled when the elements of a map become available, or were already available
            // and rejected if it will never become available in the current state (i.e. map container hidden)
            waitForPresence: function()
            {
                if (this.initialized)
                {
                    return Promise.resolve(this.id + " (" + this.name + ") - The map was initialized immediately");
                }
                
                return new Promise(function(resolve, reject)
                {
                    // Store resolve function (it will be called by selfObserver above)
                    this._waitForPresenceResolve = function()
                    {
                        resolve(this.id + " (" + this.name + ") - Successfully deferred until Leaflet fully initialized.");
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

                var e = document.elementFromPoint(x, y);

                elem.dispatchEvent(mouseDownEvent);
                elem.dispatchEvent(mouseUpEvent);
                elem.dispatchEvent(clickEvent);//click();
                document.activeElement.blur();
            },

            // If a marker definition doesn't have a (unique) ID, we can identify it based on its position+title+desc
            calculateMarkerHash: function(marker)
            {
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
            },
            
            // Stores references between the marker definition in the JSON and the marker element
            // and sets up some events
            associateMarkerWithElement: function(markerJson, markerElement)
            {
                markerJson.markerElement = markerElement;
                markerElement.marker = markerJson;
                markerElement.id = markerJson.id;
                markerElement.style.zIndex = markerJson.order;

                // Add click events to the element
                markerElement.addEventListener("click", this.onMarkerActivated, true);
                markerElement.addEventListener("keydown", this.onMarkerActivated, true);

                // Prevent zoom when double clicking on marker
                markerElement.addEventListener("dblclick", function(e){ e.stopPropagation(); });

                // Mouse enter marker element - Stop timeout for popup
                if (this.config.openPopupsOnHover == true)
                {
                    markerElement.addEventListener("mouseenter", function(e)
                    {
                        var lastMarker = this.lastMarkerClicked;
                        var marker = e.currentTarget.marker || this.markerLookup.get(e.currentTarget.id) || null;

                        // A different marker from the last was clicked
                        // Stop the popupTimeout of the last marker to prevent MapsExtended from clicking
                        // the map in order to hide it, which would accidentially show it again
                        //if (lastMarker && marker && lastMarker != marker)
                        //    lastMarker.popup.stopPopoutTimeout();
                        
                        if (marker)
                        {
                            // Show popup if it's not already shown by clicking the marker
                            if (!marker.popup.isPopupShown() && !this.isDragging)
                            {
                                this.clickPositionOfElement(marker.markerElement);
                            }
                            marker.popup.stopPopoutTimeout();
                        }
                    }.bind(this));

                    // Mouse leave marker element - Start timeout for popup
                    markerElement.addEventListener("mouseleave", function(e)
                    {
                        var marker = e.currentTarget.marker || this.markerLookup.get(e.currentTarget.id) || null;
                        if (marker) marker.popup.startPopupTimeout(marker.popup);
                    }.bind(this));
                }
            },

            // The opposite of the above
            deassociateMarkerWithElement: function(markerJson, markerElement)
            {
                markerJson.markerElement = undefined;
                markerElement.marker = undefined;
                markerElement.id = "";
                markerElement.style.zIndex = "";
            },

            // This is bound to ExtendedMap in the constructor
            onMarkerActivated: function(e)
            {        
                if (e instanceof KeyboardEvent)
                {
                    if (e.key != "Enter")
                        return;
                }
                
                // Fetch marker object given marker element ID
                // (we could just cache the marker object on the element, but doing it this way is more bulletproof)
                this.lastMarkerClicked = this.markerLookup.get(e.currentTarget.id);
                this.lastMarkerElementClicked = e.currentTarget;
                
                mapsExtended.onMarkerClicked.invoke({ map: this, marker: this.lastMarkerClicked, event: e });
                
                // If popups should open only on hover, only non-trusted events (those initiated from scripts)
                // should allow the popup to be opened. Discard click events that are sourced from the browser
                if (this.config.openPopupsOnHover == true && e.isTrusted == true)
                {
                    e.stopPropagation();
                    return;
                }
            },

            // Try to find the marker element in the DOM that matches the marker definition in the JSON file.
            // If a marker element was found, it is returned
            tryAssociateMarkerJson: function(markerJson)
            {
                // Skip if the markerJson already has an associated element
                if (markerJson.markerElement)
                    return markerJson.markerElement;
                
                for (var i = 0; i < this.elements.leafletMarkerPane.children.length; i++)
                {
                    var markerElem = this.elements.leafletMarkerPane.children[i];
                    if (markerElem.classList.contains("marker-cluster")) continue;
                    
                    if (this.compareMarkerAndJsonElement(markerElem, markerJson))
                        return markerElem;
                }
            },

            // Try to find the marker definition in the JSON file that matches the marker element in the DOM
            // If a marker definition was found, it is returned
            tryAssociateMarkerElement: function(elem)
            {
                for (var i = 0; i < this.markers.length; i++)
                {
                    if (this.compareMarkerAndJsonElement(elem, this.markers[i]))
                        return this.markers[i];
                }
            },

            // Try to find the marker definition in the JSON file that matches the marker element in the DOM,
            // using the content of the popup that was just shown as the basis of comparison
            // If a marker definition was found, it is returned
            tryAssociateMarkerElementUsingPopup: function(elem, popup)
            {
                var elements = popupFunctions.fetchPopupElements(elem);

                var popupTitle = elements.popupTitleElement.textContnt;
                var popupDesc = elements.popupDescriptionElement.textContent;

                var wikiPath = mw.config.get("wgServer") + mw.config.get("wgArticlePath").replace("$1", "");
                var popupLinkUrl = elements.popupLinkLabel.getAttribute("href").replace(wikiPath, "");
                var popupLinkLabel = elements.popupLinkLabel.textContent;

                var markerJson = this.markers.find(function(m)
                {
                    // Skip if the marker already has an associated element
                    if (m.markerElement)
                        return false;

                    return popupTitle == m.popup.title &&
                        (m.popup.description && popupDesc == m.popup.description) &&
                        (m.popup.link && popupLinkUrl == m.popup.link.url) &&
                        (m.popup.link && popupLinkLabel == m.popup.link.label);
                });

                return markerJson;
            },

            // Performs a direct comparison between a marker element and a marker definition just to be sure they are equal
            compareMarkerAndJsonElement: function(markerElem, markerJson)
            {
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

            // Returns the ID of the marker element or JSON definition.
            getMarkerId: function(marker)
            {
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

                if (typeof marker.id == "number")
                    marker.id = marker.id.toString();

                return marker.id;
            },

            // Returns the color of the marker element or JSON definition.
            // This appears exactly as entered in the JSON, which supports any valid CSS color
            // When comparing, we use string comparison and not actual color value comparison.
            // This is fine because the colour is always converted to a hex code when it is deserialized
            getMarkerColor: function(marker)
            {
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
                    if (this.categoryLookup.has(marker.categoryId))
                    {
                        return this.categoryLookup.get(marker.categoryId).color.toLowerCase().trim();
                    }
                }

                return;
            },

            // Returns the icon texture filename of the marker element or JSON definition.
            // Set fileNameOnly to true to return just the file name of the icon, otherwise the full URL is returned
            getMarkerIcon: function(marker, fileNameOnly)
            {
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
                    // Icon object (directly from marker) containing title, url, width, height
                    var icon = marker.icon;
                    
                    // If marker doesn't have an icon, check if it's category does
                    if (!icon && this.categoryLookup.has(marker.categoryId))
                    {
                        var category = this.categoryLookup.get(marker.categoryId);
                        icon = category.icon;
                    }

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
                        pos[0] = Math.round((pos[0] / imageSize[0]) * this.size.width);
                        pos[1] = Math.round((pos[1] / imageSize[1]) * this.size.height);

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
                var pos = [];

                // Get scaled position of a marker element in DOM
                // For elements, it's easier to simply get the transform:translate from the styles
                if (marker instanceof Element)
                {
                    // Get base layer transform position. This needs to be calculated on the fly as it will change as the user zooms
                    var baseLayerPos = this.getTranslateXY(this.elements.leafletBaseImageLayer);

                    // Subtract the current position of the map overlay to the marker position to get the scaled position
                    pos = this.getTranslateXY(marker);
                    pos[0] -= baseLayerPos[0];
                    pos[1] -= baseLayerPos[1];
                }

                // Get unscaled position of a marker definition from JSON
                else
                {
                    pos = this.unscaledToScaledPosition([ marker.position[0],
                                                        marker.position[1] ]);
                }

                return pos;
            },

            // Scale a full "unscaled" position to current map size, returning the scaled position
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

            // Get the current background image size at the current zoom level
            getScaledMapImageSize: function()
            {
                var size = [this.elements.leafletBaseImageLayer.width, this.elements.leafletBaseImageLayer.height];

                // If the map was just shown, the base image layer may not have a width and height
                // However, the style will always be correct, so we can fetch the size from that instead (at a minor performance penalty)
                if (size[0] == 0 && size[1] == 0)
                {
                    size[0] = parseFloat(this.elements.leafletBaseImageLayer.style.width);
                    size[1] = parseFloat(this.elements.leafletBaseImageLayer.style.height);
                }

                return size;
            },

            // Get the transform:translate XY position from an element
            getTranslateXY: function(element)
            {
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
                // Change scope of rule covering .leaflet-control-zoom to cover all leaflet-control
                changeRuleSelector(".Map-module_interactiveMap__135mg .leaflet-control-zoom",
                                ".Map-module_interactiveMap__135mg .leaflet-control");
                changeRuleSelector(".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out",
                                ".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-fullscreen-button, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-popup-button");
                changeRuleSelector(".leaflet-control-zoom-in, .leaflet-control-zoom-out",
                                ".leaflet-control-zoom-in, .leaflet-control-zoom-out, .leaflet-control-fullscreen-button, .leaflet-control-popup-button");
                changeRuleSelector(".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:hover",
                                ".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-fullscreen-button:hover, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-popup-button:hover");
                changeRuleSelector(".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:active",
                                ".Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-in:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-zoom-out:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-fullscreen-button:active, .Map-module_interactiveMap__135mg .leaflet-bar .leaflet-control-popup-button:active");

                changeRuleCSSText(".leaflet-touch .leaflet-bar a:first-child", "border-top-left-radius: 3px; border-top-right-radius: 3px;");
                changeRuleCSSText(".leaflet-touch .leaflet-bar a:last-child", "border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;");

                // Rule to match 3px border-radius of other buttons
                mapsExtended.stylesheet.insertRule(".leaflet-control-fullscreen-button { border-radius:3px; cursor:pointer; }");

                // Rule to hide zoom-out SVG when zoom-in button should be shown and vice versa
                mapsExtended.stylesheet.insertRule(".leaflet-control-fullscreen-button-zoom-in > svg[data-id=\"wds-icons-zoom-out-small\"] { display:none; }");
                mapsExtended.stylesheet.insertRule(".leaflet-control-fullscreen-button-zoom-out > svg[data-id=\"wds-icons-zoom-in-small\"] { display:none; }");

                
                // Rule to override the size of the map when in fullscreen so it fills the screen
                mapsExtended.stylesheet.insertRule(".fullscreen .leaflet-container, .windowed-fullscreen .leaflet-container { height:100vh !important; width:100vw !important; }");

                // Rule to move the filters dropdown to within the map body when in fullscreen
                mapsExtended.stylesheet.insertRule(".fullscreen .interactive-maps .interactive-maps__filters-list, .windowed-fullscreen .interactive-maps .interactive-maps__filters-list { width:fit-content; margin:12px 0 0 12px; position:absolute; z-index:9999; }")

                // Rule to add background back to pill buttons
                //mapsExtended.stylesheet.insertRule(".fullscreen .interactive-maps__filters-list .wds-pill-button, .windowed-fullscreen .interactive-maps__filters-list .wds-pill-button { color: var(--theme-accent-label-color); background-color: var(--theme-accent-color); box-shadow: 0 1px 3px 0 rgb(14 25 26 / 30%); }")
                //mapsExtended.stylesheet.insertRule(".fullscreen .interactive-maps__filters-list .wds-pill-button:hover, .windowed-fullscreen .interactive-maps__filters-list .wds-pill-button:hover { background-color: var(--theme-accent-color--hover); box-shadow: inset 0 0 18px 36px hsl(0deg 0% 100% / 10%); }")
                
                // Rule to make map root absolutely positioned when in windowedFullscreen
                mapsExtended.stylesheet.insertRule(".windowed-fullscreen > body > [class^=\"interactive-map-\"] { position: fixed; top: 0; left: 0; }");
                
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

                    // Remove specific buttons depending on the current mode
                    if (this.config.allowFullscreen == false)
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
                        else if (e.ctrlKey)
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
                searchRoot.style.maxHeight = (this.elements.rootElement.clientHeight - 37) + "px";

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
                    this.elements.searchRoot.style.maxHeight = (this.elements.rootElement.clientHeight - (this.isFullscreen || this.isWindowedFullscreen ? 60 : 37)) + "px";
                    
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

                mapsExtended.onCategoryToggled.subscribe(function(e)
                {
                    if (e.map != this) return;

                    // Deselect the current marker if it belongs to the category being filtered out
                    if (e.value == false && this.searchSelectedMarker && this.searchSelectedMarker.categoryId == e.category.id)
                        this.toggleMarkerSelected(this.searchSelectedMarker, false);
                    
                    e.category.elements.searchResultsContainer.classList.toggle("filtered", !e.value);
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
                if (this.config.allowSearch == false)
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
                    var isInResults = search.results.includes(marker);
                    var isInMatches = search.markerMatches.includes(marker);
                    var wasInMatches = this.lastSearch != undefined && this.lastSearch.markerMatches.includes(marker);
                    
                    if (marker.markerElement)
                        marker.markerElement.classList.toggle("search-result", isInResults);
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

            initCategoryGroupsStyles: once(function()
            {
                // Change selectors that are rooted to interactive-maps__filters-dropdown to instead be rooted to interactive-maps__filters-list
                // so that they apply to all dropdowns within interactive-maps__filters-list
                changeRuleSelector(".interactive-maps__filters-dropdown .wds-dropdown::after, .interactive-maps__filters-dropdown .wds-dropdown::before",
                                   ".interactive-maps__filters-list .wds-dropdown::after, .interactive-maps__filters-list .wds-dropdown::before");
                changeRuleSelector(".interactive-maps__filters-dropdown .wds-dropdown__content", ".interactive-maps__filters-list .wds-dropdown__content");
                
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

            ExtendedMarker

            Not a prototype, but a reference to each of these functions is stored on every marker
            Many of these functions simply make it easier to change parts of the popup

            Functions starting with get or set are integrated directly into the getters and setters,
            to make the whole object a little more cohesive

            It takes into account cases where a popup element isn't associated, and will store the
            pending changes and wait for the popup element to appear before making them

        */

        var validPopupTextElementTypes = [ "title", "description", "link", "link-url" ];

        // These functions are attached to popup object on a marker
        var popupFunctions = 
        {
            // This should be called after the popupElement reference is found
            initPopup: function(popupElement, marker)
            {
                this.marker = marker;
                this.popup = marker.popup;
                this.map = marker.map;
                this.elements = this.fetchPopupElements(popupElement);
                this.elements.popupElement.id = "popup_" + marker.id;
                this.elements.popupElement.popup = this;

                if (this.marker.map.config.openPopupsOnHover == true)
                {
                    popupElement.addEventListener("mouseenter", function(e){ this.stopPopoutTimeout();}.bind(this));
                    popupElement.addEventListener("mouseleave", function(e){ this.startPopupTimeout();}.bind(this));
                }
                
                // Process any popup changes that are pending
                this.processPendingChanges();
            },

            // Returns an object containing all the sub-elements of the root popup element
            fetchPopupElements: function(popupElement)
            {
                var e = {};
                e.popupElement = popupElement;

                // Module content - will always exist
                e.popupContentElement = e.popupElement.querySelector(".MarkerPopup-module_content__9zoQq");

                // Content top container element (containing title) - will always exist
                e.popupContentTopContainerElement = e.popupContentElement.querySelector(".MarkerPopup-module_contentTopContainer__qgen9");
                e.popupTitleElement = e.popupContentTopContainerElement.querySelector(".MarkerPopup-module_title__7ziRt");
                
                // Scrollable content (containing description and image) - will not exist if a description or image is not present
                e.popupScrollableContentElement = e.popupContentElement.querySelector(".MarkerPopup-module_scrollableContent__0N5PS");
                if (e.popupScrollableContentElement)
                {
                    e.popupDescriptionElement = e.popupScrollableContentElement.querySelector(".MarkerPopup-module_descriptionContent__-ypRG");
                    e.popupImageElement = e.popupScrollableContentElement.querySelector(".MarkerPopup-module_image__7I5s4");
                }

                // Link element, will only exist if link is present
                e.popupLinkElement = e.popupContentElement.querySelector(".MarkerPopup-module_link__f59Lh > a");

                return e;
            },

            // This should be called before a new popupElement is set, to invalidate the old no-longer-used popup element
            invalidatePopupElement: function()
            {
                this.elements = null;
            },

            isPopupShown: function()
            {
                return this.elements && this.elements.popupElement
                && this.elements.popupElement.isConnected == true
                && this.elements.popupElement.style.opacity == "1";
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

            // Shows the popup, returns true if it was shown, false if it could not be shown (because it's already shown)
            show: function()
            {
                if (!this.isPopupShown())
                {
                    this.marker.markerElement.click();
                    return true;
                }

                return false;
            },

            // Hides the popup, returns true if it was hidden, false if it could not be hidden (because it's already hidden)
            hide: function()
            {
                // Don't continue if the popup is already hidden
                if (!this.isPopupShown()) return false;
                
                // Defer hide until drag has finished (since hiding clicks the map and will end the drag) 
                if (this.map.isDragging == true)
                {
                    this.map.onMapDragged.subscribeOnce(function(isDragging)
                    {
                    if (isDragging == false) this.hide();
                    }.bind(this));

                    return;
                }

                this.map.clickPositionOfElement(this.marker.markerElement);
                return true;
            },

            toggle: function(value)
            {
                if (value == undefined)
                    value = !this.isPopupShown();
                
                if (value)
                    this.show();
                else
                    this.hide();
            },

            // Stops the timeout that would have caused this popup to close
            stopPopoutTimeout: function(e)
            {
                window.clearTimeout(this.popupHideTimeout);
            },

            // Starts the timeout, closing the popup after 1 second, caching it in marker.popup.popupHideTimeout
            startPopupTimeout: function(e)
            {
                window.clearTimeout(this.popupHideTimeout); // <- Stop any existing timeout
                this.popupHideTimeout = window.setTimeout(this.hide.bind(this), 1000);
            },

            // Sets the text or HTML of a specific popup element (see validPopupTextElementTypes above)
            // This function is really only used to avoid duplicated code, and to make calling from processPendingChanges easier
            setPopupText: function(type, str)
            {
                if (!validPopupTextElementTypes.includes(type))
                {
                    console.error("Popup text type " + type + " is invalid. Valid types are:\n" + validPopupTextElementTypes.toString());
                    return;
                }
                
                // Have a popup element reference
                if (this.elements.popupElement)
                {
                    // Links are treated a bit differently
                    if (type == "link-label" || type == "link-url")
                    {
                        // Create popup link elements if they aren't already present
                        this.createPopupLinkElement();
                        this.popup.link[type.replace("link-")] = str;

                        if (type == "link-label")
                            this.elements.popupLinkElement.innerHTML = str;
                        else
                        {
                            // Add article path if using a local page name
                            if (!str.startsWith("http://"))
                                str = mw.config.get("wgArticlePath").replace("$1", str);

                            this.elements.popupLinkElement.setAttribute("href", str);
                        }
                    }
                    else
                    {
                        // Ensure elements are created first
                        if (type == "description" && !this.elements.DescriptionElement)
                            this.createPopupDescriptionElement();
                        
                        this[type] = str;
                        this["popup" + (type[0].toUpperCase() + type.slice(1)) + "Element"].innerHTML = str;
                    }
                }

                // Don't yet have a popup element reference, add this to "pending"
                else
                {
                    this.pendingChanges = this.pendingChanges || { };
                    this.pendingChanges[type] = str;
                } 

                // Keep track of which strings have been modified from their default
                this.modifiedTexts = this.modifiedTexts || { };
                this.modifiedTexts[type] = true;
            },

            // Sets the popup title innerHTML (both plain text and html are supported)
            setTitle: function(str)
            {
                this.setPopupText("title", str);
            },

            // Sets the popup description innerHTML (plain text, html, and isWikitext is supported)
            setDescription: function(str, isWikitext)
            {
                if (isWikitext == true)
                {
                    var api = new mw.Api();
                    api.parse(str, { "disablelimitreport": true }).done(function(data)
                    {
                        this.setPopupText("description", data);
                    });
                }
                else
                    this.setPopupText("description", str);
            },

            // Sets the popup link label innerHTML (both plain text and html are supported)
            setLinkLabel: function(str)
            {
                this.setPopupText("link", str);
            },

            // Sets the popup link href
            // Page can be a full url, or the name of a page on the wiki
            setLinkUrl: function(page)
            {
                this.setPopupText("link-url", page);
            },

            // Create a new scrollable content element (which holds the discription and image)
            // This is neccesary if the JSON didn't define a description
            createPopupScrollableContentElement: function()
            {
                if (!this.elements.popupScrollableContentElement)
                {
                    this.elements.popupScrollableContentElement = document.createElement("div");
                    this.elements.popupScrollableContentElement.className = "MarkerPopup-module_scrollableContent__0N5PS";

                    // Place after topContainerElement
                    if (this.elements.popupContentTopContainerElement)
                        this.elements.popupContentTopContainerElement.after(this.elements.popupScrollableContentElement);
                    // Or as the first child of popupContent
                    else if (this.elements.popupContentElement)
                        this.elements.popupContentElement.prepend(this.elements.popupScrollableContentElement);
                    else
                        log("Couldn't find a suitable position to add scrollable content element");
                }

                return this.elements.popupScrollableContentElement;
            },

            createPopupDescriptionElement: function()
            {
                if (!this.elements.popupDescriptionElement)
                {
                    var e = document.createElement("div");
                    e.className = "MarkerPopup-module_description__fKuSE";
                    var c = document.createElement("div");
                    c.className = "page-content MarkerPopup-module_descriptionContent__-ypRG";
                    e.appendChild(c);

                    this.elements.popupDescriptionElement = c;

                    var scrollableContentElement = this.createPopupScrollableContentElement();
                    // Place before imageWrapperElement
                    if (this.elements.popupImageElement)
                        this.elements.popupImageElement.parentElement.before(this.elements.popupDescriptionElement);
                    // Or just as first child of scrollableContent
                    else if (scrollableContentElement)
                        scrollableContentElement.prepend(this.elements.popupDescriptionElement);
                    else
                        log("Couldn't find a suitable position to add popup description element");
                }

                return this.elements.popupDescriptionElement;
            },

            // If a popup link isn't present in the JSON definition, one will not be created in the DOM
            // If this is the case, this function can be called to create an empty link element
            createPopupLinkElement: function()
            {
                if (!this.elements.popupLinkElement)
                {
                    var fandomPopupContentRoot = this.elements.popupElement.querySelector(".map-marker-popup");
                    fandomPopupContentRoot.insertAdjacentHTML("beforeend", "<div class=\"MarkerPopup-module_link__f59Lh\"><svg class=\"wds-icon wds-icon-tiny MarkerPopup-module_linkIcon__q3Rbd\"><use xlink:href=\"#wds-icons-link-tiny\"></use></svg><a href=\"\" target=\"\" rel=\"noopener noreferrer\"></a></div>");
                    this.elements.popupLinkElement = this.elements.popupElement.querySelector(".MarkerPopup-module_link__f59Lh > a");
                    this.elements.popup.link = {};
                }

                return this.elements.popupLinkElement;
            },

            // Processes all the unapplied changes that were set prior to having a popup associated with this marker
            processPendingChanges: function()
            {
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

            // Fired when any category for any map is toggled. Contains the args: map, category, value
            onCategoryToggled: new EventHandler(),

            // Fired when any popup for any map is shown. Contains the args: map, marker, isNew (bool)
            onPopupShown: new EventHandler(),

            // Fired when a popup for any map is hidden. Contains the args: map, marker
            onPopupHidden: new EventHandler(),

            // Fired when a marker appears for the first time on any map. Contains the args: map, marker
            onMarkerShown: new EventHandler(),

            // Fired when a marker is clicked on any map. Contains the args: map, marker, event
            onMarkerClicked: new EventHandler(),

            // Fired when a new map appears on the page or is otherwise initialized. Contains the args: map, isNew.
            // This may be a refresh of an existing map, in which case isNew is false.
            // A refreshed map should be treated like a new map - any references to the old map and its markers will be invalid and should be discarded
            onMapInit: new EventHandler(),

            // Fired when an existing map disappears from the page, or is otherwise deinitialized
            onMapDeinit: new EventHandler()
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
            openPopupsOnHover: false,
            allowFullscreen: true,
            fullscreenMode: "window",
            allowSearch: true
        };

        // Load settings from an existing "global" configuration object (set in Common.js for example)
        // Copy the default config over the global config, keeping any values set in the global
        mapsExtended.config = traverseCopyValues(defaultConfig, window.mapsExtendedConfig);
        delete window.mapsExtendedConfig;

        // Add some utility functions to the mapsExtended object
        mapsExtended.util =
        {
            once: once,
            findCSSRule: findCSSRule,
            getIndexOfRule: getIndexOfRule,
            changeRuleSelector: changeRuleSelector,
            changeRuleCSSText: changeRuleCSSText,
            changeRuleCSSStyle: changeRuleCSSStyle
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
            */

            // The core module doesn't use any translations, but we might as well ensure it's loaded before running other modules
            return new Promise(function(resolve, reject)
            {
                mw.hook("dev.i18n").add(function(i18n)
                {
                    var CACHE_VERSION = 2; // Increment manually to force cache to update (do this when new entries are added)

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

                // We may either have to wait a few frames for Leaflet to initialize
                // So create a promise which resolves then the map has fully loaded
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

        // Set up some reusable styles
        window.dev.mapsExtended.stylesheet.insertRule(".mapsExtended_collectibleClearButton { float: right; font-weight: 700; letter-spacing: .25px; text-transform: uppercase; font-size: 12px; margin: 12px 12px 0 0; cursor: pointer; user-select: none; -webkit-user-select: none }");

        var defaultCollectiblesConfig =
        {
            collectibleCategories: [],
            collectedMarkerOpacity: "50%",
            enableCollectedAllNotification: true
        };

        // Apply the defaultCollectibles if the user has not set them - do this by Object.assign'ing
        // both the properties read from the config (in Common.js) and default ones and applying this back to the object
        mapsExtended.config.collectibles = Object.assign({}, defaultCollectiblesConfig, mapsExtended.config.collectibles);

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
                        if (e.ctrlKey == true)
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
        mapsExtended.onMapInit.subscribe(function(args)
        {
            // Initialize new maps (never do this more than once for a map)
            if (args.isNew == true) initMapCollectibles(args.map);

            // Update visuals for old maps
            else
            {
                // Nudge collected states
                args.map.nudgeCollectedStates();

                // Update labels
                args.map.categories.forEach(function(c) { c.updateCollectedLabel(); });
            }
        });

        // Marker shown
        mapsExtended.onMarkerShown.subscribe(function(args)
        {
            // When a new marker is shown, set it's collected state to itself update the marker opacity
            args.map.setMarkerCollected(args.marker, args.marker.collected, true);
        });

        // Popup shown
        mapsExtended.onPopupShown.subscribe(function(args)
        {
            if (args.isNew == false) return;

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
                marker.popup.elements.popupTitleElement.after(popupCollectedCheckbox);

                // Checked changed event
                popupCollectedCheckboxInput.addEventListener("change", function(e)
                {
                    map.setMarkerCollected(e.currentTarget.marker, e.currentTarget.checked, false, true, true);
                });
        
                map.togglePopupObserver(true);
            }
        });

        // Marker clicked - Toggle collected state on control-click
        mapsExtended.onMarkerClicked.subscribe(function(args)
        {
            // Check if click was control-click
            if (args.event.ctrlKey == true)
            {
                // Invert collected state on marker
                args.map.setMarkerCollected(args.marker, !args.marker.collected, true, true, true);

                // Don't open the popup with a control-click
                args.event.stopPropagation();
            }
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