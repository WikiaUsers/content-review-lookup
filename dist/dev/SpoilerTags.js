/*

    SpoilerTags.js
    Author: Macklin

    Discord-like spoilers that can be toggled on click

*/
(function()
{
    if (window.dev && window.dev.spoilerTags && window.dev.spoilerTags.loaded)
    {
        console.error("SpoilerTags : Tried to execute more than once");
        return;
    }

    var SPOILER_CLASSES = [ "spoiler", "spoiler-block", "spoiler-image", "spoiler-blur" ];
    var SPOILER_SELECTOR = "." + SPOILER_CLASSES.join(", .");
    var SETTINGS_KEY = "spoilertags";
    var SETTINGS_OPTION = "userjs-" + SETTINGS_KEY;

    var defaultConfig = Object.freeze(
    {
        disable: false,
        spoilAll: false,
        spoilAllButton: true,
        toolbarButton: true,
        unspoil: true,
        hover: true,
        selection: false,
        tooltip: true
    });

    var stringMappings =
    [
        {
            configName: "tooltipText",
            cssName: "--spoiler-tooltip-text",
            i18nName: "tooltip-text"
        },
        {
            configName: "imageButtonText",
            cssName: "--spoiler-image-button-text",
            i18nName: "image-button-text"
        }
    ];

    var toggleMapping =
    {
        enableToggle:
        {
            mask: Math.pow(2, 0),
            property: "disable",
            negate: true
        },
        alwaysSpoilToggle:
        {
            mask: Math.pow(2, 1),
            property: "spoilAll"
        },
        hideSpoilAllButtonToggle:
        {
            mask: Math.pow(2, 2),
            property: "spoilAllButton",
            negate: true
        },
        hideToolbarToggle:
        {
            mask: Math.pow(2, 3),
            property: "toolbarButton",
            negate: true
        },
        disableHoverToggle:
        {
            mask: Math.pow(2, 4),
            property: "hover",
            negate: true
        },
        allowSelectionToggle:
        {
            mask: Math.pow(2, 5),
            property: "selection"
        }
    };

    var st;
    var util = 
    {
        // HTML

        setAttributes: function(elem, attrs)
        {
            for (var key in attrs)
            {
                // Pass a value of null to remove the attribute
                if (attrs[key] == null)
                    elem.removeAttribute(key);
                else
                    elem.setAttribute(key, attrs[key]);
            }
            
            return elem;
        },

        // CSS

        // Find all CSS rules that match a specific selector, optionally in a specific stylesheet
        // Returns an array of the matching rules, or an empty array if none were found
        // When firstOnly is true, the function will return the first matching rule, or null if none were found
        findCSSRules: function(selectorString, styleSheet, firstOnly)
        {
            // helper function searches through the document stylesheets looking for @selectorString
            // will also recurse through sub-rules (such as rules inside media queries)
            function recurse(node, selectorString)
            {
                if (node.cssRules)
                {
                    var rules = [];
                    
                    for (var i = 0; i < node.cssRules.length; i++)
                    {
                        if (node.cssRules[i].selectorText == selectorString)
                        {
                            rules.push(node.cssRules[i]);
                            if (firstOnly) return [ node.cssRules[i] ];
                        }

                        // If this rule has sub-rules (via media queries, recurse them too)
                        if (node.cssRules[i].cssRules && node.cssRules[i].cssRules.length > 0)
                        {
                            var childRules = recurse(node.cssRules[i], selectorString);
                            if (childRules.length > 0)
                            {
                                if (firstOnly) return [ childRules[0] ];
                                for (var r = 0; r < childRules.length; r++)
                                    rules.push(childRules[r]);
                            }
                        }
                    }
    
                    return rules;
                }
                
                return [];
            }
    
    
            // Find from a specific sheet
            if (styleSheet)
            {
                return recurse(styleSheet, selectorString);
            }
    
            // Find from all stylesheets in document
            else
            {
                var rules = [];
                
                for (var i = 0; i < document.styleSheets.length; i++)
                {
                    var sheet = document.styleSheets[i];
                    try
                    {
                        if (sheet.cssRules)
                        {
                            var foundRules = recurse(sheet, selectorString);
                            if (foundRules.length > 0)
                            {
                                for (var r = 0; r < foundRules.length; r++)
                                    rules.push(foundRules[r]);
                            }
                        }
                    }
                    catch(e)
                    {
                        continue;
                    }
                    
                }

                if (firstOnly)
                    return (rules.length > 0) ? rules[0] : null;
                else
                    return rules;
            }
        },

        findCSSRulesMatching: function(selectorString, styleSheet, predicate)
        {
            return util.css.findCSSRules(":root").filter(predicate);
        },

        // Strings
        
        generateRandomString: function(length)
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
        },

        trimChar: function(str, char)
        {
            var start = 0, end = str.length;
    
            while(start < end && str[start] === char)
                ++start;
        
            while(end > start && str[end - 1] === char)
                --end;
        
            return (start > 0 || end < str.length) ? str.substring(start, end) : str;
        },

        trimChars: function(str, chars)
        {
            for (var i = 0; i < chars.length; i++)
                str = this.trimChar(str, chars[i]);

            return str;
        },

        // Scripts/modules
        
        getModuleName: function(name)
        {
            if (!name) return null;
            return mw.loader.getModuleNames().find(function(n){ return n === name || n.startsWith(name + "-"); });
        },

        // Calls f when the i18n script is ready and all our messages have loaded
        msg: function(tag, arg)
        {
            return window.dev.spoilerTags.i18n.msg(tag, arg).plain();
        },

        // Creates a WDSIcons placeholder, which can later be rendered with wds.render on any ancestor
        wdsTemp: function(name, attrs, tag)
        {
            var icon = document.createElement(tag || "div");
            icon.id = "dev-wds-icons-" + name;

            this.setAttributes(icon, attrs);
            return icon;
        },

        // Flags/bitmask operations

        setFlag: function(flags, f)
        {
            flags |= f;
            return flags;
        },

        unsetFlag: function(flags, f)
        {
            flags &= ~f;
            return flags;
        },

        isFlagSet: function(flags, f)
        {
            return (flags & f) > 0;
        }
    };
    
    if (document.readyState == "loading")
        document.addEventListener("readystatechange", init);
    else
        init();

    function init()
    {
        window.dev = window.dev || {};

        st = window.dev.spoilerTags =
        {
            loaded: true,
            events: new EventTarget(),
            doNotPropegate: false,

            getNumSpoiled: function()
            {
                return this.spoilers.filter(function(s){ return s.spoiled == true; }).length;
            },

            isAllSpoiled: function()
            {
                return this.getNumSpoiled() == this.spoilers.length;
            },

            canUnspoilAny: function()
            {
                return this.spoilers.some(function(s){ return s.canUnspoil(); });
            },
            
            showAllSpoilers: function()
            {
                this.toggleAllSpoilers(false);
            },
            
            hideAllSpoilers: function()
            { 
                this.toggleAllSpoilers(false);
            },
            
            toggleAllSpoilers: function(value, force)
            {
                for (var i = 0; i < this.spoilers.length; i++)
                    this.spoilers[i].toggle(value, force);
            },
            
            addSpoiler: function(elem)
            {
                var s = new Spoiler(elem);
                this.spoilers.push(s);
                s.init();
            }
        };

        st.elements = {};

        // Collection of spoiler elements
        st.spoilerElems = document.querySelectorAll(SPOILER_SELECTOR);

        // An array of all spoilers
        st.spoilers = [];

        // An array of all spoiler groups
        st.groups = [];
        
        // Groups keyed by BOTH the element reference and the data-group id
        st.groupLookup = new Map();

        // Spoilers keyed by their element reference
        st.spoilerLookup = new Map();

        // This is called when ANY spoiler changes states
        st.events.addEventListener("spoiled", function(e)
        {
            // If we've disabled toggling spoilers
            /*
            if (st.forceState == (e.detail.isSpoiled ? "unspoiled" : "spoiled"))
            {
                e.preventDefault();
                return;
            }
            */

            if (st.config.spoilAllButton == true && st.spoilAllButton)
            {
                if (st.isAllSpoiled())
                {
                    st.spoilAllButton.classList.toggle("spoiled", true);
                    st.spoilAllButton.dataset.wdsTooltip = util.msg("unspoil-all-tooltip");
					st.spoilAllButton.setAttribute('aria-label', util.msg("unspoil-all-tooltip"));
                }
                else
                {
                    st.spoilAllButton.classList.toggle("spoiled", false);
                    st.spoilAllButton.dataset.wdsTooltip = util.msg("spoil-all-tooltip");
					st.spoilAllButton.setAttribute('aria-label', util.msg("spoil-all-tooltip"));
                }
            }
        });

        fetchConfig();
        applyConfig();
        
        var imports =
        [
            "u:dev:MediaWiki:WDSIcons/code.js",
            "u:dev:MediaWiki:I18n-js/code.js",
            "oojs-ui-core",
            "oojs-ui-windows",
            "mediawiki.widgets",
            "mediawiki.user"
        ];

        Promise.resolve()
        .then(function(){ return importArticles({ articles: imports }); })
        .then(function(){ return Promise.all([ loadMessages(), loadStyles() ] ); })
        .then(function()
        {
            applyConfigStrings();
            applySpoilerTags();
            createSideToolsButton();
            createSpoilerSettings();
            createToolbarShortcut();

            mw.hook("dev.spoilerTags").fire(window.dev.spoilerTags);
        });
    }

    // Wait for i18n hook and loaded messages
    function loadMessages()
    {
        var CACHE_VERSION = 1;
        
        return new Promise(function(resolve, reject)
        {
            mw.hook("dev.i18n").add(function(i18n)
            {
                i18n.loadMessages("SpoilerTags", { cacheVersion: CACHE_VERSION }).then(function(i18n)
                {
                    window.dev.spoilerTags.i18n = i18n;
                    resolve();
                });
            });
        });
    }

    // Doesn't actually load styles, just ensures that they are loaded
    function loadStyles()
    {
        return new Promise(function(resolve, reject)
        {
            var tryLoadStyleDelay = 250;      // <- Time to wait between checking for rules
            var tryLoadStyleTimeout = 10000;  // <- Total time before giving up
            var tryLoadStyleTime =  0;
    
            function fetchLoop()
            {
                st.spoilerCSS = util.findCSSRules(":root").find(function(r){ return r.cssText.includes("--spoiler-tags-loaded"); });
    
                // If the style sheet is loaded via importArticles or style injection, the rules that are
                // fetched above may not exist, and we will need to wait for it to finish loading.
                // This is because the application of the config relies on the existance of these styles.
                if (st.spoilerCSS == null)
                {
                    if (tryLoadStyleTime == 0)
                        console.warn("SpoilerTags : SpoilerTags.css styles were not found (could be loading via JS?), waiting until they are imported...");
    
                    else if (tryLoadStyleTime > tryLoadStyleTimeout)
                    {
                        console.error("SpoilerTags : SpoilerTags.css styles were not imported after " + (tryLoadStyleTimeout / 1000) + " seconds! Ensure you have correctly set up the CSS imports.");
                        reject();
                        return;
                    }
    
                    tryLoadStyleTime += tryLoadStyleDelay;
                    setTimeout(fetchLoop, tryLoadStyleDelay);
                }
                else
                {
                    if (tryLoadStyleTime > 0)
                        console.log("SpoilerTags : Found SpoilerTags.css!");
    
                    resolve();
                }
            }

            fetchLoop();
        });
    }

    function fetchConfig()
    {
        // This is the config from JavaScript (personal or community), with the defaults
        st.siteConfig = Object.assign({}, defaultConfig, window.spoilerTags);

        // This is the config set in the setting UI
        // It contains a subset of the options available in the site config
        if (mw.user.isAnon())
        {
            var cookie = mw.cookie.get(SETTINGS_KEY);
            
            // Fetch user config from cookies
            st.userConfig = bitmaskToUserConfig(cookie);

            // Write directly back into cookies upon reading to refresh expiry time
            mw.cookie.set(SETTINGS_KEY, cookie);
        }
        else
        {
            // Always delete cookie if this is a logged-in user
            mw.cookie.set(SETTINGS_KEY, null);

            // Fetch user config from MediaWiki options
            st.userConfig = bitmaskToUserConfig(mw.user.options.get(SETTINGS_OPTION));
        }

        // Combine the user and site config
        st.config = Object.assign({}, st.siteConfig, st.userConfig);

        // Validate the config types
        for (var k in defaultConfig)
        {
            if (st.config.hasOwnProperty(k))
            {
                if (typeof defaultConfig[k] != typeof st.config[k])
                    console.error("SpoilerTags : The option '" + k + "' must be of type '" + typeof defaultConfig[k] + "' but was of type '" + typeof st.config[k] + "'");
                else
                    continue;
            }
            
            st.config[k] = defaultConfig[k];
        }

        // Overrides from URL parameters
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("stsafemode"))
        {
            console.log("SpoilerTags : Safe mode (ignoring all configs and using defaults)");
            st.config = defaultConfig;
            st.safeMode = true;
        }

        if (urlParams.has("stspoilall"))
            st.config.spoilAll = true;
        if (urlParams.has("stdisable"))
        {
            st.config.disable = urlParams.get("stdisable") == "1" ? true :
                                urlParams.get("stdisable") == "0" ? false : st.config.disable;
        }

        return st.config;
    }

    function applyConfig(config)
    {
        config = config || st.config;

        // If the user has "disabled" set in the config...
        if (config.disable)
        {
            // Remove the spoiler classes from the page
            for (var i = 0; i < st.spoilerElems.length; i++)
                DOMTokenList.prototype.remove.apply(st.spoilerElems[i].classList, SPOILER_CLASSES);
        }

        // If the user has "spoilAll" set in the config...
        if (config.spoilAll)
        {
            //st.forceState = "spoiled";

            if (st.initialized)
            {
                for (var i = 0; i < st.spoilers.length; i++)
                    st.spoilers[i].spoiled = true;
            }
            else
            {
                for (var i = 0; i < st.spoilerElems.length; i++)
                    st.spoilerElems[i].classList.add("spoiled");
            }
        }

        // Disable spoiler tooltips globally by adding a class to the <body>
        document.body.classList.toggle("spoiler-tooltips-disabled", config.tooltip == false);

        // Disable spoiler hover globally by adding a class to the <body>
        document.body.classList.toggle("spoiler-hover-disabled", config.hover == false);

        // Disable spoiler selection globally by adding a class to the <body>
        document.body.classList.toggle("spoiler-selection-disabled", config.selection == false);
    }

    // Saves the (user) config to either cookies (for anon) or MediaWiki options
    // Pass this function null to clear the config
    function saveConfig(config)
    {
    	var bitmaskStr = null;
    	
        if (config != null)
        {
            bitmaskStr = userConfigToBitmask(config).toString();
        }
        
        if (mw.user.isAnon())
        {
            mw.cookie.set(SETTINGS_KEY, bitmaskStr);
        }
        else
        {
            // Remove cookie
            mw.cookie.set(SETTINGS_KEY, null);
            
            // Save directly to options so we don't have to re-retrieve it for this session
            mw.user.options.set(SETTINGS_OPTION, bitmaskStr);
            
            var params =
            {
                action: "options",
                optionname: SETTINGS_OPTION,
                optionvalue: bitmaskStr,
                format: 'json'
            };
            
            var api = new mw.Api();
            api.postWithToken("csrf", params)
            .fail(function(e){ console.error("SpoilerTags : Failed to POST user option: " + e); } );
        }
    }

    function bitmaskToUserConfig(bitmask)
    {
        bitmask = parseInt(bitmask);
        if (isNaN(bitmask)) return null;
        
        var config = {};
        
        for (var k in toggleMapping)
        {
            var m = toggleMapping[k];
            config[m.property] = util.isFlagSet(bitmask, m.mask);
        }

        return config;
    }

    function userConfigToBitmask(config)
    {
        var bitmask = 0;
        
        for (var k in toggleMapping)
        {
            var m = toggleMapping[k];
            if (config[m.property] == true)
                bitmask = util.setFlag(bitmask, m.mask);
        }

        return bitmask;
    }

    // Modify the original stylesheet directly with the changes from JS
    function applyConfigStrings()
    {
        for (var i = 0; i < stringMappings.length; i++)
        {
            var m = stringMappings[i];
            m.i18nValue = util.msg(m.i18nName);
            m.cssValue = util.trimChars(st.spoilerCSS.style.getPropertyValue(m.cssName), ['"', "'"]);
            m.jsValue = st.config[m.configName];
            m.hasCustomValue = false;

            // Check to see if the CSS value has been overidden by a user who may have
            // modified the default CSS (it will not be set in the default SpoilerTags.css)
            if (m.cssValue != "" && m.cssValue != m.i18nValue)
                m.hasCustomValue = true;

            // Use the value from JS if it is valid and custom
            // (if a CSS variable is still set outside SpoilerTags.css, it will be used)
            else if (m.jsValue != null && typeof m.jsValue == "string" && m.jsValue != "" && m.jsValue != m.i18nValue)
            {
                if (m.hasCustomValue)
                    console.error("SpoilerTags : Ignoring config string for " + m.configName + "'" + m.jsValue + "' because a custom string was already set in SpoilerTags.css");
                else
                {
                    st.spoilerCSS.style.setProperty(m.cssName, "\"" + m.jsValue + "\"");
                    m.hasCustomValue = true;
                }
            }

            // Use defaults from i18n
            else
                st.spoilerCSS.style.setProperty(m.cssName, "\"" + m.i18nValue + "\"");
        }
    }

    function createSideToolsButton()
    {
        // Don't create a button if it's disabled, or there are no spoilers
        if (!st.config.spoilAllButton || st.spoilerElems.length == 0) return;

        var spoilAllButton = document.createElement("button");
		var spoilAllButtonAriaLabel =  st.isAllSpoiled() ? util.msg("unspoil-all-tooltip") : util.msg("spoil-all-tooltip");
        spoilAllButton.className = "page-side-tool spoil-all-button";
        spoilAllButton.style.display = "none";
		spoilAllButton.setAttribute('aria-label', spoilAllButtonAriaLabel);

        var crossIcon = document.createElement("div");
        crossIcon.className = "spoil-cross-icon";

        var eyeIcon = util.wdsTemp("eye-small", { class: "spoil-eye-icon" });
        //var eyeIcon = window.dev.wds.icon("eye-small", { class: "spoil-eye-icon" });
        spoilAllButton.append(eyeIcon, crossIcon);

        // Create spoil settings button
        var spoilSettingsButton = document.createElement("button");
        spoilSettingsButton.className = "spoil-settings-button";
		spoilSettingsButton.setAttribute('aria-label', util.msg("settings-title"));

        var gearIcon = util.wdsTemp("gear-tiny", { class: "spoil-settings-icon" });
        //var gearIcon = window.dev.wds.icon("gear-tiny", { class: "spoil-settings-icon" });
        spoilSettingsButton.append(gearIcon);
        spoilAllButton.append(spoilSettingsButton);
        
        // Here, modify the button based on whether spoilAll is set in the config
        if (st.config.spoilAll)
        {
            spoilAllButton.classList.add("spoiled");
        }

        // Finally, add the button to the side tools
        var pageSideTools = document.querySelector(".page-side-tools");
        pageSideTools.appendChild(spoilAllButton);

        // Construct the tooltips using the built-in tooltips script
        var tooltipsName = util.getModuleName("tooltips");
        mw.loader.using(tooltipsName, function(require)
        {
            var tooltips = require(tooltipsName);
            tooltips.applyTooltip_1(spoilAllButton, spoilAllButton.classList.contains("spoiled") ? util.msg("unspoil-all-tooltip") : util.msg("spoil-all-tooltip"), "right");
            tooltips.applyTooltip_1(spoilSettingsButton, util.msg("settings-title"), "right");
        });

        // Apply icons on placeholders when WDSIcons is loaded
        mw.hook("dev.wds").add(function(wds)
        {
            wds.render(spoilAllButton);
            spoilAllButton.style.display = "";
        });

        // Events

        // On clicking spoil all button, do just that
        spoilAllButton.addEventListener("click", function(e)
        {
            if (spoilAllButton.classList.contains("disabled")) return;
            
            var numSpoiled = st.getNumSpoiled();

            // If there are any spoilers that are unspoiled, spoil all
            // Otherwise if all are spoiled, unspoil all
            st.toggleAllSpoilers(numSpoiled < st.spoilers.length, true);

            // In order to avoid hiding the tooltip on click, dispatch a "mouseenter" event on the next frame
            if (e.srcElement == e.currentTarget)
                requestAnimationFrame(function(){ spoilAllButton.dispatchEvent(new Event("mouseenter")); });
        });

        spoilAllButton.addEventListener("focus", function(e)
        {
            requestAnimationFrame(function(){ spoilAllButton.dispatchEvent(new Event("mouseleave")); });
        });
        
        spoilSettingsButton.addEventListener("click", function(e)
        {
            spoilAllButton.blur();
			spoilSettingsButton.blur();
            showSpoilerSettings();
            e.stopPropagation();
        });
        
        spoilSettingsButton.addEventListener("mouseenter", function(e){ spoilAllButton.dispatchEvent(new Event("mouseleave")); });
        spoilSettingsButton.addEventListener("mouseleave", function(e){ spoilAllButton.dispatchEvent(new Event("mouseenter")); });

        st.spoilAllButton = spoilAllButton;
        st.spoilSettingsButton = spoilSettingsButton;
    }

    function showSpoilerSettings()
    {
        st.settingsDialog.getManager().openWindow(st.settingsDialog);
    }

    function createSpoilerSettings()
    {
        // Example: Creating and opening a process dialog window.
        function SpoilerOptionsDialog(config)
        {
            SpoilerOptionsDialog.super.call(this, config);
        }
        
        OO.inheritClass(SpoilerOptionsDialog, OO.ui.ProcessDialog);
        
        SpoilerOptionsDialog.static.name = "spoilerTagsOptions";
        SpoilerOptionsDialog.static.title = util.msg("settings-title");
        SpoilerOptionsDialog.static.actions =
        [
            { action: 'save', label: util.msg("save"), flags: 'primary' },
            { action: 'safe', label: util.msg("cancel"), flags: 'safe' }
        ];

        SpoilerOptionsDialog.prototype.loadSettingsIntoFields = function(configType)
        {
            var config = (configType == "user" ? st.userConfig || st.siteConfig : st.siteConfig);
            var usingUserConfig = configType == "user";

            // Dim toggle content when using the defaults or JS config
            this.toggleContent.$element[0].style.opacity = configType == "site" ? "0.65" : "";

            // Disable the box holding the custom config if not using a custom config
            for (var k in toggleMapping) this[k].setDisabled(!usingUserConfig);

            // Change checked state of useCustomToggle + update help
            this.useCustomToggleField.$help[0].textContent = util.msg("settings-use-custom-info-" + (usingUserConfig ? "enabled" : "disabled"));
            
            // Change state of toggles based on the config
            for (var k in toggleMapping)
            {
                var m = toggleMapping[k];
                var c = config || st.siteConfig || defaultConfig;
                var v = c[m.property] == (m.negate == true ? false : true);
                this[k].setValue(v);
            }
        };
        
        SpoilerOptionsDialog.prototype.initialize = function()
        {
            SpoilerOptionsDialog.super.prototype.initialize.apply(this, arguments);
            var content = new OO.ui.PanelLayout({ padded: true, expanded: false });
            
            var useCustomToggle = new OO.ui.CheckboxInputWidget({ selected: st.userConfig != null });
            var useCustomToggleField = new OO.ui.FieldLayout(useCustomToggle,
            {
                align: "inline",
                helpInline: true,
                label: util.msg("settings-use-custom"),
                help: "~"
            });

            useCustomToggle.on("change", function(v)
            {
                this.loadSettingsIntoFields(v ? "user" : "site");
                
            }.bind(this));

            content.$element.append(useCustomToggleField.$element);

            var enableToggle = new OO.ui.ToggleSwitchWidget({ value: true });
            var alwaysSpoilToggle = new OO.ui.ToggleSwitchWidget();
            var hideSpoilAllButtonToggle = new OO.ui.ToggleSwitchWidget();
            var hideToolbarToggle = new OO.ui.ToggleSwitchWidget();
            var disableHoverToggle = new OO.ui.ToggleSwitchWidget();
            var allowSelectionToggle = new OO.ui.ToggleSwitchWidget();

            var fieldset = new OO.ui.FieldsetLayout({ label: util.msg("settings") });
            fieldset.addItems(
            [
                new OO.ui.FieldLayout(enableToggle,
                {
                    align: "left",
                    //helpInline: true,
                    classes: [ "spoiler-fieldLayout "],
                    label: util.msg("settings-enable-spoilers"),
                    help: new OO.ui.HtmlSnippet(util.msg("settings-enable-spoilers-info"))
                }),
                new OO.ui.FieldLayout(alwaysSpoilToggle,
                {
                    align: "left",
                    //helpInline: true,
                    classes: [ "spoiler-fieldLayout "],
                    label: util.msg("settings-always-spoil"),
                    help: new OO.ui.HtmlSnippet(util.msg("settings-always-spoil-info"))
                }),
                new OO.ui.FieldLayout(hideSpoilAllButtonToggle,
                {
                    align: "left",
                    //helpInline: true,
                    classes: [ "spoiler-fieldLayout "],
                    label: util.msg("settings-hide-spoil-all-button"),
                    help: new OO.ui.HtmlSnippet(util.msg("settings-hide-spoil-all-button-info"))
                }),
                new OO.ui.FieldLayout(hideToolbarToggle,
                {
                    align: "left",
                    //helpInline: true,
                    classes: [ "spoiler-fieldLayout "],
                    label: util.msg("settings-hide-toolbar"),
                    help: new OO.ui.HtmlSnippet(util.msg("settings-hide-toolbar-info")),
                }),
                new OO.ui.FieldLayout(disableHoverToggle,
                {
                    align: "left",
                    //helpInline: true,
                    classes: [ "spoiler-fieldLayout "],
                    label: util.msg("settings-disable-hover"),
                    help: new OO.ui.HtmlSnippet(util.msg("settings-disable-hover-info"))
                }),
                new OO.ui.FieldLayout(allowSelectionToggle,
                {
                    align: "left",
                    //helpInline: true,
                    classes: [ "spoiler-fieldLayout "],
                    label: util.msg("settings-allow-selection"),
                    help: new OO.ui.HtmlSnippet(util.msg("settings-allow-selection-info"))
                })
            ]);
            
            // Box surrounding the toggles
            var toggleContent = new OO.ui.PanelLayout( { padded: true, expanded: false, framed: true } );
            toggleContent.$element.append(fieldset.$element);
            content.$element.append(toggleContent.$element);

            this.content = content;
            this.useCustomToggle = useCustomToggle;
            this.useCustomToggleField = useCustomToggleField;
            this.toggleContent = toggleContent;
            this.enableToggle = enableToggle;
            this.alwaysSpoilToggle = alwaysSpoilToggle;
            this.hideSpoilAllButtonToggle = hideSpoilAllButtonToggle;
            this.hideToolbarToggle = hideToolbarToggle;
            this.disableHoverToggle = disableHoverToggle;
            this.allowSelectionToggle = allowSelectionToggle;

            this.loadSettingsIntoFields(st.userConfig != null ? "user" : "site");
            
            this.$foot.remove();
            this.$body.append(content.$element);
        };
        
        // Called when either action is clicked
        SpoilerOptionsDialog.prototype.getActionProcess = function(action)
        {
            var dialog = this;
            
            if (action == "save")
            {
                // "Use custom settings" was checked
                if (this.useCustomToggle.selected)
                {
                    var settings =
                    {
                        disable: !this.enableToggle.value,
                        spoilAll: this.alwaysSpoilToggle.value,
                        spoilAllButton: !this.hideSpoilAllButtonToggle.value,
                        toolbarButton: !this.hideToolbarToggle.value,
                        hover: !this.disableHoverToggle.value,
                        selection: this.allowSelectionToggle.value
                    };
    
                    saveConfig(settings);
                }
                else
                {
                    // Save null config (this deletes the config)
                    saveConfig(null);
                }
    
                // Also apply the settings
                fetchConfig();
                applyConfig();
            }
            
            return new OO.ui.Process(function()
            {
                dialog.close({ action: action });
            });
            
            //return SpoilerOptionsDialog.super.prototype.getActionProcess.call(this, action);
        };
        
        var windowManager = new OO.ui.WindowManager();
        document.body.append(windowManager.$element[0]);
    
        var dialog = new SpoilerOptionsDialog({ classes: [ "spoilerOptionsDialog" ]});
        windowManager.addWindows([ dialog ]);
        st.settingsDialog = dialog;
    }

    function createToolbarShortcut()
    {
        if (!st.config.toolbarButton) return;
        
        // Get the "My Tools" menu. This is a standard menu, but may not always appear
        // (it does not appear if the user has no tools moved underneat it in Customize)
        var toolsMenu = document.querySelector("#my-tools-menu");
        
        // If the menu doesn't exist, create it
        if (toolsMenu == null)
        {
            var myTools = document.querySelector(".mytools");
            myTools = document.createElement("li");
            myTools.className = "mytools menu wds-dropdown wds-is-flipped";
            myTools.style.display = "none";
            
            var toggle = document.createElement("a");
            toggle.style.cursor = "pointer";
            toggle.textContent = "My Tools";
            
            var toggleSpan = document.createElement("span");
            toggleSpan.className = "wds-dropdown__toggle";
            toggleSpan.append(util.wdsTemp("dropdown-tiny", { class: "wds-dropdown__toggle-chevron" }), toggle);

            toolsMenu = document.createElement("ul");
            toolsMenu.className = "tools-menu wds-list wds-is-linked";
            toolsMenu.id = "my-tools-menu";

            var content = document.createElement("div");
            content.className = "wds-dropdown__content";
            content.append(toolsMenu);

            myTools.append(toggleSpan, content);

            var tools = document.querySelector("#WikiaBar .toolbar .tools");
            if (tools) tools.prepend(myTools);
            
            mw.hook("dev.wds").add(function(wds)
            {
            	wds.render(toggleSpan);
            	myTools.style.display = "";
            });
        }

        var stButton = document.createElement("a");
        stButton.textContent = util.msg("spoilers");
        stButton.title = util.msg("settings-title");
        var stListItem = document.createElement("li");
        stListItem.append(stButton);
        toolsMenu.append(stListItem);

        stButton.addEventListener("click", function(e)
        {
            showSpoilerSettings();
        });
    }
    
    function applySpoilerTags()
    {
        // Start by getting all of the "endpoint" spoilers
        st.spoilerElems.forEach(function(elem)
        {
            var s = new Spoiler(elem);
        });

        // Only init after all Spoilers have been set up
        st.spoilers.forEach(function(s)
        {
            s.init();
        });

        st.initialized = true;
    }

    // A spoiler represents either a single span.spoiler element
    // or a collection of span.spoiler elements whose contents can
    // be blanked out in order to avoid spoilers
    function Spoiler(elem)
    {
        if (elem == null) return;

        this.element = elem;
        this.element.spoiler = this;
        this.spoiled = this.spoiled || false;
        this.hovered = false;

        // Get parent spoiler if this is a nested spoiler
        this.parent = this.element.parentElement.closest(SPOILER_SELECTOR);

        // Get all child spoilers, filtering out nested spoilers (only get first descendants)
        this.children = Array.from(this.element.querySelectorAll(SPOILER_SELECTOR));
        this.children = Array.from(this.children.filter(function(c) { return c.parentElement.closest(SPOILER_SELECTOR) == elem; }));
        
        this.tryFetchGroups();

        st.spoilers.push(this);
        st.spoilerLookup.set(this.element, this);
    
        return this;
    }
    
    Spoiler.prototype = 
    {
        init: function()
        {
            this.initialized = true;
            
            // Convert elements to Spoiler/SpoilerGroup references
            if (this.parent) this.parent = st.spoilerLookup.get(this.parent);
            if (this.children && this.children.length > 0)
            {
                for (var i = 0; i < this.children.length; i++)
                    this.children[i] = st.spoilerLookup.get(this.children[i]);
            }

            // Force disable unspoiling for image spoilers
            if (this.element.classList.contains("spoiler-image") && this.element.dataset.unspoil == null)
                this.element.dataset.unspoil = false;

            // Add event listeners
            this.element.addEventListener("click", this);
            this.element.addEventListener("keydown", this);
            this.element.addEventListener("mouseenter", this);
            this.element.addEventListener("mouseleave", this);
        },
    
        deinit: function()
        {
            this.initialized = false;
            this.element.removeEventListener("click", this);
            this.element.removeEventListener("keydown", this);
            this.element.removeEventListener("mouseenter", this);
            this.element.removeEventListener("mouseleave", this);
        },

        // Bind the spoiled property to the classlist so that changes made to the class
        // directly (by the editor/user) will properly reflect on the state of JS
        get spoiled()
        {
            return this.element != null ? this.element.classList.contains("spoiled") : this._spoiled;
        },

        set spoiled(v)
        {
            if (this.element)
            {
                this.element.classList.toggle("spoiled", v);

                // Set some accessibility attributes depending on the spoiled state
                util.setAttributes(this.element,
                {
                    "aria-expanded": v.toString(),
                    "role": v ? "presentation" : "button",
                    "tabindex": 0,
                    "aria-label": v ? null : "Spoiler"
                });
            }
            else
                this._spoiled = v;
        },
    
        tryFetchGroups: function()
        {
            this.groups = [];
            
            // Spoiler should be grouped because it has a data-group attribute
            if (this.element.dataset.group != null)
                this.element.dataset.group.split(",").forEach(function(id){ this.tryAddToGroup(id); }.bind(this));
        
            // Spoiler should be grouped because it is parented
            var groupElem = this.element.closest(".spoiler-group");
            if (groupElem != null)
                this.tryAddToGroup(groupElem);
        },
    
        // id, like the constructor, is either a data-group string or a group element
        tryAddToGroup: function(id)
        {
            if (id == null) return;
            
            var group;
            
            // Get existing group
            if (st.groupLookup.has(id))
            {
                group = st.groupLookup.get(id);

                // This spoiler is already in this group
                if (this.groups.includes(group))
                    return;
            }
    
            // Create new group
            else
                group = new SpoilerGroup(id);
    
            // Add this spoiler as a child of group
            group.spoilers.push(this);
    
            // Add to this spoiler's groups array
            this.groups.push(group);
        },
    
        hoverOn: function(){ this.hover(true); },
        hoverOff: function(){ this.hover(false); },
            
        hover: function(value)
        {
            if (value != null && typeof value == "boolean")
                this.hovered = value;
            else
                this.hovered = !this.hovered;
            
            this.element.classList.toggle("hovered", this.hovered);
            this.propegate(this.hover, value);
        },
        
        show: function(){ this.toggle(true); },
        hide: function(){ this.toggle(false); },

        // Toggle the spoiler. true is spoiled, false is unspoiled
        toggle: function(value, force)
        {
            if (value == null || typeof value != "boolean")
                value = !this.spoiled;

            if (value != this.spoiled || force)
            {
                if (!force)
                {
                    // Check whether we can spoil by seeing if the parent is spoiled
                    if (this.parent && this.parent.spoiled == false && value == true)
                        return;
    
                    // Do not allow un-spoiling if the requirements for that are met
                    if (value == false && !this.canUnspoil())
                        return;
    
                    // Don't toggle off if the selected text includes the spoiler
                    var selection = window.getSelection();
                    if (this.spoiled && this.element && selection.type == "Range" && (selection.containsNode(this.element) ||
                        Array.from(this.element.childNodes).some(function(n){ return selection.containsNode(n); })))
                        return;
                }
                
                // This sets the class via the property setter
                this.spoiled = value;

                // Dispatch event to indicate that we're about to change the spoiled state
                // Listeners can cancel the event, which causes the spoiler to not be spoiled
                var e = new CustomEvent("spoiled", { cancelable: true, detail: { spoiler: this, isSpoiled: value } });
                if (!st.events.dispatchEvent(e))
                {
                    this.spoiled = !value;
                    return;
                }
            }
            
            // When toggling OFF, unspoil all children
            if (value == false)
            {
                if (this.children)
                {
                    for (var i = 0; i < this.children.length; i++)
                        this.children[i].toggle(false, force);
                }
            }

            this.propegate(this.toggle, value, force);
        },

        canUnspoil: function()
        {
            if (this.element && this.element.dataset.unspoil != null)
                return this.element.dataset.unspoil != "false";
            //else if (this.parent != null)
            //    return this.parent.canUnspoil(); // <- Uncomment to prevent children from being unspoiled when the parent spoilers don't allow this
            else
                return st.config.unspoil == true;
        },
    
        // We use handleEvent so that listeners can be removed, but to also keep "this" context
        // See: https://kostasbariotis.com/removeeventlistener-and-this
        handleEvent: function(e)
        {
            switch (e.type)
            {
                case "click":
                case "keydown":
                {
                    if (e.type == "keydown")
                    {
                        // Don't respond other keys
                        if (!(e.key == "Enter" || e.key == " " || e.key == "Spacebar"))
                            return;
                        
                        // Prevent default behaviour of space (scroll down)
                        if (e.key != "Enter")
                            e.preventDefault();
                    }
                    
                    // If this click event came from a child spoiler, and has now bubbled up to the parent -> prevent it from toggling this spoiler
                    if (e.target != e.currentTarget && e.target != this.element && this.element.contains(e.target) && e.target.spoiler != null && this.spoiled)
                        return;
                    
                    // If this is a spoiler nested inside another, prevent clicks on nested
                    // from propegating through to parent when the parent is already spoiled
                    // ! Commented out because this is now handled by the above
                    /*
                    if (this.parent && this.parent.spoiled)
                    {
                        // Prevent bubbling up the DOM
                        e.stopPropagation();
                    }
                    */

                    if (this.spoiled && e.srcElement.tagName == "IMG" || e.srcElement.tagName == "A")
                    {
                        return;
                    }
                    
                    this.toggle(!this.spoiled);
                    break;
                }
                case "mouseenter": this.hoverOn(e); break;
                case "mouseleave": this.hoverOff(e); break;
            }

            // If this spoiler is grouped, forward the event to all spoilers in all groups that this belongs to
            
        },

        // Call function on all groups of this spoiler
        propegate: function(f, v1, v2)
        {
            // To prevent groups in this spoiler being called again, get/set a flag that
            // tells subsequent calls to not propegate again
            if (st.doNotPropegate) return;
            st.doNotPropegate = true;

            // Saves what groups and spoilers we've already called the function on
            var propegated = [];
            
            for (var g = 0; g < this.groups.length; g++)
            {
                var group = this.groups[g];
                if (propegated.includes(group)) continue;
                propegated.push(group);
                
                for (var s = 0; s < group.spoilers.length; s++)
                {
                    var spoiler = group.spoilers[s];
                    
                    if (propegated.includes(spoiler)) continue;
                    propegated.push(spoiler);
                        
                    f.call(spoiler, v1, v2);
                }
            }

            st.doNotPropegate = false;
        }
    };

    // A SpoilerGroup is simply a collection of Spoilers, it has no logic of its own
    function SpoilerGroup(elem)
    {
        this.spoilers = [];
        
        if (typeof elem == "string")
        {
            this.id = elem;
            this.element = document.querySelector(".spoiler-group[data-group=\"[" + this.id + "\"]");
        }
        else if (elem instanceof HTMLElement)
        {
            this.id = elem.dataset.group || util.generateRandomString(8);
            this.element = elem;
        }
        
        if (this.id) st.groupLookup.set(this.id, this);
        if (this.element) st.groupLookup.set(this.element, this);

        st.groups.push(this);
    }
})();