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
    var elementInfos = [];
    var classToElementInfoMap = {}; // associative map of class names to page element info
    var actives = [];
    var toggleClasses = {
        "toggle": "_toggle",
        "toggler": "_toggler",
        "group": "_togglegroup",
        "init": "_toggle_init",
        "req": "_toggle_req"
    };

    // get array of elements to operate on
    function getElementsForCommand(toggleClass) {
        if (typeof (toggleClass) !== "string") {
            return null;
        }

        // treat as an element ID, not as class
        if (toggleClass.charAt(0) == '#') {
            var toggleElementFromId = document.getElementById(toggleClass.substring(1));
            if (toggleElementFromId) {
                return new Array(toggleElementFromId);
            }
        }
        else {
            return classToElementInfoMap[toggleClass];
        }

        return null;
    }

    function checkConditions(conditions) {
        if (!conditions || conditions.length < 1) {
            return true;
        }

        var conditionsSatisfied = false;

        for (var k = 0; k < conditions.length; k++) {
            var orConditions = conditions[k];
            var orConditionSatisfied = false;

            for (var l = 0; l < orConditions.length; l++) {
                var condition = orConditions[l];

                if (actives.indexOf(condition) !== -1) {
                    orConditionSatisfied = true;
                    break;
                }
            }

            if (orConditionSatisfied) {
                conditionsSatisfied = true;
            } else {
                conditionsSatisfied = false;
                break;
            }
        }

        if (conditionsSatisfied) {
            return true;
        }

        return false;
    }

    function processCommand(op, param) {
        var toggleElements = getElementsForCommand(param);

        if (!toggleElements || !toggleElements.length) {
            return;
        }

        var j; // "j is already defined" fix
        switch (op) {
            case "_reset":
                for (j in toggleElements)
                    toggleElements[j].reset();
                break;
            case "_show":
                actives.push(param);

                for (j in toggleElements) {
                    if (toggleElements[j].conditions.length > 0) {
                        var conditionss = toggleElements[j].conditions;
                        if (checkConditions(conditionss)) {
                            toggleElements[j].show();
                        }
                    } else {
                        toggleElements[j].show();
                    }
                }

                $(window).trigger('scroll'); //trigger lazy loading
                break;
            case "_hide":
                // actives.remove(param)
                for (var i = 0; i < actives.length; ++i) {
                    if (actives[i] === param) {
                        actives.splice(i, 1);
                        --i;
                    }
                }

                for (j in toggleElements) {
                    if (toggleElements[j].conditions.length > 0) {
                        var conditionsh = toggleElements[j].conditions;
                        if (!checkConditions(conditionsh)) {
                            toggleElements[j].hide();
                        }
                    } else {
                        toggleElements[j].hide();
                    }
                }

                break;
            default:
                // Toggle
                for (j in toggleElements)
                    if (toggleElements[j].isHidden()) {
                        toggleElements[j].show();
                    } else {
                        toggleElements[j].hide();
                    }
                $(window).trigger('scroll'); //trigger lazy loading
                break;
        }
    }

    function processCommandsFor(id) {
        var commands = elementInfos[id].commands;
        if (!commands) {
            return;
        }

        // if some element is in list more than once, it will be toggled multiple times
        for (var i = 0; i < commands.length; i++) {
            processCommand(commands[i][0], commands[i][1]);
        }
    }

    function createTogglerLink(toggleElement, id) {
        var toggleLink = document.createElement("a");
        toggleLink.className = 'toggler-link';
        toggleLink.setAttribute('id', 'toggler' + id);
        var js = 'javascript';
        toggleLink.setAttribute('href', js + ':toggler("' + id + '");'); // call the window.toggler function

        var child = toggleElement.firstChild;
        toggleElement.removeChild(child);
        toggleLink.appendChild(child);
        toggleElement.insertBefore(toggleLink, toggleElement.firstChild);
    }

    function buildElementInfos() {
        var documentElementInfos = [];

        // make list of all elements on the wiki page document
        var documentContainer = document.querySelector('#mw-content-text .mw-parser-output');
        var allDocumentElements = [];
        if (documentContainer) {
            allDocumentElements = documentContainer.getElementsByTagName('*');
        } else {
            return;
        }
        
        for (var i in allDocumentElements) {
            var element = allDocumentElements[i];
            if (!element.className || !element.className.split) {
                continue;
            }

            var elementInfo = {
                element: element,
                elementId: documentElementInfos.length,
                _toggle_original_display: element.style.display,
                classList: element.className.split(' '),
                commands: [],
                conditions: [], //[ [condition1 OR condition2 OR ...], AND [condition3 OR condition4 OR ...], AND ... ]
                hide: function () { this.element.style.display = 'none'; },
                show: function () { this.element.style.display = ''; },
                reset: function () { this.element.style.display = this.element._toggle_original_display; },
                isHidden: function () { return this.element.style.display === 'none'; }
            };
            documentElementInfos[elementInfo.elementId] = elementInfo;
        }

        return documentElementInfos;
    }

    function register(element, elementClass) {
        if (!classToElementInfoMap[elementClass]) {
            classToElementInfoMap[elementClass] = [];
        }
        classToElementInfoMap[elementClass].push(element);
    }

    function buildCommand(elementClass, toggleGroup) {
        // all classes are of form _toggler_op-CLASS
        var hyphenIndex = elementClass.indexOf('-');
        if (hyphenIndex != -1) {
            var op1 = elementClass.substring(toggleClasses.toggler.length, hyphenIndex);
            var toggleClassToBeToggled = elementClass.substring(hyphenIndex + 1);

            return new Array(op1, toggleClassToBeToggled);
        }
        else {
            // if no toggle class is specified, then  use the current toggle group
            var op2 = elementClass.substring(toggleClasses.toggler.length, elementClass.length);
            return new Array(op2, toggleGroup);
        }
    }

    function matchesCommand(elementClass, key) {
        return elementClass.substring(0, toggleClasses[key].length) == toggleClasses[key];
    }

    function buildCommands() {
        var toggleGroup = [];

        for (var infoIndex in elementInfos) {
            var info = elementInfos[infoIndex];

            for (var j in info.classList) {
                var elementClass = info.classList[j];

                register(info, elementClass); // register candidate elements to toggle

                // all the special classes begin with _toggle
                if (!matchesCommand(elementClass, "toggle")) {
                    continue;
                }

                if (elementClass == toggleClasses.group) {
                    toggleGroup = [];
                }
                else if (elementClass == toggleClasses.toggle) {

                    toggleGroup.push(info);
                }
                else if (matchesCommand(elementClass, "init")) {
                    // set initial value for display (ignore the original CSS set value)
                    // understands _toggle_initshow and _toggle_inithide
                    var disp = elementClass.substring(toggleClasses.init.length);
                    if (disp == "show") {
                        info.show();
                        
                        // for multi, it's required to know which start active, annotate each element with initshow/hide
                        for (var cl in info.classList) {
                            var cla = info.classList[cl];
                            if (!matchesCommand(cla, "toggle") && actives.indexOf(cla) === -1) {
                                actives.push(cla);
                            }
                        }
                    }
                    else if (disp == "hide") {
                        info.hide();
                    }
                    info._toggle_original_display = disp;
                }
                else if (matchesCommand(elementClass, "req")) {
                    // understands _toggle_reqany-clsA--clsB and _toggle_reqall-clsA--clsB

                    var hyphenIndex = elementClass.indexOf('-');
                    if (hyphenIndex != -1) {
                        var reqOp = elementClass.substring(toggleClasses.req.length, hyphenIndex);
                        var reqToggleClasses = elementClass.substring(hyphenIndex + 1);
                        reqToggleClasses = reqToggleClasses.split('--');
                        if (reqOp == "any") {
                            var orConditions = [];
                            for (var i = 0; i < reqToggleClasses.length; i++) {
                                if (!matchesCommand(reqToggleClasses[i], "toggle"))
                                    orConditions.push(reqToggleClasses[i]);
                            }
                            info.conditions.push(orConditions);
                        }
                        else if (reqOp == "all") {
                            for (var ir = 0; ir < reqToggleClasses.length; ir++) {
                                if (!matchesCommand(reqToggleClasses[ir], "toggle"))
                                    info.conditions.push([reqToggleClasses[ir]]);
                            }
                        }
                    }
                }
                else if (elementClass.substring(0, toggleClasses.toggler.length) == toggleClasses.toggler) {
                    var command = buildCommand(elementClass, toggleGroup);
                    info.commands.push(command);
                }
            }
        }

        // add javascript links to all toggler elements
        for (var k in elementInfos) {
            if (elementInfos[k].commands.length > 0)
                createTogglerLink(elementInfos[k].element, k);
        }
    }

    function toggleInit() {
        // initialize/clear any old information
        elementInfos = [];
        classToElementInfoMap = {};
        classToElementInfoMap.watch = undefined;
        classToElementInfoMap.unwatch = undefined;

        elementInfos = buildElementInfos();

        buildCommands();
    }

    window.toggler = processCommandsFor;

    $(toggleInit);
})(window.jQuery);