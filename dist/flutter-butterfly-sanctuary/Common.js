importArticles({type: 'script',articles: ['w:dev:DisplayClock/code.js',]}); 
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('ExternalImageLoader/code.js', 'dev');
importScriptPage('User:Grunny/bdel.js', 'firefly');
importScriptPage('FastDelete/code.js', 'dev');

/* 
* Ajax Batch Delete V2
* @description Delete listed multiple pages 
* Based on and faster than the original
* http://dev.wikia.com/wiki/AjaxBatchDelete
* Does not need to go to Special:BlankPage to use
* Includes the option to protect after deleting
* Includes the option to grab a whole category's contents
* @author Ozuzanna
*/
 
;(function($, mw) {
 
if ($('#t-bd').length)
  return;
 
var ug = mw.config.get("wgUserGroups").join(' ');
if (ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -4) {
 
  var FormHTML = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
      <p>Reason for deleting: \
        <input type="text" id="delete-reason" value="" /> \
        <br/> \
        <label for="protect-check">Protect for admin only? <input type="checkbox" id="protect-check" /></label> \
      </p> \
      <p>Put the name of each page you want to delete on a <b>separate line</b>.</p> \
        <textarea style="resize: none; height: 20em; width: 100%;" id="text-mass-delete"/> \
      <p>Any errors encountered will appear below:</p>\
	<table id="text-error-output" style="resize: none; height:10em; width: 100%; color:black; background-color: #ffbfbf; height: 150px; font-weight: bold"></table> \
    </fieldset> \
  </form>',
  token = mw.user.tokens.get('editToken'),
  delay = window.batchDeleteDelay || 1000;
 
  //Support for Monobook
  if (mw.config.get('skin') === 'monobook') {
    mw.util.addPortletLink('p-tb', '#', 'Batch Delete', 't-bd');
  } 
  else {
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-bd">Batch Delete</a></li>');
  }
 
  $('#t-bd').click(function () {
    $.showCustomModal('Ajax Batch Delete', FormHTML, {
      id: 'form-mass-delete',
      width: 500,
      buttons: [{  
          message: 'Cancel',
          handler: function() {
            $('#form-mass-delete').closeModal();
          }
      }, {
          message: 'Add category contents',
          defaultButton: true,
          handler: function() {
            addCategoryContents();
          }
      }, {
          id: 'startButton',
          message: 'Initiate',
          defaultButton: true,
          handler: function () {
            init(); 
          }
      }]
    });
  });
 
    function init() {
      var txt = document.getElementById('text-mass-delete'),
      deleteReason = document.getElementById('delete-reason').value,
      pages = txt.value.split('\n'),	
      currentPage = pages[0];
 
      if (!deleteReason) {
        alert('Please state a reason!');
        return;
      }
 
      document.getElementById('startButton').setAttribute('disabled','disabled');
 
      if (!currentPage) {
        document.getElementById('startButton').removeAttribute("disabled");
        $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
           id: 'mass-delete-complete',
           width: 200,
           buttons: [{
              message: 'Close',
              defaultButton: true,
              handler: function() {
                 $('#mass-delete-complete').closeModal();
              }
           }]
        });
      } 
      else {
              process(currentPage,deleteReason);  
      }
      pages = pages.slice(1,pages.length);
      txt.value = pages.join('\n');
   }
 
    function addCategoryContents() {
      var category = prompt('Please enter the category name (no category prefix):');
      new mw.Api().get({
      action: 'query',
      list: 'categorymembers',
      cmtitle: "Category:"+category,
      cmlimit: 5000
      })
      .done(function(d) {
        if (!d.error) {
          var data = d.query;
 
	  for (var i in data.categorymembers) {
            $('#text-mass-delete').append(data.categorymembers[i].title+'\n');
          }
        }
        else {
          $('#text-error-output').append('<tr><td>Failed to get contents of '+ category +' : '+ d.error.code +'</tr></td>');
        }
      })
      .fail(function() {
        $('#text-error-output').append('<tr><td>Failed to get contents of '+ category +'</tr></td>');
      });
    } 
 
    function process(page,reason) {
      new mw.Api().post({
      format: 'json',
      action: 'delete',
      watchlist: 'nochange',
      title: page,
      reason: reason,
      token: token
      })
      .done(function(d) { 
        if (!d.error) {
          console.log('Deletion of '+page+' successful!');
          if (document.getElementById('protect-check').checked) {
            new mw.Api().post({
            format: 'json',
            action: 'protect',
            expiry: 'infinite',
            protections: 'create=sysop',
            watchlist: 'nochange',
            title: page,
            reason: reason,
            token: token
            })
            .done(function(d) { 
              if (!d.error) {
                console.log('Protection of '+page+' successful!');
              } 
              else {
                console.log('Failed to protect '+page+': '+ d.error.code);
	        $('#text-error-output').append('Failed to protect '+page+': '+d.error.code+'<br/>');
              }
            })
            .fail(function() {
              console.log('Failed to protect '+page+': unknownerror');
	      $('#text-error-output').append('Failed to protect '+page+': unknownerror<br/>');
            });
          }
        } 
	else {
          console.log('Failed to delete '+page+': '+ d.error.code);
          $('#text-error-output').append('Failed to delete '+page+': '+d.error.code+'<br/>');
        }
      })
      .fail(function() {
        console.log('Failed to delete '+page+': unknownerror');
        $('#text-error-output').append('Failed to delete '+page+': unknownerror<br/>');
      });
      setTimeout(init,delay);
    }
  }
}) (this.jQuery, this.mediaWiki);
//

// ==================================================
//            Toggle
// ==================================================
/* Any JavaScript here will be loaded for all users on every page load. */
 
// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = (elem.className + '').split(' ');  // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>