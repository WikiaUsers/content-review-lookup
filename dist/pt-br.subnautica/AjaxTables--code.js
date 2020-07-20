// This is archival, will more than likely get in-lined in Common.js
// See MediaWiki:AjaxTables for AjaxTables extension details 

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

//FIXME: this is absurdly expensive atm for all the pages not used on

function wwAjaxTables() {
  var wwtimer;
  var wwplaying;

  // patching in changes to table sorting and alt rows
  function ajaxTableInit() {
    var ts = window.ts = window.ts || {};
    ts.ahClass = new RegExp('class="ajaxHide"', "gim");
    ts.crlf = new RegExp("\r\n", "g")
    ts.image_path = '';
    ts.image_none = '';

    ts.makeSortable = function (table) {
      var firstRow;
      if ($(table).find("tr").length > 0) {
        firstRow = ($(table).find("th").length > 0) ?
        $(table).find("tr:has(th)").eq(0) : $(table).find("tr").eq(0);
      }
      if (!firstRow) return;
      var ts = window.ts;
      firstRow.children(":not('.unsortable')")
      .append('&nbsp;&nbsp;<a href="javascript:;" class="sortheader" onclick="ts_resortTable(this); return false;">' +
        '<span class="sortarrow"><img src="' + ts.image_path + ts.image_none + '" alt="&darr;"/></span></a>');
    }
  }

  // attempts to 'late bind' all the mw, wikia, and ww infrastructure would have had at page load time
  function getTableData(tablePage, tableNum) {
    $("body").bind("ajaxSend", function () { $(this).css("cursor", "wait"); })
    .bind("ajaxComplete", function () { $(this).css("cursor", "auto"); });
    $.get('http://' + location.hostname + '/' + tablePage + '?action=render', function (data) {
      if (data) {
        var ts = window.ts;
        data = data.replace(ts.crlf, "").replace(ts.ahClass, 'class="ajaxHide-active"').replace('class="darktable"', "");
        $("#ajaxTable" + tableNum).find("td").eq(0).html(data);
        $("#ajaxTable" + tableNum).find("td").eq(0).find("table.sortable").each(function (i) {
          ts.makeSortable($(this));
        });
        $("#stl" + tableNum).html('[<a href="/' + tablePage + '?action=edit">edit</a>]&nbsp;[<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">hide</a>]');
        ttMouseOver(0);
      }
    });
  }

  function hideTable(tableNum) {
    $("#ajaxTable" + tableNum).find("tr").eq(1).hide();
    $("#htl" + tableNum).click(function () {
      showTable(tableNum);
    });
    $("#htl" + tableNum).text("show");
  }

  function showTable(tableNum) {
    $("#ajaxTable" + tableNum).find("tr").eq(1).show();
    $("#htl" + tableNum).click(function () {
      hideTable(tableNum);
    });
    $("#htl" + tableNum).text("hide");
  }

  function loadTableData(tableNum) {
    thisTable = document.getElementById("ajaxTable" + tableNum);
    loadPage = thisTable.className.substring(thisTable.className.indexOf("targetPage-") + 11);
    getTableData(loadPage, tableNum);
  }

  function addAjaxDisplayLink() {
    $("#WikiaArticle table.ajax").each(function (i) {
      $(this).attr("id", "ajaxTable" + i);
      $(this).find("td").eq(1).parent().hide();
      $(this).find("td").eq(0).parent().show();
      if (this.getElementsByTagName("th").length > 0) this.getElementsByTagName("th")[0].innerHTML = '<span style="float:right;" id="stl' + i + '"></span>' + this.getElementsByTagName("th")[0].innerHTML;
      if ($(this).find("td").eq(0).hasClass("showLinkHere")) {
        $(this).find("td").eq(0).html($(this).find("td").eq(0).html().replace("[link]", '<a href="javascript:;" onClick="window.ts.loadTableData(' + i + ')">').replace("[/link]", "</a>"));
      } else {
        $("#stl" + i).html('[<a href="javascript:;" onClick="window.ts.loadTableData(' + i + ')">show data</a>]');
      }
    });
  }

  ajaxTableInit();
  window.ts.loadTableData = loadTableData;
  addAjaxDisplayLink();
}

// needs to represent the 'bare minimum' needed to evaluate if needs to load
function wwAjaxTablesInit() {
  var ajaxes = $("table.ajax");
  if (ajaxes.length == 0) return;
  wwAjaxTables();
}

$(function () {
  wwAjaxTablesInit();
});

// below needed only when need to load modules through loader, end-to-end is more expensive for client
//(function (mw, $, window) {
//  $(function () {
//    if ($("table.ajax").length > 0) {
//      //mw.loader.using(['jquery.ui.core'], function () {  // loading effects separately, not rely on ui-core
//      //mw.loader.using(['jquery.ui.core','jquery.effects.core','jquery.effects.slide'], function () {
//        wwAjaxTables($(".ww-sshow"));
//      //});
//    }
//  });
//}(mediaWiki, jQuery, window));