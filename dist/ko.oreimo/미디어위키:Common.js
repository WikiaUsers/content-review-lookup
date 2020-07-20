/*!
 * 내 여동생이 이렇게 귀여울 리가 없어 위키 자바스크립트
 * 
 * 이 페이지에는 아직 개발중인 토막 스크립트만을 포함합니다.
 * 보다 완성도 높은 플러그인은 [[특수기능:JSPages]]에 있습니다.
 *
 * This page only contains page snippet scripts that are still under
 * development. More rubust plugins are listed in [[Special:JSPages]].
 * 
 * @Author(s): User:Cafeinlove
 * @License: MIT License
 */
 
void function( window, document, mw ) {
    
    // 보호, 준보호된 문서 표시 (?action=view이며, 대문이 아닐 때)
    if ( mw.config.get( "wgAction" ) == "view" && !mw.config.get( "wgIsMainPage" ) ) {
        markProtectedPages();
    }
    
    // 파일올리기 페이지에 미리 정해진 저작권 틀을 끼워넣음
    if ( mw.config.get( "wgNamespaceNumber" ) === -1 // 특수기능:
        && mw.config.get( "wgCanonicalSpecialPageName" ) === "Upload" // 파일올리기
        && window.location.search.indexOf( "wpForReUpload" ) === -1 ) { // 재업로드가 아님
        setDefaultFileDesc();
    }
    
    /**
     * 보호된 문서의 최상단에 알림상자 삽입
     * Insert a notice box at the top of protected articles
     */
    function markProtectedPages() {
        if ( mw.config.get( "wgRestrictionEdit" ) === null
            || !mw.config.get( "wgRestrictionEdit" )[0] ) return; // not protected article
        if ( mw.config.get( "wgIsMainPage" ) ) return; // main page
        
        var allowedGroup = mw.config.get( "wgRestrictionEdit" )[0];
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

    /**
     * [[특수기능:파일올리기]]에 [[틀:파일]] 서식 삽입
     * Insert a pre-defined template onto [[Speical:FileUpload]] page
     */
    function setDefaultFileDesc() {
        var textarea, guide;
    
        textarea = document.getElementById( "wpUploadDescription" );
        textarea.value = "{{파일\n |설명 = \n |출처 = \n |소유자 = \n |이용 목적 = \n |비고 = \n}}";

        guide = document.createElement( "p" );
        guide.innerHTML = "위 서식에 대한 설명을 읽으려면 <a href=\"/wiki/"
            + encodeURI( "틀:파일" ) + "\" class=\"page\" target=\"_blank\">"
            + "틀:파일</a> 문서를 참조해 주세요.";

        textarea.parentElement.appendChild( guide );
    }
    
}( window, document, window.mediaWiki );