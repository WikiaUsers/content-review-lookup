
/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "ẩn";
 var expandCaption = "hiện";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for (i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for (i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 
/// Title Rewrite ///
 
function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;
 
    var titleDiv = document.getElementById(className);
 
    if(titleDiv === null || titleDiv === undefined)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
importScriptPage('AjaxRC/code.js', 'dev');
 
/*Keep favicon as correct PF logo instead of reverting to Wikia logo*/
 
document.write('<link REL="shortcut icon"HREF="/images/6/64/Favicon.ico" />')
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
/* Resolves conflict between icons and page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(document).ready(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
    }
});
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
/* Reference Popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
/* Hiển thị đồng hồ ở phía bên phải trên cùng */
importScriptPage('DisplayClock/code.js', 'dev');
// Change the clock from UTC to UTC+07:00
window.DisplayClockJS = {
    offset: 420,
    format: '%2H:%2M:%2S %d %b %Y (GMT+07:00)',
};
window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

// Thẻ thành viên (UserTags)
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 90;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// CHÚ Ý:Cấm hiển thị trò chuyện trong Oasis nhưng không phải là một nhóm người sử dụng danh tính vì vậy phải được kiểm tra thủ công (NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually)
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'threadmoderator', 'patroller', 'content-moderator', 'rollback', 'sysop', 'bannedfromchat', 'blocked', 'bot', 'bot-global', 'staff', 'vstf', 'helper'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot'],
	bureaucrat: ['founder'],
	chatmoderator: ['threadmoderator', 'sysop', 'bureaucrat', 'vstf'],
	threadmoderator: ['sysop', 'bureaucrat'],
	rollback: ['content-moderator', 'sysop', 'bureaucrat', 'founder'],
	'content-moderator': ['sysop', 'bureaucrat', 'founder'],
	bot: ['bot-global']
};
 
// AjaxRC
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Làm mới trang một các tự động khi các sửa đổi mới xảy ra.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log", "Special:Images", "Special:Videos", "Special:Contributions", "Special:AbuseLog"];
 
// Xóa hang loạt bằng Ajax (AjaxBatchDelete)
batchDeleteDelay = 1000;
 
// Xóa nhanh (FastDelete)
var fdButtons = [];
 
fdButtons[fdButtons.length] = {
    'summary': 'one-click delete',
        'label': 'one-click delete'
};
 
// Hình động (DynamicImages)
DynamicImages = {
    gifImages: true,
    gifGalleryImages: false
};
 
 // BackToTopButton default settings
var Speed = 600;
var Start = 800;
 
// Địa chỉ IP không rõ tiết lộ (RevealAnonIP)
window.RevealAnonIP = {
    permissions : ['threadmoderator', 'rollback', 'content-moderator', 'sysop', 'bureaucrat', 'staff', 'vstf', 'helper']
};
 

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // bắt chuỗi ngày xấu (catch bad date strings)
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // xác định cộng / trừ (determine plus/minus)
    if (diff < 0) {
        diff = -diff;
    }
        var tpm = ' ';
 
    // tính toán khác (calcuate the diff)
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // một hàm setInterval() là hiệu quả hơn, nhưng gọi là setTimeout() (a setInterval() is more efficient, but calling setTimeout())
    // làm cho lỗi phá vỡ kịch bản chứ không phải là nguyền lại vô hạn (makes errors break the script rather than infinitely recurse)
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //ẩn "không đếm ngược" và hiện 'đếm ngược' (hide 'nocountdown' and show 'countdown')
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';
 
    //thiết lập đối tượng tính giờ và hết giờ toàn cầu. (set up global objects timers and timeouts.)
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
 
 
/* Thay thế {{USERNAME}} với tên của người dùng duyệt trang. (Replaces {{USERNAME}} with the name of the user browsing the page.)
   Yêu cầu sao chép Template:USERNAME. (Requires copying Template:USERNAME.) */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* Kết thúc {{USERNAME}} thủ tục thay thế */

/* AutoCreateUserPages */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3: '{{autowelcome}}',
    1202: false
},
    summary: 'Auto creating user page',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoCreateUserPages.js',
    ]
});