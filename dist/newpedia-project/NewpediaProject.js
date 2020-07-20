[[/**
 * This file is site-wide JavaScript.  It will take effect for users who (1) have selected the "uncyclopedia" skin
 * and (2) have JavaScript enabled.  Users who select "newpedia-project" probably want to maximize our resemblance to
 * WhiteBook.  Users who don't, probably use other Wikia wikis and may want to maximize our resemblance to them.
 *
 * For these reasons, code put here will not take universal effect.  Code that should apply regardless of the skin
 * should go in [MediaWiki:Common.js].  It will take wider effect if you make a change using CSS whenever possible.
 *
 * Editing tips from Jack Phoenix <jack@countervandalism.net>, 26 July 2009:
 ** Test your code in the latest version of Firefox AND Internet Explorer!
 ** No compressed JS. Ever. Compressed JS is annoying to edit or debug.
 ** Follow the MediaWiki coding conventions (http://www.mediawiki.org/wiki/Manual:Coding_conventions)
 */
// Tools: [http://newpedia-project.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js reload cache]
 
/************
 * THUMBNAILS
 ************
 * Wikia retired the "sprite" anchor from thumbnails in May'14.  See [Forum:Thumbnails are broken]
 */
$("FIGCAPTION").prepend("<A style='display:inline; float:right' title='This button does nothing but resemble Wikipedia'><IMG class='sprite' src='https://images.wikia.nocookie.net/__cb20140528181652/uncyclopedia/images/6/6b/Magnify-clip.png'></A>");
 
/**********************
 * SECTION EDIT BUTTONS
 **********************
 * MAKE IT LOOK LIKE MONOBOOK
 * Was a SPAN.editsection before the SPAN with the section heading, and with float:right
 * Will be a SPAN.editsection moved after that other SPAN, with no float
 */
  $(" .editsection ").each(function () {
    $(this).css({"float": "none",
                 "padding-left": "1em",
                 "display": "inline"})
           .parent()
           .append(this);
    });