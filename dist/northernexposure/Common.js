/* Any JavaScript here will be loaded for all users on every page load. */

/* Description: More edit toolbar buttons
   Maintainers: [[w:User:MarkS]]?, [[w:User:Voice of All]], [[w:User:R. Koot]]*/

/* This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All. This is based on the original code on [[w:Wikipedia:Tools/Editing tools]]. To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]*/

if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/41/Button_hr_halfwidth.png",
    "speedTip": "half-width horizontal line (<hr>)",
    "tagOpen": "<center><hr style=width:50%></center>",
    "tagClose": "",
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/69/Button_Wikipedia_link.png",
    "speedTip": "Wikipedia link - template ({{w|}})",
    "tagOpen": "{{w|",
    "tagClose": "}}",
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3a/Button_headline3.png",
    "speedTip": "level 3 headline (<h3>)",
    "tagOpen": "\n===",
    "tagClose": "===",
    "sampleText": "text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6c/Button_see_also.png",
    "speedTip": "see also",
    "tagOpen": "==See also==\n* [[",
    "tagClose": "]]",
    "sampleText": "article"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
    "speedTip": "category",
    "tagOpen": "[[cat:",
    "tagClose": "]]",
    "sampleText": "category"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
    "speedTip": "redirect",
    "tagOpen": "#redirect[[",
    "tagClose": "]]",
    "sampleText": "redirect"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Tt_icon.png",
    "speedTip": "teletype (monospace) text",
    "tagOpen": "<tt>",
    "tagClose": "</tt>",
    "sampleText": "teletype text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3c/Button_pre.png",
    "speedTip": "preformatted text",
    "tagOpen": "<pre>",
    "tagClose": "</pre>",
    "sampleText": "preformatted text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
    "speedTip": "strikethrough text",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": "strikethrough text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
    "speedTip": "line break",
    "tagOpen": "<br />",
    "tagClose": "",
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
    "speedTip": "center text",
    "tagOpen": "<div style=text-align:center>",
    "tagClose": "</div>",
    "sampleText": "centered text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
    "speedTip": "superscript text",
    "tagOpen": "<sup>",
    "tagClose": "</sup>",
    "sampleText": "superscript text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
    "speedTip": "subscript text",
    "tagOpen": "<sub>",
    "tagClose": "</sub>",
    "sampleText": "subscript text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
    "speedTip": "small text",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": "small text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/56/Button_big.png",
    "speedTip": "big text",
    "tagOpen": "<big>",
    "tagClose": "</big>",
    "sampleText": "big text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_blockquote.png",
    "speedTip": "blockquote",
    "tagOpen": "<blockquote>\n",
    "tagClose": "\n</blockquote>",
    "sampleText": "block quote"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
    "speedTip": "comment",
    "tagOpen": "<!--",
    "tagClose": "-->",
    "sampleText": "comment"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/1c/Button_advanced_image.png",
    "speedTip": "image (advanced)",
    "tagOpen": "[[Image:",
    "tagClose": "|thumb|right|px|Caption]]",
    "sampleText": "image.ext"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
    "speedTip": "gallery",
    "tagOpen": "\n<gallery>\n",
    "tagClose": "\n</gallery>",
    "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
    "speedTip": "table",
    "tagOpen": '{| class=sortable\n|-\n',
    "tagClose": "\n|}",
    "sampleText": "!header 1 !!header 2 !!header 3\n|-\n| row 1, cell 1 || row 1, cell 2 || row 1, cell 3\n|-\n| row 2, cell 1 || row 2, cell 2 || row 2, cell 3"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a4/TableStart.png",
    "speedTip": "table start",
    "tagOpen": '{|',
    "tagClose": "",
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/4c/TableRow.png",
    "speedTip": "table row",
    "tagOpen": '|-',
    "tagClose": "",
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/71/TableCell.png",
    "speedTip": "table cell",
    "tagOpen": '|',
    "tagClose": "",
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/06/TableEnd.png",
    "speedTip": "table end",
    "tagOpen": "",
    "tagClose": '|}',
    "sampleText": ""};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/eb/Button_plantilla.png",
    "speedTip": "template",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "template"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/35/Button_substitute.png",
    "speedTip": "substitute template",
    "tagOpen": "{{subst:",
    "tagClose": "}}",
    "sampleText": "template"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/ce/Button_no_include.png",
    "speedTip": "noinclude",
    "tagOpen": "<noinclude>",
    "tagClose": "</noinclude>",
    "sampleText": "text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_include.png",
    "speedTip": "includeonly",
    "tagOpen": "<includeonly>",
    "tagClose": "</includeonly>",
    "sampleText": "text"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
    "speedTip": "Comment visible only for editors",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Insert comment here"};
}