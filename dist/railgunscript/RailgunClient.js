/**
 * @fileOverview This file defines the Railgun client, the basic framework
 * behind the Railgun user script. Railgun provides a set of additional
 * features for the Wikia Rail and is designed for personal usage on all
 * wikia.com wikis.
 * 
 * Railgun Wiki:   http://railgunscript.wikia.com/wiki/Railgun_Wiki
 * Contact Author: http://community.wikia.com/wiki/Message_Wall:Mathmagician
 * 
 * @author © Jeff Bradford, 2012
 * @version 2.2.1
 */
$(function () {
//--------------------------------------------------------------------------------------------------
var passedPreEval = false;
try {
//-----------------------------------------------------------------------------------------------try
// don't run script if preconditions aren't met
if (-1 === window.location.href.indexOf(".wikia.com")) {
    console.log("[Railgun]: Script onload cancelled. Not a wikia.com domain.");
    return;
} else if ("string" !== typeof wgUserName) {
    console.log("[Railgun]: Script onload cancelled. User is not logged in.");
    return;
} else if ("string" !== typeof skin || ("oasis" != skin && "wikia" != skin)) {
    console.log("[Railgun]: Script onload cancelled. Non-supported skin:", skin);
    return;
} else if (0 === $('#WikiaRail').length) {
    var classWikiaRail = $('.WikiaRail');
    if (1 === classWikiaRail.length) {
        classWikiaRail.attr('id', 'WikiaRail');
    } else {
        console.log("[Railgun]: Script onload cancelled. #WikiaRail not found in document.");
        return;
    }
} else if ("http://wikimarks.wikia.com" == wgServer
        && 2 == wgNamespaceNumber && wgTitle == wgUserName + '/Wikimarks') {
    console.log("[Railgun]: Script onload cancelled. Noninterference with Wikimarks editor.");
    return;
} else if (!window.localStorage) {
    console.log("[Railgun]: Script onload cancelled. Your browser does not support localStorage.");
    return;
}
passedPreEval = true;
/**
 * @namespace A wrapper object for the Railgun framework. Contains all methods and properties
 * associated with the Module Manager and Show/Hide Siderail features, as well as the
 * Railgun API for creating modules.
 */
Railgun = {};
(function (ns) {
    /**
     * The domain where the Railgun server is located.
     * @fieldOf Railgun
     * @name domain
     * @type String
     * @default "http://railgunscript.wikia.com"
     * @constant
     */
    var domain = "http://railgunscript.wikia.com";
    var m = "http://mathmagician.wikia.com";
    if ("Mathmagician" === wgUserName && m === wgServer)
        domain = m;

    /**
     * The version of the Railgun client source code.
     * @fieldOf Railgun
     * @name version
     * @type String
     */
    var version = "2.2.1";

    /**
     * The date on which Railgun was last updated.
     * @fieldOf Railgun
     * @name updated
     * @type String
     */
    var updated = "24 July 2012";

    /**
     * Prints framework, config and storage data about Railgun to the console.
     * @methodOf Railgun
     */
    function info() {
        console.log("[Railgun]: ----- Printing framework data -----");
        console.log("[Railgun]: Railgun.domain:", domain);
        console.log("[Railgun]: Railgun.version:", version);
        console.log("[Railgun]: Railgun.updated:", updated);
        console.log("");
        console.log("[Railgun]: ----- Printing config data -----");
        console.log("[Railgun]:", Railgun.Config);
        console.log("");
        Railgun.Storage.contents();
    }
    
    /**
     * Prints a basic overview of Railgun's API to the console.
     * @methodOf Railgun
     */
    function api() {
        console.log("[Railgun]: ----- Railgun API Overview -----");
        console.log("api()                             // prints an API overview");
        console.log("clear()                           // WARNING! deletes all data in storage");
        console.log("getItem(key)                      // returns a value from storage");
        console.log("info()                            // prints framework, config and storage data");
        console.log("init([anything])                  // initialize Railgun, [w/o modules package]");
        console.log("insert(id, content[, header])     // inserts a module into the siderail");
        console.log("register(id, name, init[, destr]) // registers a module with the framework");
        console.log("removeItem(key)                   // deletes a single value from storage");
        console.log("setItem(key, value)               // saves data to storage");
        console.log("swapElements(jQuery, jQuery)      // swaps 2 element's locations in the DOM");
    }

    /**
     * Swaps two elements in the DOM. Both parameters should be jQuery objects which reference
     * a single element in the document. If one element is a parent of the other, a
     * DOM hierarchy error will occur.
     * @param {jQuery} jQueryElem1 a jQuery object referencing an element in the DOM
     * @param {jQuery} jQueryElem2 a jQuery object referencing an element in the DOM
     * @methodOf Railgun
     */
    function swapElements(jQueryElem1, jQueryElem2) {
        if (0 === jQueryElem1.length || 0 === jQueryElem2.length) {
            return;
        }

        var x = jQueryElem1.first();
        var y = jQueryElem2.first();
        var xp = x.parent();
        var yp = y.parent();
        var xi = x.index();
        var yi = y.index();
        var sameParents = (xp[0] == yp[0]);
        var indexDiff = xi - yi;
        
        if (sameParents && 0 === indexDiff) {
        } else if (sameParents && 1 === indexDiff) {
            x.after(y);
        } else if (sameParents && -1 === indexDiff) {
            y.after(x);
        } else if (0 === yi) {
            x.after(y);
            yp.prepend(x);
        } else {
            var temp = y.prev();
            x.after(y);
            temp.after(x);
        }
    }

    /**
     * Railgun's main initialization method which is called upon pageload. This method attaches
     * stylesheets to the document and then calls Railgun.Storage.init().
     * @methodOf Railgun
     * @param {Boolean} abortModulesPackage normally the modulesJS package will be loaded
     * before initializing Railgun, but that can be manually overridden by giving any
     * (!== undefined) value to abortModulesPackage
     * @see Railgun.Config.modulesJS
     * @see Railgun.Storage.init
     */
    function init(abortModulesPackage) {
        function begin() {
            // attach client stylesheet
            $('#railgun-client-stylesheet').remove();
            var href = domain + "/wiki/MediaWiki:RailgunClient.min.css?action=raw&ctype=text/css";
            if (Railgun.Config.isDebug) {
                href += "&maxage=0&smaxage=0";
            }
            $(document.head).append('<link id="railgun-client-stylesheet" rel="stylesheet" ' 
                    + 'type="text/css" href="' + href + '">');

            // attach modules stylesheet
            $('#railgun-modules-stylesheet').remove();
            $(document.head).append('<link id="railgun-modules-stylesheet" rel="stylesheet" '
                    + 'type="text/css" href="' + Railgun.Config.modulesCSS + '">');

            // fix achievements modules
            var temp = $('.UserProfileAchievementsModule');
            if (0 !== temp.length) {
                temp.first().addClass('UserAchievements');
                temp.last().addClass('MoreAchievements');
            }

            // initialize the Storage object
            Railgun.Storage.init();
        }

        // function to init with try...catch
        function tryBegin() {
            try {
                begin();
            } catch (e) {
                console.log("[Railgun]: Warning. Exception thrown during initialization:", e);
            }
        }

        if ("undefined" === typeof abortModulesPackage) {
            // load module package and then initialize Railgun
            $.getScript(Railgun.Config.modulesJS).done(function () {
                tryBegin();
            }).fail(function () {
                console.log("[Railgun]: Warning. Modules package failed to"
                        + " load. Proceeding with initialization sequence. Your"
                        + " modulesJS file is:", Railgun.Config.modulesJS);
                tryBegin();
            });
        } else {
            // initialize without loading the modules package
            console.log("[Railgun]: You have opted to initialize Railgun"
                    + " without loading a modules package.");
            tryBegin();
        }
    }

    // expose public interface
    ns.domain = domain;
    ns.version = version;
    ns.updated = updated;
    ns.api = api;
    ns.info = info;
    ns.swapElements = swapElements;
    ns.init = init;
}(Railgun)); // End Railgun namespace declaration

/**
 * @namespace Namespace for storing user configuration options, uses default config options
 * if the user has not specified them in a RailgunConfig object.
 */
Railgun.Config = {};
(function (ns) {
    /**
     * Specifies the debug mode of the Railgun client. In debug mode, the stylesheet
     * and server pages are non-cached, and some extra data is printed to the console
     * for testing purposes.
     * @fieldOf Railgun.Config
     * @name isDebug
     * @type Boolean
     * @default false
     */
    var isDebug = false;

    /**
     * If true, processes the declaration block and halts execution before firing Railgun.
     * This is useful for testing new modules from the console, as a module can be defined
     * and then Railgun.init() can be called manually.
     * @fieldOf Railgun.Config
     * @name isDelay
     * @type Boolean
     * @default false
     * @see Railgun.init()
     */
    var isDelay = false;

    /**
     * Specifies a custom modules package to load.
     * @fieldOf Railgun.Config
     * @name modulesJS
     * @type String
     * @default domain + /wiki/MediaWiki:RailgunModules.min.js?action=raw&ctype=text/javascript
     */
    var modulesJS = Railgun.domain
            + "/wiki/MediaWiki:RailgunModules.min.js?action=raw&ctype=text/javascript";
    /**
     * Specifies a custom modules stylesheet to load.
     * @fieldOf Railgun.Config
     * @name modulesCSS
     * @type String
     * @default domain + /wiki/MediaWiki:RailgunModules.min.css?action=raw&ctype=text/css
     */
    var modulesCSS = Railgun.domain
            + "/wiki/MediaWiki:RailgunModules.min.css?action=raw&ctype=text/css";

    // specify missing config options
    if ("boolean" !== typeof ns.isDebug) {
        ns.isDebug = false;
    }
    if ("boolean" !== typeof ns.isDelay) {
        ns.isDelay = false;
    }
    if ("string" !== typeof ns.modulesJS) {
        ns.modulesJS = modulesJS;
        // give non-cached modulesJS in debug mode
        if (ns.isDebug) {
            if (-1 === ns.modulesJS.indexOf("smaxage=0")) {
                ns.modulesJS += "&maxage=0&smaxage=0";
            } else if (-1 === ns.modulesJS.indexOf("maxage=0")) {
                ns.modulesJS += "&maxage=0";
            }
        }
    }
    if ("string" !== typeof ns.modulesCSS) {
        ns.modulesCSS = modulesCSS;
        // give non-cached modulesCSS in debug mode
        if (ns.isDebug) {
            if (-1 === ns.modulesCSS.indexOf("smaxage=0")) {
                ns.modulesCSS += "&maxage=0&smaxage=0";
            } else if (-1 === ns.modulesCSS.indexOf("maxage=0")) {
                ns.modulesCSS += "&maxage=0";
            }
        }
    }

    // expose public interface
    Railgun.Config = ns;
}("object" == typeof RailgunConfig ? RailgunConfig : {}));
 
/**
 * @namespace A wrapper object defining Railgun's storage namespace, which is responsible for
 * handling communications with the Railgun server.
 */
Railgun.Storage = {};
(function (ns) {
    /**
     * A reference to the iframe HTML element which is appended to the body of the main page
     * when initialized in Railgun.Storage.init(). The client communicates with
     * the server by issuing postMessage requests to the iframe's contentWindow property.
     * @fieldOf Railgun.Storage
     * @name iframe
     * @type Object
     * @see Railgun.Storage.init()
     * @private
     */
    var iframe = null;
    
    /**
     * A copy of the essential the properties of the Railgun.Server object. This property is
     * initialized in Railgun.Storage.messageHandler().
     * @fieldOf Railgun.Storage
     * @name serverStatus
     * @type Object
     * @see Railgun.Storage.messageHandler()
     * @private
     */
    var serverStatus = null;
    
    /**
     * A copy of all the contents of localStorage. This property is initialized in
     * Railgun.Storage.messageHandler() and is always kept up-to-date.
     * @fieldOf Railgun.Storage
     * @name storageState
     * @type Object
     * @see Railgun.Storage.messageHandler()
     * @private
     */
    var storageState = null;
    
    /**
     * Sends a request object to the server. Requests are typically of the form
     * <code>{ instruction : "", key : "", isDebug : true, value : "whatever" }</code>
     * @methodOf Railgun.Storage
     * @param {Object} request a request object to be sent to the server
     * @see Railgun.Storage.getItem()
     * @see Railgun.Storage.removeItem()
     * @see Railgun.Storage.setItem()
     * @private
     */
    function sendRequestToServer(request) {
        // console.log for debugging
        if (Railgun.Config.isDebug) {
            console.log("[Railgun]: Client issuing " + request.instruction
                    + " request to the server:", request);
        }
        
        // issue request to the server
        iframe.contentWindow.postMessage(JSON.stringify(request), Railgun.domain);
    }
    
    /**
     * Sends a request to the server once the iframe has completely loaded.
     * @methodOf Railgun.Storage
     * @event
     * @private
     */
    function iframeOnloadHandler() {
        // register messageHandler as a message event listener for this window
        $(window).on("message", messageHandler);
     
        // retrieve initialization info from the server
        sendRequestToServer({
            instruction: "init",
            isDebug: Railgun.Config.isDebug
        });
    }
    
    /**
     * Processes all replied from the server.
     * @methodOf Railgun.Storage
     * @param {MessageEvent} event a reply from the server
     * @event
     * @private
     */
    function messageHandler(event) {
        event = event.originalEvent; // get browser's version of the event, $.on()
        
        if (event.origin !== Railgun.domain)
            return; // only process requests from the Railgun server
        
        var data = JSON.parse(event.data);
        
        // handle "init" instruction
        if ("init" === data.instruction) {
            // set serverStatus
            serverStatus = data.serverStatus || {};
            // set storageState
            storageState = data.storageState || {};
            // load ShowHideSiderail
            Railgun.ShowHideSiderail.init();
            // load the Module Manager
            Railgun.ModuleManager.init();
        // handle other instructions
        } else {
            // update storageState
            storageState = data.storageState;
        }
    }
    
    /**
     * Prints the contents of Railgun.Storage.storageState to the console.
     * @methodOf Railgun.Storage
     */
    function contents() {
        console.log("[Railgun]: ----- Printing storage data -----");
        console.log("[Railgun]:", storageState);
    };
    
    /**
     * Returns the value associated with a single key from localStorage
     * @methodOf Railgun.Storage
     * @param {String} key a valid key which must be listed in RailgunServer.keys
     * @returns value associated with a key in storage, or null if
     * no value is associated with the key
     */
    function getItem(key) {
        if ("object" === typeof storageState) {
            return storageState[key];
        }
        return false;
    }
    
    /**
     * Requests the server to associate a key with a value in localStorage. This method
     * provides the primary mechanism for modules to save data.
     * @methodOf Railgun.Storage
     * @param {String} key a valid key which must be listed in RailgunServer.keys
     * @param value data (of any type) which is to be stored in localStorage
     */
    function setItem(key, value) {
        sendRequestToServer({
            instruction : "setItem",
            key : key,
            value : value
        });
    }
    
    /**
     * Requests the server to delete a piece of data from localStorage.
     * @methodOf Railgun.Storage
     * @param {String} key a valid key which must be listed in RailgunServer.keys
     */
    function removeItem(key) {
        sendRequestToServer({
            instruction : "removeItem",
            key : key
        });
    }
    
    /**
     * Requests the server to delete all Railgun save data from localStorage.
     * @methodOf Railgun.Storage
     */
    function clear() {
        sendRequestToServer({
            instruction : "clear"
        });
    }
    
    /**
     * The initialization method for the Storage object. This method loads the server into an
     * iframe and appends it to the body of the document.
     * @methodOf Railgun.Storage
     */
    function init() {
        // generate HTML for the iframe
        var iframeHTML = '<iframe id="railgun-iframe"'
                + 'style="display: none; width: 1px; position: absolute;"'
                + 'src="' + Railgun.domain;
        if (Railgun.Config.isDebug) {
            iframeHTML += '/wiki/RailgunServerNocache?action=render"></iframe>';
        } else {
            iframeHTML += '/wiki/RailgunServerCached?action=render"></iframe>';
        }
        
        // insert iframe into the page
        $('#railgun-iframe').remove();
        $(document.body).append(iframeHTML);
        
        // set Storage.iframe private property
        iframe = document.getElementById('railgun-iframe');
        
        // register iframeOnloadHandler() as the iframe onload event listener
        $(iframe).on("load", iframeOnloadHandler);
    }
    
    // Expose public interface
    ns.init = init;
    ns.getItem = getItem;
    ns.setItem = setItem;
    ns.removeItem = removeItem;
    ns.clear = clear;
    ns.contents = contents;
}(Railgun.Storage)); // End Railgun.Storage namespace definition

/**
 * @namespace A wrapper object containing functionality for a feature of Railgun that
 * expands the content area. The <code>siderailHidden</code> property is a storage key.
 */
Railgun.ShowHideSiderail = {};
(function (ns) {
    /**
     * Constant which contains the HTML code for the left arrow in the user interface. The
     * arrow appears in the toolbar, when clicked this arrow should reveal the siderail.
     * @fieldOf Railgun.ShowHideSiderail
     * @name leftArrow
     * @type String
     * @constant
     * @private
     */
    var leftArrow = '<img id="railgun-siderail-left-arrow" '
            + 'src="https://images.wikia.nocookie.net/mathmagician/images/a/ab/ArrowLeft.png">';
    
    /**
     * Constant which contains the HTML code for the right arrow in the user interface. The
     * arrow appears in the toolbar, when clicked this arrow should collapse the siderail.
     * @fieldOf Railgun.ShowHideSiderail
     * @name rightArrow
     * @type String
     * @constant
     * @private
     */
    var rightArrow = '<img id="railgun-siderail-right-arrow" '
            + 'src="https://images.wikia.nocookie.net/mathmagician/images/9/93/ArrowRight.png">';
    
    /**
     * Shows the siderail upon clicking the show siderail (leftArrow) button and issues
     * a request to store siderailHidden == false in storage.
     * @methodOf Railgun.ShowHideSiderail
     * @see Railgun.ShowHideSiderail.leftArrow
     * @event
     * @private
     */
    function showSiderail() {
        // save state: siderailHidden == false in storage
        Railgun.Storage.setItem("siderailHidden", false);
        
        // apply CSS (see stylesheet) to show the siderail
        $('.WikiaRail, .WikiaMainContent, .catlinks').removeClass('railgun-no-siderail');
 
        // reveal the "hide siderail" arrow
        $('#railgun-siderail-left-arrow').css('display', 'none');
        $('#railgun-siderail-right-arrow').css('display', 'block');
    }
    
    /**
     * Shows the siderail upon clicking the hide siderail (rightArrow) button and issues
     * a request to store siderailHidden == true in storage.
     * @methodOf Railgun.ShowHideSiderail
     * @see Railgun.ShowHideSiderail.rightArrow
     * @event
     * @private
     */
    function hideSiderail() {
        // save state: siderailHidden == true in storage
        Railgun.Storage.setItem("siderailHidden", true);
 
        // apply CSS (see stylesheet) to hide the siderail
        $('.WikiaRail, .WikiaMainContent, .catlinks').addClass('railgun-no-siderail');
 
        // reveal the "show siderail" arrow
        $('#railgun-siderail-left-arrow').css('display', 'block');
        $('#railgun-siderail-right-arrow').css('display', 'none');
    }
    
    /**
     * Initialization method for the ShowHideSiderail module. Initializes the
     * siderailHidden property and modifies the DOM accordingly.
     * @methodOf Railgun.ShowHideSiderail
     */
    function init() {
        // initialize siderailHidden property
        var siderailHidden = Railgun.Storage.getItem("siderailHidden") ? true : false;
        
        // add arrows to show and hide the siderail into the document
        $('#railgun-siderail-left-arrow, #railgun-siderail-right-arrow').remove();
        $('#WikiaBarWrapper .toolbar').prepend(leftArrow + rightArrow);
        
        // add event handlers for the arrows
        $('#railgun-siderail-left-arrow').click(showSiderail);
        $('#railgun-siderail-right-arrow').click(hideSiderail);
 
        if (siderailHidden) {
            // apply CSS (see stylesheet) to hide the siderail
            $('.WikiaRail, .WikiaMainContent, .catlinks').addClass('railgun-no-siderail');
 
            // reveal the "show siderail" arrow
            $('#railgun-siderail-left-arrow').css('display', 'block');
            $('#railgun-siderail-right-arrow').css('display', 'none');
        } else {
            // reveal the "hide siderail" arrow
            $('#railgun-siderail-left-arrow').css('display', 'none');
            $('#railgun-siderail-right-arrow').css('display', 'block');
        }
    }
    
    // expose public interface
    ns.init = init;
}(Railgun.ShowHideSiderail)); // End Railgun.ShowHideSiderail namespace definition

/**
 * @namespace A wrapper object around all functionality for the Module Manager. Includes
 * the ability to install/uninstall modules.
 */
Railgun.ModuleManager = {};
(function (ns) {
    /**
     * Array list of all CSS class names of the default modules.
     * @fieldOf Railgun.ModuleManager
     * @name defaultModulesById
     * @type Array
     * @constant
     * @private
     */
    var defaultModulesById = ["WikiaPagesOnWikiModule", "WikiaActivityModule", "RelatedVideosModule",
            "LatestPhotosModule", "WikiaBlogListingBox", "ChatModule", "HotSpotsModule",
            "CommunityCornerModule", "UserAchievements", "MoreAchievements", "FollowedPagesModule",
            "WikiaLatestEarnedBadgesModule"];
    
    /**
     * Object listing all the display names of the default modules.
     * @fieldOf Railgun.ModuleManager
     * @name defaultModuleNames
     * @type Object
     * @constant
     * @private
     */
    var defaultModuleNames = {
        WikiaPagesOnWikiModule : "Add a Page", 
        WikiaActivityModule : "Recent Wiki Activity",
        RelatedVideosModule : "Related Videos",
        LatestPhotosModule : "Latest Photos",
        WikiaBlogListingBox : "Popular Blog Posts",
        ChatModule : "Chat",
        HotSpotsModule : "Hot Spots",
        CommunityCornerModule : "Community Messages",
        UserAchievements : "User Achievements",
        MoreAchievements : "More Achievements",
        FollowedPagesModule : "Pages I'm following",
        WikiaLatestEarnedBadgesModule : "Recent Earned Badges"
    };
    
    /**
     * Array which lists all IDs of the Railgun modules.
     * @fieldOf Railgun.ModuleManager
     * @name railgunModulesById
     * @type Array
     * @constant
     * @private
     */
    var railgunModulesById = [];
    
    /**
     * Object which lists all the display names of Railgun modules, indexed by ID.
     * @fieldOf Railgun.ModuleManager
     * @name railgunModuleNames
     * @type Object
     * @private
     */
    var railgunModuleNames = {};
    
    /**
     * Object which lists all the init methods of Railgun modules, indexed by ID.
     * @fieldOf Railgun.ModuleManager
     * @name railgunModuleInits
     * @type Object
     * @private
     */
    var railgunModuleInits = {};
    
    /**
     * Object which lists all the destroyer methods of Railgun modules, indexed by ID.
     * @fieldOf Railgun.ModuleManager
     * @name railgunModuleDestrs
     * @type Object
     * @private
     */
    var railgunModuleDestrs = {};
    
    /**
     * Whether or not the module manager is currently open or closed.
     * @fieldOf Railgun.ModuleManager
     * @name switch_rmmIsOpen
     * @type Boolean
     * @private
     */
    var switch_rmmIsOpen = false;
    
    /**
     * A reference variable used exclusivly by inst_handlerButtonClick().
     * @fieldOf Railgun.ModuleManager
     * @name inst_swaptr1
     * @private
     */
    var inst_swaptr1 = undefined;
    
    /**
     * A reference variable used exclusivly by inst_handlerButtonClick().
     * @fieldOf Railgun.ModuleManager
     * @name inst_swaptr2
     * @private
     */
    var inst_swaptr2 = undefined;
    
    /**
     * The default value of inst_listModulesId, used to reset the module order to
     * default ordering or if inst_listModulesId has never been saved to storage before.
     * @fieldOf Railgun.ModuleManager
     * @name inst_listModulesIdDefaultValue
     * @type Array
     * @private
     */
    var inst_listModulesIdDefaultValue = null;
    
    /**
     * (storage key) An object containing a list of all modules which have been
     * explicitly uninstalled by the user.
     * @fieldOf Railgun.ModuleManager
     * @name inst_modulesUninstalled
     * @type Object
     * @private
     */
    var inst_modulesUninstalled = null;
    
    /**
     * (storage key) A list of modules sorted by id which represents the order in which
     * they should appear in the siderail
     * @fieldOf Railgun.ModuleManager
     * @name inst_listModulesId
     * @type Array
     * @private
     */
    var inst_listModulesId = [];
    
    /**
     * (storage key) The id of a module which is currently anchored to the window.
     * @fieldOf Railgun.ModuleManager
     * @name anchor_moduleId
     * @type String
     * @private
     */
    var anchor_moduleId = null;
    
    /**
     * @methodOf Railgun.ModuleManager
     * @param {String} id a module's id
     * @returns true if the module is a default module, false if it's a Railgun module.
     * @private
     */
    function isDefaultModule(id) {
        return (-1 !== defaultModulesById.indexOf(id));
    }
    
    /**
     * Wraps a Module Manager section and prepends it into the siderail.
     * @methodOf Railgun.ModuleManager
     * @param {String} content html body of a Module Manager section
     * @param {String} header optional title to be wrapped in an h1 element
     * @private
     */
    function rmmPrependComponent(content, header) {
        var section = '<section class="rmm-component module rmm-mode-off-hidden">';
        var h1 = '';
        if ("string" === typeof header) {
            h1 = '<h1>' + header + '</h1>';
        }
        var html = section + h1 + content + '</section>';
        $('#WikiaRail').prepend(html);
    }
    
    /**
     * Anchors this module to the window.
     * @methodOf Railgun.ModuleManager
     * @event
     * @private
     */
    function anchor_clickHandlerAnchor() {
        // detach whichever module is currently anchored
        if (null !== anchor_moduleId) {
            $(('#' + anchor_moduleId + ' a.railgun-module-detach-a')).click();
        }
        
        // anchor this module
        anchor_moduleId = $(this).parent().parent()
        .addClass('railgun-module-anchor-topright').css('position', 'fixed').attr('id');
        Railgun.setItem("anchor_moduleId", anchor_moduleId);
        var detach = $('<a class="railgun-module-detach-a">detach</a>');
        detach.click(anchor_clickHandlerDetach);
        $(this).replaceWith(detach);
    }
    
    /**
     * Detaches this module from the window.
     * @methodOf Railgun.ModuleManager
     * @event
     * @private
     */
    function anchor_clickHandlerDetach() {
        anchor_moduleId = null;
        Railgun.removeItem("anchor_moduleId");
        $(this).parent().parent().removeClass('railgun-module-anchor-topright')
        .css('position', 'static');
        var anchor = $('<a class="railgun-module-anchor-a">anchor</a>');
        anchor.click(anchor_clickHandlerAnchor);
        $(this).replaceWith(anchor);
    }
    
    /**
     * Opens the Module Manager when the inactive icon is clicked.
     * @methodOf Railgun.ModuleManager
     * @event
     * @private
     */
    function switch_open() {
        // show only parts of the siderail that have class rmm-component
        $('#WikiaRail > *').each(function () {
            var elem = $(this);
            if (elem.hasClass('rmm-switch')) {
                // see stylesheet
            } else if (elem.hasClass('rmm-component')) {
                elem.removeClass("rmm-mode-off-hidden");
            } else {
                elem.addClass("rmm-mode-on-hidden");
            }
        });
    }
    
    /**
     * Closes the Module Manager when the active icon is clicked.
     * @methodOf Railgun.ModuleManager
     * @event
     * @private
     */
    function switch_close() {
        // show only parts of the siderail that DON'T have class rmm-component
        $('#WikiaRail > *').each(function () {
            var elem = $(this);
            if (elem.hasClass('rmm-switch')) {
                // see stylesheet
            } else if (elem.hasClass('rmm-component')) {
                elem.addClass("rmm-mode-off-hidden");
            } else {
                elem.removeClass("rmm-mode-on-hidden");
            }
        });
    }
    
    /**
     * Initializes the Module Manager controller section.
     * @methodOf Railgun.ModuleManager
     * @private
     */
    function switch_init() {
        // create HTML
        var section = '<section id="rmm-switch" class="rmm-switch module">'
                + '<span id="rmm-switch-span">Railgun Module Manager</span>'
                + '<button id="rmm-switch-button" class="wikia-button">'
                + 'Open</button></section>';
        
        // append rmm controller into the rail
        $('#WikiaRail').append(section);
        
        // attach event handler
        $('#rmm-switch-button').click(function () {
            if (switch_rmmIsOpen = !switch_rmmIsOpen) {
                switch_open();
                $('#rmm-switch-button').text("Close");
            } else {
                switch_close();
                $('#rmm-switch-button').text("Open");
            }
        });
    }
    
    /**
     * Displays information about Railgun in the Module Manager.
     * @methodOf Railgun.ModuleManager
     * @private
     */
    function about_init() {
        var d = "railgunscript";
        if ("Mathmagician" === wgUserName && "http://mathmagician.wikia.com" === wgServer) {
            d = "mathmagician";
        }
        var a = '<a href="http://' + d + '.wikia.com/wiki/MediaWiki:Railgun';
        var js = Railgun.Config.modulesJS;
        var jsi = js.indexOf('?');
        if (-1 !== jsi) {
            js = js.substr(0, jsi);
        }
        var css = Railgun.Config.modulesCSS;
        var cssi = css.indexOf('?');
        if (-1 !== cssi) {
            css = css.substr(0, cssi);
        }

        var scriptPages = '<table id="rmm-scripts-table" class="rmm-scripts-table">'
                + '<tr><th>Script Pages</th><th>Config Pages</th></tr>'
                + '<tr><td>' + a + 'Server.js">Server.js</a></td>'
                + '<td><a href="http://community.wikia.com/wiki/Special:MyPage/global.js">'
                + 'Global.js</a></td></tr>'
                + '<tr><td>' + a + 'Client.js">Client.js</a></td>'
                + '<td><a href="' + js + '">Modules.js</a></td></tr>'
                + '<tr><td>' + a + 'Client.css">Client.css</a></td>'
                + '<td><a href="' + css + '">Modules.css</a></td></tr>'
                + '<tr><td>' + a + 'Modules.js">Modules.js</a></td></tr>'
                + '<tr><td>' + a + 'Modules.css">Modules.css</a></td></tr></table>';
        
        var note = '<div id="rmm-about-div" class="rmm-about-div">Currently running Railgun '
                + 'version ' + Railgun.version + '</div>';

        var content = note + scriptPages;

        var part = '<span class="rmm-about-header-part">Updated ' + Railgun.updated + '</span>';

        // prepend about section into the siderail
        rmmPrependComponent(content, "About Railgun" + part);
    }

    /**
     * Installs or uninstalls a module when the user clicks a checkbox.
     * @methodOf Railgun.ModuleManager
     * @event
     * @private
     */
    function inst_handlerCheckboxClick () {
        var id = $(this).parent().parent().attr("module-id");
        var isDefault = isDefaultModule(id);

        // install/uninstall the module
        if (this.checked) {
            delete inst_modulesUninstalled[id];
            if (isDefault) {
                $('#' + id).removeClass('rmm-uninstalled');
            } else {
                railgunModuleInits[id]();
            }
            sortModulesOnRail();
        } else {
            inst_modulesUninstalled[id] = true;
            if (isDefault) {
                $('#' + id).addClass('rmm-uninstalled');
            } else {
                $('#' + id).remove();
                if ("function" === typeof railgunModuleDestrs[id])
                    railgunModuleDestrs[id]();
            }
        }

        // save inst_modulesUninstalled to localStorage
        Railgun.Storage.setItem("inst_modulesUninstalled", inst_modulesUninstalled);
    }
    
    /**
     * Swaps two modules in the siderail when the user clicks two consecutive "Swap" buttons.
     * @methodOf Railgun.ModuleManager
     * @event
     * @private
     */
    function inst_handlerButtonClick() {
        if (undefined === inst_swaptr1) {
            // set swaptr1 and make sure the button doesn't disappear on mouseout
            inst_swaptr1 = $(this).parent().parent();
            $(this).css('display', 'inline');
            $(this).prev().css('display', 'none');
        } else {
            // set swaptr2
            inst_swaptr2 = $(this).parent().parent();
            
            // swap the module ids in inst_listModulesId
            var id1 = inst_swaptr1.attr('module-id');
            var id2 = inst_swaptr2.attr('module-id');
            var index1 = inst_listModulesId.indexOf(id1);
            var index2 = inst_listModulesId.indexOf(id2);
            inst_listModulesId[index1] = id2;
            inst_listModulesId[index2] = id1;
            
            // sort modules on the rail
            sortModulesOnRail();
            
            // save inst_listModulesId to localStorage
            Railgun.Storage.setItem("inst_listModulesId", inst_listModulesId);
            
            // physically swap tr1 and tr2
            Railgun.swapElements(inst_swaptr1, inst_swaptr2);
            
            // clean up
            inst_swaptr1.children('td.rmm-installation-td2').children().removeAttr('style');
            inst_swaptr1 = undefined;
            inst_swaptr2 = undefined;
        }
    }
    
    /**
     * Initializes the Installation section of the Module Manager.
     * @methodOf Railgun.ModuleManager
     * @private
     */
    function inst_init() {
        var ar = [];
        
        // set inst_listModulesIdDefaultValue
        for (var i = 0; i < defaultModulesById.length; i++) {
            ar[i] = defaultModulesById[i];
        }
        for (var i = 0; i < railgunModulesById.length; i++) {
            ar[ar.length] = railgunModulesById[i];
        }
        inst_listModulesIdDefaultValue = ar;
        
        // get inst_listModulesId from localStorage or set default value
        inst_listModulesId = Railgun.Storage.getItem("inst_listModulesId");
        if (!inst_listModulesId) {
            inst_listModulesId = inst_listModulesIdDefaultValue;
        } else {
            // add any modules from default value which are missing in the localStorage version
            for (var i = 0; i < inst_listModulesIdDefaultValue.length; i++) {
                var id = inst_listModulesIdDefaultValue[i];
                if (-1 === inst_listModulesId.indexOf(id)) {
                    inst_listModulesId[inst_listModulesId.length] = id;
                }
            }
            
            // remove any modules in the localStorage version that aren't present in default value
            for (var i = 0; i < inst_listModulesId; i++) {
                var id = inst_listModulesId[i];
                if (-1 === inst_listModulesIdDefaultValue.indexOf(id)) {
                    inst_listModulesId.splice(i, 1);
                }
            }
        }
        
        // build HTML base
        var table = '<table id="rmm-installation-table" class="rmm-installation-table">';
        var rows = '';
        for (var index = 0; index < inst_listModulesId.length; index++) {
            var id = inst_listModulesId[index];
            var isDefault = isDefaultModule(id);
            var checked = inst_modulesUninstalled[id] ? "" : "checked";
            
            var tr = '<tr class="rmm-installation-tr" module-id="' + id + '">';
            var td1 = '<td class="rmm-installation-td1">';
            var checkbox = '<input type="checkbox" class="rmm-installation-checkbox" '
                    + checked + ' />';
            var td2 = '<td class="rmm-installation-td2">';
            var number = '<p>' + inst_listModulesIdDefaultValue.indexOf(id) + '</p>';
            var button = '<button class="rmm-installation-hover-hidden">Swap</button>';
            var td3 = '<td class="rmm-installation-td3">';
            var name = isDefault ? defaultModuleNames[id] : railgunModuleNames[id];
            
            rows += tr + td1 + checkbox + '</td>' + td2 + number
                    + button + '</td>' + td3 + name + '</td></tr>';
        }
        
        // prepend html into siderail
        rmmPrependComponent(table + rows + '</table>', "Installation & Sorting");
        
        // attach checkbox click event handler
        $('input.rmm-installation-checkbox').click(inst_handlerCheckboxClick);
        
        // attach td2 hover event handlers
        $('td.rmm-installation-td2').hover(function () {
            $(this).children('p').addClass('rmm-installation-hover-hidden');
            $(this).children('button').removeClass('rmm-installation-hover-hidden');
        },
        function () {
            $(this).children('p').removeClass('rmm-installation-hover-hidden');
            $(this).children('button').addClass('rmm-installation-hover-hidden');
        });
        
        // attach td2 button click event handler
        $('td.rmm-installation-td2 button').click(inst_handlerButtonClick);
        
        // physically hide modules that are uninstalled on pageload
        for (var id in inst_modulesUninstalled) {
            $('#' + id).addClass('rmm-uninstalled');
        }
    }
    
    /**
     * Places all modules on the siderail into the appropriate order.
     * @methodOf Railgun.ModuleManager
     * @private
     */
    function sortModulesOnRail() {
        // sort the rail
        var last = $('.rmm-switch');
        var lastIndex = last.index();
        for (var i = 0; i < inst_listModulesId.length; i++) {
            var elem = $('#' + inst_listModulesId[i]);
            if (elem.length && 1 !== (lastIndex - elem.index())) {
                last.before(elem);
            }
        }
    }
    
    /**
     * Wraps the given content with section tags and inserts the module into
     * the siderail.
     * @methodOf Railgun.ModuleManager
     * @param {String} id the class and id to be given to the section tag
     * @param {String} content module content to be wrapped and inserted
     * @param {String} header display name of the module
     */
    function insert(id, content, header) {
        // error checking
        var fail = false;
        if ("string" != typeof id) {
            if (Railgun.Config.isDebug) {
                console.log("[Railgun]: Warning. Misuse of insert(), @param id "
                        + "must be a string, but the value provided was id =", id);
            }
            fail = true;
        }
        if ("string" != typeof content) {
            if (Railgun.Config.isDebug) {
                console.log("[Railgun]: Warning. Misuse of insert(), @param content "
                        + "must be a string, but the value provided was content =", content);
            }
            fail = true;
        }
        if (fail) {
            return;
        }
        
        // safely re-insert this module
        $('#' + id).remove();
        var section = '<section class="' + id + ' railgun-module module" id="' + id + '">';
        var h1 = '';
        if ("string" === typeof header) {
            h1 = '<h1 class="railgun-module-header">' + header + '</h1>';
        }
        
        // insert the module
        $('#WikiaRail').append(section + h1 + content + '</section>');
        
        // check if this module is anchored to the window
        if (anchor_moduleId === id) {
            var detach = $('<a class="railgun-module-detach-a">detach</a>');
            detach.click(anchor_clickHandlerDetach);
            $('#' + id).addClass('railgun-module-anchor-topright')
            .css('position', 'fixed').children('.railgun-module-header').append(detach);
        } else {
            var anchor = $('<a class="railgun-module-anchor-a">anchor</a>');
            anchor.click(anchor_clickHandlerAnchor);
            $('#' + id).children('.railgun-module-header').append(anchor);
        }
    }

    /**
     * Registers a module with the Railgun framework.
     * @methodOf Railgun.ModuleManager
     * @param {String} id the class and id associated with the module's section tag
     * @param {String} name the display name of the module
     * @param {Function} init a function that initializes the module (installation)
     * @param {Function} destr a function that destroys the module (uninstallation)
     */
    function register(id, name, init, destr) {
        // error checking
        var fail = false;
        if ("string" != typeof id) {
            if (Railgun.Config.isDebug) {
                console.log("[Railgun]: Warning. Misuse of register(), @param id "
                        + "must be a string, but the value provided was id =", id);
            }
            fail = true;
        }
        if ("string" != typeof name) {
            if (Railgun.Config.isDebug) {
                console.log("[Railgun]: Warning. Misuse of register(), @param name "
                        + "must be a string, but the value provided was name =", name);
            }
            fail = true;
        }
        if ("function" != typeof init) {
            if (Railgun.Config.isDebug) {
                console.log("[Railgun]: Warning. Misuse of register(), @param init "
                        + "must be a function, but the value provided was init =", init);
            }
            fail = true;
        }
        if ("undefined" != typeof destr && "function" != typeof destr) {
            if (Railgun.Config.isDebug) {
                console.log("[Railgun]: Warning. Misuse of register(), @param destr "
                        + "must be undefined or of type function, but the value "
                        + "provided was destr =", destr);
            }
            fail = true;
        }
        if (fail) {
            return;
        }
        
        // initialize private variables
        railgunModulesById[railgunModulesById.length] = id;
        railgunModuleNames[id] = name;
        railgunModuleInits[id] = init;
        railgunModuleDestrs[id] = destr;
    }
    
    /**
     * Initializes the Module Manager, which will also initialize all
     * other installed custom modules.
     * @methodOf Railgun.ModuleManager
     */
    function init() {
        // get inst_modulesUninstalled from localStorage or set default value
        inst_modulesUninstalled = Railgun.Storage.getItem("inst_modulesUninstalled") || {};
        
        // get anchor_moduleId
        anchor_moduleId = Railgun.Storage.getItem("anchor_moduleId") || "";
        
        // safely re-init
        if (switch_rmmIsOpen) {
            switch_close();
        }
        $('.rmm-component, .rmm-switch').remove();
        
        // make sure each default module has a unique id
        for (var i = 0; i < defaultModulesById.length; i++) {
            $('.' + defaultModulesById[i]).attr('id', defaultModulesById[i]);
        }
        
        // Initialize installed custom modules
        for (var i = 0; i < railgunModulesById.length; i++) {
            var id = railgunModulesById[i];
            if (!inst_modulesUninstalled[id]) {
                railgunModuleInits[id]();
            }
        }
        
        about_init();
        inst_init();
        switch_init();
        sortModulesOnRail();
    }
    
    // expose public interface
    ns.insert = insert;
    ns.register = register;
    ns.init = init;
}(Railgun.ModuleManager));
//--------------------------------------------------------------------------------------------endtry
} catch (e) {
    console.log("[Railgun]: Warning. A pre-initialization exception was thrown:", e);
}

try {
    // ------- Railgun Main Initialization Sequence -------
    // -> builds the API in the Railgun namespace
    // -> runs Railgun.init()
    // -> gets Railgun Modules script at Railgun.Config.modulesJS
    // -> attaches stylesheets and calls Railgun.Storage.init()
    // -> loads an iframe containing the server into the document
    // -> sends a request to the server to grab all info from localStorage
    // -> calls Railgun.ShowHideSiderail.init()
    // -> calls Railgun.ModuleManager.init()
    // -> adds Module Manager components
    // -> inserts all Railgun Modules into the document
    if ("boolean" === typeof passedPreEval && passedPreEval) {
        Railgun.getItem = Railgun.Storage.getItem;
        Railgun.setItem = Railgun.Storage.setItem;
        Railgun.removeItem = Railgun.Storage.removeItem;
        Railgun.clear = Railgun.Storage.clear;
        Railgun.insert = Railgun.ModuleManager.insert;
        Railgun.register = Railgun.ModuleManager.register;

        if (!Railgun.Config.isDelay)
            Railgun.init();
    }
} catch (e) {
    if ("object" !== typeof Railgun)
        console.log("[Railgun]: Warning. Railgun namespace is undefined.", e);
    else if ("object" !== typeof Railgun.Config)
        console.log("[Railgun]: Warning. Railgun.Config namespace is undefined.", e);
    else if ("object" !== typeof Railgun.Storage)
        console.log("[Railgun]: Warning. Railgun.Storage namespace is undefined.", e);
    else if ("object" !== typeof Railgun.ShowHideSiderail)
        console.log("[Railgun]: Warning. Railgun.ShowHideSiderail namespace is undefined.", e);
    else if ("object" !== typeof Railgun.ModuleManager)
        console.log("[Railgun]: Warning. Railgun.ModuleManager namespace is undefined.", e);
    else
        console.log("[Railgun]: Warning. Railgun failed to initialize, "
                + "but all namespaces are defined.", e);
}
//--------------------------------------------------------------------------------------------------
});