/* Any JavaScript here will be loaded for all users on every page load. */


/***### Everyone is a rollback here ###***/
importScriptPage("MediaWiki:VDA.js", "vda");

$(function () {
    VDA.load("RV");
});

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images /7/73/Button_code_nowiki.png?1",
     "speedTip": "Nowiki",
     "tagOpen": "<code>",
     "tagClose": "</code>",
     "sampleText": "Code"};

}