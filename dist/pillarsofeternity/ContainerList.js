/*
	Used in conjunction with Template:ContainerList and Template:Container
	This script handles creation of UI elements not allowed or not possible through wikitext, and facilitates sorting, filtering, and layout for said templates.
	
	Currently only supports one ContainerList per page - bad things might happen otherwise!
*/

(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
    var lootContainerList = document.querySelector(".loot-container-list");
    var lootContainers = lootContainerList.querySelectorAll(".loot-container");
    var lootContainerListHeader = lootContainerList.querySelector(".loot-container-list-header");
    var lootContainerListFilters = lootContainerList.querySelector(".loot-container-list-filters");
    var lootContainerListGrid = lootContainerList.querySelector(".loot-container-list-grid");
    var lootContainerListGridScroll = lootContainerListGrid.parentNode;
    var lootContainerNodes = document.querySelectorAll(".loot-container-node");
    
    var layoutButton = lootContainerList.querySelector(".loot-container-list-button-layout");
    var collapseButton = lootContainerList.querySelector(".loot-container-list-button");
    var groupDropdown = lootContainerList.querySelector(".loot-container-list-select");

    var worldmap = document.querySelector(".worldmap");

    var filterCheckboxes = [];  // <- All checkboxes
    var rootCheckboxes = [];    // <- Only the root-level checkboxes, can still use .childCheckboxes

    // The currently selected day, 0 for all, -1 for none
    var selectedDay = 0;

    // The currently selected group
    var selectedGroup = "all";

    // The current layout, values are "left-to-right" and "top-to-bottom"
    const LAYOUT_MODE_LS = "poewiki_containerlistlayout";
    var currentLayout = window.localStorage.getItem(LAYOUT_MODE_LS) || "top-to-bottom";
    var topToBottomLastHeight;

    var filtersShowing = false;
	
	var suspendAutoLayout = false;
	var suspendCheckboxEvents = false;

    // This is an array of filter strings
    // The values in types, the category keys above them, or the appropriate aliases
    // These should only be stored in the endpoint loot-results-items, or the root loot-container
    var LOOT_FILTERS =
    {
        "containers":
        {
            types: ["locked", "locked_key", "trapped", "hidden", "stealing", "fixed_loot", "random_loot"],
            flags: ["nopluralize"],
        },
        "accessory":
        {
            types: ["amulet", "belt", "ring"],
        },
        "armor":
        {
            types: ["breastplate", "brigandine", "cloth_armor", "hide_armor", "leather_armor", "mail_armor", "padded_armor", "plate_armor", "robe", "scale_armor"],
        },
        "clothing":
        {
            types: ["boots", "cloak", "handwear", "headgear"],
            aliases:
            {
                "handwear": ["bracers", "gauntlets", "gloves"],
                "headgear": ["helmet", "hat"]
            }
        },
        "weapon":
        {
            types: ["arbalest", "arquebus", "battle_axe", "blunderbuss", "club", "crossbow", "dagger", "estoc", "flail", "great_sword", "hatchet", "hunting_bow", "mace", "morning_star", "pike", "pistol", "pollaxe", "quarterstaff", "rapier", "rod", "sabre", "scepter", "spear", "stiletto", "sword", "wand", "war_bow", "war_hammer"]
        },
        "shield":
        {
            types: ["large_shield", "medium_shield", "small_shield"]
        },
        "consumable":
        {
            types: ["food and drink", "drug", "figurine", "potion", "scroll", "trap"],
            aliases:
            {
                "potion": ["poison"],
                "food and drink": ["food", "drink"]
            }
        },
        "ingredient":
        {
            types: ["gem", "monster_part", "plant"]
        },
        "other item":
        {
            types: ["currency", "grimoire", "key", "lore_item", "pet", "quest_item", "tool", "unique_item"],
            aliases:
            {
                "lore_item": ["book", "document", "journal", "letter"]
            }
        }
    };
	
	if (document.readyState !== "loading") { processContainerList(); }
	else { window.addEventListener("DOMContentLoaded", processContainerList); }
	
	function processContainerList()
	{
	    // Per container
	    cacheContainerVariables();
	    addCollapsible();
	    addDropdownEvents();
	    addMapNodeEvents();
	
	    // Loot list header
	    addGroupDropdown();
	    addExpandCollapseAllButton();
	    addLayoutButton();
	    addToggleFiltersButton();
	    addHeaderDayDropdown();
	    addResizeEvents();

	    // Filters
	    addFilterCheckboxes();

	    switchLayout(currentLayout);
	}

// ContainerList functions
	
	// Add container group dropdown
	// The group dropdown is initially an empty div, which will be populated with a
	// option element for each unique data-group in the loot-containers
	function addGroupDropdown()
	{
	    groupDropdown = changeElementTag(groupDropdown, "select");
	
	    var groups = [];                // <- Collection of actual groups
	    var undefinedGroup = undefined; // <- Group encompassing containers that aren't grouped
	
	    // Loop over containers and get all groups that are used
	    lootContainers.forEach((c) =>
	    {
	        var groupName = c.dataset.group;
	        var isActualGroup = groupName != undefined && groupName != "" && groupName != "all";
	        
	        var group = undefined;
	
	        if (isActualGroup)
	        {
	            // Find the group with this data-group name
	            for (var i = 0; i < groups.length; i++)
	            {
	                if (groups[i].name == groupName)
	                {
	                    group = groups[i];
	                    break;
	                }
	            }
	        }
	        else
	        {
	            group = undefinedGroup;
	        }
	
	        // Add new group if the group wasn't found in the existing groups
	        // or if the group wasn't defined and we don't yet have an undefined group
	        if (group == undefined)
	        {
	            // Value is the new index of there's actually a group, and "" if this group isn't a real group
	            var value = isActualGroup ? groups.length : "";
	
	            // Add a new group object to the groups array
	            group = { name: groupName, value: value, count: 0 };
	            
	            // Add the group to the array, or set undefinedGroup
	            if (isActualGroup)
	                groups.push(group);
	            else
	                undefinedGroup = group;
	        }
	
	        // Modify the data-group of the container and increment the count
	        c.dataset.group = group.value.toString();
	        group.count++;
	    });
	
	    // No groups are present, remove group dropdown since it will be unused
	    if (groups.length == 0)
	    {
	        groupDropdown.remove();
	        return;
	    }
	
	    // Groups are present, add group options
	    function addGroupOption(value, label, prepend)
	    {
	        var opt = document.createElement("option");
	        opt.setAttribute("value", value);
	        opt.setAttribute("label", label);
	
	        if (prepend) groupDropdown.prepend(opt);
	        else         groupDropdown.appendChild(opt);
	    }
	
	    // Add a new group option for each group.
	    // Note that options in the select will be listed in document order.
	    for (var i = 0; i < groups.length; i++)
	    {
	        addGroupOption(groups[i].value, groups[i].name + " (" + groups[i].count + ")");
	    }
	
	    // Add ungrouped option to the end if we have ungrouped containers
	    if (undefinedGroup != undefined)
	        addGroupOption("", "Ungrouped (" + undefinedGroup.count + ")");
	
	    // Add an "All containers" option to the start if there are more than one group
	    if (groups.length > 1)
	        addGroupOption("all", "All loot containers (" + lootContainers.length + ")", true);
	    
	    // Set up change events
	    groupDropdown.addEventListener("change", function(e)
	    {
	        // Find the option element associated with the selected value
	        // Get the data-containers attribute, representing the containers that should be visible
	        selectedGroup = groupDropdown.selectedOptions[0].value;

	        var groupMapNodes = [];
	
	        // Loop through all lootContainers and show them if they are contained in the containers array, hide them otherwise
	        lootContainers.forEach(function(c)
	        {
	            // Show
	            if (isContainerInSelectedGroup(c))
	            {
	                c.dataset.hidden = "false";
	                c.style.position = "relative";
	                c.style.left = c.style.top = "";

	                if (c.mapnode != undefined)
	                   groupMapNodes.push(c.mapnode);
	            }

	            // Hide
	            else
	            {
	                c.dataset.hidden = "true";
	                c.style.position = "absolute";
	                c.style.left = "-9999px";
	                c.style.top = "-9999px";
	            }
	        });
	
	        // Update heights, as content might switch between overflowing and not overflowing by changing the group dropdown
	        lootContainerList.style.minHeight = getLayoutMinHeight() + "px";
	        lootContainerList.style.maxHeight = getLayoutMaxHeight() + "px";
	
	        updateCollapseAllButton();
            updateCheckboxLabels();
	        applyCurrentFilter();
	        updateMapNodeVisuals();

            // Zoom out if viewing all
            if (selectedGroup == "all")
            {
                if (worldmap.resetPositionAndScale != null)
                    worldmap.resetPositionAndScale();
            }

	        // Center map on the center of all mapnode positions
	        else if (groupMapNodes.length > 0)
	        {
                worldmap?.centerOnElements(groupMapNodes);
	        }
	    });
	
	    // Immediately fire the event
	    changeGroupDropdownValue("all", true);
	}

    // Forcibly change the group dropdown to another value, dispatching a change event
	function changeGroupDropdownValue(value, dontDispatchEvent = false)
    {
        groupDropdown.value = value;

        if (dontDispatchEvent == false)
	       groupDropdown.dispatchEvent(new Event("change"));
    }
	
	// Add expand all/collapse all button
	function addExpandCollapseAllButton()
	{
	    collapseButton = changeElementTag(collapseButton, "button");
	
	    // Collapse or expand all containers when the button is clicked
	    collapseButton.addEventListener("click", function()
	    {
	        var expand = collapseButton.innerText == "Expand all";
	        var index = 0;
	
	        dontUpdateCollapseAllButton = true;
	
	        // Expand or collapse all collapsibles
	        lootContainers.forEach(function(c) { c.toggleCollapsible(expand); });
	        collapseButton.innerText = expand ? "Collapse all" : "Expand all";
	
	        dontUpdateCollapseAllButton = false;
	    });
	}
	
	var dontUpdateCollapseAllButton = false;
	
	// If the user clicks the expand/collapse all button, and then individually expands
	// or collapses the loot-containers, we should change the state of the button
	// When a majority of the containers are collapsed, show expand all
	// When a majority of the containers are expanded, show collapse all
	function updateCollapseAllButton()
	{
	    if (dontUpdateCollapseAllButton == true)
	        return;
	    
	    var expandedLootContainerCount = 0;
	    var collapsedLootContainerCount = 0;
	
	    lootContainers.forEach(function(c)
	    {
	        if (c.dataset.hidden != "true")
	        {
	            if (c.dataset.collapsed == "true")
	                collapsedLootContainerCount++;
	            else
	                expandedLootContainerCount++;
	        }
	    });
	
	    // Majority are collapsed
	    if (collapsedLootContainerCount > expandedLootContainerCount)
	        collapseButton.innerText = "Expand all";
	
	    // Majority are expanded
	    else
	        collapseButton.innerText = "Collapse all";
	}
	
	// Add a button which changes the layout of the containerlist from
	// top-to-bottom (multirow) to left-to-right (single row)
	function addLayoutButton()
	{
	    layoutButton = changeElementTag(layoutButton, "a");
	    topToBottomLastHeight = parseFloat(lootContainerList.style.height);
	    layoutButton.addEventListener("click", toggleLayout);
	}
	
	// Add overarching day dropdown
	function addHeaderDayDropdown()
	{
	    var dayDropdown = lootContainerList.querySelector(".loot-container-list-select-day");
	    
	    // Create a new select 
	    var select = document.createElement("select");
	    select.classList.add(...dayDropdown.classList);
	    select.style.cssText = dayDropdown.style.cssText;
	
	    // Add hide all and show all option
	    for (i = 0; i < 2; i++)
	    {
	       var opt = document.createElement("option");
	       opt.setAttribute("value", i == 0 ? "none" : "all");
	       opt.appendChild(document.createTextNode(i == 0 ? "Hide all" : "Show all"));
	
	       select.appendChild(opt);
	    }
	
	    // Add day options
	    for (i = 1; i <= 20; i++)
	    {
	        var opt = document.createElement("option");
	        opt.setAttribute("value", i);
	        opt.appendChild(document.createTextNode(addOrdinal(i)));
	
	        select.appendChild(opt);
	
	        // Select the first option by default
	        if (i == 1)
	        {
	            selectedDay = 1;
	            opt.setAttribute("selected", "");
	        }
	    }
	
	    // Replace the existing placeholder with an actual dropdown
	    dayDropdown.replaceWith(select);
	    dayDropdown = select;

        // Add dropdown event
	    dayDropdown.addEventListener("change", function(e)
	    {
	        lootContainers.forEach(function(c)
	        {
	            if (dayDropdown.value == "all")
	            {
	                c.toggleAllResults(true);
	                selectedDay = 0;
	            }
	            else if (dayDropdown.value == "none")
	            {
	                c.toggleAllResults(false);
	                selectedDay = -1;
	            }
	            else
                {
	                c.showResultsForDay(dayDropdown.value);
	                selectedDay = parseInt(dayDropdown.value);
                }
	        });

            updateCheckboxLabels();
	        applyCurrentFilter();
	    });
	}

	function addToggleFiltersButton()
	{
	    var filtersButton = lootContainerListHeader.querySelector(".loot-container-list-button-filter");
	    filtersButton = changeElementTag(filtersButton, "a");
	    filtersButton.addEventListener("click", function()
	    {
	        // Expand
	        if (lootContainerListFilters.dataset.collapsed == "true")
	        {
	            filtersShowing = true;
	            lootContainerListFilters.style.top = (lootContainerListHeader.clientHeight + 10) + "px";
                lootContainerListFilters.style.right = currentLayout == "top-to-bottom" ? "30px" : "10px";
                lootContainerListFilters.dataset.collapsed = "false";
	        }

	        // Collapse
            else
            {
                filtersShowing = false;
                lootContainerListFilters.style.right = "-170px";
                lootContainerListFilters.dataset.collapsed = "true"
            }
	    });
	}
	
	function getLayoutMinHeight()
	{
	    return lootContainerListHeader.offsetHeight;  
	}
	
	function getLayoutMaxHeight()
	{
	    var horizontalScrollbarSize = lootContainerListGridScroll.scrollWidth > lootContainerListGridScroll.clientWidth ? 20 : 0;
	    return getLayoutMinHeight() + lootContainerListGrid.offsetHeight + horizontalScrollbarSize;
	}
	
	function addResizeEvents()
	{
	    // Update the max-height of the root lootContainerList when the grid changes
	    var resizeObserverGrid = new ResizeObserver(() =>
	    {
	        if (suspendAutoLayout == true)
	            return;
	        
	        var minHeight = getLayoutMinHeight();
	        var maxHeight = getLayoutMaxHeight();

	        lootContainerList.style.minHeight = minHeight + "px";
	        lootContainerList.style.maxHeight = maxHeight + "px";
	    });
	    
	    resizeObserverGrid.observe(lootContainerListGrid);

        // Add resize event which will update the height of loot-containers
	    // that have all days shown when the size of the loot-container-list changes    
	    function resizeEnd()
	    {
	        lootContainers.forEach(function(c)
	        {
	            if (c.dataset.collapsed == "false" && c.dataset.day == "all")
	                c.style.height = c.getMaximumHeight() + "px";
	        });
	    }

	    var resizeObserverEnd = new ResizeObserver(debounce(resizeEnd, 150));
	    resizeObserverEnd.observe(lootContainerList);

	    var resizeObserverScroll = new ResizeObserver(debounce(() =>
	    {
	        // Calculate the minimum height of the filters box
	        lootContainerListFilters.style.top = (lootContainerListHeader.clientHeight + 10) + "px";
	        lootContainerListFilters.style.maxHeight = (lootContainerListGridScroll.clientHeight - 20) + "px";
	    }, 150));
	    resizeObserverScroll.observe(lootContainerListGridScroll);
	}

    // Creates a checkbox hierarchy from the LOOT_FILTERS variable above,
    // Disabling any checkboxes that are not present in the results
	function addFilterCheckboxes()
	{
	    var lootContainerListFilters = lootContainerList.querySelector(".loot-container-list-filters");
        var lootContainerListFiltersScroll = lootContainerListFilters.firstElementChild;

        // Loop through filters and create checkboxes
	    for (let [k, v] of Object.entries(LOOT_FILTERS))
	    {
            var div = document.createElement("div");
            lootContainerListFiltersScroll.appendChild(div);

	        var groupHeight = 0;

            // Root checkbox
            let rootCheckbox = createCheckbox(k, k, 0, div);
            let rootLabel = rootCheckbox.parentNode;

            rootCheckboxes.push(rootCheckbox);
            filterCheckboxes.push(rootCheckbox);
            rootCheckbox.childCheckboxes = [];

            // When this checkbox is changed...
            rootCheckbox.addEventListener("change", function(e)
            {
                // Update all checkboxes below it
                suspendCheckboxEvents = true;
                e.target.childCheckboxes.forEach(function(c){ c.checked = e.target.checked; });
                suspendCheckboxEvents = false;

                // Then trigger filter
                applyCurrentFilter();
            });

            rootCheckbox.updateIndeterminateState = function()
            {
                // Check to see if all child checkboxes are the same checked state
                var allEqual = this.childCheckboxes.every((x) => x.checked) ||
                               this.childCheckboxes.every((x) => !x.checked);
                
                // If some are different, set the indeterminate flag on the root checkbox
                this.indeterminate = !allEqual;

                // If all are the same, set the same state on the root - otherwise its always unchecked
                this.checked = allEqual ? this.childCheckboxes[0].checked : false;
            };

            // Checkbox for each item type
            for (var i = 0; i < v.types.length; i++)
            {
                var value = v.types[i];

                // Create the checkbox
                var checkbox = createCheckbox(value, k, 1, div);
                var label = checkbox.parentNode;

                // Store some references
                checkbox.parentCheckbox = rootCheckbox;
                rootCheckbox.childCheckboxes.push(checkbox);
                filterCheckboxes.push(checkbox);

                // And add an event when the checkbox is changed
                checkbox.addEventListener("change", function (e)
                {
                    // This will be set if the root checkbox changed
                    if (suspendCheckboxEvents) return;
                    applyCurrentFilter();

                    e.target.parentCheckbox.updateIndeterminateState();
                });
            }

            // If any of the checkboxes under the root are enabled, re-enable the root checkbox
            if (rootCheckbox.childCheckboxes.some((ck) => ck.disabled != "true"))
            {
                rootLabel.style.opacity = "";
                rootCheckbox.removeAttribute("disabled");
            }

            // Set some div styles
            div.style.height = rootLabel.clientHeight + "px";
	        div.style.transition = "height 0.5s";
            div.style.overflow = "hidden";
            div.dataset.collapsed = "true";
            rootLabel.style.display = "flex";

            // Collapse arrow container (click area)
            var arrowContainer = document.createElement("span");
	        arrowContainer.style.cursor = "pointer";
            arrowContainer.style.flexGrow = "1";

            // Collapse arrow (text)
	        var arrow = document.createElement("span");
	        arrow.style.float = "right";
	        arrow.style.transition = "transform 0.5s";
            arrow.style.transform = "rotate(90deg)";
	        arrow.style.pointerEvents = "none";
            arrow.appendChild(document.createTextNode("▼"));
	        arrowContainer.appendChild(arrow);

            rootLabel.appendChild(arrowContainer);

            // Collapse arrow click event
	        arrowContainer.addEventListener("click", function(e)
	        {
	            var group = e.target.parentNode.parentNode;
	            var label = e.target.parentNode;
	            var arrow = e.target.firstElementChild;

                e.preventDefault();

                // Expand
                if (group.dataset.collapsed == "true")
                {
                    var height = 0;
                    group.childNodes.forEach(function(c){ height += c.clientHeight; });
                    group.dataset.collapsed = "false";
                    group.style.height = height + "px";
                    arrow.style.transform = "rotate(0deg)";

                    if (currentLayout == "top-to-bottom")
                    {
                        var top = group.offsetTop - 5;

                        // Don't animate if scrollTop is close
                        if (Math.abs(group.parentNode.scrollTop - top) > 5)
                            $(group.parentNode).animate({scrollTop: top}, 500);
                    }
                    else if (currentLayout == "left-to-right")
                    {
                        var top = group.offsetLeft - 5;

                        if (Math.abs(group.parentNode.scrollLeft - top) > 5)
                            $(group.parentNode).animate({scrollLeft: top}, 500);
                    }
                }

                // Collapsed
                else
                {
                    group.dataset.collapsed = "true";
                    group.style.height = label.clientHeight + "px";
                    arrow.style.transform = "rotate(90deg)";
                }
	        });
	    }

        updateCheckboxLabels();
	}

    // Create a checkbox and append it to root
    function createCheckbox(value, group, indentLevel, root)
    {
        var label = document.createElement("label");
        label.style.whiteSpace = "nowrap";
        label.style.marginLeft = (20 * indentLevel) + "px";
        label.style.display = "block";

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "loot-filter-" + value);
        checkbox.setAttribute("value", value);
        checkbox.checked = false;

        // Replace underscores with spaces
        var text = value.replace("_", " ");

        // Add plural (skip if flags include nopluralize
        if (!(LOOT_FILTERS[group].flags?.includes("nopluralize")))
            text = addPlural(text);

        // Uppercase the first character
        text = uppercaseFirst(text);
        label.dataset.label = text;

        // Add the checkbox to the label
        label.appendChild(checkbox);

        // Add the text to the label, in a span
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        label.appendChild(span);

        // Add everything to the root
        root.appendChild(label);

        return checkbox;
    }

    function toggleLayout(layout)
    {
        if (currentLayout == "top-to-bottom")
            switchLayout("left-to-right");
        else if (currentLayout == "left-to-right")
            switchLayout("top-to-bottom");
    }

    function switchLayout(layout)
    {
        suspendAutoLayout = true;

        // Left-to-right layout
        if (layout == "left-to-right")
        {
            currentLayout = "left-to-right";
            topToBottomLastHeight = parseFloat(lootContainerList.style.height);

            lootContainerList.style.resize = "horizontal";
            lootContainerList.style.height = "100%";
            //lootContainerList.style.maxHeight = getLayoutMaxHeight() + "px";

            lootContainerListGrid.style.gridTemplateColumns = ""
            lootContainerListGrid.style.gridAutoRows = "";
            lootContainerListGrid.style.gridAutoColumns = "300px";
            lootContainerListGrid.style.gridAutoFlow = "column";
            //lootContainerListGrid.style.width = "fit-content";
            lootContainerListGridScroll.style.overflowX = "scroll";
            lootContainerListGridScroll.style.overflowY = "";

            layoutButton.innerText = "⍈";
        }

        // Top-to-bottom layout
        else if (layout == "top-to-bottom")
        {
            currentLayout = "top-to-bottom";
            lootContainerList.style.resize = "auto";
            lootContainerList.style.height = topToBottomLastHeight + "px";

            lootContainerListGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(300px, 1fr))"
            lootContainerListGrid.style.gridAutoRows = "min-content";
            lootContainerListGrid.style.gridAutoColumns = "";
            lootContainerListGrid.style.gridAutoFlow = "";
            lootContainerListGrid.style.width = "";
            lootContainerListGridScroll.style.overflowX = "";
            lootContainerListGridScroll.style.overflowY = "scroll";

            layoutButton.innerText = "⍗";
        }

        // Save the currentLayout to LocalStorage
        window.localStorage.setItem(LAYOUT_MODE_LS, currentLayout);

        if (filtersShowing)
            lootContainerListFilters.style.right = currentLayout == "top-to-bottom" ? "30px" : "10px";

        suspendAutoLayout = false;
    }

// Container functions

	function cacheContainerVariables()
	{
	    lootContainers.forEach(function(c)
	    {
	        // Container stores fixed loot in c.fixedLootItems
            c.fixedLootItems = c.querySelectorAll(".loot-container-fixed-item")

            if (c.fixedLootItems.length > 0)
            {
                for (var i = 0; i < c.fixedLootItems.length; i++)
                    c.fixedLootItems[i].filters = c.fixedLootItems[i].dataset.filters.split(";");
            }

	        // Container stores random lootlist results for each day
	        c.lootListResults = c.querySelector(".lootlist-results");
	        c.lootListResultsDays = [...c.querySelectorAll(".lootlist-results-day")];

	        // The root container only stores filters applicable to the containers (e.g. locked, fixed_loot, etc)
	        c.filters = c.dataset.filters?.split(";");

	        // All other filters are stored on the endpoint lootlistResultsItems
	        c.lootListResultsDays.forEach(function(d)
	        {
                // Each set of day results stores the items under it
                d.lootListResultsItems = [...d.querySelectorAll(".lootlist-results-item")];

                d.lootListResultsItems.forEach(function(i)
                {
                    if (i.dataset.filters == null)
                        i.filters = new Array(0);
                    else
                        i.filters = i.dataset.filters.split(";");
                })
	        });

	        // Get the loot-container-node associated with this loot-container
	        for (var i = 0; i < lootContainerNodes.length; i++)
	        {
	            var nodeID = lootContainerNodes[i].getAttribute("id");
	            var containerID = c.getAttribute("id");

	            if (nodeID.replace("_node", "") == containerID)
	                c.mapnode = lootContainerNodes[i];
	        }
	    });
	}
	
	// Add collapsible functionality to all loot-containers
	function addCollapsible()
	{
	    lootContainers.forEach(function(c)
	    {
	        // Create collapsible arrow
	        var arrow = c.querySelector(".loot-container-header-arrow");
	
	        var disableLootListResultsTimeout;

	        // Row containing the lootlist results
	        var lootListRow = c.childNodes[2];

	        c.minimumHeight = c.childNodes[0].offsetHeight + c.childNodes[1].offsetHeight + 1;
	        c.getMaximumHeight = function()
	        {
	            return c.minimumHeight + lootListRow.clientHeight + 1;
	        };
	
	        // Define the collapsible function as part of the root container
	        // so that other functions can invoke it with just the container reference
	        c.toggleCollapsible = function toggleCollapsible(value)
	        {
	            // Don't collapse or expand if the element is not shown, since the height will be 0
	            if (c.style.display == "none")
	                return;
	               
	            // Allow to specifically force a collapse or expand by passing a boolean
	            // true = Expand
	            // false = Collapse
	            // If this isn't present, use the dataset data-collapsed value
	            // Keep in mind that addEventListener passes a mouseEvent to this function
	            // which may be unexpected, so we check for this with typeof
	            if (value == undefined || typeof(value) != "boolean")
	                value = c.dataset.collapsed == "true";
	
	            // Expand
	            if (value == true)
	            {
	                clearTimeout(disableLootListResultsTimeout);
	                if (c.lootListResults != undefined) c.lootListResults.style.display = "";
	
	                c.dataset.collapsed = "false";
	                c.style.height = c.getMaximumHeight() + "px";
	                arrow.style.transform = "rotate(0deg)";
	            }
	
	            // Collapse
	            else if (value == false)
	            {
	                clearTimeout(disableLootListResultsTimeout);
	                disableLootListResultsTimeout = setTimeout(() => { if (c.lootListResults != undefined) c.lootListResults.style.display = "none"; }, 500);
	                
	                c.dataset.collapsed = "true";
	                c.style.height = c.minimumHeight + "px";
	                arrow.style.transform = "rotate(-90deg)";
	            }
	
	            updateCollapseAllButton();
	        };

            // Add an event listener on the first two rows which collapses the container
            for (var i = 0; i < 2; i++)
            {
                c.childNodes[i].addEventListener("click", c.toggleCollapsible);
            }

            // Update the height of the root container element to match the height of the table
	        c.updateCollapsibleHeight = function updateCollapsibleHeight()
	        {
                if (c.dataset.collapsed == "false")
                    c.style.height = c.getMaximumHeight() + "px";
	        }
	
	        // Add some styles (collapse by default)
	        c.style.height = c.minimumHeight + "px"
	        c.dataset.collapsed = "true";
	    });
	}
	
	// Add dropdown events for each lootContainer
	function addDropdownEvents()
	{
		lootContainers.forEach(function(c)
		{
	        // Show or hide all day results in random loot
	        c.toggleAllResults = function toggleAllResults(value)
	        {
	            if (value == undefined || typeof(value) != "boolean")
	                return;
	
	            c.dataset.day = value ? "all" : "none";

                // Don't continue if there are no results
	            if (c.lootListResultsDays == null || c.lootListResultsDays.length == 0)
	               return;
	
	            for (var i = 0; i < c.lootListResultsDays.length; i++)
	                c.lootListResultsDays[i].style.display = value ? "" : "none";
	
	            // Default to column-count 2 when showing/hiding all results
	            c.lootListResultsDays[0].parentNode.style.columnCount = 2;

	            // Change height of the collapsible div
	            c.updateCollapsibleHeight();
	        };
	
	        // Show results for a specific day of the month
	        c.showResultsForDay = function showResultsForDay(day)
	        {
	            day = parseInt(day);
	
	            if (day == undefined || typeof(day) != "number")
	                return;
	
	            c.dataset.day = day;

                // Don't continue if there are no results
	            if (c.lootListResultsDays == null || c.lootListResultsDays.length == 0)
	               return;
	               
	            for (var i = 0; i < c.lootListResultsDays.length; i++)
	            {
	                // Show depending on the data-day attribute (not the index, since they may not be in the correct order)
	                c.lootListResultsDays[i].style.display = (parseInt(c.lootListResultsDays[i].dataset.day) == day) ? "" : "none";
	            }
	
	            // Show only first column when showing one result
	            c.lootListResultsDays[0].parentNode.style.columnCount = 1;

                // Change height of the collapsible div
	            c.updateCollapsibleHeight();
	        }
	
	        // Show results for day 1
	        c.showResultsForDay(1);
		});
	}

	function highlightContainer(c, value)
	{
	    c.style.border = value ? "1px solid #f2c462" : "";
	}

    // This is just a more significant highlight to signify the container is the one that was clicked
    // The container is automatically "unflashed" after 1.5s
	function flashContainer(c, value)
	{
	    if (value == true) setTimeout(() => flashContainer(c, false), 1000);

        const includes = c.classList.contains("loot-container-selected");

	    if (value && !includes)
            c.classList.add("loot-container-selected")
	    else if (!value && includes)
	        c.classList.remove("loot-container-selected");
	}

	function scrollToContainer(c, onComplete = null)
	{
	    if (isContainerInSelectedGroup(c) == false)
            return;

        if (currentLayout == "top-to-bottom")
        {
            var top = c.offsetTop - lootContainerListGridScroll.offsetTop - 5;
            $(lootContainerListGridScroll).animate({scrollTop: top}, 500, "swing", onComplete);
        }
        else if (currentLayout == "left-to-right")
        {
            var left = c.offsetLeft - lootContainerListGridScroll.offsetLeft - 5
                       - (lootContainerListGridScroll.clientWidth / 2)
                       + (c.clientWidth / 2);
            $(lootContainerListGridScroll).animate({scrollLeft: left}, 500, "swing", onComplete);
        }
	}

    // Checks the container group against the selectedGroup, returning true if the they
    // are the same or if selectedGroup is all
	function isContainerInSelectedGroup(c)
    {
        if (c == null) return false;
        if (selectedGroup == "all")
            return true;
        else if (selectedGroup == "none")
            return false;
        else
            return c.dataset.group == selectedGroup;
    }

// Map / mapnode functions

    function highlightNode(node, value)
    {
        if (node.mouseover == true && value == false) return;
        
        const includes = node.classList.contains("loot-container-node-selected");

	    if (value && !includes)
            node.classList.add("loot-container-node-selected")
	    else if (!value && includes)
	        node.classList.remove("loot-container-node-selected");
    }

    function flashNode(node, value)
    {
        node.flashing = value;
	    if (value == true) setTimeout(() => flashNode(node, false), 1000);
	    highlightNode(node, value);
    }

    function addMapNodeEvents()
    {
        lootContainers.forEach(function(c)
        {
            if (c.mapnode == null) return;

            c.mapnode.addEventListener("mouseenter", function()
            {
                highlightContainer(c, true);
            });

            c.mapnode.addEventListener("mouseleave", function()
            {
                highlightContainer(c, false);
            });
            
            // Highlight the mapnode when the mouse enters the container
            c.addEventListener("mouseenter", function()
            {
                c.mapnode.mouseover = true;
                highlightNode(c.mapnode, true);
            });

            // ...clear the highlight when the mouse leaves
            c.addEventListener("mouseleave", function()
            {
                c.mapnode.mouseover = false;
                if (c.mapnode.flashing != true) highlightNode(c.mapnode, false);
            });

            // Scroll to the container when the mapnode is clicked
            c.mapnode.addEventListener("click", function()
            {
                // If the clicked node is not part of the currently-selected group,
                // change the dropdown to include all nodes
                if (!isContainerInSelectedGroup(c))
                    changeGroupDropdownValue("all");

                flashContainer(c, true);
                flashNode(c.mapnode, true);
                 
                // Then scroll to this container
                scrollToContainer(c);
            });

            // Click on the mapnode link in the header to jump to center the map to the node
            var mapNodeLink = c.querySelector(".loot-container-header-mapnode");
            mapNodeLink.addEventListener("click", function(e)
            {
                e.stopPropagation();
                
                flashContainer(c, true);
                flashNode(c.mapnode, true);

                worldmap.centerOnElement(c.mapnode);
            })
        });
    }

    // Nodes that are part of the selected group have 100% opacity
    // Nodes that aren't have 50% opacity
    function updateMapNodeVisuals()
    {
        lootContainers.forEach(function(c)
        {
            // Part of the selected group
            if (isContainerInSelectedGroup(c))
                c.mapnode.style.opacity = "100%";
            else
                c.mapnode.style.opacity = "40%";
        });
    }

// Filtering functions

    function getGroupOfFilterType(filterType)
    {
        for (let [k, v] of Object.entries(LOOT_FILTERS))
        {
            if (v.types.includes(filterType))
                return k;
        }
    }

    // Get a list of the currently selected filters
    // Excludes disabled checkboxes
    function getCurrentFilters()
    {
        var filters = [];

        for (var i = 0; i < filterCheckboxes.length; i++)
        {
            if (filterCheckboxes[i].checked && !filterCheckboxes[i].disabled)
                filters.push(filterCheckboxes[i].value)
        }

        return filters;
    }

    // Update all the checkbox labels (specifically the "(count)") to accurately reflect the
    // currently-selected group and day of the month, disabling those where no filters will match
    function updateCheckboxLabels()
    {
        // Check if there are actually matching containers with this type,
        // and if so append the count to the containers
        // ! Note that this is the number of containers with any item of this type,
        // ! NOT the number of items of that type across all containers

        for (var i = 0; i < rootCheckboxes.length; i++)
        {
            var rootCount = 0;
            var rootCheckbox = rootCheckboxes[i];

            for (var j = 0; j < rootCheckbox.childCheckboxes.length; j++)
            {
                var checkbox = rootCheckbox.childCheckboxes[j];

                var filters = addFilterAliases(checkbox.value);
                var count = findLootContainersWithFilter(filters, selectedDay, true).length;
                rootCount += count;

                updateLabel(checkbox, count);
            }

            if (rootCount > 0)
            {
                rootCheckbox.parentNode.style.opacity = "";
                rootCheckbox.removeAttribute("disabled");
            }
            else
            {
                rootCheckbox.parentNode.style.opacity = "50%";
                rootCheckbox.setAttribute("disabled", "true");
            }
        }

        function updateLabel(checkbox, count)
        {
            var label = checkbox.parentNode;
            var text = label.querySelector("span");

            // Disable the checkbox if the count is 0
            if (count == 0)
            {
                text.innerText = label.dataset.label;
                label.style.opacity = "50%";
                checkbox.setAttribute("disabled", "true");
            }
            else
            {
                text.innerText = label.dataset.label + " (" + count + ")";
                label.style.opacity = "";
                checkbox.removeAttribute("disabled");
            }
        }
    }

    // Extends the scope of the filter array passed by adding the aliases to applicable keywords
    // For example if "book" is present, "lore_item" will be added
    // or if "lore_item" is present, "book", "document", etc. will be added
    function addFilterAliases(filters)
    {
	    // Convert filters to array if it is not an array
        if (!Array.isArray(filters))
            filters = [ filters ];
         
        for (let group in LOOT_FILTERS)
        {
            // This group doesn't have aliases
            if (LOOT_FILTERS[group].aliases == null)
                continue;
            
            // Loop through the alias groups
            var aliases = LOOT_FILTERS[group].aliases;
            for (let aliasKey in aliases)
            {
                // Loop through the values - only if the filter doesn't already contain
                // the keyword that the aliases will be translated to
                if (!filters.includes(aliasKey))
                {
                    for (var i = 0; i < aliases[aliasKey].length; i++)
                    {
                        if (filters.includes(aliases[aliasKey]))
                        {
                            filters.push(aliasKey);
                            break;
                        }
                    }
                }

                // Add all the aliases if the key already exists
                else
                {
                    for (var i = 0; i < aliases[aliasKey].length; i++)
                        filters.push(aliases[aliasKey][i]);
                }
            }
        }

        return filters;
    }

    function applyCurrentFilter()
    {
        var filters = getCurrentFilters();
        filters = addFilterAliases(filters);

        var matchedContainers = [];

        lootContainers.forEach(function(c)
        {
            // Highlight matches on a container + day level
            var match = lootContainerHasMatches(c, filters, selectedDay)
            c.style.opacity = match || filters.length == 0 ? "100%" : "50%";

            if (match) matchedContainers.push(c);

            // Highlight matches on an item level
            var matches = lootContainerGetMatches(c, filters, selectedDay);

            // Loop over fixed loot
            if (c.fixedLootItems != null && c.fixedLootItems.length > 0)
            {
                for (var i = 0; i < c.fixedLootItems.length; i++)
                {
                    c.fixedLootItems[i].style.opacity = 
                        match == false || matches.includes(c.fixedLootItems[i]) ? "100%" : "50%";
                }
            }

            // Loop over random loot
            for (var d = 0; d < c.lootListResultsDays.length; d++)
            {
                var skipDay = false;
                var lootListResultsDay = c.lootListResultsDays[d];
                var lootlistResultsItem;

                // Don't check if item is contained in matches if it's for the wrong day
                if (selectedDay >= 1 && selectedDay <= 20)
                {
                    if (d != (selectedDay - 1))
                        skipDay = true;
                }

                // Loop over all items
                for (var i = 0; i < lootListResultsDay.lootListResultsItems.length; i++)
                {
                    lootListResultsItem = lootListResultsDay.lootListResultsItems[i];

                    lootListResultsItem.style.opacity = 
                        skipDay || match == false || matches.includes(lootListResultsItem) ? "100%" : "50%";
                }
            }
        });

        if (matchedContainers.length > 0)
        {
            var areAnyContainersInView = matchedContainers.some((x) => isElementWithinScrollView(x, lootContainerListGridScroll));

            // If no containers are in view, scroll to the first match
            if (!areAnyContainersInView) scrollToContainer(matchedContainers[0]);
        }
    }

    // Returns a list of loot-container that contain items matching the filter
    // Optionally, a day may be provided to only include results for a certain day of the month
	function findLootContainersWithFilter(filters, day = 0)
	{
	    var results = [];

        // Loop over every lootContainer...
        lootContainers.forEach(function(c)
        {
            // Ignore if this container isn't part of the currently selected group
            if (isContainerInSelectedGroup(c) == false)
                return;

            if (lootContainerHasMatches(c, filters, day, true))
                results.push(c);
        });

        return results;
    }

    // Test to see if any of the items in the loot container contain any of the item-level filters
    // or alternatively, if the container itself contains all container-level filters
    // (this behaviour may be overridden with the optional parameter anyContainerLevelFilters)
    // Optionally, a day may be provided to only include results for a certain day of the month
    function lootContainerHasMatches(c, filters, day = 0, anyContainerLevelFilters = false)
    {
        if (c == null) return false;

	    // Convert filters to array if it is not an array
        if (!Array.isArray(filters))
            filters = [ filters ];
        
        var itemFilters = [];
        var containerFilters = [];

        // Separate container-level and item-level filters
        for (var f = 0; f < filters.length; f++)
        {
            if (getGroupOfFilterType(filters[f]) == "containers")
                containerFilters.push(filters[f])
            else
                itemFilters.push(filters[f]);
        }

        // Check to see if the loot-container itself matches ALL container-level filters
        // Because a container can have multiple properties, this filter is treated as ALL (AND)
        // while item level filters are treated as ANY (OR)
        if (containerFilters.length > 0)
        {
            var match = false;
            for (var f = 0; f < containerFilters.length; f++)
            {
                // Return false for the first mismatch
                match = c.filters.includes(containerFilters[f]);

                if (match && anyContainerLevelFilters)
                    return true;
                if (!match && !anyContainerLevelFilters)
                    return false;
            }

            // If all, and we're here, return true
            if (!anyContainerLevelFilters)
                return true;
        }

        // Next, check to see if any of the items match the filters
        if (itemFilters.length > 0)
        {
            // Test fixed loot
            if (c.fixedLootItems != null && c.fixedLootItems.length > 0)
            {
                for (var i = 0; i < c.fixedLootItems.length; i++)
                {
                    if (filtersContainsAnyFilters(c.fixedLootItems[i].filters, itemFilters))
                        return true;
                }
            }

            // Test only a specific day
            if (day >= 1 && day <= 20)
            {
                var resultsDay = c.lootListResultsDays[day - 1];
                return (lootContainerDayHasMatches(resultsDay, itemFilters));
            }

            // Test all days
            for (var i = 0; i < c.lootListResultsDays.length; i++)
            {
                if (lootContainerDayHasMatches(c.lootListResultsDays[i], itemFilters))
                    return true;
            }
        }

        return false
    }

    // Returns a list of all elements in the container that match
    // any of the keywords container in the filter array
    // Note that this ignores container level filters
    function lootContainerGetMatches(c, filters, day = 0)
    {
        var results = [];

        // Test fixed loot
        if (c.fixedLootItems != null && c.fixedLootItems.length > 0)
        {
            for (var i = 0; i < c.fixedLootItems.length; i++)
            {
                if (filtersContainsAnyFilters(c.fixedLootItems[i].filters, filters))
                    results.push(c.fixedLootItems[i]);
            }
        }

        // Test only a specific day
        if (day >= 1 && day <= 20)
        {
            var lootListResultsDay = c.lootListResultsDays[day - 1];
            var dayResults = lootContainerDayGetMatches(lootListResultsDay, filters);

            // Add the day results to the final results
            for (var i = 0; i < dayResults.length; i++)
                results.push(dayResults[i]);
        }

        // Test all days
        for (var i = 0; i < c.lootListResultsDays.length; i++)
        {
            var matches = lootContainerDayGetMatches(c.lootListResultsDays[i], filters);
            if (matches.length > 0)
            {
                for (var m = 0; m < matches.length; m++)
                    results.push(matches[m]);
            }
        }

        return results;
    }

    // Test to see if any of the items in a lootlist-results-day matches any one
    // of the filters in the array passed to this function
    function lootContainerDayHasMatches(r, filters)
    {
        if (r == null) return false;

        for (var i = 0; i < r.lootListResultsItems.length; i++)
        {
            if (lootContainerItemHasMatches(r.lootListResultsItems[i], filters))
                return true;
        }

        return false;
    }

    // Get a list of all the filter matches of this lootlist-results-day
    function lootContainerDayGetMatches(r, filters)
    {
        if (r == null) return false;

        var results = [];

        for (var i = 0; i < r.lootListResultsItems.length; i++)
        {
            if (lootContainerItemHasMatches(r.lootListResultsItems[i], filters))
                results.push(r.lootListResultsItems[i]);
        }

        return results;
    }

    // Test to see if this lootlist-results-item matches any one of the filters
    function lootContainerItemHasMatches(i, filters)
    {
        if (i == null) return false;
        return filtersContainsAnyFilters(i.filters, filters);
    }

    // Checks to see if the within filters array contains any of the keywords in filters
    function filtersContainsAnyFilters(within, filters)
    {
        if (within == null || filters == null)
            return false;

        // Loop over each of the filter strings in the input parameter
        for (i = 0; i < filters.length; i++)
        {
            if (within.includes(filters[i]))
                return true;
        }

        return false;
    }

    function filtersContainsAllFilters(within, filters)
    {
        if (within == null || filters == null)
            return false;

        // Loop over each of the filter strings in the input parameter
        for (i = 0; i < filters.length; i++)
        {
            if (!within.includes(filters[i]))
                return false;
        }

        return true;
    }

// General helper functions

    function isElementOverflowingX(element)
    {
        return element.scrollWidth > element.clientWidth;
    }

    function isElementOverflowingY(element)
    {
        return element.scrollHeight > element.clientHeight;
    }

    // Returns true if the element, a direct child of a scrollable container is visible within the scrollable's scroll
    // By default this only checks to see if one edge (top for vertical scrolling, left for horizontally scrolling)
    // is within view, though you can set oppositeEdge to true to check the bottom/right edge respectively
    function isElementWithinScrollView(element, scrollable, oppositeEdge = false)
    {
        const hoz = isElementOverflowingX(scrollable);
        const ver = isElementOverflowingY(scrollable);

        // If no overflowing is occuring, the element must be within the scrollable
        if (!hoz && !ver) return true;

        if (hoz && isElementWithinScrollViewHoz(element, scrollable, oppositeEdge))
            return true;
        if (ver && isElementWithinScrollViewVer(element, scrollable, oppositeEdge))
            return true;

        return false;
    }

   	function isElementWithinScrollViewHoz(element, container, right = false)
	{
	    // Top offset relative to scroll viewport
        var offsetLeft = (element.offsetLeft - container.offsetLeft) - container.scrollLeft;
	    var scrollLeft = container.scrollLeft;

	    if (right) offsetLeft += element.offsetWidth;

	    // Is right of the left edge of the scroll window?
	    return offsetLeft > 0

        // If left of the right edge of the scroll window?
	    && offsetLeft < container.offsetWidth;
	}

	function isElementWithinScrollViewVer(element, container, bottom = false)
	{
	    // Top offset relative to scroll viewport
        var offsetTop = (element.offsetTop - container.offsetTop) - container.scrollTop;
	    var scrollTop = container.scrollTop;

	    if (bottom) offsetTop += element.offsetHeight;

	    // Is below the top edge of the scroll window?
	    return offsetTop > 0

        // Is above the bottom edge of the scroll window?
	    && offsetTop < container.offsetHeight;
	}

	function isElementFullyWithinScrollView(element, container)
	{
	    return isElementWithinScrollView(element, container, false) && isElementWithinScrollView(element, container, true);
	}
	
	// Change the tag of an element to newTag. This returns the created element and deletes the existing element!
	function changeElementTag(element, newTag)
	{
	    var newElement = document.createElement(newTag);
	
	    // Grab all of the original's attributes, and pass them to the replacement
	    for (var i = 0, l = element.attributes.length; i < l; i++)
	    {
	        newElement.setAttribute(element.attributes.item(i).nodeName,
	                                element.attributes.item(i).nodeValue);
	    }
	
	    // Copy child nodes (innerHTML doesn't seem to work all the time)
	    newElement.append(...element.childNodes);
	    element.replaceWith(newElement);
	
	    element = newElement;
	    element = null;
	
	    return newElement;
	}
	
	// Add the appropriate ordinal indicator to a given number (typically integer).
	// For an integer ending in 1, 2 or 3 (except for integers ending in 11, 12 or 13), the ordinal suffix will be -st, -nd and -rd, respectively.
	// If the input is not a number, no ordinal indicator will be added.
	function addOrdinal(num)
	{
	    var str = num.toString();
	
	    // Not a number, return the input as a string
	    if (typeof(num) != "number")
	        return str;
	
	    if (str.endsWith("1") && !str.endsWith("11"))
	        return str + "st";
	    else if (str.endsWith("2") && !str.endsWith("12"))
	        return str + "nd";
	    else if (str.endsWith("3") && !str.endsWith("13"))
	        return str + "rd";
	    else
	        return str + "th";
	
	    return str;
	}

    // Attempts to pluralize the specified text according to the rules of the English language.
    // - Words that end with "f" or "fe" are pluralized by replacing the "f(e)" with "ves".
	function addPlural(str)
	{
        var strl = str.toLowerCase();

        // Words that don't follow any rules (e.g. "mouse" becomes "mice") are returned from a dictionary
        var exceptions = [ { "": "" }, ];
        var ignore = [ "clothing", "currency", "handwear", "headgear" ];
        var endsWithIgnore = [ "armor" ];

        if (exceptions.hasOwnProperty(strl))
            return exceptions[strl];

        for (var i = 0; i < ignore.length; i++)
        {
            if (strl == ignore[i])
                return str;
        }

        for (var i = 0; i < endsWithIgnore.length; i++)
        {
            if (strl.endsWith(endsWithIgnore[i]))
                return str;
        }

        // Words that end with "y" (but not with a vowel preceding the y) are pluralized by replacing the "y" with "ies".
		if (strl.endsWith("y") &&
			!strl.endsWith("ay") &&
			!strl.endsWith("ey") &&
			!strl.endsWith("iy") &&
			!strl.endsWith("oy") &&
			!strl.endsWith("uy"))
            return str.substring(0, str.length - 1) + "ies";

		// Words that end with "us", "ss", "x", "ch" or "sh" are pluralized by adding "es" to the end of the text.
		else if (strl.endsWith("us") ||
		         strl.endsWith("ss") ||
		         strl.endsWith("x") ||
		         strl.endsWith("ch") ||
		         strl.endsWith("sh"))
			return str + "es";
		
		else if (strl.endsWith("s"))
			return str;

	    // Words that end with "f" or "fe" are pluralized by replacing the "f(e)" with "ves".
		else if ((strl.endsWith("ff") || strl.endsWith("fe")) && strl.length > 2)
			return str.substring(0, str.length - 2) + "ves";
        else if (strl.endsWith("f") && strl.length > 1)
			return str.substring(0, str.length - 1) + "ves";
		else
			return str + "s";
	}

	function uppercaseFirst(str)
	{
	    if (typeof str !== 'string')
	       return "";

        return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	function debounce(func, time)
	{
	    var time = time || 100; // 100 by default if no param
	    var timer;
	    return function(event)
	    {
	        if (timer) clearTimeout(timer);
	        timer = setTimeout(func, time, event);
	    };
	}

})();