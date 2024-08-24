// #siteSub 
$(function(){
     if ($('#WikiaPageHeader').length ) $('#WikiaPageHeader').append('<div id="siteSub"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Aviso:</span> Los artículos pueden contener <u>spoilers</u></div>')
});


// dev:Less
window.lessOpts = window.lessOpts || [];

window.lessOpts.push( {
    target: 'MediaWiki:Common.css',
    source: 'MediaWiki:Custom-Common.less',
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Custom-Common.less',
        'Wiki Fuuka:Less'
    ],
    header: 'MediaWiki:Custom-Css-header'
} );
window.lessOpts.push( {
    target: 'MediaWiki:Wikia.css',
    source: 'MediaWiki:Custom-Wikia.less',
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-Wikia.less',
        'Wiki Fuuka:Less'
    ],
    header: 'MediaWiki:Custom-Css-header'
} );
window.lessOpts.push( {
    target: 'MediaWiki:Monobook.css',
    source: 'MediaWiki:Custom-Monobook.less',
    load: [
        'MediaWiki:Monobook.css',
        'MediaWiki:Custom-Monobook.less',
        'Wiki Fuuka:Less'
    ],
    header: 'MediaWiki:Custom-Css-header'
} );


/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js
mw.loader.using( ['jquery.cookie']);
importScriptURI("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});