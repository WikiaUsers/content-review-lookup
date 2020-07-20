// <pre><nowiki>

// version info
window.wikEdProgramVersion = window.wikEdProgramVersion || '0.9.74';
window.wikEdProgramDate    = window.wikEdProgramDate    || 'February 21, 2009';

/*

Program description and Greasemonkey metadata

wikEd is a full-featured JavaScript in-browser editor for Wikipedia and other MediaWiki edit pages.
The program works currently ONLY for Mozilla, Firefox, SeaMonkey, Safari, and Chrome browsers.
The code has to be saved as UTF-8 in your editor to preserve Unicode characters like ♥ (heart)

// ==UserScript==
// @name        wikEd
// @namespace   http://en.wikipedia.org/wiki/User:Cacycle/
// @description A full-featured in-browser editor for Wikipedia and other MediaWiki edit pages
// @include     *
// @exclude
//
// @homepage    http://en.wikipedia.org/wiki/User:Cacycle/wikEd
// @source      http://en.wikipedia.org/wiki/User:Cacycle/wikEd.js
// @author      Cacycle (http://en.wikipedia.org/wiki/User:Cacycle)
// @license     Released into the public domain
// ==/UserScript==

== Installation on a MediaWiki wiki (using monobook.js) ==

1. PLEASE DO NOT COPY THE WHOLE PROGRAM (in order to get the frequent updates and bug fixes and to save disk space)
2. See http://en.wikipedia.org/wiki/User:Cacycle/wikEd for more detailed instructions
3. Copy the following short block of code to [[User:YOURUSERNAME/monobook.js]]
4. Click SHIFT-Reload to update to the newest version
5. Optional: customize the program by adding user settings to your monobook.js page

// ---- START wikEd INSTALLATION CODE ----

// install [[User:Cacycle/wikEd]] in-browser text editor
document.write('<script type="text/javascript" src="'
+ 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEd.js'
+ '&action=raw&ctype=text/javascript"></script>');

// ---- END wikEd INSTALLATION CODE ----

== General installation for all MediaWiki wikis (using Greasemonkey) ==

1. Install Greasemonkey for Firefox from:
			https://addons.mozilla.org/en-US/firefox/addon/748
2. Install wikEd by opening this address:
			http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Cacycle/wikEd.user.js
3. Optional: customize the program by adding user settings to the Greasemonkey customization section below
			(these settings will be overwritten by updates!)

*/

//
// Greasemonkey customization section: add customization settings here
//   example: window.wikEdAutoUpdate = false; window.wikEdAutoUpdateHours = 7 * 24;
//


//
// WikEdInitGlobalsConfigs: initialize user configurable variables
//

window.WikEdInitGlobalConfigs = function() {

// user readable texts, copy changes to http://en.wikipedia.org/wiki/User:Cacycle/wikEd_international_en.js, also defined in wikEdDiff.js
	if (typeof(wikEdText) == 'undefined') { window.wikEdText = {}; }

//
// WikEdInitText: define built-in user interface texts
//

	window.WikEdInitText = function() {
		WikEdInitObject(wikEdText, {

// logo
			'wikEdLogo alt':               'wikEd',
			'wikEdLogo title':             'wikEd {wikEdProgramVersion} ({wikEdProgramDate}) Click to disable',
			'wikEdLogo error alt':         'wikEd error',
			'wikEdLogo error title':       'Loading error - wikEd {wikEdProgramVersion} ({wikEdProgramDate}) Click to disable',
			'wikEdLogo browser alt':       '(wikEd)',
			'wikEdLogo browser title':     'Browser not supported - wikEd {wikEdProgramVersion} ({wikEdProgramDate})',
			'wikEdLogo disabled alt':      '(wikEd)',
			'wikEdLogo disabled title':    'Disabled - wikEd {wikEdProgramVersion} ({wikEdProgramDate}) Click to enable',

// top jumper
			'wikEdScrollToEdit4 alt':      'Scroll to edit',
			'wikEdScrollToEdit4 title':    'Scroll to edit field',

// button bar grip titles
			'wikEdGripFormat title':       'Formatting buttons (click to hide or show)',
			'wikEdGripTextify title':      'Textify and wikify buttons (click to hide or show)',
			'wikEdGripCustom1 title':      'Custom buttons (click to hide or show)',
			'wikEdGripFind title':         'Find buttons (click to hide or show)',
			'wikEdGripFix title':          'Fixing buttons (click to hide or show)',
			'wikEdGripCustom2 title':      'Custom buttons (click to hide or show)',
			'wikEdGripControl title':      'wikEd control buttons (click to hide or show)',

// formatting buttons, top row
			'wikEdUndo alt':               'Undo',
			'wikEdUndo title':             'Undo',
			'wikEdRedo alt':               'Redo',
			'wikEdRedo title':             'Redo',
			'wikEdBold alt':               'Bold',
			'wikEdBold title':             'Bold text',
			'wikEdItalic alt':             'Italic',
			'wikEdItalic title':           'Italic text',
			'wikEdUnderline alt':          'Underline',
			'wikEdUnderline title':        'Underline text',
			'wikEdStrikethrough alt':      'Strikethrough',
			'wikEdStrikethrough title':    'Strikethrough text',
			'wikEdNowiki alt':             'Nowiki',
			'wikEdNowiki title':           'Nowiki markup text',
			'wikEdSuperscript alt':        'Superscript',
			'wikEdSuperscript title':      'Superscript text',
			'wikEdSubscript alt':          'Subscript',
			'wikEdSubscript title':        'Subscript text',
			'wikEdRef alt':                'Ref',
			'wikEdRef title':              'In-text reference (shift-click: named tag)',
			'wikEdCase alt':               'Case',
			'wikEdCase title':             'Toggle between lowercase, uppercase first, and uppercase',
			'wikEdSort alt':               'Sort',
			'wikEdSort title':             'Sort lines alphabetically',
			'wikEdRedirect alt':           'Redirect',
			'wikEdRedirect title':         'Create redirect, deletes whole text',
			'wikEdUndoAll alt':            'Undo all',
			'wikEdUndoAll title':          'Undo all changes',
			'wikEdRedoAll alt':            'Redo all',
			'wikEdRedoAll title':          'Redo all changes',

// formatting buttons, bottom row
			'wikEdWikiLink alt':           'Link',
			'wikEdWikiLink title':         'Wiki link',
			'wikEdWebLink alt':            'Weblink',
			'wikEdWebLink title':          'External weblink',
			'wikEdHeading alt':            'Heading',
			'wikEdHeading title':          'Increase heading levels (shift-click: decrease)',
			'wikEdBulletList alt':         'Bullet list',
			'wikEdBulletList title':       'Increase bulleted list level (shift-click: decrease)',
			'wikEdNumberList alt':         'Number list',
			'wikEdNumberList title':       'Increase numbered list level (shift-click: decrease)',
			'wikEdIndentList alt':         'Indent list',
			'wikEdIndentList title':       'Increase indention (shift-click: decrease)',
			'wikEdDefinitionList alt':     'Def list',
			'wikEdDefinitionList title':   'Definition list',
			'wikEdImage alt':              'Image',
			'wikEdImage title':            'Image',
			'wikEdTable alt':              'Table',
			'wikEdTable title':            'Table',
			'wikEdReferences alt':         'References',
			'wikEdReferences title':       'References location (shift-click: References section)',

// textify buttons
			'wikEdWikify alt':             'Wikify',
			'wikEdWikify title':           'Convert pasted content to wiki code, update highlighting',
			'wikEdTextify alt':            'Textify',
			'wikEdTextify title':          'Convert pasted content to plain text, update highlighting',

// find and replace buttons, top row
			'wikEdFindAll alt':            'Find all',
			'wikEdFindAll title':          'Find all matches',
			'wikEdFindPrev alt':           'Find prev',
			'wikEdFindPrev title':         'Find previous match',
			'wikEdFindSelect title':       'Select a previous search or jump to a heading',
			'wikEdFindNext alt':           'Find next',
			'wikEdFindNext title':         'Find next match (shift-click: get selection)',
			'wikEdJumpPrev alt':           'Selected prev',
			'wikEdJumpPrev title':         'Find the selected text backwards',
			'wikEdJumpNext alt':           'Selected next',
			'wikEdJumpNext title':         'Find the selected text forwards',

// find and replace buttons, bottom row
			'wikEdReplaceAll alt':         'Replace all',
			'wikEdReplaceAll title':       'Replace all matches in whole text or selection',
			'wikEdReplacePrev alt':        'Replace prev',
			'wikEdReplacePrev title':      'Replace previous match',
			'wikEdReplaceSelect title':    'Select a previous replacement',
			'wikEdReplaceNext alt':        'Replace next (shift-click: get selection)',
			'wikEdReplaceNext title':      'Replace next match',
			'wikEdCaseSensitive alt':      'Case sensitive',
			'wikEdCaseSensitive title':    'Search is case sensitive',
			'wikEdRegExp alt':             'RegExp',
			'wikEdRegExp title':           'Search field is a regular expression',
			'wikEdFindAhead alt':          'Find ahead',
			'wikEdFindAhead title':        'Find ahead as you type (case-insensitive non-regexp search)',

// fix buttons, top row
			'wikEdFixBasic alt':           'Fix basic',
			'wikEdFixBasic title':         'Fix blanks and empty lines, also done by other fixing functions',
			'wikEdFixHtml alt':            'Fix html',
			'wikEdFixHtml title':          'Fix html to wikicode',
			'wikEdFixCaps alt':            'Fix caps',
			'wikEdFixCaps title':          'Fix caps in headers and lists',
			'wikEdFixUnicode alt':         'Fix Unicode',
			'wikEdFixUnicode title':       'Fix Unicode character representations',
			'wikEdFixAll alt':             'Fix all',
			'wikEdFixAll title':           'Fix basic, html, capitalization, and Unicode',
			'wikEdFixRedirect alt':        'Fix redirects',
			'wikEdFixRedirect title':      'Fix redirects',

// fix buttons, bottom row
			'wikEdFixDashes alt':          'Fix dashes',
			'wikEdFixDashes title':        'Fix dashes',
			'wikEdFixPunct alt':           'Fix punctuation',
			'wikEdFixPunct title':         'Fix spaces before punctuation',
			'wikEdFixMath alt':            'Fix math',
			'wikEdFixMath title':          'Fix math',
			'wikEdFixChem alt':            'Fix chem',
			'wikEdFixChem title':          'Fix chemical formulas',
			'wikEdFixUnits alt':           'Fix units',
			'wikEdFixUnits title':         'Fix units',
			'wikEdFixRegExTypo alt':       'Fix typos',
			'wikEdFixRegExTypo title':     'Fix typos using the AutoWikiBrowser RegExTypoFixer rules',

// wikEd control buttons, top row
			'wikEdRefHide alt':            'Hide <ref>',
			'wikEdRefHide title':          'Toggle <ref> tag hiding',
			'wikEdTextZoom alt':           'Text zoom',
			'wikEdTextZoom title':         'Text zoom cycling (shift-click: reverse)',
			'wikEdClearHistory alt':       'Clear history',
			'wikEdClearHistory title':     'Clear the find, replace, and summary history',
			'wikEdScrollToPreview alt':    'Scroll to preview',
			'wikEdScrollToPreview title':  'Scroll to preview field',
			'wikEdScrollToEdit alt':       'Scroll to edit',
			'wikEdScrollToEdit title':     'Scroll to edit field',

// wikEd control buttons, bottom row
			'wikEdUseWikEd alt':           'Use wikEd',
			'wikEdUseWikEd title':         'Toggle between classic text area and wikEd',
			'wikEdHighlightSyntax alt':    'Syntax',
			'wikEdHighlightSyntax title':  'Toggle automatic syntax highlighting',
			'wikEdSource alt':             'Source',
			'wikEdCloseToolbar title':     'Close the standard non-wikEd toolbar',
			'wikEdCloseToolbar alt':       'Close toolbar',
			'wikEdSource title':           'Show the source code for testing purposes',
			'wikEdUsing alt':              'Using',
			'wikEdUsing title':            'Automatically add \'\'…using wikEd\'\' to summaries',
			'wikEdDiff alt':               'wikEdDiff',
			'wikEdDiff title':             'Toggle automatic improved diff view',
			'wikEdFullScreen alt':         'Fullscreen',
			'wikEdFullScreen title':       'Toggle the fullscreen mode',
			'wikEdTableMode alt':          'Table mode', // {{TABLE}}
			'wikEdTableMode title':        'Toggle table edit mode', // {{TABLE}}

// summary buttons
			'wikEdClearSummary alt':       'Clear summary',
			'wikEdClearSummary title':     'Clear the summary field',
			'wikEdSummarySelect title':    'Select a previous summary',
			'wikEdPresetSummary': [
				'/*  */ ', 'copyedit', 'reply', 'article created', 'intro rewrite',
				'linkfix', 'fixing typos', 'removing linkspam', 'reverting test',
				'reverting vandalism', 'formatting source text', '{wikEdUsing}'
			],
			'wikEdSummaryUsing':           '…using [[en:User:Cacycle/wikEd|wikEd]]',

// button title acceskey
			'alt-shift':                   'alt-shift-',

// submit buttons
			'wikEdLocalPreviewImg alt':    'Preview below',
			'wikEdLocalPreview title':     'Show preview below',
			'wikEdLocalDiffImg alt':       'Changes below',
			'wikEdLocalDiff title':        'Show current changes below',
			'wikEdHelpPageLink':           ' | <a href="http://en.wikipedia.org/wiki/User:Cacycle/wikEd_help" target="helpwindow">wikEd help</a>',

// preview and changes buttons, top
			'wikEdClose alt':              'Close',
			'wikEdClose title':            'Close preview box',
			'wikEdScrollToPreview2 alt':   'Scroll to preview',
			'wikEdScrollToPreview2 title': 'Scroll to preview field',
			'wikEdScrollToEdit2 alt':      'Scroll to edit',
			'wikEdScrollToEdit2 title':    'Scroll to edit field',

// preview and changes buttons, bottom
			'wikEdClose alt':              'Close',
			'wikEdClose title':            'Close preview box',
			'wikEdScrollToPreview3 alt':   'Scroll to preview',
			'wikEdScrollToPreview3 title': 'Scroll to preview field',
			'wikEdScrollToEdit3 alt':      'Scroll to edit',
			'wikEdScrollToEdit3 title':    'Scroll to edit field',

// preview field
			'wikEdPreviewLoading':         '...',

// formatting functions
			'image filename':              'filename',
			'image width':                 'width',
			'table caption':               'caption',
			'table heading':               'heading',
			'table cell':                  'cell',
			'redirect article link':       'article link',

// fixing functions
			'External links':              'External links',
			'See also':                    'See also',
			'References':                  'References',

// language specific wiki code
			'wikicode Image':              'Image',
			'wikicode File':               'File',
			'wikicode Category':           'Category',
			'wikicode Template':           'Template',
			'wikEdReferencesSection':      '\n== References ==\n\n<references />\n',

// shortened button texts
			'shortenedPreview':            'Preview',
			'shortenedChanges':            'Changes',

// follow link popup
			'followLink':                  '(Ctrl-click)',

// error message popups
			'wikEdTableModeError':         'The table wikicode contains errors', // {{TABLE}}

// auto updating
			'wikEdGreasemonkeyAutoUpdate': 'wikEd Update:\n\nA new version of the GreaseMonkey script "wikEd" is available.\n\n\nIt will be downloaded from:\n\n{updateURL}',

// highlighting popups
			'wikEdHyphenDash':             'Standard hyphen',
			'wikEdFigureDash':             'Figure dash',
			'wikEdEnDash':                 'En dash',
			'wikEdEmDash':                 'Em dash',
			'wikEdBarDash':                'Horizontal bar',
			'wikEdMinusDash':              'Minus sign',
			'wikEdSoftHyphen':             'Soft hyphen',
			'wikEdTab':                    'Tab',
			'wikEdEnSpace':                'En space',
			'wikEdEmSpace':                'Em space',
			'wikEdThinSpace':              'Thin space'
		}, wikEdShowMissingTranslations);
	}

// define built-in user interface texts
	WikEdInitText();

// use local copies of images for testing (set to true in local copy of edit page), also defined in wikEdDiff.js
	if (typeof(wikEdUseLocalImages) == 'undefined') { window.wikEdUseLocalImages = false; }

// path to local images for testing, also defined in wikEdDiff.js
	if (typeof(wikEdImagePathLocal) == 'undefined') { window.wikEdImagePathLocal = 'file:///D:/wikEd/images/'; }

// path to images, also defined in wikEdDiff.js
	if (typeof(wikEdImagePath) == 'undefined') { window.wikEdImagePath = 'http://upload.wikimedia.org/wikipedia/commons/'; }

// image filenames, also defined in wikEdDiff.js
	if (typeof(wikEdImage) == 'undefined') { window.wikEdImage = {}; }

// WikedInitImages: define built-in image URLs
	window.WikedInitImages = function() {
		WikEdInitImage(wikEdImage, {
			'barDash':             '5/52/WikEd_bar_dash.png',
			'bold':                '5/59/WikEd_bold.png',
			'browser':             '0/07/WikEd_disabled.png',
			'bulletList':          '6/62/WikEd_bullet_list.png',
			'case':                'a/aa/WikEd_case.png',
			'caseSensitive':       '0/0d/WikEd_case_sensitive.png',
			'clearHistory':        'c/c8/WikEd_clear_history.png',
			'clearSummary':        '2/2c/WikEd_clear_summary.png',
			'close':               '9/97/WikEd_close.png',
			'closeToolbar':        '1/1d/WikEd_close_toolbar.png',
			'ctrl':                '1/10/WikEd_ctrl.png',
			'definitionList':      'f/f5/WikEd_definition_list.png',
			'diff':                'd/db/WikEd_diff.png',
			'disabled':            '0/07/WikEd_disabled.png',
			'dummy':               'c/c5/WikEd_dummy.png',
			'emDash':              '5/58/WikEd_em_dash.png',
			'emSpace':             '3/3a/WikEd_em_space.png',
			'enDash':              'f/fc/WikEd_en_dash.png',
			'enSpace':             '0/04/WikEd_en_space.png',
			'error':               '3/3e/WikEd_error.png',
			'figureDash':          '2/25/WikEd_figure_dash.png',
			'findAhead':           '3/34/WikEd_find_ahead.png',
			'findAll':             '7/75/WikEd_find_all.png',
			'findNext':            'a/ad/WikEd_find_next.png',
			'findPrev':            'f/f5/WikEd_find_prev.png',
			'fixAll':              '8/86/WikEd_fix_all.png',
			'fixBasic':            '3/30/WikEd_fix_basic.png',
			'fixCaps':             '0/00/WikEd_fix_caps.png',
			'fixUnicode':          'd/d4/WikEd_fix_unicode.png',
			'fixRedirect':         'f/f8/WikEd_fix_redirect.png',
			'fixChem':             'e/e7/WikEd_fix_chem.png',
			'fixDash':             'e/e5/WikEd_fix_dash.png',
			'fixHtml':             '0/05/WikEd_fix_html.png',
			'fixMath':             '3/3f/WikEd_fix_math.png',
			'fixPunct':            'd/db/WikEd_fix_punct.png',
			'fixRegExTypo':        '9/94/WikEd_fix_reg-ex-typo.png',
			'fixUnits':            '6/69/WikEd_fix_units.png',
			'textZoom':            '7/71/WikEd_font_size.png',
			'fullScreen':          'd/d3/WikEd_fullscreen.png',
			'getFind':             '9/96/WikEd_get_selection.png',
			'grip':                'a/ad/WikEd_grip.png',
			'heading':             '0/07/WikEd_heading.png',
			'highlightSyntax':     '6/67/WikEd_syntax.png',
			'image':               '3/37/WikEd_image.png',
			'indentList':          '7/7a/WikEd_indent_list.png',
			'italic':              'd/d4/WikEd_italic.png',
			'jumpNext':            '5/54/WikEd_jump_next.png',
			'logo':                '6/67/WikEd_logo.png',
			'minusDash':           'b/ba/WikEd_minus_dash.png',
			'nowiki':              '5/5a/WikEd_nowiki.png',
			'numberList':          '3/3b/WikEd_number_list.png',
			'jumpPrev':            'c/c7/WikEd_jump_prev.png',
			'preview':             '3/31/WikEd_preview.png',
			'redirect':            'f/fa/WikEd_redirect.png',
			'redo':                'd/d7/WikEd_redo.png',
			'ref':                 'b/ba/WikEd_ref.png',
			'refHide':             '0/0b/WikEd_ref_hide.png',
			'references':          '6/66/WikEd_references.png',
			'redoAll':             '2/2d/WikEd_redo_all.png',
			'regExp':              '6/6a/WikEd_regexp.png',
			'replaceAll':          '2/2a/WikEd_replace_all.png',
			'replaceNext':         'b/b0/WikEd_replace_next.png',
			'replacePrev':         'a/a1/WikEd_replace_prev.png',
			'scrollToEdit':        '1/13/WikEd_align_top.png',
			'scrollToPreview':     '3/37/WikEd_align_preview.png',
			'scrollToEditDown':    'a/a8/WikEd_align_down.png',
			'scrollToPreviewDown': '5/58/WikEd_align_preview_down.png',
			'softHyphen':          'c/c7/WikEd_soft_hyphen.png',
			'sort':                '7/7c/WikEd_sort.png',
			'source':              '0/02/WikEd_source.png',
			'strikethrough':       '0/06/WikEd_strikethrough.png',
			'subscript':           '9/9e/WikEd_subscript.png',
			'superscript':         'b/bf/WikEd_superscript.png',
			'tab':                 'e/e7/WikEd_tab.png',
			'table':               'b/bd/WikEd_table.png',
			'tableMode':           'e/ee/WikEd_table_edit.png', // {{TABLE}}
			'tableBG':             '8/8a/WikEd_unknown.png', // {{TABLE}}
			'textify':             'c/cd/WikEd_textify.png',
			'thinSpace':           '5/56/WikEd_thin_space.png',
			'underline':           '2/21/WikEd_underline.png',
			'undo':                'e/e6/WikEd_undo.png',
			'undoAll':             '0/08/WikEd_undo_all.png',
			'unknown':             '8/8a/WikEd_unknown.png',
			'useWikEd':            '6/67/WikEd_logo.png',
			'using':               'e/e0/WikEd_using.png',
			'webLink':             '1/16/WikEd_weblink.png',
			'wikEdDiff':           'c/c6/WikEdDiff.png',
			'wikify':              '9/9f/WikEd_wikify.png',
			'wikiLink':            '2/21/WikEd_wikilink.png'
		});
	}

// edit-frame css rules
	if (typeof(wikEdFrameCSS) == 'undefined') { window.wikEdFrameCSS = {}; }

// WikedInitFrameCSS: define built-in edit frame css
	window.WikedInitFrameCSS = function() {
		WikEdInitObject(wikEdFrameCSS, {

// frame body
			'.wikEdFrameBody':    'background: #FFFFFF; margin: 0px; padding: 0.2em; overflow: -moz-scrollbars-vertical; overflow-x: auto; font-family: monospace;',

// syntax highlighting
			'.wikEdBlock':        'background-color: #e8e8e8;',
			'.wikEdBlockTag':     'color: #0000e0;',
			'.wikEdInlineTag':    'color: #0000e0;',
			'.wikEdUnknown':      'background-image: url({wikEdUnknown});',
			'.wikEdSubscript':    'position: relative; top: 0.3em;',
			'.wikEdSuperscript':  'position: relative; top: -0.3em;',
			'.wikEdBold':         'font-weight: bold;',
			'.wikEdRef':          'color: #808080; background-color: #e8e8e8;',
			'.wikEdRefHide':      'color: #c0c0c0;',
			'.wikEdComment':      'background-color: #fff0d0;',
			'.wikEdDel':          'text-decoration: line-through;',
			'.wikEdIns':          'text-decoration: underline;',
			'.wikEdItalic':       'font-style: italic;',
			'.wikEdNowiki':       'background-color: #e8e8e8;',
			'.wikEdRGB':          '',

// horizontal rule
			'.wikEdHR':           'background-color: #d0d0d0;',
			'.wikEdHRInline':     'background-color: #d0d0d0;',

// wiki code
			'.wikEdWiki':         'color: #0000e0;',
			'.wikEdWikiRedir':    'color: #0000e0; background-color: #ffffff; font-weight: bold;',
			'.wikEdMagic':        'color: #0000ff; background-color: #e0e0e0; font-weight: bold;',
			'.wikEdSignature':    'color: #0000ff; background-color: #ffffff; font-weight: bold;',

// headings
			'.wikEdHeading':      'background-color: #e0e0e0; font-weight: bold;',
			'.wikEdHeadingWp':    'background-color: #d8e0ff; font-weight: bold;',

// tables
			'.wikEdTableBlock':   'background-color: #e8e8e8;',
			'.wikEdTableLine':    'background-color: #e8e8e8;',
			'.wikEdTableTag':     'background-color: #e8e8e8; color: #0000e0;',

// list
			'.wikEdListBlock':    'background-color: #e8e8e8;',
			'.wikEdListLine':     'background-color: #f0f0f0',
			'.wikEdListTag':      'background-color: #e8e8e8; color: #0000e0; font-weight: bold;',

// space-pre
			'.wikEdSpaceBlock':   'background-color: #e8e8e8;',
			'.wikEdSpaceLine':    'background-color: #e8e8e8;',
			'.wikEdSpaceTag':     'color: #0000e0; font-weight: bold;',

// wiki links, images, categories, templates, parser functions
			'.wikEdLinkTag':      'color: #0000e0;',
			'.wikEdLink':         '',
			'.wikEdImage':        'background-color: #d5ffaa;',
			'.wikEdCat':          'background-color: #d0d8ff;',
			'.wikEdTempl':        'background-color: #e0e8ff;',
			'.wikEdTemplTag':     'color: #0000e0;',
			'.wikEdTemplParam':   'color: #000000; font-weight: bold;',
			'.wikEdParserFunct':  'color: #0000e0; font-weight: bold;',
			'.wikEdParam':        'background-color: #00e8ff;',
			'.wikEdTemplMod':     'color: #6900D2; font-weight: bold;',

// interlanguage
			'.wikEdInter':        'color: #000000;',
			'.wikEdLinkInter':    'background-color: #c8c8ff;',
			'.wikEdImageInter':   'background-color: #c8c8ff;',
			'.wikEdCatInter':     'background-color: #c8c8ff;',
			'.wikEdTemplInter':   'background-color: #c8c8ff;',

// name
			'.wikEdLinkName':     'color: #f00000; font-weight: bold;',
			'.wikEdImageName':    'color: #000000; font-weight: bold;',
			'.wikEdCatName':      'color: #f00000; font-weight: bold;',
			'.wikEdTemplName':    'color: #f00000; font-weight: bold;',
			'.wikEdURLLink':      'color: #f00000; font-weight: bold;',

// links
			'.wikEdHighlightLink': 'text-decoration: none; color: #909090;',
			':hover.wikEdHighlightLink': 'text-decoration: underline; color: #909090;',

// pasted html
			'.wikEdPastedHtml':   'background-color: #ffc080;',

// text and parameters
			'.wikEdLinkText':     'color: #000000; font-weight: bold;',
			'.wikEdImageParam':   'color: #0000e0;',
			'.wikEdImageCaption': 'color: #000000;',
			'.wikEdCatText':      'color: #000000;',
			'.wikEdTemplText':    'color: #000000;',
			'.wikEdURLText':      'color: #000000; font-weight: bold;',

// table edit // {{TABLE}}
			'.wikEdTableEdit':    'border: solid black; border-width: 1px 1px 0 0; background-color: red; background-image: url(\'' + wikEdImage['tableBG'] +  '\'); border-collapse: separate; border-spacing: 0;',
			'.wikEdTableEdit td': 'border: solid black; border-width: 0 0 1px 1px; background-color: white;',
			'.wikEdTableEdit th': 'border: solid black; border-width: 0 0 1px 1px; background-color: lightgrey; font-weight: bold;',
			'.wikEdTableEdit tr': 'background-color: lightgrey; font-weight: bold;',

// insert wikicode here
			'.wikEdInsertHere':   'background-color: orange; font-style: italic;',

// colors
			'.wikEdColorsLight':  'color: black;',
			'.wikEdColorsDark':   'color: white;',

// dashes
			'.wikEdFigureDash':   'background-image: url({wikEdFigureDash}); background-position: top right; background-repeat: no-repeat;',
			'.wikEdEmDash':       'background-image: url({wikEdEmDash}); background-position: top left; background-repeat: no-repeat;',
			'.wikEdEnDash':       'background-image: url({wikEdEnDash}); background-position: top left; background-repeat: no-repeat;',
			'.wikEdBarDash':      'background-image: url({wikEdBarDash}); background-position: top left; background-repeat: no-repeat;',
			'.wikEdMinusDash':    'background-image: url({wikEdMinusDash}); background-position: top left; background-repeat: no-repeat;',
			'.wikEdSoftHyphen':   'background-image: url({wikEdSoftHyphen}); background-position: top left; background-repeat: no-repeat;',
			'.wikEdSoftHyphen:before': 'content: \'\xa0\'',
			'.wikEdHyphenDash':   '',

// dashes, invisibles, control chars, and strange spaces
			'.wikEdTab':          'white-space: pre; background-image: url({wikEdTab}); background-position: bottom right; background-repeat: no-repeat;',
			'.wikEdTabPlain':     'white-space: pre;',
			'.wikEdCtrl':         'white-space: pre; background-image: url({wikEdCtrl}); background-position: center center; background-repeat: no-repeat; margin: 0 1px;',
			'.wikEdCtrl:before':  'content: \'\xa0\'',

			'.wikEdEmSpace':      'background-image: url({wikEdEmSpace}); background-position: bottom left; background-repeat: no-repeat; margin: 0 1px; padding: 0 3px;',
			'.wikEdEnSpace':      'background-image: url({wikEdEnSpace}); background-position: bottom left; background-repeat: no-repeat; margin: 0 1px; padding: 0 3px;',
			'.wikEdThinSpace':    'background-image: url({wikEdThinSpace}); background-position: bottom left; background-repeat: no-repeat; margin: 0 1px; padding: 0 3px;',
		});
	}

// main window css rules
	if (typeof(wikEdMainCSS) == 'undefined') { window.wikEdMainCSS = {}; }

// WikedInitMainCSS: define built-in main window css
	window.WikedInitMainCSS = function() {
		WikEdInitObject(wikEdMainCSS, {

// logo
			'.wikEdLogo':                  'margin-left: 0.5em;',
			'.wikEdLogoFallBack':          'float: right;',

// combo input box
			'.wikEdCombo':                 'font-size: smaller; padding-left: 0.1em; padding-right: 0.1em; margin: 0 0.1em 0 0.1em; height: 1.6em; vertical-align: bottom;',

// wikEd button areas

// button bar margins
			'.wikEdButtonBarFormat':       'margin: 0 8px 3px 0; float: left;',
			'.wikEdButtonBarTextify':      'margin: 0 8px 3px 0; float: left;',
			'.wikEdButtonBarCustom1':      'margin: 0 8px 3px 0; float: left;',
			'.wikEdButtonBarFind':         'margin: 0 8px 3px 0; float: left;',
			'.wikEdButtonBarFix':          'margin: 0 8px 3px 0; float: left;',
			'.wikEdButtonBarCustom2':      'margin: 0 8px 3px 0; float: left;',
			'.wikEdButtonBarControl':      'margin: 0 0 3px 0; float: right;',
			'.wikEdButtonBarPreview':      'margin: 0 0 0.15em 0.6em; float: right;',
			'.wikEdButtonBarPreviewFull':  'margin: -0.2em 0 0 0.6em; float: right;',
			'.wikEdButtonBarPreview2':     'margin: 0.2em 0 0.4em 0; float: right;',
			'.wikEdButtonBarJump':         'margin: 0 0 0 0.6em; float: right;',

// button bar inner wrapper: border (hidden: invisible)
			'.wikEdButtonBarInnerWrapperVisible':   'border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0;',
			'.wikEdButtonBarInnerWrapperHidden':    '',

// button bar grip wrapper: invisible (hidden: border)
			'.wikEdButtonBarGripWrapperVisible':    'float: left;',
			'.wikEdButtonBarGripWrapperHidden':     'float: left; border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0;',

// button bar buttons wrapper: invisible (hidden: border)
			'.wikEdButtonBarButtonsWrapperVisible': 'float: left; background: #d4d0cc; ',
			'.wikEdButtonBarButtonsWrapperHidden':  'float: left; background: #d4d0cc; border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0; z-index: 4;',

// button bar grip
			'.wikEdButtonBarGrip':         'background: #d4d0cc; padding: 0; background-image: url({wikEdGrip}); background-repeat: repeat-y; cursor: pointer;',

// button bar buttons
			'.wikEdButtonsFormat':         'background: #d4d0cc; padding: 2px 2px 0 0px;',
			'.wikEdButtonsTextify':        'background: #d4d0cc; padding: 2px 2px 0 0px;',
			'.wikEdButtonsCustom1':        'background: #d4d0cc; padding: 2px 2px 0 0px;',
			'.wikEdButtonsFind':           'background: #d4d0cc; padding: 0px 2px 0 0px;',
			'.wikEdButtonsFix':            'background: #d4d0cc; padding: 2px 2px 0 0px;',
			'.wikEdButtonsCustom2':        'background: #d4d0cc; padding: 2px 2px 0 0px;',
			'.wikEdButtonsControl':        'background: #d4d0cc; padding: 2px 2px 0 1px;',

			'.wikEdButtonsPreview':        'background: #d4d0cc; padding: 2px; border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0;',
			'.wikEdButtonsPreviewFull':    'background: #d4d0cc; padding: 2px; border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0;',
			'.wikEdButtonsPreview2':       'background: #d4d0cc; padding: 2px; border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0;',
			'.wikEdButtonsJump':           'background: #d4d0cc; padding: 2px; border: 1px solid; border-color: #e0e0e0 #808080 #808080 #e0e0e0;',

// wikEd buttons (!important for devmo skin)
			'.wikEdButton':                'vertical-align: text-top; font-size: small; text-decoration: underline; margin: 1px 2px; padding: 0; background: #d4d0cc; border: 1px #d4d0cc solid !important; cursor: pointer;',
			'.wikEdButton:hover':          'background: #e4e0dd; border: 1px outset !important; cursor: pointer;',
			'.wikEdButton:active':         'background: #e4e0dc; border: 1px inset !important;  cursor: pointer;',
			'.wikEdButtonSolo':            'vertical-align: text-top; font-size: small; text-decoration: underline; margin: 1px 2px; padding: 0; background: #d4d0cc; border: 1px #d4d0cc solid !important; cursor: pointer;',
			'.wikEdButtonSolo:hover':      'background: #e4e0dd; border: 1px outset !important; cursor: pointer;',
			'.wikEdButtonChecked':         'vertical-align: text-top; font-size: small; text-decoration: none; margin: 1px 2px; padding: 0; background: #ccc8c3; border: 1px solid !important; border-color: black white white black !important; cursor: pointer;',
			'.wikEdButtonUnchecked':       'vertical-align: text-top; font-size: small; text-decoration: none; margin: 1px 2px; padding: 0; background: #ddd8d3; border: 1px solid !important; border-color: white black black white !important; cursor: pointer;',
			'.wikEdButtonPressed':         'vertical-align: text-top; font-size: small; text-decoration: none; margin: 1px 2px; padding: 0; background: #ccc8c3; border: 1px solid !important; border-color: black white white black !important; cursor: wait;',
			'.wikEdButtonInactive':        'vertical-align: text-top; font-size: small; text-decoration: underline; margin: 1px 2px; padding: 0; background: #c0c0c0; border: 1px #b0b0b0 solid !important; cursor: not-allowed',
			'.wikEdLocalPreview':          'vertical-align: top; margin: 0 0.33em 0 0.15em; padding: 0;',
			'.wikEdLocalDiff':             'vertical-align: top; margin: 0 0.33em 0 -0.18em; padding: 0;',
			'.wikEdButtonDummy':           'vertical-align: text-top; margin: 1px 2px; padding: 1px; background: #d4d0cc;',

// preview box
			'.wikEdPreviewBoxOuter':       'clear: both; margin: 0; border-width: 1px; border-style: solid; border-color: #808080 #d0d0d0 #d0d0d0 #808080;',
			'.wikEdPreviewBox':            'background-color: #faf8f6; padding: 5px; border-width: 1px; border-style: solid; border-color: #404040 #ffffff #ffffff #404040;',
			'.wikEdPreviewRefs':           'margin-top: 1.5em; padding-top: 1em;border-top: 1px solid #a0a0a0;',

// find field
			'.wikEdFindComboInput':        'position: relative; padding: 0; margin: 0 0.2em; white-space: nowrap; top: 0; vertical-align: bottom;',
			'#wikEdFindText':              'vertical-align: 0%; font-family: monospace; padding: 0; margin: 0; position: absolute; z-index: 2; -moz-box-sizing: content-box; left: 0; top: 1px; height: 14px; width: 170px;',
			'#wikEdFindSelect':            'vertical-align: 0%; font-family: monospace; padding: 0; margin: 0; position: relative; z-index: 1; -moz-box-sizing: content-box; left: 0; top: 0px; height: 18px; border: none;',

// replace field
			'.wikEdReplaceComboInput':     'position: relative; padding: 0; margin: 0 0.2em; white-space: nowrap; top: 0; vertical-align: bottom;',
			'#wikEdReplaceText':           'vertical-align: 0%; font-family: monospace; padding: 0; margin: 0; position: absolute; z-index: 2; -moz-box-sizing: content-box; left: 0; top: 1px; height: 14px; width: 170px;',
			'#wikEdReplaceSelect':         'vertical-align: 0%; font-family: monospace; padding: 0; margin: 0; position: relative; z-index: 1; -moz-box-sizing: content-box; left: 0; top: 0px; height: 18px; border: none; ',

// summary field
			'.wikEdSummaryComboInput':     'position: relative; padding: 0; margin: 0 0 0 0.1em; white-space: nowrap; top: 0; vertical-align: text-bottom;',
			'.wikEdSummaryText':           'vertical-align: 0%; padding: 0; margin: 0; position: absolute; z-index: 2; -moz-box-sizing: content-box; left: 0; top: 0px; height: 18px; width: auto;',
			'.wikEdSummarySelect':         'vertical-align: 0%; padding: 0; margin: 0; position: relative; z-index: 1; -moz-box-sizing: content-box; left: 0; top: 1px; height: 21px; border: none;',

// space around submit buttons
			'.editButtons':                'margin: 0;',

// frame
			'.wikEdFrameOuter':            'width: 100%; margin: 0; border-width: 1px; border-style: solid; border-color: #808080 #d0d0d0 #d0d0d0 #808080;',
			'.wikEdFrameInner':            'padding: 0; border-width: 1px; border-style: solid; border-color: #404040 #ffffff #ffffff #404040;',
			'.wikEdFrame':                 'width: 100%; padding: 0; margin: 0; border: none;',

// summary
			'.wikEdSummaryWrapper':        'margin: 0 0 0.4em 0; width: 100%',
			'.wikEdSummaryWrapperTop':     'margin: 0.1em 0 0.4em 0; width: 100%',
			'#wpSummaryLabel':             'margin: 0 0.2em 0 0;',
			'.editOptions':                'position: relative; top: 0.1em;',
			'.wikEdClearSummaryForm':      'display: inline;',
			'.wikEdClearSummary':          'vertical-align: middle; margin: 0 0.1em 0 0.5em; padding: 0 0 0.2em 0;',

// input wrapper
			'.wikEdInputWrapper':          'z-index: 100; clear: both; margin-top: 0.5em;',
			'.wikEdInputWrapperFull':      'position: fixed; top: 0; left: 0; right: 0; padding: 4px; background: white; z-index: 100;',

// other wrappers
			'.wikEdToolbarWrapper':        'margin: 0 0 0.25em 0;',
			'.wikEdCaptchaWrapper':        '',
			'.wikEdDebugWrapper':          'margin: 0 0 0.35em 0;',
			'.wikEdEditWrapper':           'margin: 0 0 0.35em 0;',
			'.wikEdTextareaWrapper':       '',
			'.wikEdFrameWrapper':          '',
			'.wikEdConsoleWrapper':        '',
			'.wikEdButtonsWrapper':        '',
			'.wikEdSummaryInputWrapper':   'display: inline; white-space: nowrap;',
			'.wikEdSummaryOptions':        'display: inline;',
			'.wikEdSubmitWrapper':         ';',
			'.wikEdSubmitButtonsWrapper':  '',
			'.wikEdLocalPrevWrapper':      'margin: 0.5em 0 0 0;',
			'.wikEdInsertWrapper':         '',

// various
			'.wikEdEditOptions':           'display: inline; vertical-align: baseline; margin-right: 0.75em; white-space: nowrap;',
			'.wikEdEditHelp':              'vertical-align: baseline; margin-right: 0.5em; white-space: nowrap;',
			'#editpage-specialchars':      'clear: both;'
		});
	}

// buttons (id, class, popup title, image src, width, height, alt text, click code)
	if (typeof(wikEdButton) == 'undefined') { window.wikEdButton = {}; }

// WikedInitButton: define built-in buttons (id, class, popup title, image src, width, height, alt text, click handler code were obj is the button element)
	window.WikedInitButton = function() {
		WikEdInitObject(wikEdButton, {

// workaround for mozilla 3.0 bug 441087: objId = obj.id; eventShiftKey = event.shiftKey;

// format top
			 1: ['wikEdUndo',             'wikEdButtonInactive',  wikEdText['wikEdUndo title'],             wikEdImage['undo'],                '16', '16', wikEdText['wikEdUndo alt'],             'javascript:WikEdEditButton(obj, objId);' ],
			 2: ['wikEdRedo',             'wikEdButtonInactive',  wikEdText['wikEdRedo title'],             wikEdImage['redo'],                '16', '16', wikEdText['wikEdRedo alt'],             'javascript:WikEdEditButton(obj, objId);' ],
			 3: ['wikEdBold',             'wikEdButton',          wikEdText['wikEdBold title'],             wikEdImage['bold'],                '16', '16', wikEdText['wikEdBold alt'],             'javascript:WikEdEditButton(obj, objId);' ],
			 4: ['wikEdItalic',           'wikEdButton',          wikEdText['wikEdItalic title'],           wikEdImage['italic'],              '16', '16', wikEdText['wikEdItalic alt'],           'javascript:WikEdEditButton(obj, objId);' ],
			 5: ['wikEdUnderline',        'wikEdButton',          wikEdText['wikEdUnderline title'],        wikEdImage['underline'],           '16', '16', wikEdText['wikEdUnderline alt'],        'javascript:WikEdEditButton(obj, objId);' ],
			 6: ['wikEdStrikethrough',    'wikEdButton',          wikEdText['wikEdStrikethrough title'],    wikEdImage['strikethrough'],       '16', '16', wikEdText['wikEdStrikethrough alt'],    'javascript:WikEdEditButton(obj, objId);' ],
			 7: ['wikEdNowiki',           'wikEdButton',          wikEdText['wikEdNowiki title'],           wikEdImage['nowiki'],              '16', '16', wikEdText['wikEdNowiki alt'],           'javascript:WikEdEditButton(obj, objId);' ],
			 8: ['wikEdSuperscript',      'wikEdButton',          wikEdText['wikEdSuperscript title'],      wikEdImage['superscript'],         '16', '16', wikEdText['wikEdSuperscript alt'],      'javascript:WikEdEditButton(obj, objId);' ],
			 9: ['wikEdSubscript',        'wikEdButton',          wikEdText['wikEdSubscript title'],        wikEdImage['subscript'],           '16', '16', wikEdText['wikEdSubscript alt'],        'javascript:WikEdEditButton(obj, objId);' ],
			10: ['wikEdRef',              'wikEdButton',          wikEdText['wikEdRef title'],              wikEdImage['ref'],                 '16', '16', wikEdText['wikEdRef alt'],              'if (!eventShiftKey) { javascript:WikEdEditButton(obj, \'wikEdRef\'); } else { javascript:WikEdEditButton(obj, \'wikEdRefNamed\'); }' ],
			12: ['wikEdCase',             'wikEdButton',          wikEdText['wikEdCase title'],             wikEdImage['case'],                '16', '16', wikEdText['wikEdCase alt'],             'javascript:WikEdEditButton(obj, objId);' ],
			80: ['wikEdSort',             'wikEdButton',          wikEdText['wikEdSort title'],             wikEdImage['sort'],                '16', '16', wikEdText['wikEdSort alt'],             'javascript:WikEdEditButton(obj, objId);' ],
			25: ['wikEdRedirect',         'wikEdButton',          wikEdText['wikEdRedirect title'],         wikEdImage['redirect'],            '16', '16', wikEdText['wikEdRedirect alt'],         'javascript:WikEdEditButton(obj, objId);' ],
			13: ['wikEdUndoAll',          'wikEdButton',          wikEdText['wikEdUndoAll title'],          wikEdImage['undoAll'],             '16', '16', wikEdText['wikEdUndoAll alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			14: ['wikEdRedoAll',          'wikEdButtonInactive',  wikEdText['wikEdRedoAll title'],          wikEdImage['redoAll'],             '16', '16', wikEdText['wikEdRedoAll alt'],          'javascript:WikEdEditButton(obj, objId);' ],

// format bottom
			15: ['wikEdWikiLink',         'wikEdButton',          wikEdText['wikEdWikiLink title'],         wikEdImage['wikiLink'],            '16', '16', wikEdText['wikEdWikiLink alt'],         'javascript:WikEdEditButton(obj, objId);' ],
			16: ['wikEdWebLink',          'wikEdButton',          wikEdText['wikEdWebLink title'],          wikEdImage['webLink'],             '16', '16', wikEdText['wikEdWebLink alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			17: ['wikEdHeading',          'wikEdButton',          wikEdText['wikEdHeading title'],          wikEdImage['heading'],             '16', '16', wikEdText['wikEdHeading alt'],          'if (!eventShiftKey) { javascript:WikEdEditButton(obj, \'wikEdIncreaseHeading\'); } else { javascript:WikEdEditButton(obj, \'wikEdDecreaseHeading\'); }' ],
			19: ['wikEdBulletList',       'wikEdButton',          wikEdText['wikEdBulletList title'],       wikEdImage['bulletList'],          '16', '16', wikEdText['wikEdBulletList alt'],       'if (!eventShiftKey) { javascript:WikEdEditButton(obj, \'wikEdIncreaseBulletList\'); } else { javascript:WikEdEditButton(obj, \'wikEdDecreaseBulletList\'); }' ],
			20: ['wikEdNumberList',       'wikEdButton',          wikEdText['wikEdNumberList title'],       wikEdImage['numberList'],          '16', '16', wikEdText['wikEdNumberList alt'],       'if (!eventShiftKey) { javascript:WikEdEditButton(obj, \'wikEdIncreaseNumberList\'); } else { javascript:WikEdEditButton(obj, \'wikEdDecreaseNumberList\'); }' ],
			21: ['wikEdIndentList',       'wikEdButton',          wikEdText['wikEdIndentList title'],       wikEdImage['indentList'],          '16', '16', wikEdText['wikEdIndentList alt'],       'if (!eventShiftKey) { javascript:WikEdEditButton(obj, \'wikEdIncreaseIndentList\'); } else { javascript:WikEdEditButton(obj, \'wikEdDecreaseIndentList\'); }' ],
			22: ['wikEdDefinitionList',   'wikEdButton',          wikEdText['wikEdDefinitionList title'],   wikEdImage['definitionList'],      '16', '16', wikEdText['wikEdDefinitionList alt'],   'javascript:WikEdEditButton(obj, objId);' ],
			23: ['wikEdImage',            'wikEdButton',          wikEdText['wikEdImage title'],            wikEdImage['image'],               '16', '16', wikEdText['wikEdImage alt'],            'javascript:WikEdEditButton(obj, objId);' ],
			24: ['wikEdTable',            'wikEdButton',          wikEdText['wikEdTable title'],            wikEdImage['table'],               '16', '16', wikEdText['wikEdTable alt'],            'javascript:WikEdEditButton(obj, objId);' ],
			11: ['wikEdReferences',       'wikEdButton',          wikEdText['wikEdReferences title'],       wikEdImage['references'],          '16', '16', wikEdText['wikEdReferences alt'],       'if (!eventShiftKey) { javascript:WikEdEditButton(obj, objId); } else { javascript:WikEdEditButton(obj, \'wikEdReferencesSection\'); }' ],
			26: ['wikEdWikify',           'wikEdButton',          wikEdText['wikEdWikify title'],           wikEdImage['wikify'],              '16', '16', wikEdText['wikEdWikify alt'],           'javascript:WikEdEditButton(obj, objId);' ],
			27: ['wikEdTextify',          'wikEdButton',          wikEdText['wikEdTextify title'],          wikEdImage['textify'],             '16', '16', wikEdText['wikEdTextify alt'],          'javascript:WikEdEditButton(obj, objId);' ],

// control top
			77: ['wikEdRefHide',          'wikEdButtonUnchecked', wikEdText['wikEdRefHide title'],          wikEdImage['refHide'],             '16', '16', wikEdText['wikEdRefHide alt'],          'javascript:WikEdButton(obj, objId, true);' ],
			29: ['wikEdTextZoom',         'wikEdButton',          wikEdText['wikEdTextZoom title'],         wikEdImage['textZoom'],            '16', '16', wikEdText['wikEdTextZoom alt'],         'if (!eventShiftKey) { javascript:WikEdButton(obj, \'wikEdTextZoomDown\'); } else { javascript:WikEdButton(obj, \'wikEdTextZoomUp\'); }' ],
			30: ['wikEdClearHistory',     'wikEdButton',          wikEdText['wikEdClearHistory title'],     wikEdImage['clearHistory'],        '16', '16', wikEdText['wikEdClearHistory alt'],     'javascript:WikEdButton(obj, objId);' ],
			31: ['wikEdScrollToPreview',  'wikEdButton',          wikEdText['wikEdScrollToPreview title'],  wikEdImage['scrollToPreviewDown'], '16', '16', wikEdText['wikEdScrollToPreview alt'],  'javascript:WikEdButton(obj, objId);' ],
			32: ['wikEdScrollToEdit',     'wikEdButton',          wikEdText['wikEdScrollToEdit title'],     wikEdImage['scrollToEditDown'],    '16', '16', wikEdText['wikEdScrollToEdit alt'],     'javascript:WikEdButton(obj, objId);' ],

// control bottom
			33: ['wikEdUseWikEd',         'wikEdButtonChecked',   wikEdText['wikEdUseWikEd title'],         wikEdImage['useWikEd'],            '16', '16', wikEdText['wikEdUseWikEd alt'],         'javascript:WikEdButton(obj, objId, true);' ],
			34: ['wikEdHighlightSyntax',  'wikEdButtonUnchecked', wikEdText['wikEdHighlightSyntax title'],  wikEdImage['highlightSyntax'],     '16', '16', wikEdText['wikEdHighlightSyntax alt'],  'javascript:WikEdButton(obj, objId, true);' ],
			35: ['wikEdSource',           'wikEdButton',          wikEdText['wikEdSource title'],           wikEdImage['source'],              '16', '16', wikEdText['wikEdSource alt'],           'javascript:WikEdEditButton(obj, objId);' ],
			75: ['wikEdCloseToolbar',     'wikEdButtonUnchecked', wikEdText['wikEdCloseToolbar title'],     wikEdImage['closeToolbar'],        '16', '16', wikEdText['wikEdCloseToolbar alt'],     'javascript:WikEdButton(obj, objId, true);' ],
			36: ['wikEdUsing',            'wikEdButtonUnchecked', wikEdText['wikEdUsing title'],            wikEdImage['using'],               '16', '16', wikEdText['wikEdUsing alt'],            'javascript:WikEdButton(obj, objId, true);' ],
			37: ['wikEdFullScreen',       'wikEdButtonUnchecked', wikEdText['wikEdFullScreen title'],       wikEdImage['fullScreen'],          '16', '16', wikEdText['wikEdFullScreen alt'],       'javascript:WikEdButton(obj, objId, true);' ],
// {{TABLE}}
			79: ['wikEdTableMode',        'wikEdButtonUnchecked', wikEdText['wikEdTableMode title'],        wikEdImage['tableMode'],           '16', '16', wikEdText['wikEdTableMode alt'],        'javascript:WikEdButton(obj, objId, true);' ],

// find top
			39: ['wikEdFindAll',          'wikEdButton',          wikEdText['wikEdFindAll title'],          wikEdImage['findAll'],             '16', '16', wikEdText['wikEdFindAll alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			40: ['wikEdFindPrev',         'wikEdButton',          wikEdText['wikEdFindPrev title'],         wikEdImage['findPrev'],            '16', '16', wikEdText['wikEdFindPrev alt'],         'javascript:WikEdEditButton(obj, objId);' ],
			41: ['wikEdFindNext',         'wikEdButton',          wikEdText['wikEdFindNext title'],         wikEdImage['findNext'],            '16', '16', wikEdText['wikEdFindNext alt'],         'if (eventShiftKey) { javascript:WikEdEditButton(obj, objId, \'shift\'); } else { javascript:WikEdEditButton(obj, objId); }' ],
			43: ['wikEdJumpPrev',         'wikEdButton',          wikEdText['wikEdJumpPrev title'],         wikEdImage['jumpPrev'],            '16', '16', wikEdText['wikEdJumpPrev alt'],         'javascript:WikEdEditButton(obj, objId);' ],
			44: ['wikEdJumpNext',         'wikEdButton',          wikEdText['wikEdJumpNext title'],         wikEdImage['jumpNext'],            '16', '16', wikEdText['wikEdJumpNext alt'],         'javascript:WikEdEditButton(obj, objId);' ],

// find bottom
			46: ['wikEdReplaceAll',       'wikEdButton',          wikEdText['wikEdReplaceAll title'],       wikEdImage['replaceAll'],          '16', '16', wikEdText['wikEdReplaceAll alt'],       'javascript:WikEdEditButton(obj, objId);' ],
			47: ['wikEdReplacePrev',      'wikEdButton',          wikEdText['wikEdReplacePrev title'],      wikEdImage['replacePrev'],         '16', '16', wikEdText['wikEdReplacePrev alt'],      'javascript:WikEdEditButton(obj, objId);' ],
			48: ['wikEdReplaceNext',      'wikEdButton',          wikEdText['wikEdReplaceNext title'],      wikEdImage['replaceNext'],         '16', '16', wikEdText['wikEdReplaceNext alt'],      'if (eventShiftKey) { javascript:WikEdEditButton(obj, objId, \'shift\'); } else { javascript:WikEdEditButton(obj, objId); }' ],
			49: ['wikEdCaseSensitive',    'wikEdButtonUnchecked', wikEdText['wikEdCaseSensitive title'],    wikEdImage['caseSensitive'],       '16', '16', wikEdText['wikEdCaseSensitive alt'],    'javascript:WikEdButton(obj, objId, true);' ],
			50: ['wikEdRegExp',           'wikEdButtonUnchecked', wikEdText['wikEdRegExp title'],           wikEdImage['regExp'],              '16', '16', wikEdText['wikEdRegExp alt'],           'javascript:WikEdButton(obj, objId, true);' ],
			51: ['wikEdFindAhead',        'wikEdButtonUnchecked', wikEdText['wikEdFindAhead title'],        wikEdImage['findAhead'],           '16', '16', wikEdText['wikEdFindAhead alt'],        'javascript:WikEdButton(obj, objId, true);' ],

// fix top
			52: ['wikEdFixBasic',         'wikEdButton',          wikEdText['wikEdFixBasic title'],         wikEdImage['fixBasic'],            '16', '16', wikEdText['wikEdFixBasic alt'],         'javascript:WikEdEditButton(obj, objId);' ],
			53: ['wikEdFixHtml',          'wikEdButton',          wikEdText['wikEdFixHtml title'],          wikEdImage['fixHtml'],             '16', '16', wikEdText['wikEdFixHtml alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			54: ['wikEdFixCaps',          'wikEdButton',          wikEdText['wikEdFixCaps title'],          wikEdImage['fixCaps'],             '16', '16', wikEdText['wikEdFixCaps alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			55: ['wikEdFixUnicode',       'wikEdButton',          wikEdText['wikEdFixUnicode title'],       wikEdImage['fixUnicode'],          '16', '16', wikEdText['wikEdFixUnicode alt'],       'javascript:WikEdEditButton(obj, objId);' ],
			81: ['wikEdFixRedirect',      'wikEdButton',          wikEdText['wikEdFixRedirect title'],      wikEdImage['fixRedirect'],         '16', '16', wikEdText['wikEdFixRedirect alt'],      'javascript:WikEdEditButton(obj, objId);' ],
			56: ['wikEdFixAll',           'wikEdButton',          wikEdText['wikEdFixAll title'],           wikEdImage['fixAll'],              '16', '16', wikEdText['wikEdFixAll alt'],           'javascript:WikEdEditButton(obj, objId);' ],
			57: ['wikEdFixRegExTypo',     'wikEdButton',          wikEdText['wikEdFixRegExTypo title'],     wikEdImage['fixRegExTypo'],        '16', '16', wikEdText['wikEdFixRegExTypo alt'],     'javascript:WikEdEditButton(obj, objId);' ],

// fix bottom
			58: ['wikEdFixDashes',        'wikEdButton',          wikEdText['wikEdFixDashes title'],        wikEdImage['fixDash'],             '16', '16', wikEdText['wikEdFixDashes alt'],        'javascript:WikEdEditButton(obj, objId);' ],
			59: ['wikEdFixPunct',         'wikEdButton',          wikEdText['wikEdFixPunct title'],         wikEdImage['fixPunct'],            '16', '16', wikEdText['wikEdFixPunct alt'],         'javascript:WikEdEditButton(obj, objId);' ],
			60: ['wikEdFixMath',          'wikEdButton',          wikEdText['wikEdFixMath title'],          wikEdImage['fixMath'],             '16', '16', wikEdText['wikEdFixMath alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			61: ['wikEdFixChem',          'wikEdButton',          wikEdText['wikEdFixChem title'],          wikEdImage['fixChem'],             '16', '16', wikEdText['wikEdFixChem alt'],          'javascript:WikEdEditButton(obj, objId);' ],
			62: ['wikEdFixUnits',         'wikEdButton',          wikEdText['wikEdFixUnits title'],         wikEdImage['fixUnits'],            '16', '16', wikEdText['wikEdFixUnits alt'],         'javascript:WikEdEditButton(obj, objId);' ],

// preview top
			65: ['wikEdClose',            'wikEdButton',          wikEdText['wikEdClose title'],            wikEdImage['close'],               '16', '16', wikEdText['wikEdClose alt'],            'javascript:WikEdButton(obj, objId);' ],
			66: ['wikEdScrollToPreview2', 'wikEdButton',          wikEdText['wikEdScrollToPreview2 title'], wikEdImage['scrollToPreviewDown'], '16', '16', wikEdText['wikEdScrollToPreview2 alt'], 'javascript:WikEdButton(obj, objId);' ],
			67: ['wikEdScrollToEdit2',    'wikEdButton',          wikEdText['wikEdScrollToEdit2 title'],    wikEdImage['scrollToEdit'],        '16', '16', wikEdText['wikEdScrollToEdit2 alt'],    'javascript:WikEdButton(obj, objId);' ],

// preview bottom
			70: ['wikEdClose2',           'wikEdButton',          wikEdText['wikEdClose2 title'],           wikEdImage['close'],               '16', '16', wikEdText['wikEdClose2 alt'],           'javascript:WikEdButton(obj, objId);' ],
			71: ['wikEdScrollToPreview3', 'wikEdButton',          wikEdText['wikEdScrollToPreview3 title'], wikEdImage['scrollToPreview'],     '16', '16', wikEdText['wikEdScrollToPreview3 alt'], 'javascript:WikEdButton(obj, objId);' ],
			72: ['wikEdScrollToEdit3',    'wikEdButton',          wikEdText['wikEdScrollToEdit3 title'],    wikEdImage['scrollToEdit'],        '16', '16', wikEdText['wikEdScrollToEdit3 alt'],    'javascript:WikEdButton(obj, objId);' ],

// jump
			78: ['wikEdDiff',             'wikEdButtonUnchecked', wikEdText['wikEdDiff title'],             wikEdImage['wikEdDiff'],           '16', '16', wikEdText['wikEdDiff alt'],             'javascript:WikEdButton(obj, objId, true);' ],
			74: ['wikEdScrollToEdit4',    'wikEdButtonSolo',      wikEdText['wikEdScrollToEdit4 title'],    wikEdImage['scrollToEditDown'],    '16', '16', wikEdText['wikEdScrollToEdit4 alt'],    'javascript:WikEdButton(obj, objId);' ],

// dummy
			76: ['wikEdDummy',            'wikEdButtonDummy',     '',                                       wikEdImage['dummy'],               '16', '16', '',                                     '' ]
		});
	}

// button access keys
	if (typeof(wikEdButtonKey) == 'undefined') { window.wikEdButtonKey = {}; }

// WikedInitButtonKey: define accesskeys for edit buttons (wikEd button number: [key string, JS key code])
	window.WikedInitButtonKey = function() {
		WikEdInitObject(wikEdButtonKey, {
			26: ['b', 66], // wikify
			27: ['o', 79], // textify
			67: ['g', 71], // scrolltoedit2
			72: ['g', 71], // scrolltoedit3
			74: ['g', 71], // scrolltoedit4
			32: ['g', 71]  // scrolltoedit, overwrites previous wikEd buttons for same key
		});
	}

// button bars (id, class, button numbers)
	if (typeof(wikEdButtonBar) == 'undefined') { window.wikEdButtonBar = {}; }

// WikedInitButtonBar: define built-in button bars (id outer, class outer, id inner, class inner, height, grip title, button numbers)
	window.WikedInitButtonBar = function() {
		WikEdInitObject(wikEdButtonBar, {
			'format':    ['wikEdButtonBarFormat',    'wikEdButtonBarFormat',    'wikEdButtonsFormat',    'wikEdButtonsFormat',    44, wikEdText['wikEdGripFormat title'],  [1,2,3,4,5,6,7,8,9,10,12,13,14,'br',15,16,17,19,20,21,22,23,24,11,80,25,76] ],
			'textify':   ['wikEdButtonBarTextify',   'wikEdButtonBarTextify',   'wikEdButtonsTextify',   'wikEdButtonsTextify',   44, wikEdText['wikEdGripTextify title'], [26,'br',27] ],
			'custom1':   ['wikEdButtonBarCustom1',   'wikEdButtonBarCustom1',   'wikEdButtonsCustom1',   'wikEdButtonsCustom1',   44, wikEdText['wikEdGripCustom1 title'], [ ] ],
			'find':      ['wikEdButtonBarFind',      'wikEdButtonBarFind',      'wikEdButtonsFind',      'wikEdButtonsFind',      44, wikEdText['wikEdGripFind title'],    [39,40,'find',41,76,43,44,'br',46,47,'replace',48,49,50,51] ],
			'fix':       ['wikEdButtonBarFix',       'wikEdButtonBarFix',       'wikEdButtonsFix',       'wikEdButtonsFix',       44, wikEdText['wikEdGripFix title'],     [52,53,54,55,56,81,'br',58,59,60,61,62,57] ],
			'custom2':   ['wikEdButtonBarCustom2',   'wikEdButtonBarCustom2',   'wikEdButtonsCustom2',   'wikEdButtonsCustom2',   44, wikEdText['wikEdGripCustom2 title'], [ ] ],
			'control':   ['wikEdButtonBarControl',   'wikEdButtonBarControl',   'wikEdButtonsControl',   'wikEdButtonsControl',   44, wikEdText['wikEdGripControl title'], [77,29,30,35,31,32,'br',33,34,79,75,36,78,37] ],
			'preview':   ['wikEdButtonBarPreview',   'wikEdButtonBarPreview',   'wikEdButtonsPreview',   'wikEdButtonsPreview',    0, null,                                [66,67,65] ],
			'preview2':  ['wikEdButtonBarPreview2',  'wikEdButtonBarPreview2',  'wikEdButtonsPreview2',  'wikEdButtonsPreview2',   0, null,                                [71,72,70] ],
			'jump':      ['wikEdButtonBarJump',      'wikEdButtonBarJump',      'wikEdButtonsJump',      'wikEdButtonsJump',       0, null,                                [74] ]
		});
	}

// history length for find, replace, and summary fields
	if (typeof(wikEdHistoryLength) == 'undefined') { window.wikEdHistoryLength = {}; }
	wikEdHistoryLength['find'] = 10;
	wikEdHistoryLength['replace'] = 10;
	wikEdHistoryLength['summary'] = 10;

// presets for combo input fields dropdown options, {wikEdUsing} appends a link to this script
	if (typeof(wikEdComboPresetOptions) == 'undefined') { window.wikEdComboPresetOptions = {}; }
	if (typeof(wikEdComboPresetOptions['summary']) == 'undefined') { window.wikEdComboPresetOptions['summary'] = wikEdText['wikEdPresetSummary']; }

// text for summary link to this script
	if (typeof(wikEdSummaryUsing) == 'undefined') { window.wikEdSummaryUsing = wikEdText['wikEdSummaryUsing']; }

// expiration time span for permanent cookies in seconds
	if (typeof(wikEdCookieExpireSec) == 'undefined') { window.wikEdCookieExpireSec = 30 * 24 * 60 * 60; }

// disable wikEd preset
	if (typeof(wikEdDisabledPreset) == 'undefined') { window.wikEdDisabledPreset = false; }

// find ahead as you type checkbox preset
	if (typeof(wikEdFindAheadSelected) == 'undefined') { window.wikEdFindAheadSelected = true; }

// highlight syntax preset
	if (typeof(wikEdHighlightSyntaxPreset) == 'undefined') { window.wikEdHighlightSyntaxPreset = true; }

// enable wikEd preset
	if (typeof(wikEdUseWikEdPreset) == 'undefined') { window.wikEdUseWikEdPreset = true; }

// add '...using wikEd' to summary preset
	if (typeof(wikEdUsingPreset) == 'undefined') { window.wikEdUsingPreset = false; }

// scroll to edit window on non-preview pages
	if (typeof(wikEdScrollToEdit) == 'undefined') { window.wikEdScrollToEdit = true; }

// wikEdDiff preset
	if (typeof(wikEdDiffPreset) == 'undefined') { window.wikEdDiffPreset = false; }

// fullscreen mode preset
	if (typeof(wikEdFullScreenModePreset) == 'undefined') { window.wikEdFullScreenModePreset = false; }

// show MediaWiki toolbar preset
	if (typeof(wikEdCloseToolbarPreset) == 'undefined') { window.wikEdCloseToolbarPreset = false; }

// hide ref tags preset
	if (typeof(wikEdRefHidePreset) == 'undefined') { window.wikEdRefHidePreset = false; }

// initial text zoom for edit window (percentage)
	if (typeof(wikEdTextZoom) == 'undefined') { window.wikEdTextZoom = 100; }

// remove invisible syntax highlighting comments after closing tag
	if (typeof(wikEdRemoveHighlightComments) == 'undefined') { window.wikEdRemoveHighlightComments = true; }

// show the text-to-source button for testing purposes
	if (typeof(wikEdShowSourceButton) == 'undefined') { window.wikEdShowSourceButton = false; }

// show the using-wikEd button
	if (typeof(wikEdShowUsingButton) == 'undefined') { window.wikEdShowUsingButton = false; }

// the wikEd help page link to be displayed after the editing help link, an empty string disables the link
	if (typeof(wikEdHelpPageLink) == 'undefined') { window.wikEdHelpPageLink = wikEdText['wikEdHelpPageLink']; }

// enable external diff script
	if (typeof(wikEdLoadDiffScript) == 'undefined') { window.wikEdLoadDiffScript = true; }

// enable external wikEdDiff script
	if (typeof(wikEdLoadDiff) == 'undefined') { window.wikEdLoadDiff = true; }

// enable external InstaView script
	if (typeof(wikEdLoadInstaView) == 'undefined') { window.wikEdLoadInstaView = true; }

// RegExTypoFix rules page, the address must have the exact same domain name as the used wiki
	if (typeof(wikEdRegExTypoFixURL) == 'undefined') { window.wikEdRegExTypoFixURL = 'http://en.wikipedia.org/w/index.php?title=Wikipedia:AutoWikiBrowser/Typos&action=raw'; }

// enable RegExTypoFix button (http://en.wikipedia.org/wiki/User:Mboverload/RegExTypoFix)
	if (typeof(wikEdRegExTypoFix) == 'undefined') { window.wikEdRegExTypoFix = false; }

// enable highlighting as links
	if (typeof(wikEdFollowHighlightedLinks) == 'undefined') { window.wikEdFollowHighlightedLinks = false; }

// skip the browser detection to run wikEd under IE and Opera
	if (typeof(wikEdSkipBrowserTest) == 'undefined') { window.wikEdSkipBrowserTest = false; }

// set the button bar grip width in px
	if (typeof(wikEdButtonBarGripWidth) == 'undefined') { window.wikEdButtonBarGripWidth = 8; }

// enable local preview (Pilaf's InstaView)
	if (typeof(wikEdUseLocalPreview) == 'undefined') { window.wikEdUseLocalPreview = true; }

// allow ajax requests from local copy for testing, also defined in wikEdDiff.js
	if (typeof(wikEdAllowLocalAjax) == 'undefined') { window.wikEdAllowLocalAjax = false; }

// enable server preview (Ajax)
	if (typeof(wikEdUseAjaxPreview) == 'undefined') { window.wikEdUseAjaxPreview = true; }

// enable appending '<references/> for Ajax section previews
	if (typeof(wikEdSectionPreviewRefs) == 'undefined') { window.wikEdSectionPreviewRefs = true; }

// enable auto update (Ajax)
	if (typeof(wikEdAutoUpdate) == 'undefined') { window.wikEdAutoUpdate = true; }

// hours between update check (monobook.js)
	if (typeof(wikEdAutoUpdateHours) == 'undefined') { window.wikEdAutoUpdateHours = 20; }

// hours between update check (Greasemonkey)
	if (typeof(wikEdAutoUpdateHoursGM) == 'undefined') { window.wikEdAutoUpdateHoursGM = 40; }

// auto update: version url (Ajax)
	if (typeof(wikEdAutoUpdateUrl) == 'undefined') { window.wikEdAutoUpdateUrl = 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEd_current_version&action=raw&maxage=0'; }

// auto update: script url for Greasemonkey update
	if (typeof(wikEdAutoUpdateScriptUrl) == 'undefined') { window.wikEdAutoUpdateScriptUrl = 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Cacycle/wikEd.user.js'; }

// show complete unshortened article text for local diff, also defined in wikEdDiff.js
	if (typeof(wikEdFullDiff) == 'undefined') { window.wikEdFullDiff = false; }

// make links ctrl-clickable
	if (typeof(wikEdFollowLinks) == 'undefined') { window.wikEdFollowLinks = true; }

// correct tab order between check boxes and submit buttons
	if (typeof(wikEdSubmitTabOrder) == 'undefined') { window.wikEdSubmitTabOrder = false; }

// wikify table parameters, replaces original table parameters with this string
	if (typeof(wikEdWikifyTableParameters) == 'undefined') { window.wikEdWikifyTableParameters = ''; }

// do not rearrange page elements
	if (typeof(wikEdNoRearrange) == 'undefined') { window.wikEdNoRearrange = false; }

// use French rules for fix punctuation
	if (typeof(wikEdFixPunctFrench) == 'undefined') { window.wikEdFixPunctFrench = false; }

// wikEdSetupHook, executed after wikEd has been set up, usage: wikEdSetupHook.push(YourFunction);
	if (typeof(wikEdSetupHook) == 'undefined') { window.wikEdSetupHook = []; }

// wikEdOnHook, executed after wikEd has been re-enabled by logo click, usage: wikEdOnHook.push(YourFunction);
	if (typeof(wikEdOnHook) == 'undefined') { window.wikEdOnHook = []; }

// wikEdOffHook, executed after wikEd has been disabled by logo click, usage: wikEdOffHook.push(YourFunction);
	if (typeof(wikEdOffHook) == 'undefined') { window.wikEdOffHook = []; }

// wikEdTextareaHook, executed after classic textarea has been enabled by user, usage: wikEdTextareaHook.push(YourFunction);
	if (typeof(wikEdTextareaHook) == 'undefined') { window.wikEdTextareaHook = []; }

// wikEdFrameHook, executed after wikEd edit frame has been enabled by user, usage: wikEdFrameHook.push(YourFunction);
	if (typeof(wikEdFrameHook) == 'undefined') { window.wikEdFrameHook = []; }

// custom edit form id instead of 'editform'
	if (typeof(wikEdCustomEditFormId) == 'undefined') { window.wikEdCustomEditFormId = ''; }

// custom textarea id instead of 'wpTextbox1'
	if (typeof(wikEdCustomTextAreaId) == 'undefined') { window.wikEdCustomTextAreaId = ''; }

// custom save button id instead of 'wpSave'
	if (typeof(wikEdCustomSaveButtonId) == 'undefined') { window.wikEdCustomSaveButtonId = ''; }

// show table mode togle button // {{TABLE}}
	if (typeof(wikEdShowTableModeButton) == 'undefined') { window.wikEdShowTableModeButton = false; }

// maximal time for syntax highlighting in ms
	if (typeof(wikEdMaxHighlightTime) == 'undefined') { window.wikEdMaxHighlightTime = 2000; }

// first char of article names is case sensitive (e.g. Wiktionary)
	if (typeof(wikEdArticlesCaseSensitive) == 'undefined') { window.wikEdArticlesCaseSensitive = false; }

	return;
}

// diff script URL
if (typeof(wikEdDiffScriptSrc) == 'undefined') { window.wikEdDiffScriptSrc = 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/diff.js&action=raw&ctype=text/javascript'; }

// wikEdDiff script URL, also defined in wikEdDiff.js
if (typeof(wikEdDiffSrc) == 'undefined') { window.wikEdDiffSrc = 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEdDiff.js&action=raw&ctype=text/javascript'; }

// InstaView script URL
if (typeof(wikEdInstaViewSrc) == 'undefined') { window.wikEdInstaViewSrc = 'http://en.wikipedia.org/w/index.php?title=User:Pilaf/include/instaview.js&action=raw&ctype=text/javascript'; }

// wikEd-as-gadget detection, set to true if gadget script name is not MediaWiki:Gadget-wikEd.js
if (typeof(wikEdGadget) == 'undefined') { window.wikEdGadget = null; }


//
// end of user configurable variables
//


//
// WikEdInitGlobals: initialize non-configurable variables
//

window.WikEdInitGlobals = function() {

// global variables
	window.wikEdTurnedOn = null;
	window.wikEdDisabled = null;
	window.wikEdUpload = null;
	window.wikEdLanguage = '';

// history
	window.wikEdFieldHist = [];
	window.wikEdSavedName = [];
	window.wikEdInputElement = [];
	window.wikEdSelectElement = [];

	window.wikEdCheckMarker = [];
	window.wikEdCheckMarker[true] = '♦';
	window.wikEdCheckMarker[false] = '◊';

// cache the parsed DOM object
	window.wikEdFrameDOMCache = null;

// undo all, redo all
	window.wikEdOrigVersion = '';
	window.wikEdLastVersion = null;

// global dom elements
	window.wikEdLogo = null;
	window.wikEdLogoList = null;

	window.wikEdDebug = null;
	window.wikEdTextarea = null;
	window.wikEdEditForm = null;
	window.wikEdFrame = null;;
	window.wikEdFrameBody = null;
	window.wikEdFrameDocument = null;
	window.wikEdFrameWindow = null;

	window.wikEdInputWrapper = null;
	window.wikEdToolbarWrapper = null;
	window.wikEdCaptchaWrapper = null;
	window.wikEdDebugWrapper = null;
	window.wikEdEditWrapper = null;
	window.wikEdTextareaWrapper = null;
	window.wikEdFrameWrapper = null;
	window.wikEdConsoleWrapper = null;
	window.wikEdButtonsWrapper = null;
	window.wikEdSummaryWrapper = null;
	window.wikEdSummaryInputWrapper = null;
	window.wikEdSummaryOptions = null;
	window.wikEdSubmitWrapper = null;
	window.wikEdSubmitButtonsWrapper = null;
	window.wikEdLocalPrevWrapper = null;
	window.wikEdInsertWrapper = null;

	window.wikEdButtonBarFormat = null;
	window.wikEdButtonBarTextify = null;
	window.wikEdButtonBarCustom1 = null;
	window.wikEdButtonBarFind = null;
	window.wikEdButtonBarFix = null;
	window.wikEdButtonBarCustom2 = null;
	window.wikEdButtonBarControl = null;
	window.wikEdButtonBarPreview = null;
	window.wikEdButtonBarPreview2 = null;
	window.wikEdButtonBarJump = null;
	window.wikEdPreviewBox = null;
	window.wikEdClearSummary = null;
	window.wikEdClearSummaryImg = null;

	window.wikEdCaseSensitive = null;
	window.wikEdRegExp = null;
	window.wikEdFindAhead = null;

	window.wikEdFindText = null;
	window.wikEdReplaceText = null;
	window.wikEdSummaryText = null;
	window.wikEdSummarySelect = null;
	window.wikEdSummaryTextWidth = null;

	window.wikEdEditOptions = null;
	window.wikEdEditHelp = null;

	window.wikEdSaveButton = null;
	window.wikEdPreviewButton = null;
	window.wikEdLDiffButton = null;
	window.wikEdLocalPreview = null;
	window.wikEdLocalDiff = null;
	window.wikEdDiffPreviewButton = null;
	window.wikEdSummaryLabel = null;

	window.wikEdGetGlobalNode = null;

// various
	window.wikEdEditButtonHandler = {};
	window.wikEdTextareaHeight = null;
	window.wikEdClearSummaryWidth = null;
	window.wikEdFullScreenMode = false;
	window.wikEdAddNewSection = null;
	window.wikEdBrowserNotSupported = false;
	window.wikEdFrameScrollTop = null;
	window.wikEdTextareaUpdated = null;
	window.wikEdPreviewIsAjax = null;
	window.wikEdButtonKeyCode = [];
	window.wikEdFollowLinkIdNo = 0;
	window.wikEdFollowLinkHash = {};
	if (typeof(wikEdWikiGlobals) == 'undefined') { window.wikEdWikiGlobals = []; }
	window.wikEdDirection = null;

// overide site javascript functions
	window.WikEdInsertTagsOriginal = null;
	window.WikEdInsertAtCursorOriginal = null;

// wikEd settings
	window.wikEdRefHide = null;
	window.wikEdUsing = null;
	window.wikEdUseWikEd = null;
	window.wikEdCloseToolbar = null;
	window.wikEdHighlightSyntax = null;
	window.wikEdDiff = null;
	window.wikEdTableMode = null;
	window.wikEdCleanNodes = false;

// unicode fixing and char highlighting
	window.wikEdSupportedChars = null;
	window.wikEdSpecialChars = null;
	window.wikEdProblemChars = null;
	window.wikEdControlCharHighlighting = null;
	window.wikEdControlCharHighlightingStr = '';
	window.wikEdCharHighlighting = null;
	window.wikEdCharHighlightingStr = '';

// RegExTypoFix rules
	window.wikEdTypoRulesFind = [];
	window.wikEdTypoRulesReplace = [];

// redirect fixing
	window.wikEdRedirects = {};

// debugging time measurement, usage: wikEdDebugTimer.push([1234, new Date]); WikEdDebugTimer();
	window.wikEdDebugTimer = [];

// MediaWiki file paths for use in regexps
	window.wikEdServer = '';
	window.wikEdArticlePath = '';
	window.wikEdScript = '';
	window.wikEdScriptPath = '';
	window.wikEdScriptName = '';

	window.wikEdScriptURL = '';

// __MAGICWORDS__
	window.wikEdMagicWords = '(NOTOC|FORCETOC|TOC|NOEDITSECTION|NEWSECTIONLINK|NOGALLERY|HIDDENCAT|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|END|START|NOINDEX|INDEX|STATICREDIRECT)';

// template, parser function, and parser variable modifiers {{modifier:...}}
	window.wikEdTemplModifier = 'int|msg|msgnw|raw|subst';

// parser variables {{variable}}
	window.wikEdParserVariables = 'CURRENTYEAR|CURRENTMONTH|CURRENTMONTHNAME|CURRENTMONTHNAMEGEN|CURRENTMONTHABBREV|CURRENTDAY|CURRENTDAY2|CURRENTDOW|CURRENTDAYNAME|CURRENTTIME|CURRENTHOUR|CURRENTWEEK|CURRENTTIMESTAMP|LOCALYEAR|LOCALMONTH|LOCALMONTHNAME|LOCALMONTHNAMEGEN|LOCALMONTHABBREV|LOCALDAY|LOCALDAY2|LOCALDOW|LOCALDAYNAME|LOCALTIME|LOCALHOUR|LOCALWEEK|LOCALTIMESTAMP|SITENAME|CURRENTVERSION|CONTENTLANGUAGE|REVISIONID|REVISIONDAY|REVISIONDAY2|REVISIONMONTH|REVISIONYEAR|REVISIONTIMESTAMP|SERVER|SERVERNAME|SCRIPTPATH|FULLPAGENAME|PAGENAME|BASEPAGENAME|SUBPAGENAME|SUBJECTPAGENAME|TALKPAGENAME|FULLPAGENAMEE|PAGENAMEE|BASEPAGENAMEE|SUBPAGENAMEE|SUBJECTPAGENAMEE|TALKPAGENAMEE|NAMESPACE|SUBJECTSPACE|ARTICLESPACE|TALKSPACE|NAMESPACEE|SUBJECTSPACEE|TALKSPACEE|DIRMARK|DIRECTIONMARK';

// parser variables {{variable:R}}
	window.wikEdParserVariablesR = 'NUMBEROFPAGES|NUMBEROFARTICLES|NUMBEROFFILES|NUMBEROFEDITS|NUMBEROFUSERS|NUMBEROFADMINS|NUMBEROFVIEWS';

// parser functions {{FUNCTION:parameter|R}}
	window.wikEdParserFunctionsR = 'NUMBERINGROUP|PAGESINNS|PAGESINNAMESPACE|PAGESINCATEGORY|PAGESINCAT|PAGESIZE|DEFAULTSORT|DISPLAYTITLE';

// parser functions {{function:param|param}}
	window.wikEdParserFunctions = 'localurl|localurl|fullurl|fullurl|filepath|fullurle|urlencode|anchorencode|ns|lc|lcfirst|uc|ucfirst|formatnum|padleft|padright|padright|plural|grammar';

// parser functions {{#function:param|param}}
	window.wikEdParserFunctionsHash = 'language|special|tag|tag|expr|if|ifeq|ifexist|ifexpr|switch|time|timel|rel2abs|titleparts|iferror|iferror|special|tag|categorytree';

	return;
}

// variables needed during startup

// startup debugging
if (typeof(wikEdDebugStartUp) == 'undefined') { window.wikEdDebugStartUp = ''; }

// show missing translations
if (typeof(wikEdShowMissingTranslations) == 'undefined') { window.wikEdShowMissingTranslations = false; }

// hash of loaded scripts, also defined in wikEdDiff.js
if (typeof(wikEdExternalScripts) == 'undefined') { window.wikEdExternalScripts = null; }
if (typeof(wikEdStartup) == 'undefined') { window.wikEdStartup = false; }
if (typeof(wikEdPageLoaded) == 'undefined') { window.wikEdPageLoaded = false; }

// browser identification
if (typeof(wikEdBrowserName) == 'undefined') { window.wikEdBrowserName = ''; }
if (typeof(wikEdBrowserFlavor) == 'undefined') { window.wikEdBrowserFlavor = ''; }
if (typeof(wikEdBrowserVersion) == 'undefined') { window.wikEdBrowserVersion = 0; }
if (typeof(wikEdMSIE) == 'undefined') { window.wikEdMSIE = false; }
if (typeof(wikEdMozilla) == 'undefined') { window.wikEdMozilla = false; }
if (typeof(wikEdOpera) == 'undefined') { window.wikEdOpera = false; }
if (typeof(wikEdSafari) == 'undefined') { window.wikEdSafari = false; }
if (typeof(wikEdWebKit) == 'undefined') { window.wikEdWebKit = false; }
if (typeof(wikEdChrome) == 'undefined') { window.wikEdChrome = false; }
if (typeof(wikEdGreasemonkey) == 'undefined') { window.wikEdGreasemonkey = null; }

// content language default, also used for wikEd UI localization
if (typeof(wikEdLanguageDefault) == 'undefined') { window.wikEdLanguageDefault = ''; }

// load external translation
if (typeof(wikEdLoadTranslation) == 'undefined') { window.wikEdLoadTranslation = true; }

// translation javascript URLs
if (typeof(wikEdTranslations) == 'undefined') { window.wikEdTranslations = {}; }

// WikedInitTranslations: define translation javascript URLs ('': internal default)
window.WikedInitTranslations = function() {
	WikEdInitObject(wikEdTranslations, {
		'en':  '',
		'ar':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:ترجمان05/wikEd_international_ar.js',
		'zh':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Shibo77/wikEd_international_zh.js',
		'cs':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Sevela.p/wikEd_international_cs.js',
		'nl':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Jeronevw/wikEd_international_nl.js',
		'eo':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:ArnoLagrange/wikEd-eo.js',
		'fr':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Leag/wikEd-fr.js',
		'de':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Matthias_M./wikEd_international_de.js',
		'hu':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Csörföly D/wikEd-hu.js',
		'it':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Jalo/wikEd_international_it.js',
		'ja':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Hatukanezumi/wikEd_international_ja.js',
		'ko':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Ilovesabbath/wikEd_international_ko.js',
		'dsb': 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Michalwiki/wikEd_international_dsb.js',
		'ms':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Aviator/wikEd_international_ms.js',
		'no':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Dvyjones/wikEd_international_no.js',
		'nn':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Frokor/wikEd_international_nn.js',
		'pl':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Konradek/wikEd_international_pl.js',
		'pt':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Mosca/wikEd_international_pt.js',
		'ro':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Roamataa/wikEd_international_ro.js',
		'scn': 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Meloscn/wikEd_international_scn.js',
		'sk':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Helix84/wikEd_international_sk.js',
		'sl':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Eleassar/wikEd_international_sl.js',
		'es':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Axelei/wikEd_international_es.js',
		'sv':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Where_next_Columbus?/wikEd_international_sv.js',
		'hsb': 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Michalwiki/wikEd_international_hsb.js',
		'vi':  'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Vinhtantran/wikEd_international_vi.js'
	});
}

// general MediaWiki page detection
// skin name: [dom element to add logo to (empty: top left, first body element), logo to personal portlet, rearrange page elements, [element id list] ],
if (typeof(wikEdMediaWikiSkinIds) == 'undefined') { window.wikEdMediaWikiSkinIds = {

// monobook, also detects simple and myskin
	monobook:    [ 'p-personal', true, true, ['column-content', 'content', 'bodyContent', 'siteSub', 'contentSub', 'column-one', 'p-cactions', 'p-personal'] ],

// citizendium.org
	pinkwich5:   [ 'p-personal', true, true, ['column-content', 'content', 'bodycontent', 'sitesub', 'contentSub', 'column-one', 'p-cactions', 'p-personal'] ],

// other MediaWiki skins
	standard:    [ 'quickbar', false, true, ['content', 'topbar', 'article', 'footer', 'pagestats', 'quickbar'] ],
	nostalgia:   [ 'topbar', false, true, ['content', 'topbar', 'specialpages', 'article', 'footer'] ],
	cologneblue: [ 'quickbar', false, true, ['content', 'topbar', 'sitetitle', 'sitesub', 'article', 'footer', 'quickbar'] ],
	modern:      [ 'p-personal', true, true, ['mw_header', 'mw_main', 'mw_contentwrapper'] ],

// wikia.com
	monaco:      [ 'wikia_header', true, true, ['headerMenuHub', 'background_strip', 'siteSub', 'contentSub', 'monaco_footer'] ],
	quartz:      [ 'welcome', false, true, ['articleWrapper', 'bodyContent', 'siteSub', 'contentSub', 'sidebar'] ],
	searchwikia: [ 'header-li-buttons', false, true, ['header', 'header-container', 'header-go-button', 'article-container', 'article', 'article-text'] ],

// custom skins used on wiki.mozilla.org and developer.mozilla.org
	cavendish:   [ 'nav', false, true, ['internal', 'container', 'header', 'contentTop', 'mBody', 'side', 'nav', 'mainContent', 'siteSub', 'contentSub'] ],
	devmo:       [ 'personal', false, true, ['developer-mozilla-org', 'container', 'header', 'navigation', 'bar', 'personal', 'page', 'sidebar', 'sidebarslideup', 'contentTop', 'siteSub', 'contentSub'] ],

// custom skins
	gumax:       [ 'gumax-p-navigation', false, true, ['gumax-header', 'gumax-content-body'] ],

// custom MediaWiki identifier
	mediawiki:   [ '', false, false, ['mediawiki'] ]
}; }

if (typeof(wikEdSkinLogo) == 'undefined') { window.wikEdSkinLogo = ''; }
if (typeof(wikEdRearrange) == 'undefined') { window.wikEdRearrange = false; }
if (typeof(wikEdLogoToList) == 'undefined') { window.wikEdLogoToList = false; }
if (typeof(wikEdSkin) == 'undefined') { window.wikEdSkin = ''; }

// non-configurable variables
window.wikEdGreasemonkeyToHead = false;
window.wikEdTranslationLoaded = false;


//
// WikEdInitObject: initialize object, keep pre-defined values
//

window.WikEdInitObject = function(array, preset, showMissing) {

	for (var key in preset) {
		if (typeof(key) != 'string') {
			continue;
		}
		if (array[key] == null) {
			array[key] = preset[key];

// show missing array entries
			if (showMissing == true)  {
				if (typeof(array[key]) == 'string') {
					wikEdDebugStartUp += '\t\t\t\'' + key + '\': \'' + array[key].replace(/\n/g, '\\n') + '\',\n';
				}
			}
		}
	}

	return;
}

//
// WikEdInitImage: initialize images, keep pre-defined values
//

window.WikEdInitImage = function(array, preset) {

	for (var key in preset) {
		if (typeof(key) != 'string') {
			continue;
		}
		if (array[key] == null) {

// remove MediaWiki path prefixes and add local path
			if (wikEdUseLocalImages == true) {
				array[key] = wikEdImagePathLocal + preset[key].replace(/^[0-9a-f]+\/[0-9a-f]+\//, '');
			}

// add path
			else {
				array[key] = wikEdImagePath + preset[key];
			}
		}
	}
	return;
}


//
// WikEdStartup: wikEd startup code, called during page load
//

window.WikEdStartup = function() {

// check if this has already been run
	if (wikEdStartup == true) {
		return;
	}
	wikEdStartup = true;

// redirect WED shortcut to WikEdDebug(objectName, object, popup)
	window.WED = WikEdDebug;

// check browser and version
	var agent = navigator.userAgent.match(/(Firefox|Netscape|SeaMonkey|IceWeasel|IceCat|Minefield|BonEcho|GranParadiso|Shiretoko)\W+(\d+\.\d+)/i);
	if (agent != null) {
		wikEdBrowserName = 'Mozilla';
		wikEdBrowserFlavor = agent[1];
		wikEdBrowserVersion = parseFloat(agent[2]);
		wikEdMozilla = true;
	}

// check for MSIE
	else {
		agent = navigator.userAgent.match(/(MSIE)\W+(\d+\.\d+)/i);
		if (agent != null) {
			wikEdBrowserName = 'MSIE';
			wikEdBrowserVersion = parseFloat(agent[2]);
			wikEdMSIE = true;
		}

// check for Opera
		else {
			agent = navigator.userAgent.match(/(Opera)\W+(\d+\.\d+)/i);
			if (agent != null) {
				wikEdBrowserName = 'Opera';
				wikEdBrowserVersion = parseFloat(agent[2]);
				wikEdOpera = true;
			}

// check for Google Chrome (AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.30 Safari/525.13)
			else {
				agent = navigator.userAgent.match(/(Chrome)\W+(\d+\.\d+)/i);
				if (agent != null) {
					wikEdBrowserName = 'Chrome';
					wikEdBrowserVersion = parseFloat(agent[2]);
					wikEdChrome = true;
				}

// check for Safari
				else {
					agent = navigator.userAgent.match(/(Safari)\W+(\d+\.\d+)/i);
					if (agent != null) {
						wikEdBrowserName = 'Safari';
						wikEdBrowserVersion = parseFloat(agent[2]);
						wikEdSafari = true;
					}

// check for other WebKit
					else {
						agent = navigator.userAgent.match(/(WebKit)\W+(\d+\.\d+)/i);
						if (agent != null) {
							wikEdBrowserName = 'WebKit';
							wikEdBrowserVersion = parseFloat(agent[2]);
							wikEdWebKit = true;
						}
					}
				}
			}
		}
	}

// detect if run as a body script added by Greasemonkey installer
	if (document.getElementById('WikEdHeadScript') != null) {
		wikEdGreasemonkeyToHead = true;
	}

// load an external wikEd translation and language settings
	if ( (wikEdLoadTranslation == true) && (wikEdTranslationLoaded == false) ) {
		var userLang = WikEdGetGlobal('wgUserLanguage') || '';
		var contentLang = WikEdGetGlobal('wgContentLanguage') || '';
		if ( (wikEdLanguageDefault != '') || (userLang != '') || (contentLang != '') ) {
			WikedInitTranslations();
			var scriptUrl = wikEdTranslations[wikEdLanguageDefault] || '';
			if (scriptUrl == '') {
				scriptUrl = wikEdTranslations[userLang] || '';
				if (scriptUrl == '') {
					scriptUrl = wikEdTranslations[contentLang] || '';
				}
			}
			if (scriptUrl != '') {
				WikEdAppendScript(scriptUrl)
				wikEdTranslationLoaded = true;
			}
		}
	}

// schedule the setup routine
	WikEdAddEventListener(window, 'load', WikEdSetup, false);

	return;
}


//
// WikEdSetup: basic setup routine, scheduled after page load
//

window.WikEdSetup = function() {

	WikEdRemoveEventListener(window, 'load', WikEdSetup, false);

// check if this has already been run, either as a wiki or a Greasemonkey user script
	if (document.getElementById('wikEdSetupFlag') != null) {
		return;
	}

// detect already loaded external scripts
	if (wikEdExternalScripts == null) {
		wikEdExternalScripts = [];
		var pageScripts = document.getElementsByTagName('script');
		for (var i = 0; i < pageScripts.length; i ++) {
			var scriptSrc = pageScripts[i].src;
			var nameMatch = scriptSrc.match(/\btitle=([^&]*)/);
			if (nameMatch == null) {
				nameMatch = scriptSrc.match(/\/([^\/]*?)($|\?)/);
			}
			if (nameMatch != null) {
				var scriptName = nameMatch[1];
				if (scriptName != '') {

// ignore other diff.js scripts
					if ( (scriptName == 'diff.js') && (scriptSrc != wikEdDiffScriptSrc) ) {
						continue;
					}
					wikEdExternalScripts[scriptName] = true;
				}
			}
		}
	}

// exit if executed as Greasemonkey script if wiki user script is available
	if (typeof(GM_getValue) == 'function') {
		if (wikEdExternalScripts['wikEd.js'] == true) {
			wikEdGreasemonkey = false;
			return;
		}
		else {
			wikEdGreasemonkey = true;
		}
	}

// redirect Greasemonkey debugging function to WikEdDebug if run as a wiki user script
	else {
		window.GM_log = window.WikEdDebug;
	}

// detect wikEd running as a gadget
	if (wikEdGadget == null) {
		if (wikEdExternalScripts['MediaWiki:Gadget-wikEd.js'] == true) {
			wikEdGadget = true;
		}
	}

// set already run flag
	var flag = document.createElement('span');
	flag.id = 'wikEdSetupFlag';
	flag.style.display = 'none';
	flag.style.visibility = 'hidden';
	document.body.appendChild(flag);

// detect MediaWiki page and its skin
	for (var skin in wikEdMediaWikiSkinIds) {
		var logoElement = wikEdMediaWikiSkinIds[skin][0];
		var logoToList = wikEdMediaWikiSkinIds[skin][1];
		var rearrange = wikEdMediaWikiSkinIds[skin][2];
		var skinIds = wikEdMediaWikiSkinIds[skin][3];
		if (typeof(logoElement) != 'string') {
			continue;
		}
		for (var i = 0; i < skinIds.length; i ++) {
			if (document.getElementById(skinIds[i]) == null) {
				break;
			}
		}
		if (i == skinIds.length) {
			wikEdSkinLogo = logoElement;
			wikEdSkin = skin;
			wikEdRearrange = rearrange;
			wikEdLogoToList = logoToList;
			break;
		}
	}

// not a MediaWiki page
	if (wikEdSkin == '') {
		return;
	}

// initialize user configurable variables
	WikEdInitGlobalConfigs();

// do not rearrange page elements
	if (wikEdNoRearrange != false) {
		wikEdRearrange = false;
	}

// initialize non-configurable variables
	WikEdInitGlobals();

// parse global MediaWiki globals into hash
	var variable = ['wgServer', 'wgTitle', 'wgCanonicalNamespace', 'wgArticlePath', 'wgScript', 'wgScriptPath', 'wgUserName', 'wgCurRevisionId', 'wgScript', 'wgContentLanguage', 'wgUserLanguage', 'wgEnableAPI'];
	for (var i = 0; i < variable.length; i ++) {
		wikEdWikiGlobals[ variable[i] ] = WikEdGetGlobal(variable[i]);
	}

// check for updates
	WikEdAutoUpdate();

// initialize images (needed here for logo)
	WikedInitImages();

// add image path to image filename
	if (wikEdLogo == null) {

// insert logo into personal toolbar
		wikEdLogo = document.createElement('img');
		wikEdLogo.id = 'wikEdLogoImg';

// monobook, simple, myskin
		if (wikEdLogoToList == true) {
			wikEdLogoList = document.createElement('li');
			wikEdLogoList.id = 'wikEdLogoList';
			wikEdLogoList.appendChild(wikEdLogo);

			var personalTools = document.getElementById(wikEdSkinLogo);
			if (personalTools != null) {
				personalTools.getElementsByTagName('ul')[0].appendChild(wikEdLogoList);
				wikEdLogo.className = 'wikEdLogo';
			}
		}

// other skins
		if (wikEdLogo.className == '') {
			if (wikEdSkinLogo != '') {
				document.getElementById(wikEdSkinLogo).appendChild(wikEdLogo);
				wikEdLogo.className = 'wikEdLogo';
			}

// fallback for undetected skin
			else {
				document.body.insertBefore(wikEdLogo, document.body.firstChild);
				wikEdLogo.className = 'wikEdLogoFallBack';
			}
		}

// add event listener to logo
		WikEdAddEventListener(wikEdLogo, 'click', WikEdMainSwitch, true);
	}

// page loaded flag for dynamically loaded scripts
	wikEdPageLoaded = true;

// load the external diff script
	if ( (wikEdLoadDiffScript == true) && (wikEdExternalScripts['diff.js'] == null) ) {
		if (typeof(WDiffString) == 'undefined') {
			WikEdAppendScript(wikEdDiffScriptSrc);
		}
		wikEdExternalScripts['diff.js'] = true;
	}

// load the external wikEdDiff script
	if ( (wikEdLoadDiff == true) && (wikEdExternalScripts['wikEdDiff.js'] == null) ) {
		if (typeof(WikEdDiff) == 'undefined') {
			WikEdAppendScript(wikEdDiffSrc);
		}
		wikEdExternalScripts['wikEdDiff.js'] = true;
	}

// check if disabled
	wikEdDisabled = WikEdGetSavedSetting('wikEdDisabled', wikEdDisabledPreset);
	if (wikEdDisabled == true) {
		wikEdUseWikEd = false;
		WikEdSetLogo();
		return;
	}

// continue setup
	WikEdTurnOn(wikEdScrollToEdit);

	return;
}


//
// WikEdTurnOn: continue setup, can be called repeatedly
//

window.WikEdTurnOn = function(scrollToEdit) {

// check if setup was already run
	if (wikEdTurnedOn == true) {
		return;
	}

// set error logo
	WikEdSetLogo('error');

// browser test
	if (wikEdSkipBrowserTest == false) {

// no id no wikEd
		if (navigator.appName == null) {
			wikEdBrowserNotSupported = true;
		}

// check the browser generation
		var generation = navigator.appVersion.match(/\d+(\.\d+)/);
		if ( (generation == null) || (generation[0] < 5.0) ) {
			wikEdBrowserNotSupported = true;
		}

// check for not supported browsers
		if ( (wikEdBrowserName == 'MSIE') || (wikEdBrowserName == 'Opera') ) {
			wikEdBrowserNotSupported = true;
		}
	}

// check browser versions
	switch (wikEdBrowserName) {

// check Mozilla version
		case 'Mozilla':
			if (
				(wikEdBrowserFlavor == 'Firefox') && (wikEdBrowserVersion < 1.5) ||
				(wikEdBrowserFlavor == 'Netscape') && (wikEdBrowserVersion < 8.0) ||
				(wikEdBrowserFlavor == 'SeaMonkey') && (wikEdBrowserVersion < 1.0)
			) {
				wikEdBrowserNotSupported = true;
			}
			break;

// check MSIE version
		case 'MSIE':
			wikEdBrowserNotSupported = true;
			break;

// check Opera version
		case 'Opera':
			if (wikEdBrowserVersion < 9) {
				wikEdBrowserNotSupported = true;
			}
			break;

// check Google Chrome version
		case 'Chrome':
			if (wikEdBrowserVersion < 0.2) {
				wikEdBrowserNotSupported = true;
			}
			break;

// check Safari version
		case 'Safari':
			if (wikEdBrowserVersion < 500) {
				wikEdBrowserNotSupported = true;
			}
			break;
	}

// browser or version not supported, set error message and exit
	if ( (wikEdBrowserNotSupported == true) && (wikEdSkipBrowserTest == false) ) {
		WikEdSetLogo('browser');
		return;
	}

// get the textarea and other form elements

// custom form elements
	if (wikEdCustomEditFormId != '') {
		wikEdEditForm = document.getElementById(wikEdCustomEditFormId);
	}
	if (wikEdCustomTextAreaId != '') {
		wikEdTextarea = document.getElementById(wikEdCustomTextAreaId);
	}
	if (wikEdCustomSaveButtonId != '') {
		wikEdSaveButton = document.getElementById(wikEdCustomwikEdSaveButtonId);
	}

// standard form elements
	if (wikEdTextarea == null) {
		wikEdTextarea = document.getElementsByName('wpTextbox1')[0];
	}
	if (wikEdEditForm == null) {
		wikEdEditForm = document.getElementById('editform');
	}
	if (wikEdSaveButton == null) {
		wikEdSaveButton = document.getElementById('wpSave');
	}

// MediaWiki Semantic Forms extension support
	if (wikEdTextarea == null) {
		wikEdEditForm = document.getElementsByName('createbox')[0];
		wikEdTextarea = document.getElementsByName('free_text')[0];
	}

// check if it is an edit page
	if ( (wikEdTextarea == null) || (wikEdEditForm == null) || (wikEdSaveButton == null) ) {

// check if this is an upload page
		wikEdTextarea = document.getElementsByName('wpUploadDescription')[0];
		wikEdEditForm = document.getElementById('mw-upload-form');
		wikEdSaveButton = document.getElementsByName('wpUpload')[0];
		if ( (wikEdTextarea == null) || (wikEdEditForm == null) || (wikEdSaveButton == null) ) {

// set error indicator
			WikEdSetLogo();
			return;
		}
		wikEdUpload = true;
		wikEdRearrange = false;
	}

// initialize frame css, main css, buttons, and button bars
	WikedInitFrameCSS();
	WikedInitMainCSS();
	WikedInitButton();
	WikedInitButtonKey();
	WikedInitButtonBar();

// define Unicode characters for fixing function
	WikEdInitUnicode();

// detect if we add a new section (+ tab)
	if (/(\?|&)section=new\b/.test(window.location.search) == true) {
		wikEdAddNewSection = true;
	}
	else {
		var section = document.getElementsByName('wpSection');
		if (section != null) {
			if (section.length > 0) {
				if (section[0].value == 'new') {
					wikEdAddNewSection = true;
				}
			}
		}
	}

// load the external InstaView script
	var head = document.getElementsByTagName('head')[0];
	if ( (wikEdGreasemonkey == false) && (wikEdLoadInstaView == true) && (wikEdExternalScripts['instaview.js'] == null) ) {
		if (typeof(InstaView) == 'undefined') {
			WikEdAppendScript(wikEdInstaViewSrc);
		}
		wikEdExternalScripts['instaview.js'] = true;
	}
	else if ( (wikEdGreasemonkey == false) || (wikEdLoadInstaView != true) ) {
		wikEdUseLocalPreview = false;
	}

// get initial textarea height
	wikEdTextareaHeight = wikEdTextarea.offsetHeight;

// setup the undo buffers and save the original text for local changes view
	wikEdOrigVersion = wikEdTextarea.value;

// add stylesheet definitions
	var mainStyle = new WikEdStyleSheet();
	var rules = '';
	for (var ruleName in wikEdMainCSS) {
		var ruleStyle = wikEdMainCSS[ruleName];
		if (typeof(ruleStyle) != 'string') {
			continue;
		}
		ruleStyle = ruleStyle.replace(/\{wikEdGrip\}/g, wikEdImage['grip']);
		rules += ruleName + ' {' + ruleStyle + '}\n';
	}
	mainStyle.addRules(rules);

// get button settings from saved settings
	wikEdUsing = WikEdGetSavedSetting('wikEdSummaryUsing', wikEdUsingPreset);
	wikEdUseWikEd = ! WikEdGetSavedSetting('wikEdUseClassic', ! wikEdUseWikEdPreset);
	wikEdHighlightSyntax = ! WikEdGetSavedSetting('wikEdSyntaxOff', ! wikEdHighlightSyntaxPreset);
	wikEdFullScreenMode = WikEdGetSavedSetting('wikEdFullscreen', wikEdFullScreenModePreset);
	wikEdCloseToolbar = WikEdGetSavedSetting('wikEdCloseToolbar', wikEdCloseToolbarPreset);
	wikEdRefHide = WikEdGetSavedSetting('wikEdRefHide', wikEdRefHidePreset);
	wikEdDiff = WikEdGetSavedSetting('wikEdDiff', wikEdDiffPreset);
	wikEdTableMode = false; // {{TABLE}}

// no fullscreen for preview and upload pages
	if ( (wikEdUpload == true) || (window.location.search.match(/(\?|&)action=submit\b/) != null) ) {
		wikEdFullScreenMode = false;
	}

// disable wikEd for Lupin's autoedit scripts
		if (window.location.search.match(/(\?|&)autoedit=/) != null) {
			wikEdUseWikEd = false;
		}

// disable wikEd for js pages
	if (/\.js$/.test(wikEdWikiGlobals['wgTitle']) == true) {
		if ( (wikEdWikiGlobals['wgCanonicalNamespace'] != 'User_talk') && (wikEdWikiGlobals['wgCanonicalNamespace'] != 'Talk') ) {
			if (wikEdOrigVersion.length > 20000) {
				wikEdUseWikEd = false;
			}
			else {
				wikEdHighlightSyntax = false;
			}
		}
	}

// preset frame related styles to avoid browser crashes
	var styleFrameBody;
	var styleFrameWrapperPosition;
	var styleFrameWrapperVisibility;
	var styleDebugWrapperPosition;
	var styleDebugWrapperVisibility;
	var styleTextareaWrapperPosition;
	var styleTextareaWrapperVisibility;
	if (wikEdUseWikEd == true) {
		styleFrameBody = 'style="display: block;" ';
		styleFrameWrapperPosition = 'static';
		styleFrameWrapperVisibility = 'visible';
		styleTextareaWrapperPosition = 'absolute';
		styleTextareaWrapperVisibility = 'hidden';
	}
	else {
		styleFrameBody = 'style="display: none;" ';
		styleFrameWrapperPosition = 'absolute';
		styleFrameWrapperVisibility = 'hidden';
		styleTextareaWrapperPosition = 'static';
		styleTextareaWrapperVisibility = 'visible';
	}
	var inputWrapperClass;
	if (wikEdFullScreenMode == true) {
		inputWrapperClass = 'wikEdInputWrapperFull';
	}
	else {
		inputWrapperClass = 'wikEdInputWrapper';
	}

// create wikEd element wrappers

// create input wrapper, this contains the whole fullscreen content
	wikEdInputWrapper = document.createElement('div');
	wikEdInputWrapper.id = 'wikEdInputWrapper';
	wikEdInputWrapper.className = inputWrapperClass;
	wikEdTextarea.parentNode.insertBefore(wikEdInputWrapper, wikEdTextarea);

// create toolbar wrapper
	wikEdToolbarWrapper = document.createElement('div');
	wikEdToolbarWrapper.id = 'wikEdToolbarWrapper';
	wikEdToolbarWrapper.className = 'wikEdToolbarWrapper';
	wikEdInputWrapper.appendChild(wikEdToolbarWrapper);

// create captcha wrapper
	if (wikEdRearrange == true) {
		wikEdCaptchaWrapper = document.createElement('div');
		wikEdCaptchaWrapper.id = 'wikEdCaptchaWrapper';
		wikEdCaptchaWrapper.className = 'wikEdCaptchaWrapper';
		wikEdInputWrapper.appendChild(wikEdCaptchaWrapper);
	}

// create debug textarea wrapper
	wikEdDebugWrapper = document.createElement('div');
	wikEdDebugWrapper.id = 'wikEdDebugWrapper';
	wikEdDebugWrapper.className = 'wikEdDebugWrapper';
	wikEdDebugWrapper.style.position = 'static';
	wikEdDebugWrapper.style.visibility = 'hidden';
	wikEdInputWrapper.appendChild(wikEdDebugWrapper);

// create edit wrapper for textarea and frame wrapper
	wikEdEditWrapper = document.createElement('div');
	wikEdEditWrapper.id = 'wikEdEditWrapper';
	wikEdEditWrapper.className = 'wikEdEditWrapper';
	wikEdInputWrapper.appendChild(wikEdEditWrapper);

// create textarea wrapper
	wikEdTextareaWrapper = document.createElement('div');
	wikEdTextareaWrapper.id = 'wikEdTextareaWrapper';
	wikEdTextareaWrapper.className = 'wikEdTextareaWrapper';
	wikEdTextareaWrapper.style.position = styleTextareaWrapperPosition;
	wikEdTextareaWrapper.style.visibility = styleTextareaWrapperVisibility;

// create frame wrapper
	wikEdFrameWrapper = document.createElement('div');
	wikEdFrameWrapper.id = 'wikEdFrameWrapper';
	wikEdFrameWrapper.className = 'wikEdFrameWrapper';
	wikEdFrameWrapper.style.position = styleFrameWrapperPosition;
	wikEdFrameWrapper.style.visibility = styleFrameWrapperVisibility;

// create console wrapper for buttons, summary, and submit
	if (wikEdRearrange == true) {
		wikEdConsoleWrapper = document.createElement('div');
		wikEdConsoleWrapper.id = 'wikEdConsoleWrapper';
		wikEdConsoleWrapper.className = 'wikEdConsoleWrapper';
		wikEdInputWrapper.appendChild(wikEdConsoleWrapper);
	}

// create buttons wrapper for wikEd buttons
	wikEdButtonsWrapper = document.createElement('div');
	wikEdButtonsWrapper.id = 'wikEdButtonsWrapper';
	wikEdButtonsWrapper.className = 'wikEdButtonsWrapper';
	wikEdInputWrapper.insertBefore(wikEdButtonsWrapper, wikEdEditWrapper);

// create summary wrapper for summary, minor edit, and watch this page
	if (wikEdRearrange == true) {
		wikEdSummaryWrapper = document.createElement('div');
		wikEdSummaryWrapper.id = 'wikEdSummaryWrapper';

// add summary above the edit field if we add a new section (+ tab)
		if (wikEdAddNewSection == true) {
			wikEdSummaryWrapper.className = 'wikEdSummaryWrapperTop';
			wikEdInputWrapper.insertBefore(wikEdSummaryWrapper, wikEdEditWrapper);
		}
		else {
		wikEdSummaryWrapper.className = 'wikEdSummaryWrapper';
			wikEdConsoleWrapper.appendChild(wikEdSummaryWrapper);
		}

// create summary input wrapper
		wikEdSummaryInputWrapper = document.createElement('div');
		wikEdSummaryInputWrapper.id = 'wikEdSummaryInputWrapper';
		wikEdSummaryInputWrapper.className = 'wikEdSummaryInputWrapper';
		wikEdSummaryWrapper.appendChild(wikEdSummaryInputWrapper);

// create minor edit and watch page wrapper
		wikEdSummaryOptions = document.createElement('div');
		wikEdSummaryOptions.id = 'wikEdSummaryOptions';
		wikEdSummaryOptions.className = 'wikEdSummaryOptions';
		wikEdSummaryWrapper.appendChild(wikEdSummaryOptions);

// create submit wrapper for submit elements
		wikEdSubmitWrapper = document.createElement('div');
		wikEdSubmitWrapper.id = 'wikEdSubmitWrapper';
		wikEdSubmitWrapper.className = 'wikEdSubmitWrapper';
		wikEdConsoleWrapper.appendChild(wikEdSubmitWrapper);

// create submit buttons wrapper for submit buttons and help links
		wikEdSubmitButtonsWrapper = document.createElement('div');
		wikEdSubmitButtonsWrapper.id = 'wikEdSubmitButtonsWrapper';
		wikEdSubmitButtonsWrapper.className = 'wikEdSubmitButtonsWrapper';
		wikEdSubmitWrapper.appendChild(wikEdSubmitButtonsWrapper);
	}

// create preview wrapper for preview and diff box
	wikEdLocalPrevWrapper = document.createElement('div');
	wikEdLocalPrevWrapper.id = 'wikEdLocalPrevWrapper';
	wikEdLocalPrevWrapper.className = 'wikEdLocalPrevWrapper';
	wikEdLocalPrevWrapper.style.display = 'none';
	if (wikEdRearrange == true) {
		wikEdInputWrapper.appendChild(wikEdLocalPrevWrapper);
	}
	else {
		wikEdSaveButton.parentNode.appendChild(wikEdLocalPrevWrapper);
	}

// create insert wrapper for insert special chars links
	if (wikEdRearrange == true) {
		wikEdInsertWrapper = document.createElement('div');
		wikEdInsertWrapper.id = 'wikEdInsertWrapper';
		wikEdInsertWrapper.className = 'wikEdInsertWrapper';
		wikEdInputWrapper.appendChild(wikEdInsertWrapper);
	}

// append input wrapper to document
	if (wikEdRearrange == true) {
		wikEdEditForm.insertBefore(wikEdInputWrapper, wikEdEditForm.firstChild);
	}

// fill the wrappers

// wikEdDiff enhanced ajax diff
	if (typeof(wikEdDiffTable) == 'object') {
		if ( (wikEdDiffTable != null) && (wikEdDiff == true) ) {
			if (typeof(WikEdDiff) == 'function') {
				WikEdDiff();
			}
		}
	}

// add toolbar to toolbar wrapper
	var wpToolbar = document.getElementById('toolbar');
	if (wikEdCloseToolbar == true) {
		wikEdToolbarWrapper.style.display = 'none';
	}
	else {
		wikEdToolbarWrapper.style.display = 'block';
	}
	if (wpToolbar != null) {
		wikEdToolbarWrapper.appendChild(wpToolbar);
	}

// add elements between form and textarea (table) to captcha wrapper
	var wikEdTextBoxTable = document.getElementById('textBoxTable');
	if (wikEdUpload != true) {
		var node = wikEdInputWrapper.nextSibling;
		while (node != null) {
			if ( (node == wikEdTextarea) || (node == wikEdTextBoxTable) ) {
				break;
			}
			var nextNode = node.nextSibling;
			wikEdCaptchaWrapper.appendChild(node);
			node = nextNode;
		}
	}

// call wikibits:mwSetupToolbar() now because it would terminate with an error after setting textarea to display: none
	if (wpToolbar != null) {
		if (wpToolbar.getElementsByTagName('IMG').length == 0) {
			if (typeof(mwSetupToolbar) == 'function') {
				mwSetupToolbar();
				WikEdRemoveEventListener(window, 'load', mwSetupToolbar, false);
			}
		}
	}

	var wpSummary = document.getElementsByName('wpSummary');
	if (wpSummary.length > 0) {
		wikEdEditOptions = wpSummary[0].parentNode;
		wikEdEditOptions.className = 'wikEdEditOptions';
	}

// add summary elements to summary input wrapper
	if (wikEdRearrange == true) {
		wikEdSummaryLabel = document.getElementById('wpSummaryLabel');
		if (wikEdSummaryLabel != null) {
			wikEdSummaryInputWrapper.appendChild(wikEdSummaryLabel);
		}
		wikEdSummaryText = document.getElementsByName('wpSummary')[0];
		wikEdSummaryInputWrapper.appendChild(wikEdSummaryText);
	}

// move editpage-copywarn out of summary wrapper
// needs to be done before appending editOptions to summary wrapper otherwise a linebreak stays (Mozilla bug)
	if (wikEdRearrange == true) {
		var copywarn = document.getElementById('editpage-copywarn');
		if (copywarn != null) {
			wikEdInputWrapper.parentNode.insertBefore(copywarn, wikEdInputWrapper.nextSibling);
		}
	}

// add submit buttons to submit wrapper
	if (wikEdRearrange == true) {
		var wpEditButtons = wikEdSaveButton.parentNode;
		wikEdSubmitWrapper.insertBefore(wpEditButtons, wikEdSubmitButtonsWrapper);
	}

// move edit options after submit buttons; crashes Mozilla when appended after filling the iframe
	wikEdDiffPreviewButton = document.getElementById('wpDiff');
	wikEdPreviewButton = document.getElementById('wpPreview');
	if (wikEdRearrange == true) {
		if (wikEdDiffPreviewButton != null) {
			wikEdDiffPreviewButton.parentNode.insertBefore(wikEdEditOptions, wikEdDiffPreviewButton.nextSibling);

// remove linebreak before minor edit checkbox
			var node = wikEdEditOptions.firstChild;
			while (node != null) {
				if (node.tagName != null) {
					if (node.tagName == 'BR') {
						node.parentNode.removeChild(node);
						break;
					}
				}
				node = node.nextSibling;
			}

// correct tab order between check boxes and submits
			if (wikEdSubmitTabOrder == true) {
				var wpMinoredit = document.getElementById('wpMinoredit');
				var wpWatchthis = document.getElementById('wpWatchthis');
				if ( (wpMinoredit != null) && (wpWatchthis != null) ) {
					var tabIndex = [];
					tabIndex.push(wpMinoredit.tabIndex, wpWatchthis.tabIndex, wikEdSaveButton.tabIndex, wikEdPreviewButton.tabIndex, wikEdDiffPreviewButton.tabIndex);
					wikEdSaveButton.tabIndex = tabIndex.shift();
					wikEdPreviewButton.tabIndex = tabIndex.shift();
					wikEdDiffPreviewButton.tabIndex = tabIndex.shift();
					wpMinoredit.tabIndex = tabIndex.shift();
					wpWatchthis.tabIndex = tabIndex.shift();
				}
			}
		}
	}

// create debug textarea and add to debug wrapper
	wikEdDebug = document.createElement('textarea');
	wikEdDebug.rows = 20;
	wikEdDebug.style.display = 'none';
	wikEdDebugWrapper.appendChild(wikEdDebug);

// display startup error messages
	if (wikEdDebugStartUp != '') {
		WikEdDebug(wikEdDebugStartUp);
	}

// add textBoxTable or textarea to edit wrapper
	if (wikEdTextBoxTable != null) {
		wikEdEditWrapper.appendChild(wikEdTextBoxTable);
	}
	else {
		wikEdEditWrapper.appendChild(wikEdTextarea);
	}

// add frame wrapper and textarea wrapper to edit wraper (into table if exists)
	var parentNode = wikEdTextarea.parentNode;
	parentNode.insertBefore(wikEdFrameWrapper, wikEdTextarea);
	parentNode.insertBefore(wikEdTextareaWrapper, wikEdTextarea);

// add edit-frame to frame wrapper
// any DOM changes to a starting iframe in designmode may crash mozilla, including DOM move, display: none; and position: absolute;

// create the iframe
	var html = '';
	html += '<div id="wikEdFrameOuter" class="wikEdFrameOuter">';
	html += '<div id="wikEdFrameInner" class="wikEdFrameInner">';
	html += '<iframe id="wikEdFrame" class="wikEdFrame" name="wikEdFrame" style="height: ' + wikEdTextareaHeight + 'px;"></iframe>';
	html += '</div>';
	html += '</div>';
	wikEdFrameWrapper.innerHTML = html;

// fill the frame with content
	html = '';
	html += '<html id="wikEdFrameHtml"><head></head>';

// Mozilla crashes when designmode is turned on before the frame has loaded completely
	if (wikEdMozilla == true) {
		html += '<body id="wikEdFrameBody" class="wikEdFrameBody"' + styleFrameBody + 'onload="window.document.designMode = \'on\'; window.document.execCommand(\'styleWithCSS\', false, false);">';
	}
	else {
		html += '<body id="wikEdFrameBody" class="wikEdFrameBody"' + styleFrameBody + '>';
	}
	html += '</body></html>';

	wikEdFrame = document.getElementById('wikEdFrame');
	wikEdFrameWindow = wikEdFrame.contentWindow;
	wikEdFrameDocument = wikEdFrameWindow.document;

// turn on designmode for non-Mozilla before adding content
	if (wikEdMozilla == false) {
		wikEdFrameDocument.designMode = 'on';
	}

// fill iframe with content
	wikEdFrameDocument.open();
	wikEdFrameDocument.write(html);
	wikEdFrameDocument.close();
	wikEdFrameBody = wikEdFrameDocument.body;

// generate button bars and add them to the buttons wrapper
// form wrapper has been added against summary input submit defaulting to this button
	wikEdButtonBarFormat = MakeButtonBar(wikEdButtonBar['format']);
	wikEdButtonsWrapper.appendChild(wikEdButtonBarFormat);

	wikEdButtonBarTextify = MakeButtonBar(wikEdButtonBar['textify']);
	wikEdButtonsWrapper.appendChild(wikEdButtonBarTextify);

	wikEdButtonBarControl = MakeButtonBar(wikEdButtonBar['control']);
	wikEdButtonsWrapper.appendChild(wikEdButtonBarControl);

	if (wikEdButtonBar['custom1'][6].length > 0) {
		wikEdButtonBarCustom1 = MakeButtonBar(wikEdButtonBar['custom1']);
		wikEdButtonsWrapper.appendChild(wikEdButtonBarCustom1);
	}

	wikEdButtonBarFind = MakeButtonBar(wikEdButtonBar['find']);
	wikEdButtonsWrapper.appendChild(wikEdButtonBarFind);

	wikEdButtonBarFix = MakeButtonBar(wikEdButtonBar['fix']);
	wikEdButtonsWrapper.appendChild(wikEdButtonBarFix);

	if (wikEdButtonBar['custom2'][6].length > 0) {
		wikEdButtonBarCustom2 = MakeButtonBar(wikEdButtonBar['custom2']);
		wikEdButtonsWrapper.appendChild(wikEdButtonBarCustom2);
	}

	var br = document.createElement('br');
	br.style.clear = 'both';
	wikEdButtonsWrapper.appendChild(br);

	wikEdCaseSensitive = document.getElementById('wikEdCaseSensitive');
	wikEdRegExp = document.getElementById('wikEdRegExp');
	wikEdFindAhead = document.getElementById('wikEdFindAhead');
	wikEdFindText = document.getElementById('wikEdFindText');
	wikEdReplaceText = document.getElementById('wikEdReplaceText');

// add preview box top bar to submit wrapper
	wikEdButtonBarPreview = MakeButtonBar(wikEdButtonBar['preview']);
	if (wikEdRearrange == true) {
		wikEdSubmitWrapper.insertBefore(wikEdButtonBarPreview, wikEdSubmitWrapper.firstChild);
	}

// add preview box and its bottom bar to preview wrapper
	if (wikEdLocalPrevWrapper != null) {
		var div = document.createElement('div');
		div.id = 'wikEdPreviewBoxOuter';
		div.className = 'wikEdPreviewBoxOuter';
		wikEdLocalPrevWrapper.appendChild(div);

		wikEdPreviewBox = document.createElement('div');
		wikEdPreviewBox.id = 'wikEdPreviewBox';
		wikEdPreviewBox.className = 'wikEdPreviewBox';
		div.appendChild(wikEdPreviewBox);

		wikEdButtonBarPreview2 = MakeButtonBar(wikEdButtonBar['preview2']);
		wikEdLocalPrevWrapper.appendChild(wikEdButtonBarPreview2);
	}

// add jump box to standard preview
	var wikiPreview = document.getElementById('wikiPreview');
	if (wikiPreview != null) {
		if (wikiPreview.firstChild != null) {
			wikEdButtonBarJump = MakeButtonBar(wikEdButtonBar['jump']);
			wikiPreview.insertBefore(wikEdButtonBarJump, wikiPreview.firstChild);
		}
	}

// add insert special chars to insert wrapper
	if (wikEdInsertWrapper != null) {
		var wpSpecialchars = document.getElementById('editpage-specialchars');
		if (wpSpecialchars != null) {
			wikEdInsertWrapper.appendChild(wpSpecialchars);
		}
	}

// wrappers filled

// add local preview button next to submit button
	wikEdLocalPreview = document.createElement('button');
	wikEdLocalPreview.id = 'wikEdLocalPreview';
	wikEdLocalPreview.title = wikEdText['wikEdLocalPreview title'];
	wikEdLocalPreview.className = 'wikEdLocalPreview';

	var localPreviewImg = document.createElement('img');
	localPreviewImg.id = 'wikEdLocalPreviewImg';
	localPreviewImg.src = wikEdImage['preview'];
	localPreviewImg.alt = wikEdText['wikEdLocalPreviewImg alt'];
	localPreviewImg.title = wikEdText['wikEdLocalPreviewImg title'];
	wikEdLocalPreview.appendChild(localPreviewImg);

	if (wikEdPreviewButton != null) {
		wikEdPreviewButton.parentNode.insertBefore(wikEdLocalPreview, wikEdPreviewButton.nextSibling);
	}
	else {
		wikEdSaveButton.parentNode.insertBefore(wikEdLocalPreview, wikEdSaveButton.nextSibling);
	}

// add local diff button next to submit button
	if (wikEdDiffPreviewButton != null) {
		wikEdLocalDiff = document.createElement('button');
		wikEdLocalDiff.id = 'wikEdLocalDiff';
		wikEdLocalDiff.title = wikEdText['wikEdLocalDiff title'];
		wikEdLocalDiff.className = 'wikEdLocalDiff';

		var localDiffImg = document.createElement('img');
		localDiffImg.id = 'wikEdLocalDiffImg';
		localDiffImg.src = wikEdImage['diff'];
		localDiffImg.alt = wikEdText['wikEdLocalDiffImg alt'];
		localDiffImg.title = wikEdText['wikEdLocalDiffImg title'];

		wikEdLocalDiff.appendChild(localDiffImg);
		wikEdDiffPreviewButton.parentNode.insertBefore(wikEdLocalDiff, wikEdDiffPreviewButton.nextSibling);
	}

// initialize image buttons
	WikEdButton(document.getElementById('wikEdDiff'),            'wikEdDiff', null, wikEdDiff);
	WikEdButton(document.getElementById('wikEdRefHide'),         'wikEdRefHide', null, wikEdRefHide);
	WikEdButton(document.getElementById('wikEdHighlightSyntax'), 'wikEdHighlightSyntax', null, wikEdHighlightSyntax);
	WikEdButton(document.getElementById('wikEdUseWikEd'),        'wikEdUseWikEd', null, wikEdUseWikEd);
	WikEdButton(document.getElementById('wikEdCloseToolbar'),    'wikEdCloseToolbar', null, wikEdCloseToolbar);
	WikEdButton(document.getElementById('wikEdFullScreen'),      'wikEdFullScreen', null, wikEdFullScreenMode);
	WikEdButton(document.getElementById('wikEdUsing'),           'wikEdUsing', null, wikEdUsing);
	WikEdButton(document.getElementById('wikEdCaseSensitive'),   'wikEdCaseSensitive', null, false);
	WikEdButton(document.getElementById('wikEdRegExp'),          'wikEdRegExp', null, false);
	WikEdButton(document.getElementById('wikEdFindAhead'),       'wikEdFindAhead', null, wikEdFindAheadSelected);
	WikEdButton(document.getElementById('wikEdClose'),           'wikEdClose', null, false, 'wikEdButton');
	WikEdButton(document.getElementById('wikEdClose2'),          'wikEdClose2', null, false, 'wikEdButton');
	WikEdButton(document.getElementById('wikEdTableMode'),       'wikEdTableMode', null, wikEdTableMode); // {{TABLE}}

// hide typo fix button until typo fix rules are loaded and parsed
	document.getElementById('wikEdFixRegExTypo').style.display = 'none';

// hide buttons if API is not available
	if (wikEdWikiGlobals['wgEnableAPI'] != 'true') {
		document.getElementById('wikEdFixRedirect').style.display = 'none';
	}

// add a clear summary button left to the summary input field
	if (wikEdSummaryText != null) {
		var clearSummaryForm = document.createElement('form');
		clearSummaryForm.id = 'wikEdClearSummaryForm';
		clearSummaryForm.className = 'wikEdClearSummaryForm';
		wikEdSummaryText.parentNode.insertBefore(clearSummaryForm, wikEdSummaryText);

		wikEdClearSummary = document.createElement('button');
		wikEdClearSummary.id = 'wikEdClearSummary';
		wikEdClearSummary.className = 'wikEdClearSummary';
		wikEdClearSummary.alt = wikEdText['wikEdClearSummary alt'];
		wikEdClearSummary.title = wikEdText['wikEdClearSummary title'];
		wikEdClearSummary.style.height = (wikEdSummaryText.clientHeight + 1) +'px';
		clearSummaryForm.appendChild(wikEdClearSummary);

		wikEdClearSummaryImg = document.createElement('img');
		wikEdClearSummaryImg.id = 'wikEdClearSummaryImg';
		wikEdClearSummaryImg.src = wikEdImage['clearSummary'];
		wikEdClearSummaryImg.alt = 'Clear summary';
		wikEdClearSummary.appendChild(wikEdClearSummaryImg);

// remember button width, might be without image
		wikEdClearSummaryWidth = wikEdClearSummary.offsetWidth;

// make the summary a combo box
		var summaryComboInput = document.createElement('span');
		summaryComboInput.id = 'wikEdSummaryComboInput';
		summaryComboInput.className = 'wikEdSummaryComboInput';
		summaryComboInput = wikEdSummaryText.parentNode.insertBefore(summaryComboInput, wikEdSummaryText);

		wikEdSummaryText = wikEdSummaryText.parentNode.removeChild(wikEdSummaryText);
		wikEdSummaryText.className = 'wikEdSummaryText';
		wikEdSummaryTextWidth = wikEdSummaryWrapper.offsetWidth - wikEdSummaryInputWrapper.offsetWidth;
		if (wikEdSummaryTextWidth < 150) {
			wikEdSummaryTextWidth = 150;
		}
		wikEdSummaryText.style.width = wikEdSummaryTextWidth + 'px';

		wikEdSummarySelect = document.createElement('select');
		wikEdSummarySelect.id = 'wikEdSummarySelect';
		wikEdSummarySelect.className = 'wikEdSummarySelect';

		summaryComboInput.appendChild(wikEdSummaryText);
		summaryComboInput.appendChild(wikEdSummarySelect);
	}

// shorten submit button texts
	if (wikEdPreviewButton != null) {
		wikEdPreviewButton.value = wikEdText['shortenedPreview'];
	}
	if (wikEdDiffPreviewButton != null) {
		wikEdDiffPreviewButton.value = wikEdText['shortenedChanges'];
	}

// set up combo input boxes with history
	wikEdFieldHist ['find'] = [];
	wikEdSavedName['find'] = 'wikEdFindHistory';
	wikEdInputElement['find'] = new Object(wikEdFindText);
	wikEdSelectElement['find'] = new Object(document.getElementById('wikEdFindSelect'));
	wikEdSelectElement['find'].title = wikEdText['wikEdFindSelect title'];

	wikEdFieldHist ['replace'] = [];
	wikEdSavedName['replace'] = 'wikEdReplaceHistory';
	wikEdInputElement['replace'] = new Object(wikEdReplaceText);
	wikEdSelectElement['replace'] = new Object(document.getElementById('wikEdReplaceSelect'));
	wikEdSelectElement['replace'].title = wikEdText['wikEdReplaceSelect title'];

	if (wikEdSummaryInputWrapper != null) {
		wikEdFieldHist ['summary'] = [];
		wikEdSavedName['summary'] = 'wikEdSummaryHistory';
		wikEdInputElement['summary'] = new Object(wikEdSummaryText);
		wikEdSelectElement['summary'] = new Object(document.getElementById('wikEdSummarySelect'));
		wikEdSelectElement['summary'].title = wikEdText['wikEdSummarySelect title'];
	}

// adjust the select field widths to that of the text input fields
	WikEdResizeComboInput('find');
	WikEdResizeComboInput('replace');
	WikEdResizeComboInput('summary');

// hide the button bars per saved setting
	WikEdButtonBarInit(wikEdButtonBarFormat);
	WikEdButtonBarInit(wikEdButtonBarTextify);
	WikEdButtonBarInit(wikEdButtonBarControl);
	if (wikEdButtonBarCustom1 != null) {
		WikEdButtonBarInit(wikEdButtonBarCustom1);
	}
	WikEdButtonBarInit(wikEdButtonBarFind);
	WikEdButtonBarInit(wikEdButtonBarFix);
	if (wikEdButtonBarCustom2 != null) {
		WikEdButtonBarInit(wikEdButtonBarCustom2);
	}

// display only the textarea or the iframe, dont change the frame
	if (wikEdUseWikEd == true) {
		WikEdSetEditArea(true, true);
	}
	else {
		WikEdSetEditArea(false, true);
	}

// add a link to the wikEd help page
	if (wikEdRearrange == true) {
		if ( (wikEdHelpPageLink != '') && (wikEdHelpPageLink != null) ) {
			var editHelpParent = wikEdDiffPreviewButton;
			while (editHelpParent != null) {
				if (editHelpParent.tagName == 'SPAN') {
					break;
				}
				editHelpParent = editHelpParent.nextSibling;
			}

			if (editHelpParent != null) {
				var editHelp = editHelpParent.lastChild;
				while (editHelp != null) {
					if (editHelp.tagName == 'A') {
						break;
					}
					editHelp = editHelp.previousSibling;
				}

				if (editHelp != null) {
					wikEdHelpSpan = document.createElement('span');
					wikEdHelpSpan.id = 'wikEdHelpSpan';
					wikEdHelpSpan.className = 'wikEdHelpSpan';
					wikEdHelpSpan.innerHTML = wikEdHelpPageLink;
					editHelpParent.insertBefore(wikEdHelpSpan, editHelp.nextSibling);

					wikEdEditHelp = wikEdHelpSpan.parentNode;
					wikEdEditHelp.id = 'wikEdEditHelp';
					wikEdEditHelp.className = 'wikEdEditHelp';
				}
			}
		}
	}

// add frame stylesheet definition
	wikEdFrameBody.style.fontSize = parseInt(wikEdTextZoom) + '%';
	wikEdDirection = WikEdGetStyle(document.body, 'direction');
	wikEdFrameBody.style.direction = wikEdDirection;
	var frameStyle = new WikEdStyleSheet(wikEdFrameDocument);
	var rules = '';
	for (var ruleName in wikEdFrameCSS) {
		var ruleStyle = wikEdFrameCSS[ruleName];
		if (typeof(ruleStyle) != 'string') {
			continue;
		}

// replace {wikedName} in css rules with image path
		ruleStyle = ruleStyle.replace(/\{wikEd(\w)(\w*)\}/g,
			function (p, p1, p2) {
				return(wikEdImage[p1.toLowerCase() + p2]);
			}
		);
		rules += ruleName + ' {' + ruleStyle + '}\n';
	}
	frameStyle.addRules(rules);

// copy the textarea content to the iframe
	if (wikEdUseWikEd == true) {
		window.WikEdUpdateFrame();
	}

// register edit button click events
	for (var buttonId in wikEdEditButtonHandler) {
		if (typeof(wikEdEditButtonHandler[buttonId]) != 'string') {
			continue;
		}
		var buttonObj = document.getElementById(buttonId);
		if (buttonObj != null) {
			WikEdAddEventListener(buttonObj, 'click', WikEdEditButtonHandler, true);
		}
	}

// register summary shrinking event after loading the 'Clear summary' image handler
	WikEdAddEventListener(wikEdClearSummaryImg, 'load', WikEdShrinkSummaryHandler, true);

// register summary resize event for window resizing (MS IE bug: fires once always)
	WikEdAddEventListener(window, 'resize', WikEdResizeSummaryHandler, true);


// register frame events
	WikEdAddEventListener(wikEdFrameDocument, 'keydown', WikEdKeyFrameHandler, true);
	WikEdAddEventListener(wikEdFrameDocument, 'keyup', WikEdKeyFrameHandler, true);
	WikEdAddEventListener(wikEdFrameDocument, 'keypress', WikEdKeyFrameHandler, true);
	WikEdAddEventListener(wikEdFrameDocument, 'mouseup', WikEdKeyFrameHandler, true);
	WikEdAddEventListener(wikEdFrameDocument, 'keydown', WikEdShiftAltHandler, true);

// register document events
	WikEdAddEventListener(document, 'keydown', WikEdShiftAltHandler, true);

// register find ahead events
	WikEdAddEventListener(wikEdFindText, 'keyup', WikEdFindAhead, true);

// register submit button events
	WikEdAddEventListener(wikEdSaveButton, 'click', WikEdSaveButtonHandler, true);
	WikEdAddEventListener(wikEdPreviewButton, 'click', WikEdPreviewButtonHandler, true);
	WikEdAddEventListener(wikEdDiffPreviewButton, 'click', wikEdDiffPreviewButtonHandler, true);
	WikEdAddEventListener(wikEdLocalPreview, 'click', WikEdLocalPreviewHandler, true);
	WikEdAddEventListener(wikEdLocalDiff, 'click', WikEdLocalDiffHandler, true);

// unload (leaving page) events
	WikEdAddEventListener(window, 'pagehide', WikEdUnloadHandler, false);

// set button bar grip area events
	WikEdAddEventListener(wikEdButtonBarFormat.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
	WikEdAddEventListener(wikEdButtonBarTextify.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
	WikEdAddEventListener(wikEdButtonBarControl.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
	if (wikEdButtonBarCustom1 != null) {
		if (wikEdButtonBarCustom1.firstChild.firstChild != null) {
			WikEdAddEventListener(wikEdButtonBarCustom1.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
		}
	}
	WikEdAddEventListener(wikEdButtonBarFind.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
	WikEdAddEventListener(wikEdButtonBarFix.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
	if (wikEdButtonBarCustom2 != null) {
		if (wikEdButtonBarCustom2.firstChild.firstChild != null) {
			WikEdAddEventListener(wikEdButtonBarCustom2.firstChild.firstChild, 'click', WikEdButtonBarGripHandler, false);
		}
	}

// register combo box events
	WikEdAddEventListener(wikEdSummarySelect, 'change', function() { WikEdChangeComboInput('summary'); }, false);
	WikEdAddEventListener(wikEdSummarySelect, 'focus', function() { WikEdSetComboOptions('summary'); }, false);

	WikEdAddEventListener(wikEdSelectElement['find'],'change', function() { WikEdChangeComboInput('find'); }, false);
	WikEdAddEventListener(wikEdSelectElement['find'],'focus', function() { WikEdSetComboOptions('find'); }, false);

	WikEdAddEventListener(wikEdSelectElement['replace'],'change', function() { WikEdChangeComboInput('replace'); }, false);
	WikEdAddEventListener(wikEdSelectElement['replace'],'focus', function() { WikEdSetComboOptions('replace'); }, false);

// register the clear summary click handler
	WikEdAddEventListener(wikEdClearSummary, 'click', WikEdClearSummaryHandler, true);

// select the text on focus for find and replace fields
	WikEdAddEventListener(wikEdFindText, 'focus', WikEdFindReplaceHandler, true);
	WikEdAddEventListener(wikEdReplaceText, 'focus', WikEdFindReplaceHandler, true);

// tab / shift-tab between find and replace fields
	WikEdAddEventListener(wikEdFindText, 'keydown', WikEdFindReplaceHandler, true);
	WikEdAddEventListener(wikEdReplaceText, 'keydown', WikEdFindReplaceHandler, true);

// scroll to edit window if it is not a preview page
	if (scrollToEdit != false) {
		if (window.location.search.match(/(\?|&)action=submit\b/) == null) {
			window.scroll(0, WikEdGetOffsetTop(wikEdInputWrapper) - 2);
		}

// focus the edit area
		if (wikEdUseWikEd == true) {
			wikEdFrameWindow.focus();
		}
		else {
			if (wikEdMSIE == true) {

			}
			else {
				wikEdTextarea.setSelectionRange(0, 0);
			}
			wikEdTextarea.focus();
		}
	}

// init MediaWiki file paths for use in regexps
	if (wikEdWikiGlobals['wgServer'] != null) {
		wikEdServer = wikEdWikiGlobals['wgServer'];
	}
	if (wikEdWikiGlobals['wgArticlePath'] != null) {
		wikEdArticlePath = wikEdWikiGlobals['wgArticlePath']
	}
	if (wikEdWikiGlobals['wgScriptPath'] != null) {
		wikEdScriptPath = wikEdWikiGlobals['wgScriptPath'];
	}
	if (wikEdWikiGlobals['wgScript'] != null) {
		wikEdScript = wikEdWikiGlobals['wgScript'];
	}

	wikEdArticlePath = wikEdArticlePath.replace(wikEdServer, '');
	wikEdScriptPath = wikEdScriptPath.replace(wikEdServer, '');
	wikEdArticlePath = wikEdArticlePath.replace(/\$1$/, '');
	wikEdScriptPath = wikEdScriptPath.replace(/\/?$/, '/');
	wikEdScriptName = wikEdScript.replace(wikEdScriptPath, '');
	wikEdScriptURL = wikEdServer + wikEdScriptPath;

// prepare for use in regexps
	wikEdServer = wikEdServer.replace(/(\W)/g, '\\$1');
	wikEdArticlePath = wikEdArticlePath.replace(/(\W)/g, '\\$1');
	wikEdScript = wikEdScript.replace(/(\W)/g, '\\$1');
	wikEdScriptPath = wikEdScriptPath.replace(/(\W)/g, '\\$1');
	wikEdScriptName = wikEdScriptName.replace(/(\W)/g, '\\$1');

// check if dynamically inserted addon tags have to be removed: Web of Trust (WOT)
	if (document.getElementById('wot-logo') != null) {
		wikEdCleanNodes = true;
	}

// fullscreen mode
	if (wikEdFullScreenMode == true) {
		WikEdFullScreen(wikEdFullScreenMode, true);
	}

// override the insertTags function in wikibits.js used by the standard button toolbar and the editpage special chars
	if (typeof(insertTags) == 'function') {
		if (WikEdInsertTagsOriginal == null) {
			WikEdInsertTagsOriginal = insertTags;
		}
		insertTags = window.WikEdInsertTags;
	}

// override insertAtCursor function in wikia.com MediaWiki:Functions.js
	if (typeof(insertAtCursor) == 'function') {
		if (WikEdInsertAtCursorOriginal == null) {
			WikEdInsertAtCursorOriginal = insertAtCursor;
		}
		insertAtCursor = window.WikEdInsertAtCursor;
	}

// reset error indicator
	WikEdSetLogo();
	wikEdTurnedOn = true;

// load and parse RegExTypoFix rules if the button is enabled
	WikEdLoadTypoFixRules();

/*
///// register article name autofind
	var inputId = 'wikEdFindText';
	var formId = 'searchform';
	var inputNode = document.getElementById(inputId);
	if (inputNode != null) {
		if (typeof(os_initHandlers) == 'function') {
			os_initHandlers(inputId, formId, inputNode);
		}
	}
*/

// run scheduled custom functions
	WikEdExecuteHook(wikEdSetupHook);

// setup and turn on finished
	return;
}


//
// WikEdAutoUpdate: check for the latest version and force-reload to update
//

window.WikEdAutoUpdate = function() {

// check only on non-interaction pages
	if (/(\?|&)action=/.test(window.location.search) == true) {
		return;
	}

// check if autoupdate is enabled
	if (wikEdAutoUpdate != true) {
		return;
	}

// get date of last update check
	var lastCheckStr = WikEdGetPersistent('wikEdAutoUpdate');
	var lastCheckDate = new Date(lastCheckStr);

// fix missing or corrupt saved setting
	if (isNaN(lastCheckDate.valueOf()) == true) {
		WikEdSetPersistent('wikEdAutoUpdate', 'January 1, 1970', 0, '/');
		return;
	}

// get the hours since last update check
	var currentDate = new Date();
	var diffHours = (currentDate - lastCheckDate) / 1000 / 60 / 60;

	if (wikEdGreasemonkey == true) {
		if (diffHours < wikEdAutoUpdateHoursGM) {
			return;
		}
	}
	else if (diffHours < wikEdAutoUpdateHours) {
		return;
	}

// save current update check date
	WikEdSetPersistent('wikEdAutoUpdate', currentDate.toUTCString(), 0, '/');

// make the ajax request
	WikEdAjaxRequest('GET', wikEdAutoUpdateUrl, null, null, null, null, function(ajax) {

// get response
		var html = ajax.responseText;

// get current version number from string
		var ver = wikEdProgramVersion.match(/(\d+)\.(\d+)\.(\d+)(\w?)/);
		if (ver == null) {
			return;
		}
		var currentVersion = ((Number(ver[1]) * 1000 + Number(ver[2])) * 1000 + Number(ver[3])) * 100 + (ver[4] + '0').charCodeAt(0);

// get new version number from string
		var ver = html.match(/(\d+)\.(\d+)\.(\d+)(\w?)/);
		if (ver == null) {
			return;
		}
		var newVersion = ((Number(ver[1]) * 1000 + Number(ver[2])) * 1000 + Number(ver[3])) * 100 + (ver[4] + '0').charCodeAt(0);

// compare the versions
		if (currentVersion >= newVersion) {
			return;
		}

// update Greasemonkey script by navigating to the script code page
		if (wikEdGreasemonkey == true) {
			var updatePopup = wikEdText['wikEdGreasemonkeyAutoUpdate'];
			updatePopup = updatePopup.replace(/\{updateURL\}/g, wikEdAutoUpdateUrl);
			alert(updatePopup);
			window.location.href = wikEdAutoUpdateScriptUrl;
		}

// update wikEd by reloading the page with cache bypassing (equivalent to Shift-Reload or Shift-F5)
		else {
			window.location.reload(true);
		}
		return;
	});

	return;
}


//
// WikEdLoadTypoFixRules: load and parse RegExTypoFix rules if the button is enabled
//

window.WikEdLoadTypoFixRules = function() {

// load RegExTypoFix rules per Ajax if enabled
	if ( (wikEdRegExTypoFix == true) && (wikEdTypoRulesFind.length == 0) ) {

// make the ajax request
		WikEdAjaxRequest('GET', wikEdRegExTypoFixURL, null, null, null, null, function(ajax) {

// get response
			var rulesTxt = ajax.responseText;

// parse regexp rules
			var regExp = new RegExp('^<Typo +word="(.+?)" +find="(.+?)" +replace="(.+?)" +/>', 'gim');
			while ( (regExpMatch = regExp.exec(rulesTxt)) != null) {

// check if this is a valid regexp
				var regExpFind;
				try {
					regExpFind = new RegExp(regExpMatch[2], 'gm');
				}
				catch (err) {
					continue;
				}

// save regexp and replace
				wikEdTypoRulesFind.push(regExpFind);
				wikEdTypoRulesReplace.push(regExpMatch[3]);
			}

// display typo fix button
			if (wikEdTypoRulesFind.length > 0) {
				document.getElementById('wikEdFixRegExTypo').style.display = 'inline';
			}
			return;
		});
	}
	return;
}


//
// WikEdEditButtonHandler: handler for clicks on edit buttons
//

window.WikEdEditButtonHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

// execute the button click handler code
	var obj;
	if (event.currentTarget != null) {
		obj = event.currentTarget;
	}

// MS IE compatibility
	else {
		obj = event.srcElement;
	}

// workaround for mozilla 3.0 bug 441087
	objId = obj.id;
	eventShiftKey = event.shiftKey;

	eval(wikEdEditButtonHandler[objId]);
	return;
}


//
// WikEdShrinkSummaryHandler: shrink the summary after loading the 'Clear summary' image
//

window.WikEdShrinkSummaryHandler = function(event) {

	var diffWidth = wikEdClearSummary.offsetWidth - wikEdClearSummaryWidth;

// Firefox < 3.0
	if ( typeof(wikEdInputElement['summary'].clientLeft) == 'undefined' ) {
		wikEdInputElement['summary'].style.width = (wikEdInputElement['summary'].clientWidth - diffWidth) + 'px';
		wikEdSelectElement['summary'].style.width = (wikEdSelectElement['summary'].clientWidth - diffWidth) + 'px';
	}

// Firefox >= 3.0
	else {
		wikEdInputElement['summary'].style.width = (wikEdInputElement['summary'].clientWidth - diffWidth) + 'px';
		wikEdSelectElement['summary'].style.width = (wikEdSelectElement['summary'].clientWidth - diffWidth + 3) + 'px';
	}
	wikEdClearSummaryWidth = wikEdClearSummary.offsetWidth;
	return;
}


//
// WikEdResizeSummaryHandler: adjust the summary width after resizing the window
//

window.WikEdResizeSummaryHandler = function(event) {

	WikEdResizeSummary();
	return;
}


//
// WikEdUnloadHandler: save editing frame to cached textarea
//

window.WikEdUnloadHandler = function(event) {

// update textarea if not already done in submit handlers
	if (wikEdUseWikEd == true) {
		if (wikEdTextareaUpdated != true) {
			WikEdUpdateTextarea();
		}
	}
	return;
}


//
// WikEdSaveButtonHandler: 'Save page' click handler
//

window.WikEdSaveButtonHandler = function(event) {

	WikEdRemoveEventListener(wikEdSaveButton, 'click', WikEdSaveButtonHandler, true);

// update textarea
	if (wikEdUseWikEd == true) {
		WikEdUpdateTextarea();
		wikEdTextareaUpdated = true;
	}

// add "using wikEd" to summary, not for adding a new section (+ tab)
	var text = wikEdSummaryText.value;
	text = text.replace(/^[, ]+/, '');
	text = text.replace(/[, ]+$/, '');
	WikEdAddToHistory('summary');

	if ( (wikEdUsing == true) && (text != '') ) {
		if (text.lastIndexOf(wikEdSummaryUsing) < 0) {
			if (wikEdAddNewSection != true) {
				text += ' ' + wikEdSummaryUsing;
			}
		}
	}
	wikEdSummaryText.value = text;

// submit
	wikEdSaveButton.click();

// reinstate handler in case the browser back button will be used
	WikEdAddEventListener(wikEdSaveButton, 'click', WikEdSaveButtonHandler, true);

	return;
}


//
// WikEdPreviewButtonHandler: 'Show preview' click handler
//

window.WikEdPreviewButtonHandler = function(event) {

	if (wikEdUseWikEd == true) {
		WikEdUpdateTextarea();
		wikEdTextareaUpdated = true;
	}

	return;
}


//
// wikEdDiffPreviewButtonHandler: 'Show changes' click handler
//

window.wikEdDiffPreviewButtonHandler = function(event) {

	if (wikEdFullScreenMode == true) {
		WikEdFullScreen(false);
	}
	if (wikEdUseWikEd == true) {
		WikEdUpdateTextarea();
		wikEdTextareaUpdated = true;
	}

	return;
}


//
// WikEdFollowLinkHandler: open highlighted link in new window/tab
//

window.WikEdFollowLinkHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	if (event.ctrlKey == true) {
		var linkId = event.currentTarget.id;
//// todo: find the lowest span that triggered this event for links in templates
		if (linkId != null) {
			var linkUrl = wikEdFollowLinkHash[linkId];
			if (linkUrl != null) {
				event.stopPropagation();
				window.open(linkUrl);
				window.focus();
			}
		}
	}
	return;
}


//
// WikEdLocalPreviewHandler: local 'Show preview' image button click handler
//

window.WikEdLocalPreviewHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	event.preventDefault();
	WikEdButton(wikEdLocalPreview, 'wikEdLocalPreview');
	return;
}


//
// WikEdLocalDiffHandler: local 'Show changes' image button click handler
//

window.WikEdLocalDiffHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	event.preventDefault();
	WikEdButton(wikEdLocalDiff, 'wikEdLocalDiff');
	return;
}


//
// WikEdButtonBarGripHandler: click, mouseover handler, see also WikEdButtonBarInit()
//

window.WikEdButtonBarGripHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	event.stopPropagation();
	var grip = event.target;
	var gripWrapper = grip.parentNode;
	var buttonsWrapper = gripWrapper.nextSibling;
	var buttons = buttonsWrapper.firstChild;
	var barInnerWrapper = gripWrapper.parentNode;
	var bar = barInnerWrapper.parentNode;

	if (event.type == 'click') {
		buttonsWrapper.style.position = 'static';

// hide the buttons bar
		if (buttonsWrapper.minimized != true) {
			barInnerWrapper.className = 'wikEdButtonBarInnerWrapperHidden';
			gripWrapper.className = 'wikEdButtonBarGripWrapperHidden';
			buttonsWrapper.className = 'wikEdButtonBarButtonsWrapperHidden';
			buttonsWrapper.widthOriginal = buttonsWrapper.offsetWidth;
			buttonsWrapper.style.display = 'none';
			buttonsWrapper.minimized = true;
			WikEdAddEventListener(grip, 'mouseover', WikEdButtonBarGripHandler, false);
			WikEdSetPersistent(bar.id + 'Hidden', '1', 0, '/');
		}

// unhide the buttons bar
		else {
			barInnerWrapper.className = 'wikEdButtonBarInnerWrapperVisible';
			gripWrapper.className = 'wikEdButtonBarGripWrapperVisible';
			buttonsWrapper.className = 'wikEdButtonBarButtonsWrapperVisible';
			buttonsWrapper.style.display = 'block';
			buttonsWrapper.minimized = false;
			WikEdRemoveEventListener(grip, 'mouseover', WikEdButtonBarGripHandler, false);
			WikEdSetPersistent(bar.id + 'Hidden', '0', 0, '/');
		}
	}

// show the buttons bar on mouseover
	else if (event.type == 'mouseover') {
		if (buttonsWrapper.minimized == true) {
			WikEdAddEventListener(bar, 'mouseout', WikEdButtonBarHandler, false);

// show buttons to the right
			if (bar.offsetParent.clientWidth > grip.offsetLeft + grip.offsetWidth + buttonsWrapper.widthOriginal) {
				buttonsWrapper.style.left = (grip.offsetLeft + grip.offsetWidth) + 'px';
			}

// show buttons to the left
			else {
				buttonsWrapper.style.left = (gripWrapper.offsetLeft - buttonsWrapper.widthOriginal) + 'px';
			}

// a mozilla bug sometimes gives offsetTop - 1 when the wikEdToolbarWrapper is hidden
			buttonsWrapper.style.top = gripWrapper.offsetTop + 'px';
			buttonsWrapper.style.position = 'absolute';
			buttonsWrapper.style.display = 'block';
		}
	}
	return;
}


//
// WikEdButtonBarGripHandler: mouseout handler
//

window.WikEdButtonBarHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	event.stopPropagation();

	var bar = event.currentTarget;
	var barInnerWrapper = bar.firstChild;
	var gripWrapper = barInnerWrapper.firstChild;
	var grip = gripWrapper.firstChild;
	var buttonsWrapper = gripWrapper.nextSibling;
	var buttons = buttonsWrapper.firstChild;

// hide the buttons
	if (event.type == 'mouseout') {
		if (buttonsWrapper.minimized == true) {

// filter the events for mouseouts actually leaving the bar
			if (
				(
					( (event.target == grip) || (event.target == gripWrapper) ) &&
					(event.relatedTarget != gripWrapper) && (event.relatedTarget != buttonsWrapper) && (event.relatedTarget != buttons) && (event.relatedTarget.parentNode != buttons)
				) ||
				(
					( (event.target.parentNode.parentNode == buttons) || (event.target.parentNode == buttons) || (event.target == buttons) || (event.target == buttonsWrapper) ) &&
					(event.relatedTarget.parentNode.parentNode != buttons) && (event.relatedTarget.parentNode != buttons) && (event.relatedTarget != buttons) && (event.relatedTarget != buttonsWrapper) && (event.relatedTarget != gripWrapper) && (event.relatedTarget != grip)
				)
			) {
				WikEdRemoveEventListener(bar, 'mouseout', WikEdButtonBarHandler, false);
				buttonsWrapper.style.display = 'none';
				buttonsWrapper.style.position = 'static';
			}
		}
	}
	return;
}


//
// clear the summary click handler
//

window.WikEdClearSummaryHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	event.preventDefault();

// clear the summary if it is only a paragraph name
	if ( /^\/\* .*? \*\/ *$/.test(wikEdSummaryText.value) ) {
		wikEdSummaryText.value = '';
	}

// clear the summary but leave paragraph names
	else {
		wikEdSummaryText.value = wikEdSummaryText.value.replace(/^((\/\* .*? \*\/ *)?).*()/,
			function (p, p1, p2) {
				if (p1.length > 0) {
					p1 = p1 + ' ';
				}
				return(p1);
			}
		);
	}
	wikEdSummaryText.focus();
	return;
}


//
// WikEdFindReplaceHandler: find and replace: tab and shift-tab between fields, select on focus
//

window.WikEdFindReplaceHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

// tab / shift-tab between fields
	if (event.type == 'keydown') {
		if (event.keyCode == 9) {
			if (event.target == wikEdFindText) {
				event.preventDefault();
				WikEdRemoveEventListener(wikEdReplaceText, 'focus', WikEdFindReplaceHandler, true);
				wikEdReplaceText.focus();
				WikEdAddEventListener(wikEdReplaceText, 'focus', WikEdFindReplaceHandler, true);
			}
			else if (event.target == wikEdReplaceText) {
				event.preventDefault();
				WikEdRemoveEventListener(wikEdFindText, 'focus', WikEdFindReplaceHandler, true);
				wikEdFindText.focus();
				WikEdAddEventListener(wikEdFindText, 'focus', WikEdFindReplaceHandler, true);
			}
		}
	}

// select on focus
	else if (event.type == 'focus') {
		if (wikEdMSIE == true) {

		}
		else {
			event.target.setSelectionRange(0, this.textLength);
		}
	}
	return;
}


//
// WikEdSetLogo: set the logo on top of the page
//

window.WikEdSetLogo = function(state) {

	if (state == 'error') {
		wikEdLogo.src = wikEdImage['error'];
		wikEdLogo.alt = wikEdText['wikEdLogo error alt'];
		wikEdLogo.title = wikEdText['wikEdLogo error title'];
	}
	else if (state == 'browser') {
		wikEdLogo.src = wikEdImage['browser'];
		wikEdLogo.alt = wikEdText['wikEdLogo browser alt'];
		wikEdLogo.title = wikEdText['wikEdLogo browser title'];
	}
	else {
		if (wikEdDisabled == true) {
			wikEdLogo.src = wikEdImage['disabled'];
			wikEdLogo.alt = wikEdText['wikEdLogo disabled alt'];
			wikEdLogo.title = wikEdText['wikEdLogo disabled title'];
		}
		else {
			wikEdLogo.src = wikEdImage['logo'];
			wikEdLogo.alt = wikEdText['wikEdLogo alt'];
			wikEdLogo.title = wikEdText['wikEdLogo title'];
		}
	}
	var version = wikEdProgramVersion;
	if (wikEdGadget == true) {
		version += ' G';
	}
	else if (wikEdGreasemonkey == true) {
		version += ' GM';
	}
	else if (wikEdGreasemonkeyToHead == true) {
		version += ' GM';
	}
	wikEdLogo.title = wikEdLogo.title.replace(/\{wikEdProgramVersion\}/g, version);
	wikEdLogo.title = wikEdLogo.title.replace(/\{wikEdProgramDate\}/g, wikEdProgramDate);

	return;
}


//
// MakeButtonBar: generate button bar div element
//

window.MakeButtonBar = function(bar)  {

// id outer, class outer, id inner, class inner, alt, button numbers
	var barId = bar[0];
	var barClass = bar[1];
	var buttonsId = bar[2];
	var buttonsClass = bar[3];
	var barHeight = bar[4];
	var gripTitle = bar[5];
	var buttonNumbers = bar[6];

// collect the buttons
	var buttons = '';
	for (var property in buttonNumbers) {
		if ( (typeof(buttonNumbers[property]) != 'string') && (typeof(buttonNumbers[property]) != 'number') ) {
			continue;
		}
		var buttonNo = buttonNumbers[property];
		switch (buttonNo) {
			case 'br':
				buttons += '<br />';
				break;
			case 'find':
				buttons += '<span class="wikEdFindComboInput" id="wikEdFindComboInput">';
				buttons += '<input class="wikEdCombo" id="wikEdFindText" type="text" value="">';
				buttons += '<select class="wikEdCombo" id="wikEdFindSelect">';
				buttons += '</select>';
				buttons += '</span>';
				break;
			case 'replace':
				buttons += '<span class="wikEdReplaceComboInput" id="wikEdReplaceComboInput">';
				buttons += '<input class="wikEdCombo" id="wikEdReplaceText" type="text" value="">';
				buttons += '<select class="wikEdCombo" id="wikEdReplaceSelect">';
				buttons += '</select>';
				buttons += '</span>';
				break;
			default:
				var currButton = wikEdButton[buttonNo];
				if (typeof(currButton) != 'object') {
					alert('Loading error: The button "' + buttonNumbers[property] + '" is not defined.');
				}
				if ( (currButton[0] == 'wikEdSource') && (wikEdShowSourceButton != true) ) {
					break;
				}
				else if ( (currButton[0] == 'wikEdUsing') && (wikEdShowUsingButton != true) ) {
					break;
				}
				else if ( (currButton[0] == 'wikEdTableMode') && (wikEdShowTableModeButton != true) ) { // {{TABLE}}
					break;
				}

// add accesskey information to button title and
				var accessKey = '';
				if (wikEdButtonKey[buttonNo] != null) {
					accessKey = ' [' + wikEdText['alt-shift'] + wikEdButtonKey[buttonNo][0] + ']';

// initialize wikEdButtonKeyCode[keyCode] = id
					wikEdButtonKeyCode[ (wikEdButtonKey[buttonNo][1]) ] = currButton[0];
				}

// add button html code
				buttons += '<img id="' + currButton[0] + '" class="' + currButton[1] + '" title="' + currButton[2] + accessKey +'" src="' + currButton[3] + '" width="' + currButton[4] + '" height="' + currButton[5] + '" alt="' + currButton[6] + '">';

// collect click event info
				wikEdEditButtonHandler[ currButton[0] ] = currButton[7];

		}
	}

// create the button bar div
	var div = document.createElement('div');
	div.id = barId;
	div.className = barClass;

	var buttonsStyle = '';
	if (barHeight > 0) {
		buttonsStyle = ' style="height: ' + barHeight + 'px;"';
	}

// make a grip bar
	var html = '';
	if (gripTitle != null) {
		var gripStyle = 'width: ' + wikEdButtonBarGripWidth + 'px; ';
		if (barHeight > 0) {
			gripStyle += 'height: ' + barHeight + 'px; ';
		}
		if (gripStyle.length > 0){
			gripStyle = ' style="' + gripStyle + '"';
		}

		html += '<div class="wikEdButtonBarInnerWrapperVisible" style="height: ' + barHeight + 'px;">';

		html += '<div class="wikEdButtonBarGripWrapperVisible">';
		html += '<div class="wikEdButtonBarGrip"' + gripStyle + ' title="' + gripTitle + '">';
		html += '&nbsp;';
		html += '</div>';
		html += '</div>';

		html += '<div class="wikEdButtonBarButtonsWrapperVisible"' + buttonsStyle + '>';
		html += '<div id="' + buttonsId + '" class="' + buttonsClass + '" style="">';
		html += buttons;
		html += '</div>';
		html += '</div>';

		html += '</div>';
	}

// make a standard no-grip bar
	else {
		html += '<div id="' + buttonsId + '" class="' + buttonsClass + '"' + buttonsStyle + '">';
		html += buttons;
		html += '</div>';
	}
	div.innerHTML = html;

	return(div);
}


//
// WikEdButtonBarInit: hide buttons bar, see also WikEdButtonBarGripHandler()
//

window.WikEdButtonBarInit = function(bar) {

	if (WikEdGetPersistent(bar.id + 'Hidden') == '1') {
		var barInnerWrapper = bar.firstChild;
		var gripWrapper = barInnerWrapper.firstChild;
		var grip = gripWrapper.firstChild;
		var buttonsWrapper = gripWrapper.nextSibling;
		var buttons = buttonsWrapper.firstChild;

		barInnerWrapper.className = 'wikEdButtonBarInnerWrapperHidden';
		gripWrapper.className = 'wikEdButtonBarGripWrapperHidden';
		buttonsWrapper.className = 'wikEdButtonBarButtonsWrapperHidden';
		buttonsWrapper.widthOriginal = buttonsWrapper.offsetWidth;
		buttonsWrapper.style.display = 'none';
		buttonsWrapper.minimized = true;
		WikEdAddEventListener(grip, 'mouseover', WikEdButtonBarGripHandler, true);
	}
	return;
}


//
// WikEdSetEditArea: apply css changes to switch between classic textarea and rich text frame
//

window.WikEdSetEditArea = function(useFrame, notFrame) {

// turn rich text frame on
	if (useFrame == true) {
		wikEdTextareaWrapper.style.position = 'absolute';
		wikEdTextareaWrapper.style.visibility = 'hidden';
		wikEdTextarea.style.display = 'none';

		if (notFrame != true) {
			wikEdFrameWrapper.style.position = 'static';
			wikEdFrameWrapper.style.visibility = 'visible';
			wikEdFrameBody.style.display = 'block';
		}

		if (document.getElementById('toolbar') != null) {
			if (wikEdCloseToolbar == true) {
				wikEdToolbarWrapper.style.display = 'none';
			}
			else {
				wikEdToolbarWrapper.style.display = 'block';
			}
		}
		wikEdButtonBarFormat.style.display = 'block';
		wikEdButtonBarTextify.style.display = 'block';
		if (wikEdButtonBarCustom1 != null) {
			wikEdButtonBarCustom1.style.display = 'block';
		}
		wikEdButtonBarFind.style.display = 'block';
		wikEdButtonBarFix.style.display = 'block';
		if (wikEdButtonBarCustom2 != null) {
			wikEdButtonBarCustom2.style.display = 'block';
		}
		wikEdButtonBarControl.style.display = 'block';
	}

// turn classic textarea on
	else {
		if (notFrame != true) {
			wikEdFrameWrapper.style.position = 'absolute';
			wikEdFrameWrapper.style.visibility = 'hidden';
// Mozilla or wikEd bug: <br> insertion before text a while after setting display to 'none', test with setTimeout('alert(wikEdFrameBody.innerHTML)', 1000);
//			wikEdFrameBody.style.display = 'none';
		}
		wikEdTextareaWrapper.style.position = 'static';
		wikEdTextareaWrapper.style.visibility = 'visible';
		wikEdTextarea.style.display = 'block';

		if (document.getElementById('toolbar') != null) {
			wikEdToolbarWrapper.style.display = 'block';
		}
		wikEdButtonBarFormat.style.display = 'none';
		wikEdButtonBarTextify.style.display = 'none';
		if (wikEdButtonBarCustom1 != null) {
			wikEdButtonBarCustom1.style.display = 'none';
		}
		wikEdButtonBarFind.style.display = 'none';
		wikEdButtonBarFix.style.display = 'none';
		if (wikEdButtonBarCustom2 != null) {
			wikEdButtonBarCustom2.style.display = 'none';
		}
		wikEdButtonBarControl.style.display = 'block';
	}

	return;
}


//
// WikEdButton: toggle or set button checked state
//   used for buttons that do not require nor change the text. Faster than WikEdEditButton()
//

window.WikEdButton = function(buttonObj, buttonId, toggleButton, setButton, classButton, doButton) {

	if (buttonObj != null) {

// check if the button is disabled
		if (buttonObj.className == 'wikEdButtonInactive') {
			return;
		}

// set button to pressed, set cursor to hourglass
		buttonObj.style.cursor = 'wait';

// init the button
		if (setButton != null) {
			if (setButton == false) {
				buttonObj.setAttribute('checked', false);
				if (classButton == null) {
					buttonObj.className = 'wikEdButtonUnchecked';
				}
			}
			else {
				buttonObj.setAttribute('checked', true);
				if (classButton == null) {
					buttonObj.className = 'wikEdButtonChecked';
				}
			}
		}
		else if (classButton != null) {
			buttonObj.className = classButton;
		}

// toggle the button
		if (toggleButton != null) {
			if (toggleButton == true) {
				if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
					buttonObj.setAttribute('checked', false);
					buttonObj.className = 'wikEdButtonUnchecked';
				}
				else {
					buttonObj.setAttribute('checked', true);
					buttonObj.className = 'wikEdButtonChecked';
				}
			}
		}
	}

// perform specific actions
	var focusFrame = false;
	if ( ( (setButton == null) && (classButton == null) ) || (doButton == true) ) {

// remove active content
		WikEdRemoveElements(['script', 'object', 'applet', 'embed']);

		switch (buttonId) {

// switch between syntax highlighting and plain text
			case 'wikEdHighlightSyntax':
				if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
					wikEdHighlightSyntax = true;
					WikEdSetPersistent('wikEdSyntaxOff', '0', 0, '/');
				}
				else {
					wikEdHighlightSyntax = false;
					WikEdSetPersistent('wikEdSyntaxOff', '1', 0, '/');
				}

// do not keep whole text selected
				WikEdEditButton( null, 'wikEdUpdateAll', {'keepSel': false} );
				break;

// toggle table mode // {{TABLE}}
			case 'wikEdTableMode':
				if (WikEdGetAttribute(buttonObj, 'checked') != 'true') {
					wikEdTableMode = false;
					WikEdEditButton(null, 'wikEdUpdateAll');
				}
				else {
					wikEdTableMode = true;
					WikEdEditButton(null, 'wikEdTablify');
				}
				break;

// align textbox with display top
			case 'wikEdScrollToPreview':
			case 'wikEdScrollToPreview2':
			case 'wikEdScrollToPreview3':
				window.scroll(0, WikEdGetOffsetTop(wikEdSaveButton));
				focusFrame = true;
				break;

// align edit buttons with display top
			case 'wikEdScrollToEdit':
			case 'wikEdScrollToEdit2':
			case 'wikEdScrollToEdit3':
			case 'wikEdScrollToEdit4':
				window.scroll(0, WikEdGetOffsetTop(wikEdInputWrapper));
				focusFrame = true;
				break;

// cycle through different font sizes
			case 'wikEdTextZoomDown':
				wikEdTextZoom = wikEdTextZoom / 1.2;
				if (wikEdTextZoom < 100 / 1.2 / 1.2) {
					wikEdTextZoom = 100 * 1.2 * 1.2;
				}
				wikEdFrameBody.style.fontSize = parseInt(wikEdTextZoom) + '%';
				focusFrame = true;
				break;

// cycle through different font sizes
			case 'wikEdTextZoomUp':
				wikEdTextZoom = wikEdTextZoom * 1.2;
				if (wikEdTextZoom > 100 * 1.2 * 1.2) {
					wikEdTextZoom = 100 / 1.2 / 1.2;
				}
				wikEdFrameBody.style.fontSize = parseInt(wikEdTextZoom) + '%';
				focusFrame = true;
				break;

// display local preview box
			case 'wikEdLocalPreview':
				;if (wikEdFullScreenMode == true) {
					WikEdFullScreen(false);
				}
				if (wikEdUseWikEd == true) {
					WikEdUpdateTextarea();
				}

// clear box to display loading indicator, keep wrapper height to prevent scrolling
				var previewHeight = wikEdPreviewBox.offsetHeight;
				if ( (wikEdPreviewBox.innerHTML != '') && (previewHeight > 0) ) {
					wikEdPreviewBox.style.height = previewHeight + 'px';
				}
				wikEdPreviewBox.innerHTML = wikEdText['wikEdPreviewLoading'];
				wikEdLocalPrevWrapper.style.display = 'block';

// prepare ajax preview
				wikEdPreviewIsAjax = false;
				if (wikEdUseAjaxPreview == true) {

// prepare the data
					var boundary = '--(fR*3briuStOum6#v)--';
					var postData = wikEdTextarea.value;

// append references section for section edits
					var section = document.getElementsByName('wpSection');
					if (section != null) {
						if (section.length > 0) {
							if (/\d+/.test(section[0].value) == true) {
								if (/<ref[^>\/]*>.*?<\/ref[^>]*>/i.test(postData) == true) {
									if (/<references\b[^>]*>/i.test(postData) == false) {
										postData += '<div class="wikEdPreviewRefs"><references/></div>';
									}
								}
							}
						}
					}
					postData = '--' + boundary + '\nContent-Disposition: form-data; name="wpTextbox1"\n\n' + postData + '\n--' + boundary;

// make the ajax request
					var formAction;
					if (wikEdUpload == true) {
						formAction = wikEdWikiGlobals['wgServer'] + wikEdWikiGlobals['wgScript'] + '?title=wikEdUploadPreview&action=submit';
					}
					else {
						formAction = wikEdEditForm.action;
					}
					if (wikEdEditForm.wpEdittime != null) {
						formAction += '&wpEdittime=' + wikEdEditForm.wpEdittime.value;
					}
					if (wikEdEditForm.wpEditToken != null) {
						formAction += '&wpEditToken=' + encodeURIComponent(wikEdEditForm.wpEditToken.value);
					}
					WikEdAjaxRequest('POST', formAction + '&live', 'Content-Type', 'multipart/form-data; boundary=' + boundary, postData, 'text/html', function(ajax) {
						wikEdPreviewIsAjax = true;

// get response
						var html = ajax.responseText;

// html-ize
						html = html.replace(/&lt;/g, '<');
						html = html.replace(/&gt;/g, '>');
						html = html.replace(/&amp;/g, '&');
						html = html.replace(/&quot;/g, '"')
						html = html.replace(/&apos;/g, '\'');
						html = html.replace(/(<preview>)<h2>.*?<\/h2>(.|\n)*?<div class=\'previewnote\'>(.|\n)*?<\/div>/, '$1');

// clean form elements
						html = html.replace(/<\/?form\b[^>]*>/g, '');
						html = html.replace(/(<\/?input\b[^>]*?)\bname="search"([^>]*>)/g, '$1$2');

// remove cite errors for automatic section preview refs
						html = html.replace(/(<div\b[^>]*?\bclass=\"wikEdPreviewRefs\"[^>]*>(.|\s)*$)/,
							function (p, p1, p2) {
								p1 = p1.replace(/<strong\b[^>]*?\bclass=\"error\"[^>]*>(.|\s)*?<\/strong>/g, '');
								return(p1);
							}
						);
						wikEdPreviewBox.innerHTML = html;

// scroll to button, textarea, or preview field
						WikEdScrollToPreview();
						return;
					});
				}

// prepare a local preview (Pilaf's InstaView), will be overwritten by Ajax version
				if ( (wikEdUseLocalPreview == true) && (typeof(InstaView) == 'object') ) {
					InstaView.conf.user.name = wikEdWikiGlobals['wgUserName'];
					var instaView = InstaView.convert(wikEdTextarea.value);
					if (wikEdPreviewIsAjax != true) {
						wikEdPreviewBox.innerHTML = instaView;
					}
				}
				focusFrame = true;
				break;

// display local diff box
			case 'wikEdLocalDiff':
				if (typeof(WDiffString) != 'function') {
					break;
				}
				if (wikEdFullScreenMode == true) {
					WikEdFullScreen(false);
				}
				if (wikEdUseWikEd == true) {
					WikEdUpdateTextarea();
				}

// call external diff program
				var diffText = WDiffString(wikEdOrigVersion, wikEdTextarea.value);
				if (wikEdFullDiff != true) {
					diffText = WDiffShortenOutput(diffText);
				}

// display diff, keep wrapper height to prevent scrolling
				var previewHeight = wikEdPreviewBox.offsetHeight;
				if ( (wikEdPreviewBox.innerHTML != '') && (previewHeight > 0) ) {
					wikEdPreviewBox.style.height = previewHeight + 'px';
				}
				wikEdPreviewBox.innerHTML = diffText;
				wikEdLocalPrevWrapper.style.display = 'block';

// scroll to button, textarea, or preview field
				WikEdScrollToPreview();

				break;

// toggle wikEdDiff
			case 'wikEdDiff':

// turn wikEdDiff off
				if (WikEdGetAttribute(buttonObj, 'checked') != 'true') {
					wikEdDiff = false;
					WikEdSetPersistent('wikEdDiff', '0', 0, '/');
					if (typeof(wikEdDiffDiv) == 'object') {
						if (wikEdDiffDiv != null) {
							wikEdDiffDiv.style.display = 'none';
						}
					}
					window.scroll(0, WikEdGetOffsetTop(wikEdInputWrapper));
				}

// turn wikEdDiff on
				else {
					wikEdDiff = true;
					WikEdSetPersistent('wikEdDiff', '1', 0, '/');
					if (typeof(wikEdDiffDiv) == 'object') {
						if (wikEdDiffDiv != null) {
							wikEdDiffDiv.style.display = 'block';
							window.scroll(0, WikEdGetOffsetTop(wikEdDiffDiv));
							WikEdDiff();
						}
					}
				}
				focusFrame = true;
				break;

// close the preview / diff box
			case 'wikEdClose':
			case 'wikEdClose2':
				window.scroll(0, WikEdGetOffsetTop(wikEdInputWrapper));
				wikEdLocalPrevWrapper.style.display = 'none';
				wikEdPreviewBox.style.height = 'auto';
				focusFrame = true;
				break;

// switch between textarea and frame display
//   switching an iframe in design mode immediately after initialization between absolute/static may crash mozilla
			case 'wikEdUseWikEd':

// enble wikEd
				if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
					WikEdUpdateFrame();

// turn rich text frame on
					WikEdSetEditArea(true);
					wikEdUseWikEd = true;
					WikEdSetPersistent('wikEdUseClassic', '0', 0, '/');

// run scheduled custom functions
					WikEdExecuteHook(wikEdFrameHook);
				}

// turn classic textarea on, disable wikEd
				else {
					WikEdUpdateTextarea();
					WikEdSetEditArea(false);
					wikEdUseWikEd = false;
					WikEdSetPersistent('wikEdUseClassic', '1', 0, '/');

// run scheduled custom functions
					WikEdExecuteHook(wikEdTextareaHook);
				}
				break;

// add "using wikEd" to summaries
			case 'wikEdUsing':
				if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
					wikEdUsing = true;
					WikEdSetPersistent('wikEdSummaryUsing', '1', 0, '/');
				}
				else {
					wikEdUsing = false;
					WikEdSetPersistent('wikEdSummaryUsing', '0', 0, '/');
				}
				break;

// hide ref tags
			case 'wikEdRefHide':
				if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
					wikEdRefHide = true;
					WikEdSetPersistent('wikEdRefHide', '1', 0, '/');
				}
				else {
					wikEdRefHide = false;
					WikEdSetPersistent('wikEdRefHide', '0', 0, '/');
				}
				if (wikEdUseWikEd == true) {
					WikEdEditButton( null, 'wikEdWikify', {'whole': true} );
				}
				break;

// close the toolbar
			case 'wikEdCloseToolbar':
				if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
					wikEdCloseToolbar = true;
					if (document.getElementById('toolbar') != null) {
						wikEdToolbarWrapper.style.display = 'none';
					}
					WikEdSetPersistent('wikEdCloseToolbar', '1', 0, '/');
				}
				else {
					wikEdCloseToolbar = false;
					if (document.getElementById('toolbar') != null) {
						wikEdToolbarWrapper.style.display = 'block';
					}
					WikEdSetPersistent('wikEdCloseToolbar', '0', 0, '/');
				}
				if (wikEdFullScreenMode == true) {
					WikEdFullScreen(wikEdFullScreenMode);
				}
				break;

// just toggle the case sensitive search button
			case 'wikEdCaseSensitive':
				break;

// just toggle the regexp search button
			case 'wikEdRegExp':
				break;

// just toggle the find-ahead-as-you-type search button
			case 'wikEdFindAhead':
				break;

// switch to fullscreen edit area
			case 'wikEdFullScreen':
				if (wikEdRearrange == true) {
					if (WikEdGetAttribute(buttonObj, 'checked') == 'true') {
						WikEdFullScreen(true);
						WikEdSetPersistent('wikEdFullscreen', '1', 0, '/');
					}
					else {
						WikEdFullScreen(false);
						WikEdSetPersistent('wikEdFullscreen', '0', 0, '/');
					}
				}
				break;

// clear the saved settings for find, replace, and summary history
			case 'wikEdClearHistory':
				WikEdClearHistory('find');
				WikEdClearHistory('replace');
				WikEdClearHistory('summary');
				focusFrame = true;
				break;

// for testing
			case 'wikEdPlaceholder':
				break;
		}
	}

// reset the frame DOM cache because the frame content might have changed
	wikEdFrameDOMCache = null;

// reset cursor to normal
	if (buttonObj != null) {
		buttonObj.style.cursor = 'pointer';
	}

// focus the frame
	if ( (wikEdUseWikEd == true) && (focusFrame == true) ) {
		wikEdFrameWindow.focus();
	}

	return;
}


//
// WikEdEditButton: editing functions
//   used for buttons that require or change the text, more time consuming than WikEdButton()
//

window.WikEdEditButton = function(buttonObj, buttonId, parameters, CustomHandler) {

// check if button is disabled
	if (buttonObj != null) {
		if (buttonObj.className == 'wikEdButtonInactive') {
			return;
		}
	}

// remove active and non-text content
	WikEdRemoveElements(['script', 'object', 'applet', 'embed', 'textarea']);

// select the appropriate text change targets (whole, selection, cursor, focusWord, focusLine, selectionWord, or selectionLine)
	var obj = {};
	obj.changed = {};

	switch (buttonId) {

// undo, redo: whole
		case 'wikEdUndo':
		case 'wikEdRedo':
		case 'wikEdUndoAll':
		case 'wikEdRedoAll':
			WikEdGetText(obj, 'whole');
			obj.changed = obj.whole;
			break;

// basic wiki character formatting: selection / focusWord / cursor
		case 'wikEdBold':
		case 'wikEdItalic':
		case 'wikEdUnderline':
		case 'wikEdStrikethrough':
		case 'wikEdNowiki':
		case 'wikEdSuperscript':
		case 'wikEdSubscript':
		case 'wikEdWikiLink':
		case 'wikEdWebLink':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'focusWord');
				if (obj.focusWord.plain != '') {
					obj.changed = obj.focusWord;
				}
				else  {
					obj.changed = obj.cursor;
				}
			}
			break;

// reference: selection / cursor
		case 'wikEdRef':
		case 'wikEdRefNamed':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				obj.changed = obj.cursor;
			}
			break;

// references and small references: selection / cursor
		case 'wikEdReferences':
		case 'wikEdReferencesSection':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				obj.changed = obj.cursor;
			}
			break;

// character formatting: selection / focusWord / cursor
		case 'wikEdCase':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'focusWord');
				if (obj.focusWord.plain != '') {
					obj.changed = obj.focusWord;
				}
				else {
					obj.changed = obj.cursor;
				}
			}
			break;

// multiple line changes: selectionLine / focusLine / cursor
		case 'wikEdDecreaseHeading':
		case 'wikEdIncreaseHeading':
		case 'wikEdIncreaseBulletList':
		case 'wikEdDecreaseBulletList':
		case 'wikEdIncreaseNumberList':
		case 'wikEdDecreaseNumberList':
		case 'wikEdIncreaseIndentList':
		case 'wikEdDecreaseIndentList':
		case 'wikEdDefinitionList':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				WikEdGetText(obj, 'selectionLine');
				obj.changed = obj.selectionLine;
			}
			else {
				WikEdGetText(obj, 'focusLine');
				if (obj.focusLine.plain != '') {
					obj.changed = obj.focusLine;
				}
				else {
					obj.changed = obj.cursor;
				}
			}
			break;

// sort: selectionLine / focusLine
		case 'wikEdSort':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				WikEdGetText(obj, 'selectionLine');
				obj.changed = obj.selectionLine;
			}
			else {
				WikEdGetText(obj, 'focusPara');
				if (obj.focusPara.plain != '') {
					obj.changed = obj.focusPara;
				}
			}
			break;

// image: selectionWord (if text is selected) / cursor
		case 'wikEdImage':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				WikEdGetText(obj, 'selectionWord');
				obj.changed = obj.selectionWord;
			}
			else  {
				obj.changed = obj.cursor;
			}
			break;

// table: selectionLine / cursor
		case 'wikEdTable':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				WikEdGetText(obj, 'selectionLine');
				obj.changed = obj.selectionLine;
			}
			else  {
				WikEdGetText(obj, 'focusLine');
				obj.changed = obj.cursor;
			}
			break;

// wikify: selection / whole
		case 'wikEdWikify':
			if (parameters == 'whole') {
				WikEdGetText(obj, 'whole');
				obj.changed = obj.whole;
			}
			else {
				WikEdGetText(obj, 'selection');
				if (obj.selection.plain != '') {
					obj.changed = obj.selection;
				}
				else {
					WikEdGetText(obj, 'whole');
					obj.changed = obj.whole;
				}
			}
			break;

// textify: selection / whole, without wikifying
		case 'wikEdTextify':
			WikEdGetText(obj, 'selection', false);
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'whole', false);
				obj.changed = obj.whole;
			}
			break;

// redirect: whole
		case 'wikEdRedirect':
			WikEdGetText(obj, 'whole, selection, cursor');
			if (obj.selection.plain == '') {
				WikEdGetText(obj, 'selectionWord');
			}
			obj.changed = obj.whole;
			break;

// find and replace: selection / focusWord / cursor
		case 'wikEdFindPrev':
		case 'wikEdFindNext':
		case 'wikEdJumpPrev':
		case 'wikEdJumpNext':
		case 'wikEdReplacePrev':
		case 'wikEdReplaceNext':
		case 'wikEdFindAll':
			WikEdGetText(obj, 'selection');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'focusWord');
				if (obj.focusWord.plain != '') {
					obj.changed = obj.focusWord;
				}
				else {
					obj.changed = obj.cursor;
				}
			}
			break;

// replace all: selection / whole
		case 'wikEdReplaceAll':
			WikEdGetText(obj, 'selection');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'whole');
				obj.changed = obj.whole;
			}
			break;

// fixing buttons: selection / whole
		case 'wikEdFixBasic':
		case 'wikEdFixUnicode':
		case 'wikEdFixAll':
		case 'wikEdFixHtml':
		case 'wikEdFixRegExTypo':
		case 'wikEdFixRedirect':
		case 'wikEdFixRedirectReplace':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'whole');
				obj.changed = obj.whole
			}
			break;

// fixing buttons: selection / focusPara / cursor
		case 'wikEdFixPunct':
		case 'wikEdFixMath':
		case 'wikEdFixUnits':
		case 'wikEdFixDashes':
		case 'wikEdFixCaps':
		case 'wikEdFixChem':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'focusPara');
				if (obj.focusPara.plain != '') {
					obj.changed = obj.focusPara;
				}
				else {
					obj.changed = obj.cursor;
				}
			}
			break;

// fixing buttons: selection / focusLine / cursor
		case 'wikEdFixChem':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'focusLine');
				if (obj.focusPara.plain != '') {
					obj.changed = obj.focusLine;
				}
				else {
					obj.changed = obj.cursor;
				}
			}
			break;

// source: selection / whole
		case 'wikEdSource':
			WikEdGetText(obj, 'selection');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'whole');
				obj.changed = obj.whole;
			}
			break;

// insert tags: selection / focusWord / cursor
		case 'wikEdInsertTags':
			WikEdGetText(obj, 'selection, cursor');
			if (obj.selection.plain != '') {
				obj.changed = obj.selection;
			}
			else {
				WikEdGetText(obj, 'focusWord');
				if (obj.focusWord.plain != '') {
					obj.changed = obj.focusWord;
				}
				else {
					obj.changed = obj.selection;
				}
			}
			break;

// convert wiki tables to html
		case 'wikEdTablify':
			WikEdGetText(obj, 'whole');
			obj.changed = obj.whole;
			break;

// update text view using current control button settings
		case 'wikEdUpdateAll':
			WikEdGetText(obj, 'whole');
			obj.changed = obj.whole;
			break;

// custom edit functions have to call WikEdGetText() themselves
		default:
			WikEdGetText(obj, 'cursor');
			obj.changed = obj.cursor;
			break;
	}

// exit
	if (obj.changed == null) {
		wikEdFrameWindow.focus();

// reset button to active, reset cursor
		if (buttonObj != null) {
			if (buttonObj.className != 'wikEdButtonInactive') {
				buttonObj.className = 'wikEdButton';
			}
		}
		return;
	}

// set local syntax highlighting flag
	var highlightSyntax = wikEdHighlightSyntax;

// manipulate the text
	var selectChanged = true;
	var selectChangedText = '';
	switch (buttonId) {

// undo
		case 'wikEdUndo':
			if (wikEdLastVersion == null) {
				wikEdLastVersion = obj.changed.plain;
			}
			WikEdFrameExecCommand('undo');
			if (obj.sel.rangeCount == 0) {
				obj.sel.collapse(wikEdFrameBody, 0);
			}
			obj.changed.range = obj.sel.getRangeAt(obj.sel.rangeCount - 1);
			obj.changed.plain = null;
			obj.changed.keepSel = true;
			break;

// redo
		case 'wikEdRedo':
			WikEdFrameExecCommand('redo');
			if (obj.sel.rangeCount == 0) {
				obj.sel.collapse(wikEdFrameBody, 0);
			}
			obj.changed.range = obj.sel.getRangeAt(obj.sel.rangeCount - 1);
			obj.changed.plain = null;
			obj.changed.keepSel = true;
			break;

// bold
		case 'wikEdBold':
			if ( /\'\'\'([^\'].*?)\'\'\'/.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/\'\'\'([^\'].*?)\'\'\'/g, '$1');
			}
			else {
				obj.changed.plain = '\'\'\'' + obj.changed.plain + '\'\'\'';
				obj.changed.plain = obj.changed.plain.replace(/(\'\'\')( *)(.*?)( *)(\'\'\')/, '$2$1$3$5$4');
			}
			obj.changed.plain = obj.changed.plain.replace(/\'{6,}/g, '\'\'\'\'\'');
			obj.changed.keepSel = true;
			break;

// italic
		case 'wikEdItalic':
			if ( /(\'{3,})\'\'([^\'].*?)\'\'(\'{3,})/.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/(\'{3,})\'\'([^\'].*?)\'\'(\'{3,})/g, '$1$2$3');
			}
			else if ( /(^|[^\'])\'\'([^\'].*?)\'\'([^\']|$)/.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/(^|[^\'])\'\'([^\'].*?)\'\'([^\']|$)/g, '$1$2$3');
			}
			else {
				obj.changed.plain = '\'\'' + obj.changed.plain + '\'\'';
				obj.changed.plain = obj.changed.plain.replace(/(\'\')( *)(.*?)( *)(\'\')/, '$2$1$3$5$4');
			}
			obj.changed.plain = obj.changed.plain.replace(/\'{6,}/g, '\'\'\'\'\'');
			obj.changed.keepSel = true;
			break;

// underline
		case 'wikEdUnderline':
			if ( /&lt;u&gt;(.*?)&lt;\/u&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/gi, '$1');
			}
			else {
				obj.changed.plain = '&lt;u&gt;' + obj.changed.plain + '&lt;\/u&gt;';
				obj.changed.plain = obj.changed.plain.replace(/(&lt;u&gt;)( *)(.*?)( *)(&lt;\/u&gt;)/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// strikethrough
		case 'wikEdStrikethrough':
			if ( /&lt;s&gt;(.*?)&lt;\/s&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/&lt;s&gt;(.*?)&lt;\/s&gt;/gi, '$1');
			}
			else {
				obj.changed.plain = '&lt;s&gt;' + obj.changed.plain + '&lt;\/s&gt;';
				obj.changed.plain = obj.changed.plain.replace(/(&lt;s&gt;)( *)(.*?)( *)(&lt;\/s&gt;)/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// nowiki
		case 'wikEdNowiki':
			if ( /&lt;nowiki&gt;(.*?)&lt;\/nowiki&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/&lt;nowiki&gt;(.*?)&lt;\/nowiki&gt;/gi, '$1');
			}
			else {
				obj.changed.plain = '&lt;nowiki&gt;' + obj.changed.plain + '&lt;\/nowiki&gt;';
				obj.changed.plain = obj.changed.plain.replace(/(&lt;nowiki&gt;)( *)(.*?)( *)(&lt;\/nowiki&gt;)/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// superscript
		case 'wikEdSuperscript':
			obj.changed.plain = obj.changed.plain.replace(/^(\s*)&lt;sub&gt;(.*?)&lt;\/sub&gt;(\s*)$/, '$1$2$3');
			if ( /&lt;sup&gt;(.*?)&lt;\/sup&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/&lt;sup&gt;(.*?)&lt;\/sup&gt;/gi, '$1');
			}
			else {
				obj.changed.plain = '&lt;sup&gt;' + obj.changed.plain + '&lt;/sup&gt;';
				obj.changed.plain = obj.changed.plain.replace(/(&lt;sup&gt;)( *)(.*?)( *)(&lt;\/sup&gt;)/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// subscript
		case 'wikEdSubscript':
			obj.changed.plain = obj.changed.plain.replace(/^(\s*)&lt;sup&gt;(.*?)&lt;\/sup&gt;(\s*)$/, '$1$2$3');
			if ( /&lt;sub&gt;(.*?)&lt;\/sub&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/&lt;sub&gt;(.*?)&lt;\/sub&gt;/gi, '$1');
			}
			else {
				obj.changed.plain = '&lt;sub&gt;' + obj.changed.plain + '&lt;/sub&gt;';
				obj.changed.plain = obj.changed.plain.replace(/(&lt;sub&gt;)( *)(.*?)( *)(&lt;\/sub&gt;)/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// in-text reference
		case 'wikEdRef':
		case 'wikEdRefNamed':
			if (obj.changed.plain == '') {
				if (buttonId == 'wikEdRef') {
					obj.changed.plain = '&lt;ref /&gt;';
				}
				else {
					obj.changed.plain = '&lt;ref name=\"\"/&gt;';
				}
			}
			else if ( /&lt;ref( name=\"\")? ?\/&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = '';
			}
			else if ( /&lt;ref( name=\"\")?&gt;(.*?)&lt;\/ref&gt;/i.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/&lt;ref( name=\"\")?&gt;(.*?)&lt;\/ref&gt;/gi, '$2');
			}
			else {
				if (buttonId == 'wikEdRef') {
					obj.changed.plain = '&lt;ref&gt;' + obj.changed.plain + '&lt;/ref&gt;';
				}
				else {
					obj.changed.plain = '&lt;ref name=\"\"&gt;' + obj.changed.plain + '&lt;/ref&gt;';
				}
				obj.changed.plain = obj.changed.plain.replace(/(&lt;ref( name=\"\")?&gt;)( *)(.*?)( *)(&lt;\/ref&gt;)/, '$3$1$4$6$5');
			}
			obj.changed.keepSel = true;
			break;

// references location
		case 'wikEdReferences':
		case 'wikEdReferencesSection':
			var ref = wikEdText['wikEdReferencesSection'];
			ref = ref.replace(/</g, '&lt;');
			ref = ref.replace(/>/g, '&gt;');
			var refEscaped = ref;
			refEscaped = refEscaped.replace(/([^\w\s\;\&])/g, '\\$1');
			refEscaped = refEscaped.replace(/^\n|\n$/g, '\\n*');
			refEscaped = refEscaped.replace(/(\n)/g, '\\n');
			var	regExp = new RegExp(refEscaped, 'gi');

// plain references tag
			if (buttonId == 'wikEdReferences') {
				if (obj.changed.plain == '') {
					obj.changed.plain = '&lt;references/&gt;';
				}
				else if (regExp.test(obj.changed.plain) == true) {
					obj.changed.plain = obj.changed.plain.replace(regExp, '');
				}
				else if ( /&lt;references ?\/&gt;/i.test(obj.changed.plain) ) {
					obj.changed.plain = obj.changed.plain.replace(/&lt;references ?\/&gt;/gi, '');
				}
				else {
					obj.changed = obj.cursor;
					obj.changed.plain = '&lt;references/&gt;';
				}
			}

// complete references code
			else {
				if (obj.changed.plain == '') {
					obj.changed.plain = ref;
				}
				else if (regExp.test(obj.changed.plain) == true) {
					obj.changed.plain = obj.changed.plain.replace(regExp, '');
				}
				else if ( /&lt;references ?\/&gt;/i.test(obj.changed.plain) ) {
					obj.changed.plain = obj.changed.plain.replace(/&lt;references ?\/&gt;/gi, '');
				}
				else {
					obj.changed = obj.cursor;
					obj.changed.plain = ref;
				}
			}
			obj.changed.keepSel = true;
			break;

// toggle lowercase / uppercase
		case 'wikEdCase':

// lowercase all uppercased text
			if (obj.changed.plain == '') {
				obj.changed.plain = null;
			}
			else {

// html character entities to chars
				var plain = obj.changed.plain;
				plain = plain.replace(/&gt;/g, '>');
				plain = plain.replace(/&lt;/g, '<');
				plain = plain.replace(/&amp;/g, '&');

				if (plain.toUpperCase() == plain) {
					plain = plain.toLowerCase();
				}

// first-letter-uppercase all lowercased text
				else if (plain.toLowerCase() == plain) {
					plain = plain.replace(/\b([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9])([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\']*)/g,
						function (p, p1, p2) {
							return(p1.toUpperCase() + p2.toLowerCase());
						}
					);
				}

// uppercase mixed upper and lowercased text
				else {
					plain = plain.toUpperCase();
				}

// chars back to html character entities
				plain = plain.replace(/&/g, '&amp;');
				plain = plain.replace(/</g, '&lt;');
				plain = plain.replace(/>/g, '&gt;');
				obj.changed.plain = plain;
			}
			obj.changed.keepSel = true;
			break;

// sort alphabetically by visible words, case insensitive, and numerically
		case 'wikEdSort':

// fix unicode and character entities
			WikEdFixUnicode(obj.changed);

// keep leading and trailing empty lines and table syntax
			var pre = '';
			var main = '';
			var post = '';
			var regExpMatch = /^(((\{\|.*|!.*|\|\+.*|\|\-.*|)\n)*)((.|\n)*?)(((\|\}.*|\|\-.*|)\n)*)$/.exec(obj.changed.plain);
			if (regExpMatch != null) {
				pre = regExpMatch[1];
				main = regExpMatch[4];
				post = regExpMatch[6];
			}
			else {
				main = obj.changed.plain;
			}

// join cells in table rows
			main = main.replace(/(^|\n)(\|[^\-\+\}](.|\n)*?(?=(\|\-|\{\||\|\}|$)|$))/g,
				function(p, p1, p2) {
					p2 = p2.replace(/\n/g, '\x00');
					return(p1 + p2);
				}
			);

// cycle through lines
			var lines = main.split('\n');
			var sortArray = [];
			for (var i = 0; i < lines.length; i ++) {
				var line = lines[i];
				var sortKey = line;

// remove empty lines
				if (line == '') {
					continue;
				}

// remove html
				sortKey = sortKey.replace(/&lt;.*&gt;/g, '');

// keep visible text of wikilinks only
				sortKey = sortKey.replace(/\[\[[^\|\[\]\n]*\|([^\[\]]*)\]\]/g, '$1');

// keep visible text of external links only
				sortKey = sortKey.replace(/\[[^ ]+ +([^\[\]\n]*)\]/g, '$1');

// keep visible cell content only
				sortKey = sortKey.replace(/^\|[^\+\-\}\[\]][^\[\]\{\}\x00]*\| */, '');

// keep single ' only
				sortKey = sortKey.replace(/\'{2,}/g, '');

// remove decimal commas
				sortKey = sortKey.replace(/(\d)\,(?=\d\d\d(\D|$))/g, '$1');

// sort numerically by adding preceeding 0s to numbers
				sortKey = sortKey.replace(/0*(\d+)(\.\d*)?/g, '000000000000000'.substr('$1'.length) + '$1$2');

// non-breaking spaces
				sortKey = sortKey.replace(/&nbsp;|\xa0/g, ' ');

// join multiple spaces
				sortKey = sortKey.replace(/ +/g, ' ');

// remove non-chars but not spaces
				sortKey = sortKey.replace(/[^\.\,\:\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\s\']/, '');

// remove leading and trailing spaces
				sortKey = sortKey.replace(/^ +| +$/g, '');

				sortArray.push( [line, sortKey] );
			}

// sort lines
			sortArray = sortArray.sort(
				function(a, b) {
					if (a[1].toLowerCase() <= b[1].toLowerCase()) {
						return(-1);
					}
					else {
						return(1);
					}
				}
			);

// join lines
			var joined = '';
			for (var i = 0; i < sortArray.length; i ++) {
				joined += sortArray[i][0];
				if (i < sortArray.length - 1) {
					joined += '\n';
				}
			}
			joined = joined.replace(/\x00/g, '\n');
			obj.changed.plain = pre + joined + post;

			obj.changed.keepSel = true;
			break;

// undo all
		case 'wikEdUndoAll':
			if (wikEdLastVersion == null) {
				wikEdLastVersion = obj.changed.plain;
			}
			obj.changed.plain = wikEdOrigVersion;
			obj.changed.plain = obj.changed.plain.replace(/&/g, '&amp;');
			obj.changed.plain = obj.changed.plain.replace(/>/g, '&gt;');
			obj.changed.plain = obj.changed.plain.replace(/</g, '&lt;');
			break;

// redo all
		case 'wikEdRedoAll':
			if (wikEdLastVersion != null) {
				obj.changed.plain = wikEdLastVersion;
			}
			break;

// create wikilink
		case 'wikEdWikiLink':
			if ( /\[\[(.*?)\]\]/.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/\[\[(.*?)\]\]/g, '$1');
			}
			else {
				obj.changed.plain = '\[\[' + obj.changed.plain + '\]\]';
				obj.changed.plain = obj.changed.plain.replace(/(\[\[)( *)(.*?)( *)(\]\])/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// create weblink
		case 'wikEdWebLink':
			if ( /\[(.*?)\]/.test(obj.changed.plain) ) {
				obj.changed.plain = obj.changed.plain.replace(/\[(.*?)\]/g, '$1');
			}
			else {
				obj.changed.plain = '\[' + obj.changed.plain + '\]';
				obj.changed.plain = obj.changed.plain.replace(/(\[)( *)(.*?)( *)(\])/, '$2$1$3$5$4');
			}
			obj.changed.keepSel = true;
			break;

// decrease heading level
		case 'wikEdDecreaseHeading':

// decrease heading
			obj.changed.plain = obj.changed.plain.replace(/(^|\n)=(=+) *([^\n]*?) *=+(?=\n|$)/g, '$1$2 $3 $2');

// remove heading
			obj.changed.plain = obj.changed.plain.replace(/(^|\n)=(?!=) *([^\n]*?) *=+(?=\n|$)/g, '$1$2');

// adjust closing tags
			obj.changed.plain = obj.changed.plain.replace(/(^|\n)(=+) *([^\n]*?) *=+(?=\n|$)/g, '$1$2 $3 $2');
			obj.changed.keepSel = true;
			break;

// increase heading level
		case 'wikEdIncreaseHeading':

// increase heading
			obj.changed.plain = obj.changed.plain.replace(/(^|\n)(=+) *([^\n]*?) *=+(?=\n|$)/g, '$1=$2 $3 $2=');

// create new heading
			if (/\n/.test(obj.changed.plain) == false) {
				obj.changed.plain = obj.changed.plain.replace(/(^|\n)([^=\n\s][^\n]*?)(?=\n|$)/g, '$1== $2 ==');
			}

// adjust closing tags
			obj.changed.plain = obj.changed.plain.replace(/(^|\n)(=+) *([^\n]*?) *=+(?=\n|$)/g, '$1$2 $3 $2');
			obj.changed.keepSel = true;
			break;

// increase bullet list
		case 'wikEdIncreaseBulletList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^ *([\*\#\:\;]*) *()/g, '*$1 ');
					return(p1);
				}
			);
			obj.changed.keepSel = true;
			break;

// decrease bullet list
		case 'wikEdDecreaseBulletList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^[\*\#\:\;] *()/g, '');
					return(p1);
				}
			);
			obj.changed.keepSel = true;
			break;

// increase numbered list
		case 'wikEdIncreaseNumberList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^ *([\*\#\:\;]*) *()/g, '#$1 ');
					return(p1);
				}
			);
			obj.changed.keepSel = true;
			break;

// decrease numbered list
		case 'wikEdDecreaseNumberList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^[\*\#\:\;] *()/g, '');
					return(p1);
				}
			);
			obj.changed.keepSel = true;
			break;

// increase indented list
		case 'wikEdIncreaseIndentList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^ *([\*\#\:\;]*) *()/g, ':$1 ');
					return(p1);
				}
			);
			obj.changed.keepSel = true;
			break;

// decrease indented list
		case 'wikEdDecreaseIndentList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^[\*\#\:\;] *()/g, '');
					return(p1);
				}
			);
			obj.changed.keepSel = true;
			break;

// create definition list
		case 'wikEdDefinitionList':
			obj.changed.plain = obj.changed.plain.replace(/([^\n]+)/g,
				function (p, p1) {
					p1 = p1.replace(/^ *([^\s\;]+) *()/g, '; $1 : ');
					return(p1);
				}
			);
			break;

// create image
		case 'wikEdImage':
			if (obj.changed.plain != '') {
				obj.changed.plain = '[[Image:<span class="wikEdInsertHere">' + wikEdText['image filename'] + '</span>|thumb|<span class="wikEdInsertHere">' + wikEdText['image width'] + '</span>px|' + obj.changed.plain + ']]';
			}
			else {
				obj.changed.plain = '[[Image:<span class="wikEdInsertHere">' + wikEdText['image filename'] + '</span>|thumb|<span class="wikEdInsertHere">' + wikEdText['image width'] + '</span>px|<span class="wikEdInsertHere"> </span>]]';
				if (obj.focusWord != null) {
					if (obj.focusWord.plain != '') {
						obj.changed.plain = ' ' + obj.changed.plain + ' ';
					}
				}
			}
			break;

// create table
		case 'wikEdTable':
			if (obj.changed.plain != '') {
				obj.changed.plain = obj.changed.plain.replace(/(^|\n) *()/g, '\n|-\n| ');
				obj.changed.plain = obj.changed.plain.replace(/^\n\|\-\n/, '\n{| class="wikitable" border="1"\n');
				obj.changed.plain = obj.changed.plain.replace(/$/g, '\n|}\n');
			}
			else if (wikEdTableMode == true) {
				obj.changed.plain = '\n<table class="wikitable" border="1"><caption><span class="wikEdInsertHere">' + wikEdText['table caption'] + '</span></caption><tr><th><span class="wikEdinserthere">' + wikEdText['table heading'] + '</span></th><th><span class="wikEdinserthere">' + wikEdText['table heading'] + '</span></th></tr><tr><td><span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span></td><td><span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span></td></tr><tr><td><span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span></td><td><span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span></td></tr></table>\n';
				if (obj.focusLine.plain != '') {
					obj.changed.plain = '\n' + obj.changed.plain + '\n';
				}
			}
			else {
				obj.changed.plain = '\n{| class="wikitable" border="1"\n|+ <span class="wikEdInsertHere">' + wikEdText['table caption'] + '</span>\n! <span class="wikEdinserthere">' + wikEdText['table heading'] + '</span> !! <span class="wikEdInsertHere">' + wikEdText['table heading'] + '</span>\n|-\n| <span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span> || <span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span>\n|-\n| <span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span> || <span class="wikEdInsertHere">' + wikEdText['table cell'] + '</span>\n|}\n';
				if (obj.focusLine.plain != '') {
					obj.changed.plain = '\n' + obj.changed.plain + '\n';
				}
			}
			break;

// wikify: always done above
		case 'wikEdWikify':
			break;

// textify: strip html from pasted content
		case 'wikEdTextify':
			WikEdTextify(obj.changed);
			break;

// redirect
		case 'wikEdRedirect':
			var linkTarget;
			if (obj.selection.plain != '') {
				linkTarget = obj.selection.plain;
			}
			else if (obj.selectionWord.plain != '') {
				linkTarget = obj.selectionWord.plain;
			}
			else {
				linkTarget = '<span class="wikEdInsertHere">' + wikEdText['redirect article link'] + '</span>';
			}

// remove link text after |
			linkTarget = linkTarget.replace(/\|.*()/, '');

// remove formatting and spaces
			linkTarget = linkTarget.replace(/^(=+|\'+|<[^>]*>|\s+|\[)+(.*?)(=+|\'+|<[^>]*>|\s+|\])+$/g, '$2');
			linkTarget = linkTarget.replace(/\s+/g, ' ');
			linkTarget = linkTarget.replace(/^\s+|\s+$/g, '');

			obj.changed.plain = '#REDIRECT [[' + linkTarget + ']]';

// append to summary
			if (wikEdInputElement['summary'] != null) {
				if ( (obj.selection.plain != '') || (obj.selectionWord.plain != '') ) {
					wikEdInputElement['summary'].value = wikEdInputElement['summary'].value.replace(/#REDIRECT( \[\[[^\]]*\]\])?(, *)?/g, '');
					wikEdInputElement['summary'].value = WikEdAppendToSummary(wikEdInputElement['summary'].value, '#REDIRECT [[' + linkTarget + ']]');
				}
				else {
					wikEdInputElement['summary'].value = WikEdAppendToSummary(wikEdInputElement['summary'].value, '#REDIRECT');
				}
			}
			selectChanged = false;
			break;

// find and replace
		case 'wikEdFindPrev':
		case 'wikEdFindNext':
		case 'wikEdJumpPrev':
		case 'wikEdJumpNext':
		case 'wikEdReplacePrev':
		case 'wikEdReplaceNext':
		case 'wikEdFindAll':
		case 'wikEdReplaceAll':

// get the find text
			var findText;

// unescape <, >, and &
			obj.changed.plain = obj.changed.plain.replace(/&lt;/g, '<');
			obj.changed.plain = obj.changed.plain.replace(/&gt;/g, '>');
			obj.changed.plain = obj.changed.plain.replace(/&amp;/g, '&');

// copy selection/word under cursor to find field
			if ( (parameters == 'shift') && ( (buttonId == 'wikEdFindNext') || (buttonId == 'wikEdReplaceNext') ) ) {
				if (/\n/.test(obj.changed.plain) == false) {
					if (buttonId == 'wikEdFindNext') {
						wikEdInputElement['find'].value = obj.changed.plain;
					}
					else {
						wikEdInputElement['replace'].value = obj.changed.plain;
					}
					obj.changed.keepSel = true;
					obj.changed.plain = null;
					break;
				}
			}

// get the find text from the find field
			if ( (buttonId == 'wikEdJumpPrev') || (buttonId == 'wikEdJumpNext') ) {
				findText = obj.changed.plain;
				if (obj.selection.plain == '') {
					obj.changed.keepSel = true;
					obj.changed.plain = null;
					break;
				}
			}

// get the find text from the find field
			else {
				if (wikEdInputElement['find'].value != '') {
					findText = wikEdInputElement['find'].value;
				}
				else {
					obj.changed.plain = null;
					break;
				}
			}

// get button status
			var regExpChecked = WikEdGetAttribute(wikEdRegExp, 'checked');
			var caseSensitiveChecked = WikEdGetAttribute(wikEdCaseSensitive, 'checked');

// handle newlines and special blanks for built-in search
			if (regExpChecked == 'false') {
				findText = findText.replace(/\n/g, '');
				findText = findText.replace(/\s/g, ' ');
			}

// get the replace text
			var replaceText = wikEdInputElement['replace'].value;
			var regExpFind;

// set regexp flags
			var regExpFlags = 'g';
			if (caseSensitiveChecked == 'false') {
				regExpFlags += 'i';
			}

// format the find and replace texts for a plain text search
			if ( (regExpChecked == 'false') || (buttonId == 'wikEdJumpPrev') || (buttonId == 'wikEdJumpNext') ) {
				regExpFind = new RegExp(findText.replace(/([\\^\$\*\+\?\.\(\)\[\]\{\}\:\=\!\|\,\-])/g, '\\$1'), regExpFlags);
			}

// format the find and replace texts for a regular expression search
			else {
				try {
					regExpFind = new RegExp(findText, regExpFlags);
				}
				catch (err) {
					return;
				}

// substitute \\ \n \r \t \' \" \127 \x1f \u12ef
				replaceText = replaceText.replace(/\\\\/g, '\x00');
				replaceText = replaceText.replace(/\\n/g, '\n');
				replaceText = replaceText.replace(/\\r/g, '\r');
				replaceText = replaceText.replace(/\\t/g, '\t');
				replaceText = replaceText.replace(/\\\'/g, '\'');
				replaceText = replaceText.replace(/\\\"/g, '\"');


				replaceText = replaceText.replace(/\\([0-7]{3})/g,
					function(p, p1) {
						return(String.fromCharCode(parseInt(p1, 8)));
					}
				);
				replaceText = replaceText.replace(/\\x([0-9a-fA-F]{2})/g,
					function(p, p1) {
						return(String.fromCharCode(parseInt(p1, 16)));
					}
				);
				replaceText = replaceText.replace(/\\u([0-9a-fA-F]{4})/g,
					function(p, p1) {
						return(String.fromCharCode(parseInt(p1, 16)));
					}
				);
				replaceText = replaceText.replace(/\x00/g, '\\');
			}

// replace all
			var replacedFlag = false;
			if (buttonId == 'wikEdReplaceAll') {
				if (regExpFind.test(obj.changed.plain)) {
					obj.changed.plain = obj.changed.plain.replace(regExpFind, replaceText);
					replacedFlag = true;
				}
				else {
					obj.changed.plain = null;
				}
			}

// replace an existing selection
			else if ( (buttonId == 'wikEdReplacePrev') || (buttonId == 'wikEdReplaceNext') ) {
				if (regExpFind.test(obj.selection.plain)) {
					var replaced = obj.selection.plain.replace(regExpFind, replaceText);
					if (obj.changed.plain != replaced) {
						obj.changed.plain = replaced;
						replacedFlag = true;
					}
					else {
						obj.changed.plain = null;
					}
				}
				else {
					obj.changed.plain = null;
				}
			}
			else if (
				(buttonId == 'wikEdFindNext') || (buttonId == 'wikEdFindPrev') ||
				(buttonId == 'wikEdJumpNext') || (buttonId == 'wikEdJumpPrev')
			) {
				obj.changed.plain = null;
			}

			if (
				(buttonId == 'wikEdFindNext') || (buttonId == 'wikEdFindPrev') ||
				(buttonId == 'wikEdJumpNext') || (buttonId == 'wikEdJumpPrev') ||
				(buttonId == 'wikEdReplaceNext') || (buttonId == 'wikEdReplacePrev') ||
				(buttonId == 'wikEdFindAll')
			) {
				if (replacedFlag == false) {

// get direction
					var backwards = false;
					if ( (buttonId == 'wikEdFindPrev') || (buttonId == 'wikEdJumpPrev') || (buttonId == 'wikEdReplacePrev') ) {
						backwards = true;
					}

// get case sensitive
					var caseSensitive = false;
					if (caseSensitiveChecked == 'true') {
						caseSensitive = true;
					}

// find all
					if (buttonId == 'wikEdFindAll') {
						var found;
						var foundRanges = [];

// start at top of text
						WikEdRemoveAllRanges(obj.sel);
						var range = wikEdFrameDocument.createRange();
						range.setStartBefore(wikEdFrameBody.firstChild);
						range.collapse(true);
						range = obj.sel.addRange(range);

// cycle through matches
						var scrollTop = wikEdFrameBody.scrollTop;
						do {

// use regexp seach
							if (regExpChecked == 'true') {
								found = WikEdFind(obj, findText, caseSensitive, false, false, regExpFind);
							}

// use built-in sarch
							else {
								found = WikEdFind(obj, findText, caseSensitive, false, false, null);
							}
							if (found == true) {
								foundRanges.push(obj.changed.range.cloneRange());
							}
						} while (found == true);

// scroll back
						if (regExpChecked == 'false') {
							wikEdFrameBody.scrollTop = scrollTop;
						}

// add the found ranges
						WikEdRemoveAllRanges(obj.sel);
						for (range in foundRanges) {
							obj.sel.addRange(foundRanges[range]);
						}
						obj.changed.plain = null;
					}

// normal find
					else {
						if (regExpChecked == 'true') {
							WikEdFind(obj, findText, caseSensitive, backwards, true, regExpFind);
						}
						else {
							WikEdFind(obj, findText, caseSensitive, backwards, true, null);
							selectChanged = false;
						}
					}
				}
			}

// escape <, >, and &
			if (obj.changed.plain != null) {
				obj.changed.plain = obj.changed.plain.replace(/&/g, '&amp;');
				obj.changed.plain = obj.changed.plain.replace(/</g, '&lt;');
				obj.changed.plain = obj.changed.plain.replace(/>/g, '&gt;');
			}

// save search history to settings
			if ( (buttonId == 'wikEdFindPrev') || (buttonId == 'wikEdFindNext') || (buttonId == 'wikEdFindAll') ) {
				WikEdAddToHistory('find');
			}
			if ( (buttonId == 'wikEdReplacePrev') || (buttonId == 'wikEdReplaceNext') || (buttonId == 'wikEdReplaceAll') ) {
				WikEdAddToHistory('find');
				WikEdAddToHistory('replace');
			}
			obj.changed.keepSel = true;
			break;

// fixbasic: fix characters, spaces, empty lines, certain headings, needed for all fixing functions
// to do: only certain changes in multiline tags: comments, tables, subst
		case 'wikEdFixBasic':
			WikEdFixBasic(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixPunct':
			WikEdFixPunct(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixMath':
			WikEdFixMath(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixChem':
			WikEdFixChem(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixUnicode':
			WikEdFixUnicode(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixRedirect':
			WikEdFixRedirectCall(obj.changed);
			return;
		case 'wikEdFixRedirectReplace':
			WikEdFixRedirectReplace(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixUnits':
			WikEdFixUnits(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixDashes':
			WikEdFixDashes(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixHtml':
			WikEdFixHTML(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixRegExTypo':
			if ( (wikEdRegExTypoFix == true) && (wikEdTypoRulesFind.length > 0) ) {
				WikEdFixTypos(obj.changed);
			}
			else {
				obj.changed.plain = null;
			}
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixCaps':
			WikEdFixCaps(obj.changed);
			obj.changed.keepSel = true;
			break;
		case 'wikEdFixAll':
			WikEdFixAll(obj.changed);
			obj.changed.keepSel = true;
			break;

// source on
		case 'wikEdSource':
			obj.changed.plain = obj.changed.code;
			obj.changed.plain = obj.changed.plain.replace(/(<(br|p)\b[^>]*>)/g, '$1\n');
			obj.changed.plain = obj.changed.plain.replace(/&/g, '&amp;');
			obj.changed.plain = obj.changed.plain.replace(/</g, '&lt;');
			obj.changed.plain = obj.changed.plain.replace(/>/g, '&gt;');
			highlightSyntax = false;
			break;

// insert tags
		case 'wikEdInsertTags':
			var tagOpen = parameters[0] || '';
			var tagClose = parameters[1] || '';
			var sampleText = parameters[2] || '';
			tagOpen = tagOpen.replace(/&/g, '&amp;');
			tagOpen = tagOpen.replace(/</g, '&lt;');
			tagOpen = tagOpen.replace(/>/g, '&gt;');
			tagClose = tagClose.replace(/&/g, '&amp;');
			tagClose = tagClose.replace(/</g, '&lt;');
			tagClose = tagClose.replace(/>/g, '&gt;');
			tagsampleText = sampleText.replace(/&/g, '&amp;');
			tagsampleText = sampleText.replace(/</g, '&lt;');
			tagsampleText = sampleText.replace(/>/g, '&gt;');

// single string to insert
			if ( (tagOpen.length > 0) && (tagClose.length == 0) && (sampleText.length == 0) ) {
				obj.changed = obj.cursor;
				obj.changed.plain = tagOpen;
			}

// opening and closing strings
			else if ( (obj.changed.plain == '') && (sampleText.length > 0) ) {
				obj.changed.plain = tagOpen + sampleText + tagClose;

// select sample text
				selectChangedText = sampleText;
				obj.changed.keepSel = true;
			}
			else {
				obj.changed.plain = tagOpen + obj.changed.plain + tagClose;
			}

// convert wiki tables to html // {{TABLE}}
		case 'wikEdTablify':
			obj.changed.keepSel = true;
			if (wikEdTableMode == true) {
				WikEdWikiTableToHtml(obj.changed);
			}
			break;

// update text view using current control button settings // {{TABLE}}
		case 'wikEdUpdateAll':
			obj.changed.keepSel = true;
			if (parameters != null) {
				if (parameters.keepSel == false) {
					obj.changed.keepSel = false;
				}
			}
			break;

// custom edit functions
		default:
			if (CustomHandler != null) {
				CustomHandler(obj);
			}
			else {
				alert('Unknown edit function \'' + buttonId + '\'');
			}
			break;
	}

// update the selection only, do not change the text
	if (obj.changed.plain == null) {
		if (buttonId != 'wikEdFindAll') {
			WikEdRemoveAllRanges(obj.sel);
			obj.sel.addRange(obj.changed.range);

// scroll the selected text into the viewport by using a backwards find
			if (selectChanged != false) {

// get the plain text of the selection
				if (obj.sel.rangeCount == 0) {
					obj.sel.collapse(wikEdFrameBody, 0);
				}
				var plainText = obj.sel.getRangeAt(obj.sel.rangeCount - 1).cloneContents().textContent;

// collapse the selection to the end and search backwards
				if (plainText.length > 0) {
					plainText = plainText.replace(/\n/g, '');
					obj.changed.range.collapse(false);

// parameters: window.find(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog)
					wikEdFrameWindow.find(plainText, true, true, false, false, false, false);
				}
			}
		}
	}

// apply text changes
	else {

// a text change erases the last version for redo all
		if ( (buttonId != 'wikEdUndo') && (buttonId != 'wikEdRedo') && (buttonId != 'wikEdUndoAll') ) {
			wikEdLastVersion = null;
		}

// highlight the syntax
		obj.html = obj.changed.plain;
		if (highlightSyntax == true) {
			if (obj.changed.from == 'whole') {
				obj.whole = true;
			}
			WikEdHighlightSyntax(obj);
		}

// at least display tabs
		else {
			obj.html = obj.html.replace(/(\t)/g, '<span class="wikEdTabPlain">$1</span><!--wikEdTabPlain-->');
		}

// display multiple blanks as blank-&nbsp;
		obj.html = obj.html.replace(/(^|\n) /g, '$1&nbsp;');
		obj.html = obj.html.replace(/ (\n|$)/g, '&nbsp;$1');
		obj.html = obj.html.replace(/  /g, '&nbsp; ');
		obj.html = obj.html.replace(/  /g, '&nbsp; ');

// newlines to <br />
		obj.html = obj.html.replace(/\n/g, '<br />');

// make changed range text the current selection
		WikEdRemoveAllRanges(obj.sel);
		obj.sel.addRange(obj.changed.range); //// range over <br> not handled correctly by Seamonkey

// get the scroll position
		var scrollTop;
		if (obj.changed.from == 'whole') {
			scrollTop = wikEdFrameBody.scrollTop;
		}

// replace the selection with changed text
		if (obj.html != '') {
			WikEdFrameExecCommand('inserthtml', obj.html);
		}
		else if (obj.sel.isCollapsed == false) {
			WikEdFrameExecCommand('delete');
		}

// select the whole text after replacing the whole text and scroll to same height
		if (obj.changed.from == 'whole') {
			WikEdRemoveAllRanges(obj.sel);
			wikEdFrameBody.scrollTop = scrollTop;
			var range = wikEdFrameDocument.createRange();
			range.setStartBefore(wikEdFrameBody.firstChild);
			range.setEndAfter(wikEdFrameBody.lastChild);
			obj.sel.addRange(range);
			selectChanged = false;
		}

// select the changed text and scroll it into the viewport by using a backwards find
		if (selectChanged != false) {

// get the text content of the changed text
			if (selectChangedText == '') {
				var div = document.createElement('div');
				div.innerHTML = obj.changed.plain;
				selectChangedText = div.textContent;
			}

// find the text
			if (selectChangedText.length > 0) {
				selectChangedText = selectChangedText.replace(/\n/g, '');

// parameters: window.find(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog)
				if (selectChangedText != '') {
					wikEdFrameWindow.find(selectChangedText, true, true, false, false, false, false);
				}
			}
		}
	}

// remove selection, keep whole text auto-selection as warning
	if (
		( (obj.changed.keepSel != true) && (obj.changed.from != 'whole') ) ||
		(obj.changed.keepSel == false) ||
		(buttonId == 'wikEdRedirect') ||
		( (buttonId == 'wikEdWikify') && (parameters == 'whole') )
	) {
		if (obj.sel.rangeCount == 0) {
			obj.sel.collapse(wikEdFrameBody, 0);
		}
		else {
			obj.sel.getRangeAt(obj.sel.rangeCount - 1).collapse(false);
		}
	}

// reset button to active, reset cursor
	if (buttonObj != null) {
		if (buttonObj.className != 'wikEdButtonInactive') {
			buttonObj.className = 'wikEdButton';
		}
		buttonObj.style.cursor = 'auto';
	}

// grey out inactive buttons
	WikEdInactiveButtons();

// reset the frame DOM cache because the frame content has been changed
	wikEdFrameDOMCache = null;

// focus the frame
	if (wikEdUseWikEd == true) {
		wikEdFrameWindow.focus();
	}

// add event handler to make highlighted frame links ctrl-clickable
	if ( (highlightSyntax == true) && (obj.changed.plain != null) ) {
		WikEdFollowLinks();
	}

	return;
}


//
// WikEdScrollToPreview: scroll to edit buttons, textarea, or preview field depending on current position
//

window.WikEdScrollToPreview = function() {

// reset fixed height to auto
	wikEdPreviewBox.style.height = 'auto';

	var scrollOffset = window.pageYOffset;
	var inputOffset = WikEdGetOffsetTop(wikEdInputWrapper);
	var editOffset = WikEdGetOffsetTop(wikEdEditWrapper);
	var submitOffset = WikEdGetOffsetTop(wikEdSaveButton);
	var editHeight = wikEdEditWrapper.clientHeight;

	if (scrollOffset > submitOffset) {
		window.scroll(0, submitOffset);
	}
	else if (scrollOffset > (editHeight / 2 + editOffset) ) {
		window.scroll(0, submitOffset);
	}
	else if (scrollOffset > editOffset) {
		window.scroll(0, editOffset);
	}
	else {
		window.scroll(0, inputOffset);
	}
	return;
}


//
// WikEdFollowLinks: register click handlers to make highlighted frame links ctrl-clickable
//

window.WikEdFollowLinks = function() {

	if (wikEdFollowLinks == true) {
		for (var linkId in wikEdFollowLinkHash) {
			if (typeof(wikEdFollowLinkHash[linkId]) != 'string') {
				continue;
			}
			var linkSpan = wikEdFrameDocument.getElementById(linkId);
			if (linkSpan != null) {
				WikEdAddEventListener(linkSpan, 'click', WikEdFollowLinkHandler, true);
			}
		}
	}
	return;
}


//
// WikEdGetText: get the text fragments to manipulate
//

window.WikEdGetText = function(obj, whichFragment, wikify) {

// remove dynamically inserted nodes by other scripts
	WikEdCleanNodes(wikEdFrameDocument);

// get selection object
	if (obj.sel == null) {
		obj.sel = WikEdGetSelection();
	}

// cursor for the cursor position (always done)
	if (obj.cursor == null) {
		obj.cursor = {
			'from': 'cursor',
			'keepSel': null,
			'plain': ''
		};

// set cursor range
		obj.cursor.range = wikEdFrameDocument.createRange();
		obj.cursor.range.setStart(obj.sel.focusNode, obj.sel.focusOffset);
		obj.cursor.range.setEnd(obj.sel.focusNode, obj.sel.focusOffset);
	}

// whole for the whole text
	if (obj.whole == null) {
		if (/whole|selectionWord|selectionLine|selectionPara|focusWord|focusLine|focusPara/.test(whichFragment) == true) {
			obj.whole = {
				'plainArray': [],
				'plainNode': [],
				'plainStart': [],
				'from': 'whole',
				'keepSel': null
			};

// set whole range
			obj.whole.range = wikEdFrameDocument.createRange();
			obj.whole.range.setStartBefore(wikEdFrameBody.firstChild);
			obj.whole.range.setEndAfter(wikEdFrameBody.lastChild);

// get whole plain text
			WikEdGetInnerHTML(obj.whole, wikEdFrameBody);
			obj.whole.code = obj.whole.html;
			WikEdRemoveHighlightingWikify(obj.whole, wikify);
			obj.whole.plain = obj.whole.html;
			obj.whole.plain = obj.whole.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.whole.plain = obj.whole.plain.replace(/\xa0/g, ' ');
		}
	}

// selection for the selected text
	if (obj.selection == null) {
		if (/selection\b|selectionWord|selectionLine|selectionPara/.test(whichFragment) == true) {
			obj.selection = {
				'from': 'selection',
				'keepSel': null
			};

// copy range to document fragment
			if (obj.sel.rangeCount == 0) {
				obj.sel.collapse(wikEdFrameBody, 0);
			}
			obj.selection.range = obj.sel.getRangeAt(obj.sel.rangeCount - 1);
			var documentFragment = obj.selection.range.cloneContents();

// get selected text
			WikEdGetInnerHTML(obj.selection, documentFragment);
			obj.selection.code = obj.selection.html;
			WikEdRemoveHighlightingWikify(obj.selection, wikify);
			obj.selection.plain = obj.selection.html;
			obj.selection.plain = obj.selection.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.selection.plain = obj.selection.plain.replace(/\xa0/g, ' ');
		}
	}

// focusWord, focusLine, and focusPara for the word, line, and paragraph under the cursor
	if (obj.focusWord == null) {
		if (/focusWord|focusLine|focusPara/.test(whichFragment) == true) {
			obj.focusWord = {
				'from': 'focusWord',
				'keepSel': false,
				'range': wikEdFrameDocument.createRange(),
				'tableEdit': obj.tableEdit
			};

// setup focusLine object for the line under the cursor
			obj.focusLine = {
				'from': 'focusLine',
				'keepSel': false,
				'range': wikEdFrameDocument.createRange(),
				'tableEdit': obj.tableEdit
			};

// setup focusPara object for the paragraph under the cursor
			obj.focusPara = {
				'from': 'focusPara',
				'keepSel': false,
				'range': wikEdFrameDocument.createRange(),
				'tableEdit': obj.tableEdit
			};

// find the word and line boundaries
			WikEdFindBoundaries(obj.focusWord, obj.focusLine, obj.focusPara, obj.whole, obj.cursor);

// get the wikified plain text for the word under the cursor
			var documentFragment = obj.focusWord.range.cloneContents();
			WikEdGetInnerHTML(obj.focusWord, documentFragment);
			obj.focusWord.code = obj.focusWord.html;
			WikEdRemoveHighlightingWikify(obj.focusWord, wikify);
			obj.focusWord.plain = obj.focusWord.html;
			obj.focusWord.plain = obj.focusWord.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.focusWord.plain = obj.focusWord.plain.replace(/\xa0/g, ' ');

// get the wikified plain text for the line under the cursor
			var documentFragment = obj.focusLine.range.cloneContents();
			WikEdGetInnerHTML(obj.focusLine, documentFragment);
			obj.focusLine.code = obj.focusLine.html;
			WikEdRemoveHighlightingWikify(obj.focusLine, wikify);
			obj.focusLine.plain = obj.focusLine.html;
			obj.focusLine.plain = obj.focusLine.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.focusLine.plain = obj.focusLine.plain.replace(/\xa0/g, ' ');

// get the wikified plain text for the paragraph under the cursor
			var documentFragment = obj.focusPara.range.cloneContents();
			WikEdGetInnerHTML(obj.focusPara, documentFragment);
			obj.focusPara.code = obj.focusPara.html;
			WikEdRemoveHighlightingWikify(obj.focusPara, wikify);
			obj.focusPara.plain = obj.focusPara.html;
			obj.focusPara.plain = obj.focusPara.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.focusPara.plain = obj.focusPara.plain.replace(/\xa0/g, ' ');
		}
	}

// selectionWord and selectionLine for the complete words and lines under the selection
	if (obj.selectionWord == null) {
		if (/selectionWord|selectionLine|selectionPara/.test(whichFragment) == true) {

// setup selectionWord object for the words under the selection
			obj.selectionWord = {
				'from': 'selectionWord',
				'keepSel': false,
				'range': wikEdFrameDocument.createRange(),
				'tableEdit': obj.tableEdit
			};

// setup selectionLine object for the lines under the selection
			obj.selectionLine = {
				'from': 'selectionLine',
				'keepSel': false,
				'range': wikEdFrameDocument.createRange(),
				'tableEdit': obj.tableEdit
			};

// setup focusPara object for the paragraph under the selection
			obj.selectionPara = {
				'from': 'selectionPara',
				'keepSel': false,
				'range': wikEdFrameDocument.createRange(),
				'tableEdit': obj.tableEdit
			};

// find the word and line boundaries
			WikEdFindBoundaries(obj.selectionWord, obj.selectionLine, obj.selectionPara, obj.whole, obj.selection);

// get the wikified plain text for the words under the selection
			var documentFragment = obj.selectionWord.range.cloneContents();
			WikEdGetInnerHTML(obj.selectionWord, documentFragment);
			obj.selectionWord.code = obj.selectionWord.html;
			WikEdRemoveHighlightingWikify(obj.selectionWord, wikify);
			obj.selectionWord.plain = obj.selectionWord.html;
			obj.selectionWord.plain = obj.selectionWord.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.selectionWord.plain = obj.selectionWord.plain.replace(/\xa0/g, ' ');

// get the wikified plain text for the lines under the selection
			var documentFragment = obj.selectionLine.range.cloneContents();
			WikEdGetInnerHTML(obj.selectionLine, documentFragment);
			obj.selectionLine.code = obj.selectionLine.html;
			WikEdRemoveHighlightingWikify(obj.selectionLine, wikify);
			obj.selectionLine.plain = obj.selectionLine.html;
			obj.selectionLine.plain = obj.selectionLine.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.selectionLine.plain = obj.selectionLine.plain.replace(/\xa0/g, ' ');

// get the wikified plain text for the paragraph under the selection
			var documentFragment = obj.selectionPara.range.cloneContents();
			WikEdGetInnerHTML(obj.selectionPara, documentFragment);
			obj.selectionPara.code = obj.selectionPara.html;
			WikEdRemoveHighlightingWikify(obj.selectionPara, wikify);
			obj.selectionPara.plain = obj.selectionPara.html;
			obj.selectionPara.plain = obj.selectionPara.plain.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
			obj.selectionPara.plain = obj.selectionPara.plain.replace(/\xa0/g, ' ');
		}
	}
	return;
}


//
// WikEdFind: custom find function with regexp properties, sets obj.changed.range, uses obj ranges
//

window.WikEdFind = function(obj, findText, caseSensitive, backwards, wrap, regExp) {

	if (obj.sel.rangeCount == 0) {
		obj.sel.collapse(wikEdFrameBody, 0);
	}
	var range = obj.sel.getRangeAt(obj.sel.rangeCount - 1);
	var found = false;

// empty the range to avoid error messages for reverse direction ranges
	obj.changed.range = wikEdFrameDocument.createRange();

// use the fast built-in find function for non-regexp searches
	if (regExp == null) {

// parameters: window.find(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog)
		found = wikEdFrameWindow.find(findText, caseSensitive, backwards, wrap, false, true, false);
		if (found == true) {
			range = obj.sel.getRangeAt(obj.sel.rangeCount - 1);
		}
		obj.changed.range = range.cloneRange();
	}

// slow javascript regexp find and replace
	else {

// perform find
		if (obj.plainArray === undefined) {
			WikEdParseDOM(obj, wikEdFrameBody);
		}
		var regExpMatch = [];

// find next, search to the right
		if (backwards == false) {

// set start position for search to right
			regExpMatch = regExp.exec(obj.plain);
			regExp.lastIndex = obj.plainFocus;

// execute the regexp search to the right
			regExpMatch = regExp.exec(obj.plain);

// remember position for repeated searches
			obj.plainFocus = regExp.lastIndex;

// wrap around, start at beginning
			if ( (wrap == true) && (regExpMatch == null) ) {
				regExp.lastIndex = 0;
				regExpMatch = regExp.exec(obj.plain);
			}
		}

// find previous, search to the left
		else {

// cycle through the matches to the left
			var regExpMatchNext;
			do {
				regExpMatch = regExpMatchNext;
				regExpMatchNext = regExp.exec(obj.plain);
				if (regExpMatchNext == null) {
					break;
				}
			} while (regExpMatchNext.index < obj.plainAnchor);

// wrap around, find last occurrence
			if ( (wrap == true) && (regExpMatch == null) ) {
				do {
					regExpMatch = regExpMatchNext;
					regExpMatchNext = regExp.exec(obj.plain);
				} while (regExpMatchNext != null);
			}
		}

// select the find
		if (regExpMatch != null) {
			found = true;
			var i = 0;
			while ( (obj.plainStart[i + 1] <= regExpMatch.index) && (obj.plainStart[i + 1] != null) ) {
				i ++;
			}
			var j = i;
			while ( (obj.plainStart[j + 1] <= regExpMatch.index + regExpMatch[0].length) && (obj.plainStart[j + 1] != null) ) {
				j ++;
			}
			obj.changed.range.setStart(obj.plainNode[i], regExpMatch.index - obj.plainStart[i]);
			obj.changed.range.setEnd  (obj.plainNode[j], regExpMatch.index + regExpMatch[0].length - obj.plainStart[j]);
		}
	}

//// range over <br> not handled correctly by Seamonkey
	return(found);
}


//
// WikEdWikiTableToHtml: convert wiki tables to html // {{TABLE}}
//

window.WikEdWikiTableToHtml = function(obj) {

////
	return;
}


//
// WikEdTextify: strip html off of text
//

window.WikEdTextify = function(obj) {

// convert html to plain
	obj.plain = obj.html;
	obj.plain = obj.plain.replace(/\n/g, ' ');

// delete tags
	obj.plain = obj.plain.replace(/<(style|script|object|applet|embed)\b[^>]*>.*?<\/\1>/g, '');

// newlines
	obj.plain = obj.plain.replace(/<br\b[^>]*> *()/g, '\n');

// remove empty lines from block tags
	obj.plain = obj.plain.replace(/(<(blockquote|center|div|p|pre|gallery)\b[^>]*>)[\s\x00]+/gi, '$1');
	obj.plain = obj.plain.replace(/[\s\x00]+(<\/(blockquote|center|div|p|pre|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)>)/gi, '$1');

// remove highlighting pre tags
	var isRemove = [];
	obj.plain = obj.plain.replace(/(<(\/?)pre\b([^>]*)>)/g,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (/\bclass=\"wikEd\w+\"/.test(p3)) {
					isRemove.push(true);
					return('');
				}
				isRemove.push(false);
				return(p1);
			}
			if (isRemove.pop() == true) {
				return('');
			}
			return(p1);
		}
	);

// blocks
	obj.plain = obj.plain.replace(/<\/?(address|blockquote|center|div|hr|isindex|p|pre)\b[^>]*>/g, '\x00\x00');

// keep headings only if starting with a newline
	obj.plain = obj.plain.replace(/[\s|\x00]*(^|\n|\x00)[\s|\x00]*<h[1-6]\b[^>]*>(.*?)<\/h[1-6]>[\s|\x00]*()/g, '\x00\x00$2\x00\x00');

// lists
	obj.plain = obj.plain.replace(/<\/?(dir|dl|menu|ol|ul)\b[^>]*>/g, '\x00');
	obj.plain = obj.plain.replace(/<\/(dd|dt|li)>/g, '\x00');

// forms
	obj.plain = obj.plain.replace(/<\/?(select|textarea)\b[^>]*>/g, '\x00');
	obj.plain = obj.plain.replace(/<\/(option|legend|optgroup)>/g, '\x00');

// tables
	if (wikEdTableMode == true) {

// override pasted table class // {{TABLE}}
		obj.plain = obj.plain.replace(/(<table\b)([^>]*)(>)/gi,
			function (p, p1, p2, p3) {
				if (p2.match(/\bclass=/) != null) {
					p2 = p2.replace(/\bclass\s*=\s*([\'\"]?)[^<>\'\"\n]*?\2/g, 'class="wikEdTableEdit"');
				}
				else {
					p2 = ' class="wikEdTableEdit"';
				}
				return(p1 + p2 + p3);
			}
		);

// keep table html markup // {{TABLE}}
		obj.plain = obj.plain.replace(/[\s\x00]*(<table\b[^>]*>)/g, '\x00\x00$1');
		obj.plain = obj.plain.replace(/(<\/table>)[\s\x00]*()/g, '$1\x00');

		obj.plain = obj.plain.replace(/<(\/?(table|caption|tr|th|td)\b[^>]*)>/g, '\x01$1\x02');
	}

// textify table
	else if (wikEdTableMode == false) {
		obj.plain = obj.plain.replace(/<\/?(table|caption)\b[^>]*>/g, '\x00');
		obj.plain = obj.plain.replace(/<\/(tr|th|td)>/g, '\x00');
	}

// finish html to plain conversion
	obj.plain = obj.plain.replace(/<[^>]*>/g, '');

// recover table html
	obj.plain = obj.plain.replace(/\x01/g, '<');
	obj.plain = obj.plain.replace(/\x02/g, '>');

// remove spaces
	obj.plain = obj.plain.replace(/[ \t\xa0]+(\x00)/g, '$1');
	obj.plain = obj.plain.replace(/(\x00)[ \t\xa0]+/g, '$1');

// trim down \x00 and \n
	obj.plain = obj.plain.replace(/\x00+\n/g, '\n');
	obj.plain = obj.plain.replace(/\n\x00+/g, '\n');
	obj.plain = obj.plain.replace(/\n*\x00(\x00|\n)+/g, '\n\n');
	obj.plain = obj.plain.replace(/\x00/g, '\n');
	obj.plain = obj.plain.replace(/(<\/table>\n)\n+/g, '$1');

// remove empty lines and spaces from article start and end
	if (obj.from == 'whole') {
		obj.plain = obj.plain.replace(/^\s+|\s+$/g, '');
	}

	return;
}


//
// WikEdInactiveButtons: grey out inactive buttons, called after every change and click
//

window.WikEdInactiveButtons = function() {

// undo
	if (wikEdFrameDocument.queryCommandEnabled('undo') == true ) {
		document.getElementById('wikEdUndo').className = 'wikEdButton';
		document.getElementById('wikEdUndoAll').className = 'wikEdButton';
	}
	else {
		document.getElementById('wikEdUndo').className = 'wikEdButtonInactive';
		document.getElementById('wikEdUndoAll').className = 'wikEdButtonInactive';
	}

// redo
	if (wikEdFrameDocument.queryCommandEnabled('redo') == true ) {
		document.getElementById('wikEdRedo').className = 'wikEdButton';
	}
	else {
		document.getElementById('wikEdRedo').className = 'wikEdButtonInactive';
	}

// redo all
	if (wikEdLastVersion != null) {
		document.getElementById('wikEdRedoAll').className = 'wikEdButton';
	}
	else {
		document.getElementById('wikEdRedoAll').className = 'wikEdButtonInactive';
	}
	return;
}

//
// WikEdFixBasic: fix characters, spaces, empty lines, certain headings, needed for all fixing functions
//

//// change: double spaces ok after dot

window.WikEdFixBasic = function(obj) {

// non-breaking space character to normal space
	obj.plain = obj.plain.replace(/\xa0/g, ' ');

// tab to space
	obj.plain = obj.plain.replace(/ *\t[ \t]*()/g, ' ');

// remove trailing spaces
	obj.plain = obj.plain.replace(/(\t| |&nbsp;)+\n/g, '\n');

// remove spaces in empty lines
	obj.plain = obj.plain.replace(/\n( |&nbsp;|\t)+\n/g, '\n\n');

// empty line before and after headings, spaces around word (lookahead), remove bold, italics, and extra =
	obj.plain = obj.plain.replace(/(^|\n)+(=+) *([^\n]*?) *(=+)(?=(\n|$))/g,
		function(p, p1, p2, p3, p4) {
			p3 = p3.replace(/\'{2,}/g, '');
			return('\n\n' + p2 + ' ' + p3 + ' ' + p2 + '\n\n');
		}
	);

// uppercase well known headings
	var regExp = new RegExp('\\n=+ ' + wikEdText['External links'] + '? =+\\n', 'gi');
	obj.plain = obj.plain.replace(regExp, '\n== ' + wikEdText['External links'] + ' ==\n');
	regExp = new RegExp('\\n=+ ' + wikEdText['See also'] + ' =+\\n', 'gi');
	obj.plain = obj.plain.replace(regExp, '\n== ' + wikEdText['See also'] + ' ==\n');
	regExp = new RegExp('\\n=+ ' + wikEdText['References'] + '? =+\\n', 'gi');
	obj.plain = obj.plain.replace(regExp, '\n== ' + wikEdText['References'] + ' ==\n');

// add space after * # : ; (list) and after {| |- | (table)
	obj.plain = obj.plain.replace(/(^|\n)([\*\#\:\;]+|\{\||\|\-|\|\}|\|) *()/g, '$1$2 ');
	obj.plain = obj.plain.replace(/ +\n/g, '\n');

// empty line before and after tables
	obj.plain = obj.plain.replace(/\n+(\{\|)/g, '\n\n$1');
	obj.plain = obj.plain.replace(/(\n\|\}([^\}]|$)) *([^\n]*)[\n|$]+/g, '$1\n\n$3\n\n');

// empty line before and after lists
	obj.plain = obj.plain.replace(/(^|\n)([^\*\#\:\;\n][^\n]*)(?=\n[\*\#\:\;])/g, '$1$2\n\n');
	obj.plain = obj.plain.replace(/(^|\n)([\*\#\:\;][^\n]*?)(?=\n[^\*\#\:\;\n])/g, '$1$2\n\n');

// split into lines and change single lines, used to handle tables
	var lines = obj.plain.split('\n');
	obj.plain = '';
	var tableflag = false;

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];

// do not change lines starting with a blank
		if (/^ /.test(line) == false) {

// detect table
			if (line.match(/^(\{\||\!|\|[^}])/) != null) {
				tableflag = true;
			}
			else if (line.match(/^\|\}/) != null) {
				tableflag = false;
			}

// changes only to be done in tables
			if (tableflag == true) {

// add spaces around ||
				line = line.replace(/ *\|\| *()/g, ' || ');
			}

// changes not to be done in tables
			if (! tableflag) {

// empty line before and after images
				var regExp = new RegExp('^(\\[\\[(Image|File|' + wikEdText['wikicode Image'] + '|' + wikEdText['wikicode File'] + '):.*?\\]\\])', 'ig');
				line = line.replace(regExp, '\n$1');

				regExp = new RegExp('(\\[\\[(Image|File|' + wikEdText['wikicode Image'] + '|' + wikEdText['wikicode File'] + '):.*?(\\[\\[.*?\\]\\].*?)*\\]\\])$', 'ig');
				line = line.replace(regExp, '$1\n');

// empty line before and after includes
				line = line.replace(/^(\{\{.*?\}\})/g, '\n$1');
				line = line.replace(/(\{\{.*?\}\})$/g, '$1\n');
			}
		}

// concatenate the lines
		obj.plain += line;
		if (i < lines.length - 1) {
			obj.plain += '\n';
		}
	}

// remove underscores in wikilinks
	obj.plain = obj.plain.replace(/\[\[(.*?)((\|.*?)|)\]\]/g,
		function (p, p1, p2) {
			p1 = p1.replace(/_/g, ' ');
			return('[[' + p1 + p2 + ']]');
		}
	);

// remove spaces in wikilinks
	obj.plain = obj.plain.replace(/\[\[ *([^\n]*?) *\]\]/g, '[[$1]]');

// remove spaces in external links
	obj.plain = obj.plain.replace(/\[ *([^\n]*?) *\]/g, '[$1]');

// no space around pipes before brackets
	obj.plain = obj.plain.replace(/ +\| +\]\]/g, '|]]');

// no space around pipes before curly brackets
	obj.plain = obj.plain.replace(/ +\| +\}\}/g, '|}}');

// no empty line between headings and includes
	obj.plain = obj.plain.replace(/\n(=+ [^\n]*? =+\n)\n+(\{\{.*?\}\})/g, '\n$1$2');

// spaces in comments
	obj.plain = obj.plain.replace(/(&lt;!--) *([^\n]*?) *(--&gt;)/g, '$1 $2 $3');

// empty line before and after categories
	var regExp = new RegExp('( |\\n)*(\\[\\[(Category|' + wikEdText['wikicode Category'] + ')\\s*:[^\\n]*?\\]\\])( |\\n)*', 'gi');
	obj.plain = obj.plain.replace(regExp, '\n\n$2\n\n');

// categories not separated by empty lines (lookahead)
	regExp = new RegExp('(\\[\\[(Category|' + wikEdText['wikicode Category'] + ')\\s*:[^\\n]*?\\]\\])\\n*(?=\\[\\[(Category|' + wikEdText['wikicode Category'] + ')\\s*:[^\\n]*?\\]\\])', 'gi');
	obj.plain = obj.plain.replace(regExp, '$1\n');

// single empty lines only
	obj.plain = obj.plain.replace(/\n{3,}/g, '\n\n');

// remove leading and trailing newlines
	obj.plain = obj.plain.replace(/^\n+/, '');
	obj.plain = obj.plain.replace(/\n{2,}$/, '\n');

	return;
}


//
// WikEdFixPunct: remove (or add) space before .,:;
//

window.WikEdFixPunct = function(obj) {

	WikEdFixBasic(obj);

// protect punctuation in charents
	obj.plain = obj.plain.replace(/(&([a-zA-Z0-9]{2,10}|#[0-9]{2,7}))(;)/g, '$1\x00$3');

// protect punctuation in URLs
	obj.plain = obj.plain.replace(/(\b(http:\/\/|https:\/\/|ftp:\/\/|irc:\/\/|gopher:\/\/|news:|mailto:|file:\/\/)[\!\#\%\&\(\)\+-\/\:\;\=\?\@\w\~ŠŒŽœžŸŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]*)/g,
		function(p, p1, p2) {
			p = p.replace(/([\.\,\:\;\?\!](?!$))/g, '\x00$1');
			return(p);
		}
	);

// protect punctuation in filenames
	obj.plain = obj.plain.replace(/([a-zA-Z_ŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\-])([\.\,\:\;\?\!])(?=([a-zA-Z]{3,4})([\s\:\;\?\!\.\,\(\)\[\]\{\}\|]|$))/g, '$1\x00$2');

// protect punctuation in article names
	obj.plain = obj.plain.replace(/(\[\[|\{\{)([^\]\}\|\n]*)/g,
		function(p, p1, p2) {
			p = p.replace(/([\.\,\:\;\?\!])/g, '\x00$1');
			return(p);
		}
	);

	if (wikEdFixPunctFrench == true) {
		obj.plain = obj.plain.replace(/(«) */g, '$1 ');
		obj.plain = obj.plain.replace(/ *(»)/g, ' $1');
		obj.plain = obj.plain.replace(/([a-zA-Z_ŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\'\"”\]\}\)]) *([\.\,])(?=([a-zA-ZŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\'\"”\[\{\(\s]|$))/g, '$1$2 ');
		obj.plain = obj.plain.replace(/([a-zA-Z_ŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\'\"”\]\}\)]) *([\:\;\?\!])/g, '$1 $2 ');
	}
	else {
		obj.plain = obj.plain.replace(/([a-zA-Z_ŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\'\"”\]\}\)]) *([\.\,\:\;])(?=([a-zA-ZŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\'\"”\[\{\(\s]|$))/g, '$1$2 ');
	}
	obj.plain = obj.plain.replace(/\x00/g, '');
	obj.plain = obj.plain.replace(/ +$/g, '');
	obj.plain = obj.plain.replace(/ +\n/g, '\n');
	obj.plain = obj.plain.replace(/ {2,}/g, ' ');

	return;
}


//
// WikEdFixUnicode: fix unicode character representations
//

window.WikEdFixUnicode = function(obj) {

// replace supported chars: change decimal, hex, and character entities into actual char
	for (var i = 0; i < wikEdSupportedChars.length; i ++) {
		var replaceChar = String.fromCharCode(parseInt(wikEdSupportedChars[i][0], 16));

// decimal representation
		var regExpStr = '&amp;#0*' + parseInt(wikEdSupportedChars[i][0], 16) + ';|';

// hex representation
		regExpStr += '&amp;#x0*' + wikEdSupportedChars[i][0] + ';';

// case insensitive replace
		var regExp = new RegExp(regExpStr, 'gi');
		obj.plain = obj.plain.replace(regExp, replaceChar);

// character entity representation
		regExpStr = '&amp;' + wikEdSupportedChars[i][1] + ';';

// case sensitive replace
		regExp = new RegExp(regExpStr, 'g');
		obj.plain = obj.plain.replace(regExp, replaceChar);
	}

// replace unsupported chars in IE6: change decimal, hex, and chars into character entities
	for (var i = 0; i < wikEdProblemChars.length; i ++) {
		replaceChar = '&amp;' + wikEdProblemChars[i][1] + ';';

// decimal representation
		regExpStr = '&amp;#0*' + parseInt(wikEdProblemChars[i][0], 16) + ';|';

// hex representation
		regExpStr += '&amp;#x0*' + wikEdProblemChars[i][0] + ';';

// case insensitive replace
		regExp = new RegExp(regExpStr, 'gi');
		obj.plain = obj.plain.replace(regExp, replaceChar);

// actual character representation
		regExpStr = '\\u' + wikEdProblemChars[i][0];

// case sensitive replace
		regExp = new RegExp(regExpStr, 'g');
		obj.plain = obj.plain.replace(regExp, replaceChar);
	}

// replace special chars (spaces and invisible characters): change decimal, hex, and chars into character entities
	for (var i = 0; i < wikEdSpecialChars.length; i ++) {
		var replaceChar = '&amp;' + wikEdSpecialChars[i][1] + ';';

// decimal representation
		var regExpStr = '&amp;#0*' + parseInt(wikEdSpecialChars[i][0], 16) + ';|';

// hex representation
		regExpStr += '&amp;#x0*' + wikEdSpecialChars[i][0] + ';';

// case insensitive replace
		var regExp = new RegExp(regExpStr, 'gi');
		obj.plain = obj.plain.replace(regExp, replaceChar);

// actual character representation
		regExpStr = '\\u' + wikEdSpecialChars[i][0];

// case sensitive replace
		var regExp = new RegExp(regExpStr, 'g');
		obj.plain = obj.plain.replace(regExp, replaceChar);
	}

// unicode line separator and paragraph separator
	obj.plain = obj.plain.replace(/\u2028/g, '\n');
	obj.plain = obj.plain.replace(/\u2029/g, '\n\n');

	return;
}


//
// WikEdFixRedirectCall: parse link targets into wikEdRedirects object using AJAX API call
//

window.WikEdFixRedirectCall = function(obj) {

// check if api is enabled
	if ( (wikEdWikiGlobals['wgEnableAPI'] != 'true') || (wikEdScriptURL == '') ) {
		return;
	}

// reset redirects object
	wikEdRedirects = {};

// get wiki links
	var url = '';

//              1 [[    2  2   3                   34#                4 5     6    6  5  ]]    1
	var regExp = /(\[\[\s*(:?)\s*([^\n#<>\[\]\{\}\|]+)(\s*#[^\n\[\]\|]*?)?(\s*\|(.|\s)*?)?\]\]\s*)/g;
	while ( (regExpMatch = regExp.exec(obj.plain)) != null) {
		url += encodeURIComponent(regExpMatch[3] + '|');
	}

// no wikilinks found
	if (url == '') {
		return;
	}

// make the ajax request
	url = wikEdScriptURL + 'api.php?action=query&redirects&format=xml&titles=' + url;
	WikEdAjaxRequest('GET', url, null, null, null, null, function(ajax, obj) {

// get response
		var txt = ajax.responseText;

		if ( (regExpMatch = txt.match(/<redirects>((.|\s)*?)<\/redirects>/)) != null) {
			var redirects = regExpMatch[1];

			if ( (regExpMatch = txt.match(/<normalized>((.|\s)*?)<\/normalized>/)) != null) {
				redirects = regExpMatch[1] + redirects;
			}

// parse redirects
			var i = 0;
			wikEdRedirects.from = [];
			wikEdRedirects.to = [];
			wikEdRedirects.allFrom = '';

			var regExp = /<(r|n) .*?\bfrom=\"([^\">]*)\".*?\bto=\"([^\"]*)\"[^>]*>/g;
			while ( (regExpMatch = regExp.exec(txt)) != null) {
				wikEdRedirects.from[i] = regExpMatch[2];
				wikEdRedirects.allFrom += i + '="' + regExpMatch[2] + '"';
				wikEdRedirects.to[i] = regExpMatch[3];
				i ++;
			}

// recurse through chained normalizations and redirects
			wikEdRedirects.toIndex = [];
			for (var i = 0; i < wikEdRedirects.to.length; i ++) {
				wikEdRedirects.toIndex[i] = WikEdResolveRedirects(i);
			}

		}

// replace links
		WikEdEditButton(null, 'wikEdFixRedirectReplace');

		return;
	});
// end Ajax handler

	return;
}


//
// WikEdResolveRedirects: recursively follow redirects, called from WikEdFixRedirectCall Ajax handler
//   uses wikEdRedirects.allFrom as a regExp hash

window.WikEdResolveRedirects = function(i) {
	var toRegExp = wikEdRedirects.to[i].replace(/(\W)/g, '\\$1');
	var regExp = new RegExp('(\\d+)=\\"' + toRegExp + '\\"');
	if ( (regExpMatch = wikEdRedirects.allFrom.match(regExp)) != null) {
		i = WikEdResolveRedirects( parseInt(regExpMatch[1]) );
	}
	return(i);
}


//
// WikEdFixRedirectReplace: replace redirects using wikEdRedirects object prepared in WikEdFixRedirectCall()
//

window.WikEdFixRedirectReplace = function(obj) {

	if (wikEdRedirects.from == null) {
		return;
	}

// cycle through parsed redirects
	if (wikEdRedirects.from != null) {
		for (var i = 0; i < wikEdRedirects.from.length; i ++) {

	var regExp = /(\[\[\s*(:?)\s*([^\n#<>\[\]\{\}\|]+)(\s*#[^\n\[\]\|]*?)?(\s*\|(.|\s)*?)?\]\])/g;

//                                       1  1    2                              23    #                 3 4      |56     6  54
			var regExp = new RegExp('\\[\\[\\s*(:?)\\s*(' + wikEdRedirects.from[i] + ')(\\s*#[^\\n\\[\\]\\|]*?)?(\\s*\\|((.|\\s)*?))?\\s*\\]\\]', 'g');
			obj.plain = obj.plain.replace(regExp,
				function(p, p1, p2, p3, p4, p5) {
					var prefix = p1;
					var article = p2;
					var redirect = wikEdRedirects.to[ wikEdRedirects.toIndex[i] ];
					var fragmentId = p3 || '';
					var linkText = p5 || '';

// use normalized target
					var linkTarget = redirect;

// lowercase link target if link text starts with lowercase (main space only)
					if (wikEdArticlesCaseSensitive == false) {
						if (/:/.test(linkTarget) != true) {
							if (article.charAt(0).toLowerCase() == article.charAt(0)) {
								linkTarget = linkTarget.charAt(0).toLowerCase() + linkTarget.substr(1);
							}
						}
					}

// remove text if identical to new target
					if (linkText != '') {
						if ( linkText.replace(/_/g, ' ') == linkTarget ) {
							linkText = '';
						}
					}

// keep replaced link as link text
					else if (linkText == '') {
						if (linkTarget != article) {
							linkText = article;
						}
					}

// return fixed link
					var wikiLink;
					if (linkText == '') {
						wikiLink = '[[' + prefix + linkTarget + fragmentId + ']]';
					}
					else {
						wikiLink = '[[' + prefix + linkTarget + fragmentId + '|' + linkText + ']]';
					}
					return(wikiLink);
				}
			);
		}
	}
	return;
}


//
// WikEdFixMath: math character fixer, originally from User:Omegatron
//

window.WikEdFixMath = function(obj) {

	WikEdFixBasic(obj);

// change only outside <math> </math> wikicode
	obj.plain = obj.plain.replace(/(.*?)((&lt;math(\b.*?)&gt;.*?&lt;\/math&gt;)|$)/gi,
		function (p, p1, p2) {

// convert html entities into actual dash characters
			p1 = p1.replace(/&plus;/g, '+');
			p1 = p1.replace(/&minus;/g, '\u2212');
			p1 = p1.replace(/&middot;/g, '·');

// convert dash next to a number into a minus sign character
			p1 = p1.replace(/([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\,\{])-(\d)/g, '$1\u2212$2');

// changes 2x3 to 2×3
			p1 = p1.replace(/(\d *)x( *\d)/g, '$1\xd7$2');

// changes 10^3 to 10<sup>3</sup>
			p1 = p1.replace(/(\d*\.?\d+)\^(\u2212?\d+\.?\d*)/g, '$1&lt;sup&gt;$2&lt;/sup&gt;');

// change x^3 to x<sup>3</sup>
			p1 = p1.replace(/([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9])\^(\u2212?\d+\.?\d*) /g, '$1&lt;sup&gt;$2&lt;/sup&gt;');

// change +/- to ±
			p1 = p1.replace(/( |\d)\+\/(-|\u2212)( |\d)/g, '$1\xb1$3');

// htmlize single char superscripts
			p1 = p1.replace(/(\xb9|&sup1;)/g, '&lt;sup&gt;1&lt;/sup&gt;');
			p1 = p1.replace(/(\xb2|&sup2;)/g, '&lt;sup&gt;2&lt;/sup&gt;');
			p1 = p1.replace(/(\xb3|&sup3;)/g, '&lt;sup&gt;3&lt;/sup&gt;');

			return(p1 + p2);
		}
	);
	return;
}


//
// WikEdFixChem: fix chemical formulas
//

window.WikEdFixChem = function(obj) {

	WikEdFixBasic(obj);

	var realElements = 'H|He|Li|Be|B|C|N|O|F|Ne|Na|Mg|Al|Si|P|S|Cl|Ar|K|Ca|Sc|Ti|V|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Y|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|I|Xe|Cs|Ba|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr';
	var pseudoElements = '|Me|Et|Pr|Bu|e';

// fix common typos
	obj.plain = obj.plain.replace(/(^|[^a-z])h2o([^a-z]|$)/g, '$1H2O$2');
	obj.plain = obj.plain.replace(/(^|[^a-z])h3o+/g, '$1H3O+');
	obj.plain = obj.plain.replace(/(^|[^a-z])oh-/g, '$1OH+');

// uppercase lowercased elements
	var regExp = new RegExp('(^|[^a-zA-Z])(' + realElements.toLowerCase() + pseudoElements.toLowerCase() + ')([^a-zA-Z]|$)', 'g');
	obj.plain = obj.plain.replace(regExp,
		function (p, p1, p2, p3) {
			if (p2 != 'e') {
				p2 = p2.charAt(0).toUpperCase() + p2.substr(1).toLowerCase();
			}
			return(p1 + p2 + p3);
		}
	);

// fix superscripts
	obj.plain = obj.plain.replace(/&plus;/g, '+');
	obj.plain = obj.plain.replace(/&minus;/g, '\u2212');
	obj.plain = obj.plain.replace(/&middot;/g, '·');
	regExp = new RegExp('(' + realElements + pseudoElements + '|\\))(\\d*(\\+|-|\\u2212))', 'g');
	obj.plain = obj.plain.replace(regExp,
		function (p, p1, p2, p3) {
			p2 = p2.replace(/-/g, '\u2212');
			return(p1 + '&lt;sup&gt;' + p2 + '&lt;/sup&gt;');
		}
	);

// fix indices
	regExp = new RegExp('(' + realElements + pseudoElements + '|\\))(\\d+)', 'g');
	obj.plain = obj.plain.replace(regExp, '$1&lt;sub&gt;$2&lt;/sub&gt;');

// fix prefixes
	regExp = new RegExp('(\\d+) *(\\(|' + realElements + pseudoElements + ')', 'g');
	obj.plain = obj.plain.replace(regExp, '$1$2');

// fix arrows
	obj.plain = obj.plain.replace(/ *-+&gt; *()/g, ' \u2192 ');
	obj.plain = obj.plain.replace(/ *&lt;-+ *()/g, ' \u2190 ');

// &hdarr; and "leftwards harpoon over rightwards harpoon" not supported in IE6
//	obj.plain = obj.plain.replace(/ *(&lt;=+&gt;|&hdarr;|&harr;|\u2190 *\u2192) *()/g, ' \u21cc ');
	obj.plain = obj.plain.replace(/ *(&lt;==+&gt;|&hdarr;|&harr;|\u21cc|\u2190 *\u2192) *()/g, ' <=> ');

// fix -
	obj.plain = obj.plain.replace(/([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|\)|&gt;) +(-|\u2212) +([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|\()/g, '$1 \u2212 $3');

	return;
}


//
// WikEdFixUnits: unit formatter
//

window.WikEdFixUnits = function(obj) {

	WikEdFixBasic(obj);

// convert into actual characters
	obj.plain = obj.plain.replace(/&amp;deg;|&amp;#00b0;/g, '°');
	obj.plain = obj.plain.replace(/&amp;#00b5;|&amp;mu;|&amp;micro;/g, 'µ');
	obj.plain = obj.plain.replace(/&amp;Omega;|&amp;#8486;/g, '\u03a9');

// add space before units, remove space around /, and use abreviations
	obj.plain = obj.plain.replace(/( *\/ *|\d *)(Y|yotta|Z|zetta|E|exa|P|peta|T|tera|G|giga|M|mega|k|kilo|K|h|hecto|da|deca|d|deci|c|centi|m|mill?i|micro|u|µ|n|nano|p|pico|f|femto|a|atto|z|zepto|y|yocto|mibi|mebi|)(gramm?s?|g|metres?|meters?|m|amperes?|Amperes?|amps?|Amps?|A|Angstroms?|Angströms?|Å|Kelvins?|kelvins?|K|moles?|Moles?|mol|candelas?|cd|rad|Ci|sr|Hert?z|hert?z|Hz|newtons?|Newtons?|N|Joules?|joules?|J|watts?|Watts?|W|pascals?|Pascals?|Pa|lm|lx|C|volts?|Volts?|V|O|Farads?|F|Wb|T|H|S|bequerels?|Bequerels?|Bq|Gy|Sv|kat|centigrades?|°C|decibels?|db|dB|M|ohms?|Ohms?|\u03a9|sec|seconds?|s|minutes?|min|hour?|h|bits?|Bits?|bit|bytes?|Bytes?|B|bps|Bps)(?=[^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|$)/g,
		function (p, p1, p2, p3) {

			p1 = p1.replace(/ *\/ *()/g, '/');
			p1 = p1.replace(/(\d) *()/g, '$1 ');

			p2 = p2.replace(/yotta/g, 'Y');
			p2 = p2.replace(/zetta/g, 'Z');
			p2 = p2.replace(/exa/g, 'E');
			p2 = p2.replace(/peta/g, 'P');
			p2 = p2.replace(/tera/g, 'T');
			p2 = p2.replace(/giga/g, 'G');
			p2 = p2.replace(/mega/g, 'M');
			p2 = p2.replace(/kilo/g, 'k');
			p2 = p2.replace(/K/g, 'k');
			p2 = p2.replace(/hecto/g, 'h');
			p2 = p2.replace(/deca/g, 'da');
			p2 = p2.replace(/deci/g, 'd');
			p2 = p2.replace(/centi/g, 'c');
			p2 = p2.replace(/mill?i/g, 'm');
			p2 = p2.replace(/micro|u/g, 'µ');
			p2 = p2.replace(/nano/g, 'n');
			p2 = p2.replace(/pico/g, 'p');
			p2 = p2.replace(/femto/g, 'f');
			p2 = p2.replace(/atto/g, 'a');
			p2 = p2.replace(/zepto/g, 'z');
			p2 = p2.replace(/yocto/g, 'y');
			p2 = p2.replace(/mibi/g, 'mebi');

			p3 = p3.replace(/gramm?s?/g, 'g');
			p3 = p3.replace(/metres?|meters?/g, 'm');
			p3 = p3.replace(/amperes?|Amperes?|amps?|Amps?/g, 'A');
			p3 = p3.replace(/Angstroms?|Angströms?/g, 'Å');
			p3 = p3.replace(/Kelvins?|kelvins?/g, 'K');
			p3 = p3.replace(/moles?|Moles?/g, 'mol');
			p3 = p3.replace(/candelas?/g, 'cd');
			p3 = p3.replace(/Hert?z|hert?z/g, 'Hz');
			p3 = p3.replace(/newtons?|Newtons?/g, 'N');
			p3 = p3.replace(/Joules?|joules?/g, 'J');
			p3 = p3.replace(/watts?|Watts?/g, 'W');
			p3 = p3.replace(/pascals?|Pascals?/g, 'Pa');
			p3 = p3.replace(/volts?|Volts?/g, 'V');
			p3 = p3.replace(/ohms?|Ohms?/g, '\u03a9');
			p3 = p3.replace(/bequerels?|Bequerels?/g, 'Bq');
			p3 = p3.replace(/Farads?/g, 'F');
			p3 = p3.replace(/bits?|Bits?/g, 'bit');
			p3 = p3.replace(/bytes?|Bytes?/g, 'B');
			p3 = p3.replace(/sec|seconds?/g, 's');
			p3 = p3.replace(/minutes?/g, 'min');
			p3 = p3.replace(/hours?/g, 'h');
			p3 = p3.replace(/sec|seconds?/g, 's');
			p3 = p3.replace(/bps/g, 'bit/s');
			p3 = p3.replace(/Bps/g, 'B/s');

			return(p1 + p2 + p3);
		}
	);

// fix prefix casing
	obj.plain = obj.plain.replace(/ K(bit\/s|B\/s)([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|$)/g, ' k$1$2');
	obj.plain = obj.plain.replace(/ m(bit\/s|B\/s)([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|$)/g, ' M$1$2');
	obj.plain = obj.plain.replace(/ g(bit\/s|B\/s)([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|$)/g, ' G$1$2');
	obj.plain = obj.plain.replace(/ t(bit\/s|B\/s)([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|$)/g, ' T$1$2');
	obj.plain = obj.plain.replace(/ e(bit\/s|B\/s)([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|$)/g, ' E$1$2');

	return;
}


//
// WikEdFixDashes: fixes dashes and minus signs
//

window.WikEdFixDashes = function(obj) {

	WikEdFixBasic(obj);

// convert html character entities into actual dash characters
	obj.plain = obj.plain.replace(/&amp;mdash;/g, '—');
	obj.plain = obj.plain.replace(/&amp;ndash;/g, '–');
	obj.plain = obj.plain.replace(/&amp;minus;/g, '\u2212');

// remove spaces around em dashes
	obj.plain = obj.plain.replace(/([a-zA-Z\'\"”\]\}\)])( |&amp;nbsp;)*—( |&amp;nbsp;)*([a-zA-Z\'\"“\[\{\(])/g, '$1—$4');

// convert -- to em dashes
	obj.plain = obj.plain.replace(/([a-zA-Z\'\"”\]\}\)])( |&amp;nbsp;)*--( |&amp;nbsp;)*([a-zA-Z\'\"“\[\{\(])/g, '$1—$4');

// convert hyphen next to lone number into a minus sign character
	obj.plain = obj.plain.replace(/([a-zA-Z\'\"”\]\>] ) *(\u2212|–)(\d)/g, '$1\u2212$3');

// convert minus or en dashes to dashes with spaces
	obj.plain = obj.plain.replace(/([a-zA-Z\'\"”\]\}])( |&amp;nbsp;)*(\u2212|–)( |&amp;nbsp;)*([a-zA-Z\'\"“\[\{])/g, '$1 – $5');

// convert dashes to en dashes in dates
	obj.plain = obj.plain.replace(/(^|[ \(\|])(\d\d(\d\d)?)(\u2212|-|–)(\d\d)(\u2212|-|–)(\d\d(\d\d)?)([ \)\}\|,.;—]|$)/gm, '$1$2–$5–$7$9');

	return;
}


//
// WikEdFixHTML: fix html to wikicode
//

window.WikEdFixHTML = function(obj) {

	WikEdFixBasic(obj);

// remove syntax highlighting
	obj.html = obj.plain;
	obj.html = obj.html.replace(/\n/g, '<br />');
	WikEdRemoveHighlighting(obj);

// keep <br> in blockquote
	obj.html = obj.html.replace(/(&lt;blockquote\b.*?&gt;)([\S\s]*?)(&lt;\/blockquote&gt;)/gi,
		function (p, p1, p2, p3) {
			p2 = p2.replace(/&lt;(br\b.*?)&gt;<br\b[^>]*>/g, '\x00$1\x01\n');
			return(p1 + p2 + p3);
		}
	);

// keep <br> in tables (and certain templates!?)
	obj.html = obj.html.replace(/(<br\b[^>]*>\|)([^\}][\S\s]*?)(?=<br\b[^>]*>\|)/gi,
		function (p, p1, p2) {
			p2 = p2.replace(/&lt;(br\b.*?)&gt;/g, '\x00$1\x01');
			return(p1 + p2);
		}
	);

// detect outermost template tags
	var depth = 0;
	obj.html = obj.html.replace(/((\{\{)|\}\})/g,
		function (p, p1, p2) {
			if (p2 != '') {
				depth ++;
				if (depth == 1) {
					return('<!--wikEdOuterTemplateStart-->' + p1);
				}
				return(p1);
			}
			depth --;
			if (depth == 0) {
				return(p1 + '<!--wikEdOuterTemplateEnd-->');
			}
			return(p1);
		}
	);

// keep <br> in templates
	obj.html = obj.html.replace(/<!--wikEdOuterTemplateStart-->([\S\s]*?)<!--wikEdOuterTemplateEnd-->/g,
		function (p, p1) {
			return(p1.replace(/&lt;(br\b.*?)&gt;/g, '\x00$1\x01'));
		}
	);

// detect outermost table tags
	var depth = 0;
	obj.html = obj.html.replace(/(((^|<br\b[^>]*>)\{\|)|<br\b[^>]*>\|\})/g,
		function (p, p1, p2, p3) {
			if (p2 != '') {
				depth ++;
				if (depth == 1) {
					return('<!--wikEdOuterTableStart-->' + p1);
				}
				return(p1);
			}
			depth --;
			if (depth == 0) {
				return(p1 + '<!--wikEdOuterTableEnd-->');
			}
			return(p1);
		}
	);

// keep <br> in tables
	obj.html = obj.html.replace(/<!--wikEdOuterTableStart-->([\S\s]*?)<!--wikEdOuterTableEnd-->/g,
		function (p, p1) {
			return('(--' + p1.replace(/&lt;(br\b.*?)&gt;/g, '\x00$1\x01') + '--)');
		}
	);

// turn visible html code into real html, exclude comments
	obj.html = obj.html.replace(/&lt;(\/?\w.*?)&gt;/g, '<$1>');

// restore valid <br>s
	obj.html = obj.html.replace(/\x00(.*?)\x01/g, '&lt;$1&gt;');

// wikify, keep user added attribute
	WikEdWikifyHTML(obj, true);

// turn real html into visible html code
	obj.html = obj.html.replace(/<br\b[^>]*>[\r\n ]*()/g, '\n');
	obj.html = obj.html.replace(/</g, '&lt;');
	obj.html = obj.html.replace(/>/g, '&gt;');
	obj.plain = obj.html;

	return;
}


//
// WikEdFixCaps: fix capitalizing of lists, linklists, images, headings
//

window.WikEdFixCaps = function(obj) {

	WikEdFixBasic(obj);

// uppercase lists
// start (listcode (char-ent|tag|category..|digit|non-word,non-ret))(word,non-digit..) end
	obj.plain = obj.plain.replace(/^((\||[\*\#\:\;]+)[ \'\"]*(\'+|\&\w+\;|&lt;[^\n]*?&gt;|\{\{.*?\}\}[^\n]*|\d|[^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\n])*)([^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\d\n\r].*?)?$/gm,
		function (p, p1, p2, p3, p4) {
			if (p4.match(/^(http|ftp|alpha|beta|gamma|delta|epsilon|kappa|lambda|$)/) == null) {

// spaces cannot be added to p1 in above regExp !?
				p4 = p4.replace(/^(\s*)(.*?)$/,
					function (p, p1, p2) {
						p2 = p2.charAt(0).toUpperCase() + p2.substr(1);
						return(p1 + p2);
					}
				);
			}
			return(p1 + p4);
		}
	);

// uppercase link lists (link)
	obj.plain = obj.plain.replace(/^((\||[\*\#\:\;]+)[ \'\"]*\[\[)([^\n]*?)(\]\])/gm,
		function (p, p1, p2, p3,p4) {

// uppercase link
			p3 = p3.replace(/^((\&\w+\;|[^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|\d)*)([a-zA-ZŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9_].*)$/,
				function (p, p1, p2, p3) {
					if (p3.match(/^(http|ftp|alpha|beta|gamma|delta|epsilon|kappa|lambda)/) == null) {
						p3 = p3.charAt(0).toUpperCase() + p3.substr(1);
					}
					return(p1 + p3);
				}
			);

// uppercase comment
			p3 = p3.replace(/(\| *(\&\w+\;|&lt;[^\n]*?&gt;|[^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]|\d)*)([a-zA-ZŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9_].*)$/,
				function (p, p1, p2, p3) {
					if (p3.match(/^(http|ftp|alpha|beta|gamma|delta|epsilon|kappa|lambda)/) == null) {
						p3 = p3.charAt(0).toUpperCase() + p3.substr(1);
					}
					return(p1 + p3);
				}
			);
			return(p1 + p3 + p4);
		}
	);

// uppercase headings
	obj.plain = obj.plain.replace(/^(=+ (\&\w+\;|&lt;[^\n]*?&gt;|\d|[^\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\n])*)([a-zA-ZŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9_].*? =+)$/gm,
		function (p, p1, p2, p3) {
			if (p3.match(/^(http|ftp|alpha|beta|gamma|delta|epsilon|kappa|lambda)/) == null) {
				p3 = p3.charAt(0).toUpperCase() + p3.substr(1);
			}
			return(p1 + p3);
		}
	);

// uppercase images
	regExp = new RegExp('(\\[\\[)((Image|File|' + wikEdText['wikicode Image'] + ')|(' + wikEdText['wikicode File'] + ')):([\\wŠŒŽšœžŸÀ-ÖØ-öø-\\u0220\\u0222-\\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\\u0400-\\u0481\\u048a-\\u04ce\\u04d0-\\u04f5\\u04f8\\u04f9])([^\\n]*\\]\\])', 'igm');
	obj.plain = obj.plain.replace(regExp,
		function (p, p1, p2, p3, p4, p5, p6) {
			if (p3 != '') {
				p3 = wikEdText['wikicode Image'];
			}
			else {
				p4 = wikEdText['wikicode File'];
			}
			return(p1 + p3 + p4 + ':' + p5.toUpperCase() + p6);
		}
	);

	return;
}


//
// WikEdFixTypos: fix typos using the AutoWikiBrowser/RegExTypoFix list (.test() is not faster)
//

window.WikEdFixTypos = function(obj) {

	WikEdFixBasic(obj);

//	split into alternating plain text and {{lang}} template fragments (does not support nested templates)
	var fragment = [];
	var nextPos = 0;
	var regExp = new RegExp('{{\\s*lang\\s*\\|(.|\\n)*?}}', 'gi');
	while ( (regExpMatch = regExp.exec(obj.plain)) != null) {
		fragment.push(obj.plain.substring(nextPos, regExpMatch.index));
		fragment.push(regExpMatch[0]);
		nextPos = regExp.lastIndex;
	}
	fragment.push(obj.plain.substring(nextPos));

// cycle through the RegExTypoFix rules
	for (var i = 0; i < wikEdTypoRulesFind.length; i ++) {

// cycle through the fragments, jump over {{lang}} templates
		for (var j = 0; j < fragment.length; j = j + 2) {
			fragment[j] = fragment[j].replace(wikEdTypoRulesFind[i], wikEdTypoRulesReplace[i]);
		}
	}

// re-assemble text
	obj.plain = fragment.join('');

	return;
}


//
// WikEdFixAll:
//

window.WikEdFixAll = function(obj) {
	WikEdFixBasic(obj);
	WikEdFixUnicode(obj);
	WikEdFixHTML(obj);
	WikEdFixCaps(obj);
	return;
}


//
// WikEdRemoveElements: remove elements by tag name
//

window.WikEdRemoveElements = function(tagNameArray) {

// cycle through the element names
	for (var property in tagNameArray) {
		if ((tagNameArray[property]) != 'string') {
			continue;
		}
		var elementArray = wikEdFrameDocument.getElementsByTagName(tagNameArray[property]);
		for (var i = 0; i < elementArray.length; i ++) {
			elementArray[i].parentNode.removeChild(elementArray[i]);
		}
	}
	return;
}


//
// WikEdFindBoundaries: find word boundaries and line boundaries starting from selection.range
//

window.WikEdFindBoundaries = function(word, line, para, whole, selection) {

// get the start node and offset
	var startNode = selection.range.startContainer;
	var startNodeOffset = selection.range.startOffset;

// get the end node and offset
	var endNode = selection.range.endContainer;
	var endNodeOffset = selection.range.endOffset;

//// todo: when selecting whole lines with BR do not walk into next line

	if (startNode.nodeType == 1) {
		startNode = startNode.childNodes[startNodeOffset];
		startNodeOffset = 0;
	}
	if (endNode.nodeType == 1) {
		endNode = endNode.childNodes[endNodeOffset];
		endNodeOffset = 0;
	}

// find the start and end nodes in the whole plain text arrays
	var startNodeIndex;
	var endNodeIndex;
	for (var i = 0; i < whole.plainNode.length; i ++) {
		if (startNode == whole.plainNode[i]) {
			startNodeIndex = i;
		}
		if (endNode == whole.plainNode[i]) {
			endNodeIndex = i;
			break;
		}
	}

// find last previous word and line boundary
	var foundWord = false;
	var foundLine = false;
	var foundPara = false;
	var regExp = new RegExp('.*[^\\w\\-ŠŒŽšœžŸÀ-ÖØ-öø-\\u0220\\u0222-\\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\\u0400-\\u0481\\u048a-\\u04ce\\u04d0-\\u04f5\\u04f8\\u04f9]', 'g');
	var plainPrev = '';

// check text nodes left-wise for a boundary
	var plain = '';
	for (var i = startNodeIndex; i >= 0; i --) {
		plainPrev = plain;
		plain = whole.plainArray[i];
		plain = plain.replace(/&amp;/g, '&');
		plain = plain.replace(/&lt;/g, '<');
		plain = plain.replace(/&gt;/g, '>');

// boundary is a new paragraph
		if ( (plainPrev == '\n') && (plain == '\n') ) {
			para.range.setStartAfter(whole.plainNode[i + 1]);
			foundPara = true;
			break;
		}

// boundary is a newline
		else if (plain == '\n') {
			if (foundWord == false) {
				word.range.setStartAfter(whole.plainNode[i]);
				foundWord = true;
			}
			if (foundLine == false) {
				line.range.setStartAfter(whole.plainNode[i]);
				foundLine = true;
			}
		}

// check text node for a word boundary
		else if (foundWord == false) {
			if (i == startNodeIndex) {
				plain = plain.substr(0, startNodeOffset);
			}
			regExp.lastIndex = 0;
			if (regExp.exec(plain) != null) {
				word.range.setStart(whole.plainNode[i], regExp.lastIndex);
				foundWord = true;
			}
		}
	}

// boundary is start of text
	if (foundPara == false) {
		para.range.setStartBefore(whole.plainNode[0]);
	}
	if (foundLine == false) {
		line.range.setStartBefore(whole.plainNode[0]);
	}
	if (foundWord == false) {
		word.range.setStartBefore(whole.plainNode[0]);
	}

// find next word and line boundary
	regExp = new RegExp('[^\\w\\-ŠŒŽšœžŸÀ-ÖØ-öø-\\u0220\\u0222-\\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\\u0400-\\u0481\\u048a-\\u04ce\\u04d0-\\u04f5\\u04f8\\u04f9]', 'g');
	foundWord = false;
	foundLine = false;
	foundPara = false;

// check text nodes right-wise for a boundary
	plain = '';
	for (var i = endNodeIndex; i < whole.plainArray.length; i ++) {
		plainPrev = plain;
		plain = whole.plainArray[i];
		plain = plain.replace(/&amp;/g, '&');
		plain = plain.replace(/&lt;/g, '<');
		plain = plain.replace(/&gt;/g, '>');

// boundary is a double newline
		if ( (plainPrev == '\n') && (plain == '\n') ) {
			para.range.setEndBefore(whole.plainNode[i]);
			foundPara = true;
			break;
		}

// boundary is a newline
		else if (plain == '\n') {
			if (foundWord == false) {
				word.range.setEndBefore(whole.plainNode[i]);
				foundWord = true;
			}
			if (foundLine == false) {
				line.range.setEndBefore(whole.plainNode[i]); //// crashes for empty selection
				foundLine = true;
			}
		}

// check text node for a word boundary
		else if (foundWord == false) {
			if (i == endNodeIndex) {
				regExp.lastIndex = endNodeOffset;
			}
			else {
				regExp.lastIndex = 0;
			}
			var regExpArray = regExp.exec(plain);
			if (regExpArray != null) {
				word.range.setEnd(whole.plainNode[i], regExpArray.index);
				foundWord = true;
			}
		}
	}

// boundary is end of text
	if (foundPara == false) {
		para.range.setEndAfter(whole.plainNode[whole.plainArray.length - 1]);
	}
	if (foundLine == false) {
		line.range.setEndAfter(whole.plainNode[whole.plainArray.length - 1]);
	}
	if (foundWord == false) {
		word.range.setEndAfter(whole.plainNode[whole.plainArray.length - 1]);
	}

	return;
}


//
// remove syntax highlighting and wikify
//

window.WikEdRemoveHighlightingWikify = function(obj, wikify) {

	if ( (obj.html != '') || (wikify == true) ) {

// <div>...</div> to <br> for Safari, Chrome, WebKit
		if ( (wikEdSafari == true) || (wikEdChrome == true) || (wikEdWebKit == true) ) {
			var isRemove = [];
			obj.html = obj.html.replace(/(<(\/?)div\b([^>]*)>)/g,
				function (p, p1, p2, p3) {
					if (p2 == '') {
						if (p3 == '') {
							isRemove.push(true);
							return('\x00');
						}
						isRemove.push(false);
						return(p1);
					}
					if (isRemove.pop() == true) {
						return('\x01');
					}
					return(p1);
				}
			);
			obj.html = obj.html.replace(/\x01\x00/g, '\x01');
			obj.html = obj.html.replace(/[\x00\x01]/g, '<br>');
		}

// remove syntax highlighting
		WikEdRemoveHighlighting(obj);

// wikify, don't allow many attributes
		if ( (obj.htmlCode == true) && (wikify != false) ) {
			WikEdWikifyHTML(obj, false);
		}
	}
	return;
}


//
// WikEdWikifyHTML:
//   obj.html contains the text to be wikified
//   expects < > &lt; &gt; &amp;  spaces instead of &nbsp; <br> (not \n)
//   returns <br> (not \n)

/*
	allowed and converted tags:
			br|p
			h1|h2|h3|h4|h5|h6
			hr
			i|dfn|cite|em|var
			b|strong
			table|caption|col|thead|tfoot|tbody|tr|td|th
			dl|dt|dd|li|ol|ul
			a
	not allowed yet:
			bdo|q|kbd|samp|abbr|acronym|label
	other allowed tags:
			big|blockquote|colgroup|center|code|del|div|font|ins|pre|s|small|span|strike|sub|sup|tt|u|rb|rp|rt|ruby
	mediawiki tags (inline/block):
			nowiki|math|noinclude|includeonly|ref|charinsert|fundraising|fundraisinglogo
			gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references

*/

window.WikEdWikifyHTML = function(obj, relaxed) {

	var regExpStr;
	var regExp;
	var regExpMatch;

// delete tags: <style>
	obj.html = obj.html.replace(/<(style)\b[^>]*>.*?<\/\1>/gi, '');

// remove MediaWiki section edit spans
	obj.html = obj.html.replace(/<span[^>]*class=\"editsection\"[^>]*>.*?<\/span>\s*()/gi, '');

// remove MediaWiki heading spans
	obj.html = obj.html.replace(/<span\b[^>]*\bclass=\"mw-headline\"[^>]*>(.*?)<\/span>\s*()/g, '$1');

// remove MediaWiki divs from article top
	obj.html = obj.html.replace(/<h3\b[^>]*\bid=\"siteSub\"[^>]*>.*?<\/h3>\s*()/g, '');
	obj.html = obj.html.replace(/<div\b[^>]*\bid=\"contentSub\"[^>]*>.*?<\/div>\s*()/g, '');
	obj.html = obj.html.replace(/<div\b[^>]*\bid=\"jump-to-nav\"[^>]*>.*?<\/div>\s*()/g, '');

// remove MediaWiki table of contents
	obj.html = obj.html.replace(/<table\b[^>]*?\bid=\"toc\"[^>]*>.*?<\/table>\s*()/g, '');

// remove MediaWiki print footer
	obj.html = obj.html.replace(/<div\b[^>]*?\bclass=\"printfooter\"[^>]*>[^<>\"]+\"<a\b[^>]*>[^<]+<\/a>\"<\/div>\s*()/g, '');

// remove MediaWiki category list tags
	regExp = /<div\b[^>]*\bid=\"catlinks\"[^>]*>(.*?)<\/div>\s*()/g;
	while(regExp.test(obj.html) == true) {
		obj.html = obj.html.replace(regExp, '$1');
	}
	regExp = /<p\b[^>]*?\bclass=\"catlinks\"[^>]*>(.*?)<a\b[^>]*>[^<>]+<\/a>: (.*?)<\/p>/g;
	while(regExp.test(obj.html) == true) {
		obj.html = obj.html.replace(regExp, '$1$2');
	}

// convert MS-Word non-standard lists: *
	obj.html = obj.html.replace(/\s*<p [^>]*>\s*<!--\[if !supportLists\]-->.*?<!--\[endif\]-->\s*(.*?)\s*<\/p>\s*()/g, '* $1\n');

// collect MS-Word footnote texts
	var footnotes = {};
	obj.html = obj.html.replace(/<div\b[^>]* id="ftn(\d+)"[^>]*>\s*<p class="MsoFootnoteText">\s*<a(.|\n)*?<\/a>((.|\n)*?)<\/p>\s*<\/div>/g,
		function(p, p1, p2, p3) {
			footnotes[p1] = p3.replace(/^(\s|<br\b[^>]*>)|(\s|<br\b[^>]*>)$/g, '');
			return('');
		}
	);

// add footnotes as <ref> tags
	obj.html = obj.html.replace(/<a\b[^>]* name="_ftnref(\d+)"[^>]*>(.|\n)*?<!--\[endif\]-->\s*<\/span>\s*<\/span>\s*<\/a>/g,
		function(p, p1) {
			var ref = '&lt;ref name="footnote_' + p1 + '"&gt;' + footnotes[p1] + '&lt;/ref&gt;';
			return(ref);
		}
	);

// remove MS-Word footnote separator
	obj.html = obj.html.replace(/<!--\[if !supportFootnotes\]-->(\s|<br\b[^>]*>)*<hr\b[^>]*>\s*<!--\[endif\]-->(\s|<br\b[^>]*>)*/g, '');

// correct name for MS-Word images
//                             1                                                    2    2                  3      3       4    4                                 1             5            5
	obj.html = obj.html.replace(/(<v:imagedata\b[^>]*? src="[^">]*?[\\\/]clip_image\d+(\.\w+)"[^>]*? o:title="([^">]*)"[^>]*>(.|\s)*?<img\b[^>]*? src="[^">]*?[\\\/])clip_image\d+\.\w+("[^>]*>)/g, '$1$3$2$5');

// convert <div class="poem">...</div> to <poem>...</poem>
	var isPoem = [];
	obj.html = obj.html.replace(/(<(\/?)div\b([^>]*)>)/gi,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (/\bclass=\"poem\"/.test(p3) == true) {
					isPoem.push(true);
					return('<poem>');
				}
				isPoem.push(false);
				return(p1);
			}
			if (isPoem.pop() == true) {
				return('<poem>');
			}
			return(p1);
		}
	);

// sanitize <span> <div> <p>
	obj.html = obj.html.replace(/<(span|div|p)\b *(.*?) *\/?>/gi,
		function (p, p1, p2) {
			return('<' + p1 + WikEdSanitizeAttributes(p1, p2, relaxed) +  '>');
		}
	);

// remove <span> ... </span> pairs withhout attributes
	var isRemove = [];
	obj.html = obj.html.replace(/(<(\/?)span\b([^>]*)>)/gi,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (p3 == '') {
					isRemove.push(true);
					return('');
				}
				isRemove.push(false);
				return(p1);
			}
			if (isRemove.pop() == true) {
				return('');
			}
			return(p1);
		}
	);

// remove <p> ... </p> pairs withhout attributes
	var isRemove = [];
	obj.html = obj.html.replace(/(<(\/?)p\b([^>]*)>)/gi,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (p3 == '') {
					isRemove.push(true);
					return('\x00\x00');
				}
				isRemove.push(false);
				return(p1);
			}
			if (isRemove.pop() == true) {
				return('\x00\x00');
			}
			return(p1);
		}
	);

// escape character entities
	obj.html = obj.html.replace(/&(?!(amp;|lt;|gt;))/g, '&amp;');

// remove comments
	obj.html = obj.html.replace(/<!--.*?-->/g, '');

// <hr> horizontal rule
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<hr\b[^>]*>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00----\x00\x00');

// <i> <em> <dfn> <var> <cite> italic
	obj.html = obj.html.replace(/<(i|em|dfn|var|cite)\b[^>]*>/gi, '\'\'');
	obj.html = obj.html.replace(/<\/(i|em|dfn|var|cite)\b[^>]*>/gi, '\'\'');

// <b> <strong> bold
	obj.html = obj.html.replace(/<(b|strong)\b[^>]*>/gi, '\'\'\'');
	obj.html = obj.html.replace(/<\/(b|strong)\b[^>]*>/gi, '\'\'\'');

// <h1> .. <h6> headings
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(^|\n|<br\b[^>]*>|\x00)(\s|<br\b[^>]*>|\x00)*<h1\b[^>]*>(.*?)<\/h1>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00= $4 =\x00\x00');
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(^|\n|<br\b[^>]*>|\x00)(\s|<br\b[^>]*>|\x00)*<h2\b[^>]*>(.*?)<\/h2>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00== $4 ==\x00\x00');
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(^|\n|<br\b[^>]*>|\x00)(\s|<br\b[^>]*>|\x00)*<h3\b[^>]*>(.*?)<\/h3>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00=== $4 ===\x00\x00');
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(^|\n|<br\b[^>]*>|\x00)(\s|<br\b[^>]*>|\x00)*<h4\b[^>]*>(.*?)<\/h4>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00==== $4 ====\x00\x00');
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(^|\n|<br\b[^>]*>|\x00)(\s|<br\b[^>]*>|\x00)*<h5\b[^>]*>(.*?)<\/h5>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00===== $4 =====\x00\x00');
	obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(^|\n|<br\b[^>]*>|\x00)(\s|<br\b[^>]*>|\x00)*<h6\b[^>]*>(.*?)<\/h6>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00\x00====== $4 ======\x00\x00');

	obj.html = obj.html.replace(/<(h[0-6])\b[^>]*>(.*?)<\/\1>/gi, '$2');

// {{TABLE}}
// convert html tables to wikicode
	if (wikEdTableMode == false) {

// remove <thead> <tbody> <tfoot>
		obj.html = obj.html.replace(/(\s|\x00|<br\b[^>]*>)<\/?(thead|tbody|tfoot)\b[^>]*>(\s|\x00|<br\b[^>]*>)*()/gi, '$1');

// remove <col></col> and <colgroup></colgroup>\s
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<(col)\b[^>]*>.*?<\/\2>(|<br\b[^>]*>|\x00)*()/gi, '');
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<(colgroup)\b[^>]*>.*?<\/\2>(|<br\b[^>]*>|\x00)*()/gi, '');

// line breaks in table cells
		obj.html = obj.html.replace(/(<(td|th|caption)\b[^>]*>)(.*?)(<\/\2>)/gi,
			function(p, p1, p2, p3, p4) {
				p3 = p3.replace(/^(\s|<br\b[^>]*>|\x00>)+/gi, '');
				p3 = p3.replace(/(\s|<br\b[^>]*>|\x00>)+$/gi, '');
				p3 = p3.replace(/<br\b[^>]*> *()/gi, '&lt;br /&gt;');
				return(p1 + p3 + p4);
			}
		);

// remove table closing tags
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<\/(tr|thead|tbody|tfoot)>(\s|<br\b[^>]*>|\x00)*()/gi, '');

// <td> table cells
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<td>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00| ');
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<(td) +([^>]*)>(\s|<br\b[^>]*>|\x00)*()/gi,
			function (p, p1, p2, p3, p4) {
				p3 = WikEdSanitizeAttributes(p2, p3, relaxed);
				if (p3 == '') {
					return('\x00| ');
				}
				else {
					return('\x00|' + p3 + ' | ');
				}
			}
		);

// <th> table cells
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<th>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00| ');
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<(th) +([^>]*)>(\s|<br\b[^>]*>|\x00)*()/gi,
			function (p, p1, p2, p3, p4) {
				p3 = WikEdSanitizeAttributes(p2, p3, relaxed);
				if (p3 == '') {
					return('\x00| ');
				}
				else {
					return('\x00|' + p3 + ' | ');
				}
			}
		);

// <tr> table rows
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<tr>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00|-\x00');
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<(tr) +([^>]*)>(\s|<br\b[^>]*>|\x00)*()/gi,
			function (p, p1, p2, p3, p4) {
				return('\x00|-' + WikEdSanitizeAttributes(p2, p3, relaxed) + '\x00');
			}
		);

// <caption> table caption
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<caption>(\s|<br\b[^>]*>|\x00)*()/gi, '\x00|+ ');
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*<(caption) +([^>]*)>(\s|<br\b[^>]*>|\x00)*()/gi,
			function (p, p1, p2, p3, p4) {
				p3 = WikEdSanitizeAttributes(p2, p3, relaxed);
				if (p3 == '') {
					return('\x00|+ ');
				}
				else {
					return('\x00|+' + p3 + ' | ');
				}
			}
		);

// remove closing tags
		obj.html = obj.html.replace(/\s*<\/(td|th|caption)>\s*()/gi, '');

// line breaks, also in table cells (continued)
		obj.html = obj.html.replace(/<br\b[^>]*>[\r\n ]*()/gi, '\x00');

// <table>
		obj.html = obj.html.replace(/[\s\x00]*<table>[\s\x00]*(\|-(?=[\n\x00]))?/gi, '\x00\x00{|\x00');
		obj.html = obj.html.replace(/[\s\x00]*<(table) +([^>]*)>[\s\x00]*(\|-(?=[\n\x00]))?/gi,
			function (p, p1, p2) {
				var table = '\x00\x00{|';
				if (wikEdWikifyTableParameters != '') {
					table += ' ' + wikEdWikifyTableParameters;
				}
				else {
					table += WikEdSanitizeAttributes(p1, p2);
				}
				return(table);
			}
		);
		obj.html = obj.html.replace(/[\s\x00]*<\/table>[\s\x00]*()/gi, '\x00|}\x00\x00');

	}

// for table mode override pasted table class // {{TABLE}}
	else if (wikEdTableMode == true) {
		obj.html = obj.html.replace(/(<table\b)([^>]*)(>)/gi,
			function (p, p1, p2, p3) {
				if (p2.match(/\bclass=/)) {
					p2 = p2.replace(/\bclass\s*=\s*([\'\"]?)[^<>\'\"\n]*?\2/g, 'class="wikEdTableEdit"');
				}
				else {
					p2 = ' class="wikEdTableEdit"';
				}
				return(p1 + p2 + p3);
			}
		);

// table block element needs only one newline
		obj.html = obj.html.replace(/(\s|<br\b[^>]*>|\x00)*(<table\b[^>]*>)/gi, '\x00\x00$2');
		obj.html = obj.html.replace(/(<\/table>)(\s|<br\b[^>]*>|\x00)*()/gi, '$1\x00');
	}

// line breaks (continued)
	if (wikEdTableMode == true) {
		obj.html = obj.html.replace(/<br\b[^>]*>[\r\n ]*()/gi, '\x00');
	}

// convert links
	var regExpMatch = [];
	var regExpStr = '(<a(\\b[^>]*)>(.*?)</a>)';
	var regExp = new RegExp(regExpStr, 'gi');
	obj.html = obj.html.replace(regExp,
		function (p, p1, p2, p3) {
			var linkParam = p2;
			var linkText = p3;
			var hrefUrlParam;
			var hrefUrlArticle;
			var imgWidth = '';
			var hrefParamTitle;
			var hrefParamISBN;
			var hrefParamSpecial;
			var linkArticleAnchor = '';
			var linkArticle = '';
			var linkTitle = '';

// get href value
			var hrefValue;
			regExpMatch = linkParam.match(/ href=\"([^\">]*)\"/);
			if (regExpMatch != null) {
				hrefValue = regExpMatch[1];

// get absolute path from ./index.php and ../../index.php
				hrefValue = WikEdRelativeToAbsolutePath(hrefValue);

// check for wiki article link and get parameters
//                                 1                        2 article   2                       3article 314 anchor 4                          6                       7   8 urlpar 87539 anchor 9
				regExpStr = wikEdServer + '(' + wikEdArticlePath + '([^\\"\\?#]+)|' + wikEdScript + '\\?([^\\"#]*))(#[^\\"]*)?';
				regExp = new RegExp(regExpStr);
				regExpMatch = regExp.exec(hrefValue);
				if (regExpMatch != null) {

// article name from url path <a href="../wiki/ hrefUrlArticle ">
					if (regExpMatch[2] != null) {
						hrefUrlArticle = regExpMatch[2];
					}

// article name from url parameters <a href="url? hrefUrlParam ">
					else if (regExpMatch[3] != null) {
						hrefUrlParam = regExpMatch[3];
					}

// link anchor <a href="link #anchor">
					if (regExpMatch[4] != null) {
						linkArticleAnchor = regExpMatch[4];
						linkArticleAnchor = linkArticleAnchor.replace(/\.([0-9A-F]{2})/g, '%$1');
						linkArticleAnchor = decodeURIComponent(linkArticleAnchor);
						linkArticleAnchor = linkArticleAnchor.replace(/_\d+$/g, '');
					}

// parse hrefUrlParam and check for special parameters
					if (hrefUrlParam != null) {
						regExp = new RegExp('(^|&amp;)(\\w+)=([^\\"\\&]+)', 'g');
						while ( (regExpMatch = regExp.exec(hrefUrlParam)) != null) {
							switch (regExpMatch[2]) {
								case 'title':
									hrefParamTitle = regExpMatch[3];
									break;
								case 'isbn':
									hrefParamISBN = regExpMatch[3];
									break;
								case 'redlink':
									break;
								case 'action':
									hrefParamAction = regExpMatch[3];
									if (hrefParamAction == 'edit') {
										break;
									}
								default:
									hrefParamSpecial = true;
							}
						}
					}

// ISBN links
					if ( (hrefParamISBN != null) && (hrefParamSpecial != true) ) {
						var isbn = hrefParamISBN;
						regExpMatch = /((\d\-?){13}|(\d\-?){10})/.exec(linkText);
						if (regExpMatch != null) {
							isbn = regExpMatch[1];
						}
						return('ISBN ' + isbn);
					}

// get article from href parameters
					else if ( (hrefParamTitle != null) && (hrefParamSpecial != true) ) {
						linkArticle = hrefParamTitle;
						linkArticle = linkArticle.replace(/_/g, ' ');
						linkArticle = decodeURIComponent(linkArticle);
					}

// get article name from url path
					else if (hrefUrlArticle != null) {
						linkArticle = hrefUrlArticle;
						linkArticle = linkArticle.replace(/_/g, ' ');
						linkArticle = decodeURIComponent(linkArticle);
					}

// get article name from <a title="">
					else {
						regExpMatch = / title=\"([^\">]+)\"/.exec(linkParam);
						if (regExpMatch != null) {
							linkArticle = regExpMatch[1];
						}
					}
				}

// format wiki link
				if (linkArticle != '') {

// check for wiki image
					regExpStr = '^<img\\b[^>]*?\\bwidth=\\"(\\d+)\\"[^>]*?>$';
					regExp = new RegExp(regExpStr);
					regExpMatch = regExp.exec(linkText);
					if (regExpMatch != null) {
						imgWidth = regExpMatch[1];
						imgWidth = '|' + imgWidth + 'px';
						if ( (linkTitle != '') && (linkTitle != 'Enlarge') ) {
							linkTitle = '|' + linkTitle;
							return('[[' + linkArticle + imgWidth + linkTitle + ']]');
						}
						else {
							return('[[' + linkArticle + imgWidth + ']]');
						}
					}

// category link
					var regExp = new RegExp('^(Category|' + wikEdText['wikicode Category'] + ')\\s*:(.*)', 'i');
					regExpMatch = regExp.exec(linkArticle);
					if (regExpMatch != null) {
						return('[[' + wikEdText['wikicode Category'] + ':' + regExpMatch[1].charAt(0).toUpperCase() + linkText.substr(1) + ']]');
					}

// wiki link
					if (linkArticle == linkText.charAt(0).toUpperCase() + linkText.substr(1)) {
						return('[[' + linkText + linkArticleAnchor + ']]');
					}

// date link (English only)
					regExpMatch = /^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2})$/.exec(linkArticle);
					if (regExpMatch != null) {
						var month = regExpMatch[1];
						var day = regExpMatch[2];
						if (linkText == (day + ' ' + month) ) {
							return('[[' + linkArticle + linkArticleAnchor + ']]');
						}
					}

// lowercase the article name if the first char of the link text can exist in lower/uppercase and is lowercase
					if ( linkText.charAt(0).toLowerCase() != linkText.charAt(0).toUpperCase() ) {
						if ( linkText.charAt(0) == linkText.charAt(0).toLowerCase() ) {
							linkArticle = linkArticle.charAt(0).toLowerCase() + linkArticle.substr(1);
						}
					}

// suffix links
					regExpStr = '^' + linkArticle.replace(/(\W)/g, '\\$1') + '([\\wŠŒŽšœžŸÀ-ÖØ-öø-\\u0220\\u0222-\\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\\u0400-\\u0481\\u048a-\\u04ce\\u04d0-\\u04f5\\u04f8\\u04f9]+)$';
					regExp = new RegExp(regExpStr);
					regExpMatch = regExp.exec(linkText);
					if (regExpMatch != null) {
						return('[[' + linkArticle + linkArticleAnchor + ']]' + regExpMatch[1]);
					}
					return('[[' + linkArticle + linkArticleAnchor + '|' + linkText + ']]');
				}

// external link
				if (hrefValue != '') {

// PubMed link
					regExpMatch = /^http:\/\/www\.ncbi\.nlm\.nih\.gov\/entrez\/query\.fcgi\?cmd=Retrieve&amp;db=pubmed&amp;.*?&amp;list_uids=(\d+)/.exec(hrefValue);
					if (regExpMatch != null) {
						return('PMID ' + regExpMatch[1]);
					}

// DOI link
					regExpMatch = /^http:\/\/dx\.doi\.org\/(.*)/.exec(hrefValue);
					if (regExpMatch != null) {
						return('{{doi|' + regExpMatch[1] + '}}');
					}

// other external link
					return('[' + hrefValue + ' ' + linkText + ']');
				}
			}

// return unchanged text
			return(p1);
		}
	);

// clean up MediaWiki category list
	var regExp = new RegExp('<span\\b[^>]*>(\\[\\[(Category|' + wikEdText['wikicode Category'] + ')\\s*:[^\\]]+\\]\\])<\\/span>[\\s\\x00\\|]*', 'gi');
	obj.html = obj.html.replace(regExp, '$1\x00');

// clean up DOI
	obj.html = obj.html.replace(/\[\[Digital object identifier\|DOI\]\]:(\{\{doi\|[^\}\s]+\}\})/gi, '$1');

// convert images
	obj.html = obj.html.replace(/<img\b([^>]*)>/gi,
		function (p, p1) {

// get and format parameters
			var address = '';
			var regExpMatch = /\bsrc\s*=\s*(\'|\")([^\'\"]*)(\'|\")/i.exec(p1);
			if (regExpMatch != null) {
				address = regExpMatch[2].replace(/^ +| +$/g, '');
			}

			var imgAlt = '';
			regExpMatch = /\balt\s*=\s*(\'|\")([^\'\"]*)(\'|\")/i.exec(p1);
			if (regExpMatch != null) {
				imgAlt = regExpMatch[2].replace(/^ +| +$/g, '');
				imgAlt = imgAlt.replace(/&amp;nbsp;|[\n\x00]/g, ' ');
				imgAlt = imgAlt.replace(/ {2,}/g, ' ');
				imgAlt = imgAlt.replace(/^ | $/g, '');
				if (imgAlt != '') {
					imgAlt = '|' + imgAlt;
				}
			}

			var imgWidth = '';
			regExpMatch = /\bwidth\s*=\s*(\'|\")([^\'\"]*)(\'|\")/i.exec(p1);
			if (regExpMatch != null) {
				imgWidth = '|' + regExpMatch[2].replace(/^ +| +$/g, '') + 'px';
			}

			var imgLink = '';
			regExpMatch = /([^\/]+)$/.exec(address);
			if (regExpMatch != null) {
				imgLink = regExpMatch[1];
				if (imgLink != '') {
					return('[[' + wikEdText['wikicode Image'] + ':' + imgLink + imgWidth + imgAlt + ']]');
				}
			}
			return('');
		}
	);

// convert lists: * # : ;
	var listObj = {};
	listObj.prefix = '';
	obj.html = obj.html.replace(/[\s\x00]*<(\/?(ol|ul|li|dl|dd|dt))\b[^>]*>[\s\x00]*()/gi,
		function (p, p1, p2, p3, p4) {
			switch (p1.toLowerCase()) {
				case 'ol':
					listObj.prefix += '#';
					return('\x00');
				case 'ul':
					listObj.prefix += '*';
					return('\x00');
				case 'dl':
					listObj.prefix += ':';
					return('\x00');
				case '/ol':
				case '/ul':
				case '/dl':
					listObj.prefix = listObj.prefix.substr(0, listObj.prefix.length - 1);
					return('\x00\x00');
				case 'li':
				case 'dd':
					return('\x00' + listObj.prefix + ' ');
				case 'dt':
					return('\x00' + listObj.prefix.replace(/:$/, ';') + ' ');
				case '/li':
				case '/dt':
				case '/dd':
					return('');
			}
			return('');
		}
	);
	obj.html = obj.html.replace(/[\n|\x00]+[#\*:\;]+ (?=[\n|\x00])/g, '');

// <> remove not allowed tags
	obj.html = obj.html.replace(/(<\/?)(\/?)(\w+)(.*?>)/g,
		function (p, p1, p2, p3, p4) {
			if (wikEdTableMode == true) {
				if ( /^(table|tr|td|th|thead|tbody|tfoot|col|colgroup|caption)$/i.test(p3) ) {
					var tag = p1 + p2 + p3 + p4;
					tag = tag.replace(/</g, '\x01');
					tag = tag.replace(/>/g, '\x02');
					return(tag);
				}
				else {
					return('');
				}
			}
			else if ( /^(big|blockquote|colgroup|center|code|del|div|font|ins|p|pre|s|small|span|strike|sub|sup|tt|u|rb|rp|rt|ruby|nowiki|math|noinclude|includeonly|ref|charinsert|fundraising|fundraisinglogo|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)$/i.test(p3) ) {
				return(p1 + p2 + p3 + p4);
			}
			else {
				return('');
			}
		}
	);

// sanitize attributes in opening html tags
	obj.html = obj.html.replace(/<(\w+) +(.*?) *(\/?)>/g,
		function (p, p1, p2, p3) {
			if (p3 != '') {
				p3 = ' ' + p3;
			}
			return('<' + p1 + WikEdSanitizeAttributes(p1, p2, relaxed) + p3 + '>');
		}
	);

// unformat underlined, italic or bold blanks
	obj.html = obj.html.replace(/<u>(\'\'\'|\'\'|\s|\x00)*([\s\x00]+)(\'\'\'|\'\'|\s|\x00)*<\/u>/g, '$2');
	obj.html = obj.html.replace(/\'\'\'(\'\'|\s|\x00)*([\s\x00]+)(\'\'|\s|\x00)*\'\'\'/g, '$2');
	obj.html = obj.html.replace(/\'\'([\s\x00]+)\'\'/g, '$1');

// fix MS Word non-style heading formatting
	obj.html = obj.html.replace(/(\x00(={1,6}) *)(<u>|\'\'\'|\'\')+(.*?)(<\/u>|\'\'\'|\'\')+( *\2\x00)/gi, '$1$4$6');

// remove empty headings
	obj.html = obj.html.replace(/\x00(={1,6})\s+\1\x00/g, '\x00');

// remove space-only lines
	obj.html = obj.html.replace(/([\s\x00]*\x00[\s\x00]*)/g,
		function (p, p1) {
			return(p1.replace(/\n/g, '\x00'));
		}
	);
	obj.html = obj.html.replace(/\x00\s+/g, '\x00');
	obj.html = obj.html.replace(/\s+(?=\x00)/g, '\x00');

// remove trailing linebreaks from table cells
	obj.html = obj.html.replace(/\x00{2,}(\|)/g, '\x00$1');

// remove leading and trailing spaces
	obj.html = obj.html.replace(/>\s+\x00/g, '>\x00');
	obj.html = obj.html.replace(/\x00\s+</g, '\x00<');

// remove empty inline and block tag pairs
	obj.html = obj.html.replace(/( *)<(big|colgroup|code|del|font|ins|pre|s|small|span|strike|sub|sup|tt|u|rb|rp|rt|ruby|nowiki|math|noinclude|includeonly|ref|charinsert|fundraising|fundraisinglogo)\b[^>]*><\/\1> *()/gi, '$1');
	obj.html = obj.html.replace(/[\s\x00]*<(blockquote|center|div|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)\b[^>]*><\/\1>[\s\x00]*()/gi, '\x00\x00');

// remove empty lines from block tags
	obj.html = obj.html.replace(/(<(blockquote|center|div|p|pre|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)\b[^>]*>[\s\x00])[\s\x00]+/gi, '$1');
	obj.html = obj.html.replace(/[\s\x00]+([\s\x00]<\/(blockquote|center|div|p|pre|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)>)/gi, '$1');

// blockquote
	obj.html = obj.html.replace(/(<blockquote\b[^>]*>[\s\x00]+)([\S\s]*?)([\s\x00]+<\/blockquote>)/gi,
		function (p, p1, p2, p3) {
			p2 = p2.replace(/\x00/g, '<br>\n');
			return(p1 + p2 + p3);
		}
	);

// escape < >
	obj.html = obj.html.replace(/</g, '&lt;');
	obj.html = obj.html.replace(/>/g, '&gt;');

// preserved table tags
	obj.html = obj.html.replace(/\x01/g, '<');
	obj.html = obj.html.replace(/\x02/g, '>');

// newlines to <br />
	obj.html = obj.html.replace(/\x00+\n/g, '\n');
	obj.html = obj.html.replace(/\n\x00+/g, '\n');
	obj.html = obj.html.replace(/\n*\x00(\x00|\n)+/g, '\n\n');
	obj.html = obj.html.replace(/\x00/g, '\n');
	obj.html = obj.html.replace(/\n/g, '<br />');

// table block element needs only one newline
	obj.html = obj.html.replace(/(<\/table><br\b[^>]*>)(<br\b[^>]*>)+/g, '$1');

// remove empty lines from article start and end
	if (obj.from == 'whole') {
		obj.html = obj.html.replace(/^(<br\b[^>]*>)+/gi, '');
		obj.html = obj.html.replace(/(<br\b[^>]*>)+$/gi, '');
	}

	return;
}


//
// WikEdRelativeToAbsolutePath
//   broken for editing article names containing "/", https://bugzilla.mozilla.org/show_bug.cgi?id=430910

window.WikEdRelativeToAbsolutePath = function(relativePath, fullPath) {

	var absolutePath = '';

// get current url
	if (fullPath == null) {
		fullPath = window.location.href;
		fullPath = fullPath.replace(/#.*/, '');
		fullPath = fullPath.replace(/\?.*/, '');
	}

// ./index.php
	if (/^\.\/()/.test(relativePath) == true) {
		relativePath = relativePath.replace(/^\.\/()/, '');
		fullPath = fullPath.replace(/\/[^\/]*$/, '');
		absolutePath = fullPath + '/' + relativePath;
	}

// ../../index.php
	else if (/^\.\.\/()/.test(relativePath) == true) {
		while (/^\.\.\/()/.test(relativePath) == true) {
			relativePath = relativePath.replace(/^\.\.\/()/, '');
			fullPath = fullPath.replace(/\/[^\/]*$/, '');
		}
		absolutePath = fullPath + '/' + relativePath;
	}

// full path
	else {
		absolutePath = relativePath;
	}
	return(absolutePath);
}


//
// WikEdSanitizeAttributes: see Sanitizer.php
//

window.WikEdSanitizeAttributes = function(tag, attributes, relaxed) {
	var common;
	var tablealign;
	var tablecell;
	var table;
	if (relaxed == true) {
		common = 'dir|style|class'; // not needed: lang|id|title
		tablealign = '|align|char|charoff|valign';
		table = '|summary|width|border|frame|rules|cellspacing|cellpadding|align|bgcolor';
		tablecell = '|abbr|axis|headers|scope|rowspan|colspan|nowrap|width|height|bgcolor';
	}
	else {
		common = 'dir';
		table = '|border|cellspacing|cellpadding|align|bgcolor';
		tablealign = '|align|valign';
		tablecell = '|rowspan|colspan|nowrap|bgcolor';
	}
	tag = tag.toLowerCase();
	var sanitized = '';
	var regExp = /(\w+)\s*=\s*((\'|\")(.*?)\3|(\w+))/g;
	var regExpMatch;
	while ( (regExpMatch = regExp.exec(attributes)) != null) {
		var attrib = regExpMatch[1];
		var attribValue = regExpMatch[4] || regExpMatch[5];
		if (attribValue == '') {
			continue;
		}
		var valid = false;

// relaxed, for existing text tags
		if (relaxed == true) {
			if ('center|em|strong|cite|code|var|sub|supdl|dd|dt|tt|b|i|big|small|strike|s|u|rb|rp|ruby'.indexOf(tag) >= 0) {
				if (common.indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('div|span|h1|h2|h3|h4|h5|h6|p'.indexOf(tag) >= 0) {
				if ((common + '|align').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('blockquote'.indexOf(tag) >= 0) {
				if ((common + '|cite').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('br'.indexOf(tag) >= 0) {
				if ('style|clear'.indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('pre'.indexOf(tag) >= 0) {
				if ((common + '|width').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ins|del'.indexOf(tag) >= 0) {
				if ((common + '|cite|datetime').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ul'.indexOf(tag) >= 0) {
				if ((common + '|type').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ol'.indexOf(tag) >= 0) {
				if ((common + '|type|start').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('li'.indexOf(tag) >= 0) {
				if ((common + '|type|value').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('table'.indexOf(tag) >= 0) {
				if ((common + table).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('caption'.indexOf(tag) >= 0) {
				if ((common + '|align').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('thead|tfoot|tbody'.indexOf(tag) >= 0) {
				if ((common + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('colgroup|col'.indexOf(tag) >= 0) {
				if ((common + '|span|width' + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('tr'.indexOf(tag) >= 0) {
				if ((common + '|bgcolor' + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('td|th'.indexOf(tag) >= 0) {
				if ((common + tablecell + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('font'.indexOf(tag) >= 0) {
				if ((common + '|size|color|face').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('hr'.indexOf(tag) >= 0) {
				if ((common + '|noshade|size|width').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('rt'.indexOf(tag) >= 0) {
				if ((common + '|rbspan').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ref'.indexOf(tag) >= 0) {
				if (('name').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('references'.indexOf(tag) >= 0) {
			}
			else if ('source'.indexOf(tag) >= 0) {
				if (('lang').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('poem'.indexOf(tag) >= 0) {
				if (common.indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('categorytree'.indexOf(tag) >= 0) {
				if ((common + '|mode|depth|onlyroot|hideroot|hideprefix|showcount|namespaces').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('charinsert'.indexOf(tag) >= 0) {
			}
			else if ('fundraising'.indexOf(tag) >= 0) {
			}
			else if ('fundraisinglogo'.indexOf(tag) >= 0) {
			}
			else if ('hiero'.indexOf(tag) >= 0) {
			}
			else if ('imagemap'.indexOf(tag) >= 0) {
			}
			else if ('inputbox'.indexOf(tag) >= 0) {
			}
			else if ('timeline'.indexOf(tag) >= 0) {
			}
			else if ('gallery'.indexOf(tag) >= 0) {
				if ((common + '|perrow|widths|heights').indexOf(attrib) >= 0) { valid = true; }
			}
		}

// strict, for html code to be wikified from external sources (websites, Word)
		else {
			if ('center|em|strong|cite|code|var|sub|supdl|dd|dt|tt|b|i|big|small|strike|s|u|rb|rp|ruby|blockquote|pre|ins|del'.indexOf(tag) >= 0) {
				if (common.indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('div|span|h1|h2|h3|h4|h5|h6|p'.indexOf(tag) >= 0) {
				if ((common + '|align').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('br'.indexOf(tag) >= 0) {
				if ('clear'.indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ul'.indexOf(tag) >= 0) {
				if ((common + '|type').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ol'.indexOf(tag) >= 0) {
				if ((common + '|type|start').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('li'.indexOf(tag) >= 0) {
				if ((common + '|type|value').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('table'.indexOf(tag) >= 0) {
				if ((common + table).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('caption'.indexOf(tag) >= 0) {
				if ((common + '|align').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('thead|tfoot|tbody'.indexOf(tag) >= 0) {
				if ((common + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('colgroup|col'.indexOf(tag) >= 0) {
				if ((common + '|span' + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('tr'.indexOf(tag) >= 0) {
				if ((common + '|bgcolor' + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('td|th'.indexOf(tag) >= 0) {
				if ((common + tablecell + tablealign).indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('font'.indexOf(tag) >= 0) {
				if ((common + '|color').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('hr'.indexOf(tag) >= 0) {
				if ((common + '|noshade|size').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('rt'.indexOf(tag) >= 0) {
				if ((common + '|rbspan').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('ref'.indexOf(tag) >= 0) {
				if (('name').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('references'.indexOf(tag) >= 0) {
			}
			else if ('source'.indexOf(tag) >= 0) {
				if (('lang').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('poem'.indexOf(tag) >= 0) {
				if (common.indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('categorytree'.indexOf(tag) >= 0) {
				if ((common + '|mode|depth|onlyroot|hideroot|hideprefix|showcount|namespaces').indexOf(attrib) >= 0) { valid = true; }
			}
			else if ('charinsert'.indexOf(tag) >= 0) {
			}
			else if ('fundraising'.indexOf(tag) >= 0) {
			}
			else if ('fundraisinglogo'.indexOf(tag) >= 0) {
			}
			else if ('hiero'.indexOf(tag) >= 0) {
			}
			else if ('imagemap'.indexOf(tag) >= 0) {
			}
			else if ('inputbox'.indexOf(tag) >= 0) {
			}
			else if ('timeline'.indexOf(tag) >= 0) {
			}
			else if ('gallery'.indexOf(tag) >= 0) {
			}
		}

// clean up
		if (valid == true) {

// clean up defaults for align
			if (attrib == 'align') {
				if ('tr|td|th'.indexOf(tag) >= 0) {
					if (attribValue == 'left') {
						attribValue = '';
					}
				}
			}

// clean up defaults for valign
			else if (attrib == 'valign') {
				if ('tr|td|th'.indexOf(tag) >= 0) {
					if (attribValue == 'top') {
						attribValue = '';
					}
				}
			}

// clean up style
			else if (attrib == 'style') {

// remove non-standard Mozilla styles
				attribValue = attribValue.replace(/(^| )(-moz-[\w\-]+): [\w\-]+; *()/g, '$1');
				attribValue = attribValue.replace(/(^| )([\w\-]+): [^;]*(-moz-[\w\-]+|windowtext)[^;]*; *()/g, '$1');

// remove dimensions from null values
				attribValue = attribValue.replace(/\b0(%|in|cm|mm|em|ex|pt|pc|px)\b/g, '0');

// remove empty definitions and spaces
				attribValue = attribValue.replace(/[\w\-]+ *\: *\; *()/g, '');
				attribValue = attribValue.replace(/ *(;|:) *()/g, '$1 ');
				attribValue = attribValue.replace(/( |;)+$/g, ';');
			}

// clean up class
			else if (attrib == 'class') {

// remove MS Word classes
				attribValue = attribValue.replace(/^Ms.*$/g, '');
			}

			if (attribValue != '') {
				sanitized += ' ' + attrib + '="' + attribValue + '"';
			}
		}
	}
	return(sanitized);
}


//
//
// WikEdRemoveHighlighting: remove syntax highlighting in obj.html; sets obj.htmlCode if text contains html code
//    expects <br /> instead of \n

window.WikEdRemoveHighlighting = function(obj) {

// remove highlighting and atttribute-free span tags
	var isRemove = [];
	obj.html = obj.html.replace(/(<(\/?)span\b([^>]*)>)/g,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (/\bclass=\"wikEd\w+\"/.test(p3)) {
					isRemove.push(true);
					return('');
				}
				isRemove.push(false);
				return(p1);
			}
			if (isRemove.pop() == true) {
				return('');
			}
			return(p1);
		}
	);

// remove highlighting div tags
	var isRemove = [];
	obj.html = obj.html.replace(/(<(\/?)div\b([^>]*)>)/g,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (/\bclass=\"wikEd\w+\"/.test(p3)) {
					isRemove.push(true);
					return('');
				}
				isRemove.push(false);
				return(p1);
			}
			if (isRemove.pop() == true) {
				return('');
			}
			return(p1);
		}
	);

// remove highlighting pre tags
	var isRemove = [];
	obj.html = obj.html.replace(/(<(\/?)pre\b([^>]*)>)/g,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (/\bclass=\"wikEd\w+\"/.test(p3)) {
					isRemove.push(true);
					return('');
				}
				isRemove.push(false);
				return(p1);
			}
			if (isRemove.pop() == true) {
				return('');
			}
			return(p1);
		}
	);


// comments
	obj.html = obj.html.replace(/<!--wikEd\w+-->/g, '');

// newlines
	obj.html = obj.html.replace(/[\n\r ]+/g, ' ');

// non-breaking spaces
	obj.html = obj.html.replace(/&nbsp;/g, '\xa0');

// check for pasted html content
	if (obj.html.match(/<(?!br\b)/) != null) {
		obj.htmlCode = true;
	}
	else {
		obj.htmlCode = false;
	}
	return;
}


//
// WikEdHighlightSyntax: highlight syntax in obj.html; if singleLine is set, no block syntax will be highlighted; call WikEdRemoveHighlighting first
//   expects < > &lt; &gt; &amp;  \xa0 instead of &nbsp;  \n instead of <br />

window.WikEdHighlightSyntax = function(obj, singleLine) {

	var html = obj.html;

// start timer to cancel after wikEdMaxHighlightTime
	var startDate = new Date();

// MS IE compatibility fix: use \n instead of \r\n
	html = html.replace(/\r\n?/g, '\n');

// &lt; &gt; &amp; to \x00 \x01  \x02
	html = html.replace(/&lt;/g, '\x00');
	html = html.replace(/&gt;/g, '\x01');
	html = html.replace(/&amp;/g, '\x02');

// #REDIRECT
	html = html.replace(/(^|\n)(#)(redirect\b)/gi, '$1<span class="wikEdWikiRedir">$3</span><!--wikEdWikiRedir-->');

// nowiki (no html highlighting)
	html = html.replace(/(\x00nowiki\b.*?\x01)(.*?)(\x00\/nowiki\b.*?\x01)/gi,
		function (p, p1, p2, p3) {
			p2 = p2.replace(/\x00/g, '&lt;');
			p2 = p2.replace(/\x01/g, '&gt;');
			return(p1 + p2 + p3);
		}
	);

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime / 10) {
		return;
	}

// blocks

// lists * # : ;
	html = html.replace(/^((\x00!--.*?--\x01)*)([\*\#\:\;]+)(.*?)$/gm, '<span class="wikEdListLine">$1<span class="wikEdListTag">$3</span><!--wikEdListTag-->$4</span><!--wikEdListLine-->');
	if (singleLine != true) {
		html = html.replace(/((<span class=\"wikEdListLine\">[^\n]*\n)+)/g, '<span class="wikEdListBlock">$1');
		html = html.replace(/(<span class=\"wikEdListLine\">[^\n]*)(\n)(?!<span class=\"wikEdListLine\">)/g, '$1</span><!--wikEdListBlock-->$2');
	}

// #REDIRECT (finish)
	html = html.replace(/(<span class=\"wikEdWikiRedir\">)(.*?<\/span><!--wikEdWikiRedir-->)/g, '$1#$2');

// various blocks
	if (singleLine != true) {
		html = html.replace(/(\x00(blockquote|center|div|pre|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline)\b[^\x01]*\x01.*?\x00\/\2\x01)/gi, '<span class="wikEdBlock">$1</span><!--wikEdBlock-->');
	}

// space-pre
	if (singleLine != true) {
		html = html.replace(/^((\x00!--.*?--\x01)*)[\xa0 ]([\xa0 ]*)(.*?)$/gm, '<span class="wikEdSpaceLine">$1<span class="wikEdSpaceTag">&nbsp;$3</span><!--wikEdSpaceTag-->$4</span><!--wikEdSpaceLine-->');
		html = html.replace(/((<span class=\"wikEdSpaceLine\">[^\n]*\n)+)/g, '<span class="wikEdSpaceBlock">$1');
		html = html.replace(/(<span class=\"wikEdSpaceLine\">[^\n]*)(\n)(?!<span class="wikEdSpaceLine">)/g, '$1</span><!--wikEdSpaceBlock-->$2');
	}

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime / 10) {
		return;
	}

// ---- <hr> horizontal rule
	html = html.replace(/(^|\n)((\x00!--.*?--\x01|<[^>]*>)*)(----)((\x00!--.*?--\x01|<[^>]*>)*)(\n|$)/g, '$1<span class="wikEdHR">$2$4</span><!--wikEdHR-->$5$7');
	html = html.replace(/(\x00hr\x01)/g, '<span class="wikEdHRInline">$1</span><!--wikEdHRInline-->');

// == headings
	html = html.replace(/(^|\n)((\x00!--.*?--\x01|<[^>]*>)*)(=+[\xa0 ]*)([^\n]*?)([\xa0 ]*=+)(?=([\xa0 ]|<[^>]*>|\x00!--.*?--\x01)*(\n|$))/g,
		function (p, p1, p2, p3, p4, p5, p6) {
			p4 = p4.replace(/(=+)/g, '<span class="wikEdWiki">$1</span><!--wikEdWiki-->');
			p6 = p6.replace(/(=+)/g, '<span class="wikEdWiki">$1</span><!--wikEdWiki-->');
			var regExp = new RegExp('^' + wikEdText['External links'] + '?|' + wikEdText['External links'] + '|' + wikEdText['See also'] + '|'  + wikEdText['References'] + '$', 'i');
			if (regExp.test(p5) == true) {
				p1 = p1 + '<span class="wikEdHeadingWp">';
				p6 = p6 + '</span><!--wikEdHeadingWp-->';
			}
			else {
				p1 = p1 + '<span class="wikEdHeading">';
				p6 = p6 + '</span><!--wikEdHeading-->';
			}
			return(p1 + p2 + p4 + p5 + p6);
		}
	);

// tables                                      {|   |+   |-   ! |}            |
//                      12                2 13                      4        4   35   5
	html = html.replace(/^((\x00!--.*?--\x01)*)(\{\||\|\+|\|\-|\!|\|\}([^\}\]]|$)|\|)(.*?)$/gm, '<span class="wikEdTableLine">$1<span class="wikEdTableTag">$3</span><!--wikEdTableTag-->$5</span><!--wikEdTableLine-->');
	if (singleLine != true) {
		html = html.replace(/(^|\n)((<[^>]*>|\x00!--.*?--\x01)*\{\|)/g, '$1<span class="wikEdTableBlock">$2');
		html = html.replace(/(^|\n)((<[^>]*>|\x00!--.*?--\x01)*\|\}(<[^>]*>)*)/g, '$1$2</span><!--wikEdTableBlock-->');
		html = html.replace(/(\x00table\b[^\x01]*\x01)/gi, '<span class="wikEdTableBlock">$1');
		html = html.replace(/(\x00\/table\x01)/gi, '$1</span><!--wikEdTableBlock-->');
	}

// <gallery> wiki markup
	if (singleLine != true) {
		html = html.replace(/(\x00(gallery)\b[^\x01]*\x01)/gi, '<span class="wikEdWiki">$1');
		html = html.replace(/(\x00\/(gallery)\x01)/gi, '$1</span><!--wikEdWiki-->');
	}

// various block tags
	html = html.replace(/(\x00\/?(blockquote|center|div|pre|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline)\b[^\x01]*\x01)/gi, '<span class="wikEdBlockTag">$1</span><!--wikEdBlockTag-->');

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime / 5) {
		return;
	}

// <p> ... </p> pairs with (wikEdBlockTag) and withhout attributes (wikEdUnknown)
	var isRemove = [];
	html = html.replace(/(\x00(\/?)p\b([^\x01]*?)\x01)/g,
		function (p, p1, p2, p3) {
			if (p2 == '') {
				if (p3 == '') {
					isRemove.push(true);
					return('<span class="wikEdUnknown">' + p1 + '</span><!--wikEdUnknown-->');
				}
				if (/\/$/.test(p3)) {
					return('<span class="wikEdUnknown">' + p1 + '</span><!--wikEdUnknown-->');
				}
				isRemove.push(false);
				return('<span class="wikEdBlockTag">' + p1 + '</span><!--wikEdBlockTag-->');
			}
			if (isRemove.pop() == true) {
				return('<span class="wikEdUnknown">' + p1 + '</span><!--wikEdUnknown-->');
			}
			return('<span class="wikEdBlockTag">' + p1 + '</span><!--wikEdBlockTag-->');
		}
	);

// inline elements

// <sup> </sub> <ins> <del>
	html = html.replace(/(\x00sup\b[^\x01]*\x01((.|\n)*?)\x00\/sup\x01)/gi, '<span class="wikEdSuperscript">$1</span><!--wikEdSuperscript-->');
	html = html.replace(/(\x00sub\b[^\x01]*\x01((.|\n)*?)\x00\/sub\x01)/gi, '<span class="wikEdSubscript">$1</span><!--wikEdSubscript-->');
	html = html.replace(/(\x00(ins|u)\b[^\x01]*\x01((.|\n)*?)\x00\/(ins|u)\x01)/gi, '<span class="wikEdIns">$1</span><!--wikEdIns-->');
	html = html.replace(/(\x00(del|s|strike)\b[^\x01]*\x01((.|\n)*?)\x00\/(del|s|strike)\x01)/gi, '<span class="wikEdDel">$1</span><!--wikEdDel-->');

// <ref /> and <ref> wiki markup
	if (wikEdRefHide != true) {
		html = html.replace(/\x00(ref\b[^\x01]*?\/)\x01/gi, '<span class="wikEdRef">&lt;$1&gt;</span><!--wikEdRef-->');
		html = html.replace(/(\x00ref\b[^\x01]*\x01((.|\n)*?)\x00\/ref\x01)/gi, '<span class="wikEdRef">$1</span><!--wikEdRef-->');
	}

// various inline tags
	html = html.replace(/(\x00\/?(sub|sup|ins|u|del|s|strike|big|br|colgroup|code|font|small|span|tt|rb|rp|rt|ruby)\b[^\x01]*\x01)/gi, '<span class="wikEdInlineTag">$1</span><!--wikEdInlineTag-->');

// <references/> wiki markup
	html = html.replace(/\x00((references)\b[^\x01]*?\/)\x01/gi, '<span class="wikEdWiki">&lt;$1&gt;</span><!--wikEdWiki-->');

// wiki markup
	html = html.replace(/(\x00(math|noinclude|includeonly|charinsert|fundraising|fundraisinglogo|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)\b[^\x01]*\x01((.|\n)*?)(\x00)\/\2\x01)/gi, '<span class="wikEdWiki">$1</span><!--wikEdWiki-->');

// unsupported or not needed <> tags
	html = html.replace(/(\x00\/?)(\w+)(.*?\/?\x01)/g,
		function (p, p1, p2, p3) {
			if ( ! /^(col|thead|tfoot|tbody|big|br|blockquote|colgroup|center|code|del|div|font|ins|p|pre|s|small|span|strike|sub|sup|tt|u|rb|rp|rt|ruby|nowiki|math|noinclude|includeonly|ref|charinsert|fundraising|fundraisinglogo|gallery|source|poem|categorytree|hiero|imagemap|inputbox|timeline|references)$/i.test(p2) ) {
				p1 = '<span class="wikEdUnknown">' + p1;
				p3 = p3 + '</span><!--wikEdUnknown-->';
			}
			return(p1 + p2 + p3);
		}
	);

// comments
	html = html.replace(/(\x00!--(.|\n)*?--\x01)/g, '<span class="wikEdComment">$1</span><!--wikEdComment-->');

// named html colors in quotation marks
	html = html.replace(/(\'|\")(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|blanchedalmond|burlywood|chartreuse|coral|cornsilk|cyan|darkgray|darkgrey|darkkhaki|darkorange|darksalmon|darkseagreen|floralwhite|fuchsia|gainsboro|ghostwhite|gold|goldenrod|greenyellow|honeydew|hotpink|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightskyblue|lightsteelblue|lightyellow|lime|linen|magenta|mediumaquamarine|mediumspringgreen|mediumturquoise|mintcream|mistyrose|moccasin|navajowhite|oldlace|orange|palegoldenrod|palegreen|paleturquoise|papayawhip|peachpuff|peru|pink|plum|powderblue|salmon|sandybrown|seashell|silver|skyblue|snow|springgreen|tan|thistle|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)(\1)/g, '$1<span style="background-color: $2;" class="wikEdColorsLight">$2</span><!--wikEdColorsLight-->$3');
	html = html.replace(/(\'|\")(black|blue|blueviolet|brown|cadetblue|chocolate|cornflowerblue|crimson|darkblue|darkcyan|darkgoldenrod|darkgreen|darkmagenta|darkolivegreen|darkorchid|darkred|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|forestgreen|gray|green|grey|indianred|indigo|lightseagreen|lightslategray|lightslategrey|limegreen|maroon|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumvioletred|midnightblue|navy|olive|olivedrab|orangered|orchid|palevioletred|purple|red|rosybrown|royalblue|saddlebrown|seagreen|sienna|slateblue|slategray|slategrey|steelblue|teal|tomato)(\1)/g, '$1<span style="background-color: $2;" class="wikEdColorsDark">$2</span><!--wikEdColorsDark-->$3');

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime / 2) {
		return;
	}

// RGB hex colors #d4d0cc, exclude links and character entities starting with &
	html = html.replace(/(^|[^\/\w\x02])(#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2}))(?=(\W|$))/g,
		function (p, p1, p2, p3, p4, p5) {
			var luminance = parseInt(p3, 16) * 0.299 + parseInt(p4, 16) * 0.587 + parseInt(p5, 16) * 0.114;
			if (luminance > 128) {
				return(p1 + '<span style="background-color: ' + p2 + '" class="wikEdColorsLight">' + p2 + '</span><!--wikEdColorsLight-->');
			}
			else {
				return(p1 + '<span style="background-color: ' + p2 + '" class="wikEdColorsDark">' + p2 + '</span><!--wikEdColorsDark-->');
			}
		}
	);

// RGB hex colors #ddc, exclude links and character entities starting with &
	html = html.replace(/(^|[^\/\w\x02])(#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F]))(?=(\W|$))/g,
		function (p, p1, p2, p3, p4, p5) {
			var luminance = parseInt(p3, 16) * 16 * 0.299 + parseInt(p4, 16) * 16 * 0.587 + parseInt(p5, 16) * 16  * 0.114;
			if (luminance > 128) {
				return(p1 + '<span style="background-color: ' + p2 + '" class="wikEdColorsLight">' + p2 + '</span><!--wikEdColorsLight-->');
			}
			else {
				return(p1 + '<span style="background-color: ' + p2 + '" class="wikEdColorsDark">' + p2 + '</span><!--wikEdColorsDark-->');
			}
		}
	);

// RGB decimal colors rgb(128,64,265)
	html = html.replace(/(rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\))/gi,
		function (p, p1, p2, p3, p4) {
			var luminance = p2 * 0.299 + p3 * 0.587 + p4  * 0.114;
			if (luminance > 128) {
				return('<span style="background-color: ' + p1 + '" class="wikEdColorsLight">' + p1 + '</span><!--wikEdColorsLight-->');
			}
			else {
				return('<span style="background-color: ' + p1 + '" class="wikEdColorsDark">' + p1 + '</span><!--wikEdColorsDark-->');
			}
		}
	);

// clear array of link addresses
	if (obj.whole == true) {
		wikEdFollowLinkIdNo = 0;
		wikEdFollowLinkHash = {};
	}
	obj.whole = false;

// URLs
	html = html.replace(/(^|.)((http:\/\/|https:\/\/|ftp:\/\/|irc:\/\/|gopher:\/\/|news:|mailto:|file:\/\/)[\!\#\%\&\(\)\+-\/\:\;\=\?\@\w\~ŠŒŽœžŸŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]*)/g,
		function (p, p1, p2, p3) {
			var trailingChar = '';

// do not include trailing punctuation for in-text links
			if (p1 != '[') {
				var linkMatch = p2.match(/^(.*?)([\,\.\!\?\:\;])$/);
				if (linkMatch != null) {
					p2 = linkMatch[1];
					trailingChar = linkMatch[2];
				}
			}

			return(p1 + '<span class="wikEdURLLink"' + WikEdFollowLinkUrl(null, null, p2) + '>' + p2 + '</span><!--wikEdURLLink-->' + trailingChar);
		}
	);

// URLs with text
	html = html.replace(/(\[)( *<span class=\"wikEdURLLink\"[^>]*>.*?<\!--wikEdURLLink--> *)([^\]\n]*?)( *\])/gi,
		function (p, p1, p2, p3, p4) {

// link text
			p3 = p3.replace(/(.*)/, '<span class="wikEdURLText">$1</span><!--wikEdURLText-->');

// link tags
			p1 = p1.replace(/(\[)/, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			p4 = p4.replace(/(\])/, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');

			return(p1 + p2 + p3 + p4);
		}
	);

// highlight images
// p11 needed to prevent freezing for certain nested tags
//                            1       23                                                                                 3     24                456   78                        9                                  7 6 5 10  11
//                            ( [[   )((Image|File|    Image                          |    File                          )  :  )( name           )(( | (( wikilink             ) ( link              ) non-link     )*)*)(   )( ]]  )
	var regExpImg = new RegExp('(\\[\\[)((Image|File|' + wikEdText['wikicode Image'] + '|' + wikEdText['wikicode File'] + ') *: *)([^\\[\\]\\|\\n]*)((\\|((\\[\\[[^\\]\\n]*\\]\\])?(\\[[^\\[\\]\\n]*\\])?[^\\[\\]\\|]*)*)*)(.*?)(\\]\\])', 'gi');
	html = html.replace(regExpImg,
		function (p, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) {
			var linkTitle = p4;
			linkTitle = linkTitle.replace(/\|.*()/g, '');
			linkTitle = linkTitle.replace(/\n.*()/g, '');

			p1 = '<span class="wikEdImage"' + WikEdFollowLinkUrl(p2, linkTitle) + '>' + p1;
			p11 = p11 + '</span><!--wikEdImage-->';
			p2 = '<span class="wikEdImageName">' + p2;
			p4 = p4 + '</span><!--wikEdImageName-->';

// parameters and capture
			p5 = p5.replace(/((\[[^\]]\]|\[\[[^\]]\]\]|[^\]\|])+)/g,
				function (p, p1) {
					if (/^(thumb|thumbnail|frame|right|left|center|none|\d+px|\d+x\d+px)$/.test(p1) == true) {
						p1 = '<span class="wikEdImageParam">' + p1 + '</span><!--wikEdImageParam-->';
					}
					else {
						p1 = '<span class="wikEdImageCaption">' + p1 + '</span><!--wikEdImageCaption-->';
					}
					return(p1);
				}
			);

// link tags
			p1 = p1.replace(/(\[+)/, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			p11 = p11.replace(/(\]+)/, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			p5 = p5.replace(/(\|)/g, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			return(p1 + p2 + p4 + p5 + p10 + p11);
		}
	);

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime / 2) {
		return;
	}

// [[ ]] links, categories
	html = html.replace(/(\[\[)([^\[\]]*)(\]\])/g,
		function (p, p1, p2, p3) {

// omit image tags
			var regExpImg = new RegExp('^(<[^>]*>)*(Image|File|' + wikEdText['wikicode Image'] + '|' + wikEdText['wikicode File'] + ')\\s*:', 'i');
			if (regExpImg.test(p2) == true) {
				return(p1 + p2 + p3);
			}

// get url
			var linkParam = '';
			var linkInter = '';
			var linkMatch = p2.match(/^\s*(([\w ŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\-]*\s*:)*)\s*([^\|]+)/);
			if (linkMatch != null) {
				linkInter = linkMatch[1];
				linkParam = WikEdFollowLinkUrl(linkInter, linkMatch[3]);
			}

// category
			var regExpCat = new RegExp('^\\s*(Category|' + wikEdText['wikicode Category'] + ')\\s*:', 'i');
			if (regExpCat.test(p2)) {
				var regExp = new RegExp('\\s*[\\w\\- ŠŒŽšœžŸÀ-ÖØ-öø-\\u0220\\u0222-\\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\\u0400-\\u0481\\u048a-\\u04ce\\u04d0-\\u04f5\\u04f8\\u04f9]+\\s*:\\s*(Category|' + wikEdText['wikicode Category'] + ')\\s*:', 'i');
				if (p2.match(regExp) != null) {
					p1 = '<span class="wikEdCatInter"' + linkParam + '>' + p1;
					p3 = p3 + '</span><!--wikEdCatInter-->';
				}
				else {
					p1 = '<span class="wikEdCat"' + linkParam + '>' + p1;
					p3 = p3 + '</span><!--wikEdCat-->';
				}
				p2 = p2.replace(/^(\s*)(([\w ]*:)+)/, '$1<span class="wikEdInter">$2</span><!--wikEdInter-->');
				p2 = p2.replace(/(\s*)([^>:\|]+)(\s*\|\s*|$)/, '$1<span class="wikEdCatName">$2</span><!--wikEdCatName-->$3');
				p2 = p2.replace(/(\|\s*)(.*)/,
					function (p, p1, p2) {
						p2 = p2.replace(/(.*?)(\s*(\||$))/g, '<span class="wikEdCatText">$1</span><!--wikEdCatText-->$2');
						return(p1 + p2);
					}
				);
			}

// wikilink
			else {
				if (linkInter != '') {
					p1 = '<span class="wikEdLinkInter"' + linkParam + '>' + p1;
					p3 = p3 + '</span><!--wikEdLinkInter-->';
				}
				else {
					p1 = '<span class="wikEdLink"' + linkParam + '>' + p1;
					p3 = p3 + '</span><!--wikEdLink-->';
				}
				p2 = p2.replace(/^(\s*)(([\w ]*:)+)/, '$1<span class="wikEdInter">$2</span><!--wikEdInter-->');
				p2 = p2.replace(/(\s*)([^>:\|]+)(\s*\|\s*|$)/, '$1<span class="wikEdLinkName">$2</span><!--wikEdLinkName-->$3');
				p2 = p2.replace(/(\|\s*)(.*)/,
					function (p, p1, p2) {
						p2 = p2.replace(/(.*?)(\s*(\||$))/g, '<span class="wikEdLinkText"">$1</span><!--wikEdLinkText-->$2');
						return(p1 + p2);
					}
				);
			}

// link tags
			p1 = p1.replace(/(\[+)/, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			p2 = p2.replace(/(\|)/g, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			p3 = p3.replace(/(\]+)/, '<span class="wikEdLinkTag">$1</span><!--wikEdLinkTag-->');
			return(p1 + p2 + p3);
		}
	);

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime) {
		return;
	}

// signature ~~~~
	html = html.replace(/(~{3,5})/g, '<span class="wikEdSignature">$1</span><!--wikEdSignature-->');

// magic words
	var regExp = new RegExp('(__' + wikEdMagicWords + '__)', 'gi');
	html = html.replace(regExp, '<span class="wikEdMagic">$1</span><!--wikEdMagic-->');

// template parameter {{{parameter|default}}}
	html = html.replace(/(\{\{\{)(\s*)([^\{\}\|]*?)(\s*)(\|.*?)?(\}\}\})/g,	'<span class="wikEdTempl"><span class="wikEdTemplTag">{{</span><!--wikEdTemplTag--><span class="wikEdTemplTag">{</span><!--wikEdTemplTag-->$2<span class="wikEdTemplParam">$3</span><!--wikEdTemplParam-->$4$5<span class="wikEdTemplTag">}</span><!--wikEdTemplTag--><span class="wikEdTemplTag">}}</span><!--wikEdTemplTag--></span><!--wikEdTempl-->');

// parser variables and functions

// {{VARIABLE}} start
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?(' + wikEdParserVariables + ')(\\s*)(\}\})', 'g');
	html = html.replace(regExp, '<span class="wikEdTempl"><span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->$2$3<span class="wikEdParserFunct">$5</span><!--wikEdParserFunct-->$6<span class="wikEdTemplTag">$7</span><!--wikEdTemplTag--></span><!--wikEdTempl-->');

// parser {{VARIABLE:R}} start
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?(' + wikEdParserVariablesR + ')(:\\s*R)?(\\s*)(\}\})', 'g');
	html = html.replace(regExp, '<span class="wikEdTempl"><span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->$2$3<span class="wikEdParserFunct">$5</span><!--wikEdParserFunct-->$6$7<span class="wikEdTemplTag">$8</span><!--wikEdTemplTag--></span><!--wikEdTempl-->');

// parser {{FUNCTION:param|R}} start
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?(' + wikEdParserFunctionsR + '):', 'g');
	html = html.replace(regExp, '<span class="wikEdTempl"><span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->$2$3<span class="wikEdParserFunct">$5</span><!--wikEdParserFunct-->:');

// parser {{function:param|param}} start
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?(' + wikEdParserFunctions + '):', 'gi');
	html = html.replace(regExp, '<span class="wikEdTempl"><span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->$2$3<span class="wikEdParserFunct">$5</span><!--wikEdParserFunct-->:');

// parser {{#function:param|param}} start
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?#(' + wikEdParserFunctionsHash + '):', 'gi');
	html = html.replace(regExp, '<span class="wikEdTempl"><span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->$2$3<span class="wikEdParserFunct">#$5</span><!--wikEdParserFunct-->:');

// parser function modifier
	var regExp = new RegExp('(<span class="wikEdTemplTag">\\{\\{</span><!--wikEdTemplTag-->)(' + wikEdTemplModifier + '):', 'gi');
	html = html.replace(regExp, '$1<span class="wikEdTemplMod">$2</span><!--wikEdTemplMod-->:');

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime) {
		return;
	}

// simple non-nested {{templates}}
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?([^\\{\\}\\<\\>\\x00\\x01\\n]+)(\\}\\})', 'gi');
	html = html.replace(regExp,
		function (p, p1, p2, p3, p4, p5, p6) {
			p3 = p3 || '';
			p4 = p4 || '';

// template tags
			p1 = '<span class="wikEdTemplTag">' + p1 + '</span><!--wikEdTemplTag-->';
			p6 = '<span class="wikEdTemplTag">' + p6 + '</span><!--wikEdTemplTag-->';

// get url
			var linkParam = '';
			var linkInter;
			var linkMatch = p5.match(/^\s*(([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]*\s*:)*)\s*([^\|]+)/);
			if (linkMatch != null) {
				linkInter = linkMatch[1];
				linkParam = WikEdFollowLinkUrl(linkInter + wikEdText['wikicode Template'] + ':', linkMatch[3])
			}
			if (linkInter != '') {
				p1 = '<span class="wikEdTemplInter" ' + linkParam + '>' + p1;
				p6 = p6 + '</span><!--wikEdTemplInter-->';
			}
			else {
				p1 = '<span class="wikEdTempl" ' + linkParam + '>' + p1;
				p6 = p6 + '</span><!--wikEdTempl-->';
			}
			p3 = p3.replace(/^(.*?)(:\s*)$/, '<span class="wikEdTemplMod">$1</span><!--wikEdTemplMod-->$2');
			p5 = p5.replace(/^(\s*)((\w*:)+)/, '$1<span class="wikEdInter">$2</span><!--wikEdInter-->');
			p5 = p5.replace(/(\s*)([^>:\|]+)(\s*\|\s*|$)/, '$1<span class="wikEdTemplName">$2</span><!--wikEdTemplName-->$3');
			p5 = p5.replace(/(\|\s*)(.*)/,
				function (p, p1, p2) {
					p2 = p2.replace(/(.*?)(\s*(\||$))/g, '<span class="wikEdTemplText">$1</span><!--wikEdTemplText-->$2');
					return(p1 + p2);
				}
			);

// template tags
			p5 = p5.replace(/(\|)/g, '<span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->');

			return(p1 + p2 + p3 + p5 + p6);
		}
	);

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime) {
		return;
	}

// template start
	var regExp = new RegExp('(\\{\\{)(\\s*)((' + wikEdTemplModifier + '):\\s*)?([^\\{\\}\\<\\>\\x00\\x01\\n\\|]+)', 'gi');
	html = html.replace(regExp,
		function (p, p1, p2, p3, p4, p5) {
			p3 = p3 || '';
			p4 = p4 || '';
			var linkMatch = p5.match(/^\s*(([\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9]*\s*:)*)\s*([^\|]+)/);
			var linkParam = '';
			var linkInter;
			if (linkMatch != null) {
				linkInter = linkMatch[1];
				linkParam = WikEdFollowLinkUrl(linkInter + wikEdText['wikicode Template'] + ':', linkMatch[3]);
			}
			p3 = p3.replace(/^(.*?)(:\s*)$/, '<span class="wikEdTemplMod">$1</span><!--wikEdTemplMod-->$2');
			return('<span class="wikEdTempl"' + linkParam + '><span class="wikEdTemplTag">' + p1 + '</span><!--wikEdTemplTag-->' + p2 + p3 + '<span class="wikEdTemplName">' + p5 + '</span><!--wikEdTemplName-->');
		}
	);

// highlighting curly template brackets at template end
	html = html.replace(/(\}\})(?!<\/span><!--(wikEdTempl|wikEdTemplTag)-->)/g, '$1</span><!--wikEdTempl-->');
	html = html.replace(/(\}\})(?!<\/span><!--wikEdTemplTag-->)/g, '<span class="wikEdTemplTag">$1</span><!--wikEdTemplTag-->');

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime) {
		return;
	}

// <b> <i>
	html = html.replace(/(\'\'\')(\'*)(.*?)(\'*)(\'\'\')/g, '<span class="wikEdBold">$2$3$4</span><!--wikEdBold-->');
	html = html.replace(/(\'\')(.*?)(\'\')/g, '<span class="wikEdItalic">$1$2$3</span><!--wikEdItalic-->');
	html = html.replace(/(<span class=\"wikEdBold\">)/g, '$1\'\'\'');
	html = html.replace(/(<\/span><!--wikEdBold-->)/g, '\'\'\'$1');
	html = html.replace(/(\'{2,})/g, '<span class="wikEdWiki">$1</span><!--wikEdWiki-->');

// nowiki (remove highlighting)
	html = html.replace(/(\x00nowiki\b[^\x01]*\x01)((.|\n)*?)(\x00\/nowiki\x01)/gi,
		function (p, p1, p2, p3, p4) {
			p1 = '<span class="wikEdNowiki"><span class="wikEdInlineTag">' + p1 + '</span><!--wikEdInlineTag-->';
			p2 = p2.replace(/<[^>]*>/g, '');
			p4 = '<span class="wikEdInlineTag">' + p4 + '</span><!--wikEdInlineTag--></span><!--wikEdNowiki-->';
			return(p1 + p2 + p4);
		}
	);

// hide (fade) <ref>
	if (wikEdRefHide == true) {

// escape <ref />
		html = html.replace(/\x00(ref\b[^\x01]*?\/)\x01/g, '<span class="wikEdRefHide">&lt;$1&gt;</span><!--wikEdRefHide-->');

// remove <ref> inner highlighting
		html = html.replace(/(\x00ref\b[^\x01]*\x01)((.|\n)*?)(\x00\/ref\x01)/gi,
			function (p, p1, p2, p3, p4) {
				p2 = p2.replace(/<[^>]*>/g, '');
				var str = '<span class="wikEdRefHide">' + p1 + p2 + p4 + '</span><!--wikEdRefHide-->';
				return(str);
			}
		);
	}

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime) {
		return;
	}

// \x00 and \x01 back to &lt; and &gt;
	html = html.replace(/\x00/g, '&lt;');
	html = html.replace(/\x01/g, '&gt;');
	html = html.replace(/\x02/g, '&amp;');

// check spent time
	if (new Date() - startDate > wikEdMaxHighlightTime) {
		return;
	}

// control character highlighting
	var regExp = new RegExp('([' + wikEdControlCharHighlightingStr + '])', 'g');
	html = html.replace(regExp,
		function (p, p1) {
			p1 = '<span class="wikEdCtrl" title="' + wikEdControlCharHighlighting[p1.charCodeAt(0).toString()] + '">' + p1 + '</span><!--wikEdCtrl-->';
			return(p1);
		}
	);

// single character highlighting: spaces, dashes
	var regExp = new RegExp('<[^>]*>|([' + wikEdCharHighlightingStr + '])', 'g');
	html = html.replace(regExp,
		function (p, p1) {
			p1 = p1 || '';
			if (p1 != '') {
				var decimalValue = p1.charCodeAt(0).toString();
				var titleClass = wikEdCharHighlighting[decimalValue];
				p1 = '<span class="' + titleClass + '" title="' + wikEdText[titleClass] + '">' + p1 + '</span><!--' + titleClass + '-->';
				return(p1);
			}
			else {
				return(p);
			}
		}
	);

// remove comments
	if (wikEdRemoveHighlightComments == true) {
		html = html.replace(/<!--wikEd\w+-->/g, '');
	}

	obj.html = html;
	return;
}


//
// WikEdFollowLinkUrl: prepare the span tag parameters for ctrl-click opening of highlighted links
//   add support for [[/subpage]]

window.WikEdFollowLinkUrl = function(linkPrefix, linkTitle, linkUrl) {

	var linkName = '';

// generate url from interlanguage or namespace prefix and title
	if (linkUrl == null) {

// test for templates
		if ( (/\{|\}/.test(linkPrefix) == true) || (/\{|\}/.test(linkTitle) ) == true) {
			return('');
		}

// remove highlighting code
		linkPrefix = linkPrefix.replace(/<[^>]*>/g, '');
		linkTitle = linkTitle.replace(/<[^>]*>/g, '');

// remove control chars
		var regExp = new RegExp('[' + wikEdControlCharHighlightingStr + '\t\n\r]', 'g');
		linkPrefix = linkPrefix.replace(regExp, '');
		linkTitle = linkTitle.replace(regExp, '');

// remove strange white spaces
		linkPrefix = linkPrefix.replace(/\s/, ' ');
		linkTitle = linkTitle.replace(/\s/, ' ');
		linkPrefix = linkPrefix.replace(/^:+ */g, '');
		linkPrefix = linkPrefix.replace(/ /, '_');
		linkTitle = linkTitle.replace(/ /g, '_');

// Wiktionary differentiates between lower and uppercased titles
		linkUrl = linkPrefix + linkTitle;
		linkUrl = encodeURI(linkUrl);
		linkUrl = linkUrl.replace(/%25(\d\d)/g, '%$1');
		linkUrl = linkUrl.replace(/\'/g, '%27');
		linkUrl = linkUrl.replace(/#/g, '%23');
		if (wikEdWikiGlobals['wgArticlePath'] == null) {
			linkUrl = '';
		}
		else {
			linkUrl = wikEdWikiGlobals['wgArticlePath'].replace(/\$1/, linkUrl);
			linkName = linkPrefix + linkTitle;
		}
	}

// url provided
	else {

// test for templates
		if (/\{|\}/.test(linkUrl) == true) {
			return('');
		}
		linkName = linkUrl;
		linkUrl = encodeURI(linkUrl);
		linkUrl = linkUrl.replace(/%25(\d\d)/g, '%$1');
		linkUrl = linkUrl.replace(/\'/g, '%27');
	}
	linkName = linkName.replace(/</g, '&lt;');
	linkName = linkName.replace(/>/g, '&gt;');
	linkName = linkName.replace(/\"/g, '&quot;');
	linkName = linkName.replace(/\'/g, '\\x27');

	var linkParam = '';
	if (linkUrl != '') {
		var linkId = 'wikEdFollowLink' + wikEdFollowLinkIdNo;
		wikEdFollowLinkIdNo ++;

		linkParam += 'id="' + linkId + '" title="' + linkName + ' ' + wikEdText['followLink'] + '"';
		wikEdFollowLinkHash[linkId] = linkUrl;
	}
	return(linkParam)
}


//
// WikEdUpdateTextarea: copy frame content to textarea
//

window.WikEdUpdateTextarea = function() {

// remove dynamically inserted nodes by other scripts
	WikEdCleanNodes(wikEdFrameDocument);

// get frame content
	var obj = {};
	obj.html = wikEdFrameBody.innerHTML;

// remove trailing blanks and newlines at end of text
	obj.html = obj.html.replace(/((<br\b[^>]*>)|\s)+$/g, '');

// remove leading spaces in lines
	obj.html = obj.html.replace(/(<br\b[^>]*>)\n* *()/g, '$1');

// textify so that no html formatting is submitted
	WikEdTextify(obj);
	obj.plain = obj.plain.replace(/&nbsp;|&#160;|\xa0/g, ' ');
	obj.plain = obj.plain.replace(/&lt;/g, '<');
	obj.plain = obj.plain.replace(/&gt;/g, '>');
	obj.plain = obj.plain.replace(/&amp;/g, '&');

// copy to textarea
	wikEdTextarea.value = obj.plain;

// remember frame scroll position
	wikEdFrameScrollTop = wikEdFrameBody.scrollTop;

	return;
}


//
// WikEdUpdateFrame: copy textarea content to frame
//

window.WikEdUpdateFrame = function() {

// get textarea content
	var obj = {};
	obj.html = wikEdTextarea.value;
	obj.html = obj.html.replace(/&/g, '&amp;');
	obj.html = obj.html.replace(/>/g, '&gt;');
	obj.html = obj.html.replace(/</g, '&lt;');

// highlight the syntax
	if (wikEdHighlightSyntax == true) {
		obj.whole = true;
		WikEdHighlightSyntax(obj);
	}

// at least display tabs
	else {
		obj.html = obj.html.replace(/(\t)/g, '<span class="wikEdTabPlain">$1</span><!--wikEdTabPlain-->');
	}

// multiple blanks to blank-&nbsp;
	obj.html = obj.html.replace(/(^|\n) /g, '$1&nbsp;');
	obj.html = obj.html.replace(/ (\n|$)/g, '&nbsp;$1');
	obj.html = obj.html.replace(/  /g, '&nbsp; ');
	obj.html = obj.html.replace(/  /g, '&nbsp; ');

// newlines to <br />
	obj.html = obj.html.replace(/\n/g, '<br />');

// select the whole text after replacing the whole text and scroll to same height
	if (wikEdMSIE == true) {

	}
	else {
		obj.sel = WikEdGetSelection();
		WikEdRemoveAllRanges(obj.sel);
	}

// insert content into empty frame
	if ( (wikEdFrameBody.firstChild == null) || (/^<br[^>]*>\s*$/.test(wikEdFrameBody.innerHTML) == true) ) {
		wikEdFrameBody.innerHTML = obj.html;
	}

// insert content into frame, preserve history
	else {
		var range = wikEdFrameDocument.createRange();
		range.setStartBefore(wikEdFrameBody.firstChild);
		range.setEndAfter(wikEdFrameBody.lastChild);
		obj.sel.addRange(range);

// replace the frame content with the new text
		if (obj.html != '') {
			WikEdFrameExecCommand('inserthtml', obj.html);
		}
		else {
			WikEdFrameExecCommand('delete');
		}
		WikEdRemoveAllRanges(obj.sel);

// scroll to previous position
		if (wikEdFrameScrollTop != null) {
			wikEdFrameBody.scrollTop = wikEdFrameScrollTop;
		}

	}
	wikEdFrameScrollTop = null;

// add event handler to make highlighted frame links ctrl-clickable
	if (wikEdHighlightSyntax == true) {
		WikEdFollowLinks();
	}

	return;
}


//
// WikEdKeyFrameHandler: event handler for key and mouse events in the frame
//

window.WikEdKeyFrameHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);
	if (event == null) {
		return;
	}

	if (wikEdUseWikEd == true) {
		switch (event.type) {

// trap the tab key
			case 'keydown':
				switch (event.keyCode) {
					case 9:
						if (event.shiftKey == false) {
							event.preventDefault();

// scroll to text input top
							if (wikEdFullScreenMode == false) {
								var inputWrapperTop = WikEdGetOffsetTop(wikEdInputWrapper);
								window.scroll(0, inputWrapperTop);
							}

// focus the summary
							wikEdSummaryText.focus();
						}
						break;
				}
				break;

// trap any other frame event
			case 'keyup':
			case 'keypress':
			case 'mouseup':

// grey out inactive buttons
				WikEdInactiveButtons();

// reset the frame DOM cache
				wikEdFrameDOMCache = null;
				break;
		}
	}
	return;
}


//
// WikEdShiftAltHandler: event handler for emulated accesskey keydown events in main document and frame
//

window.WikEdShiftAltHandler = function(event) {

// MS IE compatibility fix
	event = WikEdEvent(event);

	if (wikEdUseWikEd == true) {
		if ( (event.shiftKey == true) && (event.ctrlKey == false) && (event.altKey == true) ) {
// get wikEd button id from keycode
			var buttonId = wikEdButtonKeyCode[event.keyCode];
			if (buttonId != null) {
				event.preventDefault();
				event.stopPropagation();

// execute the button click handler code
				var obj = document.getElementById(buttonId);
				objId = obj.id;
				eval(wikEdEditButtonHandler[buttonId]);
			}
		}
	}
	return;
}


//
// WikEdFrameExecCommand: wrapper for execCommand method
//

window.WikEdFrameExecCommand = function(command, option) {

	wikEdFrameDocument.execCommand(command, false, option);
	return;
}


//
// WikEdFindAhead: non-regexp and case-insensitive find-as-you-type, event handler for find field
//

window.WikEdFindAhead = function() {

	if (WikEdGetAttribute(wikEdFindAhead, 'checked') == 'true') {

// get the find text
		var findText = wikEdFindText.value;
		if (findText == '') {
			return;
		}

// remember position
		var sel = WikEdGetSelection();
		var range = sel.getRangeAt(sel.rangeCount - 1).cloneRange();
		var rangeClone = range.cloneRange();
		var scrollTop = wikEdFrameBody.scrollTop;
		sel.removeAllRanges();
		sel.addRange(range);
		range.collapse(true);

// parameters: window.find(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog)
// Mozilla bug: searchInFrames must be true, otherwise wrapAround does not work
		var found = wikEdFrameWindow.find(findText, false, false, true, false, true, false);

// add original selection
		if (found == false) {
			wikEdFrameBody.scrollTop = scrollTop;
			sel.removeAllRanges();
			sel.addRange(rangeClone);
		}
	}
	return;
}


//
// WikEdMainSwitch: click handler for program logo
//

window.WikEdMainSwitch = function() {

// disable function if browser is incompatible
	if (wikEdBrowserNotSupported == true) {
		return;
	}

// enable wikEd
	if (wikEdDisabled == true) {
		wikEdDisabled = false;
		WikEdSetPersistent('wikEdDisabled', '0', 0, '/');

// turn rich text frame on
		if (wikEdTurnedOn == true) {
			WikEdSetLogo();
			WikEdUpdateFrame();
			WikEdSetEditArea(true);
			wikEdButtonsWrapper.style.display = 'block';
			wikEdButtonBarPreview.style.display = 'block';
			if (wikEdButtonBarJump != null) {
				wikEdButtonBarJump.style.display = 'block';
			}

// run scheduled custom functions
			WikEdExecuteHook(wikEdOnHook);
		}

// setup wikEd
		else {
			WikEdTurnOn(false);
			return;
		}
	}

// disable wikEd
	else {
		wikEdUseWikEd = false;
		wikEdDisabled = true;
		WikEdSetLogo();
		WikEdSetPersistent('wikEdDisabled', '1', 0, '/');
		if (wikEdTurnedOn == true) {
			if (wikEdFullScreenMode == true) {
				WikEdFullScreen(false);
			}

// turn classic textarea on
			WikEdUpdateTextarea();
			WikEdSetEditArea(false);
			wikEdButtonsWrapper.style.display = 'none';
			wikEdButtonBarPreview.style.display = 'none';
			wikEdLocalPrevWrapper.style.display = 'none';
			wikEdPreviewBox.style.height = 'auto';
			if (wikEdButtonBarJump != null) {
				wikEdButtonBarJump.style.display = 'none';
			}

// run scheduled custom functions
			WikEdExecuteHook(wikEdOffHook);
		}
	}

	return;
}


//
// WikEdFullScreen: change to fullscreen edit area or back to normal view
//

window.WikEdFullScreen = function(fullscreen, notFrame) {

// hide or show elements
	var displayStyle;
	if (fullscreen == true) {
		displayStyle = 'none';
	}
	else {
		displayStyle = 'block';
	}

// elements above input wrapper
	var node = document.getElementById('editform').previousSibling;
	while (node != null) {
		if ( (node.nodeName == 'DIV') || (node.nodeName == 'H3') ) {
			node.style.display = displayStyle;
		}
		node = node.previousSibling;
	}
	document.getElementsByTagName('H1')[0].style.display = displayStyle;

// divs below input wrapper
	var node = wikEdInputWrapper.nextSibling;
	while (node != null) {
		if (node.nodeName == 'DIV') {
			node.style.display = displayStyle;
		}
		node = node.nextSibling;
	}

// divs below input wrapper, some levels up
	var node = document.getElementById('column-one');
	while (node != null) {
		if (node.nodeName == 'DIV') {
			node.style.display = displayStyle;
		}
		node = node.nextSibling;
	}

// insert wrapper
	document.getElementById('wikEdInsertWrapper').style.display = displayStyle;

// change styles
	if (fullscreen == true) {
		if (notFrame != true) {
			wikEdInputWrapper.className = 'wikEdInputWrapperFull';
		}
		wikEdButtonBarPreview.className = 'wikEdButtonBarPreviewFull';
	}
	else {
		if (notFrame != true) {
			wikEdInputWrapper.className = 'wikEdInputWrapper';
		}
		wikEdButtonBarPreview.className = 'wikEdButtonBarPreview';
	}

// resize the frame
	if (fullscreen == true) {
		var consoleTop = WikEdGetOffsetTop(wikEdConsoleWrapper);
		var consoleHeight = wikEdConsoleWrapper.offsetHeight;
		var frameHeight = wikEdFrame.offsetHeight;
		var windowHeight = WikEdGetWindowInnerHeight();
		var windowWidth = WikEdGetWindowInnerWidth();
		var frameHeightNew =  frameHeight + (windowHeight - (consoleTop + consoleHeight) ) - 2;
		wikEdFrame.style.height = frameHeightNew + 'px';
	}
	else {
		wikEdFrame.style.height = wikEdTextareaHeight + 'px';
	}

// scroll to edit-frame
	if (fullscreen == false) {
		window.scroll(0, WikEdGetOffsetTop(wikEdInputWrapper) - 2);
	}

// set the fullscreen button state
	WikEdButton(document.getElementById('wikEdFullScreen'), 'wikEdFullScreen', null, fullscreen);

// grey out or re-activate scroll-to buttons
	var buttonClass;
	if (fullscreen == true) {
		buttonClass = 'wikEdButtonInactive';
	}
	else {
		buttonClass = 'wikEdButton';
	}
	document.getElementById('wikEdScrollToPreview').className = buttonClass;
	document.getElementById('wikEdScrollToPreview2').className = buttonClass;
	document.getElementById('wikEdScrollToEdit').className = buttonClass;
	document.getElementById('wikEdScrollToEdit2').className = buttonClass;

// resize the summary field
	WikEdResizeSummary();

	wikEdFullScreenMode = fullscreen;

	return;
}


//
// WikEdResizeSummary: recalculate the summary width after resizing the window
//

window.WikEdResizeSummary = function() {

// check if combo field exists
	if (wikEdSummarySelect == null) {
		return;
	}

	wikEdSummaryText.style.width = '';
	wikEdSummarySelect.style.width = '';

	wikEdSummaryTextWidth = wikEdSummaryWrapper.clientWidth - ( WikEdGetOffsetLeft(wikEdSummaryText) - WikEdGetOffsetLeft(wikEdSummaryWrapper) );
	if (wikEdSummaryTextWidth < 150) {
		wikEdSummaryTextWidth = 150;
	}
	wikEdSummaryText.style.width = wikEdSummaryTextWidth + 'px';
	WikEdResizeComboInput('summary');
	return;
}


//
// WikEdResizeComboInput: set the size of the background select boxes so that the button is visible
//   calculates the select button width as the difference between select and option width
//   adjusts widths so that only the select button is visible behind the input field
//

window.WikEdResizeComboInput = function(field) {

// check if combo field exists
	if (wikEdSelectElement[field] == null) {
		return;
	}

// detect browser for MS IE fixes
	var standardBrowser = true;
	if (wikEdSelectElement[field].options.offsetWidth != null ) {
		standardBrowser = false;
	}

// set select height and top
	if (standardBrowser == false) {
		wikEdSelectElement[field].style.height = (wikEdInputElement[field].clientHeight + 6) + 'px';
		wikEdSelectElement[field].style.top = '3px';
		wikEdInputElement[field].style.top = '3px';
	}

// add a dummy option if no option exists yet
	var dummy;
	var testOption = 1;
	if (standardBrowser == true) {
		if (wikEdSelectElement[field].options.length == 0) {
			testOption = 0;
			wikEdSelectElement[field].options[0] = new Option('');
			dummy = true;
		}
	}

// set option widths to 0
	if (standardBrowser == true) {
		for (var i = 0; i < wikEdSelectElement[field].options.length; i ++) {
			wikEdSelectElement[field].options[i].style.width = '0';
		}
	}

// get input width
	var inputBorder = (wikEdInputElement[field].offsetWidth - wikEdInputElement[field].clientWidth);
	var inputWidthInner = wikEdInputElement[field].clientWidth;
	var inputWidthOuter = wikEdInputElement[field].offsetWidth;

// get select width
	var selectWidthInner = wikEdSelectElement[field].clientWidth;
	var selectWidthOuter = wikEdSelectElement[field].offsetWidth;

// get option width and calculate button width
	var optionWidthInner;
	var buttonWidth;
	if (standardBrowser == true) {

// Firefox < 3.0
		if ( typeof(wikEdSelectElement[field].options[testOption].clientLeft) == 'undefined' ) {
			optionWidthInner = wikEdSelectElement[field].options[testOption].clientWidth;
			buttonWidth = selectWidthInner - optionWidthInner - 6;
		}

// Firefox >= 3.0
		else {
			optionWidthInner = wikEdSelectElement[field].options[testOption].clientWidth;
			buttonWidth = selectWidthInner - optionWidthInner;
		}
	}
	else {
		buttonWidth = selectWidthOuter - selectWidthInner - 4;
	}

// for long fields shorten input
	if (inputWidthOuter + buttonWidth > 150) {
		wikEdInputElement[field].style.width = (inputWidthInner - inputBorder - buttonWidth) + 'px';
		wikEdSelectElement[field].style.width = (inputWidthInner) + 'px';
	}

// otherwise increase select width
	else {
		wikEdSelectElement[field].style.width = (inputWidthOuter + buttonWidth) + 'px';
	}

// delete dummy option
	if (dummy == true) {
		wikEdSelectElement[field].options[0] = null;
	}

// set option widths to auto
	if (standardBrowser == true) {
		for (var i = 0; i < wikEdSelectElement[field].options.length; i ++) {
			wikEdSelectElement[field].options[i].style.width = 'auto';
		}
	}
	return;
}


//
// WikEdChangeComboInput: set the input value to selected option; onchange event handler for select boxes
//

window.WikEdChangeComboInput = function(field) {

	wikEdInputElement[field].focus;

// get selection index (-1 for unselected)
	var selected = wikEdSelectElement[field].selectedIndex;
	if (selected >= 0) {
		wikEdSelectElement[field].selectedIndex = -1;

// get selected option
		var option = wikEdSelectElement[field].options[selected];
		if (option.text != '') {

// jump to heading
			if ( (field == 'find') && (/^=.*?=$/.test(option.value) == true) ) {

// parameters: window.find(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog)
// Mozilla bug: searchInFrames must be true, otherwise wrapAround does not work
				wikEdFrameWindow.find(option.value, true, false, true, false, true, false);
			}

// update input field
			else {

// add a tag to the summary box
				if (field == 'summary') {
					wikEdInputElement[field].value = WikEdAppendToSummary(wikEdInputElement[field].value, option.text);
				}

// add case and regexp checkboxes to find / replace fields
				else if (option.value == 'setcheck') {
					WikEdButton(document.getElementById('wikEdCaseSensitive'), 'wikEdCaseSensitive', null, (option.text.charAt(0) == wikEdCheckMarker[true]) );
					WikEdButton(document.getElementById('wikEdRegExp'), 'wikEdRegExp', null, (option.text.charAt(1) == wikEdCheckMarker[true]) );
					wikEdInputElement[field].value = option.text.substr(3);
				}

// add option text
				else {
					wikEdInputElement[field].value = option.text;
				}

// find the new text
				if ( (field == 'find') && (WikEdGetAttribute(wikEdFindAhead, 'checked') == 'true') ) {
					WikEdFindAhead();
				}
			}
		}
	}
	return;
}


//
// WikEdAppendToSummary: append a phrase to the summary text
//

window.WikEdAppendToSummary = function(summary, append) {

	summary = summary.replace(/^[, ]+/, '');
	summary = summary.replace(/[, ]+$/, '');
	if (summary != '') {
		if (summary.match(/ \*\/$/) != null) {
			summary += ' ';
		}
		else if (summary.match(/[\.\;\:]$/) != null) {
			summary += ' ';
		}
		else if (summary.match(/^[\wŠŒŽšœžŸÀ-ÖØ-öø-\u0220\u0222-\u0233ΆΈΉΊΌΎΏΑ-ΡΣ-ώ\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8\u04f9\(\)\"\'\+\-]/) == null) {
			summary += ' ';
		}
		else {
			summary += ', ';
		}
	}
	summary += append;

	return(summary);
}


//
// WikEdAddToHistory: add an input value to the saved history
//

window.WikEdAddToHistory = function(field) {

	if (wikEdInputElement[field].value != '') {

// load history from saved settings
		WikEdLoadHistoryFromSettings(field);

// add current value to history
		wikEdFieldHist[field].unshift(wikEdInputElement[field].value);

// add case and regexp checkboxes to find / replace value
		if ( (field == 'find') || (field == 'replace') ) {
			wikEdFieldHist[field][0] =
				wikEdCheckMarker[ (WikEdGetAttribute(wikEdCaseSensitive, 'checked') == 'true') ] +
				wikEdCheckMarker[ (WikEdGetAttribute(wikEdRegExp, 'checked') == 'true') ] +
				' ' + wikEdFieldHist[field][0];
		}

// remove paragraph names from summary
		if (field == 'summary') {
			wikEdFieldHist[field][0] = wikEdFieldHist[field][0].replace(/^\/\* .*? \*\/ *()/, '');
		}

// remove multiple old copies from history
		var i = 1;
		while (i < wikEdFieldHist[field].length) {
			if (wikEdFieldHist[field][i] == wikEdFieldHist[field][0]) {
				wikEdFieldHist[field].splice(i, 1);
			}
			else {
				i ++;
			}
		}

// remove new value if it is a preset value
		if (wikEdComboPresetOptions[field] != null) {
			var i = 0;
			while (i < wikEdComboPresetOptions[field].length) {
				if (wikEdComboPresetOptions[field][i] == wikEdFieldHist[field][0]) {
					wikEdFieldHist[field].shift();
					break;
				}
				else {
					i ++;
				}
			}
		}

// cut history number to maximal history length
		wikEdFieldHist[field] = wikEdFieldHist[field].slice(0, wikEdHistoryLength[field]);

// save history to settings
		if (wikEdFieldHist[field][0] != '') {
			WikEdSaveHistoryToSetting(field);
		}
	}
	return;
}


//
// WikEdSetComboOptions: generate the select options from saved history; onfocus handler for select box
//

window.WikEdSetComboOptions = function(field) {

// load history from saved settings
	WikEdLoadHistoryFromSettings(field);

	var option = {};
	var selectedOption = null;

// delete options
	var options = wikEdSelectElement[field].options;
	for (var i = 0; i < options.length; i ++) {
		wikEdSelectElement[field].remove(i);
	}

// delete optgroup
	option = document.getElementById(field + 'Optgroup');
	if (option != null) {
		wikEdSelectElement[field].removeChild(option);
	}

// workaround for onchange not firing when selecting first option from unselected dropdown
	option = document.createElement('option');
	option.style.display = 'none';
	j = 0;
	wikEdSelectElement[field].options[j++] = option;

// add history entries
	for (var i = 0; i < wikEdFieldHist[field].length; i ++) {
		if (wikEdFieldHist[field][i] != null) {
			if (wikEdFieldHist[field][i] == wikEdInputElement[field].value) {
				selectedOption = j;
			}
			option = document.createElement('option');

// replace spaces with nbsp to allow for multiple, leading, and trailing spaces
			option.text = wikEdFieldHist[field][i].replace(/ /g, '\xa0');
			if ( (field == 'find') || (field == 'replace') ) {
				option.value = 'setcheck';
			}
			wikEdSelectElement[field].options[j++] = option;
		}
	}

// add preset entries
	var startPreset = 0;
	if (wikEdComboPresetOptions[field] != null) {
		startPreset = j;
		for (var i = 0; i < wikEdComboPresetOptions[field].length; i ++) {
			if (wikEdComboPresetOptions[field][i] != null) {

// replace spaces with nbsp to allow for multiple, leading, and trailing spaces
				wikEdComboPresetOptions[field][i] = wikEdComboPresetOptions[field][i].replace(/ /g, '\xa0');

// select a dropdown value
				if (wikEdComboPresetOptions[field][i] == wikEdInputElement[field].value) {
					selectedOption = j;
				}

				option = document.createElement('option');
				option.text = wikEdComboPresetOptions[field][i].replace(/ /g, '\xa0');
				if (field == 'summary') {
					option.text = option.text.replace(/\{wikEdUsing\}/g, wikEdSummaryUsing);
				}
				wikEdSelectElement[field].options[j++] = option;
			}
		}
	}

// set the selection
	wikEdSelectElement[field].selectedIndex = selectedOption;

// add a blank preset separator
	if ( (startPreset > 1) && (startPreset < j) ) {
		option = document.createElement('optgroup');
		option.label = '\xa0';
		option.id = field + 'Optgroup';
		wikEdSelectElement[field].insertBefore(option, wikEdSelectElement[field].options[startPreset]);
	}

// add the TOC jumper to the find field
	var startTOC = 0;
	if (field == 'find') {
		startTOC = j;

// get the whole plain text
		var plain = wikEdFrameBody.innerHTML;
		plain = plain.replace(/<br\b[^>]*>/g, '\n');
		plain = plain.replace(/<.*?>/g, '');

// cycle through the headings
		var heading = plain.match(/(^|\n)=+[^\n]+?=+[^\n=]*[ =\t]*(?=(\n|$))/g);
		if (heading != null) {
			for (var i = 0; i < heading.length; i ++) {
				var headingMatch = heading[i].match(/\n?((=+) *([^\n]+?)( *\2))/);
				var headingIndent = headingMatch[2]
				headingIndent = headingIndent.replace(/^=/g, '');
				headingIndent = headingIndent.replace(/=/g, '\xa0');

// add headings to the select element
				option = document.createElement('option');
				option.text = '\u21d2' + headingIndent + headingMatch[3];
				option.value = headingMatch[1];
				wikEdSelectElement[field].options[j++] = option;
			}
		}
	}

// add a blank TOC separator
	if ( (startTOC > 1) && (startTOC < j) ) {
		option = document.createElement('optgroup');
		option.label = '\xa0';
		option.id = field + 'Optgroup';
		wikEdSelectElement[field].insertBefore(option, wikEdSelectElement[field].options[startTOC]);
	}

	return;
}


//
// WikEdClearHistory: clear the history of combo input fields
//

window.WikEdClearHistory = function(field) {
	WikEdSetPersistent(wikEdSavedName[field], '', 0, '/');
	WikEdSetComboOptions(field);
	return;
}


//
// WikEdLoadHistoryFromSettings: get the input box history from the respective saved settings
//

window.WikEdLoadHistoryFromSettings = function(field) {
	var setting = WikEdGetPersistent(wikEdSavedName[field]);
	if (setting != '') {
		setting = decodeURIComponent(setting);
		wikEdFieldHist[field] = setting.split('\n');
	}
	else {
		wikEdFieldHist[field] = [];
	}
	return;
}


//
// WikEdSaveHistoryToSetting: save the input box history to the respective saved settings
//

window.WikEdSaveHistoryToSetting = function(field) {

	var setting = '';
	setting = wikEdFieldHist[field].join('\n')
	setting = setting.replace(/\n$/, '');
	setting = encodeURIComponent(setting);
	WikEdSetPersistent(wikEdSavedName[field], setting, 0, '/');
	return;
}


//
// WikEdGetSelection: cross-browser method to get the current selection
//

window.WikEdGetSelection = function() {

// standard
	var sel;
	if (typeof(wikEdFrameWindow.getSelection) == 'function') {
		sel = wikEdFrameWindow.getSelection();
	}

// MS IE compatibility
	else if (typeof(wikEdFrameDocument.selection) == 'object') {
		sel = wikEdFrameDocument.selection;
	}

// make sure there is at least an empty range
	if (sel.rangeCount == 0) {
		sel.collapse(wikEdFrameBody, 0);
	}

	return(sel);
}


//
// WikEdClearSelection: cross-browser method to clear the currently selected text
//

window.WikEdRemoveAllRanges = function(sel) {

	if (typeof(sel.removeAllRanges) == 'function') {
		sel.removeAllRanges();
	}

// MS IE compatibility
	else if (typeof(sel.empty) == 'function') {
		sel.empty();
	}
	return;
}


//
// WikEdGetSavedSetting: get a wikEd setting
//

window.WikEdGetSavedSetting = function(settingName, preset) {

	var setting = WikEdGetPersistent(settingName);
	if (setting == '') {
		setting = preset;
	}
	else if (setting == '1') {
		setting = true;
	}
	else {
		setting = false;
	}
	return(setting);
}


//
// WikEdGetPersistent: get a cookie or a Greasemonkey persistent value (code copied to wikEdDiff.js)
//

window.WikEdGetPersistent = function(name) {

	var getStr = '';

// get a Greasemonkey persistent value
	if (wikEdGreasemonkey == true) {
		getStr = GM_getValue(name, '');
	}

// get a cookie value
	else {
		getStr = WikEdGetCookie(name);
	}
	return(getStr);
}


//
// WikEdSetPersistent: set a cookie or a Greasemonkey persistent value, deletes the value for expire = -1
//

window.WikEdSetPersistent = function(name, value, expires, path, domain, secure) {

// set a Greasemonkey persistent value
	if (wikEdGreasemonkey == true) {
		if (expires == -1) {
			GM_setValue(name, '');
		}
		else {
			GM_setValue(name, value);
		}
	}

// set a cookie value
	else {
		WikEdSetCookie(name, value, expires, path, domain, secure);
	}
	return;
}


//
// WikEdGetCookie: get a cookie (code copied to wikEdDiff.js)
//

window.WikEdGetCookie = function(cookieName) {

	var cookie = ' ' + document.cookie;
	var search = ' ' + cookieName + '=';
	var cookieValue = '';
	var offset = 0;
	var end = 0;
	offset = cookie.indexOf(search);
	if (offset != -1) {
		offset += search.length;
		end = cookie.indexOf(';', offset)
		if (end == -1) {
			end = cookie.length;
		}
		cookieValue = cookie.substring(offset, end);
		cookieValue = cookieValue.replace(/\\+/g, ' ');
		cookieValue = decodeURIComponent(cookieValue);
	}
	return(cookieValue);
}


//
// WikEdSetCookie: set a cookie, deletes a cookie for expire = -1
//

window.WikEdSetCookie = function(name, value, expires, path, domain, secure) {

	var cookie = name + '=' + encodeURIComponent(value);

	if (expires != null) {

// generate a date 1 hour ago to delete the cookie
		if (expires == -1) {
			var cookieExpire = new Date();
			expires = cookieExpire.setTime(cookieExpire.getTime() - 60 * 60 * 1000);
			expires = cookieExpire.toUTCString();
		}

// get date from expiration preset
		else if (expires == 0) {
			var cookieExpire = new Date();
			expires = cookieExpire.setTime(cookieExpire.getTime() + wikEdCookieExpireSec * 1000);
			expires = cookieExpire.toUTCString();
		}
		cookie += '; expires=' + expires;
	}
	if (path != null) {
		cookie += '; path=' + path;
	}
	if (domain != null)  {
		cookie += '; domain=' + domain;
	}
	if (secure != null) {
		cookie += '; secure';
	}
	document.cookie = cookie;
	return;
}


//
// WikEdGetOffsetTop: get element offset relative to window top (code copied to wikEdDiff.js)
//

window.WikEdGetOffsetTop = function(element) {
	var offset = 0;
	do {
		offset += element.offsetTop;
	} while ( (element = element.offsetParent) != null );
	return(offset);
}


//
// WikEdGetOffsetLeft: get element offset relative to left window border
//

window.WikEdGetOffsetLeft = function(element) {
	var offset = 0;
	do {
		offset += element.offsetLeft;
	} while ( (element = element.offsetParent) != null );
	return(offset);
}


//
// WikEdAppendScript: append script to head
//

window.WikEdAppendScript = function(scriptUrl) {

	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = scriptUrl;
	head.appendChild(script);
	return;
}


//
// WikEdCleanNodes: remove DOM elements dynamically inserted by other scripts
//

window.WikEdCleanNodes = function(node) {

	if (wikEdCleanNodes == false) {
		return;
	}

// remove Web of Trust (WOT) tags
 	var divs = node.getElementsByTagName('div');
	for (var i = 0; i < divs.length; ++ i) {
		var div = divs[i];

// test for WOT class names
		var divClass = div.className;
		if (/^wot-/.test(divClass) == true) {
			var divParent = div.parentNode;
			if (divParent != null) {
				divParent.removeChild(div);
			}
			continue;
		}

// test for WOT attributes
		var divAttrs = div.attributes;
		for (var j = 0; j < divAttrs.length; ++ j) {
			var attr = divAttrs.item(j);
			if ( (attr.nodeName == 'wottarget') || (/^link[0-9a-f]{30,}/.test(attr.nodeName) == true) ) {
				var divParent = div.parentNode;
				if (divParent != null) {
					divParent.removeChild(div);
				}
				break;
			}
		}
	}
	return;
}


// define leaf elements for WikEdGetInnerHTML
window.wikEdLeafElements = [];
wikEdLeafElements['IMG'] = true;
wikEdLeafElements['HR'] = true;
wikEdLeafElements['BR'] = true;
wikEdLeafElements['INPUT'] = true;


//
// WikEdParseDOM: parses a DOM subtree and and adds plain text into a complex data structure
//   wikEdFrameDOMCache contains the last parse if the frame has not changed
//

window.WikEdParseDOM = function(obj, topNode) {

/* problematic because of obj.changed ////
	if (wikEdFrameDOMCache != null) {
		obj = wikEdFrameDOMCache;
		return;
	}
*/

	obj.plainLength = 0;
	obj.plainArray = [];
	obj.plainNode = [];
	obj.plainStart = [];
	obj.plainPos = [];
	WikEdParseDOMRecursive(obj, topNode);
	obj.plain = obj.plainArray.join('');
	wikEdFrameDOMCache = obj;

	return;
}


//
// WikEdParseDOMRecursive: parses a DOM tree and and adds plain text into the data structure
//

window.WikEdParseDOMRecursive = function(obj, currentNode) {

// cycle through the child nodes of currentNode
	for (var property in currentNode.childNodes) {
		var childNode = currentNode.childNodes[property];
		if (typeof(childNode) == 'string') {
			continue;
		}
		if (childNode == null) {
			break;
		}

// check for selection
		if (childNode == obj.sel.focusNode) {
			obj.plainFocus = obj.plainLength + obj.sel.focusOffset;
		}
		if (childNode == obj.sel.anchorNode) {
			obj.plainAnchor = obj.plainLength + obj.sel.anchorOffset;
		}
		var value = null;

// get text of child node
		switch (childNode.nodeType) {
			case 1:
				if ( (childNode.childNodes.length == 0) && (wikEdLeafElements[childNode.nodeName] == true) ) {
					if (childNode.nodeName == 'BR') {
						value = '\n';
					}
				}
				else {
					WikEdParseDOMRecursive(obj, childNode);
				}
				break;
			case 3:
				value = childNode.nodeValue;
				value = value.replace(/\n/g, ' ');
				break;
			case 5:
				value = '&' + childNode.nodeName + ';';
				break;
		}

// add text to text object
		if (value != null) {

// array of text fragments
			obj.plainArray.push(value);

// array of text fragment node references
			obj.plainNode.push(childNode);

// array of text fragment text positions
			obj.plainStart.push(obj.plainLength);

// node references containing text positions
			obj.plainPos[childNode] = obj.plainLength;

// current text length
			obj.plainLength += value.length;
		}
	}
	return;
}


//
// WikEdGetInnerHTML: get the innerHTML from a document fragment
//

window.WikEdGetInnerHTML = function(obj, currentNode) {

// initialize string
	if (obj.html == null) {
		obj.html = '';
	}
	if (obj.plain == null) {
		obj.plain = '';
	}
	if (obj.plainArray == null) {
		obj.plainArray = [];
		obj.plainNode = [];
		obj.plainStart = [];
	}

	for (var i = 0; i < currentNode.childNodes.length; i ++) {
		var childNode = currentNode.childNodes.item(i);
		switch (childNode.nodeType) {
			case 1:
				obj.html += '<' + childNode.nodeName.toLowerCase();
				for (var j = 0; j < childNode.attributes.length; j ++) {
					if (childNode.attributes.item(j).nodeValue != null) {
						obj.html += ' ' + childNode.attributes.item(j).nodeName + '="' + childNode.attributes.item(j).nodeValue.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '"';
					}
				}
				if ( (childNode.childNodes.length == 0) && wikEdLeafElements[childNode.nodeName] ) {
					obj.html += '>';
					if (childNode.nodeName == 'BR') {
						obj.plainArray.push('\n');
						obj.plainNode.push(childNode);
						obj.plainStart.push(obj.plain.length);
						obj.plain += '\n';
					}
				}
				else {
					obj.html += '>';
					WikEdGetInnerHTML(obj, childNode);
					obj.html += '</' + childNode.nodeName.toLowerCase() + '>'
				}
				break;
			case 3:
				var value = childNode.nodeValue;
				value = value.replace(/\n/g, ' '); // important for pasted page content
				obj.plainArray.push(value);        // plain array contains & < > instead of &amp; &lt; &gt;
				obj.plainNode.push(childNode);
				obj.plainStart.push(obj.plain.length);
				value = value.replace(/&/g, '&amp;');
				value = value.replace(/</g, '&lt;');
				value = value.replace(/>/g, '&gt;');
				obj.html += value;
				obj.plain += value;
				break;
			case 4: obj.html += '<![CDATA[' + childNode.nodeValue + ']]>';
				break;
			case 5:
				var value = '&' + childNode.nodeName + ';';
				obj.plainArray.push(value);
				obj.plainNode.push(childNode);
				obj.plainStart.push(obj.plain.length);
				value = value.replace(/&/g, '&amp;');
				obj.html += value;
				obj.plain += value;
				break;
			case 8: obj.html += '<!--' + childNode.nodeValue + '-->';
				break;
		}
	}
	return;
}


//
// WikEdStyleSheet: create a new style sheet object (code copied to wikEdDiff.js)
//

window.WikEdStyleSheet = function(contextObj) {

	if (contextObj == null) {
		contextObj = document;
	}
	this.styleElement = null;

// MS IE compatibility
	if (contextObj.createStyleSheet) {
		this.styleElement = contextObj.createStyleSheet();
	}

// standards compliant browsers
	else {
		this.styleElement = contextObj.createElement('style');
		this.styleElement.from = 'text/css';
		var insert = contextObj.getElementsByTagName('head')[0];
		if (insert != null) {
			this.styleElement.appendChild(contextObj.createTextNode('')); // Safari 3 fix
			insert.appendChild(this.styleElement);
		}
	}

//
// WikEdStyleSheet.addRule: add one rule at the time using DOM method, very slow
//

	this.addRule = function(selector, declaration) {

// MS IE compatibility
		if (this.styleElement.addRule != null) {
			if (declaration.length > 0) {
				this.styleElement.addRule(selector, declaration);
			}
		}

// standards compliant browsers
		else {
			if (this.styleElement.sheet != null) {
				if (this.styleElement.sheet.insertRule != null) {
					this.styleElement.sheet.insertRule(selector + ' { ' + declaration + ' } ', 0);
				}
			}
		}
	}


//
// WikEdStyleSheet.addRules: add all rules at once, much faster
//

	this.addRules = function(rules) {

// MS IE compatibility
		if (this.styleElement.innerHTML == null) {
			this.styleElement.cssText = rules;
		}

// Safari, Chrome, WebKit
		else if ( (wikEdSafari == true) || (wikEdChrome == true) || (wikEdWebKit == true) ) {
			this.styleElement.appendChild(contextObj.createTextNode(rules));
		}

// via innerHTML
		else {
			this.styleElement.innerHTML = rules;
		}
		return;
	}
}


//
// WikEdGetStyle: get computed style properties for non-inline css definitions
//

window.WikEdGetStyle = function(element, styleProperty) {

	var style;
	if (element != null) {
		if ( (document.defaultView != null) && (document.defaultView.getComputedStyle != null) ) {
			style = document.defaultView.getComputedStyle(element, null)[styleProperty];
		}

// MS IE compatibility
		else if (element.currentStyle != null) {
			style = element.currentStyle[styleProperty];

// recurse up trough the DOM tree
			if (style == 'inherit') {
				style = WikEdGetStyle(element.parentNode, styleProperty);
			}
		}
		else {
			style = element.style[styleProperty];
		}
	}
	return(style);
}


//
// WikEdAjaxRequest: cross browser wrapper for Ajax requests (code copied to wikEdDiff.js)
//

window.WikEdAjaxRequest = function(requestMethod, requestUrl, headerName, headerValue, bodyData, overrideMimeType, responseHandler) {

	var request;

// use Greasemonkey GM_xmlhttpRequest
	if (wikEdGreasemonkey == true) {

		var headerArray = { 'User-Agent': navigator.userAgent }
		if (headerName != null) {
			headerArray[headerName] = headerValue;
		}
		request = new GM_xmlhttpRequest({
			'method':  requestMethod,
			'url':     requestUrl,
			'headers': headerArray,
			'data':    bodyData,
			'onreadystatechange':
				function(ajax) {
					if (ajax.readyState != 4) {
						return;
					}
					responseHandler(ajax);
					return;
				}
		});
	}

// use standard XMLHttpRequest
	else {

// allow ajax request from local copy for testing
		if (wikEdAllowLocalAjax == true) {
			if (typeof(netscape) == 'object') {
				netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
			}
		}

// new ajax request object
		try {
			request = new XMLHttpRequest();
		}

// IE 6
		catch(err) {
			try {
				request = new ActiveXObject('Microsoft.XMLHTTP');
			}

// IE 5.5
			catch(err) {
				try {
					request = new ActiveXObject('Msxml2.XMLHTTP');
				}
				catch(err) {
					return;
				}
			}
		}
		request.open(requestMethod, requestUrl, true);
		if (headerName != null) {
			request.setRequestHeader(headerName, headerValue);
		}
		if ( (request.overrideMimeType != null) && (overrideMimeType != null) ) {
			request.overrideMimeType(overrideMimeType);
		}
		request.send(bodyData);
		request.onreadystatechange = function() {
			if (request.readyState != 4) {
				return;
			}
			responseHandler(request);
			return;
		}
	}
	return;
}


//
// WikEdGetGlobal: access values of global variables from Greasemonkey scripts using the 'location hack' (code copied to wikEdDiff.js)
//

window.WikEdGetGlobal = function(globalName) {
	var globalValue;
	if (wikEdGreasemonkey == true) {
		if (wikEdGetGlobalNode == null) {
			wikEdGetGlobalNode = document.getElementById('wikEdGetGlobalNode');
		}
		if (wikEdGetGlobalNode == null) {
			wikEdGetGlobalNode = document.createElement('textarea');
			wikEdGetGlobalNode.id = 'wikEdGetGlobalNode';
			wikEdGetGlobalNode.style.display = 'none';
			wikEdGetGlobalNode.style.visibility = 'hidden';
			document.body.appendChild(wikEdGetGlobalNode);
		}
		location.href = 'javascript:void(typeof(' + globalName + ')!=\'undefined\'?(' + globalName + '!=null?(document.getElementById(\'wikEdGetGlobalNode\').value=' + globalName + '.toString()):null):null)';
		globalValue = wikEdGetGlobalNode.value;
	}
	else {
		try {
			globalValue = eval(globalName + '.toString();');
		}
		catch(err) { }
	}
	return(globalValue);
}


//
// WikEdGetAttribute: MS IE compatibility wrapper for element.getAttribute()
//

window.WikEdGetAttribute = function(element, attribName) {

	var attribValue = element.getAttribute(attribName);

// MS IE compatibility for checked
	if (attribName == 'checked') {
		if ( typeof(attribValue) == 'boolean' ) {
			if (attribValue == true) {
				attribValue = 'true';
			}
			else {
				attribValue = 'false';
			}
		}
	}
	return(attribValue);
}


//
// WikEdGetWindowInnerHeight: MS IE compatibility wrapper for window.innerHeight
//

window.WikEdGetWindowInnerHeight = function() {

	var value = window.innerHeight;
	if (value == null) {
		if (document.documentElement != null) {
			value = document.documentElement.clientHeight;
		}
		if ( (value == null) || (value == 0) ) {
			value = document.body.clientHeight
		}
	}
	return(value);
}


//
// WikEdGetWindowInnerWidth: MS IE compatibility wrapper for window.innerWidth
//

window.WikEdGetWindowInnerWidth = function() {

	var value = window.innerWidth;
	if (value == null) {
		if (document.documentElement != null) {
			value = document.documentElement.clientWidth;
		}
		if ( (value == null) || (value == 0) ) {
			value = document.body.clientWidth
		}
	}
	return(value);
}


//
// WikEdAddEventListener: wrapper for addEventListener (http://ejohn.org/projects/flexible-javascript-events/)
//

window.WikEdAddEventListener = function(domElement, eventType, eventHandler, useCapture) {

	if (domElement != null) {
		if (domElement.attachEvent != null) {
			domElement['wikEd' + eventType + eventHandler] = eventHandler;
			domElement[eventType + eventHandler] = function() {
				domElement['wikEd' + eventType + eventHandler](window.event);
			}
			domElement.attachEvent('on' + eventType, domElement[eventType + eventHandler] );
		}
		else {
			domElement.addEventListener(eventType, eventHandler, useCapture);
		}
	}
	return;
}


//
// WikEdRemoveEventListener: wrapper for removeEventListener
//

window.WikEdRemoveEventListener = function(domElement, eventType, eventHandler, useCapture) {

	if (domElement.detachEvent != null) {
		domElement.detachEvent('on' + eventType, domElement[eventType + eventHandler]);
		domElement[eventType + eventHandler] = null;
	}
	else {
		domElement.removeEventListener(eventType, eventHandler, useCapture);
	}
	return;
}


//
// WikEdEvent: MS IE compatibility fix for event object
//

window.WikEdEvent = function(event) {

	var eventAlt;
	if (window.event != null) {
		eventAlt = window.event;
	}
	else if (wikEdFrameWindow.event != null) {
		eventAlt = wikEdFrameWindow.event;
	}
	if (eventAlt != null) {
		event = eventAlt;
		event.stopPropagation = function() {
			event.cancelBubble = true;
		};
		event.preventDefault = function() {
			event.returnValue = false;
		};
		event.target = event.srcElement;
		if (event.type == 'mouseout') {
			event.relatedTarget = event.toElement;
		}
		else if (event.type == 'mouseover') {
			event.relatedTarget = event.fromElement;
		}
	}
	return(event);
}


//
// WikEdDebug: print the value of variables
//   use either a single value or a description followed by a value
//   popup = true: use alert popup if debug textarea is not yet setup
//

window.WikEdDebug = function(objectName, object, usePopup) {

	var useDebug;
	if (typeof(wikEdDebug) != 'undefined') {
		if (wikEdDebug != null) {
			useDebug = true;
		}
	}

// use debug textarea
	if (useDebug == true) {
		wikEdDebugWrapper.style.position = 'static';
		wikEdDebugWrapper.style.visibility = 'visible';
		wikEdDebug.style.display = 'block';
		if (objectName == null) {
			wikEdDebug.value = '';
		}
		else {
			if (object == null) {
				wikEdDebug.value = objectName + '\n' + wikEdDebug.value;
			}
			else {
				wikEdDebug.value = objectName + ': ' + object + '\n' + wikEdDebug.value;
			}
		}
	}

// use popup alert
	else if (usePopup == true) {
		if (object == null) {
			alert(objectName);
		}
		else {
			alert(objectName + ': ' + object);
		}
	}

// use error console
	else {
		var msg;
		if (object == null) {
			msg = objectName + '';
		}
		else {
			msg = objectName + ': ' + object;
		}
		msg = msg.replace(/\'/g, '\\\'');
		setTimeout('throw new Error(\'WikEdDebug: ' + msg + '\')', 0);
	}
	return;
}


//
// WikEdDebugTimer: show all measured timepoints
//   add a new time measurement: wikEdDebugTimer.push([1234, new Date]);

window.WikEdDebugTimer = function() {
	var times = '';
	var start = wikEdDebugTimer[0][1].getTime();
	var prev = 0;
	for (var i = 0; i < wikEdDebugTimer.length; i ++) {
		var curr = wikEdDebugTimer[i][1].getTime() - start;
		var diff = curr - prev;
		var prev = curr;
		times += wikEdDebugTimer[i][0] + ': ' + curr + ' ms (+ ' + diff + ' ms)\n';
	}
	WikEdDebug(times);
	wikEdDebugTimer = [];
}


//
// WikEdInsertTags: overrides the insertTags function in wikibits.js used by the standard button toolbar and the editpage special chars
//

window.WikEdInsertTags = function(tagOpen, tagClose, sampleText) {

	if (wikEdUseWikEd == true) {
		WikEdEditButton(document.getElementById('wikEdInsertTags'), 'wikEdInsertTags', [tagOpen, tagClose, sampleText]);
	}
	else if (WikEdInsertTagsOriginal != null) {
		WikEdInsertTagsOriginal(tagOpen, tagClose, sampleText);
	}
	return;
}


//
// WikEdInsertAtCursor: overrides the insertAtCursor function in wikia.com MediaWiki:Functions.js
//

window.WikEdInsertAtCursor = function(myField, myValue) {

	if (wikEdUseWikEd == true) {
		if (myField == wikEdTextarea) {
			WikEdEditButton(document.getElementById('wikEdInsertTags'), 'wikEdInsertTags', [ myValue ]);
		}
	}
	else if (WikEdInsertAtCursorOriginal != null) {
		WikEdInsertAtCursorOriginal(myField, myValue);
	}
	return;
}


//
// WikEdExecuteHook: executes scheduled custom functions from functionsHook array
//

window.WikEdExecuteHook = function(functionsHook) {

	for (var i = 0; i < functionsHook.length; i++) {
		functionsHook[i]();
	}
	return;
}


//
// WikEdInitUnicode: define character tables used in WikedFixUnicode()
//   see http://kmi.open.ac.uk/projects/ceryle/doc/docs/NOTE-charents.html
//   removed because of internal use: < ['003c', 'lt']; > ['003e', 'gt']; & ['0026', 'amp'], ['00a0', 'nbsp']

window.WikEdInitUnicode = function() {

// define only once
	if (wikEdSupportedChars != null) {
		return;
	}

// supported chars in Mozilla and IE
	wikEdSupportedChars = [
		[  'a1', 'iexcl'],  // ¡
		[  'a2', 'cent'],   // ¢
		[  'a3', 'pound'],  // £
		[  'a4', 'curren'], // ¤
		[  'a5', 'yen'],    // ¥
		[  'a6', 'brvbar'], // ¦
		[  'a7', 'sect'],   // §
		[  'a8', 'uml'],    // ¨
		[  'a9', 'copy'],   // ©
		[  'aa', 'ordf'],   // ª
		[  'ab', 'laquo'],  // «
		[  'ac', 'not'],    // ¬
		[  'ae', 'reg'],    // ®
		[  'af', 'macr'],   // ¯
		[  'b0', 'deg'],    // °
		[  'b1', 'plusmn'], // ±
		[  'b2', 'sup2'],   // ²
		[  'b3', 'sup3'],   // ³
		[  'b4', 'acute'],  // ´
		[  'b5', 'micro'],  // µ
		[  'b6', 'para'],   // ¶
		[  'b7', 'middot'], // ·
		[  'b8', 'cedil'],  // ¸
		[  'b9', 'sup1'],   // ¹
		[  'ba', 'ordm'],   // º
		[  'bb', 'raquo'],  // »
		[  'bc', 'frac14'], // ¼
		[  'bd', 'frac12'], // ½
		[  'be', 'frac34'], // ¾
		[  'bf', 'iquest'], // ¿
		[  'c0', 'Agrave'], // À
		[  'c1', 'Aacute'], // Á
		[  'c2', 'Acirc'],  // Â
		[  'c3', 'Atilde'], // Ã
		[  'c4', 'Auml'],   // Ä
		[  'c5', 'Aring'],  // Å
		[  'c6', 'AElig'],  // Æ
		[  'c7', 'Ccedil'], // Ç
		[  'c8', 'Egrave'], // È
		[  'c9', 'Eacute'], // É
		[  'ca', 'Ecirc'],  // Ê
		[  'cb', 'Euml'],   // Ë
		[  'cc', 'Igrave'], // Ì
		[  'cd', 'Iacute'], // Í
		[  'ce', 'Icirc'],  // Î
		[  'cf', 'Iuml'],   // Ï
		[  'd0', 'ETH'],    // Ð
		[  'd1', 'Ntilde'], // Ñ
		[  'd2', 'Ograve'], // Ò
		[  'd3', 'Oacute'], // Ó
		[  'd4', 'Ocirc'],  // Ô
		[  'd5', 'Otilde'], // Õ
		[  'd6', 'Ouml'],   // Ö
		[  'd7', 'times'],  // ×
		[  'd8', 'Oslash'], // Ø
		[  'd9', 'Ugrave'], // Ù
		[  'da', 'Uacute'], // Ú
		[  'db', 'Ucirc'],  // Û
		[  'dc', 'Uuml'],   // Ü
		[  'dd', 'Yacute'], // Ý
		[  'de', 'THORN'],  // Þ
		[  'df', 'szlig'],  // ß
		[  'e0', 'agrave'], // à
		[  'e1', 'aacute'], // á
		[  'e2', 'acirc'],  // â
		[  'e3', 'atilde'], // ã
		[  'e4', 'auml'],   // ä
		[  'e5', 'aring'],  // å
		[  'e6', 'aelig'],  // æ
		[  'e7', 'ccedil'], // ç
		[  'e8', 'egrave'], // è
		[  'e9', 'eacute'], // é
		[  'ea', 'ecirc'],  // ê
		[  'eb', 'euml'],   // ë
		[  'ec', 'igrave'], // ì
		[  'ed', 'iacute'], // í
		[  'ee', 'icirc'],  // î
		[  'ef', 'iuml'],   // ï
		[  'f0', 'eth'],    // ð
		[  'f1', 'ntilde'], // ñ
		[  'f2', 'ograve'], // ò
		[  'f3', 'oacute'], // ó
		[  'f4', 'ocirc'],  // ô
		[  'f5', 'otilde'], // õ
		[  'f6', 'ouml'],   // ö
		[  'f7', 'divide'], // ÷
		[  'f8', 'oslash'], // ø
		[  'f9', 'ugrave'], // ù
		[  'fa', 'uacute'], // ú
		[  'fb', 'ucirc'],  // û
		[  'fc', 'uuml'],   // ü
		[  'fd', 'yacute'], // ý
		[  'fe', 'thorn'],  // þ
		[  'ff', 'yuml'],   // ÿ
		[  '27', 'apos'],   // '
		[  '22', 'quot'],   // "
		[ '152', 'OElig'],  // Œ
		[ '153', 'oelig'],  // œ
		[ '160', 'Scaron'], // Š
		[ '161', 'scaron'], // š
		[ '178', 'Yuml'],   // Ÿ
		[ '2c6', 'circ'],   // ˆ
		[ '2dc', 'tilde'],  // ˜
		['2013', 'ndash'],  // –
		['2014', 'mdash'],  // —
		['2018', 'lsquo'],  // ‘
		['2019', 'rsquo'],  // ’
		['201a', 'sbquo'],  // ‚
		['201c', 'ldquo'],  // “
		['201d', 'rdquo'],  // ”
		['201e', 'bdquo'],  // „
		['2020', 'dagger'], // †
		['2021', 'Dagger'], // ‡
		['2030', 'permil'], // ‰
		['2039', 'lsaquo'], // ‹
		['203a', 'rsaquo'], // ›
		['20ac', 'euro'],   // €
		[ '192', 'fnof'],   // ƒ
		[ '391', 'Alpha'],  // Α
		[ '392', 'Beta'],   // Β
		[ '393', 'Gamma'],  // Γ
		[ '394', 'Delta'],  // Δ
		[ '395', 'Epsilon'],// Ε
		[ '396', 'Zeta'],   // Ζ
		[ '397', 'Eta'],    // Η
		[ '398', 'Theta'],  // Θ
		[ '399', 'Iota'],   // Ι
		[ '39a', 'Kappa'],  // Κ
		[ '39b', 'Lambda'], // Λ
		[ '39c', 'Mu'],     // Μ
		[ '39d', 'Nu'],     // Ν
		[ '39e', 'Xi'],     // Ξ
		[ '39f', 'Omicron'],// Ο
		[ '3a0', 'Pi'],     // Π
		[ '3a1', 'Rho'],    // Ρ
		[ '3a3', 'Sigma'],  // Σ
		[ '3a4', 'Tau'],    // Τ
		[ '3a5', 'Upsilon'],// Υ
		[ '3a6', 'Phi'],    // Φ
		[ '3a7', 'Chi'],    // Χ
		[ '3a8', 'Psi'],    // Ψ
		[ '3a9', 'Omega'],  // Ω
		[ '3b1', 'alpha'],  // α
		[ '3b2', 'beta'],   // β
		[ '3b3', 'gamma'],  // γ
		[ '3b4', 'delta'],  // δ
		[ '3b5', 'epsilon'],// ε
		[ '3b6', 'zeta'],   // ζ
		[ '3b7', 'eta'],    // η
		[ '3b8', 'theta'],  // θ
		[ '3b9', 'iota'],   // ι
		[ '3ba', 'kappa'],  // κ
		[ '3bb', 'lambda'], // λ
		[ '3bc', 'mu'],     // μ
		[ '3bd', 'nu'],     // ν
		[ '3be', 'xi'],     // ξ
		[ '3bf', 'omicron'],// ο
		[ '3c0', 'pi'],     // π
		[ '3c1', 'rho'],    // ρ
		[ '3c2', 'sigmaf'], // ς
		[ '3c3', 'sigma'],  // σ
		[ '3c4', 'tau'],    // τ
		[ '3c5', 'upsilon'],// υ
		[ '3c6', 'phi'],    // φ
		[ '3c7', 'chi'],    // χ
		[ '3c8', 'psi'],    // ψ
		[ '3c9', 'omega'],  // ω
		['2022', 'bull'],   // •
		['2026', 'hellip'], // …
		['2032', 'prime'],  // ′
		['2033', 'Prime'],  // ″
		['203e', 'oline'],  // ‾
		['2044', 'frasl'],  // ⁄
		['2122', 'trade'],  // ™
		['2190', 'larr'],   // ←
		['2191', 'uarr'],   // ↑
		['2192', 'rarr'],   // →
		['2193', 'darr'],   // ↓
		['2194', 'harr'],   // ↔
		['21d2', 'rArr'],   // ⇒
		['21d4', 'hArr'],   // ⇔
		['2200', 'forall'], // ∀
		['2202', 'part'],   // ∂
		['2203', 'exist'],  // ∃
		['2207', 'nabla'],  // ∇
		['2208', 'isin'],   // ∈
		['220b', 'ni'],     // ∋
		['220f', 'prod'],   // ∏
		['2211', 'sum'],    // ∑
		['2212', 'minus'],  // −
		['221a', 'radic'],  // √
		['221d', 'prop'],   // ∝
		['221e', 'infin'],  // ∞
		['2220', 'ang'],    // ∠
		['2227', 'and'],    // ∧
		['2228', 'or'],     // ∨
		['2229', 'cap'],    // ∩
		['222a', 'cup'],    // ∪
		['222b', 'int'],    // ∫
		['2234', 'there4'], // ∴
		['223c', 'sim'],    // ∼
		['2248', 'asymp'],  // ≈
		['2260', 'ne'],     // ≠
		['2261', 'equiv'],  // ≡
		['2264', 'le'],     // ≤
		['2265', 'ge'],     // ≥
		['2282', 'sub'],    // ⊂
		['2283', 'sup'],    // ⊃
		['2286', 'sube'],   // ⊆
		['2287', 'supe'],   // ⊇
		['2295', 'oplus'],  // ⊕
		['22a5', 'perp'],   // ⊥
		['25ca', 'loz'],    // ◊
		['2660', 'spades'], // ♠
		['2663', 'clubs'],  // ♣
		['2665', 'hearts'], // ♥
		['2666', 'diams']   // ♦
	];

// special chars (spaces and invisible characters)
	wikEdSpecialChars = [
		['2002', 'ensp'],   //   en space
		[  'ad', 'shy'],    // ­ soft hyphen
		['2003', 'emsp'],   //   em space
		['2009', 'thinsp'], //    thin space
		['200c', 'zwnj'],   // ‌ zero width non-joiner
		['200d', 'zwj'],    // ‍ zero width joiner
		['200e', 'lrm'],    // ‎ left-to-right mark
		['200f', 'rlm']     // ‏ right-to-left mark
	];

// unsupported chars in IE6
	wikEdProblemChars = [
		[ '3d1', 'thetasym'], // ϑ
		[ '3d2', 'upsih'],    // ϒ
		[ '3d6', 'piv'],      // ϖ
		['2118', 'weierp'],   // ℘
		['2111', 'image'],    // ℑ
		['211c', 'real'],     // ℜ
		['2135', 'alefsym'],  // ℵ
		['21b5', 'crarr'],    // ↵
		['21d0', 'lArr'],     // ⇐
		['21d1', 'uArr'],     // ⇑
		['21d3', 'dArr'],     // ⇓
		['2205', 'empty'],    // ∅
		['2209', 'notin'],    // ∉
		['2217', 'lowast'],   // ∗
		['2245', 'cong'],     // ≅
		['2284', 'nsub'],     // ⊄
		['22a5', 'perp'],     // ⊥
		['2297', 'otimes'],   // ⊗
		['22c5', 'sdot'],     // ⋅
		['2308', 'lceil'],    // ⌈
		['2309', 'rceil'],    // ⌉
		['230a', 'lfloor'],   // ⌊
		['230b', 'rfloor'],   // ⌋
		['2329', 'lang'],     // 〈
		['232a', 'rang']      // 〉
	];

// syntax highlighting of ASCII control characters and invisibles (decimal value, title)
	wikEdControlCharHighlighting = {
		'0': 'null',
		'1': 'start of heading',
		'2': 'start of text',
		'3': 'end of text',
		'4': 'end of transmission',
		'5': 'enquiry',
		'6': 'acknowledge',
		'7': 'bell',
		'8': 'backspace',
		'11': 'vertical tab',
		'12': 'form feed, new page',
		'14': 'shift out',
		'15': 'shift in',
		'16': 'data link escape',
		'17': 'device control 1',
		'18': 'device control 2',
		'19': 'device control 3',
		'20': 'device control 4',
		'21': 'negative acknowledge',
		'22': 'synchronous idle',
		'23': 'end of trans. block',
		'24': 'cancel',
		'25': 'end of medium',
		'26': 'substitute',
		'27': 'escape',
		'28': 'file separator',
		'29': 'group separator',
		'30': 'record separator',
		'31': 'unit separator',
		'8204': 'zero width non-joiner', // \u200c
		'8205': 'zero width joiner',     // \u200d
		'8206': 'left-to-right mark',    // \u200e
		'8207': 'right-to-left mark',    // \u200f
		'8232': 'line separator',        // \u2028
		'8233': 'paragraph separator'    // \u2028
	};
	for (var decimalValue in wikEdControlCharHighlighting) {
		if (typeof(wikEdControlCharHighlighting[decimalValue]) != 'string') {
			continue;
		}
		wikEdControlCharHighlightingStr += '\\' + String.fromCharCode(decimalValue);
	}

// character syntax highlighting: strange spaces, hyphens, and dashes (decimal value, class = title)
	wikEdCharHighlighting = {
		'9':    'wikEdTab',        // \u0009 '	'
		'8194': 'wikEdEnSpace',    // \u2002 ' '
		'8195': 'wikEdEmSpace',    // \u2003 ' '
		'8201': 'wikEdThinSpace',  // \u2009 ' '
		'45':   'wikEdHyphenDash', // \u00a0 '-'
		'173':  'wikEdSoftHyphen', // \u00ad '­'
		'8210': 'wikEdFigureDash', // \u2012 '‒'
		'8211': 'wikEdEnDash',     // \u2013 '–'
		'8212': 'wikEdEmDash',     // \u2014 '—'
		'8213': 'wikEdBarDash',    // \u2015 '―'
		'8722': 'wikEdMinusDash'   // \u2212 '−'
	};
	for (var decimalValue in wikEdCharHighlighting) {
		if (typeof(wikEdCharHighlighting[decimalValue]) != 'string') {
			continue;
		}
		wikEdCharHighlightingStr += '\\' + String.fromCharCode(decimalValue);
	}

	return;
}

// call wikEd startup
WikEdStartup();

// </nowiki></pre>