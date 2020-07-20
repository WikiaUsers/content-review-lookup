if ($("body").hasClass("ns-112")) {
if ($("#geschichtenfsk-number").html() === undefined) {
$("#WikiaArticle").before('<div id="loadGeschichtenbalken"></div>');
    $("#loadGeschichtenbalken").each(function() {
   var link = $(this)
   var name = wgPageName.replace(/Geschichte\:/, "").replace(/\/(.*)/, "");
      $(this).load("http://de.fanfictions.wikia.com/wiki/Vorlage:Geschichtenbalken/" + name + "?action=render", null, function() {
    var box = $(this).find('.geschichtenbalken2013')
    if(!box.length) { link.closest('li').remove() } else { link.replaceWith(box); /*box.unwrap();*/ }
/*    $(this).remove()*/
   });
  });
} else { 
console.log("Geschichtenbalken bereits existent");
}
}
/*
.geschichtenbalken-wrapper
.geschichtenbalken-top
*/