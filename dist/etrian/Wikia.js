// <syntaxhighlight lang="JavaScript">
/*global $, wgNamespaceNumber */
/*jslint plusplus: true, vars: true, browser: true */

if (window.modsLoaded === undefined) {
    var modsLoaded = {};
}

// Load modules only once
if (wgNamespaceNumber !== undefined && !modsLoaded.wikiaJS) {


    // Modules have been loaded
    modsLoaded.wikiaJS = true;
}

// </syntaxhighlight>