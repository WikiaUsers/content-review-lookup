/*
    MapExtensions.js
    Author: Macklin

    This script allows map markers (of Fandom interactive maps) to be marked as "collected", via a checkbox
    that will be added to the popup when it is first created.

    Collected markers will be dimmed to indicate to the user that it has been collected, and the label of
    the associated category/filter will have (x of y collected) added to them

    Markers or categories can be marked as collectible by adding the boolean field "collectible" to their
    definition in the JSON, e.g. "collectible": true.
    In addition, categories may be hidden with the boolean field "hidden"
    
    The collected state will persist in the browser, and is stored in Web Storage / localStorage via the
    MediaWiki API, mw.storage - https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.storage

    The collected state for all markers is serialized to a single JSON object and is keyed in localStorage
    using a string containing the current page name, in the form "<wgPageName>_map_state". This means that
    a transcluded map will be stored separately to a non-transcluded map, or the same map across different pages

    If implemented via an import/include statement, the map should always be completely created by Leaflet
    before this script is run. 
    
*/
(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
    var fandomMapRoot = document.querySelector(".interactive-maps");
    var fandomMap = fandomMapRoot.querySelector(".interactive-maps__map");
    
    var filtersList = fandomMapRoot.querySelector(".interactive-maps__filters-list");
    var leafletOverlayPane = fandomMapRoot.querySelector(".leaflet-overlay-pane");
    var leafletMarkerPane = fandomMapRoot.querySelector(".leaflet-marker-pane");
    var leafletPopupPane = fandomMapRoot.querySelector(".leaflet-popup-pane");
    
    var baseImageLayer = leafletOverlayPane.querySelector(".leaflet-image-layer");
    var markerElements = leafletMarkerPane.querySelectorAll(".interactive-maps__marker-icon");
    var filterElements = filtersList.querySelectorAll(".interactive-maps__filter");

    // Cache map data from mw.config to avoid flooding the console with
    // "Use of "interactiveMapMarkers" is deprecated. Use mw.config instead."
    var _interactiveMapMarkers = mw.config.get("interactiveMapMarkers");
    var _interactiveMapMarkerCategories = mw.config.get("interactiveMapMarkerCategories");
    var _interactiveMapBounds = mw.config.get("interactiveMapBounds");

    // Lookup tables (iterating interactiveMapMarkers is slow when the map has a lot of markers)
    var markerLookup = new Map();
    var categoryLookup = new Map();

    var lastMarkerClickedId;

    // Collected state variables
    const STATE_KEY = mw.config.get("wgPageName") + "_map_state";

    const MARKER_COLLECTED_OPACITY = 0.35;
    const ALL_COLLECTIBLE = false;
    var hasCollectibles = false;

    // Unscaled size / bounds (non-inverted)
    const mapBounds = { width: _interactiveMapBounds[1][0], height: _interactiveMapBounds[1][1] };

    // Invert mapBounds if its still broken
    const initialScaledMapSize = { width: parseInt(baseImageLayer.style.width),
                                   height: parseInt(baseImageLayer.style.height) };

    if ((mapBounds.width > mapBounds.height && initialScaledMapSize.width < initialScaledMapSize.height) ||
        (mapBounds.height > mapBounds.width && initialScaledMapSize.height < initialScaledMapSize.width))
    {
        var width = mapBounds.width;
        mapBounds.width = mapBounds.height;
        mapBounds.height = width;
    }

    init();

    function init()
    {
        // Fetch the last "collected" states
        var stateJson = mw.storage.get(STATE_KEY);
        var state = {};

        if (stateJson == false)
            console.error("FandomMapExtensions - LocalStorage is not available! States will not be saved");

        state = JSON.parse(stateJson);

        // Associate category/filter elements with the categories in the JSON
        for (var i = 0; i < filterElements.length; i++)
        {
            var label = filterElements[i].querySelector(".interactive-maps__filter-label > span").textContent;
            var c = _interactiveMapMarkerCategories.find(x => x.name == label);

            if (c)
            {
                // Store root filter element
                c.filterElement = filterElements[i];
                c.filterElement.id = "filter_" + c.id;
                c.checkboxElement = c.filterElement.querySelector("input");
                categoryLookup.set(c.id, c);

                // Store all markers within this category
                c.markers = _interactiveMapMarkers.filter(x => x.categoryId == c.id);

                // Add some helper functions
                c.setLabelText = function(str) { this.filterElement.querySelector(".interactive-maps__filter-label > span").innerHTML = str; }

                c.updateCollectedCountLabel = function()
                {
                    if (!this.collectible && !this.markers.some(m => m.collectible))
                        return;

                    // While a category may be collectible, individual markers within the category
                    // may still override the collectible state (though not the other way around)
                    var collectedCount = 0;
                    var collectibleCount = 0;

                    for (var j = 0; j < this.markers.length; j++)
                    {
                        if (this.markers[j].collectible)
                        {
                            collectibleCount++;

                            if (this.markers[j].collected)
                                collectedCount++;
                        }
                    }

                    this.setLabelText(this.name + "<br/><span>(" + collectedCount + " of " + collectibleCount + " collected)");
                }

                // Reset the opacity of collected markers when the checkbox is re-checked
                if (c.collectible || ALL_COLLECTIBLE)
                {
                    hasCollectibles = true;

                    c.checkboxElement.addEventListener("change", function(e)
                    {
                        var category = categoryLookup.get(e.currentTarget.parentNode.id.replace("filter_", ""));

                        if (e.currentTarget.checked == true)
                        {
                            // Set collected to collected to trigger setter
                            category.markers.forEach((m) => m.collected = m.collected);
                        }
                    });
                }
            }
        }

        // Next, try to associate markers in the JSON definition with their marker elements
        for (var i = 0; i < _interactiveMapMarkers.length; i++)
        {
            // Marker (json)
            var m = _interactiveMapMarkers[i];

            // Marker (element)
            var me;

            // Give the marker an ID if it is undefined
            if (!m.id) m.id = calculateMarkerHash(m);

            // If all markers are present, we can just pick the element at the same position/index as the element

            // The leaflet marker elements don't have any identifying information that can be used
            // to associate them with markers in the JSON. However they are created in the same order
            // they appear in the JSON, and we can use this to associate the two (assuming they're all present)

            // Even if the amount of elements and definitions is equal, if some categories are disabled by default
            // when they are re-enabled, the new markers will be added to the bottom of the element
            if (markerElements.length == _interactiveMapMarkers.length)
            {
                me = markerElements[i];

                const meAssoc = tryAssociateMarkerJson(m);

                if (me._leaflet_id != meAssoc._leaflet_id)
                    console.Log("Failed to associate " + m.id);
            }

            // Otherwise it's a bit tricker, as we try to associate using the position
            // This also means some markers will not have a markerElement attached!
            else
                me = tryAssociateMarkerJson(m);

            // Warn if there already exists a marker with this ID
            if (markerLookup.has(m.id))
                console.error("Multiple markers exist with the id " + m.id + "!");

            // Store some references
            markerLookup.set(m.id, m);  // <- To the JSON data in a lookup table

            if (me != undefined)
            {
                m.markerElement = me;   // <- To the element in the JSON data
                me.id = m.id;

                addMarkerClickEvents(me);
            }

            // Check if the marker is collectible (i.e. collectible field is true on self or category)
            m.collectible = (m.collectible == true || getCategoryWithId(m.categoryId)?.collectible == true || ALL_COLLECTIBLE);

            if (m.collectible)
            {
                hasCollectibles = true;

                // Define a custom setter to change opacity of the marker when collected changes
                // this way we won't have to repeat the code as much
                Object.defineProperty(m, "collected",
                {
                    get: function()
                    {
                        return this._collected;
                    },
                    set: function(value)
                    {
                      this._collected = value;

                      if (this.markerElement)
                        this.markerElement.style.opacity = this._collected ? MARKER_COLLECTED_OPACITY : "";
                    }
                });

                m.collected = (state && state[m.id] !== undefined) ? state[m.id] : false;
            }
        }

        // Now that we have both markers and categories:
        categoryLookup.forEach((c) =>
        {
            c.updateCollectedCountLabel();
            
            if (c.hidden == true)
            {
                c.checkboxElement.checked = false;
                c.checkboxElement.dispatchEvent(new Event("change"));
            }
        });

        if (hasCollectibles)
        {
            filtersList.insertAdjacentHTML("beforeend", `<div style="text-align: right;"><a style="font-weight: 700; font-size: 11px; cursor: pointer">CLEAR COLLECTED</a></div>`);
            var clearButton = filtersList.lastElementChild.firstElementChild;
            clearButton.addEventListener("click", () =>
            {
                if (window.confirm("Clear the collected state on all markers? This cannot be undone!"))
                {
                    // Un-collect all markers
                    markerLookup.forEach((m) => m.collected = false);

                    // Update the labels
                    categoryLookup.forEach((c) => c.updateCollectedCountLabel());

                    state = null;
                    saveMarkerStates();
                }
            });
        }

        // Create a MutationObserver to know when a popup is created/shown
        var popupObserver = new MutationObserver((mutationList, observer) =>
        {
            // Because the click event (above) is always fired before the popup is shown,
            // we can somewhat reliably associate a popup with a marker
            if (mutationList[0].type == "childList" && mutationList[0].addedNodes.length > 0)
            {
                onPopupShown(lastMarkerClickedId, mutationList[0].addedNodes[0]);
            }

        }).observe(leafletPopupPane, { childList: true });

        // Create a MutationObserver to know when markers are added
        var markerObserver = new MutationObserver((mutationList, observer) =>
        {
            for (var i = 0; i < mutationList.length; i++)
            {
                // Check that it was indeed a marker that was added
                if (mutationList[i].type == "childList" && mutationList[i].addedNodes.length > 0 &&
                    mutationList[i].addedNodes[0].classList.contains("leaflet-marker-icon"))
                {
                    // Check if the marker has not yet been associated
                    var me = mutationList[i].addedNodes[0];
                    if (me.id == false && markerLookup.has(me.id) == false)
                    {
                        var jsonMarker = tryAssociateMarkerElement(me);
                        if (jsonMarker != undefined)
                        {
                            jsonMarker.markerElement = me;
                            me.id = jsonMarker.id;
                            jsonMarker.collected = jsonMarker.collected;
                            addMarkerClickEvents(me);
                        }
                    }
                }
            }
        }).observe(leafletMarkerPane, { childList: true });

        // Deinit (and save states when the document is closed)
        window.addEventListener("beforeunload", saveMarkerStates);
    }

    function saveMarkerStates()
    {
        // Serialize the "collected" state of collectible markers
        var state = { };
        _interactiveMapMarkers.forEach(function(m) { if (m.collectible) state[m.id] = m.collected; });
        var json = JSON.stringify(state);

        // Write to localStorage (via MediaWiki API)
        mw.storage.set(STATE_KEY, json);
    }

    function onMarkerClicked(id)
    {
        lastMarkerClickedId = id;
        console.log("Clicked " + id)
    }

    function onPopupShown(id, popup)
    {
        console.log("Popup shown for marker " + id);
        var marker = markerLookup.get(id);
        var isNew = false;

        if (marker)
        {
            // Check if this is a "new" popup, and if so, cache it
            // Leaflet doesn't recreate popups, and will store the popup outside of the DOM once it disappears
            if (marker.popupElement == undefined)
            {
                marker.popupElement = popup;
                isNew = true;
            }

            if (marker.collectible)
            {
                // Add a checkbox to the newly-created popup
                if (isNew)
                {
                    // Add margin to the title so that it doesn't overlap the checkbox
                    popup.querySelector(".map-marker-popup__title").style.marginRight = "20px";

                    // Create "collect" checkbox on popup
                    popup.insertAdjacentHTML("beforeend", `<div style="position: absolute; right: 0; top: 14px;">
                        <input id="toggle-collected" name="toggle-collected" type="checkbox" class="wds-checkbox">
                        <label for="toggle-collected"></label>
                    </div>`);

                    // Fetch and cache the checkbox element, since we didn't create it programatically
                    marker.checkboxElement = popup.querySelector("#toggle-collected");

                    marker.checkboxElement.addEventListener("change", function(e)
                    {
                        marker.collected = e.currentTarget.checked;
                        categoryLookup.get(marker.categoryId)?.updateCollectedCountLabel();
                        saveMarkerStates();
                    });
                };

                // Set checked based on stored "collected" state
                marker.checkboxElement.checked = marker?.collected || false;
            }
        }
    }

    function addMarkerClickEvents(elem)
    {
        // Add click + keydown listener
        elem.addEventListener("click", (e) => onMarkerClicked(e.currentTarget.id));
        elem.addEventListener("keydown", (e) =>
        {
            if (e.key == "Enter") onMarkerClicked(e.currentTarget.id)
        });
    }

    function getMarkerElementWithId(id)
    {
        return markerLookup.get(id);
    }

    function getUnscaledMarkerPosition(elem)
    {
        var markerPos = elem.markerPos;

        if (markerPos == undefined)
        {
            // Get base layer size. This needs to be calculated on the fly as it will change as the user zooms
            const baseLayerSize = { width: parseInt(baseImageLayer.style.width), height: parseInt(baseImageLayer.style.height) };

            markerPos = getScaledMarkerPosition(elem);

            // Scale the position back up to the original, and round
            markerPos.x = Math.round((markerPos.x / baseLayerSize.width) * mapBounds.width);
            markerPos.y = Math.round((markerPos.y / baseLayerSize.height) * mapBounds.height);

            // Cache this info in the element itself so we don't have to recalculate (or store it elsewhere)
            elem.markerPos = markerPos;
        }

        return markerPos;
    }

    function getScaledMarkerPosition(elem)
    {
        // Get base layer transform. This needs to be calculated on the fly as it will change as the user zooms
        const baseLayerTransform = getTranslateXY(baseImageLayer);

        // Subtract the current position of the map overlay to the marker position to get the scaled position
        const markerPos = getTranslateXY(elem);
        markerPos.x -= baseLayerTransform.x;
        markerPos.y -= baseLayerTransform.y;

        return markerPos;
    }

    // Scale full "unscaled" position to current map size
    function unscaledToScaledPosition(pos)
    {
        const baseLayerSize = { width: parseInt(baseImageLayer.style.width),
                                height: parseInt(baseImageLayer.style.height) };

        // Scale the position back up to the original, and round
        pos.x = Math.round((pos.x / mapBounds.width) * baseLayerSize.width);
        pos.y = Math.round((pos.y / mapBounds.height) * baseLayerSize.height);

        return pos;
    }

    // Try to find the marker element in the DOM that matches the marker definition in the JSON file,
    // using the position as the only basis of comparison
    function tryAssociateMarkerJson(marker)
    {
        // Get position of the marker definition in the JSON

        // Because it is scaled down (and rounded) from the fractional definition position,
        // scaling the element position back up will very likely yield significant error
        // So we instead do the comparison at the current scale of the map
        const scaledMarkerDefinitionPos = unscaledToScaledPosition({ x: marker.position[0],
                                                                     y: marker.position[1] });

        const markerCategoryColor = categoryLookup.get(marker.categoryId)?.color.toLowerCase();

        // Find the marker element with the same position as the marker definition, with 1 px of error
        for (var i = 0; i < markerElements.length; i++)
        {
            // "Sanity" check the element to see if at least its color matches
            if (markerElements[i].markerColor == undefined)
            {
                const svg = markerElements[i].firstElementChild;
                markerElements[i].markerColor = svg?.style.getPropertyValue("--marker-icon-color").toLowerCase();
            }

            // Skip if the color is present, but differs
            if (markerElements[i].markerColor && markerCategoryColor && markerElements[i].markerColor != markerCategoryColor)
                continue;

            const markerElementPos = getScaledMarkerPosition(markerElements[i]);
            if (Math.abs(scaledMarkerDefinitionPos.x - markerElementPos.x) <= 1 &&
                Math.abs(scaledMarkerDefinitionPos.y - markerElementPos.y) <= 1)
                return markerElements[i];
        }
    }

    // Try to find the marker definition in the JSON file that matches the marker element in the DOM,
    // using the position as the only basis of comparison
    function tryAssociateMarkerElement(elem)
    {
        // Get position of marker element
        const markerElementPos = getScaledMarkerPosition(elem);

        // Get color of marker
        const svg = elem.querySelector("svg");
        elem.markerColor = svg?.style.getPropertyValue("--marker-icon-color").toLowerCase();

        // Find the JSON marker with the same position as the marker element, with 1 px of error
        var jsonMarker = _interactiveMapMarkers.find(m =>
        {
            // "Sanity" check the definition to see if at least its color matches
            const markerCategoryColor = categoryLookup.get(m.categoryId)?.color.toLowerCase();

            // Skip if the color is present, but differs
            if (elem.markerColor && markerCategoryColor && elem.markerColor != markerCategoryColor)
                return false;

            // Get position of the marker definition in the JSON

            // Because it is scaled down (and rounded) from the fractional definition position,
            // scaling the element position back up will very likely yield significant error
            // So we instead do the comparison at the current scale of the map
            const scaledMarkerDefinitionPos = unscaledToScaledPosition({ x: m.position[0],
                                                                         y: m.position[1] });

            return Math.abs(markerElementPos.x - scaledMarkerDefinitionPos.x) <= 1 &&
                   Math.abs(markerElementPos.y - scaledMarkerDefinitionPos.y) <= 1;
        });

        return jsonMarker;
    }

    function getCategoryWithId(id)
    {
        return categoryLookup.get(id);
    }

    function getTranslateXY(element)
    {
        if (element._leaflet_pos) return element._leaflet_pos;

        const style = window.getComputedStyle(element)
        const matrix = new DOMMatrixReadOnly(style.transform)
        return {
            x: matrix.m41,
            y: matrix.m42
        }
    }

    // If a marker definition doesn't have a (unique) ID, we can identify it based on its position+title+desc
    function calculateMarkerHash(marker)
    {
        var str = "" + marker.position[0] + marker.position[1] + marker.title + marker.description;

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

    function uuidv4()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

})();