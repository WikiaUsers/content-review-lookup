/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
SpoilerAlert = {
  'class': "Spoiler",
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});
/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('MediaWiki:SpoilersToggle.js', 'dragonage');


/****************************/
/* "tab" */
/****************************/
$(document).ready(function(){
  // When a tab is clicked
  $(".tab").click(function () {
    var $siblings= $(this).parent().children();
    var $alltabs = $(this).closest(".tabcontainer");
    var $content = $alltabs.parent().children(".tabcontents");

    // switch all tabs off
    $siblings.removeClass("active");

    // switch this tab on
    $(this).addClass("active");

    // hide all content
    $content.children(".content").css("display","none");

    // show content corresponding to the tab
    var index = $siblings.index(this);
    $content.children().eq(index).css("display","block");
  });	
});