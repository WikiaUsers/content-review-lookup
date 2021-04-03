/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */

/*
[[:en:Wikipedia:WikiProject User scripts/Scripts/Add edit section 0]]
[[위키백과:사랑방/2007년 1월#중국어판을 보니 section 0 편집 방법이 있더군요]]
*/
/* 영어 위키백과 버전 *
function addEditZero() {
    var x;
    if (!(x = document.getElementById('ca-edit') )) return;
    var url;
    if (!(url = x.getElementsByTagName('a')[0] )) return;
    if (!(url = url.href )) return;
    var y = addPortletLink('p-cactions', url+"&section=0", '0', 'ca-edit-0',
                           '문서의 첫 부분만을 편집합니다.', '0', x.nextSibling);

    y.className = x.className;  // steal classes from the the edit tab...
    x.className = 'istalk';     // ...and make the edit tab have no right margin

    // exception: don't steal the "selected" class unless actually editing section 0:
    if (/(^| )selected( |$)/.test(y.className)) {
        if (!document.editform || !document.editform.wpSection
                || document.editform.wpSection.value != "0") {
            y.className = y.className.replace(/(^| )selected( |$)/g, "$1");
            x.className += ' selected';
        }
    }
}
addOnloadHook(addEditZero);
* addEditZero 끝 */