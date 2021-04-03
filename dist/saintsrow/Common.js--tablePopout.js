//this function restores, and improves, the popout functionality of wide tables using class="popout"


if (typeof debug452 == "function") debug452("start of tablePopout");

function tablePopout(event) {
    var table = $(event.currentTarget).next("table.popout")[0];
    if (typeof table == "undefined") table = $($('.sprite.popout')[0]).next("div.table-wrapper").find("table.popout")[0]; /* edge case: when the window is resized, the table gets wrapped, and breaks the popout. */
    if (typeof table == "undefined") { console.log("popout failed"); tablePopoutInit(); return; }

    SRWpopup("TablePopup", "", $(table).clone());
    if ($(table).hasClass("fullwidth")) $("#TablePopup .popupWrapper").css({"width":"auto"});
    $("#TablePopup .popupContent")
      .addClass("WikiaArticle")
      .css({ "max-height": $(window).height() - 150 });

    if ($("#TablePopup .popupContent").height() > ($(window).height() - 151)) { //zoom causes rounding errors.
      $("#TablePopup .popupContent").addClass("longPopup");
    }

//    $('video, audio').embedPlayer(); // this does not work.
    //**** Re-initialise sorting.
    $( '#TablePopup .jquery-tablesorter').removeClass('jquery-tablesorter');
    $( '#TablePopup table.sortable' ).each(function(){ $(this).tablesorter();});
  }
window.tablePopoutInit = function() {
  //**** prepare automatically wide tables. Scrolling still works.  Specific selector ensures no double wrapping. 
  $('div.table-is-wide>div>table').addClass("popout");
  $('table.fullwidth').addClass("popoutfullwidth");
  $("table:not(.fullwidth) table.fullwidth").removeClass("popoutfullwidth");
  $('table.popoutfullwidth').addClass("popout").removeClass("popoutfullwidth");

  //**** add icon before table
  $('.sprite.popout').remove();
  $('.popout').each(function() {$(this).before($('<img src="' + mw.config.get("wgBlankImgUrl") + '" title="Click to expand table" class="sprite popout">').click(tablePopout));})
}
$(document).ready(function() { 
  tablePopoutInit();
});
mw.hook('wikipage.content').add(function () {
  tablePopoutInit();
});