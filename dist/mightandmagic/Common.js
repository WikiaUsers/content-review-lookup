/* Any JavaScript here will be loaded for all users on every page load. */

var showSpoiler = new Array();

var hasClass = (function () {
var reCache = {};
return function (element, className) {
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();

function showSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    // allows the child to be something besides a div (a table for example)
    if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('show_warning','hide_warning');

      var spoiler = Divs[i].nextSibling;
      spoiler.className = spoiler.className.replace('hide_spoiler','show_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=1';
}

function hideSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    // allows the child to be something besides a div (a table for example)
    if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');

      var spoiler = Divs[i].nextSibling;
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=0';
}

function toggleSpoilers(ev) {
  var splrType=this.childNodes[0].className.split('_')[1];
  showSpoiler[splrType] = showSpoiler[splrType]?0:1;
  if(showSpoiler[splrType])
    showSpoilers(splrType);
  else 
    hideSpoilers(splrType);
}
 
function initSpoilers() {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    if (hasClass(Divs[i], "splr")) {
      Divs[i].onclick = toggleSpoilers;
    }
  }
  
  var cookies = document.cookie.split("; ");
  for (var i=0; i < cookies.length; i++) {
    // a name/value pair (a crumb) is separated by an equal sign
    if(cookies[i].indexOf('showspoiler')!=-1) {
      var crumbs = cookies[i].split("=");
      var splrType = crumbs[0].split('_')[1]; /* cookie="showspoiler_dao=1", crumbs[0] = "showspoiler_dao", splrType="dao" */
      var splrValue = parseInt(crumbs[1]);

      showSpoiler[splrType]=splrValue;
      if(splrValue)
        showSpoilers(splrType);
      else
        hideSpoilers(splrType);
    }
  }
}

var spoilers = true;
function loadSpoilers() {
  if(spoilers) initSpoilers();
}
$(loadSpoilers);

// The following code was copied from Wikia.js to here 

function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
  // BUREAUCRATS
 
  rights["Energy X"]        = ["Bureaucrat"];

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  rights["Non-existent User"] = ["Do not remove this line"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       // remove old rights
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         // add new rights
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
};
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});