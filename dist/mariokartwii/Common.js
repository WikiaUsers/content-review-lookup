/* Any JavaScript here will be loaded for all users on every page load. */

/* add menu for selecting subsets of secial characters */
/***** must match MediaWiki:Edittools *****/
function addCharSubsetMenu() {
  var edittools = document.getElementById('editpage-specialchars');
 
  if(! edittools)
    return;
 
  var menu = "<select id='charSubsetControl' style='display:inline' onChange='chooseCharSubset(selectedIndex)'>";
 
  var pp = edittools.getElementsByTagName('p');
  if(!pp)
    return;
  for(var i = 0; i < pp.length; ++i)
    menu +=
      '<option>' +
      decodeURIComponent
      (
        (''+pp[i].id).replace(/^edittools-/, '')
                     .replace(/\.([0-9A-F][0-9A-F])/g, '%$1')
                     .replace(/_/g, '%20')
      ) +
      '</option>';
 
  menu += "</select>";
  edittools.innerHTML = menu + edittools.innerHTML;
 
  /* default subset from cookie */
  var s = parseInt( getCookie('edittoolscharsubset') );
  if ( isNaN(s) ) s = 0;
 
  /* update dropdown control to value of cookie */
  document.getElementById('charSubsetControl').selectedIndex = s; 
 
  /* display the subset indicated by the cookie */
  chooseCharSubset( s );
}

/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolscharsubset', s);
}

importArticles({
    type: 'script',
    articles: [
'u:dev:WallGreetingButton/code.js',  
'u:dev:AjaxRC/code.js',                    
'u:dev:MediaWiki:AjaxUndo/code.js',         
'u:dev:CategoryRenameAuto-update/code.js',
'u:dev:NullEditButton/code.js',             
'u:dev:Standard_Edit_Summary/code.js',
'u:dev:UserTags/code.js',       
    ]
});

$(function () {
    $('.audio').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:DisableBotMessageWalls/code.js'
    ]
});
massCategorizationDelay = 100; importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');