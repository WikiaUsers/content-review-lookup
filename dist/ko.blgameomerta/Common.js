/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. 1.35 기념 갱신 */

/**
 * 이 스크립트는 오메르타 시리즈 위키 전체에 적용되며, 리브레 위키/위키백과에서 가져온 것도 있습니다. 고칠 때는 주의해주세요.
 *
 * 스크립트를 넣을 때는 충분한 설명, 출처를 넣어주세요! 이후 관리가 어려워집니다.
 **/
 
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
/**
 * Map addPortletLink to mw.util 
 *
 * @deprecated: Use mw.util.addPortletLink instead.
 */
mw.log.deprecate( window, 'addPortletLink', mw.util.addPortletLink,
 'Use mw.util.addPortletLink instead' );
 
/**
 * Extract a URL parameter from the current URL
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
mw.log.deprecate( window, 'getURLParamValue', mw.util.getParamValue, 'Use mw.util.getParamValue instead' );
 
/** 
 * Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
mw.log.deprecate( window, 'hasClass', function ( element, className ) {
    return $( element ).hasClass( className );
}, 'Use jQuery.hasClass() instead' );

/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 6
 */
var extraCSS = mw.util.getParamValue( 'withCSS' ),
	extraJS = mw.util.getParamValue( 'withJS' );

if ( extraCSS ) {
	if ( extraCSS.match( /^(MediaWiki|미디어위키):[^&<>=%#]*\.css$/ ) ) {
		mw.loader.load( '/wiki/index.php?title=' + extraCSS + '&action=raw&ctype=text/css', 'text/css' );
	} else {
		console.log( '미디어위키 이름공간의 CSS 문서만 허용됩니다.');
	}
}
 
if ( extraJS ) {
	if ( extraJS.match( /^(MediaWiki|미디어위키):[^&<>=%#]*\.js$/ ) ) {
		mw.loader.load( '/wiki/index.php?title=' + extraJS + '&action=raw&ctype=text/javascript' );
	} else {
		console.log( '미디어위키 이름공간의 JS 문서만 허용됩니다.');
	}
}

/**
 * Import more specific scripts if necessary
 */
 
/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[:en:Wikipedia:NavFrame]].
 *  Maintainers: [[:en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = '숨기기';
var expandCaption = '보이기';
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createCollapseButtons );
 
/* ([[위키백과:관리자 요청/2007년 5월#스크립트 추가 요청]]) */
/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[:en:Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );
 
/* 대문의 "프로젝트" 탭을 "대문"으로 바꿉니다.
- 영어 위키백과 common.js의 main page 스크립트를 약간 변형 */
 
/***** 그림 정보 틀을 자동으로 불러옴 ********
 * Adds a link to subpages of current page
 * from commons.wikimedia.org
 *  Maintainers: [[User:Yonidebest]], [[User:Dschwen]]
 *  [[사용자:Kwj2772]]가 수정
 *  JSconfig items: bool 'loadAutoInformationTemplate'
 *                       (true=enabled (default), false=disabled)
 * JSConfig를 사용하지 않도록 수정함. --[[사용자:Klutzy|klutzy]] ([[사용자토론:Klutzy|토론]]) 2009년 9월 27일 (일) 20:33 (KST)
 ****/
/**
 * 파일 라이선스 체계화 150726
 */
if (mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Upload') {
  mw.loader.load( '/index.php?title=MediaWiki:Upload.js&action=raw&ctype=text/javascript');
  mw.loader.load( '/index.php?title=MediaWiki:UploadForm.js&action=raw&ctype=text/javascript');
}
 
/* 인터랙티브 지도. 영어 위키백과에서 가져옴. -- [[사용자:ChongDae]] 2010년 3월 28일 (일) 02:08 (KST) */
/**
 * WikiMiniAtlas
 *
 * Description: WikiMiniAtlas is a popup click and drag world map.
 *              This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *              The script itself is located on meta because it is used by many projects.
 *              See [[Meta:WikiMiniAtlas]] for more information. 
 * Maintainers: [[User:Dschwen]]
 */
( function () {
    var require_wikiminiatlas = false;
    var coord_filter = /geohack/;
    $( function () {
        $( 'a.external.text' ).each( function( key, link ) {
            if ( link.href && coord_filter.exec( link.href ) ) {
                require_wikiminiatlas = true;
                // break from loop
                return false;
            }
        } );
        if ( $( 'div.kmldata' ).length ) {
            require_wikiminiatlas = true;
        }
        if ( require_wikiminiatlas ) {
            mw.loader.load( '//meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript' );
        }
    } );
} )();

/** [[틀:USERNAME]]에서 사용하는 바꿔치기 함수
  * 작성자: [[사용자:Peremen]]
*/
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    if (!document.getElementById('pt-userpage')) return;
    $("span.insertusername").each(function(i) {
        $(this).text(mw.config.get('wgUserName'))
    })
};
$(UserNameReplace);

/**
 * Fix for Windows XP Unicode font rendering
 */
if ( navigator.appVersion.search(/windows nt 5/i) !== -1 ) {
    mw.util.addCSS( '.IPA { font-family: "Lucida Sans Unicode", "Arial Unicode MS"; } ' + 
                '.Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; } ' );
}

$(function() {
/**
 * HTTPS에서만 보이는 요소
 */
if (location.protocol == "https:") $(".view-https").show();

/**
 * 안티-반달리즘 필터
 */
$("#mw-content-text [style*='fixed'], #mw-content-text [style*='absolute']").remove();

});
/**
 * 트위터 불러오기
 * <div class="libre-twitter" />를 원하는 위치에 넣으세요.
 */
var $libreTwitter = $('.libre-twitter');
if ($libreTwitter.length) {
    $.ajax({
        url: '/libre-tweets.json',
        dataType: 'json'
    }).then(function(arr) {
        arr = arr.map(function(tweet) {
            return tweet.replace(/(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}\S*/gi, '<a href="$&">$&</a>');
        });
        $libreTwitter.html('<ul><li>'+arr[0]+'</li><li>'+arr[1]+'</li><li>'+arr[2]+'</li></ul>');
    });
}

/**
 * [[틀:모바일탭]]용
 */
$('.libre-tab-mobile .libre-tab-btn').click(function() {
    if (!window.matchMedia('screen and (max-width: 1023px)').matches) return;
    if ($(this).hasClass('libre-tab-btn-active')) return;
    var $libretab = $(this).parents('.libre-tab-mobile');
    $libretab.find('.libre-tab-btn-active').removeClass('libre-tab-btn-active');
    $(this).addClass('libre-tab-btn-active');
    var index = $(this).index();
    $libretab.find('.libre-tab-main-content').removeClass('libre-tab-main-content-active');
    $libretab.find('.libre-tab-main-content').eq(index).addClass('libre-tab-main-content-active');
});

/**
 * [[틀:탭]]용 / [[리브레_위키:운영진_요청/2022년_7월#미디어위키:common.js, 틀:탭 구현 부분 교체 요청]]
 */
document.querySelectorAll('.libre-tab').forEach(function (libretab) {
    var $libretab = $(libretab);
    var $btns = $libretab.children('.libre-tab-btns');
    var $content = $libretab.children('.libre-tab-main');
    $btns.children('.libre-tab-btn').click(function () {
        if (this.classList.contains('.libre-tab-btn-active')) return;
        $btns.children('.libre-tab-btn-active').removeClass('libre-tab-btn-active');
        this.classList.add('libre-tab-btn-active');

        var index = $(this).index();
        $content.children('.libre-tab-main-content-active').removeClass('libre-tab-main-content-active');
        $content.children('.libre-tab-main-content').eq(index).addClass('libre-tab-main-content-active');
    });
})

/**
 * [[틀:랜덤]]용
 */
$(function () {
	// generate n random integers from 0 to max - 1
	function randomArray(n, max) {
		var arr = [];
		if (n > max) n = max;
		while (arr.length < n) {
		    var r = Math.floor(Math.random() * max);
		    if (arr.indexOf(r) === -1) arr.push(r);
		}
		return arr;
	}
	$('.libre-random').each(function () {
		var limit = parseInt($(this).data('limit'));
		var $items = $(this).find('.libre-random-item');
		var activeIds = randomArray(limit, $items.length);
		console.log(limit, $items.length);
		console.log(activeIds);
		$items.each(function (index) {
			if (activeIds.indexOf(index) !== -1) {
				$(this).addClass('libre-random-item-active');
			}
		});
	});
});



mw.loader.load( '/index.php?title=%EB%AF%B8%EB%94%94%EC%96%B4%EC%9C%84%ED%82%A4:Common.js/libre-responsive-table.js&action=raw&ctype=text/javascript', 'text/javascript' );
var customizeToolbar = function () {
$( '#wpTextbox1' ).wikiEditor( 'removeFromToolbar', {
'section': 'main',
'group': 'insert',
'tool': 'file'
});
};

$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', function( event, section ) {
	// The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
	section.groups.format.tools.newline.action.options.pre = '<br />';
} );

if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
mw.loader.using( 'user.options' ).then( function () {
// This can be the string "0" if the user disabled the preference ([[phab:T54542#555387]])
if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
$.when(
mw.loader.using( 'ext.wikiEditor' ), $.ready
).then( customizeToolbar );
}
} );
}
/* End of mw.loader.using callback */
},function(){console.log("loader failed");} );
console.log("js 로딩 완료");
/* DO NOT ADD CODE BELOW THIS LINE */

/* 틀:파일 정보 자동으로 나오게 하기 - Fandom Developers Wiki에서 가져옴.*/ 

PFD_templates = [
    {
        label:   '틀:파일 정보',
        desc:    '{'+'{파일 정보 \n|설명 =  \n|출처 = \n|날짜 = \n|만든이 = \n|기타 = \n}}'
    }

];

PFD_language = 'kr';