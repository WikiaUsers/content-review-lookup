/*

    MapsExtended.js
    Author: Macklin

    Provides a framework for extending Interactive Maps, adding some useful functions in the process

*/
(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
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

    function EventHandler() {
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
                    this._listeners[i](args);
            }

            if (this._listenersOnce)
            {
                for (var i = 0; i < this._listenersOnce.length; i++)
                    this._listenersOnce[i](args);

                this._listenersOnce = [];
            }
        }
    };


// Helper functions
    

    // Loads a *single* module of name, returns a promise which resolves when the module is loaded, with a reference to the exported module
    function loadModule(name)
    {
        var moduleName = mw.loader.getModuleNames().find(function(n){ return n === name || n.startsWith(name + "-"); });
        return mw.loader.using(moduleName).then(function(require){ return require(moduleName); });
    }


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

    // Find a specific value in an object using a path
    function traverse(obj, path)
    {
        // Convert indexes to properties, and strip leading periods
        path = path.replace("/\[(\w+)\]/g", ".$1").replace("/^\./", "");
        var pathArray = path.split(".");
        
        for (var i = 0; i < pathArray.length; i++)
        {
            var key = pathArray[i];
            if (key in obj)
                obj = obj[key];
            else
                return;
        }

        return obj;
    }

    // This function takes an array xs and a key (which can either be a property name or a function)
    function groupByArray(xs, key)
    {
        // Reduce is used to call a function for each element in the array
        return xs.reduce(function(rv, x)
        {
            // Here we're checking whether key is a function, and if it is, we're calling it with x as the argument
            // Otherwise, we're assuming that key is a property name and we're accessing that property on x
            var v = key instanceof Function ? key(x) : x[key];

            // rv is the returned array of key-value pairs, that we're building up as we go
            // Find the existing kvp in the results with a key property equal to v
            var el = rv.find(function(r){ return r && r.key === v; });

            // If we find an existing pair, we'll add x to its values array.
            if (el) el.values.push(x);
            
            // If we don't find one, create one with an array contain just the value
            else rv.push({ key: v, values: [x] });

            return rv;

        }, []);
    }

    function isEmptyObject(obj)
    {
        for (var i in obj) return false; 
        return true;
    }

    var decodeHTMLEntities = (function()
    {
        // This prevents any overhead from creating the object each time
        var element = document.createElement("div");
      
        function decodeHTMLEntities(str)
        {
            if (str && typeof str === "string")
            {
                // Strip script/html tags
                str = str.replace("/<script[^>]*>([\S\s]*?)<\/script>/gmi", "");
                str = str.replace("/<\/?\w(?:[^\"'>]|\"[^\"]*\"|'[^']*')*>/gmi", "");
                element.innerHTML = str;
                str = element.textContent;
                element.textContent = "";
            }

            return str;
        }
      
        return decodeHTMLEntities;

    })();

    function capitalizeFirstLetter(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function generateRandomString(length)
    {
        var result = "";
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charsLength = chars.length;
        var counter = 0;
        while (counter < length)
        {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
            counter += 1;
        }
        return result;
    }

    function getIntersectionPoint(line1, line2)
    {
        var x1 = line1[0][0];
        var y1 = line1[0][1];
        var x2 = line1[1][0];
        var y2 = line1[1][1];
        var x3 = line2[0][0];
        var y3 = line2[0][1];
        var x4 = line2[1][0];
        var y4 = line2[1][1];
        
        var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        
        if (denominator === 0)
        {
            // Lines are parallel, there is no intersection
            return null;
        }
        
        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
        
        var intersectionX = x1 + ua * (x2 - x1);
        var intersectionY = y1 + ua * (y2 - y1);
        
        return [intersectionX, intersectionY];
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
        
        //console.error("Could not find a CSS rule with the selector \"" + selectorString + "\"");
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


// MapsExtended

    
    function mx()
    {
        var urlParams = new URLSearchParams(window.location.search);
        var isDebug = urlParams.get("debugMapsExtended") == "1" || localStorage.getItem("debugMapsExtended") == "1";
        var isDisabled = urlParams.get("disableMapsExtended") == "1" || localStorage.getItem("disableMapsExtended") == "1";

        if (isDebug)
        {
            var log = console.log.bind(window.console);
            var error = console.error.bind(window.console);
        }
        else
        {
            var log = function(){};
            var error = function(){};
        }

        if (isDisabled)
            return;
        
        console.log("Loaded MapsExtended.js!" + (isDebug ? " (DEBUG MODE)" : "") + " (location is " + window.location + ")");

        // Do not run on pages without interactive maps
        var test = document.querySelector(".interactive-maps-container");
        if (test == undefined)
        {
            log("No interactive maps found on page. document.readyState is \"" + document.readyState + "\"");
            return;
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

            // ID is unique to each instance
            this.id = root.id;

            // Map ID is unique to the map definition on this page, but not unique to each instance on the page
            // It has the ID equivalency of the name of the map
            this.mapId = root.className;

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
            jQuery.extend(true, this, mw.config.get("interactiveMaps")[this.mapId]);

            // Lookup tables (iterating interactiveMap.markers is slow when the map has a lot of markers)
            // markerLookup may contain markers that do not yet have an associated element!
            this.markerLookup = new Map();
            this.categoryLookup = new Map();

            // Unscaled size / bounds
            this.size = { width: Math.abs(this.bounds[1][0] - this.bounds[0][0]),
                         height: Math.abs(this.bounds[1][1] - this.bounds[0][1]) };

            var hasGlobalConfig = mapsExtended.isGlobalConfigLoaded;
            var hasLocalConfig = mapsExtended.localConfigs[this.name] != undefined && !isEmptyObject(mapsExtended.localConfigs[this.name]);
            var hasEmbedConfig = mapsExtended.embedConfigs[this.id] != undefined && !isEmptyObject(mapsExtended.embedConfigs[this.id]);

            // Check whether a local config is present
            if (hasLocalConfig)
            {
                var localConfig = mapsExtended.localConfigs[this.name];
            }

            // Check whether an embedded config is present
            if (hasEmbedConfig)
            {
                var embedConfig = mapsExtended.embedConfigs[this.id];
            }

            // Use the config based on precedence embed -> local -> global -> default
            this.config = hasEmbedConfig ? embedConfig :
                          hasLocalConfig ? localConfig : 
                          hasGlobalConfig ? mapsExtended.globalConfig :
                                            mapsExtended.defaultConfig;

            // Short circuit if the config says this map should be disabled
            if (this.config.disabled == true)
                return;

            this.events = 
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

                // Fired when the map is clicked, before any "click" events are fired. Contains the args:
                // map (the map that was clicked)
                // isDragging (to detect whether the click was the end of a drag),
                // isMarker (to detect whether the click was on a marker)
                // e (the event, note that target will not always be the base layer)
                onMapClicked: new EventHandler(),

                // Fired when the user started or ended dragging a map
                onMapDragged: new EventHandler(),

                // Fired when the user paused or resumed an in-progress drag, by not moving their mouse
                onMapDraggedMove: new EventHandler(),

                // Zoom event triggered by the attributeObserver, contains the args
                // map (the map that was zoomed)
                // value (true if starting a zoom, false if ending a zoom)
                // type (the type of zoom this is, typically how it was initiated. Values are button, wheel, box, key)
                // center (the center position of the zoom in viewport pixel units)
                // scaleDelta (the delta scale factor that the map is zooming to)
                // scale (the new scale of the map after the zoom)
                onMapZoomed: new EventHandler(),

                // Pan event triggered by the attributeObserver
                onMapPanned: new EventHandler(),

                // Fired when the map goes fullscreen
                onMapFullscreen: new EventHandler(),

                // Fired when the leaflet container element is resized.
                onMapResized: new EventHandler(),

                // Fired when the map-container element is resized
                onMapModuleResized: new EventHandler(),

                // Triggered after a search has been performed. Contains the args: map, search
                onSearchPerformed: new EventHandler()
            };

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

            // Infer iconAnchor from iconPosition
            if (this.config["iconPosition"] != undefined)
            {
                this.config["iconAnchor"] = "";
                if (this.config["iconPosition"].startsWith("top"))     this.config["iconAnchor"] += "bottom";
                if (this.config["iconPosition"].startsWith("center"))  this.config["iconAnchor"] += "center";
                if (this.config["iconPosition"].startsWith("bottom"))  this.config["iconAnchor"] += "top";
                if (this.config["iconPosition"].endsWith("left"))      this.config["iconAnchor"] += "-right";
                if (this.config["iconPosition"].endsWith("center"))    this.config["iconAnchor"] += "";
                if (this.config["iconPosition"].endsWith("right"))     this.config["iconAnchor"] += "-left";
            }

            // Infer hiddenCategories from visibleCategories
            // A category is hidden if it either isn't present in visibleCategories, or is present in hiddenCategories
            if (this.config["visibleCategories"] != undefined && this.config["visibleCategories"].length > 0)
            {
                for (var i = 0; i < this.categories.length; i++)
                {
                    var id = this.categories[i].id;
                    
                    // Add all categories NOT in visibleCategories to hiddenCategories
                    if (!this.config.visibleCategories.includes(id) && !this.config.hiddenCategories.includes(id))
                        this.config.hiddenCategories.push(id);
                }
            }
            
            // Process category definitions
            for (var i = 0; i < this.categories.length; i++)
                this.categories[i] = new ExtendedCategory(this, this.categories[i]);

            // Process marker definitions
            for (var i = 0; i < this.markers.length; i++)
                this.markers[i] = new ExtendedMarker(this, this.markers[i]);

            // Remove empty categories (categories that contain no markers)
            for (var i = 0; i < this.categories.length; i++)
            {
                if (this.categories[i].markers.length == 0)
                {
                    log("Removed category \"" + this.categories[i].name + "\" (" + this.categories[i].id + ") because it contained no markers");

                    // Remove from lookup
                    this.categoryLookup.delete(this.categories[i].id);

                    // Remove elements from DOM
                    var filterInputElement = document.getElementById(this.mapId + "__checkbox-" + this.categories[i].id);
                    var filterElement = filterInputElement.closest(".interactive-maps__filter");
                    filterElement.remove();

                    // Delete instance
                    delete this.categories[i];
                    
                    // Splice loop
                    this.categories.splice(i, 1);
                    i--;
                }
            }

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
                /*
                {
                    targetClass: "leaflet-container",
                    toggledClass: "leaflet-drag-target",
                    booleanName: "isDragging",
                    eventName: "onMapDragged"
                },
                */
                {
                    targetClass: "leaflet-map-pane",
                    toggledClass: "leaflet-zoom-anim",
                    booleanName: "isZooming",
                    eventName: "onMapZoomed"
                },
                {
                    targetClass: "leaflet-map-pane",
                    toggledClass: "leaflet-pan-anim",
                    booleanName: "isPanning",
                    eventName: "onMapPanned"
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

                                if (config.eventName == "onMapZoomed")
                                {
                                    this.events[config.eventName].invoke({
                                        map: this,
                                        value: value,
                                        center: this.zoomCenter,
                                        type: this.zoomType,
                                        scaleDelta: this.getElementTransformScale(this.elements.leafletBaseImageLayer, true),
                                        scale: this.getElementTransformScale(this.elements.leafletProxy, true) * 2
                                    });
                                }
                                else
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
                        var markerPos = this.getElementTransformPos(popupElement);

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

            this.resizeObserved = OO.ui.throttle(function(e)
            {
                for (var i = 0; i < e.length; i++)
                {
                    var entry = e[i];
                    
                    if (entry.target == this.elements.leafletContainer)
                    {
                        this.events.onMapResized.invoke(
                        {
                            map: this,
                            rect: entry.contentRect,
                            lastRect: this.events.onMapResized.lastRect || entry.contentRect
                        });
                        this.events.onMapResized.lastRect = entry.contentRect;
                    }
                    else if (entry.target == this.elements.mapModuleContainer)
                    {
                        this.events.onMapModuleResized.invoke(
                        {
                            map: this,
                            rect: entry.contentRect,
                            lastRect: this.events.onMapModuleResized.lastRect || entry.contentRect
                        });
                        this.events.onMapModuleResized.lastRect = entry.contentRect;
                    }
                }

            }.bind(this), 250);


            this.rootObserver = new MutationObserver(this.rootObserved);
            this.selfObserver = new MutationObserver(this.selfObserved);
            this.leafletAttributeObserver = new MutationObserver(this.leafletAttributeObserved);
            this.markerObserver = new MutationObserver(this.markerObserved);
            this.popupObserver = new MutationObserver(this.popupObserved);
            this.resizeObserver = new ResizeObserver(this.resizeObserved);
            
            // Finally, connect to the DOM
            
            // At this point Interactive Maps may have created the container (underneath the interactive-map-xxxxxxx stub),
            // but Leaflet may not have actually created the map.
            // If we decide to initialize the map now without checking, it may not have any marker elements to connect to
            if (this.isMapCreated() == false)
            {
                // Leaflet not finished initializing
                console.log(this.id + " (" + this.name + ") - Leaflet not yet initialized for map. Init will be deferred");
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
            // Init associates the map to the DOM.
            // It should be passed the root element with the class "interactive-map-xxxxxxxx",
            // though it will use the rootElement in this.element.rootElement if not
            init: function(root)
            {
                if (this.initialized)
                {
                    log(this.id + " (" + this.name + ") - Tried to initialize map when it was already initialized");
                    return;
                }

                var isNew = !this.initializedOnce;

                if (!root) root = this.elements != null ? this.elements.rootElement : null;
                if (!root) console.error("ExtendedMap.init did not find a reference to the root interactive-map-xxxxxxxx element!");

                // References to Leaflet elements in the DOM        
                this.elements = this.elements || {};
                this.elements.rootElement = root;
                this.elements.interactiveMapsContainer = root.closest(".interactive-maps-container");
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
                this.elements.leafletOverlayPane = this.elements.leafletMapPane.querySelector(".leaflet-overlay-pane");
                this.elements.leafletMarkerPane = this.elements.leafletMapPane.querySelector(".leaflet-marker-pane");
                this.elements.leafletTooltipPane = this.elements.leafletMapPane.querySelector(".leaflet-tooltip-pane");
                this.elements.leafletPopupPane = this.elements.leafletMapPane.querySelector(".leaflet-popup-pane");
                this.elements.leafletProxy = this.elements.leafletMapPane.querySelector(".leaflet-proxy");
                this.elements.leafletBaseImageLayer = this.elements.leafletOverlayPane.querySelector(".leaflet-image-layer");
                this.elements.leafletControlContainer = this.elements.leafletContainer.querySelector(".leaflet-control-container");
                this.elements.leafletControlContainerTopLeft= this.elements.leafletControlContainer.querySelector(".leaflet-top.leaflet-left");
                this.elements.leafletControlContainerTopRight= this.elements.leafletControlContainer.querySelector(".leaflet-top.leaflet-right");
                this.elements.leafletControlContainerBottomRight = this.elements.leafletControlContainer.querySelector(".leaflet-bottom.leaflet-right");
                this.elements.leafletControlContainerBottomLeft = this.elements.leafletControlContainer.querySelector(".leaflet-bottom.leaflet-left");

                // Leaflet control elements
                this.elements.editButton = this.elements.leafletControlContainer.querySelector(".interactive-maps__edit-control");
                this.elements.zoomButton = this.elements.leafletControlContainer.querySelector(".leaflet-control-zoom");
                this.elements.zoomInButton = this.elements.leafletControlContainer.querySelector(".leaflet-control-zoom-in");
                this.elements.zoomOutButton = this.elements.leafletControlContainer.querySelector(".leaflet-control-zoom-out");
                
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

                    this.initCursorDebug();

                    this.initMinimalLayout();

                    // Create fullscreen button
                    this.initFullscreen();
                    
                    // Create category groups
                    this.initCategoryGroups();

                    // Create search dropdown
                    this.initSearch();

                    // Create sidebar
                    this.initSidebar();

                    // Rearrange controls
                    this.initControls();

                    // Set up events for hover popups
                    this.initOpenPopupsOnHover();

                    // Set up tooltips
                    this.initTooltips();

                    // Set up canvas
                    //this.initThreadedCanvas();
                    //this.initCanvas();

                    // Set up collectibles
                    this.initCollectibles();
                }
                else
                {
                    // Changing the size of the leafet container causes it to be remade (and the fullscreen button control destroyed)
                    // Re-add the fullscreen button to the DOM
                    if (this.config.enableFullscreen == true && this.controlAssociations["fullscreen"].isPresent)
                        this.elements.leafletControlContainerBottomRight.prepend(this.elements.fullscreenControl);
                    
                    this.initControls();
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
                    if (this.search.lastSearch)
                        this.updateSearchList(this.search.lastSearch);
                    if (this.search.selectedMarker)
                        this.toggleMarkerHighlight(this.search.selectedMarker, true);
                }

                // Set initialized when we've done everything
                this.initialized = true;
                this.initializedOnce = true;

                this.toggleMarkerObserver(true);
                this.togglePopupObserver(true);

                this.leafletAttributeObserver.disconnect();
                this.leafletAttributeObserver.observe(this.elements.leafletContainer, { attributes: true });    
                this.leafletAttributeObserver.observe(this.elements.leafletMapPane, { attributes: true });    
                this.resizeObserver.observe(this.elements.leafletContainer);
                this.resizeObserver.observe(this.elements.mapModuleContainer);
                
                var associatedCount = this.markers.filter(function(x) { return x.markerElement; }).length;
                console.log(this.id + " (" + this.name + ") - Initialized, associated " + associatedCount + " of " + this.markers.length + " markers (using " + markerElements.length + " elements), isNew: " + isNew);

                // Invoke init event
                this.events.onMapInit.invoke({ map: this, isNew: isNew });
            },

            initMapEvents: function()
            {
                var mouseDownPos, mouseMoveStopTimer;
                
                // Is called on mousemove after mousedown, and for subsequent mousemove events until dragging more than 2px
                var onMouseMove = function(e)
                {
                    // Don't consider this a drag if shift was held on mouse down
                    if (this.isBoxZoomDragging) return;
                    
                    if (!this.isDragging)
                    {
                        // If the position of the move is 2px away from the mousedown position
                        if (Math.abs(e.pageX - this.mouseDownPos[0]) > 2 ||
                            Math.abs(e.pageY - this.mouseDownPos[1]) > 2)
                        {
                            log("Started drag at x: " + this.mouseDownPos[0] + ", y: " + this.mouseDownPos[1] + " (" + this.mouseDownMapPos + ")");
                            
                            // This is a drag
                            this.isDragging = true;
                            //this.elements.leafletContainer.removeEventListener("mousemove", onMouseMove);
                            this.events.onMapDragged.invoke({value: true});
                        }
                    }
                    else
                    {
                        // Determine whether we're resuming a drag
                        if (!this.isDraggingMove)
                        {
                            log("Resuming drag");
                            this.isDraggingMove = true;
                            this.events.onMapDraggedMove.invoke(true);
                        }
    
                        // Cancel the timeout which in 300ms will indicate we've paused dragging
                        clearTimeout(mouseMoveStopTimer);
                        mouseMoveStopTimer = setTimeout(function()
                        {
                            log("Pausing drag");
                            this.isDraggingMove = false;
                            this.events.onMapDraggedMove.invoke(false);
                        }.bind(this), 100);
                    }
                    
                }.bind(this);

                // Mouse down event on leaflet container
                // Set up an event to cache the element that was last clicked, regardless of if it's actually a associated marker or not
                this.elements.leafletContainer.addEventListener("mousedown", function(e)
                {
                    // Ignore right clicks
                    if (e.button == 2) return;

                    // Determine whether this is a box zoom
                    if (e.shiftKey) this.isBoxZoomDragging = true;

                    // Save the position of the event
                    this.mouseDownPos = [ e.pageX, e.pageY ];
                    this.mouseDownMapPos = [ e.offsetX, e.offsetY ];
                    this.pageToMapOffset = [ e.offsetX - e.pageX, e.offsetY - e.pageY ];

                    // Subscribe to the mousemove event so that the movement is tracked
                    this.elements.leafletContainer.addEventListener("mousemove", onMouseMove);
                    this._invalidateLastClickEvent = false;

                    // Traverse up the click element until we find the marker or hit the root of the map
                    // This is because markers may have sub-elements that may be the target of the click
                    var elem = e.target;
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

                // Mouse up event on <s>leaflet container</s> window
                // (mouseup won't trigger if the mouse is released outside the leaflet window)
                window.addEventListener("mouseup", function(e)
                {
                    // If the mouse was released on the map container or any item within it, the map was clicked
                    if (this.elements.leafletContainer.contains(e.target))
                    {
                        var isOnBackground = e.target == this.elements.leafletContainer || e.target == this.elements.leafletBaseImageLayer; 
                        
                        this.events.onMapClicked.invoke(
                        {
                            map: this, event: e,
                            
                            // Clicked on map background
                            isOnBackground: isOnBackground,
    
                            // Clicked on marker,
                            isMarker: this.lastMarkerHovered != undefined,
                            marker: this.lastMarkerHovered,
    
                            // Was the end of the drag
                            wasDragging: this.isDragging,
                        });

                        // Custom popups - If mousing up on the map background, not the end of a drag, and there is a popup showing
                        if (this.config.useCustomPopups == true && isOnBackground && !this.isDragging && this.lastPopupShown)
                        {
                            // Hide the last popup shown
                            this.lastPopupShown.hide();
                        }
                    }
                    
                    this.elements.leafletContainer.removeEventListener("mousemove", onMouseMove);

                    // If mousing up after dragging, regardless of if it ended within the window
                    if (this.isDragging == true)
                    {
                        this.mouseUpPos = [ e.pageX, e.pageY ];
                        this.mouseUpMapPos = [ e.pageX + this.pageToMapOffset[0], e.pageY + this.pageToMapOffset[1] ];
                        
                        log("Ended drag at x: " + e.pageX + ", y: " + e.pageY + " (" + this.mouseUpMapPos.toString() + ")");
                        
                        // No longer dragging
                        this.isDragging = false;
                        this.events.onMapDragged.invoke({value: false});

                        // Invalidate click event on whatever marker is hovered
                        if (this.lastMarkerHovered)
                            this._invalidateLastClickEvent = true;
                    }

                    // If mousing up after starting a box zoom, record this zoom as a box zoom
                    if (this.isBoxZoomDragging == true)
                    {
                        this.isBoxZoomDragging = false;
                        this.zoomType = "box";
                        this.zoomCenter = [ this.mouseUpMapPos[0] - this.mouseDownMapPos[0],
                                            this.mouseUpMapPos[1] - this.mouseDownMapPos[1] ];
                        this.zoomStartTransform = this.getElementTransformPos_css(this.elements.leafletBaseImageLayer);
                        this.zoomStartViewportPos = this.transformToViewportPosition(this.zoomStartTransform);
                        this.zoomStartSize = this.getElementSize(this.elements.leafletBaseImageLayer);
                    }
                    
                }.bind(this));

                /*
                this.elements.leafletContainer.addEventListener("mousemove", function(e)
                {
                    console.log("x: " + e.clientX + ", y: " + e.clientY);
                    console.log(this.clientToTransformPosition([e.clientX, e.clientY]).toString());
                    console.log(this.clientToScaledPosition([e.clientX, e.clientY]).toString());
                    console.log(this.clientToUnscaledPosition([e.clientX, e.clientY]).toString());

                }.bind(this));
                */
                
                // Remove non-navigating hrefs, which show a '#' in the navbar, and a link in the bottom-left
                this.elements.zoomInButton.removeAttribute("href");
                this.elements.zoomOutButton.removeAttribute("href");
                this.elements.zoomInButton.style.cursor = this.elements.zoomOutButton.style.cursor = "pointer";
                this.elements.zoomInButton.addEventListener("click", zoomButtonClick.bind(this));
                this.elements.zoomOutButton.addEventListener("click", zoomButtonClick.bind(this));
                function zoomButtonClick(e)
                {
                    this.zoomType = "button";
                    this.zoomCenter = [ this.elements.leafletContainer.clientWidth / 2, this.elements.leafletContainer.clientHeight / 2 ];
                    this.zoomStartTransform = this.getElementTransformPos_css(this.elements.leafletBaseImageLayer);
                    this.zoomStartViewportPos = this.transformToViewportPosition(this.zoomStartTransform);
                    this.zoomStartSize = this.getElementSize(this.elements.leafletBaseImageLayer);
                    e.preventDefault();
                };

                // Record zoom position when scroll wheel is used
                this.elements.leafletContainer.addEventListener("wheel", function(e)
                {
                    this.zoomType = "wheel";
                    this.zoomCenter = [ e.offsetX, e.offsetY ];
                    this.zoomStartTransform = this.getElementTransformPos_css(this.elements.leafletBaseImageLayer);
                    this.zoomStartViewportPos = this.transformToViewportPosition(this.zoomStartTransform);
                    this.zoomStartSize = this.getElementSize(this.elements.leafletBaseImageLayer);
                    
                }.bind(this));

                // Record key zoom when keyboard keys are used
                this.elements.leafletContainer.addEventListener("keydown", function(e)
                {
                    if (e.key == "-" || e.key == "=")
                    {
                        this.zoomType = "key";
                        this.zoomCenter = [ this.elements.leafletContainer.clientWidth / 2, this.elements.leafletContainer.clientHeight / 2 ];
                        this.zoomStartTransform = this.getElementTransformPos_css(this.elements.leafletBaseImageLayer);
                        this.zoomStartViewportPos = this.transformToViewportPosition(this.zoomStartTransform);
                        this.zoomStartSize = this.getElementSize(this.elements.leafletBaseImageLayer);
                    }
                }.bind(this));

                /*
                // Intercept wheel events to normalize zoom
                // This doesn't actually cancel the wheel event (since it cannot be cancelled)
                // but instead clicks the zoom buttons so that the wheel zoom doesn't occur
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
                    console.error(this.id + " (" + this.name + ") Tried to de-initialize map when it wasn't initialized");
                    return;
                }

                this.toggleMarkerObserver(false);
                this.togglePopupObserver(false);
                
                this.leafletAttributeObserver.disconnect();
                this.resizeObserver.disconnect();

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
                    return Promise.resolve(this.id + " (" + this.name + ") - The map was initialized immediately (took " + Math.round(performance.now() - this.creationTime) + "ms)");
                }
                
                return new Promise(function(resolve, reject)
                {
                    // Store resolve function (it will be called by selfObserver above)
                    this._waitForPresenceResolve = function()
                    {
                        resolve(this.id + " (" + this.name + ") - Successfully deferred until Leaflet fully initialized (took " + Math.round(performance.now() - this.creationTime) + "ms)");
                    };
                    
                    // Alternatively timeout after 10000ms
                    setTimeout(function(){ reject(this.id + " (" + this.name + ") - Timed out after 10 sec while waiting for the map to appear."); }.bind(this), 10000);
                }.bind(this));
            },

            createLoadingOverlay: function()
            {
                var placeholder = document.createElement("div");
                placeholder.innerHTML = "<div class=\"LoadingOverlay-module_overlay__UXv3B\"><div class=\"LoadingOverlay-module_container__ke-21\"><div class=\"fandom-spinner LoadingOverlay-module_spinner__Wl7dt\" style=\"width: 40px; height: 40px;\"><svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"><g transform=\"translate(20, 20)\"><circle fill=\"none\" stroke-width=\"2\" stroke-dasharray=\"119.38052083641213\" stroke-dashoffset=\"119.38052083641213\" stroke-linecap=\"round\" r=\"19\"><\/circle><\/g><\/svg><\/div><\/div><\/div>";
                return placeholder.firstElementChild;
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

            getMapLink: function(name, htmlElement)
            {
                name = name || this.name;
                
                if (htmlElement)
                {
                    var a = document.createElement(a);
                    a.href = "/wiki/" + encodeURIComponent(name);
                    a.textContent = "Map:" + name;
                    return a;
                }
                else
                    return "<a href=\"/wiki/Map:" + encodeURIComponent(name) + "\">Map:" + name + "</a>";
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

            /*
                Some notes about positions
                
                - An unscaled position is one which matches the JSON definition, relative
                to the original size of the map with the bounds applied.

                - A pixel position is one that matches the resolution of the map image,
                as defined by the JSON, but it won't always match the JSON definition
                specifically because it does not factor in shifted lower or upper bounds
                
                - A scaled position is the pixel position scaled up to the current map
                scale/zoom level. It is relative to the top left corner of the map image
                at the current zoom level. It is analogous to DOM position of a map element
                relative to the base image layer.

                - A transform position is the position that Leaflet objects use. It is
                relative to the leaflet-map-pane which gets translated when the user drags
                and scales the map. Transform marker positions only changes when the map is
                zoomed in and out. The transform position is in the same scale as the scaled
                position, but just shifted by the transform position of the base layer.

                Transform positions become invalid when the map is zoomed

                - A viewport position is a position relative to the map viewport (that is,
                the container that defines the size of the interactive map, and clips the
                content within). A position at 0, 0 is always the top left corner of the
                container. Viewport positions and transform positions are closely related.

            */

            // Gets the rect of any element
            getElementRect: function(elem)
            {
                return elem.getBoundingClientRect();
            },

            // Gets the rect position of any element, relative to the window
            getElementPos: function(elem)
            {
                var rect = elem.getBoundingClientRect();
                return [ rect.x, rect.y ];
            },

            // Gets the rect size of any element, relative to the window
            getElementSize: function(elem)
            {
                var rect = elem.getBoundingClientRect();
                return [ rect.width, rect.height ];
            },

            // Get the current position of the viewport
            getViewportPos: function()
            {
                return this.getElementPos(this.elements.leafletContainer);
            },

            // Get the current size of the viewport
            getViewportSize: function()
            {
                return [ this.elements.leafletContainer.clientWidth, this.elements.leafletContainer.clientHeight ];
            },

            // Scale a "unscaled" (JSON) position to current map size, returning the scaled position
            unscaledToScaledPosition: function(unscaledPos)
            {
                var scaledPos = [];
                var imageSize = this.getScaledMapImageSize();

                // Scale the position to the current size of the map, from the original coordinates, and round
                scaledPos[0] = Math.round(((unscaledPos[0] - this.bounds[0][0]) / this.size.width) * imageSize[0]);
                scaledPos[1] = Math.round(((unscaledPos[1] - this.bounds[0][1]) / this.size.height) * imageSize[1]);

                return scaledPos;
            },

            // Converts a scaled (zoomed) position at the current zoom level to an unscaled (JSON) position
            // This position is equivalent to the JSON positions (assuming the CORRECT origin of top-left)
            scaledToUnscaledPosition: function(scaledPos)
            {
                var unscaledPos = [];
                var imageSize = this.getScaledMapImageSize();

                unscaledPos[0] = (scaledPos[0] / imageSize[0]) * this.size.width + this.bounds[0][0];
                unscaledPos[1] = (scaledPos[1] / imageSize[1]) * this.size.height + this.bounds[0][1];

                return unscaledPos;
            },
                
            scaledToPixelPosition: function(scaledPos)
            {
                var pixelPos = [];
                var imageSize = this.getScaledMapImageSize();

                // Scale the position down to the original range
                pixelPos[0] = (scaledPos[0] / imageSize[0]) * this.size.width;
                pixelPos[1] = (scaledPos[1] / imageSize[1]) * this.size.height;

                return pixelPos;
            },

            pixelToScaledPosition: function(pixelPos)
            {
                var scaledPos = [];
                var imageSize = this.getScaledMapImageSize(true);

                // Scale the position back up to the scaled range
                scaledPos[0] = (pixelPos[0] / this.size.width) * imageSize[0];
                scaledPos[1] = (pixelPos[1] / this.size.width) * imageSize[0];
                
                return scaledPos;
            },

            // Converts a scaled position at the current zoom level to a position which is accurate to
            // transforms used in the Leaflet map. A transform position is typically identical, but is
            // shifted by the map pane offset
            scaledToTransformPosition: function(scaledPos)
            {
                // Get base layer transform position. This needs to be calculated on the fly as it will change as the user zooms
                var baseLayerPos = this.getElementTransformPos(this.elements.leafletBaseImageLayer);

                // Add the position of the base layer to the scaled position to get the transform position
                return [ scaledPos[0] + baseLayerPos[0],
                         scaledPos[1] + baseLayerPos[1] ];
            },

            // Converts a transform position to a scaled position which is accurate to the current zoom level
            transformToScaledPosition: function(transformPos)
            {
                // Get base layer transform position. This needs to be calculated on the fly as it will change as the user zooms
                var baseLayerPos = this.getElementTransformPos(this.elements.leafletBaseImageLayer);

                return [ transformPos[0] - baseLayerPos[0],
                         transformPos[1] - baseLayerPos[1] ];
            },

            // Converts a viewport position to a transform position that is relative to the map pane
            viewportToTransformPosition: function(viewportPos)
            {
                // The transform position is simply the passed viewport position, minus the map pane viewport position (or transform position, they are identical in its case)
                var mapPaneViewportPos = this.getElemMapViewportPos(this.elements.leafletMapPane);

                return [ viewportPos[0] - mapPaneViewportPos[0],
                         viewportPos[1] - mapPaneViewportPos[1] ];
            },

            // Converts a transform position relative to the map pane to a viewport pos
            transformToViewportPosition: function(transformPos)
            {
                // The transform position is simply the passed viewport position, minus the map pane viewport position (or transform position, they are identical in its case)
                var mapPaneViewportPos = this.getElemMapViewportPos(this.elements.leafletMapPane);

                return [ transformPos[0] + mapPaneViewportPos[0],
                         transformPos[1] + mapPaneViewportPos[1] ];
            },

            // Converts a client position to a transform position on the map, relative to the map pane
            // A client position is one relative to the document viewport, not the document itself
            // getBoundingClientRect also returns client positions
            clientToTransformPosition: function(mousePos)
            {
                /*
                // mousePos is [ e.clientX, e.clientY ]
                var viewportRect = this.getElementRect(this.elements.leafletContainer);
                var mapPaneRect = this.getElementRect(this.elements.leafletMapPane);

                // Get the mouse position relative to the viewport
                var mouseViewportPos = [ mousePos[0] - viewportRect.x, mousePos[1] - viewportRect.y ];

                // Get the map pane position relative to the viewport
                var mapPaneViewportPos = [ mapPaneRect.x - viewportRect.x , mapPaneRect.y - viewportRect.y ];
                //var mapPaneViewportPos = this.getElementTransformPos(this.elements.leafletMapPane);

                var mouseTransformPos = [ mouseViewportPos[0] - mapPaneViewportPos[0],
                                          mouseViewportPos[1] - mapPaneViewportPos[1] ];
                */

                // The transform is just the offset from the mapPane's position
                var mapPaneRect = this.getElementRect(this.elements.leafletMapPane);
                return [ mousePos[0] - mapPaneRect.x, mousePos[1] - mapPaneRect.y ];
            },

            clientToUnscaledPosition: function(mousePos)
            {
                var scaledPos = this.clientToScaledPosition(mousePos);
                return this.scaledToUnscaledPosition(scaledPos);
            },

            clientToScaledPosition: function(mousePos)
            {
                // The transform is just the offset from the mapPane's position
                var baseImageRect = this.getElementRect(this.elements.leafletBaseImageLayer);
                return [ mousePos[0] - baseImageRect.x, mousePos[1] - baseImageRect.y ];
            },

            // Gets the position of an element relative to the map image
            // Keep in mind this is the top-left of the rect, not the center, so it will not be accurate to marker positions if used with the marker element
            // You can pass true to centered to add half of the element's width and height to the output position
            getElemMapScaledPos: function(elem, centered)
            {
                var baseRect = this.elements.leafletBaseImageLayer.getBoundingClientRect();
                var elemRect = elem.getBoundingClientRect();

                var pos = [ elemRect.x - baseRect.x, elemRect.y - baseRect.y ];
                if (centered == true)
                {
                    pos[0] += elemRect.width / 2;
                    pos[1] += elemRect.height / 2;
                }

                return pos;
                /*
                // Get base layer transform position. This needs to be calculated on the fly as it will change as the user zooms
                var baseLayerPos = this.getElementTransformPos(this.map.elements.leafletBaseImageLayer);

                // Subtract the current position of the map overlay from the marker position to get the scaled position
                var pos = this.map.getElementTransformPos(elem);
                pos[0] -= baseLayerPos[0];
                pos[1] -= baseLayerPos[1];
                */
            },

            // Get the position of an element relative to the map viewport
            // Like with getElemMapScaledPos, this is the top left-of the rect, not the center
            getElemMapViewportPos: function(elem, centered)
            {
                var viewRect = this.elements.leafletContainer.getBoundingClientRect();
                var elemRect = elem.getBoundingClientRect();

                var pos = [ elemRect.x - viewRect.x , elemRect.y - viewRect.y ];
                if (centered == true)
                {
                    pos[0] += elemRect.width / 2;
                    pos[1] += elemRect.height / 2;
                }

                return pos;
            },

            // Get the transform position of the element relative to the map pane
            getElemMapTransformPos: function(elem, centered)
            {
                var scaledPos = this.getElemMapScaledPos(elem, centered);
                return this.scaledToTransformPosition(scaledPos);
            },

            getElementTransformPos_css: function(element)
            {
                var values = element.style.transform.split(/\w+\(|\);?/);
                if (!values[1] || !values[1].length) return {};
                values = values[1].split(/,\s?/g);

                return [ parseInt(values[0], 10), parseInt(values[1], 10), parseInt(values[2], 10) ];
            },

            // Get the existing transform:translate XY position from an element
            getElementTransformPos: function(element, accurate)
            {
                // Throw error if the passed element is not in fact an element
                if (!(element instanceof Element))
                {
                    console.error("getElementTransformPos expects an Element but got the following value: " + element.toString());
                    return [0, 0];
                }

                // This is the more programatic way to get the position, calculating it 
                if (accurate && this.elements.leafletMapPane.contains(element))
                {
                    /*
                    // The same as below, but using JQuery
                    var pos = $(element).position();
                    console.log("jQuery.position took " + (performance.now() - t));
                    return [ pos.left, pos.top ];
                    */
                    
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

            getElementTransformScale: function(element, css)
            {
                // Throw error if the passed element is not in fact an element
                if (!(element instanceof Element))
                {
                    console.error("getElementTransformScale expects an Element but got the following value: " + element.toString());
                    return [0, 0];
                }

                // CSS scale
                if (css)
                {   
                    /*
                    // Computed style - It may not be valid if the scale style was added this frame
                    var style = window.getComputedStyle(element);

                    // Calculate the scale factor using the transform matrix
                    var matrix = new DOMMatrixReadOnly(style.transform);
                    return [ Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
                             Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d) ]

                    /*
                    // Get the transform property value
                    var transformValue = style.getPropertyValue("transform");
                    
                    // Extract the scale value from the transform property
                    var match = transformValue.match(/scale\(([^\)]+)\)/);
                    var scaleValue = match ? match[1] : "1";

                    return scaleValue;
                    */

                    var match = element.style.transform.match(/scale\(([^\)]+)\)/);
                    return match ? parseFloat(match[1]) : 1;
                }

                // Actual scale
                else
                {
                    var rect = element.getBoundingClientRect();
                    return [ rect.width / element.offsetWidth, rect.height / element.offsetHeight ];
                }
            },

            getElementSize: function(element)
            {
                var rect = element.getBoundingClientRect();
                return [ rect.width, rect.height ];
            },

            // Get the current background image size at the current zoom level
            getScaledMapImageSize: function(live)
            {
                /*
                // Return the cached size if we have one and it doesn't need to be updated
                if (!this._isScaledMapImageSizeDirty && this.scaledMapImageSize && !live)
                    return this.scaledMapImageSize;
                */
                
                // If we need a live-updating value, use an expensive calculation to get it
                if (live)
                {
                    var rect = this.elements.leafletBaseImageLayer.getBoundingClientRect();
                    var size = [ rect.width, rect.height ];
                }
                else
                {
                    var size = [ this.elements.leafletBaseImageLayer.width, this.elements.leafletBaseImageLayer.height ];
    
                    // If the map was just shown, the base image layer may not have a width and height
                    // However, the style will always be correct, so we can fetch the size from that instead (at a minor performance penalty)
                    if (size[0] == 0 && size[1] == 0)
                    {
                        size[0] = parseFloat(this.elements.leafletBaseImageLayer.style.width);
                        size[1] = parseFloat(this.elements.leafletBaseImageLayer.style.height);
                    }
                }

                this._isScaledMapImageSizeDirty = false;
                this.scaledMapImageSize = size;
                return size;
            },

            initCursorDebug: function()
            {
                return;
                if (isDebug)
                {
                    var cursorDebug = document.createElement("div");
                    cursorDebug.className = "mapsExtended_cursorDebug";
                    cursorDebug.style.cssText = "position: absolute; top: 0; right: 0; z-index: 1; padding: 0.1em; background-color: var(--theme-page-background-color);  color: var(--theme-body-text-color); font-family: monospace; text-align: right; line-height: 1.2em; white-space: pre"
                    this.elements.mapModuleContainer.append(cursorDebug);

                    var updateText = function(e)
                    {
                        if (e instanceof Event)
                            cursorPos = [ e.clientX, e.clientY ];
                        else
                            cursorPos = e;
                        
                        var transformPos = this.clientToTransformPosition(cursorPos);
                        var scaledPos = this.clientToScaledPosition(cursorPos);
                        var unscaledPos = this.clientToUnscaledPosition(cursorPos);

                        var str = "Transform pos: " + Math.round(transformPos[0]) + ", " + Math.round(transformPos[1]);
                        str += "\r\nScaled (pixel) pos: " + Math.round(scaledPos[0]) + ", " + Math.round(scaledPos[1]);
                        str += "\r\nUnscaled (JSON) pos: " + Math.round(unscaledPos[0]) + ", " + Math.round(unscaledPos[1]);

                        if (points.length > 0)
                        {
                            str += "\r\nCtrl+Click to add to list";
                            str += "\r\n" + points.map(function(p){ return "[" + Math.round(p[0]) + ", " + Math.round(p[1]) + "]"; }).join("\r\n");
                            str += "\r\nClick here to finish and copy";
                        }
                        else
                            str += "\r\nCtrl+Click to start list";
                        cursorDebug.textContent = str;
                        
                    }.bind(this);

                    var points = [];

                    this.elements.leafletContainer.addEventListener("click", function(e)
                    {
                        if (!e.ctrlKey) return;
                        var cursorPos = [ e.clientX, e.clientY ];
                        var unscaledPos = this.clientToUnscaledPosition(cursorPos);
                        points.push(unscaledPos);
                        updateText(cursorPos);
                        
                    }.bind(this));

                    cursorDebug.addEventListener("click", function(e)
                    {
                        if (points.length > 0)
                        {
                            navigator.clipboard.writeText("[ " + points.map(function(p){ return "[" + Math.round(p[0]) + ", " + Math.round(p[1]) + "]"; }).join(", ") + " ]");
                            points = [];
                        }
                    });

                    this.elements.leafletContainer.addEventListener("mousemove", updateText.bind(this));
                }
            },

            initMinimalLayout: function()
            {
                if (this.config["minimalLayout"] == true)
                {
                    this.isMinimalLayout = true;
                    this.elements.interactiveMapsContainer.style.padding = "0";
                    this.elements.rootElement.classList.add("mapsExtended_minimalLayout");
                    this.elements.mapModuleContainer.prepend(this.elements.filtersList);
                }
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
                marker.markerElement.style.zIndex = (marker.order + this.markers.length).toString();
                
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
                    tooltipElement.style.marginTop = (marker.height * 0.5) + "px";
                else if (marker.iconAnchor.startsWith("bottom"))
                    tooltipElement.style.marginTop = (marker.height * -0.5) + "px";
                else
                    tooltipElement.style.marginTop = "";

                if (marker.iconAnchor.endsWith("left"))
                    tooltipElement.style.marginLeft = (marker.width * 0.5) + (isShownOnLeftSide ? -6 : 6) + "px"; // (50% of icon width) + 6 (tooltip tip on left) or - 6 (tooltip tip on right)
                else if (marker.iconAnchor.endsWith("right"))
                    tooltipElement.style.marginLeft = (marker.width * -0.5) + (isShownOnLeftSide ? -6 : 6) + "px";
                else
                    tooltipElement.style.marginLeft = "";
                
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
                    marker.markerElement.style.zIndex = marker.order.toString();
                
                this.elements.tooltipElement.remove();
                this.tooltipMarker = undefined;
            },

            // Main thread canvas

            initCanvas: function()
            {
                // Performance options

                // The amount of pixels each side of the viewport to draw, in order to prevent constant redrawing when the 
                var CANVAS_EDGE_BUFFER = 200;

                // Don't continue if there are no paths
                if (!this.config.paths || this.config.paths.length == 0)
                    return;

                // Set the canvas width and height to be the size of the container, so that we're always drawing at the optimal resolution
                // We can't set it to the scaled size of the map image because at high zoom levels the max pixel count will be exceeded
                var leafletContainerSize = this.getElementSize(this.elements.leafletContainer);

                // Create a pane to contain all the ruler points
                var canvasPane = document.createElement("div");
                canvasPane.className = "leaflet-pane leaflet-canvas-pane";
                this.elements.leafletCanvasPane = canvasPane;
                this.elements.leafletTooltipPane.after(canvasPane);
                
                var canvas = document.createElement("canvas");
                //canvas.className = "leaflet-zoom-animated";
                canvas.style.pointerEvents = "none";
                //canvas.style.willChange = "transform";
                canvas.width = leafletContainerSize[0];
                canvas.height = leafletContainerSize[1];
                this.elements.leafletCanvasPane.appendChild(canvas);

                //var offscreenCanvas = new OffscreenCanvas(leafletContainerSize[0], leafletContainerSize[1]);
                //var ctx = offscreenCanvas.getContext("2d");
                var ctx = canvas.getContext("2d");

                var points = [];
                var iconIndexes = [];
                var icons = [];
                var initialized = false;

                function pointsToBSpline(points)
                {
                    var ax, ay, bx, by, cx, cy, dx, dy;

                    // Add last two points to the start of the array
                    points.unshift(points[points.length - 2], points[points.length - 1]);

                    // Add first two points to the end of the array
                    points.push(points[2], points[3]);

                    var splinePoints = [];

                    for (var t = 0; t < 1; t += 0.1)
                    {
                        ax = (-points[0].x + 3 * points[1].x - 3 * points[2].x + points[3].x) / 6;
                        ay = (-points[0].y + 3 * points[1].y - 3 * points[2].y + points[3].y) / 6;
                        bx = (points[0].x - 2 * points[1].x + points[2].x) / 2;
                        by = (points[0].y - 2 * points[1].y + points[2].y) / 2;
                        cx = (-points[0].x + points[2].x) / 2;
                        cy = (-points[0].y + points[2].y) / 2;
                        dx = (points[0].x + 4 * points[1].x + points[2].x) / 6;
                        dy = (points[0].y + 4 * points[1].y + points[2].y) / 6;

                        splinePoints.push([ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx,
                                           ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy]);
                    }

                    return splinePoints;
                }

                // https://observablehq.com/@pamacha/chaikins-algorithm
                function chaikin(arr, num)
                {
                    if (num === 0) return arr;

                    var l = arr.length;
                    var smooth = arr.map(function(c,i)
                    {
                        return[[0.75*c[0] + 0.25*arr[(i + 1)%l][0],0.75*c[1] + 0.25*arr[(i + 1)%l][1]],
                               [0.25*c[0] + 0.75*arr[(i + 1)%l][0],0.25*c[1] + 0.75*arr[(i + 1)%l][1]]];
                    }).flat();
                    return num === 1 ? smooth : chaikin(smooth, num - 1);
                }

                // Given a source style, remove properties from a target style that are the same as those on the source
                // This allows us to avoid unnecessarily setting properties to the same value 
                function removeDuplicateStyleProps(target, source)
                {
                    for (var key in target)
                    {
                        if (Object.hasOwn(target, key) && Object.hasOwn(source, key) && target[key] == source[key])
                            delete target[key];
                    }
                }

                for (var i = 0; i < this.categories.length; i++)
                {
                    if (this.categories[i].icon && !icons.includes(this.categories[i].icon))
                        icons.push(this.categories[i].icon);
                }
                
                for (var i = 0; i < 1000; i++)
                {
                    points.push({x: Math.floor(Math.random() * this.size.width), y: Math.floor(Math.random() * this.size.height)});
                    iconIndexes.push(Math.floor(Math.random() * (icons.length - 0) + 0));
                }

                // Create blobs from HTMImageElements
                Promise.resolve()
                .then(function(blobs)
                {
                    return Promise.all(icons.map(function(icon, index)
                    {
                        return createImageBitmap(icon.img, { resizeWidth: icon.scaledWidth, resizeHeight: icon.scaledHeight, resizeQuality: "high" });
                    }));
                })
                .then(function(bitmaps)
                {
                    for (var i = 0; i < bitmaps.length; i++)
                    {
                        var icon = icons[i];
                        icon.bitmap = bitmaps[i];
                    }
                })
                .finally(function()
                {
                    initialized = true;
                });

                var stylesLookup = new Map();
                var pathsByStyle = [];

                // Process styles, performing some error checking and creating a lookup table
                for (var i = 0; i < this.config.styles.length; i++)
                {
                    var s = this.config.styles[i];
                    var error = false;

                    if (!s.id)
                    {
                        console.error("Path style at index " + index + " does not contain an id!");
                        error = true;
                    }
                    
                    if (stylesLookup.has(s.id))
                    {
                        console.error("Path style at index " + index + " has an ID that is used by another style");
                        error = true;
                    }

                    // Remove this style from config
                    if (error)
                    {
                        this.config.styles.splice(i, 1);
                        i--;
                        continue;
                    }

                    // Add this style to the lookup
                    else
                    {
                        stylesLookup.set(s.id, s);

                        if (this.config.canvasRenderOrderMode == "auto")
                            pathsByStyle.push({ id: s.id, style: s, paths: [], pathsWithOverrides: [] });
                    }
                }

                // Process paths, adding them to pathsByStyle
                for (var i = 0; i < this.config.paths.length; i++)
                {
                    var path = this.config.paths[i];

                    // Ensure ID uniqueness
                    if (!path.id || this.config.paths.some(function(p){ return p.id == path.id && p != path; }))
                    {
                        path.id = generateRandomString(8);
                        console.error("Path at the index " + i + " does not have a unique ID! Forced its ID to " + path.id);
                    }

                    var hasInheritedStyle = stylesLookup.has(path.styleId);
                    var hasOverrideStyle = path.style != undefined && typeof path.style == "object";
                    var styleGroup = null;

                    // Ensure that the styleId matches a style in pathStyles
                    if (!hasInheritedStyle && path.styleId != undefined)
                    {
                        console.error("Path " + path.id + " uses an ID of \"" + path.styleId + "\" that was not found in the styles array!");
                        delete path.styleId;
                    }

                    // Catch any paths that don't define a style at all
                    if (!hasInheritedStyle && !hasOverrideStyle)
                    {
                        console.error("Path " + path.id + " must contain either a styleId or should define its own style");
                        this.config.paths.splice(i, 1);
                        i--;
                        continue;
                    }

                    if (hasInheritedStyle && hasOverrideStyle)
                    {
                        removeDuplicateStyleProps(path.overrideStyle, stylesLookup.get(path.styleId));
                    }

                    // This is the final style that the path will use
                    var style = hasInheritedStyle && hasOverrideStyle ? jQuery.extend(true, {}, stylesLookup.get(path.styleId), path.overrideStyle) :
                                hasInheritedStyle && !hasOverrideStyle ? stylesLookup.get(path.styleId) :
                                !hasInheritedStyle && hasOverrideStyle ? path.style :
                                !hasInheritedStyle && !hasOverrideStyle ? null : null;
                    path.style = style;

                    if (path.pointsType == "coordinate")
                    {
                        path.position = path.points;
                        delete path.points;
                        delete path.pointsType;
                        delete path.pointsDepth;
                    }

                    // Smooth the vertices in this path
                    if (style.smoothing == true)
                    {
                        for (var p = 0; p < path.pointsFlat.length; p++)
                        {
                            if (path.pointsFlat[p].length * Math.pow(2, style.smoothingIterations) > 250000)
                                console.error("Path " + path.id + " at index " + i + " with " + style.smoothingIterations + " Chaikin iterations will not be smoothed as the number of points would exceed 250,000");
                            else
                                path.pointsFlat[p] = chaikin(path.pointsFlat[p], style.smoothingIterations);
                        }
                    }

                    // Paths are grouped by style, and drawn in the order of the styles array
                    if (this.config.canvasRenderOrderMode == "auto")
                    {
                        if (hasInheritedStyle)
                        {
                            // Get the style (group) it references
                            styleGroup = pathsByStyle.find(function(v) { return v.id == path.styleId; });

                            // If the path has overrides, add it to pathsWithOverrides
                            if (hasOverrideStyle)
                                styleGroup.pathsWithOverrides.push(path);

                            // Otherwise just add it to paths
                            else
                                styleGroup.paths.push(path);
                        }
                        else
                        {
                            // Create a new styleGroup that contains just this path and its unique style
                            styleGroup = { id: "_path_" + path.id + "_style_", style: path.style, paths: [ path ]};

                            // Insert a new styleGroup after the group of the last path (this is not always the end of the pathsByStyle array)
                            var lastStyleGroupIndex = i == 0 ? 0 : pathsByStyle.indexOf(this.config.paths[i - 1].styleGroup) + 1;
                            pathsByStyle.splice(lastStyleGroupIndex, 0, styleGroup);
                        }
                    }

                    // Paths are drawn in the same order of the paths array, just lump together adjacent paths with the same style
                    else if (this.config.canvasRenderOrderMode == "manual")
                    {
                        // If the last styleGroup uses the same style as this path, add this path to that group
                        if (hasInheritedStyle && i > 0 && this.paths[i - 1].styleGroup.id == path.styleId)
                        {
                            styleGroup = this.paths[i - 1].styleGroup;

                            // If the path has overrides, add it to pathsWithOverrides
                            if (hasOverrideStyle)
                                styleGroup.pathsWithOverrides.push(path);

                            // Otherwise just add it to paths
                            else
                                styleGroup.paths.push(path);
                        }
                        else
                        {
                            // Otherwise just create a whole new styleGroup
                            styleGroup = { id: "_path_" + path.id + "_style_", style: style, paths: [ path ]};
                        }
                    }

                    path.styleGroup = styleGroup;
                }

                this.pathsByStyle = pathsByStyle;

                function applyStyleToCanvas(ctx, style)
                {
                    if (style.fill == true)
                    {
                        if (style.fillColor != undefined)   ctx.fillStyle = style.fillColor;
                    }

                    if (style.stroke == true)
                    {
                        if (style.strokeWidth != undefined) ctx.lineWidth = style.strokeWidth;
                        if (style.strokeColor != undefined) ctx.strokeStyle = style.strokeColor;
                        if (style.lineCap != undefined)     ctx.lineCap = style.lineCap;
                        if (style.lineJoin != undefined)    ctx.lineJoin = style.lineJoin;
                        if (style.miterLimit != undefined)  ctx.miterLimit = style.miterLimit;
                        if (style.lineDashArray != undefined)
                        {
                            if (style.lineDashOffset != undefined) ctx.lineDashOffset = style.lineDashOffset;
                            ctx.setLineDash(style.lineDashArray);
                        }
                    }

                    if (style.shadowColor != undefined)     ctx.shadowColor = style.shadowColor;
                    if (style.shadowBlur != undefined)      ctx.shadowBlur = style.shadowBlur;
                    if (style.shadowOffset != undefined)
                    {
                        ctx.shadowOffsetX = style.shadowOffset[0];
                        ctx.shadowOffsetY = style.shadowOffset[1];
                    }
                }

                function drawPath(ctx, path)
                {
                    switch (path.type)
                    {
                        case "polygon":
                        {
                            switch (path.pointsType)
                            {
                                case "single":
                                    drawPolygon(ctx, path.points);
                                    break;
                                case "singleWithHoles":
                                    drawSinglePolygonWithHoles(ctx, path.points);
                                    break;
                                case "multiple":
                                    drawMultiplePolygonsWithHoles(ctx, path.points);
                                    break;
                            }
                            
                            break;
                        }
                        case "polyline":
                        {
                            switch (path.pointsType)
                            {
                                case "single":
                                    drawPolyline(ctx, path.points);
                                    break;
                                case "multiple":
                                    drawMultiplePolylines(ctx, path.points);
                                    break;
                            }
                            break;
                        }
                        case "circle":
                        {
                            if (path.pointsType == "single")
                                drawCircles(ctx, path.points, path.radius);
                            else
                                drawCircle(ctx, path.position, path.radius);
                            break;
                        }
                        case "ellipse":
                        {
                            drawEllipse(ctx, path.position, path.radiusX, path.radiusY, path.rotation);
                            break;
                        }
                        case "rectangle":
                        {
                            drawRectangle(ctx, path.position, path.width, path.height);
                            break;
                        }
                        case "rounded_rectangle":
                        {
                            drawRoundedRectangle(ctx, path.position, path.width, path.radii);
                            break;
                        }
                    }

                    if (path.type != "polyline")
                    {
                        if (path.style.fill == true)
                            ctx.fill(path.style.fillRule);
                    }
                    
                    if (path.style.stroke == true)
                        ctx.stroke();
                }

                // Draw with just the moveTo and lineTo, no beginPath or closePath
                function drawPoints(ctx, points)
                {
                    ctx.moveTo(points[0][0], points[0][1]);
                    for (p = 1; p < points.length; p++)
                        ctx.lineTo(points[p][0], points[p][1]);
                }

                function drawPolyline(ctx, points)
                {
                    ctx.beginPath();
                    drawPoints(ctx, points);
                }

                function drawMultiplePolylines(ctx, points)
                {
                    ctx.beginPath();
                    for (mp = 0; mp < points.length; mp++)
                        drawPoints(ctx, points[mp]);
                }

                // Draw a single polygon, without holes
                function drawPolygon(ctx, points)
                {
                    ctx.beginPath();
                    drawPoints(ctx, points);
                    ctx.closePath();
                }

                function drawSinglePolygonWithHoles(ctx, points)
                {
                    ctx.beginPath();
                    for (sp = 0; sp < points.length; sp++)
                    {
                        drawPoints(ctx, points[sp]);
                        ctx.closePath();
                    }
                }

                function drawMultiplePolygonsWithHoles(ctx, points)
                {
                    for (mp = 0; mp < points.length; mp++)
                        drawSinglePolygonWithHoles(ctx, points[mp]);
                }

                function drawCircle(ctx, position, radius)
                {
                    ctx.beginPath();
                    ctx.arc(position[0], position[1], radius, 0, Math.PI * 2);
                }

                function drawCircles(ctx, points, radius)
                {
                    ctx.beginPath();
                    for (p = 0; p < points.length; p++)
                    {
                        ctx.moveTo(points[p][0], points[p][1]);
                        ctx.arc(points[p][0], points[p][1], radius, 0, Math.PI * 2);
                    }
                }

                function drawEllipse(ctx, position, radiusX, radiusY, rotation)
                {
                    ctx.beginPath();
                    ctx.ellipse(position[0], position[1], radiusX, radiusY, rotation, 0, Math.PI * 2);
                }

                function drawRectangle(ctx, position, width, height)
                {
                    ctx.beginPath();
                    ctx.rect(position[0], position[1], width, height);
                }

                function drawRoundedRectangle(ctx, position, width, height, radii)
                {
                    ctx.beginPath();
                    ctx.roundRect(position[0], position[1], width, height, radii);
                }

                var offset = [0,0], lastOffset = [NaN,NaN];
                var ratio, lastRatio, mapPanePos, baseImagePos, baseImageLayerSize;
                var i, j, p, mp, sp, path;

                var render = function()
                {
                    var start = performance.now();
                    
                    // Reset the transform matrix so we're not applying it additively
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    //ctx.reset();
                    //ctx.setTransform(ratio, 0, 0, ratio, offset[0], offset[1]);
                    
                    // Clear the new buffer,
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    // Translate so that we start drawing the map in the top left of the base image canvas
                    ctx.translate(offset[0], offset[1]);

                    // Commented out, for some reason scaling the coordinate system will make images blurry
                    // even if the ratio is factored out of the scale. This does mean we have to manually scale
                    // up and down the coordinates, but it's a good trade-off if it means crispy images
                    ctx.scale(ratio, ratio);

                    /*
                    for (var i = 0; i < points.length; i++)
                    {
                        var icon = icons[iconIndexes[i]];

                        // Scale the points so they operate at the current scale
                        // Round the pixels so that we're drawing across whole pixels (and not fractional pixels)
                        var x = Math.round(points[i].x * ratio) - Math.round(icon.scaledWidth / 2);
                        var y = Math.round(points[i].y * ratio) - Math.round(icon.scaledWidth / 2);
                        var width = icon.scaledWidth;
                        var height = icon.scaledHeight;
                        ctx.drawImage(icon.bitmap, x, y, width, height);
                    }
                    
                    for (var i = 0; i < points.length; i++)
                    {
                        var icon = icons[iconIndexes[i]];

                        // Scale the points so they operate at the current scale
                        // Round the pixels so that we're drawing across whole pixels (and not fractional pixels)
                        ctx.drawImage(icon.bitmap, Math.round(points[i].x - (icon.scaledWidth / ratio / 2)),
                                                   Math.round(points[i].y - (icon.scaledHeight / ratio / 2)),
                                                   Math.round(icon.scaledWidth / ratio),
                                                   Math.round(icon.scaledHeight / ratio));
                    }
                    */

                    for (i = 0; i < this.pathsByStyle.length; i++)
                    {
                        currentStyle = this.pathsByStyle[i].style;
                        
                        // Apply the style to the context
                        applyStyleToCanvas(ctx, this.pathsByStyle[i].style);

                        // Draw all the shapes
                        for (j = 0; j < this.pathsByStyle[i].paths.length; j++)
                        {
                            drawPath(ctx, this.pathsByStyle[i].paths[j]);
                        }

                        // Draw all the overrides
                        for (j = 0; j < this.pathsByStyle[i].pathsWithOverrides.length; j++)
                        {
                            applyStyleToCanvas(ctx, this.pathsByStyle[i].pathsWithOverrides[j].style);
                            drawPath(ctx, this.pathsByStyle[i].pathsWithOverrides[j]);
                        }
                    }

                    for (var i = 0; i < points.length; i++)
                    {
                        continue;
                        ctx.beginPath();
                        ctx.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }

                    // Write offscreen canvas to onscreen canvas
                    //rctx.clearRect(0, 0, rctx.canvas.width, rctx.canvas.height);
                    //rctx.drawImage(offscreenCanvas, 0, 0);

                    log("Rendered canvas in " + Math.round(performance.now() - start) + "ms");

                }.bind(this);

                var renderId, lastRequestTime, continuousRenderEnabled;

                var updateCanvas = function()
                {
                    // Negate the map-pane transformation so the canvas stays in the same place (over the leaflet canvas)
                    mapPanePos = this.getElementTransformPos(this.elements.leafletMapPane);
                    canvas.style.transform = "translate(" + Math.round(-mapPanePos[0]) + "px, " + Math.round(-mapPanePos[1]) + "px)";

                    // Calculate a transform offset so that we start drawing the map in the top left of the base image canvas
                    baseImagePos = this.getElementTransformPos(this.elements.leafletBaseImageLayer, true);
                    offset = [ mapPanePos[0] + baseImagePos[0], mapPanePos[1] + baseImagePos[1] ];

                    // This ratio is a multiplier to the coordinate system so that coordinates are scaled down to the scale of the canvas
                    // allowing us to use pixel coordinates and have them translate correctly (this does mean that sizes also scale
                    // we can negate this by dividing sizes by the ratio)
                    baseImageLayerSize = this.getElementSize(this.elements.leafletBaseImageLayer);
                    ratio = Math.min(baseImageLayerSize[0] / this.size.width, baseImageLayerSize[1] / this.size.height);
                
                }.bind(this);

                var renderOnce = function(dontUpdate)
                {
                    if (!dontUpdate) updateCanvas();
                        
                    // Don't render if the offset or ratio didn't actually change
                    if (ratio == lastRatio && offset[0] == lastOffset[0] && offset[1] == lastOffset[1])
                    {
                        console.log("Skipping render");
                    }
                    else
                    {
                        lastOffset = offset;
                        lastRatio = ratio;
                        render();
                    }
                    
                }.bind(this);

                var renderLoop = function(time)
                {
                    if (lastRequestTime < time)
                    {
                        renderOnce();
                    }

                    lastRequestTime = time;

                    // Queue next render
                    if (continuousRenderEnabled == true)
                        renderId = requestAnimationFrame(renderLoop);
                    
                }.bind(this);

                // This function should be called when we want continuous render to be turned on or off
                // If does not actually toggle continuous render, it just updates the state depending on whether
                // the map is currently being dragged, panned, or is zooming
                var triggerContinuousRender = function()
                {
                    var enabled = (this.isDragging && this.isDraggingMove) || this.isPanning || this.isZooming;
                    if (this.isZoomingStatic) enabled = false;
                    
                    if (continuousRenderEnabled != enabled)
                    {
                        log("Toggled continuous rendering " + (enabled ? "on" : "off"));
                        continuousRenderEnabled = enabled;
                        //canvas.classList.remove("leaflet-zoom-animation");

                        // Request render for next frame
                        cancelAnimationFrame(renderId);
                        requestAnimationFrame(renderLoop);
                    }
                }.bind(this);

                // Instead of redrawing the canvas for every frame of the zoom
                // Scale it using a CSS transform and transition,
                // then render a single frame and scale back to the original
                this.events.onMapZoomed.subscribe(function(args)
                {
                    // If we're dragging or panning while a zoom is initiated, do a continuous render instead of a CSS scale
                    if (((this.isDragging && this.isDraggingMove) || this.isPanning) && this.isZoomingStatic == false)
                    {
                        // Ensure we're no longer performing CSS scale
                        canvas.classList.remove("leaflet-zoom-animated");
                        
                        triggerContinuousRender();
                        return;
                    }

                    this.isZoomingStatic = args.value;
                    triggerContinuousRender();
                    
                    // Perform a CSS scale animation
                    if (args.value == true)
                    {
                        cancelAnimationFrame(renderId);

                        this.zoomEndTransform = this.getElementTransformPos_css(this.elements.leafletBaseImageLayer);
                        this.zoomEndViewportPos = this.transformToViewportPosition(this.zoomEndTransform);
                        this.zoomEndSize = [ this.zoomStartSize[0] * args.scaleDelta, this.zoomStartSize[1] * args.scaleDelta ];

                        this.zoomScaleDelta = args.scaleDelta;
                        this.zoomScale = args.scale;
                        
                        // Typically the center of the zoom will be
                        // - the center of the screen (if button or key zooming),
                        // - the mouse position (if wheel zooming)
                        // - the center of the drawn box (if box zooming)
                        // However, Leaflet modifies the origin such that a zoom out does not result in the map having to be moved back
                        // Reverse engineering the methods by which leaflet calculates this is too difficult, but since we already have
                        // the before and after rects, we can just use that to determine a "center of enlargement", which will either be
                        // the center of zoom above, or a clamped/modified origin
                        
                        // Determine the center of enlargement by:
                        // - Drawing a line between the top left corner of the baseImageLayer pre-transform, to the top left corner post-transform
                        // - Drawing another line between the top right corner pre-transform, to the top right post-transform
                        // - Calculating the intersection between those lines
                        var zoomStartTopRight = [ this.zoomStartViewportPos[0] + this.zoomStartSize[0], this.zoomStartViewportPos[1] ];
                        var zoomEndTopRight = [ this.zoomEndViewportPos[0] + this.zoomEndSize[0], this.zoomEndViewportPos[1] ];
                        var intersectionPoint = getIntersectionPoint([ this.zoomStartViewportPos, this.zoomEndViewportPos ], [ zoomStartTopRight, zoomEndTopRight ]);

                        // Apply the scale transformation at the origin (the leaflet-zoom-animation class handles the transition itself)
                        canvas.style.transformOrigin = intersectionPoint[0] + "px " + intersectionPoint[1] + "px";

                        // Perform "preemptive scaling"
                        
                        var startScale, endScale;

                        // When we're zooming in, use the current render and scale up
                        if (args.scaleDelta >= 1.0)
                        {
                            startScale = 1.0;
                            endScale = args.scaleDelta;
                        }
                        
                        // When we're zooming out, we don't want the edges of the canvas showing
                        // Render at the end scale, scale the canvas up so that it appears the same size as the current render, and then animate it scale down
                        else
                        {
                            startScale = 1.0 / args.scaleDelta;
                            endScale = 1.0;
                            
                            // Negate the map-pane transformation so the canvas stays in the same place (over the leaflet canvas)
                            mapPanePos = this.getElementTransformPos(this.elements.leafletMapPane);
                            canvas.style.transform = "translate(" + Math.round(-mapPanePos[0]) + "px, " + Math.round(-mapPanePos[1]) + "px)";
        
                            // Calculate a transform offset so that we start drawing the map in the top left of the base image canvas
                            offset = [ mapPanePos[0] + this.zoomEndTransform[0], mapPanePos[1] + this.zoomEndTransform[1] ];
                            ratio = Math.min(this.zoomEndSize[0] / this.size.width, this.zoomEndSize[1] / this.size.height);
                            renderOnce(true);
                        }

                        // We have better control over initial states using the Web Animation API versus CSS transitions,
                        // So while we could use the leaflet-zoom-anim / leaflet-zoom-animated classes, doing it this way
                        // Means we don't need to use any tricks when we want an initial state that differs from the current
                        canvas.animate(
                        [{ transform: canvas.style.transform + " scale(" + startScale + ")" },
                         { transform: canvas.style.transform + " scale(" + endScale + ")" } ],
                        {
                            easing: "cubic-bezier(0, 0, 0.25, 1)",
                            duration: 250
                        })
                        .addEventListener("finish", function()
                        {
                            //canvas.style.transform = canvas.style.transform + " scale(" + endScale + ")";
                            renderOnce();
                        });

                        log("Started CSS canvas scale animation to x" + args.scale + " (" + args.scaleDelta + ") at an origin of " + intersectionPoint);
                    }
                    else
                    {
                        // Remove the scale transformation
                        //canvas.style.transformOrigin = "";
                        //var scaleIndex = canvas.style.transform.indexOf("scale(");
                        //if (scaleIndex >= 0) canvas.style.transform = canvas.style.transform.substring(0, scaleIndex);
                        
                        if (this.zoomScaleDelta >= 1.0)
                        {       
                            // Render the canvas once, which also moves the transform back to fill the viewport
                            //renderOnce();
                        }
                    }
                }.bind(this));
                
                this.events.onMapDragged.subscribe(triggerContinuousRender);
                this.events.onMapDraggedMove.subscribe(triggerContinuousRender);
                this.events.onMapPanned.subscribe(triggerContinuousRender);

                this.events.onMapResized.subscribe(function()
                {
                    var leafletContainerSize = this.getElementSize(this.elements.leafletContainer);
                    canvas.width = leafletContainerSize[0];
                    canvas.height = leafletContainerSize[1];
                    renderOnce();
                    
                }.bind(this));
            },

            // Canvas

            initThreadedCanvas: function()
            {
                // Create a pane to contain all the ruler points
                var canvasPane = document.createElement("div");
                canvasPane.className = "leaflet-pane leaflet-canvas-pane";
                this.elements.leafletCanvasPane = canvasPane;
                this.elements.leafletTooltipPane.after(canvasPane);

                // Although modern browsers technically double buffer canvases already, we still need to keep a double buffer
                // because of the flicker encountered when changing the transform at the same time as setting a new canvas.
                // The performance is the same, it's just that we can keep the old frame visible on screen in the space between
                // clearing the screen and drawing the new frame
                
                var canvas1 = document.createElement("canvas");
                var canvas2 = document.createElement("canvas");
                canvas1.style.pointerEvents = canvas2.style.pointerEvents = "none";
                canvas1.style.willChange = canvas2.style.willChange = "transform";
                this.elements.leafletCanvasPane.appendChild(canvas1);
                this.elements.leafletCanvasPane.appendChild(canvas2);

                // Set the canvas width and height to be the size of the container, so that we're always drawing at the optimal resolution
                // We can't set it to the scaled size of the map image because at high zoom levels the max pixel count will be exceeded
                var leafletContainerSize = this.getElementSize(this.elements.leafletContainer);
                canvas1.width = canvas2.width = leafletContainerSize[0];
                canvas1.height = canvas2.height = leafletContainerSize[1];

                var points = [];
                var urlIndexes = [];
                var icons = [];

                for (var i = 0; i < this.categories.length; i++)
                {
                    if (this.categories[i].icon && !icons.includes(this.categories[i].icon))
                        icons.push( { url: this.categories[i].icon.url,
                                      width: this.categories[i].icon.width,
                                      height: this.categories[i].icon.height,
                                      scaledWidth: this.categories[i].icon.scaledWidth,
                                      scaledHeight: this.categories[i].icon.scaledHeight });
                }
                
                for (var i = 0; i < 1000; i++)
                {
                    points.push({x: Math.floor(Math.random() * this.size.width), y: Math.floor(Math.random() * this.size.height)});
                    urlIndexes.push(Math.floor(Math.random() * (icons.length - 0) + 0));
                }

                // Create a new Blob which contains our code to execute in order to render the canvas in a separate thread
                // var blob = new Blob([`
                // var canvas1, canvas2, ctx1, ctx2, points, images, indexes;

                // var initialized;           // Whether the canvas has been initialized and is ready to render
                // var offset, ratio;         // Current offsets and scale of the canvas
                // var bufferState;           // The current buffer being worked on
                // var renderId;              // requestAnimationFrame id
                // var intervalId;            // setTimeout id
                // var renderMode = "once";   // The current render mode
                // var renderInterval = 300;  // The current render interval
                // var doubleBuffered = true; // Whether double buffering is currently enabled

                // var renderRequestTime, renderStartTime, renderEndTime, lastRenderTime;

                // // Below are control functions

                // function startRender(args)
                // {
                //     //stopRender();
                    
                //     renderMode = args.mode;
                //     renderInterval = args.interval;
                //     doubleBuffered = args.doubleBuffered;
                    
                //     requestRender();
                // }
                
                // function stopRender()
                // {
                //     renderMode = "once";
                //     clearTimeout(intervalId);
                //     cancelAnimationFrame(renderId);

                //     // Do one more render with the renderMode of "once"
                //     requestRender();
                // }

                // // Below are internal functions

                // // Asks the host to update the canvas offset and ratio before we can update
                // function requestRender()
                // {
                //     // If we're double buffering, invert the state so that we're working on the other canvas
                //     if (doubleBuffered) bufferState = !bufferState;
                    
                //     renderRequestTime = performance.now();
                //     self.postMessage({cmd: "requestUpdate", bufferState: bufferState});
                // }

                // // This is called when the renderRequest returned a response
                // function onBeginRender()
                // {
                //    if (!initialized) return;
                   
                //    renderStartTime = performance.now();
                    
                //    // Cancel the last requested render
                //    cancelAnimationFrame(renderId);

                //    // Schedule a new render
                //    renderId = requestAnimationFrame(render);
                // }

                // // This is called after the render completed
                // function onEndRender()
                // {
                //     renderEndTime = performance.now();
                //     console.log("Rendered canvas " + (bufferState ? 1 : 2) + " in " + Math.round(renderEndTime - renderStartTime) + "ms");

                //     // Tell the main thread the render is done, so that the canvas may be presented
                //     self.postMessage({ cmd: "present", bufferState: bufferState });

                //     // Queue another render if required
                //     if (renderMode == "continuous")
                //     {
                //         requestRender();
                //     }
                //     else if (renderMode == "interval")
                //     {
                //         var interval = Math.max(0, renderInterval - (renderEndTime - renderStartTime));
                //         intervalId = setTimeout(function(){ requestRender(); }, interval);
                //     }
                // }

                // function render(time)
                // {
                //     // Don't render if no time has passed since the last render
                //     if (lastRenderTime != time)
                //     {
                //         var ctx = bufferState ? ctx1 : ctx2;
    
                //         // Reset the transform matrix so we're not applying it additively
                //         ctx.setTransform(1, 0, 0, 1, 0, 0);
                        
                //         // Clear the new buffer,
                //         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
                //         // Translate so that we start drawing the map in the top left of the base image canvas
                //         ctx.translate(offset[0], offset[1]);

                //         // Commented out, for some reason scaling the coordinate system will make images blurry
                //         // even if the ratio is factored out of the scale. This does mean we have to manually scale
                //         // up and down the coordinates, but it's a good trade-off if it means crispy images
                //         //ctx.scale(ratio, ratio);
    
                //         for (var i = 0; i < points.length; i++)
                //         {
                //             var icon = icons[indexes[i]];

                //             // Scale the points so they operate at the current scale
                //             // Round the pixels so that we're drawing across whole pixels (and not fractional pixels)
                //             var x = Math.round((points[i].x * ratio) -  (icon.scaledWidth / 2));
                //             var y = Math.round((points[i].y * ratio) -  (icon.scaledHeight / 2));
                //             var width = icon.scaledWidth;
                //             var height = icon.scaledHeight;
                //             ctx.drawImage(icon.bitmap, x, y, width, height);
                //             /*
                //             ctx.beginPath();
                //             ctx.arc(points[i].x, points[i].y, 2 / ratio, 0, 2 * Math.PI);
                //             ctx.fill();
                //             */
                //         }
                //     }

                //     lastRenderTime = time;
                //     onEndRender();
                // }
                
                // self.addEventListener("message", function(e)
                // {
                //     switch (e.data.cmd)
                //     {
                //         case "poke":
                //         {
                //             console.log("Ouch!");
                //             break;
                //         }
                        
                //         // Initialize the worker. This is passed the points array, and the OffscreenCanvas (which we cache)
                //         case "init":
                //         {
                //             points = e.data.points;
                //             ctx1 = e.data.canvas1.getContext("2d");
                //             ctx2 = e.data.canvas2.getContext("2d");

                //             indexes = e.data.indexes;
                //             var requests = e.data.icons.map(function(i) { return fetch(i.url); });
                //             var responses = Promise.all(requests)
                //             .then(function(values)
                //             {
                //                 return Promise.all(values.map(function(r) { return r.blob(); }));
                                
                //             })
                //             .then(function(blobs)
                //             {
                //                 return Promise.all(blobs.map(function(b, index)
                //                 {
                //                     var icon = e.data.icons[index];
                //                     return createImageBitmap(b, { resizeWidth: icon.scaledWidth, resizeHeight: icon.scaledHeight, resizeQuality: "high" });
                //                 }));
                //             })
                //             .then(function(bitmaps)
                //             {
                //                 icons = [];
                //                 for (var i = 0; i < bitmaps.length; i++)
                //                 {
                //                     var icon = e.data.icons[i];
                //                     icon.bitmap = bitmaps[i];
                //                     icons.push(icon);
                //                 }
                //             })
                //             .finally(function()
                //             {
                //                initialized = true;
                //             });
                            
                //             break;
                //         }

                //         case "start":
                //         {
                //             startRender(e.data);
                //             break;
                //         }

                //         case "stop":
                //         {
                //             stopRender();
                //             break;
                //         }

                //         // The host updated the drawing offset, ratio, and the buffer we're working on
                //         case "update":
                //         {
                //             // Update the drawing offset, drawing ratio, and the buffer we're working on
                //             if (e.data.offset) offset = e.data.offset;
                //             if (e.data.ratio) ratio = e.data.ratio;
                            
                //             // Resize the canvas if a new size was passed
                //             if (e.data.size && (e.data.size[0] != ctx1.canvas.width || e.data.size[1] != ctx1.canvas.height))
                //             {
                //                 ctx1.canvas.width = ctx2.canvas.width = e.data.size[0];
                //                 ctx1.canvas.height = ctx2.canvas.height = e.data.size[1];
                //             }

                //             onBeginRender();
                //             break;
                //         }
                //     }
                // });
                // `]);

                // Create a blob with the data above (this is the only way to make a new worker without creating a separate file)
                var blobUrl = window.URL.createObjectURL(blob);
                var worker = new Worker(blobUrl);
                var offscreenCanvas1 = canvas1.transferControlToOffscreen();
                var offscreenCanvas2 = canvas2.transferControlToOffscreen();

                // Initialize the worker with these canvases
                worker.postMessage({ cmd: "init", canvas1: offscreenCanvas1, canvas2: offscreenCanvas2, points: points, icons: icons, indexes: urlIndexes }, [offscreenCanvas1, offscreenCanvas2]);

                worker.addEventListener("message", function(e)
                {
                    // Present the updated buffer and hide the old one
                    if (e.data.cmd == "present")
                    {
                        var canvasNew = e.data.bufferState ? canvas1 : canvas2;
                        var canvasOld = e.data.bufferState ? canvas2 : canvas1;
                        canvasNew.hidden = false;
                        canvasOld.hidden = true;
                    }

                    // The worker requested updated transformation state
                    if (e.data.cmd == "requestUpdate")
                    {
                        var canvas = e.data.bufferState ? canvas1 : canvas2;
    
                        // Negate the map-pane transformation so the canvas stays in the same place (over the leaflet canvas)
                        var mapPanePos = this.getElementTransformPos(this.elements.leafletMapPane);
                        canvas.style.transform = "translate(" + -mapPanePos[0] + "px, " + -mapPanePos[1] + "px)";
    
                        // Calculate a transform offset so that we start drawing the map in the top left of the base image canvas
                        var baseImagePos = this.getElementTransformPos(this.elements.leafletBaseImageLayer, true);
                        var offset = [ mapPanePos[0] + baseImagePos[0], mapPanePos[1] + baseImagePos[1] ];
    
                        // This ratio is a multiplier to the coordinate system so that coordinates are scaled down to the scale of the canvas
                        // allowing us to use pixel coordinates and have them translate correctly (this does mean that sizes also scale
                        // we can negate this by dividing sizes by the ratio)
                        var baseImageLayerSize = this.getElementSize(this.elements.leafletBaseImageLayer);
                        var ratio = Math.min(baseImageLayerSize[0] / this.size.width, baseImageLayerSize[1] / this.size.height);
    
                        // Send the updated data to the worker
                        worker.postMessage({ cmd: "update", offset: offset, ratio: ratio });
                        
                    }
                }.bind(this));
                
                // Redraws the canvas every <interval> milliseconds until called again with value == false
                function doContinuousRender(value)
                {
                    if (value == true)
                        worker.postMessage({ cmd: "start", mode: "continuous", doubleBuffered: false });
                    else
                        worker.postMessage({ cmd: "stop" });
                }

                function doIntervalRender(value)
                {
                    if (value == true)
                        worker.postMessage({ cmd: "start", mode: "interval", interval: 300, doubleBuffered: true });
                    else
                        worker.postMessage({ cmd: "stop" });
                }

                var renderState = false;

                var doRenderBasedOnMapState = function()
                {
                    var state = (this.isDragging || this.isPanning || this.isZooming);
                    if (state != renderState)
                    {
                        renderState = state;
                        doContinuousRender(state);
                    }
                }.bind(this);

                this.events.onMapZoomed.subscribe(doRenderBasedOnMapState);
                this.events.onMapDragged.subscribe(doRenderBasedOnMapState);
                this.events.onMapPanned.subscribe(doRenderBasedOnMapState);

                this.events.onMapResized.subscribe(function()
                {
                    var leafletContainerSize = this.getElementSize(this.elements.leafletContainer);
                    worker.postMessage({ cmd: "update", size: leafletContainerSize });
                }.bind(this));
            },

            // Ruler

            initRuler: function()
            {
                // Create a pane to contain all the ruler points
                var rulerPane = document.createElement("div");
                rulerPane.className = "leaflet-pane leaflet-ruler-pane";
                this.elements.leafletRulerPane = rulerPane;
                this.elements.leafletTooltipPane.after(rulerPane);
                
                var prev, zoomStepTimeoutId, zoomStepId, zoomStepFn = function(time)
                {
                    // Only apply the new transform if the time actually changed
                    if (prev != time)
                    {
                        if (this.elements.rulerPoints)
                        {
                            for (var i = 0; i <  this.elements.rulerPoints.length; i++)
                            {
                                var elem = this.elements.rulerPoints[i];
                                
                                var pixelPos = elem._pixel_pos;

                                // This is a combined pixel to scaled, then scaled to transform function
                                var imageSize = this.getScaledMapImageSize(true);
                                var baseLayerPos = this.getElementTransformPos(this.elements.leafletBaseImageLayer, true);
                
                                // Scale the pixel position back up to the scaled range and add the position
                                // of the base layer to the scaled position to get the transform position
                                var transformPos = [ ((pixelPos[0] / this.size.width) * imageSize[0]) + baseLayerPos[0],
                                                     ((pixelPos[1] / this.size.width) * imageSize[0]) + baseLayerPos[1] ];

                                // Set the transform position of the element back to the _leaflet_pos (for caching)
                                elem._leaflet_pos.x = transformPos[0];
                                elem._leaflet_pos.y = transformPos[1];

                                elem.style.transform = "translate3d(" + transformPos[0] + "px, " + transformPos[1] + "px, 0px)";
                            }
                        }
                    }

                    prev = time;
                    zoomStepId = window.requestAnimationFrame(zoomStepFn);
                
                }.bind(this);

                // Subscribe to an event that fires on the start and end of the zoom
                // in order to animate the popup transform alongside the marker transform
                this.events.onMapZoomed.subscribe(function(e)
                {
                    // Cancel the last callback so that we're not running two at the same time
                    window.cancelAnimationFrame(zoomStepId);
                    window.clearInterval(zoomStepTimeoutId);
                    
                    // Zoom start
                    if (e.value == true)
                    {
                        // Start a new animation
                        zoomStepId = window.requestAnimationFrame(zoomStepFn);

                        // Start a timeout for it too
                        // This is more of a safety mechanism if anything, we don't want a situation where our zoomStep function is looping indefinetely
                        zoomStepTimeoutId = window.setTimeout(function() { window.cancelAnimationFrame(zoomStepId); }, 300);
                    }

                    // Zoom end
                    else
                    {
                    }

                }.bind(this));
                
                this.events.onMapClicked.subscribe(function(args)
                {
                    if (args.wasDragging) return;

                    var transformPosOfClick = this.clientToTransformPosition([ args.event.clientX, args.event.clientY ]);
                    var pixelPosition = this.scaledToPixelPosition(this.clientToScaledPosition([ args.event.clientX, args.event.clientY ]));
                    
                    var dot = document.createElement("div");
                    dot.className = "mapsExtended_rulerDot";
                    dot.style.cssText = "transform: translate3d(" + transformPosOfClick[0] + "px, " + transformPosOfClick[1] + "px, 0px);";
                    dot.innerHTML = "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"50\" cy=\"50\" r=\"38\" stroke-width=\"16\"></circle></svg>";
                    dot._leaflet_pos = { x: transformPosOfClick[0], y: transformPosOfClick[1] };
                    dot._pixel_pos = pixelPosition;

                    this.elements.leafletRulerPane.appendChild(dot);
                    this.elements.rulerPoints = this.elements.rulerPoints || [];
                    this.elements.rulerPoints.push(dot);

                }.bind(this));
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
                {
                    return this.elements.rootElement.requestFullscreen()
                    .catch(function(error)
                    {
                        console.error("Error attempting to enable fullscreen mode: " + error.message + " (" + error.name + ")");
                    });
                }
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
                }

                // Exit windowed fullscreen
                else
                {
                    // Restore the scroll position
                    window.scroll({ top: this.fullscreenScrollPosition, left: 0, behavior: "auto" });
                }

                // Change the tooltip that is shown to the user on hovering over the button
                this.elements.fullscreenControlButton.setAttribute("title", value ? mapsExtended.i18n.msg("fullscreen-exit-tooltip").plain()
                                                                                : mapsExtended.i18n.msg("fullscreen-enter-tooltip").plain());

                this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-in", !this.isWindowedFullscreen);
                this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-out", this.isWindowedFullscreen);

                this.events.onMapFullscreen.invoke({ map: this, fullscreen: value, mode: "window" });
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
                
            }, window),

            // Creates a fullscreen button for the map, sets up various events to control fullscreen
            initFullscreen: function(isNew)
            {
                this.isFullscreen = this.isWindowedFullscreen = false;
                
                // Modify and set up some styles - this is only executed once
                this.initFullscreenStyles();

                // Don't continue if fullscreen is disabled
                if (this.config.enableFullscreen == false)
                    return;
                
                // Fullscreen button - Create a new leaflet-control before the zoom control which when clicked will toggle fullscreen
                var fullscreenControl = document.createElement("div");
                fullscreenControl.className = "leaflet-control-fullscreen leaflet-bar leaflet-control";

                var fullscreenControlButton = document.createElement("a");
                fullscreenControlButton.className = "leaflet-control-fullscreen-button leaflet-control-fullscreen-button-zoom-in";
                fullscreenControlButton.setAttribute("title", mapsExtended.i18n.msg("fullscreen-enter-tooltip").plain());

                mw.hook("dev.wds").add(function(wds)
                {
                    var zoomInIcon = wds.icon("zoom-in-small");
                    var zoomOutIcon = wds.icon("zoom-out-small");
                    fullscreenControlButton.appendChild(zoomInIcon);
                    fullscreenControlButton.appendChild(zoomOutIcon);
                });
                    
                fullscreenControl.appendChild(fullscreenControlButton);
                this.elements.leafletControlContainerBottomRight.prepend(fullscreenControl);
                
                this.elements.fullscreenControl = fullscreenControl;
                this.elements.fullscreenControlButton = fullscreenControlButton;

                // Click event on fullscreen button
                fullscreenControlButton.addEventListener("click", function(e)
                {
                    // Remove marker query parameter from URL so that when the map goes fullscreen, it isn't zoomed into the marker again
                    var url = window.location;
                    if (urlParams.has("marker"))
                    {
                        urlParams.delete("marker");
                        window.history.replaceState({}, document.title, url.origin + url.pathname + (urlParams != "" ? "?" : "") + urlParams.toString() + url.hash);
                    }
                    
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

                document.addEventListener("keydown", function(e)
                {
                    if (!this.isFullscreen && !this.isWindowedFullscreen) return;

                    // True if the browser is in either Fullscreen API or browser-implemented fullscreen (via F11)
                    var inBrowserFullscreen = matchMedia("(display-mode: fullscreen)").matches;

                    // Escape pressed
                    if (e.keyCode == 27) // Escape
                    {
                        // Ignore if the lightbox is showing (close lightbox first)
                        if (document.getElementById("LightboxModal") != undefined)
                            return;

                        // ...while in windowed fullscreen and not browser fullscreen
                        if (this.isWindowedFullscreen)// && !inBrowserFullscreen)
                            this.setWindowedFullscreen(false);
                    }
                }.bind(this));

                this.elements.rootElement.addEventListener("fullscreenchange", function(e)
                {
                    this.isFullscreen = document.fullscreenElement == e.currentTarget;
                    this.isFullscreenTransitioning = false;

                    // Toggle the fullscreen class on the document body
                    document.documentElement.classList.toggle("fullscreen", this.isFullscreen);

                    // Toggle the fullscreen class on the root map element
                    this.elements.rootElement.classList.toggle("mapsExtended_fullscreen", this.isFullscreen || this.isWindowedFullscreen);

                    // Change the tooltip that is shown to the user on hovering over the button
                    this.elements.fullscreenControlButton.setAttribute("title", this.isFullscreen || this.isWindowedFullscreen ? mapsExtended.i18n.msg("fullscreen-exit-tooltip").plain() : mapsExtended.i18n.msg("fullscreen-enter-tooltip").plain());

                    // Toggle classes on the fullscreen A element to influence which icon is displayed
                    this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-in", !this.isFullscreen && !this.isWindowedFullscreen);
                    this.elements.fullscreenControlButton.classList.toggle("leaflet-control-fullscreen-button-zoom-out", this.isFullscreen || this.isWindowedFullscreen);

                    // Move overlay elements to show on top of the fullscreen elements
                    this.moveOverlayElementsFullscreen(this.isFullscreen);

                    if (this.isFullscreen == true)
                        this.fullscreenOverlayObserver.observe(document.body, { childList: true });
                    else
                        this.fullscreenOverlayObserver.disconnect();

                    this.events.onMapFullscreen.invoke({ map: this, fullscreen: this.isFullscreen || this.isWindowedFullscreen, mode: "screen" });
                    
                }.bind(this));

                // Add an observer which triggers every time elements get added to the document body while in fullscreen
                this.fullscreenOverlayObserver = new MutationObserver(function(mutationList, observer)
                {
                    // Don't use while not in actual fullscreen
                    if (!this.isFullscreen) return;

                    if (mutationList.some(function(ml) { return ml.type == "childList" && ml.addedNodes.length > 0; }))
                    {
                        this.moveOverlayElementsFullscreen(true);
                    }
                }.bind(this));
            },

            moveOverlayElementsFullscreen: function(value)
            {
                var classes = ["notifications-placeholder", "oo-ui-windowManager", "lightboxContainer"];
                classes.forEach(this.moveElementFullscreen.bind(this));
            },

            // This function is a general purpose function used to move elements to and from the map root so they appear while in fullscreen
            // If entered fullscreen: Moves the element to the end of map.rootElement
            // If exited fullscreen: Moves the element back to the body
            moveElementFullscreen: function(className)
            {
                var value = this.isFullscreen;
                var element = value ? document.querySelector("body > ." + className) : this.elements.rootElement.querySelector("." + className);
                if (!element) return;

                var isElementFullscreened = element.parentElement == this.elements.rootElement;
                if (value && !isElementFullscreened)
                    this.elements.rootElement.append(element);
                else if (!value && isElementFullscreened)
                    document.body.append(element);
            },

            // Controls

            controlAssociations:
            {
                "zoom": { class: "leaflet-control-zoom" },
                "fullscreen": { class: "leaflet-control-fullscreen" },
                "edit": { class: "interactive-maps__edit-control", useParent: true }
            },

            // This may be called multiple times for one map, and should be because leaflet controls are recreated on deinitialization
            initControls: function()
            {
                // Build a list of controls to look up where they are (we can't always assume where the controls are)
                for (var key in this.controlAssociations)
                {
                    var control = this.controlAssociations[key];
                    control.name = key;
                    control.element = this.elements.leafletControlContainer.querySelector("." + control.class);
                    control.isPresent = control.element != undefined;
                    control.isPresentInConfig = this.config.hiddenCategories.includes(key) || this.config.mapControls.some(function(mc) { return mc.includes(key); });
                    control.position = "";

                    if (control.isPresent)
                    {
                        // Use parent of control if required
                        if (control.useParent == true)
                        {
                            control.element = control.element.parentElement;
                        }

                        // Determine location of control
                        if (control.element.parentElement.matches(".leaflet-bottom"))
                        {
                            if (control.element.parentElement.matches(".leaflet-left"))
                                control.position = "bottom-left";
                            else if (control.element.parentElement.matches(".leaflet-right"))
                                control.position = "bottom-right";
                        }
                        else if (control.element.parentElement.matches(".leaflet-top"))
                        {
                            if (control.element.parentElement.matches(".leaflet-left"))
                                control.position = "top-left";
                            else if (control.element.parentElement.matches(".leaflet-right"))
                                control.position = "top-right";
                        }
                    }
                }
                
                // Only modify control positions if mapControls is present, and all arrays within mapControls are an array
                if (this.config.mapControls && Array.isArray(this.config.mapControls) && this.config.mapControls.length === 4 &&
                    this.config.mapControls.every(function(mc) { return mc != undefined  && Array.isArray(mc); }));
                {
                    for (var i = 0; i < this.config.mapControls.length; i++)
                    {
                        switch (i)
                        {
                            case 0:
                            {
                                var position = "top-left";
                                var container = this.elements.leafletControlContainerTopLeft;
                                break;
                            }
                            case 1:
                            {
                                var position = "top-right";
                                var container = this.elements.leafletControlContainerTopRight;
                                break;
                            }
                            case 2:
                            {
                                var position = "bottom-right";
                                var container = this.elements.leafletControlContainerBottomRight;
                                break;
                            }
                            case 3:
                            {
                                var position = "bottom-left";
                                var container = this.elements.leafletControlContainerBottomLeft;
                                break;
                            }
                        }

                        for (var j = 0; j < this.config.mapControls[i].length; j++)
                        {
                            var id = this.config.mapControls[i][j];
                            var controlToMove = this.controlAssociations[id];

                            // Control invalid
                            if (controlToMove == undefined)
                                log("No control found with the id " + id + " at mapControls[" + i + "][" + j + "] (" + position + ")");

                            // Control valid, present, and in a different position to the one requested
                            else if (controlToMove.isPresent && controlToMove.position != position)
                            {
                                controlToMove.position = position;

                                // Append the element under a new control container
                                container.appendChild(controlToMove.element);
                            }
                        }
                    }
                }

                // Hide controls in hiddenControls
                if (this.config.hiddenControls && Array.isArray(this.config.hiddenControls) && this.config.hiddenControls.length > 0)
                {
                    for (var i = 0; i < this.config.hiddenControls.length; i++)
                    {
                        var id = this.config.hiddedControls[i];
                        var controlToHide = this.controlAssociations[id];
                        
                        // Control invalid
                        if (controlToHide == undefined)
                            log("No control found with the id " + id + " at hiddenControls[" + i + "]");
                        
                        // Control valid and present
                        else if (controlToHide.isPresent)
                        {
                            controlsToHide.hidden = true;

                            // Don't remove it from the DOM, just hide it
                            controlToHide.element.style.display = "none";
                        }
                    }
                }

                // First time initializing, create rules to specifically hide controls in the wrong corner
                // This helps to reduce flicker when the map is reinitialized and the controls have to be repositioned
                if (!this.initializedOnce)
                {
                    for (var key in this.controlAssociations)
                    {
                        var control = this.controlAssociations[key];

                        if (!control || !control.isPresent || control.isHidden)
                            continue;

                        var cornerSelector = "";
                        if (control.position.startsWith("bottom"))   cornerSelector += ".leaflet-bottom";
                        else if (control.position.startsWith("top")) cornerSelector += ".leaflet-top";
                        if (control.position.endsWith("left"))       cornerSelector += ".leaflet-left";
                        else if (control.position.endsWith("right")) cornerSelector += ".leaflet-right";

                        var selector = "." + this.mapId + "[id='" + this.id + "'] .leaflet-control-container > *:not(" + cornerSelector + ") ." + control.class;
                        mapsExtended.stylesheet.insertRule(selector + " { display: none; }");
                    }

                    // If there are controls in the top left, edit the margins on the fullscreen filters panel
                    if (Array.isArray(this.config.mapControls[0]) && this.config.mapControls[0].length > 0)
                        mapsExtended.stylesheet.insertRule(".mapsExtended_fullscreen .interactive-maps .interactive-maps__filters-list { margin-left: 56px !important; }");
                }
            },

            // Search
            
            initSearch: function()
            {
                var search = {};
                search.elements = {};
                this.search = search;

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
                var searchBoxInput = searchBox.querySelector("#mapsExtended_searchInput");
                var searchBoxHint = searchBox.querySelector(".wds-input__hint");
                var searchBoxHintContainer = searchBox.querySelector(".wds-input__hint-container");
                var searchResultsList = searchRoot.querySelector(".mapsExtended_searchResults");
                var searchDropdownButton = searchDropdown.querySelector(".mapsExtended_searchDropdownButton");

                // Cache the elements
                search.elements.searchRoot = searchRoot;
                search.elements.searchBox = searchBox;
                search.elements.searchBoxInput = searchBoxInput;
                search.elements.searchBoxHint = searchBoxHint;
                search.elements.searchBoxHintContainer = searchBoxHintContainer;
                search.elements.searchResultsList = searchResultsList;
                search.elements.searchDropdown = searchDropdown;
                search.elements.searchDropdownButton = searchDropdownButton;

                // Set some strings from i18n
                searchBoxInput.setAttribute("placeholder", mapsExtended.i18n.msg("search-placeholder").plain());
                this.updateSearchSubtitle();

                // Resize the searchRoot to be a bit less than the height of the root map container
                searchRoot.style.maxHeight = (this.elements.rootElement.clientHeight - 35) + "px";

                /* Events and functions */

                // Add a listener which fires when the input value of the search box changes. This drives search
                searchBoxInput.addEventListener("input", function(e)
                {
                    if (e.target.value == "" || e.target.value == undefined)
                        this.updateSearchList(this.search.emptySearch);
                    else
                        this.updateSearchList(this.searchMarkers(e.target.value));

                }.bind(this));

                // Add a listener which changes the min height of the search box when it is opened
                searchDropdownButton.addEventListener("mouseenter", function(e)
                {
                    // Resize the searchRoot to be a bit less than the height of the root map container
                    searchRoot.style.maxHeight = (this.elements.rootElement.clientHeight - (this.isFullscreen || this.isWindowedFullscreen || this.isMinimalLayout ? 60 : 35)) + "px";
                    
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
                    if (selected == true && this.search.selectedMarker && marker != this.search.selectedMarker)
                    {
                        var deselectedMarker = this.search.selectedMarker;
                        this.search.selectedMarker = undefined;
                        this.toggleMarkerHighlight(deselectedMarker, false);
                        this.toggleMarkerSelected(deselectedMarker, false);
                    }

                    this.toggleMarkerHighlight(marker, selected);
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

                    container.classList.toggle("collapsed");

                    // Scroll to item if we've scrolled past it
                    if (searchResultsList.scrollTop > container.offsetTop)
                        searchResultsList.scrollTop = container.offsetTop;
                    
                }.bind(this);

                this.events.onCategoryToggled.subscribe(function(args)
                {
                    if (args.category.disabled) return;
                    
                    // Deselect the current marker if it belongs to the category being filtered out
                    if (args.value == false && this.search.selectedMarker && this.search.selectedMarker.categoryId == args.category.id)
                        this.toggleMarkerSelected(this.search.selectedMarker, false);
                    
                    // Toggle the "filtered" class on the container
                    args.category.elements.searchResultsContainer.classList.toggle("filtered", !args.value);

                    // Toggle the "collapsed" class on the container
                    args.category.elements.searchResultsContainer.classList.toggle("collapsed", !args.value);

                    this.updateSearchSubtitle();
                    
                }.bind(this));

                this.events.onMarkerShown.subscribe(function(args)
                {
                    if (this.search.lastSearch == undefined || this.search.lastSearch.isEmptySearch == true)
                        return;

                    // Re-apply search results class if the newly-shown markers are included in the results
                    if (this.search.lastSearch.markerMatches.includes(args.marker) && args.marker.markerElement)
                        args.marker.markerElement.classList.add("search-result");
                    
                }.bind(this));

                search.elements.searchCategories = [];

                for (var i = 0; i < this.categories.length; i++)
                {
                    var category = this.categories[i];
                    if (category.disabled || category.startDisabled) continue;
                    
                    var searchCategory = {};
                    searchCategory.category = category;

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

                    var headerIcon = category.elements.categoryIcon.cloneNode(true);
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

                    searchCategory.elements =
                    {
                        container: container,
                        header: header,
                        headerIcon: headerIcon,
                        headerText: headerText,
                        headerCount: headerCount,
                        headerWrapper: headerWrapper,
                        itemsList: itemsList
                    };
                    
                    search.elements.searchCategories.push(searchCategory);
                };

                // Hide the seach box if the config says to
                if (this.config.enableSearch == false)
                    searchBox.style.display = searchDropdown.style.display = "none";

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
                
                this.search.emptySearch = emptySearch;

                // Construct update the search list with a full search
                this.updateSearchList();
            },

            // Updates the search list using a completed search. The search object should be { searchTerm, results }
            // Pass this.emptySearch, or null to reset the search list
            updateSearchList: function(search)
            {
                var t0 = performance.now();
                if (!search) search = this.search.emptySearch;

                var numFilteredCategories = 0;
                var numDisplayedCategories = 0;

                // Toggle mapsExtended_searchFiltered class on if the search has results
                this.elements.rootElement.classList.toggle("mapsExtended_searchFiltered", !search.isEmptySearch);

                // Hide search results element if the search has no results
                this.search.elements.searchResultsList.style.display = search.results.length > 0 ? "" : "none";
                
                for (var i = 0; i < this.markers.length; i++)
                {
                    var marker = this.markers[i];

                    // Skip if marker category is disabled
                    if (marker.category.disabled) continue;
                    
                    var isInResults = search.results.includes(marker);
                    var isInMatches = search.markerMatches.includes(marker);
                    var wasInMatches = this.search.lastSearch != undefined && this.search.lastSearch.markerMatches.includes(marker);
                    
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
                    var wasInMatches = this.search.lastSearch != undefined && this.search.lastSearch.categoryMatches.includes(category);

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

                this.search.lastSearch = search;
                this.updateSearchSubtitle();
                
                var t1 = performance.now();
                log("Updating search elements took " + Math.round(t1 - t0) + " ms.");

                this.events.onSearchPerformed.invoke({ map: this, search: search });
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
                    this.toggleMarkerHighlight(category.markers[i], value && this.search.lastSearch.results.includes(category.markers[i]));
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
                
                this.search.selectedMarker = value ? marker : undefined;
                
                // Set/unset the selected class on the list item
                marker.searchResultsItem.classList.toggle("selected", value);

                // Set/unset the search-result-highlight-fixed class on the marker element
                //marker.markerElement.classList.toggle("search-result-highlight", value);
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
                if (this.search.selectedMarker == marker) return;

                this.search.highlightedMarker = value ? marker : undefined;

                // Set the value if it wasn't passed to the opposite of whatevr it currently is
                if (value == undefined)
                    value = !marker.markerElement.classList.contains("search-result-highlight");

                marker.markerElement.classList.toggle("search-result-highlight", value);
                marker.markerElement.style.zIndex = (value ? (9999999 + marker.order) : marker.order).toString();
            },

            // This updates the hint shown under the search box to reflect the state of the search
            updateSearchSubtitle: function()
            {
                var lastSearch = this.search.lastSearch;
                var hasResults = lastSearch && lastSearch.results && lastSearch.results.length > 0;
                this.search.elements.searchBox.classList.toggle("has-error", lastSearch && !hasResults);
                
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
                            this.search.elements.searchBoxHint.textContent = mapsExtended.i18n.msg("search-hint-resultsfiltered", numMarkers, numDisplayedCategories, numFilteredCategories).plain();
                        else
                            this.search.elements.searchBoxHint.textContent = mapsExtended.i18n.msg("search-hint-results", numMarkers, numDisplayedCategories).plain();
                    }
                    else
                    {
                        this.search.elements.searchBoxHint.textContent = mapsExtended.i18n.msg("search-hint-noresults", lastSearch.searchTerm).plain();
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

                if (this.search.searchHistory == undefined)
                    this.search.searchHistory = [ this.search.emptySearch ];

                if (!searchTerm || searchTerm == "")
                    return emptySearch;
                
                searchTerm = searchTerm.toLowerCase();
                
                var closestSearchIndex = -1;

                // For the closest matching previous search, this is the amount of characters that were added to the new search
                var closestSearchMinimumDiff = Infinity;

                for (var i = this.search.searchHistory.length - 1; i >= 0; i--)
                {
                    // If the new search term was exactly the same as a previous term, don't bother repeating the search
                    if (searchTerm == this.search.searchHistory[i].searchTerm)
                    {
                        closestSearchIndex = i;
                        closestSearchMinimumDiff = 0;
                        break;
                    }

                    // If the old search term is found within the new search term
                    else if (searchTerm.includes(this.search.searchHistory[i].searchTerm))
                    {
                        // ...determine how many character less it has
                        var diff = searchTerm.length - this.search.searchHistory[i].searchTerm.length;

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
                    baseSearch = this.search.searchHistory[closestSearchIndex];
                    log("Centering search on \"" + baseSearch.searchTerm + "\" with " + baseSearch.markerMatches.length + " marker matches and " + baseSearch.categoryMatches.length + " category matches");
                }

                // Otherwise base off all markers
                else
                {
                    baseSearch = this.search.emptySearch;
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
                    this.search.searchHistory.push(search);

                    // Remove the first item in the search history if it exceeds 100 searches
                    if (this.search.searchHistory.length > 100)
                        this.search.searchHistory.unshift();
                }

                // Search is idential
                else if (closestSearchMinimumDiff == 0)
                {
                    log("Search was identical, using previous results");
                    search = baseSearch;
                }

                var t1 = performance.now();
                log("Search took " + Math.round(t1 - t0) + " ms.");

                return search;
            },

            // Sidebar

            initSidebar: function()
            {
                // Nothing relies on the sidebar existing, so if it shouldn't be enabled, don't run the code at all
                if (this.config.enableSidebar == false)
                    return;

                var sidebar = {};
                sidebar.elements = {};
                sidebar.isShowing = true;
                this.sidebar = sidebar;

                // Enable or disable automatically showing or hiding the sidebar
                this.sidebar.autoShowHide = (this.config.sidebarBehaviour == "autoAlways" || this.config.sidebarBehaviour == "autoInitial");

                // Show and hide the sidebar automatically as the size of the map module changes
                this.events.onMapModuleResized.subscribe(function(args)
                {
                    if (!this.sidebar.autoShowHide) return;

                    if (sidebar.isShowing == true && args.rect.width < 1000 && args.lastRect.width >= 1000)
                    {
                        log("Toggled sidebar off automatically");
                        this.toggleSidebar(false, true);
                    }
                    else if (sidebar.isShowing == false && args.rect.width >= 1000 && args.lastRect.width < 1000)
                    {
                        log("Toggled sidebar on automatically");
                        this.toggleSidebar(true, true);
                    }
                }.bind(this));

                // To to avoid the filtersList being shown over the sidebar on fullscreen (or minimal layout), move it to the map-module-container
                this.events.onMapFullscreen.subscribe(function(args)
                {
                    if (sidebarSearchBody.expanded == true && sidebarSearchBody.resizedExpandedHeight == undefined)
                    {
                        sidebarSearchBody.ignoreNextResize = true;
                        sidebarSearchBody.style.height = sidebarSearchBody.calculateExpandedHeight() + "px";
                    }

                    sidebarFloatingToggle.updateToggle(false);
                    
                    // Don't move filters list if we're already in a minimal layout
                    if (this.isMinimalLayout == true) return;

                    if (args.fullscreen)
                        this.elements.mapModuleContainer.prepend(this.elements.filtersList);
                    else
                    {
                        var elem = this.elements.rootElement.querySelector(".interactive-maps");
                        elem.prepend(this.elements.filtersList);
                    }
                }.bind(this));

                // Get sidebar width from rule

                var sidebarWrapper = document.createElement("div");
                sidebarWrapper.className = "mapsExtended_sidebarWrapper";
                sidebarWrapper.classList.add("mapsExtended_sidebarWrapper" + capitalizeFirstLetter(this.config.sidebarSide));
                if (this.config.sidebarOverlay == true) sidebarWrapper.classList.add("overlay");
                this.elements.mapModuleContainer.prepend(sidebarWrapper);

                // Create the sidebar in the same parent as the leaflet-container div
                var sidebarRoot = document.createElement("div");
                sidebarRoot.className = "mapsExtended_sidebar";
                sidebarRoot.resizeObserver = new ResizeObserver(function(e)
                {
                    resizeCategoryToggles();
                    if (categorySectionBody.classList.contains("expanded"))
                        categorySectionBody.style.maxHeight = categorySectionBody.scrollHeight + "px";
                });
                sidebarWrapper.append(sidebarRoot);

                var sidebarContent = document.createElement("div");
                sidebarContent.className = "mapsExtended_sidebarContent";
                sidebarRoot.append(sidebarContent);

                sidebarContent.addEventListener("scroll", OO.ui.throttle(function()
                {
                    sidebarFloatingToggle.updateToggle();
                }, 150), { passive: true });

                // Create the button that toggles the sidebar
                var sidebarToggleButton = document.createElement("button");
                sidebarToggleButton.className = "mapsExtended_sidebarToggle wds-pill-button";
                sidebarToggleButton.title = mapsExtended.i18n.msg("sidebar-hide-tooltip").plain();
                sidebarToggleButton.addEventListener("click", function()
                {
                    this.sidebar.elements.sidebarToggleButton.blur();
                    this.toggleSidebar();
                    
                    if (this.config.sidebarBehaviour == "autoInitial")
                        this.sidebar.autoShowHide = false;

                }.bind(this));
                this.elements.filtersList.prepend(sidebarToggleButton);

                // Header
                var sidebarHeader = document.createElement("div");
                sidebarHeader.className = "mapsExtended_sidebarHeader";
                sidebarHeader.textContent = mapsExtended.i18n.msg("sidebar-header", this.name).plain();
                sidebarContent.append(sidebarHeader);

                // Create a button that floats over the sidebar
                var sidebarFloatingToggle = document.createElement("div");
                sidebarFloatingToggle.className = "mapsExtended_sidebarFloatingToggle";
                sidebarFloatingToggle.title = mapsExtended.i18n.msg("sidebar-hide-tooltip").plain();
                sidebarFloatingToggle.addEventListener("click", function()
                {
                    this.toggleSidebar();
                    
                    if (this.config.sidebarBehaviour == "autoInitial")
                        this.sidebar.autoShowHide = false;
                    
                }.bind(this));
                sidebarFloatingToggle.updateToggle = function(forceValue)
                {
                    sidebarFloatingToggle.classList.toggle("mapsExtended_sidebarFloatingToggleScrolled", forceValue != undefined ? forceValue : sidebarContent.scrollTop > 20);
                };
                sidebarContent.after(sidebarFloatingToggle);


                // Search

                // Create an element that will clear the search box when it is clicked
                var searchClearButton = document.createElement("div");
                searchClearButton.className = "mapsExtended_sidebarSearchClearButton";
                searchClearButton.style.display = "none";
                searchClearButton.addEventListener("click", function(e)
                {
                    searchBoxInput.value = "";
                    searchBoxInput.dispatchEvent(new Event("input"));
                    searchBoxInput.focus();
                    searchBoxInput.select();
                });

                // Create an element that sits over the input which is used to expand and collapse the results
                var searchDropdownButton = document.createElement("div");
                searchDropdownButton.className = "mapsExtended_sidebarSearchDropdownButton";
                var searchDropdownIcon;

                // Expose some variables so they can be hoisted by the function below
                var searchBoxInput = this.search.elements.searchBoxInput;
                var searchBoxHintContainer = this.search.elements.searchBoxHintContainer;
                var searchResultsList = this.search.elements.searchResultsList;
 
                searchDropdownButton.addEventListener("click", function(e)
                {
                    // Invert expanded state
                    sidebarSearchBody.expanded = !sidebarSearchBody.expanded;
                    var expanded = sidebarSearchBody.expanded;

                    // When search is expanded, the toggle that reveals the results list is shifted to the right
                    // When search is collapsed, the toggle covers the entire search input
                    searchDropdownButton.classList.toggle("expanded", expanded);
                    sidebarSearchBody.classList.toggle("expanded", expanded);

                    // Make sure the resizeObserver doesn't respond to changes while we're animating
                    sidebarSearchBody.ignoreAllResize = true;

                    sidebarSearchBody.style.height = sidebarSearchBody.clientHeight + "px";

                    if (expanded)
                    {
                        // Focus text box if expanded
                        searchBoxInput.focus();
                        searchBoxInput.select();

                        var idealExpandedHeight = sidebarSearchBody.calculateExpandedHeight();
                        var maxHeight = sidebarSearchBody.calculateMaxHeight();

                        // If the user has set a custom expanded height, snap it to the maxHeight if it's close enough
                        if (Math.abs(maxHeight - sidebarSearchBody.resizedExpandedHeight) <= 10)
                            sidebarSearchBody.resizedExpandedHeight = maxHeight;
                        
                        // The expanded height is either the one that has been set by the user, or the ideal height, but no less than the maxHeight
                        var toHeight = Math.min(sidebarSearchBody.resizedExpandedHeight || idealExpandedHeight, maxHeight) + "px";

                        sidebarSearchBody.style.maxHeight = maxHeight + "px";
                    }
                    else
                    {
                        // Reset minHeight
                        sidebarSearchBody.style.minHeight = sidebarSearchBody.style.maxHeight = "";

                        // Collapsed height is always 0
                        var toHeight = 0 + "px";
                    }
                    
                    if (!sidebarSearchBody.onTransitionEnd)
                    {
                        sidebarSearchBody.onTransitionEnd = function(e)
                        {
                            sidebarSearchBody.style.transition = "";
                            
                            if (sidebarSearchBody.expanded)
                            {
                                // Set min height programatically
                                var hintContainerStyle = window.getComputedStyle(searchBoxHintContainer);
                                var hintMarginTop = parseInt(hintContainerStyle["marginTop"] || 0);
                                var minHeight = searchBoxHintContainer.clientHeight + hintMarginTop + 1;
                                
                                sidebarSearchBody.minHeight = minHeight;
                                sidebarSearchBody.style.minHeight = minHeight + "px";
                            }
                            else
                            {
                                searchBoxInput.value = "";
                                
                                // Trigger input change event on searchBox after height transition has finished, in order to reset search
                                searchBoxInput.dispatchEvent(new Event("input", { bubbles: true }));
                            }

                            sidebarSearchBody.ignoreAllResize = false;
                            sidebarSearchBody.ignoreNextResize = true;
                        }
                        
                    }

                    requestAnimationFrame(function()
                    {
                        sidebarSearchBody.style.transition = "height 0.35s ease";
                        sidebarSearchBody.addEventListener("transitionend", sidebarSearchBody.onTransitionEnd, { once: true });
                        sidebarSearchBody.style.height = toHeight; 
                    });
                    
                    searchDropdownIcon.style.transform = "rotate(" + (expanded ? 180 : 360) + "deg)";
                    
                }.bind(this));

                // This triggers when the scrollHeight of the searchResultsList changes
                // which happens whenever a search is performed, or a category is collapsed
                searchResultsList.resizeObserver = new ResizeObserver(function(e)
                {
                    if (!sidebar.isShowing || !sidebarSearchBody.expanded) return;

                    // This flag is set to prevent overwriting our saved expandedHeight when setting the maxHeight
                    sidebarSearchBody.ignoreNextResize = true;

                    var searchResultsMaxHeight = (searchResultsList.scrollHeight + $(searchBoxHintContainer).outerHeight(true) + 2);

                    // Set the max height on the searchBody
                    if (this.search.lastSearch.results.length > 0)
                        sidebarSearchBody.style.maxHeight = searchResultsMaxHeight + "px";
                    else
                        sidebarSearchBody.style.maxHeight = Math.min(searchResultsMaxHeight, sidebarSearchBody.minHeight) + "px"
                    
                }.bind(this));

                // Disable resize when no results
                this.events.onSearchPerformed.subscribe(function(args)
                {
                    if (!sidebar.isShowing) return;

                    // Show the clear button if there is a search term present
                    searchClearButton.style.display = args.search.searchTerm.length > 0 ? "" : "none";
                    
                    // Show the resize handle if there are results, hide if there aren't
                    sidebarSearchBody.style.resize = args.search.results.length == 0 ? "none" : "";
                });

                // Create new element which will contain the results list
                var sidebarSearchBody = document.createElement("div");
                sidebarSearchBody.className = "mapsExtended_sidebarSearchBody";
                sidebarSearchBody.expanded = false;

                sidebarSearchBody.resizeObserver = new ResizeObserver(/*mw.util.debounce(200, */function(e)
                {
                    // Ignore this resize if the ignoreNextResize flag is set
                    if (sidebarSearchBody.ignoreNextResize || sidebarSearchBody.ignoreAllResize)
                    {
                        sidebarSearchBody.ignoreNextResize = false;
                        return;
                    }
                    
                    if (!sidebar.isShowing || !sidebarSearchBody.expanded) return;
                    
                    // Save the expanded size of the search body
                    sidebarSearchBody.resizedExpandedHeight = e[0].contentRect.height;
                });//);

                // This function returns a value that is the "ideal" expanded height
                sidebarSearchBody.calculateExpandedHeight = function()
                {
                    // Get top of sidebarSearchBody
                    var sidebarSearchBodyRect = sidebarSearchBody.getBoundingClientRect();

                    // Get bottom of sidebarRoot
                    var sidebarRootRect = sidebarRoot.getBoundingClientRect();

                    var categorySectionBodyRect = categorySectionBody.getBoundingClientRect();
                    var categorySectionBodyHeight = categorySectionBody.classList.contains("expanded") ? categorySectionBodyRect.height : 0;

                    // Add some offsets to keep the other buttons within view
                    // Toggle button height + toggle button margin + sidebar root padding bottom
                    var expandedHeight = (sidebarRootRect.bottom - sidebarSearchBodyRect.top) - (42 + 42 + 12 + 12 + 20) - categorySectionBodyHeight;

                    // If the resulting height is too small (< 400), add the categorySectionBody back onto the height
                    if (expandedHeight < 400) expandedHeight += categorySectionBodyHeight;

                    return expandedHeight;
                };

                // This function returns the maximum height of the contents of the searchBody
                sidebarSearchBody.calculateMaxHeight = function()
                {
                    var maxHeight = 1;

                    // Add margins of sidebarSearchBody
                    var styles = window.getComputedStyle(sidebarSearchBody);
                    maxHeight += ( parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0) )

                    // Add scrollHeight of each child of sidebarSearchBody
                    for (var i = 0; i < sidebarSearchBody.children.length; i++)
                    {
                        maxHeight += sidebarSearchBody.children[i].scrollHeight;
                    }

                    return maxHeight;
                }
                

                // Categories


                // Show all / hide all buttons
                var categoryToggleButtons = document.createElement("div");
                categoryToggleButtons.className = "mapsExtended_sidebarCategoryToggleButtons";

                var showAllButton = document.createElement("div");
                showAllButton.className = "mapsExtended_sidebarControl";
                showAllButton.textContent = mapsExtended.i18n.msg("sidebar-show-all-button").plain();
                showAllButton.addEventListener("click", function(e)
                {
                    for (var i = 0; i < this.categories.length; i++)
                        this.categories[i].toggle(true);
                }.bind(this));
                categoryToggleButtons.append(showAllButton);

                var hideAllButton = document.createElement("div");
                hideAllButton.className = "mapsExtended_sidebarControl";
                hideAllButton.textContent = mapsExtended.i18n.msg("sidebar-hide-all-button").plain();
                hideAllButton.addEventListener("click", function(e)
                {
                    for (var i = 0; i < this.categories.length; i++)
                        this.categories[i].toggle(false);
                }.bind(this));
                categoryToggleButtons.append(hideAllButton);
                sidebarContent.append(categoryToggleButtons);

                // Category section header
                var categorySectionHeader = document.createElement("div");
                categorySectionHeader.className = "mapsExtended_sidebarControl mapsExtended_sidebarCategorySectionHeader";
                categorySectionHeader.textContent = mapsExtended.i18n.msg("sidebar-categories-header").plain();
                sidebarContent.append(categorySectionHeader);

                categorySectionHeader.addEventListener("click", function(e)
                {
                    var value = categorySectionBody.classList.toggle("expanded");

                    // Rotate menuControlIcon
                    menuControlIcon.style.transform = "rotate(" + (value ? 180 : 360) + "deg)";
                    categorySectionBody.style.maxHeight = (value ? categorySectionBody.scrollHeight : 0) + "px";
                });

                // Category section body
                var categorySectionBody = document.createElement("div");
                categorySectionBody.className = "mapsExtended_sidebarCategorySectionBody expanded"
                sidebarContent.append(categorySectionBody);
                
                var menuControlIcon;
                mw.hook("dev.wds").add(function(wds)
                {
                    // Add a menu icon to the sidebarToggleButton
                    var menuIcon = wds.icon("menu-tiny");
                    sidebarToggleButton.appendChild(menuIcon);

                    var closeIcon = wds.icon("close-tiny");
                    sidebarFloatingToggle.appendChild(closeIcon.cloneNode(true));

                    // Add a foldout icon to the category header
                    menuControlIcon = wds.icon("menu-control-tiny");
                    menuControlIcon.style.marginLeft = "auto";
                    menuControlIcon.style.transform = "rotate(180deg)";
                    menuControlIcon.style.transition = "transform 0.35s ease";
                    categorySectionHeader.appendChild(menuControlIcon);

                    // Add a cross button to the searchClearButton
                    searchClearButton.appendChild(closeIcon.cloneNode(true));

                    // Add a foldout icon to the search box
                    searchDropdownIcon = menuControlIcon.cloneNode(true);
                    searchDropdownIcon.style.transform = "rotate(360deg)";
                    searchDropdownButton.appendChild(searchDropdownIcon);

                    // Add eye icons to show all and hide all buttons
                    var eyeIcon = wds.icon("eye-small");
                    eyeIcon.style.marginRight = "6px"
                    showAllButton.prepend(eyeIcon);

                    var eyeCrossedIcon = wds.icon("eye-crossed-small");
                    eyeCrossedIcon.style.marginRight = "6px"
                    hideAllButton.prepend(eyeCrossedIcon);
                });

                // If there are less than 10 categories, use a single column layout
                var useOneColumnLayout = this.categories.length <= 10;

                // This function creates the category toggles shown in the sidebar for a specific CategoryGroup
                var createCategoryGroup = function(categoryGroup, addToElement)
                {
                    var sidebarCategoryGroup = {};
                    sidebarCategoryGroup.elements = {};
                    sidebarCategoryGroup.label = categoryGroup.label;
                    sidebarCategoryGroup.categories = categoryGroup.categories;
                    sidebarCategoryGroup.categoryToggles = [];
                    
                    sidebar.categoryGroups = sidebar.categoryGroups || [];
                    sidebar.categoryGroups.push(sidebarCategoryGroup);
                    
                    var categoryContainer = document.createElement("div");
                    categoryContainer.className = "mapsExtended_sidebarCategory_container";
                    sidebarCategoryGroup.elements.categoryContainer = categoryContainer;

                    // Create a label for the category group
                    if (!categoryGroup.isRoot)
                    {
                        var categoryHeader = document.createElement("div");
                        categoryHeader.className = "mapsExtended_sidebarCategory_header";
                        sidebarCategoryGroup.elements.categoryHeader = categoryHeader;

                        // Build category group label by traversing parents and adding hyphen separator
                        var groupLabel = categoryGroup.label;
                        var parentGroup = categoryGroup.parentGroup;
                        while (parentGroup != undefined && parentGroup.isRoot == false)
                        {
                            groupLabel = parentGroup.label + " – " + groupLabel;
                            parentGroup = parentGroup.parentGroup;
                        }
                        
                        categoryHeader.textContent = groupLabel;
                        categoryContainer.append(categoryHeader);
                        sidebarCategoryGroup.labelWithPrefix = groupLabel;

                        // Prevent double click from selecting text
                        document.addEventListener("mousedown", function(e)
                        {
                            if (e.detail > 1) e.preventDefault();
                        }, false);

                        // Toggle all categories by clicking category header
                        categoryHeader.addEventListener("click", function(e)
                        {
                            // Hide if any are shown
                            var anyShown = this.categories.some(function(c) { return c.visible == true; });

                            // Perform the hiding/showing using the toggle function of ExtendedCategory
                            for (var i = 0; i < this.categories.length; i++)
                                this.categories[i].toggle(!anyShown)

                        }.bind(sidebarCategoryGroup));
                    }
                    else
                    {
                        var categoryHeader = document.createElement("div");
                        categoryHeader.className = "mapsExtended_sidebarCategory_header";
                        sidebarCategoryGroup.elements.categoryHeader = categoryHeader;
                        categoryContainer.append(categoryHeader);
                    }

                    // Create a list to hold each of the categories
                    var categoryList = document.createElement("div");
                    categoryList.className = "mapsExtended_sidebarCategory_list";
                    if (useOneColumnLayout == true) categoryList.style.columnCount = "1";
                    sidebarCategoryGroup.elements.categoryList = categoryList;
                    categoryContainer.append(categoryList);

                    // Create a new item for each of the categories in this group
                    for (var i = 0; i < categoryGroup.categories.length; i++)
                    {
                        var category = categoryGroup.categories[i];

                        var categoryNumMarkers = document.createElement("span");
                        categoryNumMarkers.textContent = category.markers.length.toString();

                        var categoryListItem = document.createElement("div");
                        categoryListItem.category = category;
                        categoryListItem.className = "mapsExtended_sidebarCategory_listItem";
                        categoryListItem.classList.toggle("hidden", !category.visible);
                        categoryListItem.append(category.elements.categoryIcon.cloneNode(true),
                                                category.elements.categoryLabel.cloneNode(true),
                                                categoryNumMarkers);

                        // Toggle specific category by clicking on item
                        categoryListItem.addEventListener("click", function(e)
                        {
                            var item = e.currentTarget;
                            item.category.toggle();
                        });

                        // Update the visual toggle state whenever the actual category visibility changes
                        category.onCategoryToggled.subscribe(function(value){ this.classList.toggle("hidden", !value); }.bind(categoryListItem));

                        categoryList.append(categoryListItem);
                        sidebarCategoryGroup.categoryToggles.push(categoryListItem);
                    }

                    categorySectionBody.append(categoryContainer);

                    // Create subgroups
                    for (var i = 0; i < categoryGroup.subgroups.length; i++)
                    {
                        var subgroup = categoryGroup.subgroups[i];
                        createCategoryGroup(subgroup, categoryContainer);
                    }

                    // This is used to nest subgroups
                    //addToElement.append(categoryContainer);
                };

                // Create category groups starting with the root
                createCategoryGroup(this.categoryGroups[0], categorySectionBody);

                // Finally, add the sidebar to the page
                sidebarWrapper.append(sidebarRoot);

                // Resize all categoryToggles to the closest multiple of 30
                var resizeCategoryToggles = function()
                {
                    for (var i = 0; i < this.sidebar.categoryGroups.length; i++)
                    {
                        for (var j = 0; j < this.sidebar.categoryGroups[i].categoryToggles.length; j++)
                        {
                            var categoryToggle = this.sidebar.categoryGroups[i].categoryToggles[j];
                            categoryToggle.style.height = "30px";
                            var d = Math.round(categoryToggle.scrollHeight / 30);
                            if (d > 1) categoryToggle.style.height = (30 *  d) + "px";
                        }
                    }

                    if (categorySectionBody.classList.contains(""))
                    categorySectionBody.style.maxHeight = categorySectionBody.scrollHeight + "px";
                    
                }.bind(this);
                
                // Save sidebar elements
                sidebar.elements.sidebarWrapper = sidebarWrapper;
                sidebar.elements.sidebarRoot = sidebarRoot;
                sidebar.elements.sidebarContent = sidebarContent;
                sidebar.elements.sidebarToggleButton = sidebarToggleButton;
                sidebar.elements.sidebarHeader = sidebarHeader;
                sidebar.elements.sidebarFloatingToggle = sidebarFloatingToggle;
                sidebar.elements.searchClearButton = searchClearButton;
                sidebar.elements.searchDropdownButton = searchDropdownButton;
                sidebar.elements.sidebarSearchBody = sidebarSearchBody;

                if (this.config.sidebarInitialState == "show" || (this.config.sidebarInitialState == "auto" && this.elements.mapModuleContainer.clientWidth >= 800))
                    this.toggleSidebar(true, true);
                else
                    this.toggleSidebar(false, true);
            },

            // Toggles the sidebar elements
            toggleSidebar: function(value, noAnimation)
            {
                // If value isn't passed, just invert sidebar.isShowing
                value = value != undefined ? value : !this.sidebar.isShowing;

                // Set sidebar.isShowing to the new value
                this.sidebar.isShowing = value;

                var leafletMapPane = this.elements.leafletMapPane;

                // Search elements
                var searchRoot = this.search.elements.searchRoot;
                var searchDropdown = this.search.elements.searchDropdown;
                var searchResultsList = this.search.elements.searchResultsList;
                var searchBox = this.search.elements.searchBox;
                var searchBoxInput = this.search.elements.searchBoxInput;
                var searchBoxHintContainer = this.search.elements.searchBoxHintContainer;

                // Sidebar elements
                var sidebarRoot = this.sidebar.elements.sidebarRoot;
                var sidebarWrapper = this.sidebar.elements.sidebarWrapper;
                var sidebarHeader = this.sidebar.elements.sidebarHeader;
                var sidebarToggleButton = this.sidebar.elements.sidebarToggleButton;
                var sidebarSearchBody = this.sidebar.elements.sidebarSearchBody;
                var searchClearButton = this.sidebar.elements.searchClearButton;
                var searchDropdownButton = this.sidebar.elements.searchDropdownButton;

                sidebarToggleButton.title = mapsExtended.i18n.msg(value ? "sidebar-hide-tooltip" : "sidebar-show-tooltip").plain();
                
                this.elements.filtersDropdown.classList.toggle("disabled", value);
                searchDropdown.classList.toggle("disabled", value);

                // Toggles and not animating
                if (!this.sidebar.isAnimating)
                {
                    this.sidebar.isAnimating = true;

                    // Create an element to test the width of the sidebar when it's fully expanded
                    // (without actually expanding it)
                    var sidebarWrapperWidthTest = this.sidebar.elements.sidebarWrapperWidthTest;
                    if (!sidebarWrapperWidthTest)
                    {
                        sidebarWrapperWidthTest = document.createElement("div");
                        sidebarWrapperWidthTest.className = sidebarWrapper.className;
                        sidebarWrapperWidthTest.classList.add("expanded");
                        sidebarWrapperWidthTest.style.display = "none";
                        this.sidebar.elements.sidebarWrapperWidthTest = sidebarWrapperWidthTest;
                    }
                    
                    sidebarWrapper.after(sidebarWrapperWidthTest);
                    var sidebarWidth = parseInt(window.getComputedStyle(sidebarWrapperWidthTest).minWidth || 0);
                    //var sidebarWidth = sidebarRoot.offsetWidth + (sidebarRoot.offsetWidth - sidebarRoot.clientWidth);
                    var sidebarHalfWidth = sidebarWidth / 2;
                    sidebarWrapperWidthTest.remove();

                    // Show sidebar elements
                    if (value == true) toggleSidebarElements(true);

                    var jqueryStartPos = $(leafletMapPane).position();
                    var startPos = this.sidebar._mapPaneStartPos = [ jqueryStartPos.left, jqueryStartPos.top ];//this.getElementTransformPos(leafletMapPane, true);
                    var endPos = this.sidebar._mapPaneEndPos = [ startPos[0] + (value ? -sidebarHalfWidth : sidebarHalfWidth), startPos[1] ];

                    if (noAnimation)
                    {
                        this.sidebar.isAnimating = false;
                        if (value == false) toggleSidebarElements(false);
                    }
                    else
                    {
                        // Set transition properties
                        leafletMapPane.style.transition = "transform 0.35s ease";
                        sidebarWrapper.style.transition = "min-width 0.35s ease";
                        sidebarRoot.style.transition = "transform 0.35s ease";
                        
                        sidebarRoot.addEventListener("transitionend", function onTransitionEnd(e)
                        {
                            if (!(e.propertyName == "transform" && e.target == sidebarRoot)) return;

                            // Remove callback
                            e.currentTarget.removeEventListener("transitionend", onTransitionEnd);

                            // Remove transition
                            leafletMapPane.style.transition =
                            sidebarWrapper.style.transition = 
                            sidebarRoot.style.transition = "";
    
                            // Remove supporting data
                            this.sidebar._mapPaneStartPos = this.sidebar._mapPaneEndPos = this.sidebar._onTransitionEnd = undefined;
    
                            // Hide sidebar elements
                            if (this.sidebar.isShowing == false) toggleSidebarElements(false);
                            
                            this.sidebar.isAnimating = false;
                        }.bind(this));
                    }
                }

                // Toggled while already animating
                else
                {
                    // Reverse start and end pos
                    var startPos = this.sidebar._mapPaneEndPos;
                    var endPos = this.sidebar._mapPaneStartPos;
                    this.sidebar._mapPaneStartPos = startPos;
                    this.sidebar._mapPaneEndPos = endPos;
                }

                requestAnimationFrame(function()
                {
                    // Immediately toggle wrapper expanded. Most of the actual transitioning occurs in CSS.
                    sidebarWrapper.classList.toggle("expanded", value);
    
                    // Offsets the map pan transform while the map width is changing (as a result of the sidebar growing)
                    // This is done so that the transform doesn't snap after the fact, which can be distracting
                    leafletMapPane.style.transform = "translate3d(" + endPos[0] + "px, " + endPos[1] + "px, 0px)";
                });

                // Only set the following if we're not animating
                if (!this.sidebar.isAnimating)
                {
                    /*
                    var widthChanged = (value ? sidebarWidth : 0) + "px" != sidebarWrapper.style.minWidth;
                    
                    // Change the min-width of the sidebarWrapper
                    sidebarWrapper.style.minWidth = (value ? sidebarWidth : 0) + "px";

                    if (widthChanged == true)
                    {
                        // Change the min-width of the sidebarWrapper
                        var startPos = this.getElementTransformPos(this.elements.leafletMapPane, true);
                        var endPos = [ startPos[0] + (value ? -sidebarHalfWidth : sidebarHalfWidth), startPos[1] ];
                        this.elements.leafletMapPane.style.transform = "translate3d(" + endPos[0] + "px, " + endPos[1] + "px, 0px)";
                    }
    
                    // Change the transform of the sidebarRoot
                    sidebarRoot.style.transform = "translateX(" + (value ? 0 : -sidebarWidth) + "px)";
                    */
                }

                function toggleSidebarElements(value)
                {
                    if (value)
                    {
                        // Move the search box to the sidebar
                        searchBox.classList.remove("mapsExtended_searchBox");
                        searchBox.classList.add("has-hint");
                        searchBox.classList.add("mapsExtended_sidebarSearchBox");
                        sidebarHeader.after(searchBox);
    
                        // Add sidebar control class to search input
                        searchBoxInput.classList.add("mapsExtended_sidebarControl");
    
                        // Add searchClearButton to searchBoxInput
                        searchBoxInput.after(searchClearButton);
    
                        // Add searchDropdownButton to searchBoxInput
                        searchBoxInput.after(searchDropdownButton);
    
                        // Move searchBoxHintContainer to sidebarSearchBody
                        sidebarSearchBody.appendChild(searchBoxHintContainer);
    
                        // Move the searchResultsList to the searchBox
                        searchResultsList.classList.add("mapsExtended_sidebarSearchResults");
                        sidebarSearchBody.appendChild(searchResultsList);
    
                        // Append the searchBody to the searchBox
                        searchBox.appendChild(sidebarSearchBody);

                        sidebarRoot.resizeObserver.observe(sidebarRoot);
                        
                        for (var i = 0; i < searchResultsList.children.length; i++)
                            searchResultsList.resizeObserver.observe(searchResultsList.children[i]);
                        
                        sidebarSearchBody.resizeObserver.observe(sidebarSearchBody);
                    }
                    else
                    {
                        // Move the search box to searchRoot
                        searchBox.classList.add("mapsExtended_searchBox");
                        searchBox.classList.add("has-hint");
                        searchBox.classList.remove("mapsExtended_sidebarSearchBox");
                        searchRoot.append(searchBox);
    
                        // Remove sidebar control class from search input
                        searchBoxInput.classList.remove("mapsExtended_sidebarControl");
    
                        // Move searchBoxHintContainer to the searchBox
                        searchBox.appendChild(searchBoxHintContainer);
    
                        // Move the searchResultsList to the searchRoot
                        searchResultsList.classList.remove("mapsExtended_sidebarSearchResults");
                        searchRoot.appendChild(searchResultsList);
                        
                        // Remove the searchBody, searchClearButton, and searchDropdownButton from the DOM
                        sidebarSearchBody.remove();
                        searchClearButton.remove();
                        searchDropdownButton.remove();
                        
                        sidebarRoot.resizeObserver.disconnect();
                        searchResultsList.resizeObserver.disconnect();
                        sidebarSearchBody.resizeObserver.disconnect();
                    }
                }
            },

            // Collectibles

            hasCollectibles: false,

            // Called on each of the maps to set up collectibles
            initCollectibles: function()
            {
                var map = this;
                
                // Set up the checked summary on each of the collectible category labels
                for (var i = 0; i < this.categories.length; i++)
                {
                    var category = this.categories[i];

                    // Collectible categories are those whose ID's end with __c or __ch or __hc
                    // or categories included in the collectibleCategories array in the map config
                    // or categories where the custom property "collectible" is true
                    category.collectible = category.hints.includes("collectible")
                                        || (Array.isArray(this.config.collectibleCategories) && this.config.collectibleCategories.includes(category.id))
                                        || category.collectible;
                    
                    if (!category.collectible)
                        continue;

                    this.hasCollectibles = true;

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
                }

                // Skip this map if there are no collectibles
                if (this.hasCollectibles == false) return;

                this.elements.filtersDropdownList.style.paddingBottom = "0";
                this.elements.filtersDropdownList.style.maxHeight = "none";

                // Add a "Clear collected" button to the filter box
                var clearButton = document.createElement("a");
                clearButton.className = "mapsExtended_collectibleClearButton";
                clearButton.textContent = mapsExtended.i18n.msg("clear-collected-button").plain();
                this.elements.clearCollectedButton = clearButton;
                this.elements.filtersDropdownList.after(clearButton);
                
                // When BannerNotifications is loaded, 
                mw.hook("dev.banners").add(function(banners)
                {
                    map.elements.collectedMessageBanner = new BannerNotification("", "confirm", null, 5000);

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
                
                // Load collected states from localStorage
                this.loadCollectedStates();

                // Update the collected labels to reflect the collected states
                this.categories.forEach(function(c) { c.updateCollectedLabel(); });

                // Events

                // Update all collected labels and nudge collected states when the map is refreshed
                this.events.onMapInit.subscribe(function(args)
                {
                    // Nudge collected states
                    args.map.nudgeCollectedStates();

                    // Update labels
                    args.map.categories.forEach(function(c) { c.updateCollectedLabel(); });
                });

                // New marker shown - Set it's collected state to itself update the marker opacity
                this.events.onMarkerShown.subscribe(function(args)
                {
                    args.marker.setMarkerCollected(args.marker.collected, true);
                });

                // New popup created
                this.events.onPopupCreated.subscribe(function(args)
                {
                    var marker = args.marker;
                    var map = args.map;
                    var category = map.categoryLookup.get(marker.categoryId);
                    
                    // Check if the marker that triggered this popup is a collectible one
                    if (category.collectible == true)
                    {
                        // Stop observing popup changes while we change the subtree of the popup
                        map.togglePopupObserver(false);

                        // Remove any old checkboxes (this can happen with live preview)
                        var oldCheckbox = marker.popup.elements.popupTitle.querySelector(".wds-checkbox");
                        if (oldCheckbox) oldCheckbox.remove();
                        
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
                            if (e.currentTarget.marker)
                                e.currentTarget.marker.setMarkerCollected(e.currentTarget.checked, false, true, true);
                        });
                
                        map.togglePopupObserver(true);
                    }
                });

                // Marker clicked - Toggle collected state on control-click
                this.events.onMarkerClicked.subscribe(function(args)
                {
                    // Check if click was control-click
                    if (args.event.ctrlKey == true || args.event.metaKey == true)
                    {
                        // Invert collected state on marker
                        args.marker.setMarkerCollected(!args.marker.collected, true, true, true);

                        // Don't open the popup with a control-click
                        args.event.stopPropagation();
                    }
                });

                // Save collected states when the tab loses focus
                window.addEventListener("beforeunload", function(e)
                {
                    mapsExtended.maps.forEach(function(map)
                    {
                        if (map.hasCollectibles)
                            map.saveCollectedStates();
                    });
                });
            },

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
                return mw.config.get("wgDBname") + "_" + this.name.replaceAll(" ", "_") + "_collected";
            },

            // Trigger the collected setter on all markers to update their opacity
            nudgeCollectedStates: function()
            {
                for (var i = 0; i < this.categories.length; i++)
                {
                    if (!this.categories[i].collectible)
                        continue;

                    for (var j = 0; j < this.categories[i].markers.length; j++)
                        this.categories[i].markers[j].setMarkerCollected(this.categories[i].markers[j].collected, true, false, false);
                    
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
                        this.categories[i].markers[j].setMarkerCollected(false, true, false, false);

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
                //localStorage.setItem(storageKey, JSON.stringify(collectedMarkers));
                
                // Use the mw.storage API instead of using localStorage directly, because of its expiry feature
                mw.storage.set(storageKey, JSON.stringify(collectedMarkers), this.config.collectibleExpiryTime == -1 ? undefined : this.config.collectibleExpiryTime);
            },
        
            // Fetch the collected state data from localStorage and set the "collected" bool on each marker that is collected
            loadCollectedStates: function()
            {
                var storageKey = this.getStorageKey();
                var stateJson = mw.storage.get(storageKey) || "[]";
                var stateData = JSON.parse(stateJson);
        
                for (var i = 0; i < stateData.length; i++)
                {
                    if (this.markerLookup.has(stateData[i]))
                    {
                        var marker = this.markerLookup.get(stateData[i]);
        
                        // Ensure that this marker is a collectible one
                        if (marker && marker.category.collectible == true)
                            marker.setMarkerCollected(true, true, false, false);
                    }
                }

                this.resetCollectedStateExpiry();
            },

            // Resets the timer on the expiry of collected states
            resetCollectedStateExpiry: function()
            {
                if (!mw.storage.setExpires) return;
                
                var storageKey = this.getStorageKey();

                // Clear expiry time with a collectibleExpiryTime of -1
                if (this.config.collectibleExpiryTime == -1)
                    mw.storage.setExpires(storageKey);
                else
                    mw.storage.setExpires(storageKey, this.config.collectibleExpiryTime);
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

                // Remove original "Select all" checkbox
                var selectAllFilterElement = this.elements.filterAllCheckboxInput.closest(".interactive-maps__filter-all");
                var selectAllLabelText = this.elements.filterAllCheckboxInput.nextElementSibling.textContent;
                selectAllFilterElement.remove();
                
                // If there are no category groups, or if the object is not an array
                // just map the categories directly so that all categories are at the root
                if (!this.config.categoryGroups || !Array.isArray(this.config.categoryGroups))
                    this.config.categoryGroups = this.categories.map(function(c){ return c.id; });

                // Move categoryGroups from config to this
                
                // To simplify the hierarchical structure, create a brand new root "Select all" group
                // the children of which is the elements of categoryGroups
                this.categoryGroups =
                [
                    {
                        label: selectAllLabelText,
                        children: structuredClone(this.config.categoryGroups),
                        map: this
                    }
                ]

                // Do some pre-processing on categoryGroups to remove invalid groups
                var preprocessGroup = function(group)
                {
                    // Group must have a label
                    if (!group.label || typeof group.label != "string")
                    {
                        log("Category group with the children " + group.children + " does not have a label!");
                        return false;
                    }

                    // Group must have children
                    if (!group.children || !Array.isArray(group.children) || group.children.length == 0)
                        return false;

                    group.categories = [];
                    group.allCategories = [];
                    group.subgroups = [];
                    group.allSubgroups = [];
                    
                    // Process children, and remove invalid entries
                    for (var i = 0; i < group.children.length; i++)
                    {
                        var c = group.children[i];

                        // Child is category ID
                        if (typeof c == "string")
                        {
                            if (this.categoryLookup.has(c))
                            {
                                group.children[i] = this.categoryLookup.get(c);
                                group.categories.push(group.children[i]);
                                group.allCategories.push(group.children[i]);
                            }
                            else
                            {
                                log("A category with the ID \"" + c + "\" defined in the category group \"" + group.label + "\" does not exist!");
                                c = null;
                            }
                        }

                        // Child is nested group
                        else if (typeof c == "object")
                        {
                            if (preprocessGroup(c))
                            {
                                group.subgroups.push(c);
                                group.allSubgroups.push(c);

                                // If nested group has groups, add them to allSubgroups
                                if (c.allSubgroups.length > 0)
                                {
                                    for (var j = 0; j < c.allSubgroups.length; j++)
                                        group.allSubgroups.push(c.allSubgroups[j]);
                                }

                                // If nested group has categories, add them to allCategories
                                if (c.allCategories.length > 0)
                                {
                                    for (var j = 0; j < c.allCategories.length; j++)
                                        group.allCategories.push(c.allCategories[j]);
                                }
                            }
                            else
                            {
                                console.log("Category group \"" + (c.label || "undefined") + "\" was invalid and will be removed");
                                c = null;
                            }
                        }

                        // c is set to null if the child is invalid
                        if (c == null)
                        {
                            group.children.splice(i, 1);
                            i--;
                        }
                    }

                    // The group still has children, it's valid
                    return group.children.length > 0;

                }.bind(this);

                preprocessGroup(this.categoryGroups[0]);

                // Finally actually create the CategoryGroups out of the definition (they will be created recursively in the ctor)
                var rootGroup = this.categoryGroups[0] = new CategoryGroup(this.categoryGroups[0]);
                var categoryGroupTree = rootGroup.flattenedGroups;
                categoryGroupTree[rootGroup.id] = rootGroup;
                
                // Use filter() to get a list of category matching the predicate
                // In this case, all categories that have not been assigned to any of the
                // category groups at any level in the hierarchy
                var ungroupedCategories = this.categories.filter(function(c)
                {
                    // Don't include disabled categories
                    if (c.startDisabled == true) return false;
                    
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
                        rootGroup.addCategoryToGroupById(uc.id);
                        rootGroup.children.push(uc);
                    });

                    // Update the checked visual state
                    rootGroup.updateCheckedVisualState();
                }

                // Resize the searchRoot to be a bit less than the height of the root map container
                this.elements.filtersDropdownContent.style.maxHeight = (this.elements.rootElement.clientHeight - 35) + "px";

                // Add a listener which changes the min height of the search box when it is opened
                this.elements.filtersDropdownButton.addEventListener("mouseenter", function(e)
                {
                    // Resize the list to be a bit less than the height of the root map container
                    this.elements.filtersDropdownContent.style.maxHeight = (this.elements.rootElement.clientHeight - (this.isFullscreen || this.isWindowedFullscreen || this.isMinimalLayout ? 60 : 35)) + "px";
                    
                }.bind(this));

                this.elements.filtersDropdownList.addEventListener("scroll", OO.ui.throttle(function(e)
                {
                    var scroll = e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight);
                    e.target.classList.toggle("can-scroll-up", scroll > 0.02);
                    e.target.classList.toggle("can-scroll-down", scroll < 0.98);
                }, 150), { passive: true });
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

            this.categories = this.categories || [];
            this.subgroups = this.subgroups || [];
            this.allCategories = this.allCategories || [];
            this.allSubgroups = this.allSubgroups || [];
            
            this.flattenedGroups = {};
            this.checkboxes = [];
            this.elements = this.elements || {};
            
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
            for (var i = 0; i < this.children.length; i++)
            {
                if (typeof this.children[i] == "object")
                {
                    // Child is category
                    if (this.children[i] instanceof ExtendedCategory)
                        this.addCategoryToGroup(this.children[i])

                    // Child is subgroup (we can trust that any other object is a subgroup because of the preprocessing)
                    else
                        this.children[i] = this.addSubgroupToGroup(this.children[i]);
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
                var collapsed = !this.collapsed;
                this.collapsed = collapsed;

                if (collapsed == false)
                {
                    containerElem.style.width = "";
                    containerElem.style.maxHeight = this.expandedHeight + "px";
                    headerArrow.textContent = "▼";
                }
                else
                {
                    containerElem.style.maxHeight = "0px";
                    headerArrow.textContent = "▲";

                    containerElem.addEventListener("transitionend", function(e)
                    {
                        if (e.propertyName != "max-height") return;
                        containerElem.style.width = collapsed ? "0" : "";
                    }, { once: true });
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
                this.categoryGroups.forEach(function(cg)
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
            // Adds an ExtendedCategory to this group
            addCategoryToGroup: function(category)
            {
                if (!this.categories.includes(category)) this.categories.push(category);
                if (!this.allCategories.includes(category)) this.allCategories.push(category);
                
                this.elements.container.appendChild(category.elements.filter);
                this.registerCheckbox(category.elements.checkboxInput);

                return category;
            },

            // Adds a category to this group, given a category ID
            addCategoryToGroupById: function(categoryId)
            {
                var category = this.map.categoryLookup.get(categoryId);
                    
                if (!category)
                {
                    log("A category with the ID \"" + categoryId + "\" defined in the category group \"" + this.label + "\" does not exist!");
                    return;
                }

                return this.addCategoryToGroup(category);
            },

            // Adds a subgroup to this group, given a group definition (see docs)
            // A group definition is an object containing { label, children } at least
            addSubgroupToGroup: function(group)
            {
                var childGroup = new CategoryGroup(group, this);
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
                
                this.elements.container.style.width = (this.collapsed && this.collapsible) ? "0" : "";

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

            // Calculate some of the values needed to determine icon anchors
            if (this.icon) this.calculateCustomIconAnchor();

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

            // Set up an event that will be fired when the toggle state of this category changes
            this.onCategoryToggled = new EventHandler();

            this.elements = {};
        }

        ExtendedCategory.prototype =
        {
            toggle: function(value)
            {
                value = value != undefined ? value : !this.visible;

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
                this.elements.categoryIcon = this.elements.checkboxLabel.querySelector(".interactive-maps__filters-marker-icon");
                this.elements.categoryIconImg = this.elements.categoryIcon.querySelector("img");
                this.elements.categoryLabel = this.elements.checkboxLabel.querySelector("span:last-child");

                if (this.icon) this.icon.img = this.elements.categoryIconImg;

                // Set some values on the filter element itself
                filterElement.category = this;
                filterElement.id = "filter_" + this.id;

                // Subscribe to the change event on the checkbox input to update the visible bool, and invoke a toggled event
                this.elements.checkboxInput.addEventListener("change", function(e)
                {
                    this.visible = e.target.checked;
                    this.map.events.onCategoryToggled.invoke({ map: this.map, category: this, value: e.target.checked });
                    this.onCategoryToggled.invoke(e.target.checked);
                    
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
            },

            // Calculate the anchor styles and scaled size of an icon (in this case, an icon definition in either the category or marker)
            // and add them in-place (adds scaledWidth and anchorStyles)
            calculateCustomIconAnchor: function()
            {
                if (!this.icon) return;

                // Cache the width and the height of the icon in scaled units (where markers have to fit into a box of 26px)
                var ratio = Math.min(26 / this.icon.width, 26 / this.icon.height);
                this.icon.scaledWidth = this.icon.width * ratio;
                this.icon.scaledHeight = this.icon.height * ratio;

                // Cache the styles that will be used to anchor icons on this category
                this.icon.anchorStyles = {};
                
                // Vertical portion of iconAnchor
                if (this.map.config.iconAnchor.startsWith("top"))         this.icon.anchorStyles["margin-top"] = "0px";
                else if (this.map.config.iconAnchor.startsWith("center")) this.icon.anchorStyles["margin-top"] = "-" + (this.icon.scaledHeight * 0.5) + "px";
                else if (this.map.config.iconAnchor.startsWith("bottom")) this.icon.anchorStyles["margin-top"] = "-" + (this.icon.scaledHeight * 1.0) + "px";
                else console.error("Invalid vertical iconAnchor config! Should be one of: top, center, bottom");

                // Horizontal portion of iconAnchor
                if (this.map.config.iconAnchor.endsWith("left"))        this.icon.anchorStyles["margin-left"] = "0px";
                else if (this.map.config.iconAnchor.endsWith("center")) this.icon.anchorStyles["margin-left"] = "-" + (this.icon.scaledWidth * 0.5) + "px";
                else if (this.map.config.iconAnchor.endsWith("right"))  this.icon.anchorStyles["margin-left"] = "-" + (this.icon.scaledWidth * 1.0) + "px";
                else console.error("Invalid horizontal iconAnchor config! Should be one of: left, center, right");
            },

            // Collectibles
            
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
                    if (this.elements.categoryIcon) this.elements.categoryIcon.style.alignSelf = "flex-start";
        
                    var categoryLabel = this.elements.categoryLabel;
        
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

            clearAllCollected: function(){ this.setAllCollected(false); },
            markAllCollected: function(){ this.setAllCollected(true); },

            setAllCollected: function(state)
            {
                for (var j = 0; j < this.markers.length; j++)
                    this.markers[j].setMarkerCollected(state, true, false, true);

                // Update label
                this.updateCollectedLabel();
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
            if (!this.id )
            {
                this.id = generateRandomString(8);
                this.usesNewId = true;
            }

            // Warn if there already exists a marker with this ID
            if (map.markerLookup.has(this.id))
            {
                var newId = this.id + "_" + generateRandomString(8);
                console.error("Multiple markers exist with the id " + this.id + "! Renamed to " + newId);
                this.id = newId;
                this.usesNewId = true;
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

            // Cache the width and the height of the icon in scaled units (where markers have to fit into a box of 26px)
            if (this.icon) ExtendedCategory.prototype.calculateCustomIconAnchor.call(this);

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
                markerElement.style.zIndex = this.order.toString();

                this.width = this.icon && this.icon.scaledWidth || this.category.icon && this.category.icon.scaledWidth || this.markerElement.clientWidth;
                this.height = this.icon && this.icon.scaledHeight || this.category.icon && this.category.icon.scaledHeight || this.markerElement.clientHeight;

                // Update the iconAnchor if this is a custom marker
                if (this.usesCustomIcon())
                {
                    // Get anchor styles from this icon if it exists, or the category icon
                    var anchorStyles = this.icon && this.icon.anchorStyles || this.category.icon && this.category.icon.anchorStyles || undefined;

                    if (anchorStyles)
                    {
                        for (var key in anchorStyles) markerElement.style[key] = anchorStyles[key];
                        markerElement.classList.add("uses-icon-anchor");
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
                if (this.map.config.useCustomPopups == true)
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

                if (this.map.config.useCustomPopups == true)
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

                // Short-circuit of the element already has an associated marker
                if (markerElem.marker != undefined && markerElem.marker != markerJson)
                    return false;

                // Valid if these two are already associated
                if (markerJson.markerElement == markerElem && markerJson.id == markerElem.id)
                    return true;
                
                // ID-based hint
                var markerElemId = this.getMarkerId(markerElem);
                var markerJsonId = this.getMarkerId(markerJson);
                
                // Sanity check to see if at least the ids match (id may NOT be present on all marker elements)
                // No match if the id is present on both, but differs
                if (markerElemId && markerJsonId && markerElemId != markerJsonId && !markerJson.usesNewId)
                    return false;

                // Color-based hint
                var markerElemColor = this.getMarkerColor(markerElem);
                var markerJsonColor = this.getMarkerColor(markerJson);
                
                // Sanity check to see if at least the colors match (color may NOT be present on all marker elements)
                // No match if the color is present on both, but differs
                if (markerElemColor && markerJsonColor && markerElemColor != markerJsonColor)
                    return false;

                // Icon-based hint
                var markerElemIcon = this.getMarkerIcon(markerElem, true);
                var markerJsonIcon = this.getMarkerIcon(markerJson, true);
                
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

            // Returns true if the marker uses a custom icon (either from the marker itself, or the category it belongs to)
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

                        if (img && img.src)
                        {
                            var url = new URL(img.src);

                            // Remove all parameters (excluding cb cachebuster param)
                            if (url.searchParams.has("cb") != null && url.searchParams.size > 1)
                                url.search = "?cb=" + url.searchParams.get("cb");
                            else
                                url.search = "";
                            
                            url = url.toString();
                                
                            // Cache the marker icon in the element object so we don't have to re-retrieve it
                            marker.icon = { url: url };

                            // Fetch the file name using the URL
                            var stripIndex = marker.icon.url.indexOf("/revision/");
                            marker.icon.title = marker.icon.url.substring(0, stripIndex);
                            var lastSlashIndex = marker.icon.title.lastIndexOf("/");
                            marker.icon.title = marker.icon.title.substring(lastSlashIndex + 1);

                            // Decode URL-escaped characters
                            marker.icon.title = decodeURIComponent(marker.icon.title);
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
                            if (!icon.fileName)
                            {
                                // Remove any file: prefix (the comparing src attribute will never have this)
                                // Convert any spaces to underscores
                                icon.fileName = icon.title.replace("file:", "").replace("File:", "").replace(/\s/g, "_");
                                
                                // Ensure that the first letter is upper case (the img src will always be)
                                icon.fileName = icon.fileName.charAt(0).toUpperCase() + icon.fileName.slice(1);
                            }
    
                            return icon.fileName;
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
            // This is pixel position adjusted to the current map zoom level
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
                    var baseLayerPos = this.map.getElementTransformPos(this.map.elements.leafletBaseImageLayer);

                    // Subtract the current position of the map overlay from the marker position to get the scaled position
                    pos = this.map.getElementTransformPos(marker);
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
                var str = "" + marker.position[0] + marker.position[1] + marker.popup.title + marker.popup.description + (marker.popup.link != undefined ? marker.popup.link.url + marker.popup.link.label : "");

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

            // Collectibles

            collected: false,

            // Sets the collected state of the marker.
            // This should be called instead of setting collected directly and is called
            // by user interactions, as well as on clear and initial load
            setMarkerCollected: function(state, updatePopup, updateLabel, canShowBanner)
            {
                // Don't try to collect markers that aren't collectible
                if (!this.category.collectible) return;

                state = state || false;
                
                // Set the collected state on the marker
                this.collected = state;

                if (this.markerElement)
                {
                    // Set the marker collected style using a class rather than an inline attribute
                    // This is required because with clustered markers, the opacity is overridden as part of the zoom animation on EVERY marker
                    this.markerElement.classList.toggle("mapsExtended_collectedMarker", state);
                }

                // Set the collected state on the connected popup (if shown)
                // This does not trigger the checked change event
                if (updatePopup && this.popup.isPopupShown())
                {
                    var checkbox = this.popup.elements.popupCollectedCheckbox;
                    checkbox.checked = state;
                }

                // Update the collected label
                if (updateLabel) this.category.updateCollectedLabel();

                // Show a congratulatory banner if all collectibles were collected
                if (canShowBanner && this.map.config.enableCollectedAllNotification && state == true)
                {
                    // Check if all were collected
                    var numCollected = this.category.getNumCollected();
                    var numTotal = this.category.markers.length;
                    
                    // Show a banner informing the user that they've collected all markers
                    if (numCollected == numTotal)
                    {
                        var msg = mapsExtended.i18n.msg("collected-all-banner", numCollected, numTotal, this.category.name, this.map.getMapLink()).plain();
                        this.map.elements.collectedMessageBanner.setContent(msg);
                        this.map.elements.collectedMessageBanner.show();
                    }
                }
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
            
                // Override the existing popupElement
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

                this.wrapPopupImages();
                
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
                        popupElement.style.marginBottom = ((this.marker.height * 0.0) + 9 + 4) + "px"; // (0% of icon height) + 9 (popup tip) + 4 (gap)
                    else if (this.marker.iconAnchor.startsWith("center"))
                        popupElement.style.marginBottom = ((this.marker.height * 0.5) + 9 + 4) + "px"; // (50% of icon height) + 9 (popup tip) + 4 (gap)
                    else if (this.marker.iconAnchor.startsWith("bottom"))
                        popupElement.style.marginBottom = ((this.marker.height * 1.0) + 9 + 4) + "px"; // (100% of icon height) + 9 (popup tip) + 4 (gap)

                    // Horizontal offset
                    if (this.marker.iconAnchor.endsWith("left"))
                        popupElement.style.marginLeft = (this.marker.width * 0.5) + "px";
                    if (this.marker.iconAnchor.endsWith("center"))
                        popupElement.style.marginLeft = (this.marker.width * 0.0) + "px";
                    if (this.marker.iconAnchor.endsWith("right"))
                        popupElement.style.marginLeft = (this.marker.width * -0.5) + "px";
                }
                else
                {
                    // Leaflet uses a bottom and left position of 7px and -152px, which is forced every time the popup is shown.
                    // This means we have to add these offsets to the margins in order to obtain our desired position
                    popupElement.style.marginLeft = "2px";

                    // Vertical offset
                    if (this.marker.iconAnchor.startsWith("top"))
                        popupElement.style.marginBottom = ((this.marker.height * -1.0) + 9 + 4 + 7) + "px"; // -26 (negate full icon height) + 9 (popup tip) + 4 (gap) + 7 (negate bottom)
                    else if (this.marker.iconAnchor.startsWith("center"))
                        popupElement.style.marginBottom = ((this.marker.height * -0.5) + 9 + 4 + 7) + "px"; // -13 (negate half icon height) + 9 (popup tip) + 4 (gap)  + 7 (negate bottom)
                    else if (this.marker.iconAnchor.startsWith("bottom"))
                        popupElement.style.marginBottom = ((this.marker.height * 0.0) + 9 + 4 + 7) + "px"; // 0 (keep icon height) + 9 (popup tip) + 4 (gap) + 7 (negate bottom)
                    
                    // Horizontal offset (same as above but adds 2px)
                    if (this.marker.iconAnchor.endsWith("left"))
                        popupElement.style.marginLeft = ((this.marker.width * 0.5) + 2) + "px";
                    if (this.marker.iconAnchor.endsWith("center"))
                        popupElement.style.marginLeft = ((this.marker.width * 0.0) + 2) + "px";
                    if (this.marker.iconAnchor.endsWith("right"))
                        popupElement.style.marginLeft = ((this.marker.width * -0.5) + 2) + "px";
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
                customPopup.className = "leaflet-popup leaflet-zoom-animated mapsExtended_customPopup";
                customPopup.style.cssText = "opacity: 1; bottom: 0; left: -150px;";

                // This is the maximum required HTML for a popup
                customPopup.innerHTML = "<div class=\"leaflet-popup-content-wrapper\"><div class=\"leaflet-popup-content\" style=\"width: 301px;\"><div class=\"MarkerPopup-module_popup__eNi--\"><div class=\"MarkerPopup-module_content__9zoQq\"><div class=\"MarkerPopup-module_contentTopContainer__qgen9\"><div class=\"MarkerPopup-module_title__7ziRt\"><!-- Title --></div><div class=\"MarkerPopup-module_actionsContainer__q-GB8\"><div class=\"wds-dropdown MarkerPopupActions-module_actionsDropdown__Aq3A2\"><div class=\"wds-dropdown__toggle MarkerPopupActions-module_actionsDropdownToggle__R5KYk\" role=\"button\"><span></span><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 18 18\" width=\"1em\" height=\"1em\" class=\"wds-icon wds-icon-small wds-dropdown__toggle-chevron\"><defs><path id=\"prefix__more-small\" d=\"M9 5c1.103 0 2-.896 2-2s-.897-2-2-2-2 .896-2 2 .897 2 2 2m0 8c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2m0-6c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2\"></path></defs><use fill-rule=\"evenodd\" xlink:href=\"#prefix__more-small\"></use></svg></div><div class=\"wds-dropdown__content wds-is-not-scrollable\"><ul class=\"MarkerPopupActions-module_dropdownContent__GYl-7\"><li class=\"MarkerPopupActions-module_action__xeKO9\" data-testid=\"copy-link-marker-action\"><span class=\"MarkerPopupActions-module_actionIcon__VyVPj\"><svg class=\"wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-link-small\"></use></svg></span><span class=\"MarkerPopupActions-module_actionLabel__yEa0-\">Copy link</span></li><li class=\"MarkerPopupActions-module_action__xeKO9\" data-testid=\"marker-report-action\"><span class=\"MarkerPopupActions-module_actionIcon__VyVPj\"><svg class=\"wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-alert-small\"></use></svg></span><span class=\"MarkerPopupActions-module_actionLabel__yEa0-\">Report Marker</span></li></ul></div></div></div></div><div class=\"MarkerPopup-module_scrollableContent__0N5PS\"><div class=\"MarkerPopup-module_description__fKuSE\"><div class=\"page-content MarkerPopup-module_descriptionContent__-ypRG\"><!-- Description --></div></div><div class=\"MarkerPopup-module_imageWrapper__HuaF2\"><img class=\"MarkerPopup-module_image__7I5s4\"></div></div><div class=\"MarkerPopup-module_link__f59Lh\"><svg class=\"wds-icon wds-icon-tiny MarkerPopup-module_linkIcon__q3Rbd\"><use xlink:href=\"#wds-icons-link-tiny\"></use></svg><a href=\"<!-- Link url -->\" target=\"_blank\" rel=\"noopener noreferrer\"><!-- Link label --></a></div></div></div></div></div><div class=\"leaflet-popup-tip-container\"><div class=\"leaflet-popup-tip\"></div></div>";
                if (this.marker.markerElement) customPopup.style.transform = this.marker.markerElement.style.transform;
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
                var prev, zoomStep = function(time)
                {
                    // Only apply the new transform if the time actually changed
                    if (prev != time)
                    {
                        this.elements.popupElement.style.transform = this.marker.markerElement.style.transform;
                        this.applyPopupOffsets();
                    }
                    
                    prev = time;
                    
                    // Repeat indefinetely until it is stopped outside of this function
                    this._zoomStepId = window.requestAnimationFrame(zoomStep);
                    
                }.bind(this);

                // Subscribe to an event that fires on the start and end of the zoom
                // in order to animate the popup transform alongside the marker transform
                this.map.events.onMapZoomed.subscribe(function(e)
                {
                    // Don't bother if the popup isn't actually shown
                    if (!this.isPopupShown()) return;

                    // Cancel the last callback and timeout so that we're not running two at the same time
                    window.cancelAnimationFrame(this._zoomStepId);
                    window.clearInterval(this._zoomStepTimeoutId);
                    
                    // Zoom start
                    if (e.value == true)
                    {
                        // Start a new animation
                        this._zoomStepId = window.requestAnimationFrame(zoomStep);

                        // Start a timeout for it too
                        // This is more of a safety mechanism if anything, we don't want a situation where our zoomStep function is looping indefinetely
                        this._zoomStepTimeoutId = window.setTimeout(function() { window.cancelAnimationFrame(this._zoomStepId); }.bind(this), 300);
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

            // This adds the requisite features for an image to be shown by lightbox when it is clicked
            // - img is wrapped in an <a> tag with the href pointing to the image (this isn't used, but is required by the A tag), and a class of "image"
            // - img itself has a data attribute "data-image-key", the name of the file
            wrapPopupImages: function()
            {
                if (!this.elements.popupImage) return;

                // Add data attribute, sourcing it from alt (but without the File prefix)
                this.elements.popupImage.dataset.imageKey = this.elements.popupImage.alt.replace("File:", "");

                // Create a tag
                var a = document.createElement("a");
                a.href = this.elements.popupImage.src;
                a.className = "image";

                // Wrap image with a tag
                this.elements.popupImage.before(a);
                a.appendChild(this.elements.popupImage);
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

                        // If the opacity is already nearly 0, hide immediately
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

        var configValidator = 
        {
            // Returns the type of a value, but uses "array" instead of object if the value is an array
            getValidationType: function(value)
            {
                var type = typeof value;
                if (Array.isArray(value)) type = "array";
                return type;
            },

            flattenConfigInfoIntoDefaults: function(configInfos)
            {
                // Build up the flattened config object
                var config = {};

                for (var i = 0; i < configInfos.length; i++)
                {
                    var configInfo = configInfos[i];

                    // Recurse into objects
                    if (configInfo.type == "object" && configInfo.children && configInfo.children.length > 0)
                    {
                        config[configInfo.name] = this.flattenConfigInfoIntoDefaults(configInfo.children);

                        // Also store into the original default value
                        //configInfo.default = config[configInfo.name];
                    }
                    else
                        config[configInfo.name] = configInfo.default;
                }

                return config;
            },

            // Post-process the defaultConfigInfo to add path and parent values
            postProcessConfigInfo: function(children, parent)
            {
                for (var i = 0; i < children.length; i++)
                {
                    var info = children[i];
                    info.parent = parent;
                    info.path = parent && (parent.path + "." + info.name) || info.name;

                    if (info.children != undefined && info.children.length > 0)
                    {
                        this.postProcessConfigInfo(info.children, info);
                    }

                    // Always convert info's "type" and "arrayType" field to an array to make it easier to work with
                    if (info.type && !Array.isArray(info.type))
                        info.type = [ info.type ];

                    if (info.arrayType && !Array.isArray(info.arrayType))
                        info.arrayType = [ info.arrayType ];
                }
            },

            // Returns the config info at a path where each level is separated by a '.'
            getConfigInfoAtPath: function(path, data)
            {
                var pathArr = path.split(".");
                var currentObj = data || defaultConfigInfo;
            
                for (var i = 0; i < pathArr.length; i++)
                {
                    var name = pathArr[i];
                    var childObj = null;
            
                    if (Array.isArray(currentObj))
                    {
                        for (var j = 0; j < currentObj.length; j++)
                        {
                            if (currentObj[j].name === name) 
                            {
                                childObj = currentObj[j];
                                break;
                            }
                        }
                    } 
                    else if (typeof currentObj === 'object')
                    {
                        childObj = currentObj.children && currentObj.children.find(function(obj){ return obj.name === name; });
                    }
            
                    if (!childObj) return null;
                    currentObj = childObj;
                }
            
                return currentObj;
                
            },

            // Using a path in the config, return the value in the config
            // The config must ALWAYS be a root config, no sub-configs
            // Does not recurse into arrays, unless the scope is defaults
            // Returns { value, key, type }, or null if no path was found
            getConfigOptionAtPath: function(path, config)
            {
                if (path == undefined || config == undefined) return null;
                
                var pathArr = path.split(".");
                var currentData = config;
                var foundKey;

                // Short-circuit defaults
                if (config._configScope == "defaults")
                {
                    var info = this.getConfigInfoAtPath(path);
                    if (info)
                        return { value: info.default, key: info.name, type: this.getValidationType(info.default) };
                    else
                        return;
                }

                for (var i = 0; i < pathArr.length; i++)
                {
                    var name = pathArr[i];
                    var info = this.getConfigInfoAtPath(name, info);
                    var childData = null;
                    
                    if (typeof currentData === 'object')
                    {
                        if (currentData.hasOwnProperty(info.name))
                        {
                            childData = currentData[info.name];
                            foundKey = info.name;
                        }
                        else if (currentData.hasOwnProperty(info.alias))
                        {
                            childData = currentData[info.alias];
                            foundKey = info.alias;
                        }
                    }
            
                    // Short circuit if there was no value at the key
                    if (childData == undefined) return null;
                    currentData = childData;
                }
            
                return {
                    value: currentData,
                    key: foundKey,
                    type: this.getValidationType(currentData)
                };
            },

            getValidationForScope: function(configScope, metadata)
            {
                switch (configScope)
                {
                    case "embed":
                        return window.dev.mapsExtended.embedConfigValidations[metadata._configId];
                        
                    case "local":
                        return window.dev.mapsExtended.localConfigValidations[metadata._configScope == "embed" ? metadata._configMapName : metadata._configId];

                    case "global":
                        return window.dev.mapsExtended.globalConfigValidation;

                    case "defaults":
                        return window.dev.mapsExtended.defaultConfigValidation;

                    default:
                        return null;
                }
            },

            // Using a path in the config, return a validated result in the config
            // The config must ALWAYS be a root config, no sub-configs allowed
            // Does not recurse into arrays, unless the scope is defaults
            // Returns the validation result, or null if no path was found
            getValidationResultAtPath: function(path, validation)
            {
                if (path == undefined || validation == undefined) return null;
                
                var pathArr = path.split(".");
                var currentData = validation;

                for (var i = 0; i < pathArr.length; i++)
                {
                    var name = pathArr[i];
                    var childData = null;
                    
                    for (var j = 0; j < currentData.children.length; j++)
                    {
                        if (currentData.children[j].key == name)
                        {
                            childData = currentData.children[j];
                            break;
                        }
                    }
            
                    // Short circuit if there was no validation with this name
                    if (childData == undefined) return null;
                    currentData = childData;
                }
            
                return currentData;
            },

            findValidationMatchingPredicate: function(fn, array)
            {
                if (!fn || !array || array.length == 0)
                    return null

                for (var key in array)
                {
                    var result = array[key];
                    
                    if (fn(result) == true)
                        return result;

                    if (result.children && result.children.length > 0)
                    {
                        var childResult = this.findValidationMatchingPredicate(fn, result.children);
                        if (childResult != null) return childResult;
                    }
                }

                return null;
            },

            getNextScopeInChain: function(configScope)
            {
                switch (configScope)
                {
                    case "embed":   return "local";
                    case "local":   return "global";
                    case "global":  return "defaults";
                    default:        return;
                }
            },

            // Gets a fallback for a specific configuration source from a specific scope.
            // <configType> should be the scope of the desired config, and if it is omitted will be set to the next scope down given config._configScope
            // This function performs no validation, and assumes all lower configs have already been validated!
            // Returns an object containing
            // config: The full fallback configuration object (this will contain the config metadata)
            // value: The value of the option that was found
            // valueType: The type of the option that was found
            // foundKey: The key/name of the option that was found
            // isPresent: If false a fallback wasn't found and all of the above will not be present
            getFallbackForConfigOption: function(configInfo, configMetadata, scope)
            {
                var fallbackConfig;
                if (!configInfo || !configInfo.path) return { isPresent: false };

                switch (scope)
                {
                    case "embed":
                    {
                        fallbackConfig = window.dev.mapsExtended.embedConfigs[configMetadata._configId];
                        break;
                    }
                    
                    // Embed gets fallback from local/per-map
                    case "local":
                    {
                        fallbackConfig = window.dev.mapsExtended.localConfigs[configMetadata._configScope == "embed" ? configMetadata._configMapName : configMetadata._configId];
                        break;
                    }

                    // Local/per-map gets fallback from global
                    case "global":
                    {
                        fallbackConfig = window.dev.mapsExtended.globalConfig;
                        break;
                    }

                    // Global gets fallback from defaults
                    case "defaults":
                    {
                        fallbackConfig = window.dev.mapsExtended.defaultConfig;
                        break;
                    }

                    // No more fallbacks
                    default:
                    {
                        return { isPresent: false };
                    }
                }

                // If we found a fallback config in the next scope, actually check whether the config contains the option
                if (fallbackConfig)
                {
                    var validation = this.getValidationForScope(scope, configMetadata);
                    var foundOption = this.getConfigOptionAtPath(configInfo.path, fallbackConfig);

                    // Found fallback
                    if (foundOption)
                    {
                        return {
                            config: fallbackConfig,
                            value: foundOption.value,
                            valueType: foundOption.type,
                            foundKey: foundOption.key,
                            isPresent: true,
                            validation: this.getValidationResultAtPath(configInfo.path, validation)
                        };
                    }

                }
                
                // We reach here if either no fallbackConfig was found, or no option in the fallbackConfig was found
                // So try the next config down
                var nextScope = this.getNextScopeInChain(scope);
                return this.getFallbackForConfigOption(configInfo, configMetadata, nextScope);
            },

            // Validates a config option with a specific <configKey> in a <config> object against one or a collection of <configInfo>
            validateConfigOption: function(configKey, configInfo, config, configMetadata)
            {
                configInfo = configInfo || defaultConfigInfo;

                // If multiple configInfo's were passed, find the first with this name
                if (Array.isArray(configInfo))
                    var info = configInfo.find(function(ci) { return ci.name == configKey || ci.alias == configKey; });
                else
                    var info = configInfo;

                // An configInfo was found with this name
                if (info)
                {
                    // Redirect if info has a value for "use"
                    if (info.use) info = this.getConfigInfoAtPath(info.use);
                }

                // Note that configKey is just which property is requested, it does not indicate
                // that a property at that key exists, just that it "should" be there
                var foundKey = (config == undefined) ? undefined :
                (config.hasOwnProperty(info.name) && info.name != undefined)   ? info.name :
                (config.hasOwnProperty(info.alias) && info.alias != undefined) ? info.alias :
                (config.hasOwnProperty(configKey) && configKey != undefined) ? configKey : undefined;
                var foundValue = (config != undefined && foundKey != undefined) ? config[foundKey] : undefined;

                var result =
                {
                    // The "requested" configKey passed to this function.
                    key: configKey,

                    // If a value at the requested configKey wasn't found, but an alias (or the original key) was found
                    // foundKey is the value of the key that the config value actually exists under
                    foundKey: foundKey,

                    // This is the key that the configInfo expects
                    actualKey: info.name,

                    // The final value of this option, with validation fixes applied, fallbacks, etc
                    value: foundValue,

                    // The final type of this option
                    valueType: this.getValidationType(foundValue),

                    // The value of this option from the config file. This never changes
                    initialValue: undefined,

                    // The type of the value of this option in the config file.
                    initialValueType: undefined,

                    // The config info of the key. Will be undefined if no definition is found with the key
                    info: info,

                    // A boolean which is true when the input option passed all validations
                    isValid: true,

                    // A boolean which is true when the input was invalid, but the validator resolved it into a valid output (excluding fallbacks)
                    isResolved: false,

                    // A boolean which is true when the option is present in the config
                    isPresent: foundKey != undefined,

                    // True when the config found is using an alias of the actual config key
                    isAliased: foundKey != undefined && foundKey == info.alias,

                    // True when the value had to fall back to defaults or globals
                    // The original value will still be kept in "initialValue"
                    isFallback: false,

                    // The source of the fallback (either "defaults" or "global")
                    fallbackSource: undefined,

                    // An array of objects { code, message } saying what went wrong if issues occurred. May appear even if the option is valid
                    messages: [],

                    // An array of child results objects which may contain all the same values as above
                    children: [],
                };

                result.initialValue = result.value;
                result.initialValueType = result.valueType;
                
                var value = result.value;
                var valueType = result.valueType;
                var isValidType = result.valueType && info && info.type && info.type.includes(result.valueType);
                
                // Option with this name doesn't exist at all
                if (info == undefined)
                {
                    result.messages.push({ code: "unknown", message: "This key is not a valid config option." });
                    result.isValid = false;
                    return result;
                }

                // Option with this name does exist in the specification, but not in the config
                else if (!result.isPresent)
                {
                    result.isValid = false;

                    if (info.presence)
                        result.messages.push({ code: "required_not_present", message: "Value not present in config and is required." });
                    else
                        result.messages.push({ code: "not_present", message: "Value is not present in the config, a fallback will be used." });
                }

                // Option with this name exists, and it's in the specification
                else
                {
                    // Option is present, but under the alias key instead of the normal key
                    if (result.isAliased)
                    {
                        result.messages.push({ code: "aliased", message: "This value exists under a key that has changed. Consider updating the key." });
                    }

                    // Option is present but undefined - Silently use defaults
                    if (valueType == "object" && jQuery.isPlainObject(value) && jQuery.isEmptyObject(value) ||
                        valueType == "string" && value == "" ||
                        //valueType == "array" && value.length == 0 ||
                        value == undefined || value == null)
                    {
                        result.messages.push({ code: "is_empty", message: "Value is an empty value, using defaults instead." });
                        result.isValid = false;
                    }

                    // Option is the wrong type
                    if (!isValidType)
                    {
                        var error = { code: "mistyped" };
                        result.messages.push(error);
                        result.isValid = false;

                        // Try to coerce if it can be coerced, typically from string

                        // Convert string or number to boolean
                        if (info.type.includes("boolean") && !isValidType)
                        {
                            // Convert string to boolean
                            if (valueType == "string")
                            {
                                var validValues = ["true", "false", "yes", "no", "1", "0"];
                                var valueLower = value.toLowerCase();
                                
                                if (validValues.includes(valueLower))
                                {
                                    // Update the values
                                    value = result.value = (valueLower == "true" || valueLower == "yes" || valueLower == "1");
                                    valueType = result.valueType = "boolean";
                                    isValidType = true;
                                    result.isResolved = true;
    
                                    error.message = "Value should be a boolean but was passed a string (which was successfully interpreted as a boolean). Consider removing the quotes.";
                                    result.messages.push({ code: "ignore", message: "The previous message may be ignored on JSON-sourced (map definition) local configs." });
                                }
                            }

                            // Convert number to boolean
                            else if (valueType == "number" && (value == 1 || value == 0))
                            {
                                value = result.value = value == 1;
                                valueType = result.valueType = "boolean";
                                isValidType = true;
                                result.isResolved = true;
                                error.message = "Value should be a boolean but was passed a number (which was successfully interpreted as a boolean)."
                            }
                        }

                        // Convert string to number
                        if (info.type.includes("number") && valueType == "string" && !isValidType)
                        {
                            var valueFloat = parseFloat(value);
                            if (!isNaN(valueFloat))
                            {
                                // Update the values
                                value = result.value = valueFloat;
                                valueType = result.valueType = "number";
                                isValidType = true;
                                result.isResolved = true;

                                error.message = "Value should be a number but was passed a string. Consider removing the quotes.";
                            }
                        }

                        // Convert string to object or array
                        if ((info.type.includes("object") || info.type.includes("array")) && valueType == "string" && !isValidType)
                        {
                            try 
                            {
                                var valueObj = JSON.parse(value);
                                var success = false;

                                // String was parsed to array and we expected it
                                if (Array.isArray(valueObj) && info.type.includes("array"))
                                {
                                    valueType = result.valueType = "array";
                                    success = true;
                                }

                                // String was parsed to object and we expected it
                                else if (typeof valueObj == "object" && valueObj.constructor === Object && info.type.includes("object"))
                                {
                                    valueType = result.valueType = "object";
                                    success = true;
                                }

                                if (success == true)
                                {
                                    value = result.value = valueObj;
                                    isValidType = true;
                                    result.isResolved = true;
                                }
                                else
                                {
                                    result.messages.push({ code: "parse_unexpected", message: "Successfully parsed string as JSON, but the value was not of type " + info.type });
                                }
                            }
                            catch(error)
                            {
                                result.messages.push({ code: "parse_failed", message: "Could not parse string as JSON: " + error });
                            }
                        }

                        // There's no way to convert it
                        if (!isValidType)
                        {
                            error.message = "Value should be of type " + info.type + " but was passed a " + valueType + ", which could not be converted to this type.";
                        }
                    }
                    
                    if (isValidType)
                    {
                        // Number option must be a valid number
                        if (valueType == "number" && (!isFinite(value) || isNaN(value)))
                        {
                            result.messages.push({ code: "invalid_number", message: "Value is not a valid number." });
                            result.isValid = false;
                        }

                        // Option with validValues must be one of a list of values
                        if (info.validValues)
                        {
                            // Force lowercase when we have a list of values
                            if (valueType == "string") value = value.toLowerCase();

                            if (!info.validValues.includes(value))
                            {
                                result.messages.push({ code: "invalid_value", message: "Should be one of: " + info.validValues.toString() });
                                result.isValid = false;
                            }
                        }

                        var customValidation = info.customValidation || configInfo.customValidation;

                        // Option must pass custom validation if it is present
                        if (customValidation != undefined && typeof customValidation == "function")
                        {
                            var customValidationResult = customValidation(value, config);

                            if (customValidationResult.result == false)
                            {
                                if (customValidationResult.message)
                                    result.messages.push(customValidationResult.message);
                                else
                                    result.messages.push({ code: "other", message: "Failed custom validation " });

                                result.isValid = false;
                            }
                        }
                    }

                    // For objects, we should recurse into any of the child configs if the definition says there should be some
                    // For this, we iterate over properties in the configInfo to see what should be there rather than what IS there
                    if (valueType == "object")
                    {
                        result.children = [];

                        if (info.children && info.children.length > 0)
                        {
                            // Iterate the config info for properties that may be defined
                            for (var i = 0; i < info.children.length; i++)
                            {
                                var childInfo = info.children[i];
                                var childResult = this.validateConfigOption(childInfo.name, childInfo, config[foundKey], configMetadata);
                                childResult.parent = result;
                                result.children.push(childResult);
                            }
                        }
                        else
                        {
                            console.error("Config info definition " + info.name + " is type object yet does not define any keys in \"children\"!");
                        }
                    }

                    // Recurse into arrays too, but use a single configInfo for each of the elements. The configInfo either has an arrayType or will have a
                    // single element in "children" that represents each element in the array
                    // With arrays, validation occurs on what *is* there rather than what *should be* there.
                    else if (valueType == "array")
                    {
                        result.children = [];

                        // Get info from first element of "children"
                        if (info.children && info.children.length > 0)
                        {
                            if (info.children.length > 1) console.error("Config info definition " + info.name + " should only contain one child as it is of type \"array\"");
                            var arrayElementInfo = info.children[0];
                        }

                        // Otherwise create it from arrayType
                        else if (info.arrayType)
                            var arrayElementInfo = { presence: false, default: undefined, type: info.arrayType };
                        //else
                        //    console.error("Config info definition " + info.name + " contains neither an \"arrayType\" or an \"elementInfo\"");

                        if (arrayElementInfo)
                        {
                            // Loop over each element in the values array, and validate it against the element info
                            for (var i = 0; i < config[configKey].length; i++)
                            {
                                // Validate this array element, but NEVER fallback to an array element (only objects get fallbacks) the fallback will use defaults as we don't want to fall back on the values of array elements in the global config
                                var childResult = this.validateConfigOption(i, arrayElementInfo, config[foundKey], configMetadata);
                                childResult.parent = result;
                                result.children.push(childResult);

                                // Apply fallback only if they were the defaults
                            }
                        }
                    }
                }

                // Result is invalid or not present, use fallback as result
                if ((!result.isValid && !result.isResolved) || !result.isPresent)
                {
                    var fallback = this.getFallbackForConfigOption(info, configMetadata, this.getNextScopeInChain(configMetadata._configScope));
                    
                    if (fallback.isPresent == true)
                    {
                        result.isFallback = true;
                        result.value = fallback.value;
                        result.valueType = fallback.valueType;
                        result.foundKey = fallback.foundKey;
                        result.fallbackSource = fallback.config._configScope;

                        // If the default itself is an object, We have to make a results object for each child value too
                        if (result.fallbackSource == "defaults" && result.valueType == "object")
                        {
                            result.children = [];
                            
                            for (var i = 0; i < info.children.length; i++)
                            {
                                var childInfo = info.children[i];
                                var childResult = this.validateConfigOption(childInfo.name, childInfo, config[info.name], configMetadata);
                                childResult.parent = result;
                                result.children.push(childResult);
                            }
                        }

                        if (fallback.validation && fallback.validation.children && fallback.validation.children.length > 0)
                            result.children = fallback.validation.children;
                    }
                }

                // Determine what is being overridden
                else
                {
                    var override = this.getFallbackForConfigOption(info, configMetadata, this.getNextScopeInChain(configMetadata._configScope));
                    if (override.isPresent == true)
                    {
                        result.isOverride = true;
                        result.overridesSource = override.config._configScope;

                        // Determine whether the override is required
                        if (result.value == override.value)
                        {
                            result.messages.push({ code: "redundant_override", message: "This option is unnecessarily overriding an option with the same value from " + result.overridesSource + ", and may be omitted." });
                        }
                    }
                }

                // Assign values from child results to the base value
                if (result.children && result.children.length > 0)
                {
                    for (var i = 0; i < result.children.length; i++)
                    {
                        var childResult = result.children[i];
                        var childKey = result.valueType == "array" ? childResult.key : childResult.actualKey;
                                
                        // If the result was aliased, move the value
                        if (childResult.isAliased)
                        {
                            result.value[childKey] = result.value[childResult.foundKey];
                            delete result.value[childResult.foundKey];
                        }

                        // If the child result was resolved or was a fallback, add it to the value property
                        if (childResult.isResolved || childResult.isFallback)
                            result.value[childKey] = childResult.value;
                    }
                }

                return result;
            },

            // Validates the configuration object, returning the validation containing a config filled out and any errors fixed using fallbacks and inherited values
            // This means validateConfig is guaranteed to return a valid configuration, even if all the defaults are used, even if the config passed is completely incorrect
            validateConfig: function(config)
            {
                var metadata = {
                    _configId: config._configId,
                    _configMapName: config._configMapName,
                    _configScope: config._configScope,
                    _configSource: config._configSource,
                };
                
                var validation =
                {
                    // Validation metadata
                    id: config._configId,
                    name: config._configMapName,
                    scope: config._configScope,
                    source: config._configSource,
                    type: "object",

                    // All validations of this config, including fallbacks
                    children: [],

                    // Only validations from config options on this config
                    childrenSelf: [],

                    // The output config, a validation of the input without root fallbacks
                    configSelf: {},

                    // The output config, a validation of the input including every other config option that wasn't passed
                    // This can be seen as a combination of the input, and the next config source up the chain (e.g Global | Defaults)
                    config: {}
                };

                Object.assign(validation.config, metadata);
                Object.assign(validation.configSelf, metadata);

                // Loop over defaultConfigInfo and validate the values in the config against them. validateConfigOption will recurse into children
                for (var i = 0; i < defaultConfigInfo.length; i++)
                {
                    var configInfo = defaultConfigInfo[i];
                    var result = this.validateConfigOption(configInfo.name, defaultConfigInfo, config, metadata);
                    
                    validation.children.push(result);

                    if (result.isValid || result.isResolved || result.isFallback)
                    {
                        if (!result.isFallback)
                        {
                            validation.childrenSelf.push(result);
                            validation.configSelf[configInfo.name] = result.value;
                        }
                        
                        validation.config[configInfo.name] = result.value;
                    }
                }

                // Warn the editor if they have any raw boolean values in the map definition configuration
                // Only do this on the map page, in edit mode, and for logged in users
                if (metadata._configScope == "local" && metadata._configSource == "JSON (in map definition)" && mapsExtended.isOnMapPage && (mapsExtended.isInEditMode || mapsExtended.isDebug) && !mw.user.isAnon() &&
                   this.findValidationMatchingPredicate(function(r) { return r.initialValueType == "boolean"; }, validation.childrenSelf) != null)
                {
                    var errorBox = document.createElement("div")
                    errorBox.className = "mw-message-box mw-message-box-warning";
                    errorBox.innerHTML = "<p><strong>This map uses a map definition config containing one or more raw boolean values.</strong> It is advised that you replace these values with strings instead, or use an external config, as any edits to this map in the Interactive Map Editor will cause them to be lost. Visit the <a href=\"https://dev.fandom.com/wiki/MapsExtended#JSON_configuration_(map_definition)\">documentation</a> for more info.</p>";

                    var previewnote = document.querySelector(".previewnote");
                    var content = document.getElementById("mw-content-text");
                    
                    if (previewnote)
                        previewnote.appendChild(errorBox);
                    else if (content)
                    {
                        errorBox.classList.add("error");
                        errorBox.style.fontSize = "inherit";
                        content.prepend(errorBox);
                    }
                }

                return validation;
            },

            // Tabulate the results of the validation in the same way Extension:JsonConfig does
            // Note that the layout of the root validation results list, and each result itself is such
            // that all array or object-typed results have a "children" parameter. This simplifies recursion
            tabulateConfigValidation: function(results)
            {
                var table = document.createElement("table");
                table.className = "mw-json";
                var tbody = table.createTBody();

                var headerRow = tbody.insertRow();
                var headerCell = document.createElement("th");
                headerCell.setAttribute("colspan", "2");

                var isRoot = results.scope != undefined;

                // Build the header text (only for the root)
                if (isRoot)
                {
                    table.classList.add("mw-collapsible");
                    table.classList.add("mw-collapsed");
                    table.style.width = "100%";
                    table.style.marginBottom = "1em";
                    
                    var scopeStr = capitalizeFirstLetter(results.scope) + " config";
                    var mapLink = ExtendedMap.prototype.getMapLink(results.name, true);
                    var sourceStr = " - Defined as ";
                    var sourceLink = document.createElement("a");
    
                    if (results.source == "Wikitext")
                    {
                        sourceStr += "Wikitext (on "
                        var path = "";
                        sourceLink.href = "/wiki/" + path;
                        sourceLink.textContent = path;
                    }
                    if (results.source == "JavaScript")
                    {
                        sourceStr += "JavaScript (in ";
                        var path = "MediaWiki:Common.js";
                        sourceLink.href = "/wiki/" + path;
                        sourceLink.textContent = path;
                    }
                    else if (results.source == "JSON (in map definition)")
                    {
                        sourceStr += "JSON (in ";
                        var path = "Map:" + results.name;
                        sourceLink.href = "/wiki/" + path;
                        sourceLink.textContent = path;
                    }
                    else if (results.source == "JSON (in system message)")
                    {
                        sourceStr += "JSON (in ";
                        var path = "MediaWiki:Custom-MapsExtended/" + results.name + ".json";
                        sourceLink.href = "/wiki/" + path;
                        sourceLink.textContent = path;
                    }
    
                    headerCell.append(scopeStr, results.scope != "global" ? " for " : "", results.scope != "global" ? mapLink : "", sourceStr, sourceLink, ") ");
                    headerRow.appendChild(headerCell);

                    mw.hook("dev.wds").add(function(wds)
                    {
                        var helpTooltip = document.createElement("div");
                        helpTooltip.style.cssText = "position: absolute; left: 12px; top: 50%; transform: translateY(-50%)";
                        
                        var questionIcon = wds.icon("question-small");
                        questionIcon.style.verticalAlign = "middle";
                        helpTooltip.appendChild(questionIcon);
                        
                        headerCell.style.position = "relative";
                        headerCell.prepend(helpTooltip);
                        
                        var popup = new OO.ui.PopupWidget(
                        {
                    		$content: $("<span>This table is a validated output of a MapsExtended config. It is only shown in edit mode, or while debug mode for MapsExtended is enabled</span>"),
                    		width: 250,
                            align: "force-right",
                            position: "above"
                    	});

                        var popupElement = popup.$element[0];
                        var popupContent = popupElement.querySelector(".oo-ui-popupWidget-popup");
                        popupContent.style.fontSize = "14px";
                        popupContent.style.padding = "15px";
                        popupContent.style.textAlign = "left";

                        helpTooltip.append(popupElement);
                        helpTooltip.addEventListener("mouseenter", function()
                        {
                            popup.toggle(true);
                        });
                        helpTooltip.addEventListener("mouseleave", function()
                        {
                            popup.toggle(false);
                        });
                    });
                }

                // Handle the case of an empty object or array
                if (!results.children || results.children.length == 0)
                {
                    // Create table row
                    var tr = tbody.insertRow();
                    
                    // Create table row value cell
                    var td = tr.insertCell();

                    td.className = "mw-json-empty";
                    td.textContent = "Empty " + (results.type || results.valueType);
                }
                else
                {
                    for (var i = 0; i < results.children.length; i++)
                    {
                        var result = results.children[i];
                        
                        // Create table row
                        var tr = tbody.insertRow();
        
                        // Create table row header + content
                        var th = document.createElement("th");
        
                        // If aliased, add the key in the config striked-out to indicate it should be changed
                        if (result.isAliased == true)
                        {
                            var oldKey = document.createElement("div");
                            oldKey.textContent = result.foundKey;
                            oldKey.style.textDecoration = "line-through";
                            th.appendChild(oldKey);
        
                            var newKey = document.createElement("span");
                            newKey.textContent = result.actualKey;
                            th.appendChild(newKey);
                        }
                        else
                        {
                            var keySpan = document.createElement("span");
                            keySpan.textContent = result.key;
                            th.appendChild(keySpan);
                        }
        
                        tr.appendChild(th);
        
                        // Create table row value cell
                        var td = tr.insertCell();
        
                        // Determine how to format the value
        
                        // Arrays and objects get a sub-table
                        if ((result.valueType == "array" || result.valueType == "object") && result.info.debugAsString != true)
                        {
                            td.appendChild(this.tabulateConfigValidation(result));

                            if (!result.isPresent)
                            {
                                if (!tr.matches(".mw-json-row-empty *"))
                                    tr.className = "mw-json-row-empty";
                            }
                        }
        
                        // Mutable values (string, number, boolean) just get printed
                        else
                        {
                            td.className = "mw-json-value";
                            var str = "";
        
                            if (result.isPresent == true)
                            {
                                // Invalid and not resolved
                                if (!result.isValid && !result.isResolved)
                                    td.classList.add("mw-json-value-error");
        
                                // Warnings
                                else if (result.messages.length > 0 && !result.messages.some(function(m){ return m.code == "redundant_override"; }))
                                    td.classList.add("mw-json-value-warning");
        
                                // Not invalid and no warnings
                                else
                                    td.classList.add("mw-json-value-success");
        
                                // Append old value (if it differs)
                                if (result.initialValue != result.value)
                                {
                                    if (result.initialValueType == "string")
                                        str += "\"" + result.initialValue + "\"";
                                    else
                                        str += result.initialValue
                                    
                                    // Append arrow indicating this was changed to
                                    str += " → "
                                }
            
                                // Append current value
                                if (result.valueType == "string")
                                    str += "\"" + result.value + "\"";
                                else if (result.valueType == "array")
                                    str += JSON.stringify(result.value);
                                else
                                    str += result.value;

                                /*
                                // Append the override source
                                if (result.isOverride == true)
                                {
                                    // Message saying this value overrides another from a specific config
                                    str += " (overrides " + result.overridesSource + ")";
                                }
                                */
                            }
                            else
                            {
                                if (!tr.matches(".mw-json-row-empty *"))
                                    tr.className = "mw-json-row-empty";
        
                                // Append the fallback
                                if (result.isFallback == true)
                                {
                                    if (result.valueType == "string")
                                        str += "\"" + result.value + "\"";
                                    else
                                        str += result.value;
                                    
                                    // Message saying this fallback is from a specific config
                                    str += " (from " + result.fallbackSource + ")";
                                }
                            }
        
                            // Finally set the string
                            td.textContent = str;
                        }
        
                        // Append any extra validation information)
                        if (result.messages.length > 0 && result.isPresent)
                        {
                            var extraInfo = document.createElement("div");
                            extraInfo.className = "mw-json-extra-value";
                            extraInfo.textContent = result.messages.map(function(m) { return "(" + m.code.toUpperCase() + ") " + m.message; }).join("\n");
                            td.appendChild(extraInfo);
                        }
                    }
                }

                if (isRoot)
                {
                    // Make the table collapsible, then add it to the page
                    mw.loader.using("jquery.makeCollapsible", function()
                    {
                        $(table).makeCollapsible();

                        // Add it either before the edit form, or after the content
                        var editform = document.getElementById("editform");
                        var content = document.getElementById("content");
                        if (editform != null)
                            editform.before(table);
                        else if (content != null)
                            content.append(table);
                    });
                }

                return table;
            }
        }

        var defaultConfigInfo =
        [
            {
                name: "disabled",
                presence: false,
                default: false,
                type: "boolean",
                presence: false
            },

            // Markers

            {
                name: "iconAnchor",
                presence: false,
                default: "center",
                type: "string",
                validValues: [ "top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right" ]
            },
            {
                name: "iconPosition",
                presence: false,
                default: undefined,
                type: "string",
                validValues: [ "top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right" ]
            },
            {
                name: "sortMarkers",
                presence: false,
                default: "latitude",
                type: "string",
                validValues: ["latitude", "longitude", "category", "unsorted"]
            },

            // Popups

            {
                name: "enablePopups",
                alias: "allowPopups",
                presence: false,
                default: true,
                type: "boolean"
            },
            {
                name: "openPopupsOnHover",
                presence: false,
                default: false,
                type: "boolean"
            },
            {
                name: "popupHideDelay",
                presence: false,
                default: 0.5,
                type: "number"
            },
            {
                name: "popupShowDelay",
                presence: false,
                default: 0.1,
                type: "number"
            },
            {
                name: "useCustomPopups",
                presence: false,
                default: false,
                type: "boolean"
            },

            // Categories

            {
                name: "hiddenCategories",
                presence: false,
                default: [],
                type: "array",
                arrayType: "string",
            },
            {
                name: "visibleCategories",
                presence: false,
                default: [],
                type: "array",
                arrayType: "string",
            },
            {
                name: "disabledCategories",
                presence: false,
                default: [],
                type: "array",
                arrayType: "string"
            },
            {
                name: "categoryGroups",
                presence: false,
                default: [],
                type: "array",
                arrayType: ["string", "object"],
                children:
                [
                    {
                        name: "categoryGroup",
                        presence: false,
                        default: undefined,
                        type: ["string", "object"],
                        children: 
                        [
                            {
                                name: "label",
                                presence: true,
                                default: "Group",
                                type: "string"
                            },
                            {
                                name: "collapsible",
                                presence: false,
                                type: "boolean",
                                default: true,
                            },
                            {
                                name: "collapsed",
                                presence: false,
                                default: false,
                                type: "boolean"
                            },
                            {
                                name: "hidden",
                                presence: false,
                                default: false,
                                type: "boolean"
                            },
                            {
                                name: "children",

                                // Use is used to point the validator to a different item
                                // It should only be used with the name key
                                use: "categoryGroups"
                            }
                        ]
                    }
                ]
            },


            // Map interface

            {
                name: "minimalLayout",
                presence: false,
                default: false,
                type: "boolean",
            },
            {
                name: "mapControls",
                presence: false,
                default: [],
                type: "array",
                arrayType: "array",
                children:
                [
                    {
                        name: "mapControlGroup",
                        presence: true,
                        default: [],
                        type: "array",
                        arrayType: "string",
                        children:
                        [
                            {
                                name: "mapControlGroupItem",
                                presence: false,
                                default: "",
                                type: "string",
                                validValues: [ "edit", "zoom", "fullscreen" ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "hiddenControls",
                presence: false,
                default: [],
                type: "array",
                arrayType: "string",
                validValues: [ "edit", "zoom", "fullscreen" ]
            },
            {
                name: "enableFullscreen",
                alias: "allowFullscreen",
                presence: false,
                default: true,
                type: "boolean"
            },
            {
                name: "fullscreenMode",
                presence: false,
                default: "window",
                type: "string",
                validValues: [ "window", "screen" ]
            },

            // Sidebar

            {
                name: "enableSidebar",
                presence: false,
                default: false,
                type: "boolean"
            },
            {
                name: "sidebarOverlay",
                presence: false,
                default: false,
                type: "boolean"
            },
            {
                name: "sidebarSide",
                presence: false,
                default: "left",
                type: "string",
                validValues: [ "left", "right" ]
            },
            {
                name: "sidebarBehaviour",
                presence: false,
                default: "autoInitial",
                type: "string",
                validValues: [ "autoAlways", "autoInitial", "manual" ]
            },
            {
                name: "sidebarInitialState",
                presence: false,
                default: "auto",
                type: "string",
                validValues: [ "auto", "show", "hide" ]
            },

            // Other features

            {
                name: "enableSearch",
                alias: "allowSearch",
                presence: false,
                default: true,
                type: "boolean"
            },
            {
                name: "enableTooltips",
                alias: "allowTooltips",
                presence: false,
                default: true,
                type: "boolean"
            },

            // Custom features

            {
                name: "canvasRenderOrderMode",
                presence: false,
                default: "auto",
                type: "string",
                validValues: [ "auto", "manual" ]
            },
            {
                name: "paths",
                presence: false,
                default: [],
                type: "array",
                arrayType: "object",
                children:
                [
                    {
                        name: "path",
                        presence: false,
                        default: undefined,
                        type: "object",
                        children: 
                        [
                            {
                                name: "id",
                                presence: true,
                                type: ["string", "number"]
                            },
                            {
                                name: "styleId",
                                presence: false,
                                type: ["string", "number"]
                            },
                            {
                                name: "style",
                                presence: false,
                                type: "object",
                                use: "styles.style",
                                customValidation: function(value, config)
                                {
                                    if (config.styleId != null)
                                        config.overrideStyle = jQuery.extend(true, {}, value);

                                    return { result: true };
                                }
                            },
                            {
                                name: "categoryId",
                                presence: false,
                                type: ["string", "number"]
                            },
                            {
                                name: "title",
                                presence: false,
                                type: "string"
                            },
                            {
                                name: "link",
                                presence: false,
                                type: "string"
                            },
                            {
                                name: "popup",
                                presence: false,
                                type: "object",
                                children:
                                [
                                    {
                                        name: "title",
                                        presence: true,
                                        type: "string"
                                    },
                                    {
                                        name: "description",
                                        presence: false,
                                        type: "string"
                                    },
                                    {
                                        name: "image",
                                        presence: false,
                                        type: "string"
                                    },
                                    {
                                        name: "link",
                                        presence: false,
                                        type: "object",
                                        children: 
                                        [
                                            {
                                                name: "url",
                                                presence: true,
                                                type: "string",
                                            },
                                            {
                                                name: "label",
                                                presence: true,
                                                type: "string",
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                name: "type",
                                presence: true,
                                default: "polyline",
                                type: "string",
                                validValues: [ "polygon", "polyline", "line", "circle", "ellipse", "rectangle"  ]
                            },
                            {
                                name: "scaling",
                                presence: false,
                                default: true,
                                type: "boolean"
                            },
                            {
                                name: "smoothing",
                                presence: false,
                                default: false,
                                type: "boolean"
                            },
                            {
                                name: "smoothingIterations",
                                presence: false,
                                default: 5,
                                type: "number"
                            },
                            {
                                name: "points",
                                presence: false,
                                type: "array",
                                arrayType: "array",
                                debugAsString: true,
                                customValidation: function(value, config)
                                {
                                    var errors = [];
                                    
                                    // Position already present
                                    if (config.position)
                                    {
                                        errors.push({ code: "POINTS_ONE_ONLY", message: "\"points\" and \"position\" are mutually exclusive, only one may be present." });
                                    }

                                    // If we're at this point, the type and presence checks have passed already
                                    if (value.length == 0)
                                    {
                                        errors.push({ code: "POINTS_EMPTY_ROOT_ARRAY", message: "If the points array is defined, it must contain at least one element" });
                                    }

                                    // This functions checks to see that each element in a multidimensional array has the same type across depths, among other checks

                                    var depthTypes = [];
                                    var depthTypeIsArray = [];
                                    var listDepth; // The depth at which we expect a list of values
                                    var valueDepth; // The depth at which we expect actual values (string or array[2] of number)
                                    var indexes = [];

                                    function isCoordinate(v)
                                    {
                                        if (Array.isArray(v))
                                            return v.length == 2 && typeof v[0] == "number" && typeof v[1] == "number";
                                        else
                                            return typeof v == "string";
                                    }
                                    
                                    function traverse(a, d)
                                    {
                                        var isArray = Array.isArray(a);
                                        var type = isArray ? "array" : typeof a;
                                        
                                        // Is this a value (either array[2] or string)
                                        var isValue = isCoordinate(a);

                                        // Is this an array of values
                                        var isValuesArray = !isValue && isArray && isCoordinate(a[0]);

                                        if (!valueDepth && isValue)
                                        {
                                            valueDepth = d;

                                            // Here, also determine what sort of path this is
                                            config.pointsDepth = valueDepth;
                                            config.pointsType = valueDepth == 0 ? "coordinate" :
                                                                valueDepth == 1 ? "single" :
                                                                valueDepth == 2 ? (config.type == "polygon" ? "singleWithHoles" : "multiple") :
                                                                valueDepth == 3 ? "multipleWithHoles" : "error";

                                            if (config.pointsType == "error")
                                            {
                                                errors.push({ code: "POINTS_UNRECOGNIZED_DEPTH", message: "The points array had a depth of more than 3 nested arrays, this format is unknown" });
                                                return false;
                                            }
                                        }

                                        if (!listDepth && isValuesArray)
                                        {
                                            listDepth = d;
                                        }

                                        // If this is the depth we expect a coordinate pair (array[2] or string)
                                        if (d == valueDepth)
                                        {
                                            // Check if it is indeed a value
                                            if (!isValue)
                                            {
                                                errors.push({ code: "POINTS_EXPECTED_VALUE", message: "Element at points" + indexes.map(function(i){ return "[" + i + "]"; }).join() + " was of type " + type + (isArray ? "[" + a.length + "]" : ")") + ", but it needs to be either an array[2] or string." });
                                                return false;
                                            }

                                            // If an array, check that it contains two AND ONLY TWO numbers
                                            if (isArray && (a.length != 2 || typeof a[0] != "number" || typeof a[1] != "number"))
                                            {
                                                errors.push({ code: "POINTS_COORDS_MISLENGTH", message: "The coordinate at points" + indexes.map(function(i){ return "[" + i + "]"; }).join() + " does not have two coordinates!" });
                                                return false;
                                            }
                                        }

                                        // If one greater than the valueDepth, it should ALWAYS be a number
                                        if (d == valueDepth + 1 && type != "number")
                                        {
                                            errors.push({ code: "POINTS_COORD_NOT_NUMBER", message: "The coordinate at points" + indexes.map(function(i){ return "[" + i + "]"; }).join() + " is not a number!" });
                                            return false;
                                        }

                                        // If any less than valueDepth, if should ALWAYS be an array
                                        else if (d < valueDepth && !isArray)
                                        {
                                            errors.push({ code: "POINTS_EXPECTED_ARRAY", message: "Element at points" + indexes.map(function(i){ return "[" + i + "]"; }).join() + " was of type " + type + ", but at this depth it should be an array." });
                                            return false;
                                        }

                                        // If the depth is greater than valueDepth + 1, it shouldn't exist
                                        else if (d > valueDepth + 1)
                                        {
                                            errors.push({ code: "POINTS_UNBALANCED", error: "The type of each element is not equal across depths." });
                                            return false;
                                        }

                                        // Set the depthType if it hasn't been set already
                                        if (!depthTypes[d])
                                        {
                                            depthTypeIsArray[d] = isArray;
                                            depthTypes[d] = type;
                                        }
                                        
                                        // Check whether the type matches the type expected at this depth
                                        if (type != depthTypes[d] || isArray != depthTypeIsArray[d])
                                        {
                                        }
                        
                                        // Recurse into this array
                                        if (isArray)
                                        {
                                            if (a.length == 0)
                                            {
                                                errors.push({ code: "POINTS_EMPTY_SUB_ARRAY", message: "points" + indexes.map(function(i){ return "[" + i + "]"; }).join() + " contains an empty array." });
                                                return false;
                                            }
                                            
                                            // Check to see if the poly array contains the correct amount of coordinates for the type of feature
                                            if (isValuesArray)
                                            {
                                                config.pointsFlat = config.pointsFlat || [];
                                                config.pointsFlat.push(a);
    
                                                if (config.type == "polygon" && a.length < 3)
                                                {
                                                    errors.push({ code: "POINTS_POLYGON_COUNT", message: "The points array at " + indexes.map(function(i, n){ return n < d ? "[" + i + "]" : ""; }).join() + " needs 3 or more points, but only has " + a.length });
                                                    return false;
                                                }
                                                else if ((config.type == "polyline" || config.type == "line") && a.length < 2)
                                                {
                                                    errors.push({ code: "POINTS_POLYLINE_COUNT", message: "The points array at " + indexes.map(function(i, n){ return n < d ? "[" + i + "]" : ""; }).join() + " needs 2 or more points, but only has " + a.length });
                                                    return false;
                                                }
                                            }
                                            
                                            for (var i = 0; i < a.length; i++)
                                            {
                                                indexes[d] = i;
                                                if (traverse(a[i], d + 1) == false)
                                                    return false;
                                            }
                                        }
                                
                                        return true;
                                    }
                                    
                                    return { result: traverse(value, 0) == true && errors.length == 0, messages: errors };
                                }
                            }
                        ]
                    }
                ]
            },

            {
                name: "styles",
                presence: false,
                default: undefined,
                type: "array",
                arrayType: "object",
                children:
                [
                    {
                        name: "style",
                        presence: false,
                        default: undefined,
                        type: "object",
                        children: 
                        [
                            {        
                                name: "id",
                                presence: false,
                                type: [ "number", "string" ],
                            },
                            {        
                                name: "stroke",
                                presence: false,
                                default: true,
                                type: "boolean",
                            },
                            {        
                                name: "strokeColor",
                                presence: false,
                                default: "black",
                                type: "string",
                            },
                            {        
                                name: "strokeWidth",
                                presence: false,
                                default: 1.0,
                                type: "number",
                            },
                            {        
                                name: "lineDashArray",
                                presence: false,
                                default: undefined,
                                type: "array",
                                arrayType: "number"
                            },
                            {        
                                name: "lineDashOffset",
                                presence: false,
                                default: 0.0,
                                type: "number"
                            },
                            {        
                                name: "lineCap",
                                presence: false,
                                default: "round",
                                type: "string",
                                validValues: [ "butt", "round", "square" ]
                            },
                            {        
                                name: "lineJoin",
                                presence: false,
                                default: "round",
                                type: "string",
                                validValues: [ "round", "bevel", "miter" ]
                            },
                            {        
                                name: "miterLimit",
                                presence: false,
                                default: 1.0,
                                type: "number"
                            },
                            {        
                                name: "fill",
                                presence: false,
                                default: true,
                                type: "boolean"
                            },
                            {        
                                name: "fillColor",
                                presence: false,
                                default: "black",
                                type: "string"
                            },
                            {        
                                name: "fillRule",
                                presence: false,
                                default: "evenodd",
                                type: "string",
                                validValues: [ "nonzero", "evenodd" ]
                            },
                            {        
                                name: "shadowColor",
                                presence: false,
                                default: undefined,
                                type: "string"
                            },
                            {        
                                name: "shadowBlur",
                                presence: false,
                                default: undefined,
                                type: "number"
                            },
                            {        
                                name: "shadowOffset",
                                presence: false,
                                default: undefined,
                                type: "array",
                                arrayType: "number"
                            }
                        ]
                    }
                ]
            },

            // Ruler

            {
                name: "enableRuler",
                presence: false,
                default: true,
                type: "boolean"
            },
            {
                name: "pixelsToMeters",
                presence: false,
                default: 100,
                type: "number"
            },

            // Collectibles

            {
                name: "collectibleCategories",
                presence: true,
                default: [],
                type: "array",
                arrayType: "string",
            },
            {
                name: "enableCollectedAllNotification",
                presence: false,
                default: true,
                type: "boolean"
            },
            {
                name: "collectibleExpiryTime",
                presence: false,
                default: 2629743,
                type: "number"
            }
        ];

        // Finally we are done with all the prototype definitions    
        // ---------

        function MapsExtended()
        {
            this.loaded = true;
            this.isDebug = isDebug;
            this.isDisabled = isDisabled;
            this.isInEditMode = mw.config.get("wgAction") == "edit";
            this.isOnMapPage = mw.config.get("wgPageContentModel") == "interactivemap" || mw.config.get("wgNamespaceNumber") == 2900;
            
            // Flatten the defaultConfigInfo into a default config
            configValidator.postProcessConfigInfo(defaultConfigInfo);
            this.defaultConfig = configValidator.flattenConfigInfoIntoDefaults(defaultConfigInfo);
            this.defaultConfig._configId = "defaults";
            this.defaultConfig._configMapName = "";
            this.defaultConfig._configSource = "JavaScript";
            this.defaultConfig._configScope = "defaults";

            this.globalConfig = {};
            this.globalConfigValidation = {}
            this.isGlobalConfigLoaded = false;
            this.localConfigs = {};
            this.localConfigValidations = {}
            this.isLocalConfigsLoaded = false;
            this.embedConfigs = {};
            this.embedConfigValidations = {};
            this.isEmbedConfigsLoaded = false;
        }

        MapsExtended.prototype =
        {
            ExtendedMap: ExtendedMap,
            ExtendedCategory: ExtendedCategory,
            ExtendedMarker: ExtendedMarker,
            ExtendedPopup: ExtendedPopup,

            configValidator: configValidator,

            init: function()
            {
                // Array of ExtendedMaps currently active
                this.maps = [];
    
                // Array of map titles on the page (not parallel to either of the above and below)
                this.mapTitles = Object.values(mw.config.get("interactiveMaps")).map(function(m) { return m.name; });
    
                // interactive-map-xxx elements from the DOM
                this.mapElements = document.querySelectorAll(".interactive-maps-container > [class^=\"interactive-map-\"]");

                // The interactive-map-xxxxxx className is only unique to the Map definition, not the map instance, so give each map a unique ID
                for (var i = 0; i < this.mapElements.length; i++)
                    this.mapElements[i].id = generateRandomString(16);
                
                // Create a stylesheet that can be used for some MapsExtended specific styles
                this.stylesheet = mw.util.addCSS("");
                
                // Events - This object is automatically filled from the EventHandlers in the "events" object of ExtendedMap
                // Using this interface is a quick way to to listen to events on ALL maps on the page rather than just a specific one
                this.events = {};
    
                this.loaded = true;
    
                // Preprocess marker elements so there's little flicker
                /*
                for (var m = 0; m < this.mapElements.length; m++)
                {
                    var customIcons = this.mapElements[m].querySelectorAll(".MapMarker-module_markerCustomIcon__YfQnB");
                    for (var i = 0; i < customIcons.length; i++)
                        customIcons[i].style.marginTop = "calc(" + customIcons[i].style.marginTop + " / 2)";
                }
                */
                
                var mapsExtended = this;

                // Fetch global configuration (from JavaScript)
                this.fetchGlobalConfig();

                // Fetch local configurations (from JavaScript and map definitions)
                this.fetchLocalConfigs();

                // Fetch embedded configurations (from data attributes on page)
                this.fetchEmbedConfigs();

                // These promises execute in parallel, and do not depend on each other
                return Promise.all(
                [
                    // Load module dependencies (Although it means delaying the initialization, it's better we don't have to have many mw.loader.using's everywhere)
                    this.loadDeps(),
                    
                    // Load i18n internationalization messages
                    this.loadi18n(),
                    
                    // Fetch remote map definitions - this is no longer done
                    this.fetchRemoteMapDefinitions(),

                    // Fetch remote local (or global) configurations (from JSON system message using API)
                    this.fetchRemoteConfigs(),
                ])

                // These promises execute sequentially

                // Validate all configurations
                .then(this.validateAllConfigs.bind(this))

                // Initialize all maps on the page
                .then(this.initMaps.bind(this))

                .finally(function()
                 {
                     this.initialized = true;
                     mw.hook("dev.mapsExtended").fire(this);
                     
                 }.bind(this));
            },

            deinit: function()
            {
                if (this.initialized == false) return;
                this.initialized = false;
                
                // Deinitialize all maps
                for (var key in this.maps)
                {
                    var map = this.maps[key];
                    map.deinit();
                    delete map.events;
                }

                delete this.maps;
                delete this.mapElements;
                delete this.mapTitles;
                delete this.events;

                /*
                // Remove all styles from stylesheet
                for (var i = 0; i < this.stylesheet.cssRules.length; i++)
                    this.stylesheet.deleteRule(i);

                this.stylesheet.ownerNode.remove();
                */
            },

            fetchGlobalConfig: function()
            {
                // Fetch global config from JavaScript (set in Common.js for example), depending on which is available first
                this.globalConfig = window.mapsExtendedConfigs && window.mapsExtendedConfigs["global"] || window.mapsExtendedConfig || {};
                this.isGlobalConfigLoaded = !isEmptyObject(this.globalConfig);
    
                // Apply the global config over the defaults
                if (this.isGlobalConfigLoaded == true)
                {
                    this.globalConfig._configId = "global";
                    this.globalConfig._configMapName = "";
                    this.globalConfig._configSource = "JavaScript";
                    this.globalConfig._configScope = "global";
                    this.globalConfig._configSourcePath = "";
                }
            },

            fetchLocalConfigs: function()
            {
                // Fetch the local configs for each map definition currently in memory (i.e. doesn't need an API call)
                for (var key in mw.config.get("interactiveMaps"))
                {
                    var map = mw.config.get("interactiveMaps")[key];
                    var config = undefined;
                    var configSource = undefined;

                    // Check JavaScript (keyed by map name or map page ID)
                    if (window.mapsExtendedConfigs && window.mapsExtendedConfigs[map.name] != undefined)
                    {
                        config = window.mapsExtendedConfigs[map.name];
                        configSource = "JavaScript";
                    }

                    // Check JSON (in Map definition)
                    else
                    {
                        // In the markers array of a map definition, get the first marker with a "config" object
                        var markerWithConfig = map.markers.find(function(m){ return m.config != undefined; });
                        
                        if (markerWithConfig)
                        {
                            config = markerWithConfig.config;
                            configSource = "JSON (in map definition)";
                            
                            // Remove the config object from the marker
                            delete markerWithConfig.config;
                        }
                    }

                    // If a config was found, save it to localConfigs
                    if (config != undefined)
                    {
                        config._configId = config._configMapName = map.name;
                        config._configSource = configSource;
                        config._configScope = "local";
                        this.localConfigs[map.name] = config;
                    }
                }

                // This flag determines whether we need to try and load a config using the API
                this.isLocalConfigsLoaded = Object.keys(this.localConfigs).length == Object.keys(mw.config.get("interactiveMaps")).length;
            },

            fetchEmbedConfigs: function()
            {
                // Fetch any embed configs currently present on the page
                for (var i = 0; i < this.mapElements.length; i++)
                {
                    // This is interactive-map-xxxxxxxx
                    var mapElem = this.mapElements[i];

                    // Find the definition that represents this map
                    var map = mw.config.get("interactiveMaps")[mapElem.className];

                    // Get the element DIV that encapsulates the transcluded map (the parent of interactive-map-container)
                    var configElem = mapElem.parentElement.parentElement;

                    // Short-circuit if the parent of the interactive-map-container is just the page content
                    // or if a map definition behind the mapElem wasn't found
                    if (!map || !configElem || configElem.id == "mw-content-text") continue;

                    var embedConfig = {};

                    // Check to see if a "config" data attribute exists, and if so, try to parse it for our entire embed configuration
                    if (configElem.hasAttribute("data-config"))
                    {
                        try
                        {
                            embedConfig = JSON.parse(comfigElem.dataset.config);
                        }
                        catch(error)
                        {
                            console.error("Could not parse data-config attribute to JSON object:\n" + error);
                        }
                    }
                    else
                    {
                        // Collect all the data attributes
                        for (var key in configElem.dataset)
                        {
                            var configInfo = configValidator.getConfigInfoAtPath(key);
                            if (configInfo.type == "array" || configInfo.type == "object")
                            {
                                try
                                {
                                    var obj = JSON.parse(configElem.dataset[key]);
                                    embedConfig[key] = obj;
                                }
                                catch(e)
                                {
                                    console.error("Could not parse embed config option " + key + " to " + configInfo.type + "\n" + e.toString());
                                }
                            }
                            else
                                embedConfig[key] = configElem.dataset[key];
                        }
                    }

                    // Store in mapsExtended.embedConfigs if there were data attributes present
                    if (!isEmptyObject(embedConfig))
                    {
                        embedConfig._configId = mapElem.id;
                        embedConfig._configMapName = map.name;
                        embedConfig._configSource = "Wikitext";
                        embedConfig._configScope = "embed";

                        // Don't store the embed config using the map name since the same map
                        // may be present multiple times on the page with different embed configs
                        this.embedConfigs[mapElem.id] = embedConfig;
                        
                        this.isEmbedConfigsLoaded = true;
                    }
                }
            },

            fetchRemoteMapDefinitions: function()
            {
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

                return new Promise(function(resolve, reject)
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
                                throw { type: "request", value: error };
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
                            if (errors.length > 0) throw {type: "response", value: errors };
                        })

                        // Catch and log any errors that occur
                        .catch(function(reason)
                        {
                            var str = "One or more errors occurred while " + (reason.type == "request" ? "performing HTTP request" : "parsing the HTTP response") + ". Custom properties may not be available!\n";

                            if (typeof reason.value == "object")
                                str += "--> " + reason.value.join("\n--> ");
                            else
                                str += "--> " + reason.value;

                            console.error(str);
                        });
                    }
                });
            },
            
            fetchRemoteConfigs: function()
            {
                var mapsExtended = this;

                // As to not pollute the Map JSON definitions, users may also store map configurations in a separate
                // file a subpage of MediaWiki:Custom-MapsExtended. For example a map with the name Map:Foobar will
                // use the page MediaWiki:Custom-MapsExtended/Foobar.json
                
                // MediaWiki: pages typically store system messages which are unabled to be edited, but those prefixed with "Custom-"
                // are whitelisted such that they can be edited by logged-in users. This prefix seems to be a free-for-use space, and
                // many scripts use it as a place to store configurations and such in JSON format

                // Below, we fetch this config and insert it into mapsExtended.localConfigs, keyed by the map name minus the Map: prefix
                
                // Don't bother using this method if all configs were already loaded
                if (mapsExtended.isGlobalConfigLoaded == true &&
                    mapsExtended.isLocalConfigsLoaded == true)
                    return;
                
                var MX_CONFIG_PREFIX = "MediaWiki:Custom-MapsExtended/";
                var MX_CONFIG_SUFFIX = ".json";

                var configNames = [].concat(mapsExtended.isLocalConfigsLoaded == false ? mapsExtended.mapTitles : [],
                                            mapsExtended.isGlobalConfigLoaded == false ? [ "global" ] : []);

                // Build a chain of map config titles, like x|y|z, which is sorted alphabetically and does not contain dupes
                // 1. Create an array based on a function which returns MediaWiki:Custom-MapsExtended/<mapname>.json (using Array.map)
                // 2. Create a set from the array (which removes duplicates)
                // 3. Convert the set back into an array (using Array.from)
                // 4. Sort the array
                // 5. Join each of the elements in an array to form a string
                var titles = Array.from(new Set(configNames.map(function(title) { return MX_CONFIG_PREFIX + title + MX_CONFIG_SUFFIX; }))).sort().join("|");

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
                    origin: "*",
                    maxage: 300,        // Set the max-age HTTP cache control header to this many seconds (5 minutes)
                    smaxage: 300,       // Set the s-maxage HTTP cache control header to this many seconds (5 minutes)
                    titles: titles      // A list of titles to work on
                });

                var fetchParams =
                {
                    method: "GET",
                    credentials: "omit",
                };

                var url = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/api.php?" + params.toString();

                var loadedConfigs = 0;
                
                // Perform the request, returning the promise that is fulfilled at the end of the chain
                return fetch(url, fetchParams)

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
                        throw { type: "request", value: error };
                    }

                    return data;
                })

                // When the response body text is parsed as JSON...
                .then(function(data)
                {
                    var pageData = Object.values(data.query.pages);
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
                            var config = JSON.parse(pageData[i].revisions[0].slots.main.content);
                            config._configId = config._configMapName = pageData[i].title.replace(MX_CONFIG_PREFIX, "").replace(MX_CONFIG_SUFFIX, "");
                            config._configSource = "JSON (in system message)";

                            // Insert it into mapsExtended.localConfig
                            if (config._configId == "global")
                            {
                                config._configScope = "global";
                                mapsExtended.globalConfig = config;
                                mapsExtended.isGlobalConfigLoaded = true;
                                loadedConfigs++;
                            }

                            // Insert it into mapsExtended.localConfigs
                            else
                            {
                                config._configScope = "local";
                                mapsExtended.localConfigs[config._configId] = config;
                                mapsExtended.isLocalConfigsLoaded = true;
                                loadedConfigs++;
                            }
                        }
                        catch(error)
                        {
                            errors.push("Error while parsing map data: " + error);
                            continue;
                        }
                    }

                    // Reject the promise, returning any errors
                    if (errors.length > 0) throw {type: "response", value: errors };
                })

                // Catch and log any errors that occur
                .catch(function(reason)
                {
                    var str = "One or more errors occurred while " + (reason.type == "request" ? "performing HTTP request" : "parsing the HTTP response") + ". Custom properties may not be available!\n";

                    if (typeof reason.value == "object")
                        str += "--> " + reason.value.join("\n--> ");
                    else
                        str += "--> " + reason.value;

                    log(str);
                })

                .finally(function(){
                    log("Loaded " + loadedConfigs + " remote MapsExtended configurations");
                });
            },

            // Validate all configurations, storing the validated config back into their associated object
            // This needs to be done backwards in order of presedence, as each scope uses the results of the last
            validateAllConfigs: function()
            {
                this.configValidator.validateConfig(this.defaultConfig);
                
                if (this.isGlobalConfigLoaded)
                {
                    this.globalConfigValidation = this.configValidator.validateConfig(this.globalConfig);
                    this.globalConfig = this.globalConfigValidation.configSelf;

                    if (this.isOnMapPage && (this.isInEditMode || isDebug))
                        this.configValidator.tabulateConfigValidation(this.globalConfigValidation);
                }

                for (var key in this.localConfigs)
                {
                    // Validate the local config for this map (the returned value will contain a new config with fallbacks of the global and default configs)
                    this.localConfigValidations[key] = this.configValidator.validateConfig(this.localConfigs[key]);
                    this.localConfigs[key] = this.localConfigValidations[key].configSelf;
                    
                    if (this.isOnMapPage && (this.isInEditMode || isDebug))
                        this.configValidator.tabulateConfigValidation(this.localConfigValidations[key]);
                }
                
                for (var key in this.embedConfigs)
                {
                    // Validate the embedded config for this map (the returned value will contain a new config with fallback of the local, global, and default configs)
                    this.embedConfigValidations[key] = this.configValidator.validateConfig(this.embedConfigs[key]);
                    this.embedConfigs[key] = this.embedConfigValidations[key].configSelf;
                    
                    if (this.isInEditMode || isDebug)
                        this.configValidator.tabulateConfigValidation(this.embedConfigValidations[key]);
                }

                // Here, set the final configs. This is merged result of the config and all configs below it
                
                if (this.isGlobalConfigLoaded)
                    this.globalConfig = this.globalConfigValidation.config;
                for (var key in this.localConfigs)
                    this.localConfigs[key] = this.localConfigValidations[key].config;
                for (var key in this.embedConfigs)
                    this.embedConfigs[key] = this.embedConfigValidations[key].config;

                if (isDebug)
                {
                    log("The following map configurations have been verified and loaded:");
                    if (this.isGlobalConfigLoaded)
                    {
                        log("Global configuration:");
                        log(this.globalConfig);
                    }
                    if (this.isLocalConfigsLoaded)
                    {
                        log("Local configuration(s):");
                        log(this.localConfigs);
                    }
                    if (this.isEmbedConfigsLoaded)
                    {
                        log("Embed configuration(s):");
                        log(this.embedConfigs);
                    }
                }
            },

            loadDeps: function()
            {
                var loadStartTime = performance.now();
                return mw.loader.using(["oojs-ui-core", "oojs-ui-windows"])
                .then(function()
                {
                    log("Loaded module dependencies in " + Math.round(performance.now() - loadStartTime) + "ms");
                });
            },

            // Fetch and load i18n messages
            loadi18n: function()
            {
                // i18n overrides (for testing purposes only)
                /*
                window.dev = window.dev || {};
                window.dev.i18n = window.dev.i18n || {};
                window.dev.i18n.overrides = window.dev.i18n.overrides || {};
                var overrides = window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};
                overrides["category-collected-label"] = "$1 of $2 collected";
                overrides["clear-collected-button"] = "Clear collected";
                overrides["clear-collected-confirm"] = "Clear collected markers?";
                overrides["clear-collected-banner"] = "Cleared $1 collected markers on $2.";
                overrides["collected-all-banner"] = "Congratulations! You collected all <b>$1</b> of <b>$2</b> \"$3\" markers on $4.";
                overrides["search-placeholder"] = "Search";
                overrides["search-hint-noresults"] = "No results found for \"$1\"";
                overrides["search-hint-results"] = "$1 markers in $2 categories";
                overrides["search-hint-resultsfiltered"] = "$1 markers in $2 categories ($3 filtered)";
                overrides["fullscreen-enter-tooltip"] = "Enter fullscreen";
                overrides["fullscreen-exit-tooltip"] = "Exit fullscreen";
                overrides["copy-link-banner-success"] = "Copied to clipboard";
                overrides["copy-link-banner-failure"] = "There was a problem copying the link to the clipboard";
                overrides["sidebar-header"] = "$1 - Interactive Map";
                overrides["sidebar-categories-header"] = "Categories";
                overrides["sidebar-show-all-button"] = "Show All";
                overrides["sidebar-hide-all-button"] = "Hide All";
                overrides["sidebar-hide-tooltip"] = "Hide sidebar";
                overrides["sidebar-show-tooltip"] = "Show sidebar";
                console.log("i18n messages are being overridden!");
                */
                
                var loadStartTime = performance.now();

                // The core module doesn't use any translations, but we might as well ensure it's loaded before running other modules
                return new Promise(function(resolve, reject)
                {
                    mw.hook("dev.i18n").add(function(i18n)
                    {
                        var CACHE_VERSION = 5; // Increment manually to force cache to update (do this when new entries are added)

                        i18n.loadMessages("MapsExtended", { cacheVersion: CACHE_VERSION }).done(function(i18n)
                        {
                            log("Loaded i18n library + messages in " + Math.round(performance.now() - loadStartTime) + "ms");
                            
                            // Save i18n instance to mapsExtended object
                            mapsExtended.i18n = i18n;
                            resolve();
                        });
                    });
                });
            },

            // Get existing maps on the page and create ExtendedMaps for them
            initMaps: function()
            {
                var initPromises = [];

                for (var i = 0; i < this.mapElements.length; i++)
                {
                    var map = new ExtendedMap(this.mapElements[i]);
                    this.maps.push(map);

                    // We may have to wait a few frames for Leaflet to initialize, so
                    // create a promise which resolves then the map has fully loaded
                    initPromises.push(map.waitForPresence());
                }

                // Wait for all maps to appear
                return Promise.allSettled(initPromises)
                    
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
                    
                }.bind(this))

                .catch(function(reason)
                {
                    console.error(reason);
                });
            }
        };

        var mapsExtended = new MapsExtended();
        
        // Cache mapsExtended in window.dev
        window.dev = window.dev || {};
        window.dev.mapsExtended = mapsExtended;

        // This hook ensures that we init again on live preview
        mw.hook("wikipage.content").add(function(content)
        {
            // prevObject will not be undefined if this is a live preview.
            // The issue with live preview however, is that there is no hook that fires when the content is fully loaded
            // The content object is also detached from the page, so we can't observe it
            if (mapsExtended.initialized && content.prevObject)
            {
                var wikiPreview = document.getElementById("wikiPreview");
                
                // Deinit the existing maps
                mapsExtended.deinit();

                // Content is detached from the page, add a MutationObserver that will listen for re-creation of interactive-map elements
                new MutationObserver(function(mutationList, observer)
                {
                    // If there were any added or removed nodes, check whether the map is fully created now
                    if (mutationList.some(function(mr)
                    {
                        for (var i = 0; i < mr.addedNodes.length; i++)
                        {
                            var elem = mr.addedNodes[i];
                            return elem instanceof Element &&
                            (elem.classList.contains("interactive-maps") ||
                                elem.classList.contains("leaflet-container") ||
                                elem.closest(".interactive-maps-container") != undefined ||
                                elem.matches(".interactive-maps-container > [class^=\"interactive-map-\"]"));
                        }

                        return false;
                    }))
                    {
                        observer.disconnect();
                        mapsExtended.init();
                    }
                    
                }).observe(wikiPreview, { subtree: true, childList: true });
            }
            
            // Otherwise if it was a regular preview, just initialize as normal
            else
            {
                mapsExtended.init();
            }
        });

        /*
        mapsExtended.stylesheet.insertRule(".interactive-maps, .interactive-maps * { pointer-events: none; cursor: default; }")
        mapsExtended.stylesheet.insertRule(".LoadingOverlay-module_overlay__UXv3B { z-index: 99999; }");

        // Add a loading overlay to each map
        for (var i = 0; i < mapsExtended.mapElements.length; i++)
        {
            var mapElement = mapsExtended.mapElements[i];
            mapElement.style.cursor = "default";
            var leafletContainer = mapElement.querySelector(".leaflet-container");
            leafletContainer.classList.add("loading");

            var loadingOverlay = ExtendedMap.prototype.createLoadingOverlay();
            leafletContainer.appendChild(loadingOverlay);
        }
        */
        
        var imports = 
        {
            articles:
            [
                "u:dev:MediaWiki:I18n-js/code.js",
                "u:dev:MediaWiki:BannerNotification.js",
                "u:dev:MediaWiki:WDSIcons/code.js"
            ]
        };

        // importArticles cannot detect whether a CSS has been imported already (it will simply stack)
        // Check for the presence of the .mapsExtended rule to detemine whether to import
        var isMxCSSImported = findCSSRule(".mapsExtended") != undefined;
        if (!isMxCSSImported) imports.articles.push("u:dev:MediaWiki:MapsExtended.css");

        // Load dependencies
        importArticles(imports);

        // Load modules
        /*
        loadModule("tooltips").then(function(tooltip)
        {
            mw.hook("wds-tooltips").fire(tooltip);
        });
        */
        
    };

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
        // Script was already loaded in this window
        if (window.dev && window.dev.mapsExtended && window.dev.mapsExtended.loaded == true)
        {
            console.error("MapsExtended - Not running script more than once on page!");
            return;
        }

        // Script wasn't yet loaded
        else
        {
            mx();
        }
    }

    // The document cannot change readyState between the if and else
    if (document.readyState == "loading")
        document.addEventListener("readystatechange", init);
    else
        init();

})();