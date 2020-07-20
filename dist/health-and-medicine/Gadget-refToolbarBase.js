/* jshint asi: true */
/* global mw, $, CiteTB, citeTemplate, citeErrorCheck */

if ( window.CiteTB === undefined ) {
  window.CiteTB = {
    "Templates" : {}, // All templates
    "Options" : {}, // Global options
    "UserOptions" : {}, // User options
    "DefaultOptions" : {}, // Script defaults
    "ErrorChecks" : {} // Error check functions
  };
}

if (typeof mw.usability == 'undefined') {
  mw.usability = {};
  mw.usability.getMsg = function(m) { return mw.messages.get(m); }
  mw.usability.addMessages = function(msgs) { mw.messages.set(msgs); };
}

// Object for cite templates
window.citeTemplate = function (templatename, shortform, basicfields, expandedfields) {
  // Properties
  this.templatename = templatename; // The template name - "cite web", "cite book", etc.
  this.shortform = shortform; // A short form, used for the dropdown box
  this.basic = basicfields; // Basic fields - author, title, publisher...
  // Less common - quote, archiveurl - should be everything the template supports minus the basic ones
  this.extra = expandedfields;

  this.incrementables = {};

  // Add it to the list
  CiteTB.Templates[this.templatename] = this;
  // Methods
  this.makeFormInner = function(fields, incrsetup) {
    var i=0;
    var trs = [];
    var autofills = []
    for (i=0; i<fields.length; i++) {
      var fieldobj = fields[i];
      var field = labelfield = fieldobj.field;
      var ad = false;
      if (incrsetup && fieldobj.increment_group) {
      		field = fieldobj.field.replace('<N>', '1');
      		labelfield = fieldobj.field.replace('<N>', '');
      		if (this.incrementables[fieldobj.increment_group] && !this.incrementables[fieldobj.increment_group].setup) {
      			// The object has been created, but not fully initialized
      			this.incrementables[fieldobj.increment_group]['fields'].push(fieldobj)
      		} else if (!this.incrementables[fieldobj.increment_group]) {
      			// Object not yet created
      			this.incrementables[fieldobj.increment_group] = {
      				'fields': [fieldobj],
      				'val':1,
      				'setup': false
      			};
      		} else if (this.incrementables[fieldobj.increment_group] && this.incrementables[fieldobj.increment_group].setup) {
      			// Fully initialized from a previous invocation of this function, just resetting the number
      			this.incrementables[fieldobj.increment_group].val = 1
      		}
      } else if (fieldobj.increment_group) {
      	// Adding a new row
      	incrval = this.incrementables[fieldobj.increment_group].val;
      	field = fieldobj.field.replace('<N>', incrval.toString());
      	labelfield = fieldobj.field.replace('<N>', '');
      }
      if ($.inArray(field, CiteTB.getOption('autodate fields')) != -1 ) {
        im = $('<img />').attr('src', '//upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Nuvola_apps_date.svg/20px-Nuvola_apps_date.svg.png');
        im.attr('alt', mw.usability.getMsg('cite-insert-date')).attr('title', mw.usability.getMsg('cite-insert-date'));
        var ad = $('<a />').attr('href', '#');
        ad.append(im);
        ad.attr('id', 'cite-date-'+CiteTB.escStr(this.shortform)+'-'+field);
        $( document ).on( 'click', '#cite-date-'+CiteTB.escStr(this.shortform)+'-'+field, CiteTB.fillAccessdate );
      }
	  
      if (fieldobj.autofillid) {
        var autotype = fieldobj.autofillid;
        im = $('<img />').attr('src', '//upload.wikimedia.org/wikipedia/commons/thumb/1/17/System-search.svg/20px-System-search.svg.png');
        im.attr('alt', mw.usability.getMsg('cite-autofill-alt')).attr('title', mw.usability.getMsg('cite-autofill-alt'));
        var ad = $('<a />').attr('href', '#');
        ad.append(im);
        ad.attr('id', 'cite-auto-'+CiteTB.escStr(this.shortform)+'-'+field+'-'+autotype);
        autofills.push('#cite-auto-'+CiteTB.escStr(this.shortform)+'-'+field+'-'+autotype);
      }
      
      if (fieldobj.increment_button) {
        var incrtype = fieldobj.increment_group;
        im = $('<img />').attr('src', '//upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nuvola_action_edit_add.svg/20px-Nuvola_action_edit_add.svg.png');
        im.attr('alt', mw.usability.getMsg('cite-increment-alt')).attr('title', mw.usability.getMsg('cite-increment-alt'));
        var ad = $('<a />').attr('href', '#');
        ad.append(im);
        ad.attr('id', 'cite-incr-'+CiteTB.escStr(this.shortform)+'-'+incrtype);
      }
	  
      var display = mw.usability.getMsg('cite-'+labelfield+'-label');
      if (typeof display !== 'string') {
      	if (fieldobj.label) {
      		display = CiteTB.fixStr(fieldobj.label);
      	} else {
      		display = CiteTB.fixStr(labelfield)
      	}
      }
      var tooltip = fieldobj.tooltip ? $('<abbr />').attr('title', mw.usability.getMsg(fieldobj.tooltip)).html('<sup>?</sup>') : false;
      
      var input = '';
      if (ad) {
        input = $('<input tabindex="1" style="width:85%" type="text" />');
      } else {
        input = $('<input tabindex="1" style="width:100%" type="text" />');
      }
      input.attr('id', 'cite-'+CiteTB.escStr(this.shortform)+'-'+field);
	  if (fieldobj.autofillprop) {
	  	classname = 'cite-'+CiteTB.escStr(this.shortform)+'-'+fieldobj.autofillprop
	    if (fieldobj.increment_group) {
	    	input.addClass('cite-'+CiteTB.escStr(this.shortform)+'-incr-'+fieldobj.increment_group);
	    	classname+='-'+this.incrementables[fieldobj.increment_group].val.toString();
	    }
	    input.addClass(classname);
	  }
      var label = $('<label />');
      label.attr('for', 'cite-'+CiteTB.escStr(this.shortform)+'-'+field).text(display);
      if (tooltip) {
        label.append(tooltip);
      }
      var style = 'text-align:right; width:20%;';
      if (i%2 == 1) {
        style += ' padding-left:1em;';
      } else {
        var tr = $('<tr />');
      }
      var td1 = $('<td class="cite-form-td" />').attr('style', style);
      td1.append(label);
      tr.append(td1);
      var td2 = $('<td class="cite-form-td" style="width:30%" />');
      td2.append(input);
      if (ad) {
        td2.append(ad);
      }
      tr.append(td2);
      if (i%2 == 0) {
        trs.push(tr);
      }
    }
    var needsetup = false;
    for (g in this.incrementables) {
    	if (!this.incrementables[g].setup) {
    		needsetup = true;
    		$( document ).on( 'click', '#cite-incr-'+CiteTB.escStr(this.shortform)+'-'+g, CiteTB.incrementFields );
        	this.incrementables[g].setup = true;
    	}
    }
    if (needsetup) {
    	for(i=0; i<autofills.length; i++) {
    		$( document ).on( 'click', autofills[i], CiteTB.initAutofill );
    	}	
    }
    return trs;
  
  }
  
  // gives a little bit of HTML so the open form can be identified
  this.getInitial = function() {
    var hidden = $('<input type="hidden" class="cite-template" />');
    hidden.val(this.templatename);
    return hidden;
  }
  
  // makes the form used in the dialog boxes
  this.getForm = function() {
    var main = $("<div class='cite-form-container' />");
    var form1 = $('<table style="width:100%; background-color:transparent;" class="cite-basic-fields" />');
    var i=0;
    var trs = this.makeFormInner(this.basic, true);
    for (var i=0; i<trs.length; i++) {
      form1.append(trs[i]);
    }
    
    var form2 = $('<table style="width:100%; background-color:transparent; display:none" class="cite-extra-fields">');
    trs = this.makeFormInner(this.extra, true);
    for (var i=0; i<trs.length; i++) {
      form2.append(trs[i]);
    }    
    main.append(form1).append(form2);
    
    var form3 = $('<table style="width:100%; background-color:transparent;padding-top:1em" class="cite-other-fields">');
    var tr = $('<tr />');
    var td1 = $('<td class="cite-form-td" style="text-align:right; width:20%" />');
    var label1 = $('<label />');
    label1.attr('for', "cite-"+CiteTB.escStr(this.shortform)+'-name').text(mw.usability.getMsg('cite-name-label'));
    td1.append(label1);
    var td2 = $('<td class="cite-form-td" style="width:30%" />');
    var input1 = $('<input tabindex="1" style="width:100%" type="text" />');
    input1.attr('id', 'cite-'+CiteTB.escStr(this.shortform)+'-name');
    td2.append(input1);
    var td3 = $('<td class="cite-form-td" style="text-align:right; padding-left:1em; width:20%">');
    var label2 = $('<label />');
    label2.attr('for', 'cite-'+CiteTB.escStr(this.shortform)+'-group').text(mw.usability.getMsg('cite-group-label'));
    td3.append(label2);
    var td4 = $('<td class="cite-form-td" style="width:30%" />');
    var input2 = $('<input tabindex="1" style="width:100%" type="text" />');
    input2.attr('id', 'cite-'+CiteTB.escStr(this.shortform)+'-group');
    td4.append(input2);
    tr.append(td1).append(td2).append(td3).append(td4);
    form3.append(tr);
    main.append(form3);
    var extras = $('<div />');
    extras.append('<input type="hidden" class="cite-form-status" value="closed" />');
    var hidden = $('<input type="hidden" class="cite-template" />');
    hidden.val(this.templatename);
    extras.append(hidden);
    var span1 = $('<span class="cite-preview-label" style="display:none;" />');
    span1.text(mw.usability.getMsg('cite-raw-preview'));
    extras.append(span1).append('<div class="cite-ref-preview" style="padding:0.5em; font-size:110%" />');
    var span2 = $('<span class="cite-prev-parsed-label" style="display:none;" />');
    span2.text(mw.usability.getMsg('cite-parsed-label'));
    extras.append(span2).append('<div class="cite-preview-parsed" style="padding-bottom:0.5em; font-size:110%" />');
    var link = $('<a href="#" class="cite-prev-parse" style="margin:0 1em 0 1em; display:none; color:darkblue" />');
    link.text(mw.usability.getMsg('cite-form-parse'));
    extras.append(link);    
    main.append(extras);
    
    return main;
  }
}

/* Class for error checks
    FIXME: DOCS OUT OF DATE
   type - type of error check - current options:
    * 'refcheck' - apply a function on each ref individually
      * function should accept a ref object, return a string
    * 'reflist' - apply a function on the entire ref list
      * function should accept an array of ref objects, return an array of strings
    * 'search' - apply a function ro the page text
      * function should accept the page text as a string, return an array of strings
   The strings returned by the function should be valid HTML
   
   func - The function described above
   testname - Name of the error check, must not contain spaces
   desc - A short description of the test
*/

window.citeErrorCheck = function (obj) {
  this.obj = obj
  CiteTB.ErrorChecks[this.obj.testname] = this;
  
  this.run = function() {
    var errors = [];
    switch(this.obj['type']) {
      case "refcheck":
        CiteTB.loadRefs();
        for(var i=0; i<CiteTB.mainRefList.length; i++) {
          var e = this.obj.func(CiteTB.mainRefList[i]);
          if (e) {
            errors.push(e);
          }
        }
        break;
      case "reflist":
        CiteTB.loadRefs();
        errors = this.obj.func(CiteTB.mainRefList);
        break;
      case "search":
        var func = this.obj.func
        CiteTB.getPageText(function(text) {
          errors = func(text);
        });
        break;
    }
    return errors;
  }
  
  this.getRow = function() {
    var row = $("<li />");
    var check = $("<input type='checkbox' name='cite-err-test' />");
    check.attr('value', this.obj.testname);
    var label = $("<label />").html(mw.usability.getMsg(this.obj.desc));
    label.attr('for', this.obj.testname); 
    row.append(check).append(' &ndash; ').append(label);
    return row;
  }
}
$('head').trigger('reftoolbarbase');