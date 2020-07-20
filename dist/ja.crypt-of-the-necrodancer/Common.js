/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // トップナビゲーションで自動的に「ページリスト」タブを選択
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('mouseover', true, true, window, 0, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        document.getElementById('WikiHeader')
            .querySelector('nav.WikiNav ul.nav li.nav-item:nth-child(2)')
            .dispatchEvent(event);
        // 無理やりサイドバーナビゲーション
        var navelem = document.getElementById('condwiki_nav');
        var railelem = document.getElementById('WikiaRail');
        var activityelem = document.getElementById('WikiaRecentActivity');
        railelem.insertBefore(navelem, activityelem).style.display = 'block';
    }, false);
}());