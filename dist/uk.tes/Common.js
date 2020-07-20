// ########################################### //
// ### Нові функції The Elder Scrolls Wiki ### //
// ### Version 1.6                         ### //
// ########################################### //
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* Автовизначення ніку користувача */
if (wgUserName !== null) $('span.insertusername').text(wgUserName);
 
/* Автооновлення (Налаштування) */
 var ajaxPages =["Спеціальна:Watchlist","Спеціальна:Contributions","Спеціальна:WikiActivity","Спеціальна:RecentChanges","Спеціальна:NewFiles", "Спеціальна:Images"];
var AjaxRCRefreshText = 'Автооновлення сторінки';
 
/* Закриття блогу для коментування */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Цей блог був неактивний протягом <expiryDays> днів. Прохання не редагувати його.",
    nonexpiryCategory: "Архівні блоги"
};

/* Знаходження файлів-дублікатів */
function findDupFiles(gf) {
   var fileDiv = $('#mw-dupfiles');
 
   if (fileDiv.length) {
      dil = new Array();
      ajaxIndicator = stylepath + '/common/progress-wheel.gif';
      output = '';
      url = '/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json';
 
      if (!($('#dupFilesProgress').length)) {
         fileDiv.prepend('<span style="float: right;" id="dupFilesProgress" title="В процессе…"><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="In progress..." /></span>');
      }
 
      if (gf) {
         url += "&gaifrom=" + gf;
      }
 
      $.getJSON( url, function (data) {
         if ( data.query ) {
            pages = data.query.pages;
 
            for (pageID in pages) {
               dils = "," + dil.join();
 
               if ( dils.indexOf("," + pages[pageID].title) == -1 
                  && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles ) {
                  output += "<h3><a href='/wiki/" + encodeURIComponent(pages[pageID].title).replace(/'/g, "%27") + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
 
                  for ( x = 0; x < pages[pageID].duplicatefiles.length; x++ ) {
                     output += "<li><a href='/wiki/File:" + encodeURIComponent(pages[pageID].duplicatefiles[x].name).replace(/'/g, "%27") + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                     dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                  }
                  output += "</ul>\n\n"
               }
            }
 
            fileDiv.append(output);
 
            if (data["query-continue"]) {
               setTimeout("findDupFiles('" + encodeURIComponent(data["query-continue"].allimages.gaifrom).replace(/'/g, "%27") + "');", 5000);
            } else {
               $('#dupFilesProgress').hide();
            }
         }
      } );
   }
}

/* Користувацькі теґи */
function isUserpage() {
    return ($.inArray(wgNamespaceNumber,[2,3,1200,500]) !== -1 || (wgCanonicalSpecialPageName && $.inArray(wgCanonicalSpecialPageName,['Contributions','Following']) != -1));
}
 
function getUserByPage() {
    if($.inArray(wgNamespaceNumber,[2,1200,500]) != -1) {
        return /:(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Contributions') {
        return /\/(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Following') {
        return wgUserName;
    }
}

/* Неактивні користувачі */
InactiveUsers = { 
    months: 1,
    text: 'За межами Нірну' 
};