// 01:23, February 9, 2015 (UTC)
// CUSTOM EDIT BUTTONS
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code>
//   to [[Special:Mypage/common.js]]

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/c/c9/Button_strike.png/revision/latest?cb=20150610035107",
        "speedTip": "Strike-through",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/f/fd/Button_underline.png/revision/latest?cb=20150610035108",
        "speedTip": "Underline",
        "tagOpen": "<u>",
        "tagClose": "</u>",
        "sampleText": "Underline text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/2/23/Button_code.png/revision/latest?cb=20150610035051",
        "speedTip": "Code",
        "tagOpen": "<code>",
        "tagClose": "</code>",
        "sampleText": "Code text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/8/80/Button_upper_letter.png/revision/latest?cb=20150610035113",
        "speedTip": "Superscript",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Superscript text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/7/70/Button_lower_letter.png/revision/latest?cb=20150610035100",
        "speedTip": "Subscript",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Subscript text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/5/5f/Button_center.png/revision/latest?cb=20150610035050",
        "speedTip": "Center",
        "tagOpen": "<center>",
        "tagClose": "</center>",
        "sampleText": "Center Text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/f/fd/Button_blockquote.png/revision/latest?cb=20150610035049",
        "speedTip": "Insert block of quoted text",
        "tagOpen": "<blockquote>\n",
        "tagClose": "\n</blockquote>",
        "sampleText": "Block quote"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/7/72/Button_span_2.png/revision/latest?cb=20150610035105",
        "speedTip": "Span",
        "tagOpen": "<span>",
        "tagClose": "</span>",
        "sampleText": "Span Text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/d/d4/Button_div.png/revision/latest?cb=20150610035052",
        "speedTip": "Div",
        "tagOpen": "<div>",
        "tagClose": "</div>",
        "sampleText": "Div Text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/3/34/Button_hide_comment.png/revision/latest?cb=20150610035057",
        "speedTip": "Insert hidden Comment",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Comment"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/1/13/Button_enter.png/revision/latest?cb=20150610035054",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/0/0d/Button_hr.png/revision/latest?cb=20150610035059",
        "speedTip": "Horizontal line (use sparingly)",
        "tagOpen": "<hr />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/1/12/Button_gallery.png/revision/latest?cb=20150610035056",
        "speedTip": "Insert a picture gallery",
        "tagOpen": "\n<gallery>\n",
        "tagClose": "\n</gallery>",
        "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"
    };


    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/5/59/Youtube_icon.png/revision/latest?cb=20150610035818",
        "speedTip": "Embed a YouTube Video",
        "tagOpen": "<nowiki><nowiki><nowiki><youtube>",
        "tagClose": "</youtube></nowiki></nowiki></nowiki>",
        "sampleText": "Video ID"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/3/31/HighlightButton.png/revision/latest?cb=20150610035115",
        "speedTip": "Highlight",
        "tagOpen": "<span style='background:yellow'>",
        "tagClose": "</span>",
        "sampleText": "Highlighted text here."
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/5/56/Button_big.png/revision/latest?cb=20150610035048",
        "speedTip": "Large Text",
        "tagOpen": "<big>",
        "tagClose": "</big>",
        "sampleText": "Insert Text Here"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/sonako/images/5/58/Button_small.png/revision/latest?cb=20150610035103",
        "speedTip": "Small Text",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Insert Text Here"
    };

}