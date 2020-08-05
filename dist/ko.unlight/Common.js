/** Any JavaScript here will be loaded for all users on every page load. */

// 외부 모듈 | External modules
importArticles({
    type: 'script',
    articles: [
        'u:ko.oreimo:LiveReference.js'
    ]
});

// 페이지별 기능 | Page specific functions
;(function() {
        
    var cfg = mw.config.get([
        "wgIsMainPage",
        "wgAction",
        "wgNamespaceNumber",
        "wgRestrictionEdit"
    ]);
    
    markProtectedPages(); // 보호, 준보호된 문서 표시
    
    /**
     * 보호된 문서의 최상단에 알림상자 삽입
     * Insert a notice box at the top of protected articles
     * 
     * @Author(s): User:Cafeinlove
     * @License: MIT License
     */
    function markProtectedPages() {
        if (
            !cfg.wgRestrictionEdit[0] // not protected
            || cfg.wgAction != "view" // not `view` mode
            || cfg.wgIsMainPage // main page
        ) return;
 
        var allowedGroup = cfg.wgRestrictionEdit[0];
        var strData = {
            "autoconfirmed": {
                state: "준보호",
                allowed: "등록된 사용자"
            },
            "sysop": {
                state: "보호",
                allowed: "관리자"
            }
        };
 
        var messageBox, strong, article;
 
        messageBox = document.createElement( "div" );
        strong = document.createElement( "strong" );
        article = document.getElementById( "mw-content-text" );
 
        messageBox.className = "messagebox messagebox--protected";
        messageBox.appendChild( strong );
 
        strong.appendChild(
            document.createTextNode(
                "이 문서는 " + strData[ allowedGroup ].state + "되어 있어서, "
                + strData[ allowedGroup ].allowed + "만 편집이 가능합니다."
            )
        );
 
        article.insertBefore( messageBox, article.childNodes[0] );
    }
    
})();