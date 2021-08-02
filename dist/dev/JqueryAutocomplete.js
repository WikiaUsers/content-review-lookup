// <nowiki>
$( function() {
  var availableTags = [
  	// Common MediaWiki/HTML syntax
    "<div>","</div>",
    "<span>","</span>",
    "''","'''",
    "<s>","</s>",
    "<u>","</u>",
    "<b>","</b>",
    "<nowiki>","</nowiki>",
    "<code>","</code>",
    "<samp>","<samp>",
    "{{{","}}}",
    // Magic words
    "{{PAGENAME}}",
    "{{DISPLAYTITLE:}}",
    "{{NUMBEROFPAGES}}","{{NUMBEROFARTICLES}}",
    "{{CURRENTYEAR}}",
    "{{CURRENTMONTH}}","{{CURRENTMONTH1}}","{{CURRENTMONTHNAME}}","{{CURRENTMONTHNAMEGEN}}","{{CURRENTMONTHABBREV}}",
    "{{CURRENTDAY}}","{{CURRENTDAY2}}","{{CURRENTDOW}}","{{CURRENTDAYNAME}}",
    "{{CURRENTTIME}}","{{CURRENTHOUR}}",
    "{{CURRENTWEEK}}","{{CURRENTTIMESTAMP}}",
    "{{FULLPAGENAME}}","{{PAGENAME}}","{{BASEPAGENAME}}","{{ROOTPAGENAME}}","{{SUBPAGENAME}}","{{SUBJECTPAGENAME}}","{{ARTICLEPAGENAME}}","{{TALKPAGENAME}}",
    "__NOTOC__","__FORCETOC__","__TOC__",
    "__NOEDITSECTION__","__NEWSECTIONLINK__","__NONEWSECTIONLINK__",
    "__NOGALLERY__",
    "__HIDDENCAT__","__EXPECTUNUSEDCATEGORY__",
    "__NOCONTENTCONVERT__","__NOCC__",
    "__NOTITLECONVERT__","__NOTC__",
    "__INDEX__","__NOINDEX__",
    "__STATICREDIRECT__",
    "{{raw:"
  ];
$( ".ve-ce-branchNode, .ve-ce-documentNode, .ve-ce-attachedRootNode, .ve-ce-rootNode, .mw-parser-output, .ve-ce-documentNode-codeEditor-webkit-hide" ).autocomplete({
  source: availableTags
});
} );