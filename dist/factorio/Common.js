/* Main page tab swithcer */  
  $( "#inv-1" ).click(function() {
    $( "#invtab-1" ).show();
    $( "#invtab-2" ).hide();
    $( "#invtab-3" ).hide();
    $( "#invtab-4" ).hide();
    $( "#inv-1" ).addClass("invsel");
    $( "#inv-2" ).removeClass("invsel");
    $( "#inv-3" ).removeClass("invsel");
    $( "#inv-4" ).removeClass("invsel");
  });
  $( "#inv-2" ).click(function() {
    $( "#invtab-1" ).hide();
    $( "#invtab-2" ).show();
    $( "#invtab-3" ).hide();
    $( "#invtab-4" ).hide();
    $( "#inv-1" ).removeClass("invsel");
    $( "#inv-2" ).addClass("invsel");
    $( "#inv-3" ).removeClass("invsel");
    $( "#inv-4" ).removeClass("invsel");
  });
  $( "#inv-3" ).click(function() {
    $( "#invtab-1" ).hide();
    $( "#invtab-2" ).hide();
    $( "#invtab-3" ).show();
    $( "#invtab-4" ).hide();
    $( "#inv-1" ).removeClass("invsel");
    $( "#inv-2" ).removeClass("invsel");
    $( "#inv-3" ).addClass("invsel");
    $( "#inv-4" ).removeClass("invsel");
  });
  $( "#inv-4" ).click(function() {
    $( "#invtab-1" ).hide();
    $( "#invtab-2" ).hide();
    $( "#invtab-3" ).hide();
    $( "#invtab-4" ).show();
    $( "#inv-1" ).removeClass("invsel");
    $( "#inv-2" ).removeClass("invsel");
    $( "#inv-3" ).removeClass("invsel");
    $( "#inv-4" ).addClass("invsel");
  });

/* Custom Tooltips for use with dev:Tooltips.js */
window.tooltips_list = [
    {   classname: 'item-infobox',
        parse: '{'+'{Infobox/Item|Name=<#item#>|Short=1}}'},
    {   classname: 'tech-infobox',
        parse: '{'+'{Infobox/Technology|Name=<#tech#>|Short=1}}'},
        ]
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};