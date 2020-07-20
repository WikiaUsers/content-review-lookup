//this function restores, and improves, the popout functionality of wide tables using class="popout"

function tablePopout(event) {
    var table = $(event.currentTarget).next("table.popout")[0];
    if (typeof table == "undefined") table = $($('.sprite.popout')[0]).next("div.table-wrapper").find("table.popout")[0]; /* edge case: when the window is resized, the table gets wrapped, and breaks the popout. */
    if (typeof table == "undefined") { console.log("popout failed"); tablePopoutInit(); return; }

    $(table).clone().addClass("fullwidth").makeModal({
      id: "ModalTable",
      width: $(window).width() - 100,
    });
    $("#ModalTable .modalContent").addClass("WikiaArticle").css({
      overflow: "auto",
      height: $(window).height() - 150
    });
    //**** Re-initialise sorting.
    $( '#ModalTable .jquery-tablesorter').removeClass('jquery-tablesorter')
    $( '#ModalTable table.sortable' ).each(function(){ $(this).tablesorter();});
  }
function tablePopoutInit() {
  //**** prepare automatically wide tables. Scrolling still works.  Specific selector ensures no double wrapping. 
  $('div.table-is-wide>div>table').each(function() {$(this).addClass("popout");}); 

  //**** add icon before table
  $('.sprite.popout').remove();
  $('.popout').each(function() {$(this).before($('<img src="' + wgBlankImgUrl + '" title="Click to expand table" class="sprite popout">').click(tablePopout));})
}
$(document).ready(function() { 
  tablePopoutInit();
});
mw.hook('wikipage.content').add(function () {
  tablePopoutInit();
});