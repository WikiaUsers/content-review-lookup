// add monaco AJAX functionality to the wowwiki skin
var scriptElem = document.createElement( 'script' );
// macbre: fixes #3646 (please don't hardcode URLs)
scriptElem.setAttribute( 'src' , stylepath + "/monaco/js/allinone_loggedin.js?" + wgStyleVersion );
scriptElem.setAttribute( 'type' , 'text/javascript' );
document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );

// auto-zebra stripe for tables
function zebraStripe() {
if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "transparent" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
$(".sortheader").bind("click", function() {
$("table.zebra > tbody > tr").not(".nozebra").css("background-color","transparent");
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#2c2c2c");
});
}
}

addOnloadHook(zebraStripe);