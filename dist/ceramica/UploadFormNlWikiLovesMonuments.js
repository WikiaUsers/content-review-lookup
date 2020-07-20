// <source lang="javascript">

/*
  Special upload form for the Dutch "Wiki loves monuments" event.

  Author: [[User:Lupo]], July 2010

  License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0) 
  Choose whichever license of these you like best :-)

  For more info about "Wiki loves monuments", ask [[User:Multichill]].
*/

if (typeof (UploadFormNlWikiLovesMonuments ) == 'undefined') { // Guard against double inclusions

var UploadFormNlWikiLovesMonuments = (function () { // start scope
  
  if (document.URL.indexOf ('uploadformstyle=plain') >= 0     // All Upload JS disabled
      || getParamValue ('uselang') != 'nlwikilovesmonuments') // Not for us
    return false;

  window.UploadForm_autofill = false;
  window.UploadForm_forcebasic = true;
  if (typeof (JSconfig) != 'undefined')
    JSconfig.keys['loadAutoInformationTemplate'] = false;

  var rijksmonumentnummer = 'Rijksmonumentnummer:'; // Label text
  var rmn_id              = 'wpRijksmonumentnummer'; // Node id

  var start_attempts     = 0;
  var max_start_attempts = 5;
  
  function make_information_template (value) {
    if (value === null || typeof (value) == 'undefined') {
      var desc = document.getElementById ('wpUploadDescription');
      value = desc ? desc.value : "";
    }
    var rmn = document.getElementById (rmn_id);
    if (rmn && rmn.value && rmn.value.length > 0) {
      rmn = '\n{{Rijksmonument|' + rmn.value + '}}';
    } else {
      rmn = "";
    }
    if (/\{\{\s*[Ii]nformation\s*\n\|/.test (value)) return value; // Already has an information template?!
    if (value && value.length > 0) {
      value = '{{Information\n|Description = {{nl|1=' + UploadForm.clean (value) + '}}' + rmn;
    } else {
      value = '{{Information\n|Description = ' + rmn;
    }
    value +=
       '\n'
      +'|Source = {{own}}\n'
      +'|Author = [[User:'+ wgUserName +'|'+ wgUserName +']]\n'
      +'|Date = {{Date|2010|09|26}} (upload date)\n'
      +'}}\n'
    ;
    return value;
  }

  function do_preview (evt) {
    var overwrite = UploadForm.isOverwrite ();
    UploadForm.makePreview (make_information_template (), overwrite);
  }

  function setupHelp (label, field) {
    if (!UFUI.help) return; // Help not loaded
    var button_imgs = null;
    if (typeof (Buttons) != 'undefined') {
      button_imgs = Buttons.buttonClasses['wpUploadFormHelpOpenClass'];
    }
    var button_construct = null, button = null;
    if (button_imgs) {
      button = Buttons.makeButton ([button_imgs], rmn_id + '_HelpButton', '#');
      button.style.position = 'relative';
      button.style.top      = '-0.4em';
      button_construct      = button;      
    } else if (!button_imgs) {
      // Alternative text-based "button"
      button_construct = document.createElement ('sup');
      button_construct.appendChild (document.createElement ('b'));
      button_construct.firstChild.appendChild (document.createTextNode (' ['));
      button_construct.firstChild.appendChild (button = UFUtils.makeLink ('?', '#'));
      button_construct.firstChild.appendChild (document.createTextNode (']'));
    }
    label.appendChild (button_construct);
    var maximum_width = 0;
    var f = document.getElementById ('wpUploadDescription');
    if (f) {
      maximum_width = UFUtils.getWidth (f);
      try {
        maximum_width = Math.round (maximum_width * 0.9);
      } catch (any) {
        maximum_width = 0;
      }
    }
    var help_id = 'wpAdditionalInfoHelp';
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
              ,fixed_offset : {x:10, y: -5}
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

  function wait_for_form () {
    if (!UploadForm.formModified) {
      if (start_attempts++ < max_start_attempts) {
        window.setTimeout (wait_for_form, 200);
        return;
      }
    }
    // Here, have the full basic form set up. Find the form. 
    var theForm =    document.getElementById ('upload')
                  || document.getElementById ('mw-upload-form');
    if (!theForm) return;
    // Pass along the uselang parameter
    theForm.action += '?uselang=' + wgUserLanguage;
    var desc = document.getElementById ('wpUploadDescription');
    if (desc) {
      // Make the field smaller. Not 1 line, that may yield strange behavior with textareas.
      desc.rows = 2;
      desc.style.height = "" + (desc.rows * 1.2) + "em";
      // Find the containing table row
      while (desc && desc.nodeName.toLowerCase() != 'tr') desc = desc.parentNode;
    }
    if (desc) {
      // Insert the rijksmonumentnummer field
      var tr = document.createElement ('tr');
      var label_cell = document.createElement ('td');
      var text_cell = document.createElement ('td');
      var rmn_label = document.createElement ('label');
      rmn_label['for'] = rmn_id;
      rmn_label.appendChild (document.createTextNode (rijksmonumentnummer));
      label_cell.appendChild (rmn_label);
      var rmn_field = document.createElement ('input');
      rmn_field.type = 'text';
      rmn_field.size = 10;
      rmn_field.maxSize = 10;
      rmn_field.id = rmn_id;
      text_cell.appendChild (rmn_field);
      tr.appendChild (label_cell);
      tr.appendChild (text_cell);
      desc.parentNode.insertBefore (tr, desc);
      setupHelp (rmn_label, rmn_field); // UFHelp is not extensible enough, we'll have to roll our own here
    }
    // Remove the edittools (per request by Multichill...)
    var edittools = document.getElementById ('specialchars');
    if (edittools) {
      // Find the containing table row
      while (edittools && edittools.nodeName.toLowerCase() != 'tr') edittools = edittools.parentNode;
      if (edittools) edittools.parentNode.removeChild (edittools);
    }
    // Remove file size and permitted file types lines (per request by Multichill)
    var permitted = document.getElementById ('mw-upload-permitted');
    if (permitted) {
      // Find the containing table row
      while (permitted && permitted.nodeName.toLowerCase() != 'tr') permitted = permitted.parentNode;
      // Find the previous line
      if (permitted) {
        var prev = permitted.previousSibling;
        while (prev && prev.nodeName.toLowerCase() != 'tr') prev = prev.previousSibling;
        if (prev)
          prev.style.display = 'none';
        permitted.style.display = 'none';
      }
    }
    // Change the submit handler and the preview button's handler!
    theForm.onsubmit = (function (oldSubmit) {
      return function (evt) {
        var desc = document.getElementById ('wpUploadDescription');
        var originalText = desc.value;
        var newText = make_information_template ();
        desc.value = newText;
        var do_submit = true;
        if (oldSubmit != null) {
          if (typeof (oldSubmit) == 'string')
            do_submit = eval (oldSubmit);
          else if (typeof UploadForm.oldOnSubmit == 'function')
            do_submit = oldSubmit (evt);
        }
        if (!do_submit) {
          desc.value = originalText;
        } else {
          // Re-enable the licence field so that it'll be submitted
          var licenses = document.getElementById ('wpLicense');
          if (licenses) licenses.disabled = false;
        }
        return do_submit;
      };
    })(theForm.onsubmit);
    UploadForm.do_preview = do_preview;
    // And also select the only license present.
    var licenses = document.getElementById ('wpLicense');
    if (!licenses) return;
    var nofLicenses = licenses.options.length;
    if (licenses.selectedIndex >= 0 && licenses.selectedIndex < nofLicenses)
      licenses.options[licenses.selectedIndex].selected = false;
    licenses.options[nofLicenses-1].selected = true;
    // And then disable it. Don't remove or hide it, that will screw up other things such as the placement
    // of the help text. An alternative might be to hide he whole table row.
    licenses.disabled = true;
    // And prefill a category
    if (window.hotcat_set_state) {
      window.hotcat_set_state ('Rijksmonumenten');
    }
  }

  function init () {
    // Hook into the basic upload form (if we have that one), and replace the submit function
    if (typeof (UploadForm) == 'undefined') {
      if (start_attempts++ < max_start_attempts) {
        window.setTimeout (init, 200);
      }
      return;
    }
    // UploadForm is loaded. If it didn't run yet, run it.
    if (!UploadForm.isInstalled) UploadForm.install ();
    // Second step of initialization:
    start_attempts = 0;
    wait_for_form ();
  }

  hookEvent ('load', init); // Do not use addOnloadHook, these may get executed too early!
  
  return true;
  
})(); // end scope

} // end guard

// </source>