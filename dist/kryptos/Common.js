importArticles({
    type: 'script',
    articles: [
        'MediaWiki:EditButtons.js',
        'w:dev:RevealAnonIP/code.js',
        'MediaWiki:References/code.js'
    ]
});

$(function() {
  $('.boards, .Forum .board-description, .Wall .new-reply').prepend("<div class=warn3><div class=title>Please be <strong>civil</strong> here.</div>The subject of cryptozoology is <i>highly controversial</i> and arguments can often erupt.  Please <b>do not</b> instigate arguments or use personal attacks on <i>any</i> of the boards on Cryptid Wiki.  The consequences of these actions is an <b>instant</b> block.  Thank you.</div>");
});

$(function() {
  $('.EditPageEditorWrapper').prepend("<div class=tech style=background-color:#012c57;border-color:#fff;color:#fff;box-shadow:0 0 10px #fff;font-size:12pt>Please bear in mind that this is a <i>wiki</i>, so <b>all</b> information has to be from a neutral point of view.  With that said, adding information that debunks the article's subject <i>is</i> allowed.  However, it needs to contain references and evidence.</div>");
});