( function() {

if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) === -1) {
	return;
}

// changing the editing toolbar so it is more convenient to use
var customizeToolbar = function() {
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "boldx": {
                        label: '粗体文字',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "'''",
                                        peri: "粗体文字",
                                        post: "'''"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "italicx": {
                        label: '斜体文字',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "''",
                                        peri: "斜体文字",
                                        post: "''"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "linkx": {
                        label: '内部链接',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/en/c/c0/Button_link.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "[[",
                                        peri: "链接文字",
                                        post: "]]"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "extlinkx": {
                        label: '外部链接（加前缀 http://）',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/e/ec/Button_extlink.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "[",
                                        peri: "http://www.example.com 链接文字",
                                        post: "]"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "imagex": {
                        label: '插入文件',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/d/de/Button_image.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "[[File:",
                                        peri: "example.jpg",
                                        post: "]]"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "nowikix": {
                        label: '插入非格式文本',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/8/82/Nowiki_icon.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<nowiki>",
                                        peri: "在此插入非格式文本",
                                        post: "</nowiki>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "sigx": {
                        label: '带时间戳的签名',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/en/6/6d/Button_sig.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "--~~"+"~~"
                                } } } } } );    
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "redirectx": {
                        label: '重定向',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/c/c8/Button_redirect.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "#重定向 [[",
                                        peri: "目标页名称",
                                        post: "]]"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "strikex": {
                        label: '中划线',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<s>",
                                        peri: "中划文本",
                                        post: "</s>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "enterx": {
                        label: '换行',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<br>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "supx": {
                        label: '上标',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<sup>",
                                        peri: "上标文本",
                                        post: "</sup>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "subx": {
                        label: '下标',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<sub>",
                                        peri: "下标文本",
                                        post: "</sub>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "smallx": {
                        label: '小字',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/d/d5/Button_small_text.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<small>",
                                        peri: "小字",
                                        post: "</small>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "hiddenx": {
                        label: '插入隐藏留言',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/3/34/Button_hide_comment.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<!-- ",
                                        peri: "留言",
                                        post: " -->"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "galleryx": {
                        label: '插入画廊',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/1/12/Button_gallery.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "\n<gallery>\n",
                                        peri: "File:Example.jpg|说明1\nFile:Example.jpg|说明2",
                                        post: "\n</gallery>"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "tablex": {
                        label: '插入表格',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/6/60/Button_insert_table.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "{| class=\"wikitable\"\n|-",
                                        post: "\n|}"
                                } } } } } );
        $( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        section: 'main',
        group: 'format',
        tools: {
                "refx": {
                        label: '参考',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png',
                        action: {
                                type: 'encapsulate',
                                options: {
                                        pre: "<ref>",
                                        peri: "引用文本",
                                        post: "</ref>"
                                } } } } } );


$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'main',
        'group': 'format',
        'tool': 'bold'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'main',
        'group': 'format',
        'tool': 'italic'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'main',
        'group': 'insert',
        'tool': 'file'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'main',
        'group': 'insert',
        'tool': 'signature'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'advanced',
        'group': 'format',
        'tool': 'nowiki'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'advanced',
        'group': 'format',
        'tool': 'newline'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'advanced',
        'group': 'heading'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'advanced',
        'group': 'size'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'advanced',
        'group': 'insert',
        'tool': 'gallery'
});
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
        'section': 'advanced',
        'group': 'insert',
        'tool': 'redirect'
});

};

/* Check if view is in edit mode and that the required modules are available.*/
if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
        mw.loader.using( 'user.options', function () {
                if ( mw.user.options.get('usebetatoolbar') ) {
                        mw.loader.using( 'ext.wikiEditor.toolbar', function () {
                                $(document).ready( customizeToolbar );
                        } );
                }
        } );
}

// Add the customizations to LiquidThreads' edit toolbar, if available
mw.hook( 'ext.lqt.textareaCreated' ).add( customizeToolbar );
})();