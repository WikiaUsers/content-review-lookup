importScriptPage('MediaWiki:Wikia.js/SpoilerPop.js');
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

// ADD RAIL MODULE II (based on Dev Wiki)
$(function(){
    $('<section class="railModule rail-module" id="AddRailModuleII"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Template:Module&action=render');
});