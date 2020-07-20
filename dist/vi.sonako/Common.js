/* Any JavaScript here will be loaded for all users on every page load. */
// impart('MediaWiki:Snow.js');
// Shortcut for importArticle
function impart(article) {
    importArticle({ type: 'script', article: article });
}

jQuery.fx.interval = 80;

window.RefreshThreads = {
    interval: 30000
};

window.railWAM = {
     logPage:'Template:WAM Log',
     loadOnPage:'Special:WikiActivity',
     loadOnNamespace:[-1],
     lang:'vi'
};

window.ArticleRating = {
    title: 'Đánh giá trang này',
    values: ['Chán', 'Tàm Tạm', 'Bình thường', 'Tuyệt', 'Miễn chê'],
    starSize: [24, 24],
    starColor: ['#ccc', '#ffba01'],
    starStroke: '#000',
    location: 'top-rail'
}

window.DragDropUploader = true;

window.mbLoadingOpacity = 1;

window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(function() {
    $('.rc-conntent, .activityfeed')
        .find('a:not(.activityfeed-diff)')
        .each(function() {
            if ($(this).attr('href') !== '#') {
                $(this).attr('target', '_blank');
            }
        });
});

window.ajaxPages = ["Special:NewPages", "Special:ListFiles", "Sonako_Cập_Nhật", "Sonako_Real-Time_Feed"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Images", "Videos"];
window.AjaxRCRefreshText = "Auto-refresh";
window.AjaxRCRefreshHoverText = "Tự động làm mới trang sau mỗi 60 giây";
window.ajaxIndicator = "https://vignette.wikia.nocookie.net/dev/images/6/6a/Snake_throbber.gif";

window.PurgeButtonText = 'Làm mới trang';

window.nullEditDelay = 1000;

window.lastEdited = {
    avatar: true,
    avatarsize: 25,
    size: false,
    diff: true,
    comment: false,
    time: 'timeago',
    lang: 'vi',
    position: {
        element: document.getElementById('WikiaArticle'),
        method: 'prepend'
    },
    namespaces: {
        exclude: []
    },
    pages: []
};

// General code
importArticles({
    type: 'script',
    articles: [
        'u:sonako:MediaWiki:ArticleComments.js',
        'u:sonako:MediaWiki:CategoryTOC.js',
        'u:sonako:MediaWiki:Common.js/Usertags.js',
        'u:sonako:MediaWiki:DeadVideos.js',
        'u:sonako:MediaWiki:Forum.js',
        'u:sonako:MediaWiki:GA.js',
        'u:sonako:MediaWiki:MaintenanceReport.js',
        'u:sonako:MediaWiki:New_Tab.js',
        'u:sonako:MediaWiki:Nhac.js',
        'u:sonako:MediaWiki:Other.js',
        'u:sonako:MediaWiki:Reddit_Widget.js',
        'u:sonako:MediaWiki:StarRatings/code.js',
        'u:sonako:MediaWiki:StarRatings/stats.js',
        'u:sonako:MediaWiki:StarRatings/ui.js',
        'u:sonako:MediaWiki:TopAndDownButtons2.js',
        'u:sonako:MediaWiki:Nav_Poppup_Viet.js',
        'u:sonako:MediaWiki:Navigation_popups.js',
        'u:sonako:MediaWiki:CatNav.js',
        'u:sonako:MediaWiki:FixTabber.js',
        'u:sonako:MediaWiki:Tabber.js',
        'u:sonako:MediaWiki:Vertical_Tab.js',
        'u:sonako:MediaWiki:Follow.js'
    ]
});
// Time Circles
$(function() {
    if (document.getElementsByClassName("countdown")[0] !== null) {
        impart('MediaWiki:TimeCircles.js');
    }
});
// For specific pages
if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'WikiActivity'|| mediaWiki.config.get('wgPageName') === 'Special:BlankPage/RailWAM/Dashboard') {
    impart('u:dev:MediaWiki:RailWAM/code.js');
}
if ((mw.config.get('wgAction') === 'view') && (mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') && (mediaWiki.config.get('wgNamespaceNumber') !== -1 || mediaWiki.config.get('wgNamespaceNumber') !== 1201 || mediaWiki.config.get('wgNamespaceNumber') !== 2001)) {
    impart('u:dev:MediaWiki:ReferencePopups/code.js');
    impart('u:dev:MediaWiki:LastEdited/code.js');
}
if (mediaWiki.config.get('wgPageName') === 'Sonako_Patrol') {
    importStylesheet('User:Dai_ca_superman/SonakoPatrol.css');
    impart('User:Dai_ca_superman/SonakoPatrol.js');
}
if (mediaWiki.config.get('wgPageName') === 'Sonako_Real-Time_Feed') {
    impart('MediaWiki:Rss.js');
}
if (mediaWiki.config.get('wgPageName') === 'Sonako_Statistics') {
    impart('MediaWiki:WikiStats.js');
}
if (mediaWiki.config.get('wgPageName') === 'BakaTsuki:Recent_Changes') {
    impart('u:dev:RecentChangesMultiple/code.2.js');
}
// Cài đặt bộ gõ [[Wikipedia:Gõ tiếng Việt|AVIM]] từ Wikipedia tiếng Việt
// Sửa đổi để chạy trên Wikia bởi Dai ca superman
if ((mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1202 || mediaWiki.config.get('wgNamespaceNumber') === 1200 || mediaWiki.config.get('wgNamespaceNumber') === 1201 || mediaWiki.config.get('wgNamespaceNumber') === 2000) || mw.config.get('wgAction') === 'edit') {
    impart('MediaWiki:AVIM.js');
    impart('MediaWiki:AVIM_portlet.js');
}
if (typeof wgIsEditPage != "undefined" || mw.util.getParamValue('action') == "edit" || mw.util.getParamValue('action') == "submit" || wgPageName == "Special:CreateBlogPage") {
    impart('MediaWiki:StdTemplates.js');
    impart('MediaWiki:Scope.js/dev.js');
}
if ($("#mw-upload-form").size() || mw.util.getParamValue('DragDrop')) {
    impart('MediaWiki:Common.js/DragDropUploader.js');
}
if (mw.config.get('wgNamespaceNumber') === 0 || mw.config.get('wgNamespaceNumber') === 500) {
    impart('MediaWiki:Ebook.js');
}
// Tạm sửa cho MediaWiki:Group-sysop, hiện không load được
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    impart('MediaWiki:Group-sysop.js');
}

// CUSTOM EDIT BUTTONS
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code>
//   to [[Special:Mypage/common.js]]
 
if (mwCustomEditButtons) {
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