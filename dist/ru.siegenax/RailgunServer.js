/**
 * @fileOverview This file defines the lightweight Railgun server component,
 * which processes localStorage requests issued by the Railgun client.
 * This file is automatically loaded by the Railgun client.
 * 
 * Railgun Wiki:   http://railgunscript.wikia.com/wiki/Railgun_Wiki
 * Contact Author: http://community.wikia.com/wiki/Message_Wall:Mathmagician
 * 
 * @author © Jeff Bradford, 2012
 * @version 1.1.3
 */
var Railgun = {};
/**
 * @namespace A wrapper object for all Railgun server methods. The main method is
 * processRequest(), which is the server's message event handler. The event handler
 * delegates various client requests to the other private methods.
 */
Railgun.Server = (function () {
    /**
     * true if the server is in debug mode, false otherwise
     * @type Boolean
     * @default false
     * @private
     */
    var isDebug = false;
 
    /**
     * The version of the Railgun server source code.
     * @type String
     * @private
     */
    var version = "1.1.2";
 
    /**
     * A prefix automatically given to each key Railgun stores in localStorage.
     * @type String
     * @private
     */
    var keyPrefix = "railgun_";
 
    /**
     * Error message displayed when the key is not a string.
     * @type String
     * @constant
     * @private
     */
    var badKeyErrorMsg = "[Railgun]: Server Error. Key must be a string.";
 
    /**
     * Error message displayed when the value is undefined.
     * @type String
     * @constant
     * @private
     */
    var badValueErrorMsg = "[Railgun]: Server Error. Undefined value not permitted.";
 
    /**
     * An object containing all key/value pairs Railgun has placed in localStorage
     * @type Object
     * @private
     */
    var storageState = {};
 
    /**
     * Associates a value with a given key in localStorage and storageState.
     * @param {String} key a key to associate with the given value
     * @param value a value of arbitrary type to be stored
     * @returns badKeyErrorMsg if key is not a string, badValueErrorMsg if value is
     * undefined, 0 otherwise
     * @private
     */
    function setItem(key, value) {
        if ("string" !== typeof key) {
            return badKeyErrorMsg;
        } else if ("undefined" === typeof value) {
            return badValueErrorMsg;
        } else {
            window.localStorage.setItem(keyPrefix + key, JSON.stringify(value));
            storageState[key] = value;
            return 0;
        }
    };
 
    /**
     * Removes a single item from localStorage and storageState.
     * @param {String} key a key to search storage for and remove its value
     * @returns badKeyErrorMsg if the key is not a string, 0 otherwise
     * @private
     */
    function removeItem(key) {
        if ("string" !== typeof key) {
            return badKeyErrorMsg;
        } else {
            window.localStorage.removeItem(keyPrefix + key);
            delete storageState[key];
            return 0;
        }
    };
 
    /**
     * Removes all items from localStorage associated with native list of keys,
     * and sets storageState equal to an empty object.
     * @private
     */
    function clear() {
        for (var key in window.localStorage) {
            if (-1 !== key.indexOf(keyPrefix))
                window.localStorage.removeItem(key);
        }
        storageState = {};
    };
 
    /**
     * Sets storageState equal to the content Railgun has stored in localStorage.
     * @private
     */
    function setStorageState() {
        for (var key in window.localStorage) {
            if (-1 !== key.indexOf(keyPrefix)) {
                storageState[key.substr(keyPrefix.length)] = 
                        JSON.parse(window.localStorage.getItem(key));
            }
        }
    };
 
    /**
     * @scope Railgun.Server
     */
    return {
        /**
         * The Railgun server's message event listener which processes requests made
         * by the Railgun client. This method reads instructions from the client,
         * delegates the task to an appropriate method, and then sends the server's
         * response back to the client. To make a request, the client must send the
         * server a JSON.stringified request object with instruction, key and value
         * properties: <code>{ instruction : "setItem", key : "siderailHidden",
         * value : true }</code>
         * @param {MessageEvent} event an event corresponding to a postMessage
         * request made by the client
         * @event
         */
        processRequest : function (event) {
            // only process requests from wikia.com
            if (-1 === event.origin.indexOf(".wikia.com"))
                return;
 
            // response
            var response = JSON.parse(event.data);
            if ("object" !== typeof response)
                response = {};
            response.status = "success";
 
            // error checking
            if ("string" !== typeof response.instruction) {
                console.log("[Railgun]: Server Error. Cannot process non-string instruction:",
                        response.instruction);
                return;
            }
 
            switch (response.instruction)
            {
            // process "setItem" request
            case "setItem" :
                var temp = setItem(response.key, response.value);
                if (0 !== temp)
                    response.status = temp;
                break;
            // process "removeItem" request
            case "removeItem" :
                var temp = removeItem(response.key);
                if (0 !== temp)
                    response.status = temp;
                break;
            // process "clear" request
            case "clear" :
                clear();
                break;
            // process "init" request
            case "init" :
                // set server mode
                isDebug = response.isDebug ? true : false;
 
                // set storageState
                setStorageState();
 
                // server data to send back to the client
                response.serverStatus = {
                    isDebug : isDebug,
                    version : version
                };
                break;
            default :
                console.log("[Railgun]: Server Error. Instruction: " + response.instruction
                        + " was not recognized by the server.");
            }
 
            // add storageState to response
            response.storageState = storageState;
 
            // console.log for debugging
            if (isDebug) {
                console.log("[Railgun]: Server has finished processing "
                        + response.instruction + " request:", response);
            }
 
            // Send JSON.stringify(response) to the client as the response
            event.source.postMessage(JSON.stringify(response), event.origin);
        }
    };
}());
 
// register processRequest() as the server's event listener
if (window.addEventListener) {   // Chrome + Firefox
    window.addEventListener("message", Railgun.Server.processRequest, false);
} else if (window.attachEvent) { // Internet Explorer compatibility
    window.attachEvent("message", Railgun.Server.processRequest);