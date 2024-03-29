// FloatingTableHeader.js
// From https://archive.is/zJzTe, 
// with very slight modifications
// ported and adapted for Wikia Oasis by mfaizsyahmi
// ---
// Heavily modified by Paradox-

//---------------------------------------- Floatheader

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
    var topNavOffset = $(".fandom-sticky-header").height() || $(".global-navigation").height() || 0;
    console.log(topNavOffset)
    if (scrollTop > offset.top - topNavOffset && scrollTop + topNavOffset < offset.top + $(this).height()) {
      var originalHeader = $(".tableFloatingHeaderOriginal", this);
      
      floatingHeader.css("top", Math.min(scrollTop - offset.top + topNavOffset, $(this).height() - floatingHeader.height() - $("tr:last", this).height()) + "px").show();
      
      /* hack for cellpadding and cellspacing attributes: tr's width is increased by 2*cellspacing, and each header cell is reduced by 2*cellpadding */
      var insidetable = $(this).find($(".floatheader")).first();
      var cellspacing = +$(insidetable).attr("cellspacing") || 0;
      var cellpadding = +$(insidetable).attr("cellpadding") || 0;
      
      //--- Copy cell width & horizontal padding from original header -- only way to make the cells obey their width
      $("th", floatingHeader).each(function(i) {
        var oh = $("th", originalHeader).eq(i);
        $(this).width((Number(oh.css("width").replace("px","")) - 2*cellpadding) + "px");
        $(this).css("padding-left", oh.css("padding-left"));
        $(this).css("padding-right", oh.css("padding-right"));
      });
      
      //--- Copy width from original thead -- Add 1px to wikitables
      floatingHeader.css("width", originalHeader.width() + 2*cellspacing + +$("> table", this).hasClass("wikitable") + "px");
    }
    else {
      floatingHeader.hide();
    }
  });
}