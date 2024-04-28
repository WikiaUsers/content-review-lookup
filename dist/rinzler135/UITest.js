
$('.orangebox').html('<button class="opendialog">Click here to open JQueryUI dialog</button><style type="text/css">@import url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.22/themes/dark-hive/jquery-ui.css);</style><div class="testdialog" title="Cake"><img src="https://images.wikia.nocookie.net/legouniverse/images/0/03/Legouniversemechen.gif"></img></div>');
 
$( ".testdialog" ).dialog({
autoOpen: false,
draggable: false,
resizable: false,
open: function(){ $("body").css("overflow","hidden"); $(".testdialog").css("display","inherit !important"); },
close: function(){ $("body").css("overflow","auto"); $(".testdialog").css("display","none"); } ,
buttons: [
{ text: "Cake", click: function() { $( this ).dialog( "close" ); } },
{ text: "Cake", click: function() { $( this ).dialog( "close" ); } } ]
});
 
$( ".opendialog" ).click(function() {
$( ".testdialog" ).dialog( "open" );
return false;
});
 
$('.ui-button-text-only .ui-button-text').css('padding', '0 1em');
 
$('.orangebox').css('background-color', 'transparent');