if ($("body").hasClass("ns-120") || $("body").hasClass("mainpage")) {

console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen');
importScriptPage('MediaWiki:GeschichtenbalkenAnpassenPortale.js', 'de.fanfictions');

jQuery.fn.sortDivs = function sortDivs() {
    $("> div", this[0]).sort(dec_sort).appendTo(this[0]);
    function dec_sort(a, b){ return ($(b).data("kapitelzahl")) < ($(a).data("kapitelzahl")) ? 1 : -1; }

    setTimeout(function() { $('div[data-kapitelart="Kurzgeschichte"]').detach().appendTo('#portal-sort'); }, 1000);
}

    $("#portal-sort li a[title^='Geschichte:']").each(function() {
   var link = $(this)
   var name = link.attr('href').slice(17);
   
   var div = $('<div/>').hide().text(name)
   
   $(this).after(div)
   div.load("http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichtenbalken/" + name + "?action=render", null, function() {
    var box = $(this).find('.geschichtenbalken2013')
    if(!box.length) { link.closest('li').remove() } else { link.replaceWith(box); box.unwrap(); }
    $(this).remove()
   });
  });
  
/* filter für mehrals */
port_number = wgPageName.replace("Portal:Mehr_als_", "").replace("_Kapitel", "");

$("#mehrals-nav").append('<hr><div style="width: auto; margin: 0 auto;"><button id="portal_showall">Zeige alle Geschichten</button>&nbsp;<button id="portal_showonly">Zeige nur mit ' + port_number + ' Kapiteln</button>&nbsp;<button id="portal_showactive">Nur komplette oder aktive Geschichten anzeigen</button></div>');

$("#portal_showall").click(function() {
$(".geschichtenbalken2013").fadeOut();

$(".geschichtenbalken2013").fadeIn();
});

$("#portal_showactive").click(function() {
$(".geschichtenbalken2013[data-attr='status-inaktiv']").fadeOut();
});

$("#portal_showonly").click(function() {

$(".geschichtenbalken2013").fadeOut();

$(".geschichtenbalken2013.portal-mehrals-" + port_number).fadeIn();

});
}























$(document).ready(function() { 

if ($("body").hasClass('ns-4') || $("body").hasClass('ns-120') || $("body").hasClass("mainpage")) {
setTimeout(function() { 

/* try 5 times */
setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 0');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 500);

setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 1');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 1000);

setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 2');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 1500);

setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 3');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 2000);

setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 4');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 3000);

setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 5');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 4000);

setTimeout(function() {
console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen 6');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
}, 5000);

$(window).ready(function() {
setTimeout(function() {
$(window).ready(function() {

console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen, final');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
});
}, 6000);
});

}, 1000);

$(window).ready(function() {
setTimeout(function() {
$(window).ready(function() {

console.log('GeschichtenbalkenAnpassenPortale.js über StoryCardPortal geladen, final outside');
sizeForPortal();

if (wgPageName !== "MeerUndMehr" || wgPageName !== "Portal:Vorgestellt") {

$("#portal-sort").sortDivs();

}
});
}, 6000);
});



} /* end if portal class */
});