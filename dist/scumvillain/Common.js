// OTHER
window.BackToTopModern = true;
	importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.tlen = 200;
window.pPreview.RegExp.noinclude = [".LinkPreview-ignore", ".quote", ".mw-ext-cite-error", ".error", ".references", ".reference", ".sup.reference"];
// window.pPreview.RegExp.iparents = ['.quote', '.mainpage-gallery', '#icons', '.LinkPreview-ignore', '#LinkPreview-ignore', 'big', 'pre', 'blockquote', '.mbox'];

// Link Preview
// mw.hook('ppreview.show').add(function(pp) {
//   var $pp = $(pp), $div = $pp.find('div'), $img = $pp.find('img');
//   setTimeout(function() {
//     if(($img.height()) > $img.width()) {
//       $pp.css({width:'450px'});
//       $pp.css({height:'auto'});
//       $img.css({float:'right'});
//       $img.css({width:'180px'});
//       $div.css({display:'block'});
//       $div.css({width:'230px'});
//       $div.css({padding: '20px 15px 15px 15px'});
//     } 
//     else
//     {
//       $pp.css({width:'320px'});
//       $img.css({height:'auto'});
//       $div.css({height: 'auto'});
//       $div.css({padding: '15px 15px 15px 15px'});
//     }
//   }, 100)
// });

// Enable config objects for LinkPreview in ImportJS
// window.pPreview = $.extend(true, window.pPreview, {
//     tlen: 100, // Max text length
//     // scale: false,
//     RegExp: {
//       ilinks: [new RegExp('(Talk:)|(User:)|(Project:)|(Project_talk:)|(Hibike!_Euphonium_Wiki:)|(Hibike!_Euphonium_Wiki_talk:)|(File:)|(File_talk:)|(MediaWiki:)|(MediaWiki_talk:)|(Template:)|(Template_talk:)|(Help:)|(Help_talk:)|(Category:)|(Category_talk:)|(Forum:)|(Forum_talk:)|(User_blog:)|(User_blog_comment)|(Blog:)|(Blog_talk:)|(Module:)|(Module_talk:)|(Message_Wall:)|(Thread:)|(Message_Wall_Greeting:)')],
//       iclasses: ['activityfeed-diff'],
//       iparents: ['.LinkPreviewIgnore', '.tabs', '.wikia-gallery', '.wikiaPhotoGallery-slider-body', '.controls'],
//       noinclude   : ['LinkPreview-ignore', 'big', 'blockquote', 'pre'], // Preview will ignore the following selectors
//       onlyinclude : ['.LinkPreviewText', '[data-include-me=1]'], // If found, then the preview will use these selectors, and ignore all other content
//   },
// });

//////////////////////////////
// Settings for LinkPreview
// window.pPreview = $.extend(true, window.pPreview, {
    // defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    // noimage: 'https://vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/350?cb=20160122074659&path-prefix=ru',
    // RegExp: {
    //     iparents: [new RegExp('.LinkPreview-ignore')],
        // iimages: [new RegExp('^([Ff]ile:|[Фф]айл:)?Indef\\.png$')],
        // ipages: [new RegExp('.*?Дерево[_ ]навыков.*')],
        // ilinks: [new RegExp('.*?Дерево[_ ]навыков.*')],
    // },
// });