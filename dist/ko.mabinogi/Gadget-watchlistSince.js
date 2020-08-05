/*
[[:en:Wikipedia:WikiProject User scripts/Scripts/Watchlist since]]
주시 문서 목록에서 페이지가 로드된 이후의 변경 사항을 표시하는 링크를 삽입.
IRTC1015 2010년 7월 19일 (월) 23:02 (KST)
*/
 
addOnloadHook(function () {
    if (!wgCanonicalSpecialPageName || wgCanonicalSpecialPageName != "Watchlist") return;
    if (!document.forms[0] || !document.forms[0].namespace) return;
 
    var link = document.createElement('a');
    link.id = 'listSince';
    link.href = '#';
 
    var then = +(new Date());
    var fixLinkHref = function () {
        var url = window.location.href.split('#')[0];
        var days = (( +(new Date()) - then ) + (60 * 1000)) / (1000 * 3600 * 24);
        if (url.match(/[?&]days=/))
            this.href = url.replace(/([?&]days=)[^&]*/, '$1'+days);
        else
            this.href = url + (url.indexOf('?') < 0 ? '?':'&') + 'days=' + days;
        return true;
    };
    link.onclick = fixLinkHref;
    link.onmousedown = fixLinkHref;  // react to middle clicks too
 
    var frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(' | '));
    frag.appendChild(link);
    link.appendChild(document.createTextNode('페이지 로드 이후 바뀐 문서'));
 
    // just one little ID attribute would be _so_ nice...
    var nsSelectForm = document.getElementsByTagName('form')[0];
    nsSelectForm.parentNode.insertBefore(frag, nsSelectForm);
});