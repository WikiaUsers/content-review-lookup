// Script made by @magiczocker01 2021-11-27

$( document ).ready( function( $ ) {
	'use strict';

	var $link = $('<li>').append(
        $('<a>').attr({
            href: mw.util.getUrl('Special:BlankPage/Outdated Pages')
        }).text("Outdated Pages")
    );

    $('#my-tools-menu, #p-tb ul').prepend($link);
  //$('#WikiaBar .toolbar .tools > :first-child').after(
  //    $('<li>', {
  //        append: $('<a>', {
  //            text: 'Outdated Pages',
  //            href: mw.util.getUrl('Special:BlankPage/Outdated Pages')
  //        })
  //    })
  //);
  if (mw.config.get('wgCanonicalSpecialPageName') !== 'Blankpage' || !mw.config.get('wgTitle').endsWith('/Outdated Pages')) {
    return;
  }
  var d = document.getElementsByClassName("page-header__title")[0].innerText;
  document.getElementsByClassName("page-header__title")[0].innerText = "Outdated pages";
  document.title = document.title.replace(d, 'Outdated pages');

  var parentWikiURL = "https://undermine.fandom.com";
  var parentWikiApiURL = "https://undermine.fandom.com/api.php";

  var contentElement = document.getElementById("mw-content-text").lastChild;

  var dataForRevisionsTable = {
  	action: "cargoquery",
  	format: "json",
  	limit: "max",
  	tables: "Interwikis, Revisionen",
  	fields: "Interwikis._pageName=SeiteI, Interwikis.en, Revisionen._pageName=SeiteR, Revisionen.revision",
  	join_on: "Interwikis._pageName=Revisionen._pageName",
  	formatversion: 2
  };
  var dataForAllENPages = {
  	action: "query",
  	format: "json",
  	prop: "revisions",
  	generator: "allpages",
  	rvprop: "ids",
    gaplimit: "max",
  	gapnamespace: 0
  };

  var pages = {};
  var cargoData;
  var getDataRunning = 0;

  function newHeaderEntry(name) {
  	var a = document.createElement("th");
  	a.appendChild(document.createTextNode(name));
  	return a;
  }
  // Create table
  var t = document.createElement("table");
  t.className="wikitable";
  contentElement.replaceWith(t);
  var tb = t.createTBody();
  var tHeaderRow = tb.insertRow(0);
  tHeaderRow.appendChild(newHeaderEntry("Page (Local)"));
  tHeaderRow.appendChild(newHeaderEntry("Rev.-ID"));
  tHeaderRow.appendChild(newHeaderEntry("Page (EN)"));
  tHeaderRow.appendChild(newHeaderEntry("Rev.-ID"));

  function addEntry_(row, name, url) {
    var a = document.createElement("a");
    a.href = url;
    a.innerText = name;
    row.insertCell().appendChild(a);
  }
  function addEntry(data) { // Add entry to table
    var row = tb.insertRow();
    // Local URL
    addEntry_(row, data.title.SeiteI, mw.config.get("wgArticlePath").replace("$1", data.title.SeiteI));
    // Original Source + Diff to latest Revision
    addEntry_(row, data.title.revision || '', parentWikiURL + "/?type=revision&oldid=" + (data.title.revision || '') + "&diff=" + (pages[data.title.en] || ''));
    // Parent Wiki URL
    addEntry_(row, data.title.en, parentWikiURL + "/" + data.title.en);
    // Latest Revision
    addEntry_(row, pages[data.title.en] || '', parentWikiURL + "/?oldid=" + (pages[data.title.en] || ''));
  }

  function processPages() { // Process data
    for (var a=0; a<cargoData.length; a++) {
      if (cargoData[a].title.revision === 0 || Number(cargoData[a].title.revision) !== Number(pages[cargoData[a].title.en] || 0)) { // If the revision is empty, isn't the latest or page not existing on parent-wiki.
        addEntry(cargoData[a]);
      }
    }
  }
  function start() {
    if (getDataRunning === 0) {
      console.log("Pages:");
      console.log(pages);
      processPages();
    } else {
      window.setTimeout(start, 500);
    }
  }
  function getParentPages(cont) {
    getDataRunning++;
    dataForAllENPages.gapcontinue = cont || '';
    $.getJSON( parentWikiApiURL, dataForAllENPages ).done(
      function( data ) {
        var allPages = data.query.pages;
        console.log(allPages);
        for (var a in allPages) {
          pages[allPages[a].title] = allPages[a].revisions[0].revid;
        }
        if (data.continue && data.continue.gapcontinue) { // Continue, if there is more data available.
          console.log("Continue:" + data.continue.gapcontinue);
          getParentPages(data.continue.gapcontinue);
        }
        getDataRunning--;
      }
    );
  }
  new mw.Api().get(dataForRevisionsTable).done(function (d) {
    cargoData = d.cargoquery;
    console.log("Cargo-Data:");
    console.log(cargoData);
    getParentPages();
    start();
  });
});