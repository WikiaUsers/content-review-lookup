// CUSTOM EDIT BUTTONS
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code>
//   to [[Special:Mypage/common.js]]
 
if (typeof(mwCustomEditButtons) != 'undefined') {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/c/c8/Button_redirect.png',
        'speedTip': 'Đổi hướng',
        'tagOpen': '#REDIRECT [[',
        'tagClose': ']]',
        'sampleText': 'Tên trang để đổi hướng đến'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/e/e9/Button_headline2.png',
        'speedTip': 'Đề mục cấp 3',
        'tagOpen': '=== ',
        'tagClose': ' ===',
        'sampleText': 'Chèn chữ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette3.wikia.nocookie.net/sonako/images/b/b4/Button_category03.png',
        'speedTip': 'Chèn Category',
        'tagOpen': '[[Category:',
        'tagClose': ']]',
        'sampleText': 'Thể loại'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/e/ea/Button_align_left.png',
        'speedTip': 'Căn trái chữ',
        'tagOpen': '<div style="text-align: left; direction: ltr; margin-left: 1em;">\n',
        'tagClose': '\n<\/div>',
        'sampleText': 'Chèn chữ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/5/5f/Button_center.png',
        'speedTip': 'Center',
        'tagOpen': '<center>',
        'tagClose': '</center>',
        'sampleText': 'Căn giữa chữ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette4.wikia.nocookie.net/sonako/images/a/a5/Button_align_right.png',
        'speedTip': 'Căn phải chữ',
        'tagOpen': '<div style="text-align: right; direction: ltr; margin-left: 1em;">\n',
        'tagClose': '\n<\/div>',
        'sampleText': 'Chèn chữ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/1/13/Button_enter.png',
        'speedTip': 'Cách dòng',
        'tagOpen': '<br />',
        'tagClose': '',
        'sampleText': ''
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/e/e1/Button_smiley.png',
        'speedTip': 'Cách dòng hoàn toàn',
        'tagOpen': '<br style="clear: both;" />',
        'tagClose': '',
        'sampleText': ''
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette3.wikia.nocookie.net/sonako/images/0/0d/Button_hr.png',
        'speedTip': 'Vạch 1 đường ngang',
        'tagOpen': '<hr />',
        'tagClose': '',
        'sampleText': ''
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette3.wikia.nocookie.net/sonako/images/1/12/Button_gallery.png',
        'speedTip': 'Chèn gallery',
        'tagOpen': '\n<gallery>\n',
        'tagClose': '\n</gallery>',
        'sampleText': 'File:Example.jpg|Caption1\nFile:Example.jpg|Caption2'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		'imageFile': '//vignette4.wikia.nocookie.net/sonako/images/6/60/Button_insert_table.png',
		'speedTip': 'Chèn bảng',
		'tagOpen': '{| class="wikitable"\n|',
		'tagClose': '\n|}',
		'sampleText': '-\n! đầu 1\n! đầu 2\n! đầu 3\n|-\n| hàng 1, ô 1\n| hàng 1, ô 2\n| hàng 1, ô 3\n|-\n| hàng 2, ô 1\n| hàng 2, ô 2\n| hàng 2, ô 3'
    };	
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/3/31/HighlightButton.png',
        'speedTip': 'Bôi vàng nền chữ',
        'tagOpen': '<span style="background:yellow">',
        'tagClose': '</span>',
        'sampleText': 'Chữ được bôi vàng'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette3.wikia.nocookie.net/sonako/images/c/c9/Button_strike.png',
        'speedTip': 'Gạch ngang',
        'tagOpen': '<s>',
        'tagClose': '</s>',
        'sampleText': 'Chữ bị gạch'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/f/fd/Button_underline.png',
        'speedTip': 'Gạch dưới',
        'tagOpen': '<u>',
        'tagClose': '</u>',
        'sampleText': 'Chữ gạch dưới'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/2/23/Button_code.png',
        'speedTip': 'Code',
        'tagOpen': '<code>',
        'tagClose': '</code>',
        'sampleText': 'Code text'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/8/80/Button_upper_letter.png',
        'speedTip': 'Chữ mũ',
        'tagOpen': '<sup>',
        'tagClose': '</sup>',
        'sampleText': 'Chữ mũ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/7/70/Button_lower_letter.png',
        'speedTip': 'Chữ nhỏ dưới',
        'tagOpen': '<sub>',
        'tagClose': '</sub>',
        'sampleText': 'Chữ nhỏ dưới'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/f/fd/Button_blockquote.png',
        'speedTip': 'Chèn đoạn văn trích dẫn',
        'tagOpen': '<blockquote>\n',
        'tagClose': '\n</blockquote>',
        'sampleText': 'Đoạn trích dẫn'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette3.wikia.nocookie.net/sonako/images/7/72/Button_span_2.png',
        'speedTip': 'Span',
        'tagOpen': '<span>',
        'tagClose': '</span>',
        'sampleText': 'Span Text'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/d/d4/Button_div.png',
        'speedTip': 'Div',
        'tagOpen': '<div>',
        'tagClose': '</div>',
        'sampleText': 'Div Text'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette4.wikia.nocookie.net/sonako/images/7/74/Button_comment.png',
        'speedTip': 'Chèn chú thích ẩn',
        'tagOpen': '<!-- ',
        'tagClose': ' -->',
        'sampleText': 'Chú thích'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette4.wikia.nocookie.net/sonako/images/5/56/Button_big.png',
        'speedTip': 'Chữ to',
        'tagOpen': '<big>',
        'tagClose': '</big>',
        'sampleText': 'Chèn chữ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette3.wikia.nocookie.net/sonako/images/5/58/Button_small.png',
        'speedTip': 'Chữ nhỏ',
        'tagOpen': '<small>',
        'tagClose': '</small>',
        'sampleText': 'Chèn chữ'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette4.wikia.nocookie.net/sonako/images/1/11/Btn_toolbar_liste.png',
        'speedTip': 'Danh sách kiểu chấm',
        'tagOpen': '\n* ',
        'tagClose': '\n* Số 1\n* Số 2',
        'sampleText': 'Tên danh sách'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette2.wikia.nocookie.net/sonako/images/8/88/Btn_toolbar_enum.png',
        'speedTip': 'Danh sách kiểu số',
        'tagOpen': '\n# ',
        'tagClose': '\n# Số 1\n# Số 2',
        'sampleText': 'Tên danh sách'
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        'imageFile': '//vignette1.wikia.nocookie.net/sonako/images/d/d3/Button_definition_list.png',
        'speedTip': 'Danh sách kiểu định nghĩa',
        'tagOpen': '\n; ',
        'tagClose': '\n: Số 1\n: Số 2',
        'sampleText': 'Tên danh sách'
    };
}