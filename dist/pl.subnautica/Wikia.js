/*******************************************************************
* Dodaj odnośnik do angielskiej Below Zero Wiki do listy interwiki *
* Add link to English Below Zero Wiki to interwikis dropdown       *
********************************************************************/
var bzArticleNameDataKey = 'data-bzenglisharticlename';
var bzNoticeNode = document.querySelector('[' + bzArticleNameDataKey + ']');
if (bzNoticeNode) {
    var foreignArticleName = bzNoticeNode.getAttribute('data-bzenglisharticlename');
    var interwikiDropdown = document.querySelector('#PageHeader .wds-dropdown__content.wds-is-right-aligned > .wds-list');
 
    if (interwikiDropdown) {
		var item = document.createElement('li');
		var link = document.createElement('a');
		link.setAttribute('href', '//subnautica-belowzero.wikia.com/wiki/' + foreignArticleName);
		link.innerText = 'English';
		item.appendChild(link);
        interwikiDropdown.appendChild(item);
		document.querySelector('.WikiaArticleInterlang > ul').appendChild(item);
    } else {
        bzNoticeNode.parentNode.removeChild(bzNoticeNode);
    }
}