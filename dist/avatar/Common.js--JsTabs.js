/* Any JavaScript here will be loaded for all users on every page load. */

/* Primary script function is to display the UI of [[Template:JsTabs]]
 * Also contains crucial elements for tabbing function of the aforementioned template
 * By: [[User:KettleMeetPot]]
 */

$(document).ready(function JsTabs() {
  if ( $('#JsTabsContainer').length > 0 ) {
    var Sid = $('.JsTab.selected').html();
    if ( Sid.length < 1 ) {
      Sid = $('.JsTab.selected').prop("id");
    }
    $('#JsTabsContainer').wrapInner('<ul class="Kcontainer tabs"></ul>');
    $('.Kcontainer').unwrap();
    $('.JsTab#' + Sid).replaceWith('<li id="' + Sid + '-JsTab" class="Ktab selected"><a href="javascript:void(0)">' + Sid + '</a></li>');
    $('.JsTab').each(function () {
      var id = $(this).prop("id");
      if ( id ) {
        $(this).replaceWith('<li id="' + id + '-JsTab" class="Ktab"><a href="javascript:void(0)">' + id + '</a></li>');
      }
    });
    $('.JsTab').remove();
    $('.Ktab').click(function() {
      if ( $(this).prop("class") != "Ktab selected" ) {
        var Sid = $('.Ktab.selected').prop("id").slice(0,-6);
        var id = $(this).prop("id").slice(0,-6);
        $('.Ktab.selected').attr("class","Ktab");
        $(this).attr("class","Ktab selected");
        $("#" + id).attr("style","");
        $("#" + Sid).attr("style","display:none");
      }
    });
  }
});