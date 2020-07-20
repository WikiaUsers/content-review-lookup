//Request page content through jQuery AJAX
$.get(mw.config.get('wgScriptPath') + "/index.php?&action=raw&title=" + encodeURIComponent("MediaWiki:Dernier_Épisode"), function (response) {
  
    //Include raw content into target element
    $("#lastEpisode").html(response);

});