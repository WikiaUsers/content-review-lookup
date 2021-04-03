// FloatingTableHeader.js
// From https://archive.is/zJzTe, 
// with very slight modifications
// ported and adapted for Wikia Oasis by mfaizsyahmi
// ---
// Heavily modified by Paradox-

//---------------------------------------- Floatheader
//--- non-UCP
var ucp = mw.config.get("wgVersion") != "1.19.24";

$("table.floatheader").each(function() {
  $(this).wrap("<div class=\"divTableWithFloatingHeader\" style=\"position:relative\"></div>");
  
  //--- If there is no thead, put all header rows into a thead
  //--- Code taken from jQuery tablesorter (& modified)
  //--- https://phabricator.wikimedia.org/source/mediawiki/browse/master/resources/src/jquery.tablesorter/jquery.tablesorter.js$283
  if (!$("thead", this).length) {
    var thead = $("<thead>");
    $("> tbody > tr", this).each(function() {
      if ($("> td", this).length) {
        return false;
      }
      thead.append(this);
    });
    $("> tbody", this).before(thead);
  }
  
  var originalHeader = $("thead", this);
  var clonedHeader = originalHeader.clone().hide();
  originalHeader.after(clonedHeader);
  
  originalHeader.addClass("tableFloatingHeaderOriginal");
  clonedHeader.addClass("tableFloatingHeader");
  clonedHeader.css("position", "absolute");
  clonedHeader.css("top", "0");
  clonedHeader.css("left", $(this).css("margin-left"));
  
  //--- Floating Header cell fixes
  $("th", clonedHeader).each(function() {
    //--- Remove Sort Buttons
    if ($(this).hasClass("headerSort")) {
      $(this).removeClass("headerSort").removeAttr("tabindex").removeAttr("title");
      //--- non-UCP
      if (!ucp) {
        $("span.chevron", this).parent().remove();
      }
    }
    
    //--- Remove mw-collapsible Toggle Button
    $(".mw-collapsible-toggle", this).remove();
    
    //--- Remove Transparency
    var bgcolors = $(this).css("background-color");
    if (bgcolors.charAt(3) == "a" && bgcolors != "rgba(0, 0, 0, 0)") {
      $(this).css("background-color", "rgb(" + bgcolors.match(/\d+/g).slice(0, 3).join(", ") + ")");
    }
  });
});

UpdateTableHeaders();
$(window).scroll(UpdateTableHeaders).resize(UpdateTableHeaders);

function UpdateTableHeaders() {
  $("div.divTableWithFloatingHeader").each(function() {
    var offset = $(this).offset();
    var scrollTop = $(window).scrollTop();
    var floatingHeader = $(".tableFloatingHeader", this);
    var globalNavOffset = $("#globalNavigation").height() || 0;
    if (scrollTop > offset.top - globalNavOffset && scrollTop + globalNavOffset < offset.top + $(this).height()) {
      var originalHeader = $(".tableFloatingHeaderOriginal", this);
      
      floatingHeader.css("top", Math.min(scrollTop - offset.top + globalNavOffset, $(this).height() - floatingHeader.height() - $("tr:last", this).height()) + "px").show();
      
      //--- Copy cell width & horizontal padding from original header -- only way to make the cells obey their width
      $("th", floatingHeader).each(function(i) {
        var oh = $("th", originalHeader).eq(i);
        //--- non-UCP -- Add "border-right-width" to the cell width
        $(this).width(ucp ? oh.css("width") : oh.width() + +oh.css("border-right-width").replace("px", ""));
        $(this).css("padding-left", oh.css("padding-left"));
        $(this).css("padding-right", oh.css("padding-right"));
      });
      
      //--- Copy width from original thead -- Add 1px to wikitables
      floatingHeader.css("width", originalHeader.width() + +$("> table", this).hasClass("wikitable") + "px");
    }
    else {
      floatingHeader.hide();
    }
  });
}