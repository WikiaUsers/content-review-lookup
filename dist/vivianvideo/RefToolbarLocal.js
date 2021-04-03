/* Sitewide options for the the Cite toolbar button:
* All options should be specified
*
* "date format" sets the date format used for the function to insert the current date
* Current available options:
* date - the day of the month
* zdate - day of the month, zero padded to 2 digits
* monthname - The month name
* month - The numberic month (1-12)
* zmonth - numeric month, zero padded to 2 digits
* year - The full year (4 digits)
*
* "autodate fields" is a list of template fields that should have a button to insert the current date
* 
* "months" is a list of localized month names
*
* "modal" - if true, the dialogs will be modal windows, blocking access to the rest of the window.
* See http://en.wikipedia.org/wiki/Modal_window
* All dialogs in the toolbar are modal by default
*
* "autoparse" - if true, previewing a ref will automatically trigger a preview of the parsed wikitext.
* Its not recommended to set this to true as a global setting as it may slow the script down for people
* with slow connections
*
* "expandtemplates" - if true, templates and parser functions will be expanded when getting page text
* (templates inside of ref tags will not be expanded). This will allow references inside of templates or
* references using {{#tag:ref}} to be listed in the named refs dialog and searched by error checks.
* This may slow loading the named refs and error check dialogs.
*/
 
CiteTB.Options = {
"date format" : "<date> <monthname> <year>",
"autodate fields" : ['accessdate'],
"months" : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
"modal" : true,
"autoparse" : false,
"expandtemplates" : false
};
 
// Cite template definitions
new citeTemplate('cite web', 'Web',
[ // Basic fields
{"field": "last", "label":"Last name", "autofillprop":"last1"},
{"field": "first", "label":"First name", "autofillprop":"first1"}, 
{"field": "title", "autofillprop":"title"},
{"field": "url", "label":"URL"},
{"field": "work", "tooltip": "What larger work this is part of", "autofillprop":"journal"},
{"field": "publisher"},
{"field": "accessdate", "label":"Access date"}
],
[ // Expanded fields
{"field": "author"},
{"field": "authorlink", "label":"Author's article", "tooltip":"If the author has an article, the name of the article"},
{"field": "coauthors", "autofillprop":"coauthors"},
{"field": "archiveurl", "label":"Archive URL"},
{"field": "archivedate", "label":"Archive date"},
{"field": "location"},
{"field": "page"},
{"field": "pages", "autofillprop":"pages"},
{"field": "language"},
{"field": "format"},
{"field": "doi", "label":"DOI", "autofillid":"doi"},
{"field": "date", "autofillprop":"date"},
{"field": "month"},
{"field": "year"},
{"field": "quote"}
]);
 
new citeTemplate('cite news', 'News',
[ // Basic fields
{"field": "last", "label":"Last name"},
{"field": "first", "label":"First name"}, 
{"field": "title"},
{"field": "url", "label":"URL"},
{"field": "accessdate", "label":"Access date"},
{"field": "newspaper"},
{"field": "date"}
],
[ // Expanded fields
{"field": "author"},
{"field": "author2", 'label': "2nd author"},
{"field": "author3", 'label': "3rd author"},
{"field": "author4", 'label': "4th author"},
{"field": "author5", 'label': "5th author"},
{"field": "authorlink", "label":"Author's article", "tooltip":"If the author has an article, the name of the article"},
{"field": "agency"},
{"field": "archiveurl", "label":"Archive URL"},
{"field": "archivedate", "label":"Archive date"},
{"field": "location"},
{"field": "page"},
{"field": "pages"},
{"field": "language"},
{"field": "format"},
{"field": "doi", "label":"DOI"},
{"field": "month"},
{"field": "year"},
{"field": "quote"}
]);
 
new citeTemplate('cite book', 'Book',
[ // Basic fields
{"field": "last", "label":"Last name", "autofillprop":"last1"},
{"field": "first", "label":"First name", "autofillprop":"first1"}, 
{"field": "title", "autofillprop":"title"},
{"field": "year", "autofillprop":"year"},
{"field": "publisher", "autofillprop":"publisher"},
{"field": "location", "autofillprop":"location"},
{"field": "isbn", "label":"ISBN", "autofillid":"isbn"},
{"field": "pages"},
{"field": "url", "label":"URL"}
],
[ // Expanded fields
{"field": "author"},
{"field": "edition", "autofillprop":"edition"},
{"field": "authorlink", "label":"Author's article", "tooltip":"If the author has an article, the name of the article"},
{"field": "coauthors", "autofillprop":"coauthors"},
{"field": "editor"},
{"field": "accessdate", "label":"Access date"},
{"field": "archiveurl", "label":"Archive URL"},
{"field": "archivedate", "label":"Archive date"},
{"field": "page"},
{"field": "language"},
{"field": "format"},
{"field": "chapter"},
{"field": "date"},
{"field": "month"},
{"field": "quote"}
]);
 
new citeTemplate('cite journal', 'Journal',
[ // Basic fields
{"field": "last", "label":"Last name", "autofillprop":"last1"},
{"field": "first", "label":"First name", "autofillprop":"first1"},
{"field": "coauthors", "autofillprop":"coauthors"},
{"field": "title", "autofillprop":"title"},
{"field": "journal", "autofillprop":"journal"},
{"field": "date", "autofillprop":"date"},
{"field": "year"},
{"field": "month"},
{"field": "volume", "autofillprop":"volume"},
{"field": "series"},
{"field": "issue", "autofillprop":"issue"},
{"field": "pages", "autofillprop":"pages"},
{"field": "doi", "label":"DOI", "autofillid":"doi"},
{"field": "pmid", "label":"PMID", "autofillid":"pmid"},
{"field": "url", "label":"URL"},
{"field": "accessdate", "label":"Access date"}
],
[ // Expanded fields
{"field": "author"},
{"field": "authorlink", "label":"Author's article"},
{"field": "editor1-first", "label":"Editor's first"},
{"field": "editor1-last", "label":"Editor's last"},
{"field": "editor1-link", "label":"Editor's article"},
{"field": "page"},
{"field": "at"},
{"field": "trans_title", "label":"Translated title"},
{"field": "publisher"},
{"field": "location"},
{"field": "language"},
{"field": "format"},
{"field": "issn", "label":"ISSN"},
{"field": "pmc", "label":"PMC"},
{"field": "oclc", "label":"OCLC"},
{"field": "bibcode"},
{"field": "id", "label":"ID"},
{"field": "laysummary", "label":"Lay summary"},
{"field": "laysource", "label":"Lay source"},
{"field": "laydate", "label":"Lay date"},
{"field": "quote"},
{"field": "ref"},
{"field": "postscript"}
]);
 
 
new citeErrorCheck({'type':'reflist', 'testname':'samecontent', 'desc': "Check for references with the same content",
'func': function(reflist) {
  var errors = [];
  var refs2 = [];
  for(var i=0; i<reflist.length; i++) {
    if (!reflist[i].shorttag) {
      if ($j.inArray(reflist[i].content, refs2) != -1) {
        if ($j.inArray(reflist[i].content, errors) == -1) {
          errors.push(reflist[i].content);
        }
      } else {
        refs2.push(reflist[i].content);
      }
    }
  }
  ret = [];
  for(var j=0; j<errors.length; j++) {
    ret.push({'msg':'Multiple references contain the same content', 'err':errors[j]});
  }
  return ret;
}}
);
 
new citeErrorCheck({'type':'reflist', 'testname':'repeated', 'desc':'Multiple references with the same name',
'func': function(reflist) {
  var errors = [];
  var refs2 = [];
  for(var i=0; i<reflist.length; i++) {
    if (!reflist[i].shorttag && reflist[i].refname) {
      if ($j.inArray(reflist[i].refname, refs2) != -1) {
        if ($j.inArray(reflist[i].refname, errors) == -1) {
          errors.push(reflist[i].refname);
        }
      } else {
        refs2.push(reflist[i].refname);
      }
    }
  }
  ret = [];
  for(var j=0; j<errors.length; j++) {
    ret.push({'msg':'Multiple references are using the same name', 'err':errors[j]});
  }
  return ret;
}}
);
 
new citeErrorCheck({'type':'reflist', 'testname':'undefined', 'desc':'Usage of undefined named references',
'func': function(reflist) {
  var errors = [];
  var longrefs = [];
  for(var i=0; i<reflist.length; i++) {
    if (!reflist[i].shorttag && reflist[i].refname) {
      longrefs.push(reflist[i].refname);
    }
  }
  for(var j=0; i<reflist.length; j++) {
    if (reflist[i].shorttag && $j.inArray(reflist[i].refname, errors) == -1 && $j.inArray(reflist[i].refname, longrefs) == -1) {
      errors.push(reflist[i].refname);
    }
  }
  ret = [];
  for(var j=0; j<errors.length; j++) {
    ret.push({'msg':'A named reference is used but not defined', 'err':errors[j]});
  }
  return ret;
}}
);
 
// All user-facing messages
// TODO: Document usage
$j(document).ready( function() {
mw.usability.addMessages( { "cite-section-label" : "Cite",
"cite-template-list" : "Templates",
"cite-named-refs-label" : "Named refs",
"cite-named-refs-title" : "Insert a named reference",
"cite-named-refs-button" : "Named references",
"cite-named-refs-dropdown" : "Named refs", // Used on the top of the named refs list dropsown
"cite-errorcheck-label" : "Error check",
"cite-errorcheck-button" : "Check for errors",
"cite-dialog-base" : "citation",
"cite-form-submit" : "Insert",
"cite-form-showhide" : "Show/hide extra fields",
"cite-no-namedrefs" : "Cannot find any named refs on the page",
"cite-namedrefs-intro" : "Select a name from the list to see the ref content. Click \"Insert\" to insert a reference to it in the text.",
"cite-raw-preview" : "Wikitext:",
"cite-parsed-label" : "Parsed wikitext:",
"cite-form-parse" : "Show parsed preview",
"cite-refpreview" : "Preview",
"cite-name-label" : "Ref name",
"cite-group-label" : "Ref group",
"cite-errorcheck-submit" : "Check",
"cite-errorcheck-heading" : "Check for the following errors:",
"cite-error-unclosed" : "Unclosed <span style='font-family:monospace'>&lt;ref&gt;</span> tags",
"cite-error-samecontent" : "References with the same content",
"cite-error-templates" : "References not using a <a href='http://en.wikipedia.org/wiki/Wikipedia:Citation_templates'>citation template</a>",
"cite-error-repeated" : "Multiple references with the same name",
"cite-error-undef" : "Usage of undefined named references",
"cite-error-samecontent-msg" : "Multiple refs contain the same content: $1",
"cite-error-repeated-msg" : "Mutiple refs are given the name: \"$1\"",
"cite-error-templates-msg" : "Does not use a template: $1",
"cite-form-reset" : "Reset form",
"cite-loading" : "Loading data", // Shown while pagetext is being downloaded from the API
"cite-insert-date" : "Insert current date", // Alt/title text for "insert date" icon
"cite-err-report-heading" : "Citation error report", // Heading for error report table
"cite-err-report-close" : "Close", // Alt/title text for "close" icon on error report
"cite-err-report-empty" : "No errors found", // Message displayed in the error report list if there are no errors
"cite-autofill-alt" : "Autofill" // Alt text for autofill button image
});
 
CiteTB.init();
});
 
$j(window).load(function() {
  CiteTB.init();
});