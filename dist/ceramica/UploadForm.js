// <source lang="javascript">

/*
  Upload form rewrite

  Author: [[User:Lupo]], March 2008
  License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0)
  
  Choose whichever license of these you like best :-)
*/

importScript( 'MediaWiki:Gadget-HotCat.js' );
importScript( 'MediaWiki:TextCleaner.js' );
importScript( 'MediaWiki:LanguageHandler.js' );
importScript( 'MediaWiki:FormRestorer.js' );
importScript( 'MediaWiki:UIElements.js' );
importScript( 'MediaWiki:Tooltips.js' );

// Guard against multiple inclusions!
if (typeof (UploadForm) == 'undefined') {

// Configuration. These can be set by a user in their monobook.js/modern.js. The typeof checks
// are not really needed when this script is globally enabled, but until then, we have to be
// careful not to overwrite a user's settings if he defines these first and then includes this
// script in his monobook.js.
if (typeof (UploadForm_forcebasic) == 'undefined')
  // If non-null, use the basic form
  var UploadForm_forcebasic     =
    (typeof (JSconfig) == 'undefined' || JSconfig.keys['UploadForm_newlayout']) ? null : true;
if (typeof (UploadForm_ownwork_author) == 'undefined')
  var UploadForm_ownwork_author = "\[\[User:" + wgUserName + "|" + wgUserName + "\]\]";
  // Change to use something else
if (typeof (UploadForm_ownwork_date) == 'undefined')
  var UploadForm_ownwork_date   = null;
  // Set to define a pre-fill value for the date field
if (typeof (UploadForm_own_language_first) == 'undefined')
  var UploadForm_own_language_first = false;
  // Set to true to have own language description on top
if (typeof (UploadForm_additional_info_height) == 'undefined')
  var UploadForm_additional_info_height = 2;
if (typeof (UploadForm_description_height) == 'undefined')
  var UploadForm_description_height = 2;
if (typeof (UploadForm_source_field_size) == 'undefined')
  var UploadForm_source_field_size = 1;
if (typeof (UploadForm_author_field_size) == 'undefined')
  var UploadForm_author_field_size = 1;
if (typeof (UploadForm_page_preview_in_tooltip) == 'undefined')
  var UploadForm_page_preview_in_tooltip = false;
if (typeof (UploadForm_description_languages) == 'undefined')
  var UploadForm_description_languages = null;
if (typeof (UploadForm_autofill) == 'undefined')
  var UploadForm_autofill = true;
  // If false, don't pre-fill description field in basic mode. May be useful
  // for people who have their own scripts pre-filling this field.

// Don't set the focus initially, it makes the page scroll, and people won't see the
// introductory texts
var EditTools_set_focus_initially = false;

var UFUtils =
{
  makeLink : function (name, url)
  {
    var link = document.createElement ('a');
    link.setAttribute ('href', url);
    link.appendChild (document.createTextNode (name));
    return link;    
  },
  
  convert_td_div : function (td)
  {
    // Replace the contents with a div, fixate the width, and give the div the id of the td
    var div = document.createElement ('div');
    var w = UFUtils.getWidth (td);
    if (w) {
      td.setAttribute ('width', "" + w);
      td.style.maxWidth = "" + w + 'px';
    }
    div.setAttribute ('width', (w ? "" + w : '100%'));
    if (w) div.style.maxWidth = "" + w + 'px';
    // Clear the warning_cell and add the div instead
    while (td.firstChild) td.removeChild (td.firstChild);
    td.appendChild (div);
    var id = td.id;
    td.id = "";
    div.id = id;
    return div;
  },
  
  getHeight : function (rows, minimum, maximum)
  {
    if (rows == null) return minimum;
    try {
      var x = rows / 2;
    } catch (ex) {
      // It's not a number
      return minimum;
    }
    if      (rows < minimum) return minimum;
    else if (rows > maximum) return maximum;
    return rows;
  },

  getWidth : function (element)
  {
    try {
      if (element.clientWidth)          // From IE, but Gecko has this, too.
        return element.clientWidth;
      else if (window.getComputedStyle) // Gecko, Opera
        return document.defaultView
                       .getComputedStyle (element, null)
                       .getPropertyValue ('width');
    } catch (ex) {
    }
    return null;
  },

  isChildOf : function (child, ancestor)
  {
    if (!ancestor) return false;
    while (child && child != ancestor) child = child.parentNode;
    return (child == ancestor);
  }

}; // end UFUtils

var UFUI =
{
  // Encapsulate all UI stuff, with checks such that it works in degraded mode
  // (built-in defaults only) if UIElements doesn't exist.

  defaultLanguage  : 'en',     // Default.
  userLanguage     : 'en',     // Sanitized wgUserLanguage.
  internalLanguage : 'en',     // Same, but with dashes replaced by underscores.
  isOwnWork        : false,    // True if uselang="*ownwork"
  isFromFlickr     : false,    // True if uselang="*fromflickr"
  isExperienced    : false,    // True if uselang="experienced"

  sanitizeUserLanguage : function ()
  {
    // Try to make sense of wgUserLanguage even if it has been hacked to have special
    // pages for particular upload sources. Also sets isOwnWork and isFromFlickr.
    if (wgUserLanguage == null || wgUserLanguage.length == 0) return;    
    UFUI.userLanguage = wgUserLanguage;
    if (wgUserLanguage.length > 3) {
      // Special "hacked" uselang parameters...
      var hacks = ['ownwork', 'fromflickr', 'experienced', 'fromwikimedia', 'fromgov'];
      var found = false;
      for (var i = 0; i < hacks.length; i++) {
        var idx = wgUserLanguage.indexOf (hacks[i]);
        if (idx >= 0) {
          found = true;
          if (idx > 0)
            UFUI.userLanguage = wgUserLanguage.substring (0, idx);
          else
            UFUI.userLanguage = UFUI.defaultLanguage;
          if (i == 0)
            UFUI.isOwnWork = true;
          else if (i == 1)
            UFUI.isFromFlickr = true;
          else if (i == 2)
            UFUI.isExperienced = true;
          break;
        }
      }
      if (!found
          && typeof (LanguageHandler) != 'undefined'
          && typeof (LanguageHandler.getPrefix) == 'function')
      {
        // None of the "standard" hacks. Try an alternate approach.
        var lang_code_length = LanguageHandler.getPrefix (wgUserLanguage);
        if (lang_code_length > 0 && lang_code_length < wgUserLanguage.length) {
          UFUI.userLanguage = wgUserLanguage.substr (0, lang_code_length);
        }
      } 
    } // end if
    if (UFUI.userLanguage == 'en-gb') UFUI.userLanguage = 'en';
    UFUI.internalLanguage = UFUI.userLanguage.replace (/-/g, '_');
  },

  defaultLabels : {
    wpSourceUploadLbl:         'Original source:',
    wpAuthorUploadLbl:         'Author:',
    wpDateUploadLbl:           'Date:',
    wpDescUploadLbl:           'Description:',
    wpPermissionUploadLbl:     'Permission:',
    wpCategoriesUploadLbl:     'Categories:',
    wpOtherVersionsUploadLbl:  'Other versions:',
    wpAdditionalInfoUploadLbl: 'Additional information:',
    wpPreviewLicenseUploadLbl: 'Preview the chosen license',
    wpOwnWorkUploadLbl:        'Own work',
    wpUnknownLanguageUploadLbl:'Unknown language',
    wpPreviewUploadLbl:        'Preview',
    wpOkUploadLbl:             'OK',
    wpCancelUploadLbl:         'Cancel'
  },
  
  defaultErrorMsgs : {
    wpUploadWarningError: 
      'You must provide the original source of the image, the author of the work, and a license.',
    wpNoFilenameError:
      'The target filename must not be empty.',
    wpHttpFilenameError: 
      'The target file name appears to be a URL.',
    wpNoSlashError:
      'The target file name must not contain "/".',
    wpNondescriptFilenameError:
      'Please use a more descriptive target file name.',
    wpNoExtensionError:
      'The target file name must have a file type extension (like for example ".jpg").',
    wpIllegalExtensionError:
      'Files of this type cannot be uploaded.',
    wpDoubleExtensionError:
      'Please correct the double file type in the target file name.',
    wpFlickrURLError:
      'The source must be a URL pointing to the image at Flickr.',
    wpNoDescriptionError:
      'Please give a description of the contents of the file you want to upload.',
    wpNoHelpTextError:
      'Help text not found.',
    wpPreviewOverwriteError:
      'You will upload over an already existing file. Please choose a different filename,'
     +'unless you are uploading a technically improved version of the same file.'
     +'Don\'t overwrite a file with a different image of the same topic.'
     +'If you overwrite, the information in this form will not appear on the description page.',

    wpReuploadNoSummaryError:
      'Please describe the file changes in the text box.'
  },
  
  defaultHints: {
    wpUploadFormDestFileHint:
      'Name of the file at Commons after the upload.',
    wpUploadFormSourceHint:
      'Where does this file come from?',
    wpUploadFormAuthorHint:
      'Who created this file? If it shows some artwork, who created that?',
    wpUploadFormDateHint:
      'Date of creation and/or first publication of the work.',
    wpUploadFormPermissionHint:
      'Not your own file? Or already published elsewhere? Use \{\{OTRS pending\}\} and send permission by e-mail. '
     +'Also for specialized license tags.',
    wpUploadFormAdditionalInfoHint:
      'Use for geolocation tags and other specialized information.',
    wpUploadFormCategoryHint:
      'Click (+) to add categories.'
  },

  // Do *not* use "-" here (as in "be-tarask")!! Use "_" instead: "be_tarask".
  translate: {
    en: 'translate',
    af: 'vertaal',
    ar: 'ترجم',
    be: 'перакласці',
    be_tarask: 'перакласьці',
    br: 'treiñ',
    bg: 'превеждам',
    ca: 'traduïu',
    cs: 'přeložit',
    cy: 'cyfieithu',
    da: 'oversæt',
    de: 'übersetzen',
    el: 'μεταφράστε',
    eo: 'traduki',
    es: 'traducir',
    et: 'tõlkima',
    fa: 'ترجمه کردن',
    fi: 'suomenna',
    fo: 'umseta',
    fr: 'traduire',
    gl: 'traducir',
    he: 'לתרגם',
    hr: 'prevesti',
    hu: 'fordítás',
    hy: 'թարգմանել',
    id: 'terjemah',
    io: 'tradukar',
    is: 'þýða',
    it: 'tradurre',
    ja: '訳す',
    ko: '번역하기',
    la: 'traducere',
    mk: 'преведи',
    ml: 'തര്‍ജ്ജമ',
    mn: 'орчуулах',
    mt: 'traduci',
    nn: 'oversett',
    no: 'oversett',
    nl: 'vertalen',
    pap: 'tradusí',
    pl: 'przetłumacz',
    pt: 'traduzir',
    ro: 'a traduce',
    ru: 'перевести',
    sk: 'preložit',
    sl: 'perovodit',
    sq: 'përkthej',
    ss: 'kuhúmusha',
    sv: 'översätt',
    ta: 'மொழிபெயர்',
    tr: 'tercüme',
    ty: 'ʻauvaha',
    uk: 'перекласти',
    vi: 'dịch',
    zh: '翻譯',
    zh_min_nan: 'hoan-e̍k',
    nan: 'hoan-e̍k',
    minnan: 'hoan-e̍k'
  },

  labels     : null,  // Repository for form labels
  help       : null,  // Repository for help texts (and the help button)
  error_msgs : null,  // Repository for error messages
  uiElements : null,  // Repository for graphical UI elements
  hints      : null,  // Repository for brief hints

  setupRepositories : function ()
  {
    if (!UFUI.labels) {
      if (typeof (UIElements) != 'undefined') {
        UFUI.labels     = UIElements.emptyRepository ();
        UFUI.help       = UIElements.emptyRepository ();
        UFUI.error_msgs = UIElements.emptyRepository ();
        UFUI.uiElements = UIElements.emptyRepository ();
        UFUI.hints      = UIElements.emptyRepository ();

        for (var id in UFUI.defaultLabels) {
          if (id == 'wpDescUploadLbl') {
            UIElements.setEntry
              (  id
               , UFUI.labels
               , UFUtils.makeLink (  UFUI.defaultLabels[id]
                                   , '/wiki/Commons:First_steps/Quality_and_description')
              );
          } else {
            UIElements.setEntry
              (id, UFUI.labels, document.createTextNode (UFUI.defaultLabels[id]));
          }
        }
        for (var id in UFUI.defaultErrorMsgs) {
          UIElements.setEntry (id, UFUI.error_msgs,
                               document.createTextNode (UFUI.defaultErrorMsgs[id]));
        }
        for (var id in UFUI.defaultHints) {
          UIElements.setEntry (id, UFUI.hints,
                               document.createTextNode (UFUI.defaultHints[id]));
        }
          
        // Now try to read the localized stuff from the uploadfooter.
        UIElements.load ('wpUploadFormLabels', null, 'span', UFUI.labels);
        UIElements.load ('wpUploadFormErrorMessages', null, 'span', UFUI.error_msgs);
        UIElements.load ('wpUploadFormHints', null, 'span', UFUI.hints);
        UIElements.load ('wpUploadFormUIElements', null, 'div', UFUI.uiElements);
        UIElements.load ('wpUploadFormHelp', null, 'div', UFUI.help);
        UFUI.basic = false;
      } else {
        UFUI.labels     = UFUI.defaultLabels;
        UFUI.error_msgs = UFUI.defaultErrorMsgs;
        UFUI.hints      = UFUI.defaultHints;
        UFUI.basic      = true;
      }
    }  
  },

  getUI : function (id, repository, basic)
  {
    if (!UFUI.labels) {
      UFUI.sanitizeUserLanguage ();
      UFUI.setupRepositories ();
    }
    if (!UFUI[repository]) return null;
    var result   = null;
    var add_plea = false;
    if (UFUI.basic) {
      result = document.createTextNode (UFUI[repository][id]);
      add_plea = (UFUI.internalLanguage != UFUI.defaultLanguage);
    } else {
      result = UIElements.getEntry (id, UFUI[repository], UFUI.internalLanguage, null);
      add_plea = !result;
      if (!result) result = UIElements.getEntry (id, UFUI[repository]);
      if (!result) return null; // Hmmm... what happened here? We normally have defaults...
      result = result.cloneNode (true);
    }
    if (add_plea && !basic) {
      // Wrap it all into a span -- we can return only one element
      var span = document.createElement ('span');
      span.appendChild (result);
      span.appendChild (UFUI.plea (repository, id));
      result = span;
    }
    return result;
  },

  plea : function (what, msg_id)
  {
    var span = document.createElement ('sub');
    span.appendChild (document.createTextNode (' ('));
    span.appendChild (
      UFUtils.makeLink (
         UFUI.translate[UFUI.internalLanguage] || UFUI.translate.en
       , 'http://commons.wikimedia.org/wiki/MediaWiki_talk:UploadFormLabels/UploadFormTranslations?action=edit'
         +'&section=new' 
         +'&withJS=MediaWiki:UploadFormTranslator.js&language='
         +encodeURIComponent (UFUI.userLanguage)
         +'&uploadformurl=' + encodeURIComponent (document.URL)
         +(what ? '&uploadformitems=' + encodeURIComponent (what) : "")
         +(msg_id ? '&uploadformmsg=' + encodeURIComponent (msg_id) : "")));
    span.appendChild (document.createTextNode (')'));
    return span;
  },

  getLabel : function (id, basic)
  {
    return UFUI.getUI (id, 'labels', basic);
  },
  
  getErrorMsg : function (id, basic)
  {
    return UFUI.getUI (id, 'error_msgs', basic);
  },
  
  getHint : function (id, basic)
  {
    return UFUI.getUI (id, 'hints', basic);
  },

  getEntry : function (id, repository, lang, sel)
  {
    if (!UFUI.labels) {
      UFUI.sanitizeUserLanguage ();
      UFUI.setupRepositories ();
    }
    if (!UFUI.basic)
      return UIElements.getEntry (id, UFUI[repository], lang, sel);
    if (!UFUI[repository] || lang != UFUI.defaultLanguage || !!sel && sel != 'default')
      return null;
    return UFUI[repository][id];
  }
  
}; // end UFUI

var UFHelp =  // Collects all help-related stuff
{
  help_close_imgs : null,
  
  precreate_tooltip_closer : function ()
  {
    if (typeof (Tooltip) != 'undefined' && typeof (Buttons) != 'undefined') {
      var close_imgs =
        UFUI.getEntry ('wpUploadFormHelpCloseButton', 'uiElements', UFUI.internalLanguage);
      if (!close_imgs)
        close_imgs = UFUI.getEntry ('wpUploadFormHelpCloseButton', 'uiElements');
      if (close_imgs) close_imgs = close_imgs.getElementsByTagName ('img');
      if (!close_imgs || close_imgs.length == 0)
        close_imgs = null;
      else
        close_imgs =  Buttons.createClass (close_imgs, 'wpUploadFormHelpCloseClass');
      UFHelp.help_close_imgs = close_imgs;
    }
  },
  
  tooltip_styles : // The style for all our tooltips
   {  border          : '1px solid #8888aa'
    , backgroundColor : '#f7f8ff'
    , padding         : '0.3em'
    , fontSize        : ((skin && (skin == 'monobook' || skin == 'modern')) ? '127%' : '100%')
      // Scale up to default text size
   },

  getHelp : function (help_id, with_ext) 
  {
    // This is a Tooltip callback! Sets the help texts dynamically, depending of the file
    // type the user has chosen in wpDestFile.
    var fn = null;
    if (with_ext) {
      fn = document.getElementById ('wpDestFile');
      if (fn != null) fn = fn.value;
      if (fn != null) {
        fn = fn.split ('.');
        if (fn.length >= 2) fn = fn[fn.length-1]; else fn = null;
      }
    }
    
    var add_plea   = false;
    var extensions = [fn, 'default'];
    var help_main  = null;
    for (var i = 0; i < extensions.length && !help_main; i++) {
      if (extensions[i] && extensions[i].length > 0) {
        help_main = UFUI.getEntry (help_id, 'help', UFUI.internalLanguage, extensions[i]);
        if (!help_main) {
          help_main = UFUI.getEntry (help_id, 'help', null, extensions[i]);
          add_plea  = (help_main != null);
        }
      }
    }
    var help_base = UFUI.getEntry (help_id, 'help', UFUI.internalLanguage);
    if (!help_base) {
      help_base = UFUI.getEntry (help_id, 'help');
      add_plea  = add_plea || (help_base != null);
    }
    var help = document.createElement ('div');
    if (help_base) help.appendChild (help_base);
    if (help_main) help.appendChild (help_main);
    if (!help_main && !help_base) {
      help.appendChild (UFUI.getErrorMsg ('wpNoHelpTextError'));
    } else if (add_plea) {
      help.appendChild (UFUI.plea ('help', help_id));
    }
    return help;
  },

  showHelp : function (evt, id) // Onclick handler for setup without tooltips
  {
    var e = evt || window.event;
    var node = e.target || e.srcElement;
    if (!node) {
      var error = UFUI.getErrorMsg ('wpNoHelpTextError', true);
      // We need the text contents... and IE doesn't know Node.TEXT_NODE
      while (error && error.nodeType != 3) error = error.firstChild;
      if (error) alert (error.data);
      // Otherwise what??
    } else if (!document.getElementById (id + '_Div')) {
      var help = UFHelp.getHelp (id, false);
      help.style.fontSize = 'small';
      help.style.color    = '#666666';
      // Now add a new table row after the current one
      var tr = node.parentNode;
      while (tr && tr.nodeName.toLowerCase () != 'tr') tr = tr.parentNode;
      if (!tr) {
        var error = UFUI.getErrorMsg ('wpNoHelpTextError', true);
        while (error && error.nodeType != 3) error = error.firstChild;
        if (error) alert (error.data);
      } else {
        var new_tr = document.createElement ('tr');
        var cell = document.createElement ('td');
        new_tr.appendChild (cell);
        cell = document.createElement ('td');
        cell.id = id + '_Div';
        new_tr.appendChild (cell);
        tr.parentNode.insertBefore (new_tr, tr.nextSibling);
        cell = UFUtils.convert_td_div (cell);
        cell.appendChild (help);
      }
    }
    if (!!e.stopPropagation) {
      e.stopPropagation ();
      e.preventDefault ();
    } else if (typeof (e.cancelBubble) != 'undefined') {
      e.cancelBubble = true;
    }
    return false;
  },
  
  setupHelp : function (is_reupload)
  {
    if (!UFUI.help) return; // Help not loaded
    
    function setHelp (id, imgs, lk, maximum_width, is_reupload)
    {
      // Figure out where to place the help "button"
      var field = document.getElementById (id);
      var insert_in = null, before = null;
      var help_id = id + 'Help';
      if (!UFUI.help[help_id]) return; // Don't add if we have no help at all.
      var offset = -5; // Pixels.
      switch (id) {
        case 'wpWatchthis':
        case 'wpIgnoreWarning':
          // Right of the element
          if (!field) return;
          insert_in = field.parentNode;
          // Find the label.
          {
            var lbls = insert_in.getElementsByTagName ('label');
            if (!lbls) {
              before = field.nextSibling;
            } else {
              for (var i = 0; i < lbls.length; i++) {
                if (lbls[i].htmlFor && lbls[i].htmlFor == id) {
                  before = lbls[i].nextSibling; break;
                }
              }
            }
          }
          offset = Math.abs (offset);
          break;
        case 'wpCategories':
          field = document.getElementById ('hotcatLabelTranslated');
          if (!field) return;
          insert_in = field;
          before    = null;
          if (field.firstChild) {
            field  = field.firstChild;
            offset = Math.abs (offset);
          }
          break;
        case 'wpAuthor':
        case 'wpSource':
          if (!field) return;
          field     = field.parentNode; // Because the field itself may vanish.
          insert_in = field.parentNode.cells[0];
          before    = null;
          break;
        case 'wpDestFile':
          if (!field) return;
          insert_in = field.parentNode.parentNode.cells[0];
          before    = null;
          if (is_reupload) {
            help_id = 'wpReuploadDestHelp';
            field   = null; // Field is hidden: attach the help text to the button instead
          }
          break;          
        case 'wpDesc':
          if (!field) {
            field = document.getElementById ('wpUploadDescription');
            if (field) { // Basic form
              help_id = (is_reupload ? 'wpReuploadSummaryHelp' : 'wpUploadDescriptionHelp');
            } else {
              insert_in = document.getElementById ('wpDescLabel');
              if (!insert_in) return;
              field     = insert_in;
              offset    = Math.abs (offset);
              before    = insert_in.nextSibling;
              insert_in = insert_in.parentNode;
              break;
            }
          }
          // Fall through
        default:
          if (!field) return;
          // In the table cell to the left
          insert_in = field.parentNode.parentNode.cells[0];
          before    = null;
      }
      // Create and insert the help "button"
      var button_construct = null, button = null;
      if (imgs && typeof (Buttons) != 'undefined') {
        button = Buttons.makeButton (imgs, id + '_HelpButton', '#');
        button.style.position = 'relative';
        button.style.top      = '-0.4em';
        button_construct      = button;
      } else {
        button_construct = lk.cloneNode (true);
        button = button_construct.getElementsByTagName ('a')[0];
      }
      insert_in.insertBefore (button_construct, before);
      if (typeof (Tooltip) != 'undefined') {
        // Create the tooltip
        var tooltip =
          new Tooltip
            (  button
             , function () { var hlp = help_id; return UFHelp.getHelp (hlp, true); }
             , { activate     : Tooltip.CLICK
                ,deactivate   : (UFHelp.help_close_imgs
                                 ? Tooltip.CLICK_ELEM
                                 : Tooltip.CLICK_TIP|Tooltip.CLICK_ELEM|Tooltip.LOSE_FOCUS)
                ,close_button : UFHelp.help_close_imgs
                ,mode         : Tooltip.FIXED
                ,fixed_offset : {x:10, y: offset}
                ,max_pixels   : maximum_width
                ,target       : field
                ,open_delay   : 0
                ,hide_delay   : 0
               }
             , UFHelp.tooltip_styles
            );
      } else {
        // Alternative setup without Tooltips: insert help text statically in a table field below the
        // button.
        button.onclick =
          function (evt) { var hlp = help_id; return UFHelp.showHelp (evt, hlp); };
      }
    }
  
    var button_imgs = null, button_lk   = null;
    if (typeof (Buttons) != 'undefined') {
      var button_imgs = UFUI.getEntry ('wpUploadFormHelpOpenButton', 'uiElements', UFUI.internalLanguage);
      if (!button_imgs) button_imgs = UFUI.getEntry ('wpUploadFormHelpOpenButton', 'uiElements');
      var button_lk   = null;
      if (button_imgs) button_imgs = button_imgs.getElementsByTagName ('img');
    }
    if (!button_imgs || button_imgs.length == 0) {
      // Alternative text-based "button"
      button_lk = document.createElement ('sup');
      button_lk.appendChild (document.createElement ('b'));
      button_lk.firstChild.appendChild (document.createTextNode (' ['));
      button_lk.firstChild.appendChild (UFUtils.makeLink ('?', '#'));
      button_lk.firstChild.appendChild (document.createTextNode (']'));
      button_imgs = null;
    } else {
      button_imgs = Buttons.createClass (button_imgs, 'wpUploadFormHelpOpenClass');
    }

    var widest_field = document.getElementById ('wpAdditionalInfo');
    var max_width    = 0;
    if (!widest_field) widest_field = document.getElementById ('wpUploadDescription');
    if (widest_field) {
      var w = UFUtils.getWidth (widest_field);
      try {
        max_width = Math.round (w * 0.9);
      } catch (ex) {
        max_width = 0;
      }
    }
    setHelp ('wpUploadFile', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpDestFile', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpSource', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpAuthor', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpDate', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpDesc', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpPermission', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpOtherVersions', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpAdditionalInfo', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpLicense', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpCategories', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpWatchthis', button_imgs, button_lk, max_width, is_reupload);
    setHelp ('wpIgnoreWarning', button_imgs, button_lk, max_width, is_reupload);
  }

}; // end UFHelp

var UploadFormBasic =
{
  on_error_form : false, // True iff we're on a re-sent form (error case).

  setup : function (auto_fill)
  {
    // Special setup: don't use separate input fields; just verify the filename and that the
    // description isn't empty.
    var desc = document.getElementById ('wpUploadDescription');
    var previous_form = null;
    UploadForm.previous_hotcat_state = null;
    if (!UploadForm.isReupload) {
      if (typeof (FormRestorer) != 'undefined') {
        var current_dest_file = document.getElementById ('wpDestFile');
        var original_dest_file = null;
        if (current_dest_file != null) {
          current_dest_file  = current_dest_file.value;
          original_dest_file = current_dest_file.defaultValue;
        }
        if (original_dest_file && original_dest_file.length > 0) {
          // If original_dest_file was set to something, we're not on the original upload form but
          // on the re-sent form in error cases.
          UploadFormBasic.on_error_form = true;
        } else if (current_dest_file && current_dest_file.length > 0) {
          previous_form = FormRestorer.readForm ('UploadFormBasic');
          if (!previous_form && desc && desc.value && desc.value.length > 0) {
            // Hmmm... IE sometimes cannot read the cookie (because it wasn't stored, due to some
            // strange security settings on some computers that I've been unable to track down).
            // If we're here, we have a target file name *and* a description: assume the description
            // comes from the browser's field value cache and make sure we don't overwrite it.
            auto_fill = false;
          }
        }
      }
      if (previous_form) {
        var additional_data = previous_form[0].val;
        if (additional_data) {
          additional_data    = additional_data.split ('\t');
          var previous_file  = additional_data[0];
          if (previous_file == current_dest_file) {
            if (additional_data.length >= 2) UploadForm.previous_hotcat_state = additional_data[1];
          } else {
            previous_form = null;
          }
        }
      }
    }
    UploadForm.formModified = true;
    if (document.getElementById ('wpLicense') != null)
      UploadForm.setup_license_preview ();      
    UploadForm.oldOnSubmit = UploadForm.the_form.onsubmit;
    UploadForm.the_form.onsubmit = UploadFormBasic.submit;
    if (!UploadForm.isReupload) {
      UploadForm.addPreviewButton (UploadFormBasic.preview);
    }
    if (previous_form) {
      // Restore form values.
      if (desc) {
        var prev = UploadForm.getPrevValue (previous_form, desc.id);
        if (prev) desc.value = prev;
      }
      if (UploadForm.previous_hotcat_state != null && typeof (hotcat_set_state) == 'function') {
        var input = document.getElementById ('hotcat_text');
        if (input != null) hotcat_cancel ();
        UploadForm.previous_hotcat_state = hotcat_set_state (UploadForm.previous_hotcat_state);
      }
    } else {
      if (!!UploadForm_autofill && auto_fill && !UploadForm.isReupload) {
        if (desc) desc.value = UploadForm.empty_template ('Information');
      }
    }
    if (desc && desc.value && desc.value.indexOf ('\{\{Information') >= 0) {
      // Only hide the box in the Uploadtext if there is really an inormation-template in the
      // summary!
      var infobox = document.getElementById ('Uploadtext-template-box');
      if (infobox) infobox.style.display = 'none';
    }
  },

  submit : function (evt)
  {
    var overwrite = false;
    if (!UploadForm.isReupload) overwrite = UploadForm.isOverwrite ();
    if (!UploadFormBasic.verify (overwrite)) return false;
    
    if (!UploadForm.isReupload) {
      var target_name = document.getElementById ('wpDestFile');
      if (target_name != null && target_name.value != null) // Strip whitespace
        target_name.value = target_name.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (!UploadFormBasic.on_error_form
          && typeof (FormRestorer) != 'undefined'
          && target_name != null && target_name.value != null) {
        var hotcat_state = null;
        if (typeof (hotcat_get_state) == 'function') {
          var input = document.getElementById ('hotcat_text');
          if (input != null) hotcat_closeform ();
          hotcat_state = hotcat_get_state ();
        }
        // We already know that target_name.value is set!
        FormRestorer.saveForm
          (  'UploadFormBasic'
           , UploadForm.the_form.id
           , target_name.value
             + (hotcat_state != null ? '\t' + hotcat_state : '')
           , ';path=' + document.location.pathname
             + ';max-age=1800');
        // Expire after half an hour.
      }
    } // end if (UploadForm.isReupload)
    
    var desc = document.getElementById ('wpUploadDescription');
    var old_desc_value = desc.value;
    var do_submit = UploadForm.call_onsubmit (evt || window.event);
    if (!do_submit)
      desc.value = old_desc_value;
    else {
      desc.value = UploadForm.fixCategoryTransclusion (UploadForm.clean (desc.value));
      UploadForm.hidePreview ();
      document.getElementById ('wpDestFile').disabled = false;
    }
    return do_submit;
  },

  preview : function (evt)
  {
    var overwrite = UploadForm.isOverwrite ();
    if (!UploadFormBasic.verify (overwrite)) return false;
    
    var desc = document.getElementById ('wpUploadDescription');
    UploadForm.makePreview (UploadForm.clean (desc.value), overwrite);
    return true;
  },
  
  verify : function (overwrite)
  {
    var desc = document.getElementById ('wpUploadDescription');
    var ok   = true;

    if (UploadForm.isReupload) {
      // Only check that the description isn't empty
      if (UploadForm.errorMsgs != null) delete UploadForm.errorMsgs;
      UploadForm.errorMsgs = new Array ();
      UploadForm.warning_pushed = false;
      if (!desc.value || desc.value.search (/\S/) < 0) {
        desc.style.backgroundColor = UploadForm.errorColor;
        desc.onkeyup = UploadForm.resetBg;
        UploadForm.errorMsgs.push ('wpReuploadNoSummaryError');
        ok = false;
      }
    } else {
      if (!overwrite) {
        if (UploadForm.errorMsgs != null) delete UploadForm.errorMsgs;
        UploadForm.errorMsgs = new Array ();
        UploadForm.warning_pushed = false;
  
        if (!UploadForm.verifyMandatoryField (desc)) {
          desc.onkeyup = UploadForm.resetBg;
          ok = false;
        } else {
          // We do have a non-empty description. Try to split it up and check that the fields for
          // author, source, and description are filled in.
          var fields = UploadForm.split_description (desc.value);
          if (fields != null && fields.length == 4) {
            if (   fields[1] == null || fields[1].search (/\S/) < 0  // Author
                || fields[2] == null || fields[2].search (/\S/) < 0) // Source
            {
              desc.style.backgroundColor = UploadForm.errorColor;
              desc.onkeyup = UploadForm.resetBg;
              if (!UploadForm.warning_pushed) {
                if (UploadForm.errorMsgs != null)
                  UploadForm.errorMsgs.push ('wpUploadWarningError');
                UploadForm.warning_pushed = true;
              }
              ok = false;
            }
            if (   UploadForm.templates[fields[0]].desc_mandatory
                && (fields[3] == null || fields[3].search (/\S/) < 0)) // Description
            {
              desc.style.backgroundColor = UploadForm.errorColor;
              desc.onkeyup = UploadForm.resetBg;
              UploadForm.errorMsgs.push ('wpNoDescriptionError');
              ok = false;
            }
          }
        }
        // Try a license check
        var license = document.getElementById ('wpLicense');
        if (license == null || license.selectedIndex == 0) {
          // There must be a license somewhere in the description.
          if (!UploadForm.has_license ([desc])) {
            var d = desc.value.replace (/\{\{\s*([Ii]nformation|[Pp]ainting|[Ff]lickr)\s*\n/g,"");  
            if (d.indexOf ('\{\{') < 0) {
              // No transcludion that could provide a license either
              desc.style.backgroundColor = UploadForm.errorColor;
              desc.onkeyup = UploadForm.resetBg;
              if (!UploadForm.warning_pushed) {
                if (UploadForm.errorMsgs != null)
                  UploadForm.errorMsgs.push ('wpUploadWarningError');
                UploadForm.warning_pushed = true;
              }
              ok = false;
            } else {
              // Assume it's ok.
            }
          }
        } // end license check
        var target_name = document.getElementById ('wpDestFile');
        if (target_name != null) {
          // Trim leading and trailing whitespace
          target_name.value = target_name.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          if (!UploadForm.verifyFileName (target_name.value)) {
            target_name.style.backgroundColor = UploadForm.errorColor;
            target_name.onkeyup =
              function (evt)
              {
                UploadForm.resetBg (evt);
                if (typeof (wgUploadWarningObj.keypress) == 'function' && !UploadForm.isReupload)
                  wgUploadWarningObj.keypress();
              };
            ok = false;
          }
        }
      }
    } // end if (reupload or not)
    if (!ok) {
      UploadForm.hidePreview ();
      UploadForm.display_errors ();
    } else {
      // It's ok: hide our warning box
      var my_warning = document.getElementById ('wpUploadVerifyWarning');
      if (my_warning != null) my_warning.style.display = 'none';
    }
    return ok;
  } // end verify

}; // end UploadFormBasic

var UploadFormFull =
{
  form_type             : 0,     // 0 - single desc field; 1 - one desc field per language
  field_state           : null,  // Will be initialized in setup below.

  multi_inputs : null,
  // If we're using several description fields, this is an array of objects
    
  pushMultiInput : function (sel, text)
  {
    if (UploadFormFull.multi_inputs == null) {
      UploadFormFull.multi_inputs = [{selector : sel, textfield : text}];
    } else {
      UploadFormFull.multi_inputs[UploadFormFull.multi_inputs.length] =
        {selector : sel, textfield : text};
    }
    var idx   = UploadFormFull.multi_inputs.length;
    sel.id    = 'wpLangSel' + idx;
    sel.name  = sel.id;
    text.id   = 'wpDescText' + idx;
    text.name = text.id;  
  },
    
  addDescField : function (content, lang, idx, stored_form)
  {
    var selector = LanguageHandler.getSelect
                     (null, lang, UFUI.getLabel ('wpUnknownLanguageUploadLbl', true));
    // These style definitions are needed for IE, which otherwise creates excessively wide
    // selectors, pushing the main form to the right.
    selector.style.maxWidth = '12em';
    selector.style.width    = '12em';
    selector.style.overflow = 'hidden';
    var textfield  = document.createElement ('textarea');
    textfield.setAttribute ('rows', UFUtils.getHeight (UploadForm_description_height, 2, 6));
    textfield.style.width = '100%';
    UploadFormFull.pushMultiInput (selector, textfield);

    var new_row = content.insertRow (idx == null ? content.rows.length : idx);
    var first_cell = document.createElement ('td');
    first_cell.setAttribute ('align', 'right');
    first_cell.setAttribute ('vAlign', 'top');
    first_cell.appendChild (selector);
    var second_cell = document.createElement ('td');
    second_cell.setAttribute ('align', 'left');
    second_cell.setAttribute ('vAlign', 'top');
    second_cell.appendChild (textfield);
    new_row.appendChild (first_cell);
    new_row.appendChild (second_cell);

    if (stored_form != null) {
      var prev_idx = UploadForm.getPrevValue (stored_form, selector.id);
      var prev_val = UploadForm.getPrevValue (stored_form, textfield.id);
      if (prev_val != null) textfield.value = prev_val;
      if (prev_idx != null) {
        selector.options[selector.selectedIndex].selected = false;
        selector.options[prev_idx].selected = true;
      }
    }
    UploadFormFull.enable_edittools (textfield);
  },
  
  addOneDescField : function (evt) // onclick handler for the button
  {
    var button = document.getElementById ('wpUploadAddDescription');
    var table_row = button.parentNode.parentNode;
    var idx = table_row.rowIndex;
    UploadFormFull.addDescField (table_row.parentNode, null, idx, null);
  },

  addMultiDesc : function (table, idx, stored_form)
  {
    // Add en and user language, if different
    var userLang = LanguageHandler.closestLanguage (UFUI.userLanguage);

    if (userLang == 'pt-br') userLang = 'pt'; // Per request from Portuguese and Brazilians
    var first_cell = document.createElement ('td');
    first_cell.setAttribute ('align', 'right');  // RTL languages?
    var second_cell = document.createElement ('td');
    var new_label = document.createElement ('label');
    new_label.id = 'wpDescLabel';
    new_label.appendChild (UFUI.getLabel ('wpDescUploadLbl'));
    first_cell.appendChild (new_label);

    var new_row = table.insertRow (idx);
    new_row.appendChild (first_cell);
    new_row.appendChild (second_cell);
    idx++;

    var added = false;
    if (stored_form != null) {
      // Maybe we had more... find 'wpLangSel1'
      var curr = 0;
      for (var i = 1; i < stored_form.length; i++) {
        if (stored_form[i].id == 'wpLangSel1') {
          curr = i; break;
        }
      }
      if (curr > 0) {
        while (   curr < stored_form.length
               && stored_form[curr].id.indexOf ('wpLangSel') == 0) {
          UploadFormFull.addDescField (table, null, idx++, stored_form);
          added = true; curr++;
          if (curr < stored_form.length && stored_form[curr].id.indexOf ('wpDescText') == 0)
            curr++;
        }
      }
    } // end if
    if (!added) {
      if (   UploadForm_description_languages
          && UploadForm_description_languages.constructor == Array
          && UploadForm_description_languages.length > 0) {
        for (var i = 0; i < UploadForm_description_languages.length; i++) {
          var lang = LanguageHandler.closestLanguage (UploadForm_description_languages[i]);
          UploadFormFull.addDescField (table, lang, idx++, stored_form);
        }
      } else {
        if (UploadForm_own_language_first) {
          if (userLang != null && userLang != UFUI.defaultLanguage)
            UploadFormFull.addDescField (table, userLang, idx++, stored_form);
          UploadFormFull.addDescField (table, UFUI.defaultLanguage, idx++, stored_form);
        } else {
          UploadFormFull.addDescField (table, UFUI.defaultLanguage, idx++, stored_form);
          if (userLang != null && userLang != UFUI.defaultLanguage)
            UploadFormFull.addDescField (table, userLang, idx++, stored_form);
        }
      }
    }
    // Now add a "+" button
    var additional =
      UploadForm.customFormButton
        (  'wpUploadFormAddDescButton'     // Customization ID
         , 'wpUploadAddDescription'        // ID of button
         , '+'                             // Default text
         , UploadFormFull.addOneDescField  // Event handler
        );
    
    new_row = table.insertRow (idx++);
    first_cell = document.createElement ('td');
    second_cell = document.createElement ('td');
    second_cell.setAttribute ('align', 'left');
    second_cell.appendChild (additional);
    new_row.appendChild (first_cell);
    new_row.appendChild (second_cell);
    
    return idx;
  },

  changeField : function (field_id) // Callback for changeable field button
  {
    function get_selection (field)
    {
      // Based on code from Jonas Raoni Soares Silva at http://jsfromhell.com/forms/selection
      // License: {{tl|attribution}}
      // Warning: simplified because we apply it only to an INPUT field. For TEXTAREAs, see the
      // URL given.
      if (typeof (field.selectionStart) != 'undefined')
        return {start: field.selectionStart, end: field.selectionEnd};
      else if (!!field.createTextRange) {
        field.focus ();
        var s = document.selection.createRange();
        if (s.parentElement() != field) return {start: 0, end: 0};
        var r = field.createTextRange(); r.setEndPoint ("EndToStart", s);
        return {start: r.text.length, end: r.text.length + s.text.length};
      }
      return {start: 0, end: 0};
    }

    var field  = document.getElementById (field_id);
    if (field.disabled) return; // Don't do anything if the field isn't enabled.

    var button = document.getElementById (field_id + '_Button');
    var cell   = field.parentNode;
    if (!field || !button || !cell) return; // Error message here?
    var new_field = document.createElement ('textarea');
    var height = UFUtils.getHeight (UploadFormFull.field_state[field_id].height, 2, 4);
    new_field.setAttribute ('rows', height);
    new_field.style.width = '100%';
    new_field.value = field.value;
    var sel = get_selection (field);
    var tab_idx = field.getAttribute ('tabindex');
    cell.removeChild (button);
    cell.replaceChild (new_field, field);
    field.id = "";
    field.onfocus = null;
    new_field.id = field_id;
    new_field.setAttribute ('tabindex', tab_idx);
    UploadFormFull.enable_edittools (new_field);
    // Restore the selection
    if (!!new_field.setSelectionRange) // e.g. khtml
      new_field.setSelectionRange (sel.start, sel.end);
    else if (typeof (new_field.selectionStart) != 'undefined') {
      new_field.selectionStart = sel.start;
      new_field.selectionEnd   = sel.end;
    } else if (new_field.createTextRange) { // IE
      var new_selection = new_field.createTextRange();
      new_selection.move ("character", sel.start);
      new_selection.moveEnd ("character", sel.end - sel.start);
      new_selection.select();
    }
    new_field.focus ();
    UploadFormFull.field_state[field_id].height = height;
  },
  
  enable_edittools : function (textfield)
  {
    // To be called on each dynamically added field to ensure the edit toolbar works there
    if (typeof (EditTools) != 'undefined' && typeof (EditTools.registerTextField) == 'function') {
      // We have EditTools
      if (insertTags == EditTools.insertTags) {
        // EditTools is already set up: we have to add an onfocus handler ourselves
        addEvent (textfield, 'focus', EditTools.registerTextField);
      }
      // Otherwise, EditTools will be set up later, and will catch this field, so we don't have
      // to do anything.
    }
  },

  switch_intro_text : function ()
  {
    // Set up the display of [[MediaWiki:Uploadtext]]
    var long_text  = document.getElementById ('wpUploadFormLongText');
    var short_text = document.getElementById ('wpUploadFormShortText');
    if (long_text && short_text) {
      long_text.style.display = 'none';
      if (UFUtils.isChildOf (long_text, short_text)) {
        // If long_text is a child of short_text, then short_text is already shown, and
        // long_text is just a part that isn't needed for the new upload form. Hence
        // we're done.
        return;
      }
      if (UFUtils.isChildOf (short_text, long_text)) {
        // If the short_text is within the long_text, we need to take it out; otherwise
        // it won't be shown.
        short_text.parentNode.removeChild (short_text);
        long_text.parentNode.insertBefore (short_text, long_text.nextSibling);
      }
      short_text.style.display = "";
    } else {
      // Remove the redundant infobox in the uploadtext explanation. People should *not*
      // insert this template into description.
      var infobox = document.getElementById ('Uploadtext-template-box');
      if (infobox) infobox.style.display = 'none';
    }
  },

  set_hints : function ()
  {
    UploadForm.addAfterField ('wpDestFile', UFUI.getHint ('wpUploadFormDestFileHint'));
    UploadForm.addAfterField ('wpSource', UFUI.getHint ('wpUploadFormSourceHint'));
    UploadForm.addAfterField ('wpAuthor', UFUI.getHint ('wpUploadFormAuthorHint'));
    UploadForm.addAfterField ('wpDate', UFUI.getHint ('wpUploadFormDateHint'));
    UploadForm.addAfterField ('wpPermission', UFUI.getHint ('wpUploadFormPermissionHint'));
    UploadForm.addAfterField ('wpAdditionalInfo', UFUI.getHint ('wpUploadFormAdditionalInfoHint'));
    UploadForm.addAfterField ('catlinks', UFUI.getHint ('wpUploadFormCategoryHint'));
  },

  setup : function ()
  {
    function addField (table, idx, id, label, field, stored_form)
    {
      if (label == null) label = UFUI.getLabel (id + 'UploadLbl');
      var new_row = table.insertRow (idx);
      var firstCell = document.createElement ('td');
      firstCell.setAttribute ('align', 'right'); // RTL languages ??
      var new_label = document.createElement ('label');
      new_label.htmlFor = id;
      new_label.appendChild (label);
      firstCell.appendChild (new_label);
      var secondCell = document.createElement ('td');
      secondCell.setAttribute ('align', 'left');
      field.setAttribute ('name', id);
      field.setAttribute ('id', id);
      secondCell.appendChild (field);
      new_row.appendChild (firstCell);
      new_row.appendChild (secondCell);
      var prev_value = UploadForm.getPrevValue (stored_form, id);
      if (prev_value != null) field.value = prev_value;
      UploadFormFull.enable_edittools (field);
    }

    function addInput (table, idx, id, label, width, stored_form)
    {
      var new_field = document.createElement ('input');
      new_field.setAttribute ('type', 'text');
      new_field.setAttribute ('size', '' + width);
      addField (table, idx, id, label, new_field, stored_form);
      UploadFormFull.enable_edittools (new_field);
      return new_field;
    }

    function addChangeableField (height, table, idx, id, label, width, stored_form)
    {
      var new_field = null;
      var field_id = 'wp' + id;
      if (height == 0)
        height = UFUtils.getHeight (UploadFormFull.field_state[field_id].height, 1, 4);
      if (height > 1) {
        new_field = document.createElement ('textarea');
        new_field.setAttribute ('rows', height);
        new_field.style.width = '100%';
        addField (table, idx, 'wp' + id, null, new_field, stored_form);
      } else {
        new_field  = addInput (table, idx, field_id, null, 80, stored_form);
        var button =
          UploadForm.customFormButton
            (  'wpUploadForm' + id + 'Button'
             , field_id + '_Button'
             , '...'
             , function () { UploadFormFull.changeField (field_id); }
            );
        new_field.parentNode.insertBefore (button, new_field.nextSibling);
      }
      UploadFormFull.field_state[field_id].height = height;
      UploadFormFull.enable_edittools (new_field);
    }

    function setCheckBoxes (previous_form, boxes)
    {
      if (boxes == null || boxes.length == 0 || previous_form == null) return;
      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i] != null) {
          var prev_val = UploadForm.getPrevValue (previous_form, boxes[i].id);
          if (prev_val != null) boxes[i].checked = prev_val;
        }
      }
    }

    // Init the field states. Cannot be done earlier, otherwise definitions in user's
    // monobook.js (or modern.js, or ...) won't be taken aboard.
    UploadFormFull.field_state =
      { wpSource: {height: UploadForm_source_field_size}
       ,wpAuthor: {height: UploadForm_author_field_size}
      };

    var previous_form         = null;
    var previous_type         = -1; // unknown
    var previous_fields       = [0, 0];
    UploadForm.previous_hotcat_state = null;
    if (typeof (FormRestorer) != 'undefined') {
      // We know that when we arrive here originally, wpDestFile.value is empty, as is
      // wpDestFile.defaultValue. If we entered something, submitted, and then come back,
      // modern browsers restore form entries, at least for the fields in the static XHTML.
      // wpDestFile is such a static field (it isn't added by Javascript), so if we have a
      // non-empty value here, we know that the form needs to restored. (But see the caveat
      // about IE and onload handling at the bottom of the file!)
      var current_dest_file = document.getElementById ('wpDestFile');
      if (current_dest_file != null) current_dest_file = current_dest_file.value;
      if (current_dest_file != null && current_dest_file.length > 0) {
        previous_form = FormRestorer.readForm ('UploadForm');
      }
      if (previous_form) {
        var additional_data = previous_form[0].val;
        if (additional_data) {
          additional_data    = additional_data.split ('\t');
          var previous_file  = additional_data[1];
          if (previous_file == current_dest_file) {
            previous_type      = parseInt (additional_data[0], 10);
            previous_fields[0] = parseInt (additional_data[2], 10);
            previous_fields[1] = parseInt (additional_data[3], 10);          
            if (additional_data.length >= 5) UploadForm.previous_hotcat_state = additional_data[4];
          } else {
            previous_form = null;
          }
        }
      }
    }
    var original_desc = document.getElementById ('wpUploadDescription');
    var original_row  = original_desc.parentNode.parentNode;
    var table         = original_row.parentNode;
    var original_idx  = original_row.rowIndex;
    UploadForm.formModified = true;
    original_desc.setAttribute ('id', "");
    UploadForm.oldOnSubmit = UploadForm.the_form.onsubmit;
    UploadForm.the_form.onsubmit = UploadFormFull.submit;
    table.deleteRow (original_idx);
    var idx = original_idx;
    // Insert source field
    var new_field = null;
    addChangeableField (previous_fields[0], table, idx++, 'Source', null, 80, previous_form);
    addChangeableField (previous_fields[1], table, idx++, 'Author', null, 80, previous_form);
    addInput (table, idx++, 'wpDate', null, 80, previous_form);
    // Insert description field
    if (typeof (LanguageHandler) == 'undefined' || previous_type == 0) {
      // Basic setup
      new_field = document.createElement ('textarea');
      new_field.setAttribute ('rows', UFUtils.getHeight (UploadForm_description_height, 6, 12));
      new_field.style.width = '100%';
      // Do not name the new field 'wpUploadDescription', otherwise MediaWiki:Upload.js
      // might prefill it with an information template!
      addField (table, idx++, 'wpDesc', null, new_field, previous_form);
      UploadFormFull.form_type = 0;
    } else {
      idx = UploadFormFull.addMultiDesc (table, idx, previous_form);
      UploadFormFull.form_type = 1;
    }
    addInput (table, idx++, 'wpOtherVersions', null, 80, previous_form);
    addInput (table, idx++, 'wpPermission', null, 80, previous_form);
    new_field = document.createElement ('textarea');
    new_field.setAttribute
      ('rows', UFUtils.getHeight (UploadForm_additional_info_height, 2, 10));
    new_field.style.width = '100%';
    // Work-around Firefox's "one additional line" bug
    addField (table, idx++, 'wpAdditionalInfo', null, new_field, previous_form);
    // Add a preview button.
    UploadForm.addPreviewButton (UploadFormFull.preview);
    // Correct tab indices.
    for (var i = 0; i < UploadForm.the_form.length; i++) {
      UploadForm.the_form.elements[i].setAttribute ('tabindex', '' + i);
    }
    var license = document.getElementById ('wpLicense');
    // Change the license previewer to not cause a table re-layout
    if (license != null) {
      // These style definitions are because long option labels result in excessively wide
      // selectors, causing also the description fields to go beyond the right border of the
      // page.
      license.style.maxWidth = '100%';
      license.style.width    = '100%';
      license.style.overflow = 'hidden';
    }
    UploadForm.setup_license_preview ();
    if (license != null) {
      var prev = UploadForm.getPrevValue (previous_form, 'wpLicense');
      if (prev != null) {
        try {
          license.options[license.selectedIndex].selected = false;
          license.options[prev].selected = true;
        } catch (ex) {
        }
      }
    }
    // Pre-fill in some cases
    if (UFUI.isOwnWork) {
      var src     = document.getElementById ('wpSource');
      var author  = document.getElementById ('wpAuthor');
      if (src != null && (src.value == null || src.value.length == 0)) {
        src.value = UploadForm.getOwnWorkSource ();
      }
      if (author != null && (author.value == null || author.value.length == 0)) {
        author.value = UploadForm.getOwnWorkAuthor ();
      }
      if (typeof (UploadForm_ownwork_date) == 'string'
          && UploadForm_ownwork_date.search (/\S/) >= 0) {
        var date = document.getElementById ('wpDate');
        if (date != null && (date.value == null || date.value.length == 0)) {
          date.value = UploadForm_ownwork_date;
        }
      }
    }
    if (previous_form != null) {
      setCheckBoxes
        (  previous_form
         , [  document.getElementById ('wpWatchthis')
            , document.getElementById ('wpIgnoreWarning')]);
    }     
    UploadFormFull.switch_intro_text ();    
    // If HotCat is present, restore its state, too.
    if (UploadForm.previous_hotcat_state != null && typeof (hotcat_set_state) == 'function') {
      var input = document.getElementById ('hotcat_text');
      if (input != null) hotcat_cancel ();
      UploadForm.previous_hotcat_state = hotcat_set_state (UploadForm.previous_hotcat_state);
    }
    UploadFormFull.set_hints ();
  }, // end setup

  get_desc_text : function (basic)
  {
    var desc_text = "";
    if (UploadFormFull.multi_inputs == null) {
      var desc = document.getElementById ('wpDesc');
      if (desc != null && !desc.disabled) desc_text = UploadForm.clean (desc.value);
    } else {
      for (var i = 0; i < UploadFormFull.multi_inputs.length; i++) {
        if (!UploadFormFull.multi_inputs[i].textfield.disabled) {
          var text     = UploadFormFull.multi_inputs[i].textfield.value;
          var selector = UploadFormFull.multi_inputs[i].selector;
          var lang     = selector.options[selector.selectedIndex].value;
          if (text != null && text.length > 0) {
            text = UploadForm.clean (text);
            if (desc_text.length > 0) desc_text = desc_text + '\n';
            if (!basic && lang != null && lang.length > 0 && lang != 'unknown') {
              // This is Commons-specific! The tl-template is already used, the template for
              // Tagalog is tgl!
              if (lang == 'tl') lang = 'tgl';
              desc_text = desc_text + '\{\{' + lang + '|1=' + text + '\}\}';
            } else
              desc_text = desc_text + text;
          }
        } // end if !disabled
      }
    }
    var more_info  = document.getElementById ('wpAdditionalInfo');
    if (!basic) {
      var src        = document.getElementById ('wpSource');
      var author     = document.getElementById ('wpAuthor');
      var date       = document.getElementById ('wpDate');
      var other      = document.getElementById ('wpPermission');
      var othervers  = document.getElementById ('wpOtherVersions');

      desc_text = '\{\{Information\n'
                   + '|Description='+ desc_text + '\n'
                   + '|Source=' + (!src.disabled ? UploadForm.clean (src.value) : "") + '\n'
                   + '|Author=' + (!author.disabled ? UploadForm.clean (author.value) : "") + '\n'
                   + '|Date=' + (!date.disabled ? UploadForm.clean (date.value) : "") + '\n'
                   + ((other && !other.disabled && other.value != null)
                      ? '|Permission=' + UploadForm.clean (other.value) + '\n'
                      : "")
                   + ((othervers && !othervers.disabled && othervers.value != null)
                      ? '|other_versions=' + UploadForm.clean (othervers.value) +'\n'
                      : "")
                   + '\}\}\n';
    } else {
      desc_text = desc_text + '\n';
    }
    // Append the additional info, if any
    if (more_info && !more_info.disabled && more_info.value)
      desc_text = desc_text + UploadForm.clean (more_info.value);
    return desc_text;
  },
  
  submit : function (evt)
  {
    var overwrite = UploadForm.isOverwrite ();
    if (!UploadFormFull.verify (overwrite)) return false;
    
    // Now put together an information-template
    var desc_text = UploadFormFull.get_desc_text (overwrite);
    
    var do_submit = true;

    var target_name = document.getElementById ('wpDestFile');
    if (target_name != null && target_name.value != null) // Strip whitespace
      target_name.value = target_name.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    var dummy_desc = document.getElementById ('wpUploadDescription');
    // Sometimes, we do restore from scratch, and sometimes, the browser manages to keep everything.
    // If so, we may have a wpUploadDescription from an earlier submission. Remove it.
    if (dummy_desc != null) dummy_desc.parentNode.removeChild (dummy_desc);
    
    if (   typeof (FormRestorer) != 'undefined'
        && target_name != null && target_name.value != null) {
      var hotcat_state = null;
      if (typeof (hotcat_get_state) == 'function') {
        var input = document.getElementById ('hotcat_text');
        if (input != null) hotcat_closeform ();
        hotcat_state = hotcat_get_state ();
      }
      // We already know that target_name.value is set!
      FormRestorer.saveForm
        (  'UploadForm'
         , UploadForm.the_form.id
         , "" + UploadFormFull.form_type
           + '\t' + target_name.value
           + '\t' + UploadFormFull.field_state.wpSource.height
           + '\t' + UploadFormFull.field_state.wpAuthor.height
           + (hotcat_state != null ? '\t' + hotcat_state : '')
         , ';path=' + document.location.pathname
           + ';max-age=1800');
      // Expire after half an hour.
    }
    
    dummy_desc = document.createElement ('textarea');
    dummy_desc.setAttribute ('rows', '6');
    dummy_desc.setAttribute ('cols', '80');
    dummy_desc.style.display = 'none';
    dummy_desc.setAttribute ('name', 'wpUploadDescription');
    dummy_desc.setAttribute ('id', 'wpUploadDescription');
    UploadForm.the_form.appendChild (dummy_desc);
    dummy_desc.value = UploadForm.fixCategoryTransclusion (desc_text);

    do_submit = UploadForm.call_onsubmit (evt || window.event);
    if (!do_submit) {
      // Oops. We actually don't submit. Remove the hidden field
      UploadForm.the_form.removeChild (dummy_desc);
    } else {
      UploadForm.hidePreview ();
      document.getElementById ('wpDestFile').disabled = false;
      document.getElementById ('wpEditToken').disabled = false;
    }
    return do_submit;
  },

  preview : function (evt)
  {
    var overwrite = UploadForm.isOverwrite ();
    if (!UploadFormFull.verify (overwrite)) return false;
    
    UploadForm.makePreview (UploadFormFull.get_desc_text (overwrite), overwrite);
    return true;
  },

  verify : function (overwrite)
  {
    var src       = document.getElementById ('wpSource');
    var author    = document.getElementById ('wpAuthor');
    var date      = document.getElementById ('wpDate');
    var other     = document.getElementById ('wpPermission');
    var othervers = document.getElementById ('wpOtherVersions');
    var moreInfo  = document.getElementById ('wpAdditionalInfo');
    var ok        = true;

    if (!overwrite) {
      if (UploadForm.errorMsgs != null) delete UploadForm.errorMsgs;
      UploadForm.errorMsgs = new Array ();
      UploadForm.warning_pushed = false;

      if (!UploadForm.verifyMandatoryField
            (src,
             function (src)
             {
                var flickr_ok = !UFUI.isFromFlickr ||
                                src.search (/http:\/\/(www\.)?flickr\.com/) >= 0;
                if (!flickr_ok) UploadForm.errorMsgs.push ('wpFlickrURLError');
                return flickr_ok;
             }
            )
         ) 
      {
        src.onkeyup = UploadForm.resetBg;
        ok = false;
      }
      if (!UploadForm.verifyMandatoryField (author)) {
        author.onkeyup = UploadForm.resetBg;
        ok = false;
      }
      // Piece the description(s) together
      var all_descs = "";
      if (UploadFormFull.multi_inputs == null) {
        var desc = document.getElementById ('wpDesc');
        if (desc != null) all_descs = desc.value;
      } else {
        for (var input_idx = 0; input_idx < UploadFormFull.multi_inputs.length; input_idx++) {
          all_descs = all_descs + UploadFormFull.multi_inputs[input_idx].textfield.value;
        }
      }
      // License check
      var license_field = document.getElementById ('wpLicense');
      var license_chosen = license_field == null || license_field.selectedIndex > 0;
      if (!license_chosen && !UploadForm.has_license ([all_descs, other, moreInfo])) {
        if (!UploadForm.warning_pushed) {
          UploadForm.errorMsgs.push ('wpUploadWarningError');
          UploadForm.warning_pushed = true;
        }
        ok = false;
      }
      var target_name = document.getElementById ('wpDestFile');
      if (target_name != null) {
        // Trim leading and trailing whitespace
        target_name.value = target_name.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if (!UploadForm.verifyFileName (target_name.value)) {
          target_name.style.backgroundColor = UploadForm.errorColor;
          target_name.onkeyup =
            function (evt)
            {
              UploadForm.resetBg (evt);
              if (typeof (wgUploadWarningObj.keypress) == 'function' && !UploadForm.isReupload)
                wgUploadWarningObj.keypress();
            };
          ok = false;
        }
      }
      if (UploadForm.templates[0].desc_mandatory) {
        if (all_descs.search (/\S/) < 0) {
          if (UploadFormFull.multi_inputs == null) {
            var desc = document.getElementById ('wpDesc');
            if (desc != null) {
              desc.style.backgroundColor = UploadForm.errorColor;
              desc.onkeyup = UploadForm.resetBg;
            }
          } else {
            UploadFormFull.setMultiBg (UploadForm.errorColor, UploadFormFull.resetMultiBg);
          }
          UploadForm.errorMsgs.push ('wpNoDescriptionError');
          ok = false;
        }
      } // end description check
    } // end overwrite
    if (!ok) {
      UploadForm.hidePreview ();
      UploadForm.display_errors ();
    } else {
       // It's ok: hide our warning box
      var my_warning = document.getElementById ('wpUploadVerifyWarning');
      if (my_warning != null) my_warning.style.display = 'none';
    }
    return ok;
  },

  setMultiBg : function (color, handler)
  {
    if (UploadFormFull.multi_inputs == null) return;
    for (var i = 0; i < UploadFormFull.multi_inputs.length; i++) {
      var field = UploadFormFull.multi_inputs[i].textfield;
      field.style.backgroundColor = color;
      field.onkeyup               = handler;
    }
  },

  resetMultiBg : function (evt)
  {
    if (UploadForm.resetBg (evt)) {
      // Reset the backgrounds of all description fields
      UploadFormFull.setMultiBg ('#FFFFFF', null);
    }
  }

}; // end UploadFormFull

var UploadForm =
{
  isInstalled  : false, // Set to true when the onload hook runs

  debug        : false, // Can be set to true by adding "&debug=true" to the URL
  
  oldOnSubmit  : null,        // Possibly already existing onsubmit handler
  errorColor   : 'lightpink', // The light red from Template:Copyvio
  formModified : false,

  isReupload   : false,

  setup_hotcat_label : function ()
  {
    // If HotCat is present, translate its label if we can find it
    var hotcat_label_cell = document.getElementById ('hotcatLabel');
    if (hotcat_label_cell != null) {
      // Change its ID, just to be sure
      hotcat_label_cell.setAttribute ('id', 'hotcatLabelTranslated');
      // Assumes that the cell has only one child (which is normally the case)
      hotcat_label_cell.replaceChild
        (  UFUI.getLabel ('wpCategoriesUploadLbl')
         , hotcat_label_cell.firstChild);
    }
  },
  
  setup_error_display : function ()
  {
    var warning_cell = document.getElementById ('wpDestFile-warning');
    if (!warning_cell) return;
    var row      = warning_cell.parentNode;
    var new_cell = document.createElement ('td');
    new_cell.style.padding = '0';
    // Remove the colspan, if any, and insert a new cell to the left
    warning_cell.colspan = "";
    warning_cell.padding = '0';
    row.insertBefore (new_cell, warning_cell);
    UFUtils.convert_td_div (warning_cell);
  },

  set_fields_enabled : function (enabled, except)
  {
    // Enables or disables all named fields in the form, except those whose ids are
    // listed in except
    var skip    = except.join (' ');
    var elems   = UploadForm.the_form.elements;
    var changed = false;
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].type == 'hidden') continue; // Don't fool around with hidden elements
      var id = elems[i].id;
      if (!id || id.length == 0) id = elems[i].name;
      if (id && id.length > 0) {
        if (skip.indexOf (id) < 0) {
          if (elems[i].disabled != !enabled) {
            changed = true;
            if (elems[i].type == 'text' || elems[i].type == 'textarea') {
              // Set the background. Actually, I'd like to just reset it to whatever the
              // default was, but setting it to null doesn't do anything in IE6... We
              // force a light gray for disabled fields since IE6 doesn't have a real
              // visual "disabled" indicator for input fields.
              try {
                elems[i].style.backgroundColor = (enabled ? '#FFFFFF' : '#EEEEEE');
              } catch (some_error) {
                // Swallow
              }
            }
            elems[i].disabled = !enabled;
          }
        }
      }
    }
    if (changed) {
      // Clear warning messages. If we disabled fields, they're obsolete; if we enabled fields,
      // new warnings will be generated upon submit if necessary.
      var my_warning = document.getElementById ('wpUploadVerifyWarning');
      if (my_warning != null) my_warning.style.display = 'none';
    }
  },

  previous_hotcat_state : null,

  getPrevValue : function (stored_form, element_id)
  {
    // Return a field's previous value, if known
    if (   stored_form == null || stored_form.length <= 1
        || element_id == null || element_id.length == 0)
      return null;
    for (var i = 1; i < stored_form.length; i++) {
      if (stored_form[i] != null && element_id == stored_form[i].id)
        return stored_form[i].val;
    }
    return null;
  },

  license_button          : null,
  license_button_shown    : false,
  current_license_preview : '&nbsp;',

  get_license_preview : function () // Tooltip callback
  {
    var div = document.createElement ('div');
    div.style.display = 'none';
    document.body.appendChild (div);
    div.innerHTML = UploadForm.current_license_preview;
    document.body.removeChild (div);
    div.style.fontSize = 'smaller';
    div.style.display  = "";
    var wrapper = document.createElement ('div');
    wrapper.appendChild (div);
    return wrapper;
  },

  create_license_button : function ()
  {
    // Will be called only from our rewritten wgUploadLicenseObj.showPreview, i.e.
    // we *know* that we *do* have Tooltips and Buttons here.
    var previewButton =
      UploadForm.customFormButton
        (  'wpUploadFormPreviewLicenseButton' // Customization ID
         , 'wpUploadPreviewLicense'           // ID of button
         , null                               // Default text
         , null                               // Event handler, will be set below
         , 'wpPreviewLicenseUploadLbl'        // default label ID
          );
    var tooltip =
      new Tooltip
        (  previewButton
         , UploadForm.get_license_preview
         , { activate     : Tooltip.CLICK
            ,deactivate   : (UFHelp.help_close_imgs
                             ? Tooltip.CLICK_ELEM
                             : Tooltip.CLICK_TIP|Tooltip.CLICK_ELEM|Tooltip.LOSE_FOCUS)
            ,close_button : UFHelp.help_close_imgs
            ,mode         : Tooltip.FIXED
            ,anchor       : Tooltip.TOP_LEFT
            ,fixed_offset : {x:10, y: 5, dy: -1}
            ,open_delay   : 0
            ,hide_delay   : 0
           }
         , UFHelp.tooltip_styles
        );                            
    UploadForm.license_button = previewButton;
  },

  setup_license_preview : function ()
  {
    var preview_panel = document.getElementById ('mw-license-preview');
    UFUtils.convert_td_div (preview_panel);
    // Change the license previewer to not overwrite our warning message, if any.
    if (   typeof (wgUploadLicenseObj) != 'undefined'
        && typeof (wgUploadLicenseObj.showPreview) != 'undefined'
        && typeof (Tooltip) != 'undefined') {

      wgUploadLicenseObj.showPreview = 
        function (preview)
        {
          var preview_panel = document.getElementById ('mw-license-preview');
          if (preview_panel == null) return;
          if (preview == UploadForm.current_license_preview) return;

          UploadForm.current_license_preview = preview;
          var contents = null;
          var new_state = false;
          if (!preview || preview.length == 0 || preview == '&nbsp;') {
            contents = document.createTextNode ('\xa0'); // a single &nbsp;
            new_state = false;
          } else {
            if (!UploadForm.license_button) {
              UploadForm.create_license_button ();
            }
            if (!UploadForm.license_button_shown)
              contents = UploadForm.license_button;
            new_state = true;
          }
          if (contents && new_state != UploadForm.license_button_shown) {
            if (preview_panel.firstChild)
              preview_panel.replaceChild (contents, preview_panel.firstChild);
            else
              preview_panel.appendChild (contents);
          }
          UploadForm.license_button_shown = new_state;
        }; // end function
    }
  },

  preview_tooltip : null, // Tooltip, if preview so configured
  do_preview      : null, // Function to call to actually generate the preview
  
  addPreviewButton : function (handler)
  {
    var request = sajax_init_object ();
    // If we don't have Ajax, our preview won't work anyway.
    if (request == null) return;
    
    var uploadButton = document.getElementsByName ('wpUpload')[0]; // Has no ID...
    // If we can't find the upload button, we don't know where to insert the preview button.
    if (uploadButton == null) return;

    try {
      var previewButton =
        UploadForm.customFormButton
          (  'wpUploadFormPreviewButton' // Customization ID
           , 'wpUploadPreview'           // ID of button
           , null                        // Default text
           , UploadForm.generatePreview  // Event handler
           , 'wpPreviewUploadLbl'        // default label ID
          );
      if (   UploadForm_page_preview_in_tooltip
          && typeof (Tooltip) != 'undefined') {
        UploadForm.preview_tooltip =
          new Tooltip (  previewButton
                       , UploadForm.getPreview
                       , {  activate     : Tooltip.NONE // We'll show it manually in generatePreview.
                          , deactivate   : Tooltip.CLICK_TIP
                          , close_button : UFHelp.help_close_imgs
                          , mode         : Tooltip.FIXED
                          , target       : uploadButton
                          , anchor       : Tooltip.TOP_LEFT
                          , fixed_offset : {x:0, y: 5, dy:-1}
                          , open_delay   : 0
                          , hide_delay   : 0
                         }
                       , UFHelp.tooltip_styles
                      );
      }
      UploadForm.do_preview = handler;
      previewButton.setAttribute ('style', 'margin-left: 0.5em;');
      uploadButton.parentNode.insertBefore (previewButton, uploadButton.nextSibling);
    } catch (ex) {
    }
  },

  getOwnWorkAuthor : function ()
  {
    if (   typeof (UploadForm_ownwork_author) == 'string'
        && UploadForm_ownwork_author.search (/\S/) >= 0) {
      // It's a non-empty string
      return UploadForm_ownwork_author;
    } else {
      return '\[\[User:' + wgUserName + '|' + wgUserName + '\]\]';
    }
  },

  getOwnWorkSource : function ()
  {
    var text   = UFUI.getLabel ('wpOwnWorkUploadLbl', true);
    var result = null;
    try {
      // Must have a text node. IE6 doesn't know Node.TEXT_NODE...
      while (text && text.nodeType != 3) text = text.firstChild;
      if (text) result = text.data.replace (/^\s+/, "").replace (/\s+$/, "");
    } catch (ex) {
      result = null;
    }
    if (!result) result = 'Own work by ' + UploadForm.getOwnWorkAuthor ();
    return result;
  },

  customFormButton : function (ui_id, id, default_text, handler, default_id)
  {
    function getButtonSpan (container, idx)
    {
      if (!container) return null;
      var spans = container.getElementsByTagName ('span');
      var span  = null;
      if (!spans || spans.length <= idx) {
        // No spans... if idx is zero, try simply to take the first text node within container.
        if (idx == 0) span = container;
      } else {
        span = spans[idx];
      }
      // Ok, let's see if we have some text... IE6 doesn't know Node.TEXT_NODE!
      while (span && span.nodeType != 3) span = span.firstChild;
      if (span) return span.data.replace (/^\s+/, "").replace (/\s+$/, "");
      return null;
    }
    
    function getDefault (default_text, default_id)
    {
      if (!default_text) {
        if (default_id) {
          var default_text = UFUI.getLabel (default_id, true);
          // Must have a text node
          while (default_text && default_text.nodeType != 3) // IE6 doesn't know Node.TEXT_NODE
            default_text = default_text.firstChild;
          if (default_text)
            default_text = default_text.data.replace (/^\s+/, "").replace (/\s+$/, "");
        } else
          default_text = 'X'; // Hmmm... a serious misconfiguration
      }
      return default_text;
    }

    var button = null, imgs = null;
    button = UFUI.getEntry (ui_id, 'uiElements', UFUI.internalLanguage);
    if (!button) button = UFUI.getEntry (ui_id, 'uiElements');
    if (button) imgs = button.getElementsByTagName ('img');
    if (!imgs || imgs.length == 0 || typeof (Buttons) == 'undefined') {
      var buttonText = null;
      var buttonText = getButtonSpan (button, 0);
      if (!buttonText) buttonText = getDefault (default_text, default_id);
      var alternateText = getButtonSpan (button, 1);
      button = document.createElement ('input');
      button.setAttribute ('id', id);
      button.setAttribute ('name', id);
      button.type    = 'button';
      button.value   = buttonText;
      if (alternateText) button.title   = alternateText;
      button.onclick = handler;
    } else {
      button = Buttons.makeButton (imgs, id, handler);
    }
    return button;
  },
  
  the_form : null,

  // If a needed script that is included hasn't loaded yet, we try at most install_max_attempts
  // times install_delay. If it then still has not loaded, we install all the same, and the
  // setup routine will have to deal with it. (Note that script loading is asynchronous!)
  install_delay        : 500, // Milliseconds
  install_attempts     : 0,
  install_max_attempts : 5,   // Five times: maximum delay 2.5s

  really_install : function (force_basic)
  {
    UploadForm.install_attempts++;
    if (UploadForm.install_attempts <= UploadForm.install_max_attempts &&
        (   typeof (LanguageHandler) == 'undefined'
         || typeof (UIElements) == 'undefined'
         || typeof (Tooltips) == 'undefined')) {
      // Add needed scripts in the condition above.
      window.setTimeout (UploadForm.really_install, UploadForm.install_delay);
    } else {
      UFUI.sanitizeUserLanguage ();
      var use_basic = force_basic || !!UploadForm_forcebasic || UFUI.isExperienced;
      if (use_basic && !force_basic) {
        // Only for autoconfirmed users!
        var is_auto = false;
        for (var i = 0; i < wgUserGroups.length && !is_auto; i++)
          is_auto = wgUserGroups[i] == 'autoconfirmed';
        if (!is_auto) use_basic = false;
      }
      try {
        UFHelp.precreate_tooltip_closer ();
        UploadForm.setFileExtensions ();
        if (   use_basic
            || document.URL.indexOf ('uploadformstyle=basic') >= 0
            || document.URL.search (/uselang\=(\w|-)*fromwikimedia/) >= 0) {
          // The fromwikimedia forms are special enough to warrant a special setup.
          UploadFormBasic.setup (!force_basic);
        } else {
          UploadFormFull.setup ();
        }
        UploadForm.setup_error_display ();
        UploadForm.setup_hotcat_label ();
        UFHelp.setupHelp (UploadForm.isReupload);
        if (!UploadForm.isReupload) UFFixes.fixAutocompletion ();
        UploadForm.setupOverwriteMsg ();
        // Handle the "Upload new version" links, these have &wpDestFile=... in the URL, which
        // defeats overwrite detection. Because someone might construct such a URL manually
        // *not* actually overwriting an existing file, we still do the check:
        if (!UploadForm.isReupload) UploadForm.check_initial_dest_file (); 
      } catch (ex) {
        // Not good at all. Something went badly wrong. If we have already modified the form,
        // the best thing is probably to reload and make sure we don't try again:
        if (UploadForm.formModified) {
          var reload_url = document.URL;
          reload_url = reload_url
                     + ((reload_url.indexOf ('?') >= 0) ? '&' : '?')
                     + 'uploadformstyle=plain';
          window.location.href = reload_url;
        }
      }
    }
  },

  install : function ()
  {
    if (UploadForm.isInstalled) return; // Do this only once per page!
    UploadForm.isInstalled = true;

    if (document.URL.indexOf ('uploadformstyle=plain') >= 0) return; // We're disabled

    // Also don't do anything if we're not on an upload form.
    if (wgCanonicalNamespace != 'Special' || wgCanonicalSpecialPageName != 'Upload') return;         
    var form =    document.getElementById ('upload')
               || document.getElementById ('mw-upload-form');
    var original_desc = document.getElementById ('wpUploadDescription');
    if (!form || !original_desc) return; // Oops. Not good: bail out; don't do anything.

    var reupload = document.getElementById ('wpForReUpload');
    var destFile = document.getElementById ('wpDestFile');
    if (reupload)
      UploadForm.isReupload = !!reupload.value;
    else {
      UploadForm.isReupload = destFile && (destFile.disabled || destFile.readOnly);
    }
    if (destFile && !!destFile.disabled) {
      destFile.readOnly = true;
      destFile.disabled = false;
    }
    if (destFile && UploadForm.isReupload) {
      destFile.onkeyup = function (evt) {};
      destFile.onchange = function (evt) {};
    }
    // Use the basic form if the description was set *initially*, or if it's a re-upload, or if it's a special
    // form
    var use_basic =
         (original_desc.defaultValue != null && original_desc.defaultValue.length > 0)
      || UploadForm.isReupload
      || document.URL.indexOf ('uselang=nlwikilovesmonuments') > 0
    ;

    UploadForm.the_form = form;
    if (document.URL.indexOf ('debug=true') >= 0) UploadForm.debug = true;
    UploadForm.really_install (use_basic);
  },

  check_initial_dest_file : function ()
  {
    var dest_file = document.getElementById ('wpDestFile');
    if (   dest_file && dest_file.value && dest_file.value.length > 0
        && wgUploadWarningObj && typeof (wgUploadWarningObj.keypress) == 'function')
    {
      wgUploadWarningObj.keypress();
    }
  },

  errorMsgs      : null,
  warning_pushed : false,

  display_errors : function ()
  {
    // Give user feedback about what is not ok.      
    var my_warning = document.getElementById ('wpUploadVerifyWarning');
    if (my_warning == null) {
      // Find the upload button
      var uploadButton = document.getElementsByName ('wpUpload');
      var warningBox   = null;
      if (uploadButton) uploadButton = uploadButton[0];
      if (!uploadButton) {
        warningBox = document.getElementById ('wpDestFile-warning');
        if (!warningBox) return; // We just have the field colors to indicate errors...
      }
      my_warning = document.createElement ('div');
      my_warning.style.border = '1px #FF0000 solid';
      my_warning.style.backgroundColor = UploadForm.errorColor;
      my_warning.style.padding = '0.5em';
      my_warning.style.marginTop = '0.5em';
      my_warning.style.marginBottom = '0.5em';
      my_warning.setAttribute ('id', 'wpUploadVerifyWarning');
      my_warning.setAttribute ('width', '100%');
      my_warning.style.display = 'none';
      if (uploadButton) {
        uploadButton.parentNode.insertBefore (my_warning, uploadButton);
      } else {
        warningBox.parentNode.insertBefore (my_warning, warningBox.nextSibling);
      }
    }
    // Now collect all the error messages into one div.
    var msgs = document.createElement ('ul');
    msgs.style.paddingLeft = '1.0em';
    msgs.style.marginLeft = '0';
    for (var i = 0; i < UploadForm.errorMsgs.length; i++) {
      var msg = UFUI.getErrorMsg (UploadForm.errorMsgs[i]);
      if (msg) {
        var li = document.createElement ('li');
        li.appendChild (msg);
        msgs.appendChild (li);
      }
    }
    delete UploadForm.errorMsgs;
    UploadForm.errorMsgs = null;
    // And then display the messages
    if (my_warning.firstChild != null)
      my_warning.replaceChild (msgs, my_warning.firstChild);
    else
      my_warning.appendChild (msgs);
    my_warning.style.display = 'block';
  },

  call_onsubmit : function (evt)
  {
    var do_submit = true;
    if (UploadForm.oldOnSubmit != null) {
      if (typeof UploadForm.oldOnSubmit == 'string')
        do_submit = eval (UploadForm.oldOnSubmit);
      else if (typeof UploadForm.oldOnSubmit == 'function')
        do_submit = UploadForm.oldOnSubmit (evt);
    }
    return do_submit;
  },
  
  templates: [
   {name          : 'information',
    fields        : ['Description', 'Source', 'Date', 'Author', 'Permission', 'other_versions'],
    extract       : [3, 1, 0],    
    desc_mandatory: true,
    regexp        : null
   },
   {name          : 'painting',
    fields        : ['Artist', 'Title', 'Year', 'Technique', 'Dimensions', 'Gallery',
                     'Location', 'Notes', 'Source', 'Permission',
                     'other_versions', 'Other versions'],
    extract       : [0, 8, 7],    
    desc_mandatory: false,
    regexp        : null
   },
   {name          : 'flickr',
    fields        : ['description', 'flickr_url', 'title', 'taken', 'photographer_url',
                     'photographer', 'photographer_location', 'reviewer', 'permission'],
    extract       : [new Array (5, 4), 1, 0],    
    desc_mandatory: true,
    regexp        : null
   }
  ],

  empty_template : function (name)
  {
    if (name == null) return null;
    var test_name = name.toLowerCase ();
    for (var i = 0; i < UploadForm.templates.length; i++) {
      if (UploadForm.templates[i].name == test_name) {
        var result = '\{\{' + name;
        for (var j = 0; j < UploadForm.templates[i].fields.length; j++) {
          result = result + '\n|' + UploadForm.templates[i].fields[j] + '=';
          if (UFUI.isOwnWork && i == 0) {
            // Pre-fill some fields if we're on an own-work form and it's an
            // information-template
            switch (j) {
              case 1: // Source-field
                result = result + UploadForm.clean (UploadForm.getOwnWorkSource ());
                break;
              case 2: // Date
                if (typeof (UploadForm_ownwork_date) == 'string'
                    && UploadForm_ownwork_date.search (/\S/) >= 0) {
                  result = result + UploadForm.clean (UploadForm_ownwork_date);
                }
                break;
              case 3: // Author
                result = result + UploadForm.clean (UploadForm.getOwnWorkAuthor ());
                break;
              default:
                break;
            } // end switch
          } // end if information for ownWork
        }
        return result + '\n\}\}';
      }
    }
    return null;
  },

  extract_fields : function (desc, template_idx, list)
  {
    function get (desc, field, regexp)
    {
      var match_start = new RegExp ('\\n\\s*\\| *' + field + ' *\\=');
      var start = desc.match (match_start);
      if (start == null) return null;
      var rest = desc.substring (start.index + start[0].length);
      var end = rest.search (regexp);
      if (end < 0) return rest;
      return rest.substring (0, end);
    }

    var result  = list;
    var names   = UploadForm.templates[template_idx].fields;
    var extract = UploadForm.templates[template_idx].extract;
    if (UploadForm.templates[template_idx].regexp == null) {
      // Build the regexp
      var regexp_str = '\\n\\s*(\\| *(' + names.join ('|') + ') *\\=|\\}\\})';
      UploadForm.templates[template_idx].regexp = new RegExp (regexp_str);
    }
    for (var i = 0; i < extract.length; i++) {
      var txt = null;
      if (extract[i].constructor == Array) {
        // It's an array giving alternatives...
        var alternatives = extract[i];
        for (var j = 0; j < alternatives.length; j++) {
          txt = get (desc, names [alternatives[j]], UploadForm.templates[template_idx].regexp);
          if (txt != null && txt.search (/\S/) >= 0) break; // Non-empty: don't look further
          txt = null;
        }
      } else {
        txt = get (desc, names [extract[i]], UploadForm.templates[template_idx].regexp);
      }
      if (txt != null) result[result.length] = txt; // Push one.
      // Don't use "if (txt)", it's false if the string is != null, but empty!
    }
    return result;
  },

  split_description : function (desc)
  {
    if (desc == null || desc.length == 0) return null;
    // Returns an array containing (in that order):
    // index of template, author, source, description
    for (var i = 0; i < UploadForm.templates.length; i++) {
      var regexp = new RegExp ('\\{\\{' + UploadForm.templates[i].name + '\\s*(\\||\\n)');
      var start = desc.toLowerCase ().search (regexp);
      if (start >= 0) {
        var result = new Array (1);
        result[0] = i;
        // Now try to extract the fields:
        return UploadForm.extract_fields (desc.substring (start), i, result);
      }
    }
    return null;
  },

  generatePreview : function (evt)
  {
    if (   UploadForm.preview_tooltip
        && UploadForm.preview_tooltip.popup.style.display != 'none'
        && UploadForm.preview_tooltip.popup.style.display != null) {
      UploadForm.preview_tooltip.hide_now (null);
    } else {
      UploadForm.do_preview (evt || window.event);
    }
  },

  outerHTML : function (node)
  {
    if (!node) return "";
    if (node.nodeType == 3) return node.nodeValue; // Text node
    if (node.outerHTML) return node.outerHTML;
    var div = document.createElement ('div');
    div.style.display    = 'none';
    div.style.position   = 'absolute';
    div.appendChild (node);
    document.body.appendChild (div);
    var txt = div.innerHTML;
    document.body.removeChild (div);
    return txt;
  },

  makePreview : function (description, is_overwrite)
  {
    if (is_overwrite) {
      UploadForm.showPreview (
          '\<div style="border:1px solid red; padding:0.5em;"\>'
        + '\<div class="previewnote"\>'
        + UploadForm.outerHTML (UFUI.getErrorMsg ('wpPreviewOverwriteError'))
        + '\<\/div\>'
        + '\<\/div\>'
      );
    } else {
      var text = '\<div style="border:1px solid red; padding:0.5em;"\>\n'
               + '\<div class="previewnote"\>\n'
               + '\{\{MediaWiki:Previewnote/' + UFUI.userLanguage +'\}\}\n'
               + '\<\/div>\n';
      var license = document.getElementById ('wpLicense');
      var license_text = null;
      if (   license != null && license.selectedIndex > 0
          && license.options[license.selectedIndex].value.length > 0) {
        license_text = '\{\{' + license.options[license.selectedIndex].value + '\}\}';
      }
      if (license_text) {
        text = text
             + '\<h2\>\{\{int:filedesc\}\}\<\/h2\>\n'
             + description + '\n'
             + '\<h2\>\{\{int:license-header\}\}\<\/h2\>\n'
             + license_text;
      } else {
        text = text + description + '\n';
      }
      // Add categories
      if (typeof (hotcat_get_state) == 'function') {
        var input = document.getElementById ('hotcat_text');
        if (input != null) hotcat_closeform ();
        var hotcat_categories = hotcat_get_state ();
        if (hotcat_categories && hotcat_categories.length > 0) {
          hotcat_categories = hotcat_categories.split ('\n');
          for (var i=0; i < hotcat_categories.length; i++) {
            if (hotcat_categories[i] && hotcat_categories[i].length > 0)
              text = text + '[[Category:' + hotcat_categories[i] + ']]';
          }
        }
      }
      text = text + '\<\/div\>';

      // Make the Ajax call
      var req = sajax_init_object ();
      if (!req) return;
      var button = document.getElementById ('wpUploadPreview');
      var page   = document.getElementById ('wpDestFile');
      if (page) page = page.value;
      if (page != null && page.length == 0) page = null;
      if (button && typeof (injectSpinner) == 'function')
        injectSpinner (button, 'wpUploadPreviewSpinner');
      var uri  = wgServer + wgScriptPath + '/api.php';
      var args = 'action=parse&pst&text=' + encodeURIComponent (text)
               + (page ? '&title=File:' + encodeURIComponent (page.replace (/ /g, '_')) : "")
               + '&prop=text|categories&format=json';
      // "&pst" is "Pre-save transform": tilde replacement, pipe magic for links like [[foo|foo]].
      // Don't use a callback directly, add the function call ourselves *after* the call, since
      // the API somehow resolves tildes to an IP number instead of the username if a callback
      // is used. C.f. https://bugzilla.wikimedia.org/show_bug.cgi?id=16616
      // Apparently, that's a feature, not a bug...
      var request_length = uri.length + args.length + 1;
      if (request_length > 2000) {
        // Long URLs are problematic for GET requests
        req.open ('POST', uri, true);
        req.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
      } else {
        uri += '?' + args; args = null;
        req.open ('GET', uri, true);
      }
      req.setRequestHeader ('Pragma', 'cache=no');
      req.setRequestHeader ('Cache-Control', 'no-transform');
      req.onreadystatechange =
        function ()
        {
          if (req.readyState != 4) return;
          if (typeof (removeSpinner) == 'function') removeSpinner ('wpUploadPreviewSpinner');
          if (req.status != 200) return;
          // Add the "callback"...
          if (req.responseText && req.responseText.indexOf ('{') == 0)
            // Primitive sanity check. If the response text does *not* start with '{', it might have been
            // spoofed and contain a function call... of course, this simple check cannot catch more
            // elaborate spoof attempts.
            eval ('UploadForm.jsonPreview (' + req.responseText + ')');
        };
      req.send (args);
    }
  },

  jsonPreview : function (result)
  {
    if (result && result.parse && result.parse.text && result.parse.text['*'] != null) {
      var txt = result.parse.text['*'];
      var categories = result.parse.categories;
      if (categories && categories.length > 0) {
        // Add a mock-up of a category bar. We don't care about non-existing categories, and we
        // can't identify hidden categories.
        var catbar = '<div class="catlinks"><div id="mw-normal-catlinks">'
                   + UploadForm.outerHTML (UFUI.getLabel ('wpCategoriesUploadLbl'));
        categories.sort (
          function (a, b) {
            var key_a = a['*'].toLowerCase (), key_b = b['*'].toLowerCase ();
            if (key_a < key_b) return -1;
            if (key_a > key_b) return 1;
            return 0;
          }
        );
        for (var i = 0; i < categories.length; i++) {
          var catname = categories[i]['*'];
          if (catname && catname.length > 0) {
            if (i > 0) catbar += ' |';
            catbar += ' <a href="/wiki/Category:' + encodeURI (catname) + '">'
                      + catname.replace(/_/g, ' ') + '</a>';
          }
        }
        catbar += '</div></div>';
        // Now insert it into text.
        var end = txt.lastIndexOf ('</div>');
        txt = txt.substring (0, end) + catbar + '</div>';
      }
      UploadForm.showPreview (txt);
    }
  },

  showPreview : function (result)
  {
    if (UploadForm.preview_tooltip) {
      UploadForm.preview_content = result;
      UploadForm.preview_tooltip.show_tip (null, false);
    } else {
      var preview = document.getElementById ('wpUploadPreviewDisplay');
      if (preview == null) {
        var before = document.getElementById ('mw-upload-permitted');
        if (!before || UFUtils.isChildOf (before, UploadForm.the_form))
          before = UploadForm.the_form;
        if (!before) return; // Don't know where to insert preview display. Error message here?
        preview = document.createElement ('div');
        preview.setAttribute ('id', 'wpUploadPreviewDisplay');
        before.parentNode.insertBefore (preview, before);
      }
      try {
        preview.innerHTML = result;
      } catch (ex) {
        preview.innerHTML = ""; // Error message here instead?
      }
      preview.style.display = ""; // Show it 
    }
  },

  hidePreview : function ()
  {
    if (UploadForm.preview_tooltip)
      UploadForm.preview_tooltip.hide_now (null);
    else {
      var preview = document.getElementById ('wpUploadPreviewDisplay');
      if (preview) preview.style.display = 'none';
    }
  },

  getPreview : function () // Callback for the tooltip
  {
    var div = document.createElement ('div');
    div.style.display = 'none';
    document.body.appendChild (div);
    div.innerHTML = UploadForm.preview_content;
    document.body.removeChild (div);
    div.style.fontSize = 'smaller';
    div.style.display = "";
    var wrapper = document.createElement ('div');
    wrapper.appendChild (div);
    return wrapper;
  },

  licenses_regexp     :
    /\{\{(self|pd|gfdl|cc|l?gpl|fal|cecill|attribution|copyrighted free use|SOlicence|geograph|UN map|BArch-License)/i,
  user_license_regexp :
    new RegExp (  '\\{\\{[Ss]ubst:[Uu]ser:'
                + (wgUserName || "null").replace(/([\\\^\$\.\?\*\+\(\)\[\]\|\{\}])/g, "\\$1")
                + '/'),

  has_license : function (fields)
  {
    if (fields == null || fields.length == 0) return false;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] != null) {
        if (typeof (fields[i]) == 'string') {
          if (fields[i].search (UploadForm.licenses_regexp) >= 0) return true;
        } else {
          if (fields[i].value.search (UploadForm.licenses_regexp) >= 0) return true;
        }
      }
    }
    for (var j = 0; j < fields.length; j++) {
      if (fields[j] != null) {
        if (typeof (fields[j]) == 'string') {
          if (fields[j].search (UploadForm.user_license_regexp) >= 0) return true;
        } else {
          if (fields[j].value.search (UploadForm.user_license_regexp) >= 0) return true;
        }
      }
    }
    return false;
  },

  addAfterField : function (elem_id, element)
  {
    if (!element) return;
    var elem = document.getElementById (elem_id);
    if (!elem) return;
    // Find enclosing table cell.
    while (elem && elem.nodeName.toLowerCase () != 'td') elem = elem.parentNode;
    if (!elem) return;
    var container = document.createElement ('div');
    container.style.fontSize = 'smaller';
    container.appendChild (element);
    elem.appendChild (container);
  },

  old_overwrite_warning : null,

  setupOverwriteMsg : function ()
  {
    if (   typeof (wgUploadWarningObj) == 'undefined'
        || typeof (wgUploadWarningObj.setWarning) == 'undefined')
      return;
    var msg = document.createElement ('div');
    msg.id = 'wpUploadFormScriptOverwriteWarning';
    msg.style.display = 'none';
    msg.style.color = 'red';
    msg.appendChild (UFUI.getErrorMsg ('wpPreviewOverwriteError'));
    UploadForm.addAfterField ('wpDestFile', msg);
    UploadForm.old_overwrite_warning = wgUploadWarningObj.setWarning;    
    wgUploadWarningObj.setWarning = UploadForm.overwriteMsg;
  },

  overwriteMsg : function (warning)
  {
    if (!UploadForm.old_overwrite_warning || UploadForm.isReupload) return;
    // Make sure that 'this' is set to 'wgUploadWarningObj' in the call below!
    UploadForm.old_overwrite_warning.apply (wgUploadWarningObj, [warning]);
    var is_overwrite = UploadForm.isOverwrite ();
    var my_overwrite_warning = document.getElementById ('wpUploadFormScriptOverwriteWarning');
    if (my_overwrite_warning) {
      my_overwrite_warning.style.display = (is_overwrite ? "" : 'none');
    }
    UploadForm.set_fields_enabled
      (!is_overwrite
       , [  'wpUploadFile', 'wpDestFile', 'wpUploadDescription', 'wpAdditionalInfo'
          , 'wpLicense', 'wpWatchthis', 'wpIgnoreWarning', 'wpUpload']
      );
  },

  isOverwrite : function ()
  {
    if (document.getElementById ('wpUploadWarningFileexists') != null) return true;
    var destfile_warning = document.getElementById ('wpDestFile-warning');
    if (destfile_warning == null) return false;
    var dest_file = document.getElementById ('wpDestFile');
    if (dest_file == null || dest_file.value == null || dest_file.value.length == 0) return false;
    var lks = destfile_warning.getElementsByTagName ('a');
    if (lks == null || lks.length == 0) return false;

    var fn1 =
      dest_file.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/ /g, '_');
    fn1     = fn1.substr (0, 1).toUpperCase () + fn1.substring (1);
    var fn0 = 'Image:' + fn1;
    fn1     = 'File:' + fn1;
    // Trimmed, blanks replaced by underscores, first character capitalized

    for (var i = 0; i < lks.length; i++) {
      var href = lks[i].getAttribute ('href', 2);
      if (href.indexOf (wgScript) == 0 || href.indexOf (wgServer + wgScript) == 0) {
        var m = /[&?]title=([^&]*)/.exec (href);
        if (m && m.length > 1) href = m[1]; else href = null;
      } else {
        var prefix = wgArticlePath.replace ('$1', "");
        if (href.indexOf (prefix) != 0) prefix = wgServer + prefix; // Fully expanded URL?
        if (href.indexOf (prefix) == 0) href = href.substring (prefix.length); else href = null;
      }
      if (!href) continue;
      href = decodeURIComponent (href).replace (/ /g, '_');
      if (href == fn0 || href == fn1) return true;
    }
    return false;
  },

  allowedFileTypes : null,
  forbiddenFileTypes : null,
        
  badFileNames : /^(test|image|img|bild|example|(dsc|img)?(\s|_|-)*|\d{10}(\s|_|-)[0123456789abcdef]{10}(\s|_|-)[a-z])$/i,
  // Filenames that have only components (separated by periods) that fully match this regexp
  // are considered illegal. The second-but-last one catches DSC01234, or DSC_01234, or
  // DSC_012_34 or also filenames conatining only digits and non-alphanumeric characters.
  // The last catches Flickr's raw filenames. How to relax that last expression without catching
  // too many legit file names?
  // Matching is case-insensitive.

  extractFileExtensions : function (div, list)
  {
    var list = null;
    // Get a mw-upload-permitted or mw-upload-prohibited div, extracts all extensions listed
    var txt = div;
    while (txt && txt.nodeType != 3) txt = txt.lastChild;
    if (!txt) return null;
    // Try to figure out which comma to use (localizeable through MediaWiki:Comma-separator!)
    if (txt.data.indexOf (',') >= 0) // Standard
      txt = txt.data.split (',');
    else if (txt.data.indexOf ('،') >= 0) // Arabic etc.
      txt = txt.data.split ('،');
    else if (txt.data.indexOf ('、') >= 0) // Chinese
      txt = txt.data.split ('、');
    else
      return null;
    if (!txt || txt.length == 0) return null;
    for (var i = 0; i < txt.length; i++) {
      var match = /(\w+)\W*$/.exec (txt[i]);
      if (match) {
        match = match[1].toLowerCase (); // The extension
        if (list == null) list = {};
        list[match] = true;
      }
    }
    return list;
  },

  setFileExtensions : function ()
  {
    if (typeof (wgFileExtensions) != 'undefined' && wgFileExtensions.length) { // New as of 2009-09-17
      UploadForm.allowedFileTypes = {};
      for (var i = 0; i < wgFileExtensions.length; i++) {
        UploadForm.allowedFileTypes[wgFileExtensions[i]] = true;
      }
      UploadForm.forbiddenFileTypes = null;
      return;
    }

    UploadForm.allowedFileTypes =
      UploadForm.extractFileExtensions (document.getElementById ('mw-upload-permitted'));
    UploadForm.forbiddenFileTypes =
      UploadForm.extractFileExtensions (document.getElementById ('mw-upload-prohibited'));
    if (UploadForm.allowedFileTypes != null) {
      // Alternate OGG extensions
      if (UploadForm.allowedFileTypes.ogg) {
        if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.ogv)
          UploadForm.allowedFileTypes.ogv = true;
        if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.oga)
          UploadForm.allowedFileTypes.oga = true;
        if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.ogx)
          UploadForm.allowedFileTypes.ogx = true;
      }
      // OpenDoc extensions (are these needed?)
      if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.sxi)
        UploadForm.allowedFileTypes.sxi = true;
      if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.sxc)
        UploadForm.allowedFileTypes.sxc = true;
      if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.sxd)
        UploadForm.allowedFileTypes.sxd = true;
      if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.sxw)
        UploadForm.allowedFileTypes.sxw = true;
      // PDF (allowed, but may be hidden in the interface)
      if (UploadForm.forbiddenFileTypes == null || !UploadForm.forbiddenFileTypes.pdf)
        UploadForm.allowedFileTypes.pdf = true;
    }
  },

  checkFileExtension : function (ext, presence_only)
  {
    if (presence_only)
      return   (UploadForm.allowedFileTypes != null && UploadForm.allowedFileTypes[ext] == true)
            || (UploadForm.forbiddenFileTypes != null && UploadForm.forbiddenFileTypes[ext] == true);
    return    (UploadForm.allowedFileTypes == null || UploadForm.allowedFileTypes[ext] == true)
           && (UploadForm.forbiddenFileTypes == null || !(UploadForm.forbiddenFileTypes[ext] == true));
  },

  verifyFileName : function (filename)
  {
    if (filename == null || filename.length == 0) {
      UploadForm.errorMsgs.push ('wpNoFilenameError');
      return false;
    }
    if (filename.search (/(https?|file|ftp):\/\//i) >= 0) {
      UploadForm.errorMsgs.push ('wpHttpFilenameError');
      return false;
    }
    var ok = true;

    // Don't allow slashes
    if (filename.indexOf ('/') >= 0) {
      UploadForm.errorMsgs.push ('wpNoSlashError');
      ok = false;
    }
    // Check for double extensions
    var fn = filename.split ('.');
    if (fn.length < 2 || fn[fn.length-1].length == 0) {
      UploadForm.errorMsgs.push ('wpNoExtensionError');
      ok = false;
    }
    // Check extension
    var nof_extensions = 0;
    if (fn.length >= 2) {
      nof_extensions++;
      if (UploadForm.checkFileExtension (fn[fn.length-1].toLowerCase ())) {
        // It's ok, check for double extension
        if (fn.length > 2) {
          if (UploadForm.checkFileExtension (fn[fn.length-2].toLowerCase (), true)) {
            nof_extensions++;
            UploadForm.errorMsgs.push ('wpDoubleExtensionError');
            ok = false;
          }
        }
      } else {
        UploadForm.errorMsgs.push ('wpIllegalExtensionError');
        ok = false;
      }
    }
    // Check for allowed file name
    var one_ok = false;
    for (var i = 0; i < fn.length - nof_extensions && !one_ok; i++) {
      if (fn[i].length > 0 && fn[i].search (UploadForm.badFileNames) < 0) one_ok = true;
    }
    if (!one_ok) {
      UploadForm.errorMsgs.push ('wpNondescriptFilenameError');
      ok = false;
    }
    return ok;
  },

  cleaner : null,

  clean : function (input)
  {
    if (UploadForm.cleaner == null) {
      // Because of asynchronous script loading, we need to check whether the TextCleaner is
      // already defined. If not, just return the input.
      if (   typeof (TextCleaner) != 'undefined'
          && typeof (TextCleaner.sanitizeWikiText) == 'function')
      {
        UploadForm.cleaner = TextCleaner.sanitizeWikiText;
      }
    }
    if (UploadForm.cleaner && input && typeof (input) == 'string')
      return UploadForm.cleaner (input, true);
    else
      return input;   
  },

  resetBg : function (evt)
  {
    var e = evt || window.event; // W3C, IE
    return UploadForm.verifyMandatoryField (e.target || e.srcElement);
  },

  verifyMandatoryField: function (node, handler)
  {
    if (!node) return true;
    try {
      if (   !node.value
          || node.value.search (/\S/) < 0
          || handler && typeof (handler) == 'function' && handler.length == 1
             && !handler (node.value))
      {
        // No value set, or a handler was given and it is a function taking one parameter, and
        // it returned false
        var is_error = node.id != 'wpPermission';
        if (!is_error) {
          var license_field = document.getElementById ('wpLicense');
          // Careful here. The fromwikimedia forms appear not to have a license selector!
          is_error = license_field == null || license_field.selectedIndex == 0
        }
        if (is_error) {
          node.style.backgroundColor = UploadForm.errorColor;
          if (!UploadForm.warning_pushed) {
            if (UploadForm.errorMsgs != null)
              UploadForm.errorMsgs.push ('wpUploadWarningError');
            UploadForm.warning_pushed = true;
          }
          return false;
        }
      }
    } catch (ex) {
      // Swallow the exception  
    }
    try {
      node.style.backgroundColor = '#FFFFFF';
    } catch (some_error) {
      // Swallow.
    }
    return true;
  },

  fixCategoryTransclusion : function (str)
  {
    return str.replace (/(\{\{)\s*(:?\s*[Cc]ategory\s*:[^|}]*(\|[^}]*)?)(\}\})/g, "[[$2]]");
  }

}; // end UploadForm

var UFFixes =
{
  fixAutocompletion : function ()
  {
    // Do the overwrite check also for selections from the browser's "previous entry list"
    var dest_file = document.getElementById ('wpDestFile');
    if (dest_file && dest_file.onkeyup) {
      // For some reason, onchange doesn't fire upon autocompletion in FF and IE6. Don't use
      // onblur (recommended as a workaround on some Internet sites), it cancels button clicks
      // that cause the focus change. Unfortunately, FF also doesn't fire the DOMAttrModified
      // event upon autocompletion. Thus we're stuck for FF. At least the FF people are about
      // to correct this bug (https://bugzilla.mozilla.org/show_bug.cgi?id=388558). On IE,
      // there is a workaround.
      if (window.ActiveXObject) { // We're on IE...
        // See http://msdn2.microsoft.com/en-us/library/ms533032.aspx and
        // http://msdn2.microsoft.com/en-us/library/ms536956.aspx
        if (!dest_file.onpropertychange) {
          previous_onkeyup_handler  = dest_file.onkeyup;
          previous_onchange_handler = dest_file.onchange;
          addEvent (dest_file, 'propertychange',
            function (evt)
            {
              var e = evt || window.event;
              if (e && e.propertyName && e.propertyName == 'value') {
                if (typeof (previous_onkeyup_handler) == 'string')
                  eval (previous_onkeyup_handler);
                else if (typeof (previous_onkeyup_handler) == 'function')
                  previous_onkeyup_handler (e);
                if (typeof (previous_onchange_handler) == 'string')
                  eval (previous_onchange_handler);
                else if (typeof (previous_onchange_handler) == 'function')
                  previous_onchange_handler (e);
              }
            });
          dest_file.onkeyup  = null; // Otherwise, both may fire...
          dest_file.onchange = null;
        }
      } else {
        addEvent (dest_file, 'change', dest_file.onkeyup);
      }
    }
  }

}; // end UFFixes

} // end if (guard against double inclusions)


// Do *not* use addOnloadHook!!! Functions added through addOnloadHook are actually executed
// *before* the onload event occurs through an inline script at the bottom of each page served
// by the WikiMedia servers. Normally, that is fine and dandy and speeds up page creation since
// the hooks may run before all elements (such as images) of the page have completely loaded.
// But it breaks our form restoration mechanism on IE. wpDestFile.value is set on IE6 only at
// the time when the onload event fires. If this script runs before, wpDestFile.value is always
// empty on IE. Since the upload form does not contain many images, it won't make a difference
// for the user if we use hookEvent and thus run a tiny little bit later. It also has the nice
// side effect that we can run even if one of the other functions registered through
// addOnloadHook raises an exception.

hookEvent ('load', UploadForm.install);

// </source>