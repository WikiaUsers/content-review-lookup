/* <nowiki> */

/**
 * Moves edit links next to section headers
 * Script by Porter21 (http://www.falloutwiki.com)
 */

function leftEditSectionLinks () {
   $('#bodyContent').find('span.editsection').each(function () {
      $(this).appendTo($(this).parent());
   });

   mw.util.addCSS('#bodyContent span.editsection { float: none; line-height: 1em; }');
}

jQuery(function($) {
   leftEditSectionLinks();
});

/* </nowiki> */