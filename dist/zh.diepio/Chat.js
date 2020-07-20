importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatImages/code.js',
        'u:dev:MediaWiki:IsTyping/code.js',
        'u:dev:MediaWiki:WordFilter/code.js'
    ]
});

/****** Chat Filter ******/
window.WordFilter = $.extend(window.WordFilter, {
    alert: '蛤？你剛剛說了什麼？請不要發佈，這是違反規章的！',
    badWords: ['fuck', 'shit', 'bitch', 'suck',
               '幹', '婊子', '靠北', '三小', '特殊性關係',
               '操機歪', '吃屎', '廢物', '怪胎', '敗類',
               '賤人', '米蟲', '王八', '下流', '神經病',
               '智障', '人渣', '不要臉', '吃屎', '賤貨',]
});