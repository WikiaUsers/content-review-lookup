/*
    Toggles the display of elements on a page 
    Author: MrAwesome8
    Originally by: Austin Che https://openwetware.org/wiki/User:Austin_J._Che

    Indexed array of toggler  ids to array of associated toggle operations each 
    operation is a two element array, the first being the type, the second a class
    name or array of elements operation types are strings like "_reset" or "" for 
    the default toggle operation
*/
; (function ($) {
    // --- Module Scope Variables ---
    var elementInfos = [];          // Array storing info about each toggle-related element
    var classToElementInfoMap = {}; // Map: className -> [elementInfo, elementInfo, ...]
    var actives = [];               // Array holding currently active state class names (e.g., 'active_classA', 'inactive_classB')
    var toggleClasses = {           // Prefixes for known command/control classes
        "toggle": "_toggle",
        "toggler": "_toggler",
        "group": "_togglegroup", // Currently unused contextually, but reserved
        "init": "_toggle_init",
        "req": "_toggle_req",
        "reqall_group": "_toggle_reqall_group"
    };

    // --- Helper Functions ---

    /**
     * Gets elementInfo objects associated with a given class name or ID selector.
     * @param {string} selector - Class name or ID selector (e.g., 'active_classA', '#myElement').
     * @returns {Array|null} An array of elementInfo objects or null if not found.
     */
    function getElementInfosForSelector(selector) {
        if (typeof selector !== 'string') return null;

        if (selector.charAt(0) === '#') {
            var element = document.getElementById(selector.substring(1));
            return element ? [getElementInfoByElement(element)] : null;
        } else {
            // Return a copy to avoid external modification of the map's array
            return classToElementInfoMap[selector] ? [].concat(classToElementInfoMap[selector]) : null;
        }
    }

    /**
     * Finds the elementInfo object corresponding to a given DOM element.
     * @param {Element} element - The DOM element.
     * @returns {object|null} The elementInfo object or null.
     */
    function getElementInfoByElement(element) {
        for (var i = 0; i < elementInfos.length; ++i) {
            if (elementInfos[i].element === element) {
                return elementInfos[i];
            }
        }
        return null;
    }

    /**
     * Checks if an element class string starts with a known toggle command/control prefix.
     * @param {string} elementClass - The class name to check.
     * @param {string} key - The key from the `toggleClasses` object (e.g., 'init', 'req').
     * @returns {boolean} True if the class starts with the prefix.
     */
    function matchesCommandPrefix(elementClass, key) {
        // Check if key exists and elementClass is a non-empty string
        if (!toggleClasses[key] || typeof elementClass !== 'string' || !elementClass) return false;
        return elementClass.startsWith(toggleClasses[key]);
    }

    // --- Condition Checking ---

    /**
     * Checks standard requirements (_toggle_reqany, _toggle_reqall).
     * Elements pass if ALL requirements defined in `conditions` are met.
     * Each requirement is an array of classes. For reqany, it passes if ANY class in the array is active.
     * For reqall, it implicitly passes if the single class in the array is active.
     * @param {Array<Array<string>>} conditions - e.g., [['classA', 'classB'], ['classC']]
     * @returns {boolean} True if all conditions are met.
     */
    function checkStandardConditions(conditions) {
        if (!conditions || conditions.length === 0) return true; // No conditions = pass

        for (var k = 0; k < conditions.length; ++k) {
            var orConditionClasses = conditions[k]; // Classes for ONE requirement
            var requirementMet = false;
            for (var l = 0; l < orConditionClasses.length; ++l) {
                if (actives.indexOf(orConditionClasses[l]) !== -1) {
                    requirementMet = true;
                    break; // This OR requirement is met
                }
            }
            // If this requirement (which is part of the overall AND) was NOT met, the whole check fails
            if (!requirementMet) {
                return false;
            }
        }
        // If loop completes, all requirements were met
        return true;
    }

    /**
     * Checks grouped requirements (_toggle_reqall_group).
     * Elements pass if ANY of the defined groups have ALL their required classes active.
     * @param {Array<Array<string>>} groups - e.g., [['classA', 'classB'], ['classC', 'classD']]
     * @returns {boolean} True if at least one group condition is met.
     */
    function checkReqallGroupConditions(groups) {
        if (!groups || groups.length === 0) return true; // No group requirements = pass

        for (var i = 0; i < groups.length; ++i) {
            var groupClasses = groups[i]; // Classes for ONE group (AND logic within)
            var groupSatisfied = true; // Assume satisfied until proven otherwise
            for (var j = 0; j < groupClasses.length; ++j) {
                if (actives.indexOf(groupClasses[j]) === -1) {
                    groupSatisfied = false; // A required class is missing
                    break; // No need to check rest of this group
                }
            }
            // If this group was fully satisfied, the overall OR condition is met
            if (groupSatisfied) {
                return true;
            }
        }
        // No group satisfied the conditions
        return false;
    }

    /**
     * Determines if an element should be visible based on ALL its conditions.
     * @param {object} elementInfo - The elementInfo object.
     * @returns {boolean} True if the element should be visible.
     */
    function checkAllConditions(elementInfo) {
        return checkStandardConditions(elementInfo.conditions) && checkReqallGroupConditions(elementInfo.reqallGroups);
    }


    // --- Core Logic ---

    /**
     * Processes a toggle command (_show, _hide, _reset, default toggle).
     * Modifies the `actives` state and triggers a global visibility re-evaluation if necessary.
     * @param {string} op - The operation ('_show', '_hide', '_reset', 'default').
     * @param {string} commandTargetClass - The class name targeted by the command (e.g., 'active_classA').
     */
    function processCommand(op, commandTargetClass) {
        var targetElementInfos = getElementInfosForSelector(commandTargetClass); // Get infos matching the target class
        var stateChanged = false; // Did the 'actives' array change?

        // console.log(`Process Command: Op=${op}, TargetClass=${commandTargetClass}, TargetElementsFound=${targetElementInfos ? targetElementInfos.length : 0}`);
        // console.log(`Actives BEFORE: ${JSON.stringify(actives)}`);

        switch (op) {
            case "_show":
                if (commandTargetClass && actives.indexOf(commandTargetClass) === -1) {
                    actives.push(commandTargetClass);
                    stateChanged = true;
                }
                // Apply to elements matching the class (e.g. show the div with class 'active_classA')
                // Visibility will be finally determined by the global recheck if state changed.
                if (targetElementInfos) {
                    for (var j = 0; j < targetElementInfos.length; ++j) {
                        if (checkAllConditions(targetElementInfos[j])) { // Check element's own conditions
                            targetElementInfos[j].show();
                        }
                    }
                }
                break;

            case "_hide":
                if (commandTargetClass) {
                    var initialLength = actives.length;
                    actives = actives.filter(function (cls) { return cls !== commandTargetClass; });
                    if (actives.length < initialLength) {
                        stateChanged = true;
                    }
                }
                // Hide elements matching the class (e.g. hide the div with class 'active_classA')
                // Visibility will be finally determined by the global recheck if state changed.
                if (targetElementInfos) {
                    for (var j = 0; j < targetElementInfos.length; ++j) {
                        targetElementInfos[j].hide(); // Directly hide targets first
                    }
                }
                break;

            case "_reset": // Resets targeted elements to their original display style
                if (targetElementInfos) {
                    for (var j = 0; j < targetElementInfos.length; ++j) {
                        targetElementInfos[j].reset();
                    }
                    // Note: Reset doesn't change 'actives' but might change visibility,
                    // could potentially trigger recheck if needed, but keeping simple for now.
                }
                break;

            default: // Generic toggle (e.g., _toggler-someClass) - Flips visibility of targets
                if (targetElementInfos) {
                    for (var j = 0; j < targetElementInfos.length; ++j) {
                        var info = targetElementInfos[j];
                        if (info.isHidden()) {
                            info.show();
                        } else {
                            info.hide();
                        }
                    }
                }
                // Generic toggle does NOT change 'actives' state or trigger global recheck.
                break;
        } // end switch

        // --- Global Re-evaluation on State Change ---
        if (stateChanged) {
            // console.log(`--- Global Recheck Triggered --- Actives NOW: ${JSON.stringify(actives)}`);
            for (var idx = 0; idx < elementInfos.length; ++idx) {
                var info = elementInfos[idx];
                // Only re-evaluate elements that HAVE conditions defined
                if (info.conditions.length > 0 || info.reqallGroups.length > 0) {
                    var shouldBeVisible = checkAllConditions(info);
                    if (shouldBeVisible && info.isHidden()) {
                        // console.log(`Recheck: Showing #${info.elementId}`);
                        info.show();
                    } else if (!shouldBeVisible && !info.isHidden()) {
                        // console.log(`Recheck: Hiding #${info.elementId}`);
                        info.hide();
                    }
                }
            }
        }

        // Trigger scroll for lazy loading etc. after potential visibility changes
        $(window).trigger('scroll');

        // console.log(`Actives AFTER: ${JSON.stringify(actives)}`);
    } // end processCommand


    /**
     * Wraps the content of an element with a clickable link that triggers its commands.
     * @param {Element} element - The DOM element to wrap.
     * @param {number} elementInfoId - The index/ID of the element's info in the `elementInfos` array.
     */
    function createTogglerLink(element, elementInfoId) {
        var toggleLink = document.createElement("a");
        toggleLink.className = 'toggler-link';
        toggleLink.setAttribute('href', 'javascript:void(0);'); // Prevent page jump

        // Assign onclick handler to call the global toggler function
        toggleLink.onclick = function (e) {
            e.preventDefault(); // Stop link default behavior
            window.toggler(elementInfoId);
        };

        // Move element's children into the link
        while (element.firstChild) {
            toggleLink.appendChild(element.firstChild);
        }
        // Append the link back into the now-empty element
        element.appendChild(toggleLink);
    }

    // --- Initialization ---

    /**
     * Scans the document, builds elementInfo objects, and populates the class map.
     */
    function buildElementInfos() {
        elementInfos = []; // Clear previous data
        classToElementInfoMap = {};

        var contentArea = document.querySelector('#mw-content-text .mw-parser-output') || document.body;
        var allDocumentElements = contentArea.getElementsByTagName('*');

        for (var i = 0; i < allDocumentElements.length; ++i) {
            var element = allDocumentElements[i];
            if (!element || typeof element.className !== 'string' || element.className.trim() === '' || typeof element.className.split !== 'function') {
                continue; // Skip elements without valid classes
            }

            var infoId = elementInfos.length;
            var elementClasses = element.className.split(' ').filter(function (c) { return c.length > 0; });

            var elementInfo = {
                element: element,
                elementId: infoId,
                classList: elementClasses,
                commands: [],       // Parsed _toggler-... commands
                conditions: [],     // Parsed _toggle_req... conditions
                reqallGroups: [],   // Parsed _toggle_reqall_group... conditions
                initShown: null,    // Was _toggle_initshow/hide explicitly set?
                // Methods to manipulate display
                hide: function () { this.element.style.display = 'none'; },
                show: function () {
                    // Restore original display style, fallback to '' (browser default block/inline)
                    this.element.style.display = this._toggle_original_display && this._toggle_original_display !== 'none'
                        ? this._toggle_original_display
                        : '';
                },
                reset: function () {
                    this.element.style.display = this._toggle_original_display || '';
                },
                isHidden: function () { return this.element.style.display === 'none'; },
                _toggle_original_display: '' // Stores original display style
            };

            // Capture original display style reliably
            try {
                var currentStyleDisplay = element.style.display;
                if (currentStyleDisplay === 'none') {
                    elementInfo._toggle_original_display = 'none';
                } else if (currentStyleDisplay) { // Inline style is set and not 'none'
                    elementInfo._toggle_original_display = currentStyleDisplay;
                } else { // No inline style, get computed style
                    var computedDisplay = window.getComputedStyle(element).display;
                    // Use computed unless it's 'none' (use '' which defaults to block/inline)
                    elementInfo._toggle_original_display = computedDisplay === 'none' ? '' : computedDisplay;
                }
            } catch (e) {
                console.warn("Toggler: Error getting computed style for element", element);
                elementInfo._toggle_original_display = ''; // Fallback
            }

            // Add to main list and class map
            elementInfos.push(elementInfo);
            for (var k = 0; k < elementClasses.length; ++k) {
                var className = elementClasses[k];
                if (!classToElementInfoMap[className]) {
                    classToElementInfoMap[className] = [];
                }
                // Check if this info object is already in the map for this class
                if (classToElementInfoMap[className].indexOf(elementInfo) === -1) {
                    classToElementInfoMap[className].push(elementInfo);
                }
            }
        }
        // console.log(`[Toggler] buildElementInfos complete. Found ${elementInfos.length} potential elements.`);
    }

    /**
     * Parses a _toggler-... class string into an [op, targetClass] command array.
     * @param {string} elementClass - The toggler class name (e.g., '_toggler_show-active_classA').
     * @returns {Array|null} Command array like ['_show', 'active_classA'] or null.
     */
    function buildCommandArray(elementClass) {
        var baseTogglerPrefix = toggleClasses["toggler"];
        if (!elementClass || !elementClass.startsWith(baseTogglerPrefix)) return null;

        var commandPart = elementClass.substring(baseTogglerPrefix.length); // e.g., '_show-active_classA' or '-active_classA'

        var hyphenIndex = commandPart.indexOf('-');
        if (hyphenIndex !== -1) { // Format: _toggler_op-target
            var op = commandPart.substring(0, hyphenIndex); // e.g., '_show'
            var targetClass = commandPart.substring(hyphenIndex + 1);
            if (op && targetClass) {
                return [op, targetClass]; // Return ["_show", "active_classA"]
            }
        } else if (commandPart.length > 0 && commandPart.charAt(0) !== '_') { // Format: _toggler-target (generic toggle)
            var targetClass = commandPart;
            return ["default", targetClass]; // Return ["default", "active_classA"]
        }
        return null; // Invalid format
    }


    /**
     * Parses commands and conditions, sets initial state, adds links, runs initial check.
     */
    function buildCommandsAndState() {
        actives = []; // Reset state
        var knownStateClasses = {}; // Use object as a Set to store identifiable state classes

        // --- Parse classes -> commands, conditions, init state ---
        for (var i = 0; i < elementInfos.length; ++i) {
            var info = elementInfos[i];
            for (var j = 0; j < info.classList.length; ++j) {
                var className = info.classList[j];

                if (matchesCommandPrefix(className, "init")) {
                    var disp = className.substring(toggleClasses["init"].length);
                    if (disp === "show") info.initShown = true;
                    else if (disp === "hide") info.initShown = false;
                }
                else if (matchesCommandPrefix(className, "req") || matchesCommandPrefix(className, "reqall_group")) {
                    var hyphenIndex = className.indexOf('-');
                    if (hyphenIndex > -1) {
                        var conditionClasses = className.substring(hyphenIndex + 1).split('--')
                            .filter(function (c) { return c.length > 0; });

                        // Add these classes to our known state classes
                        conditionClasses.forEach(function (cls) { knownStateClasses[cls] = true; });

                        // Store the conditions/groups on the element info
                        if (conditionClasses.length > 0) {
                            if (matchesCommandPrefix(className, "reqall_group")) {
                                info.reqallGroups.push(conditionClasses);
                            } else { // Must be 'req'
                                var reqOp = className.substring(toggleClasses["req"].length, hyphenIndex);
                                if (reqOp === "any") info.conditions.push(conditionClasses);
                                else if (reqOp === "all") {
                                    conditionClasses.forEach(function (cls) { info.conditions.push([cls]); });
                                }
                            }
                        }
                    }
                }
                else if (matchesCommandPrefix(className, "toggler")) {
                    var command = buildCommandArray(className);
                    if (command) {
                        info.commands.push(command);
                        // Add the target class to known state classes
                        if (command[1]) { // Ensure targetClass exists
                            knownStateClasses[command[1]] = true;
                        }
                    }
                }
            }
        } 

        // --- Set initial visibility based *only* on init classes or original style ---
        for (var i = 0; i < elementInfos.length; ++i) {
            var info = elementInfos[i];
            if (info.initShown === true) info.show();
            else if (info.initShown === false) info.hide();
            else { // No init class, use original style
                if (info._toggle_original_display === 'none') info.hide();
                else info.show();
            }
        }

        // --- Calculate initial 'actives' based on visible elements ---
        var initialActiveSet = {}; // Use object as Set for uniqueness
        for (var i = 0; i < elementInfos.length; ++i) {
            var info = elementInfos[i];
            if (!info.isHidden()) { // If element is visible after Pass 2...
                for (var k = 0; k < info.classList.length; ++k) {
                    var cls = info.classList[k];
                    if (knownStateClasses[cls]) {
                        initialActiveSet[cls] = true;
                    }
                }
            }
        }
        actives = Object.keys(initialActiveSet); // Convert set keys to array
        // console.log(`[Toggler] Initial Actives Calculated: ${JSON.stringify(actives)}`);

        // --- Add Toggler Links ---
        for (var i = 0; i < elementInfos.length; ++i) {
            if (elementInfos[i].commands.length > 0) {
                createTogglerLink(elementInfos[i].element, i); // Pass index as ID
            }
        }

        // --- Final Initial Visibility Check based on conditions ---
        // console.log("[Toggler] --- Initial Visibility Check ---");
        for (var i = 0; i < elementInfos.length; ++i) {
            var info = elementInfos[i];
            if (info.conditions.length > 0 || info.reqallGroups.length > 0) {
                var shouldBeVisible = checkAllConditions(info);
                if (shouldBeVisible && info.isHidden()) {
                    // console.log(`Initial Check: Showing #${info.elementId}`);
                    info.show();
                } else if (!shouldBeVisible && !info.isHidden()) {
                    // console.log(`Initial Check: Hiding #${info.elementId}`);
                    info.hide();
                }
            }
        }
        // console.log("[Toggler] Initialization complete.");
    }


    /**
     * Initializes the toggler system on page load.
     */
    function toggleInit() {
        buildElementInfos();        // Scan DOM, create info objects and class map
        buildCommandsAndState();    // Parse commands, set initial state, run checks, add links
    }

    // --- Global Access ---

    /**
     * Global function called by toggler links.
     * @param {number} elementInfoId - The index/ID of the elementInfo object whose commands should run.
     */
    window.toggler = function (elementInfoId) {
        if (typeof elementInfoId !== 'number' || !elementInfos[elementInfoId]) {
            console.warn(`[Toggler] Invalid elementInfoId received: ${elementInfoId}`);
            return;
        }
        var commands = elementInfos[elementInfoId].commands;
        if (!commands || commands.length === 0) return; // No commands for this element

        // console.log(`--- Toggler called for element #${elementInfoId} ---`);
        for (var i = 0; i < commands.length; ++i) {
            var command = commands[i]; // e.g., ['_show', 'active_classA']
            if (command && command.length === 2) {
                processCommand(command[0], command[1]);
            }
        }
    };

    // --- Run Initialization ---
    $(toggleInit); // Use jQuery's document ready shorthand

})(window.jQuery);