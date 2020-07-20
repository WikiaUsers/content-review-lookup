//<source lang="javascript">

/***** LicenseChecker ********
 * checks whether the selected license on Special:Upload is valid
 * and provides feedback
 *
 * Maintainer: [[User:Dschwen]]
 ****/
var licenseChecker =
{
 //
 // List of invalid licenses
 //
 invalid : [ "subst:nld", 
             "subst:template 2|cc-by-nc-sa-2.0|flickrreview", 
             "subst:template 2|flickrreview|subst:nld" ],

 //
 // Translations of the warning message
 //
 i18n :
 {
  'de': 'Die ausgew&auml;hlte <b>Lizenz ist nicht akzeptabel f&uuml;r Wikimedia Commons</b>. Dein <b>Upload wird gel&ouml;scht</b> werden!',
  'en': 'The selected licensing is <b>unacceptable on Wikimedia Commons</b> and will lead to the <b>deletion</b> of your upload!',
  'hr': 'Odabrana licencija je <b>neprihvatljiva za Zajednički poslužitelj</b> i vjerojatno će biti <b>obrisana</b> nakon postavljanja!',
  'ru': 'Выбранная лицензия <b>не разрешена на Викискладе</b> и приведёт к <b>удалению</b> загруженного файла!'
},

 licensemenu : null,
 warnbanner  : null,
 message     : null,

 // Event handler for the license selector
 check : function()
 {
  with(licenseChecker) {
   if (!message) {
    if( typeof(i18n[wgUserLanguage]) == 'string' ) 
     message = i18n[wgUserLanguage];
    else {
     if (typeof (UFUI) != 'undefined' && typeof (i18n[UFUI.userLanguage]) == 'string') {
      // From UploadForm.js, wgUserLanguage with uselang-hacks removed
      message = i18n[UFUI.userLanguage];
     } else {
      message = i18n.en;
     }
    }
   }

   for( var n in invalid )
    if( licensemenu.value == invalid[n] )
    {
     warnbanner.innerHTML = message;
     return;
    }

   warnbanner.innerHTML = '';
  }
 },

 install : function()
 {
  with(licenseChecker) {
   var uploadtext  = document.getElementById('uploadtext');
   // Check for skins not providing the uploadtext ID
   if( uploadtext == null ) return;
   licensemenu = document.getElementById('wpLicense');
   // Some forms may not have a license selector (e.g. "fromwikimedia", or reupload forms)!
   if (licensemenu == null) return;

   warnbanner = document.createElement('DIV');
   warnbanner.className = 'center';
   warnbanner.style.color = 'red';
   warnbanner.style.background = '#eeeeee';

   uploadtext.appendChild( warnbanner );
   addEvent( licensemenu , 'change', check );
  } 
 }
}
addOnloadHook( licenseChecker.install );


/***** loadAutoInformationTemplate ********
 * Adds a link to subpages of current page
 *
 *  Maintainers: [[User:Yonidebest]], [[User:Dschwen]]
 *
 *  JSconfig items: bool 'loadAutoInformationTemplate'
 *                       (true=enabled (default), false=disabled)
 ****/
function loadAutoInformationTemplate()
{
 if( !JSconfig.keys['loadAutoInformationTemplate'] || // honor user configuration
   document.location.href.toString().match("&wpDestFile=")) //Don't show when reuploading
  return;
 
 uploadDescription = document.getElementById('wpUploadDescription');
 var tripleTilda = '~~' + '~';
 var doubleBracket = '{' + '{';
 if(uploadDescription != null && wgUserLanguage != 'fromflickr' && wgUserLanguage != 'fromwikimedia' 
    && uploadDescription.value == '' ) {
  switch(wgUserLanguage) {
   case "ownwork":
   case "deownwork":
   case "elownwork":
   case "esownwork": 
   case "frownwork":
   case "itownwork":
   case "mkownwork":
   case "nlownwork":
   case "noownwork":
   case "plownwork":
   case "ruownwork":
   case "svownwork":
    uploadDescription.value = doubleBracket + 'Information\n|Description=\n|Source={'+'{own}}\n|Date=\n|Author= [[User:' + wgUserName + '|' + wgUserName + ']]\n|Permission=\n|other_versions=\n}}\n';
    break;

   /* don't put fromflickr, as people should use flinfo tool */
   /* don't put fromwikimedia, as people should use commons helper tool */
   case "fromgov":
    uploadDescription.value = doubleBracket + 'Information\n|Description=\n|Source=\n|Date=\n|Author=\n|Permission=\n|other_versions=\n}}\n';
    break;
   case "icommons":
    uploadDescription.value = doubleBracket + 'Information\n|Description=\n|Source=\n|Date=\n|Author=\n|Permission=\n|other_versions=\n}} \n[[category:iCommons iHeritage]]\n [[category:South Africa]]\n';
    break;
   default:
    uploadDescription.value = doubleBracket + 'Information\n|Description=\n|Source=\n|Date=\n|Author=\n|Permission=\n|other_versions=\n}}\n';
    break;
  }

  /// The copy & paste template information at [[MediaWiki:Uploadtext]] (see source code) isn't needed
  // in case JavaScript is enabled (cause the upload form is beeing prefilled by Javscript with template
  // information. Hides in case JavaScript is enabled in the user's browser.
  // Superseeds http://commons.wikimedia.org/w/index.php?title=MediaWiki:Common.js&diff=7524161&oldid=7390279 by Arnomane
  // Fullfilling request at http://commons.wikimedia.org/wiki/MediaWiki_talk:Common.js#Upload_page [[Usuario:Kidoma|kidoma]] 08:23 26 sep 2010 (UTC)
  if (document.getElementById('Uploadtext-template-box')) document.getElementById('Uploadtext-template-box').style.display = 'none';
 }
}
JSconfig.registerKey('loadAutoInformationTemplate', true, 'Insert Information template:', 3);
addOnloadHook(loadAutoInformationTemplate);

/*
Automatically adds the {{{author}}} attribute when an image
if uploaded under a {{tl|self}} license. It will show as
''I, [[User:foo|foo]], the copy[...]''.
*/
function attributeSelf()
{
 if (!JSconfig_old.attributeSelf) return;
 var licenses = document.getElementById('wpLicense');
 if (!licenses) return;
 for (var i = 0; i < licenses.childNodes.length; i++)
 {
  var license = licenses.childNodes[i];
  if (license.nodeName.toLowerCase() == 'option') 
  {
   if (license.getAttribute('value').substr(0, 5) == 'self|' || 
       license.getAttribute('value') == 'PD-self' ||
       license.getAttribute('value') == 'GFDL-self')
   {
    license.setAttribute('value', license.getAttribute('value') + "|author=I, [[User:" + wgUserName + '|' + wgUserName + "]]");
   }
  }
 }
}
// Disabled due to grammar errors
// addOnloadHook(attributeSelf);

/* 
 * Hide on the list of allowed types in the upload form that PDFs can be uploaded. 
 * Most pdfs shouldn't have been uploaded. Written at the wiki on the best case.
 * Discourage its use by hiding that it can be uploaded.
 */
function hidePdfAllowed() {
 var t = document.getElementById("mw-upload-permitted");
 if (!t) return;
 t = t.firstChild;
 if (!t) return;
 for (t = t.firstChild; t; t = t.nextSibling) {
   if (t.nodeValue) //Is a text node
      t.nodeValue = t.nodeValue.replace(/pdf[,،、] /, "");
 }
}

addOnloadHook(hidePdfAllowed);

//</source>