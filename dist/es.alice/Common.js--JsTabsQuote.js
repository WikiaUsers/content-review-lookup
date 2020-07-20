/***********************************************************
 * Toggles a certain quote when a JsTab is clicked.
 * Created by: [[User:LiaSakura]] 
 * JsTabs created by: [[User:KettleMeetPot]]
 * JsTabs JS: MediaWiki:Common.js/JsTabs.js
 ***********************************************************/
 
$(document).ready(function() {
    $("#AMR-JsTab").click(function (){
        if ($(this).prop("class") == "Ktab selected") {
            $("#AMR-Quote").show();
            $("#AMA-Quote").hide();
            $("#AO-Quote").hide();
        }
    });
    
    $("#AMA-JsTab").click(function (){
        if ($(this).prop("class") == "Ktab selected") {
            $("#AMA-Quote").show();
            $("#AMR-Quote").hide();
            $("#AO-Quote").hide();
        }
    });
    
    $("#AO-JsTab").click(function (){
        if ($(this).prop("class") == "Ktab selected") {
            $("#AO-Quote").show();
            $("#AMA-Quote").hide();
            $("#AMR-Quote").hide();
        }
    });    

});