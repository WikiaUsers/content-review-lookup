/** <pre>
 * Adds edit links to [[Special:WhatLinksHere]]
 * Original by [[User:JBed]] of finalfantasy wiki
 * Updates/Bug fixes by various
 */
if(mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
        var links = document.getElementById('mw-whatlinkshere-list').getElementsByTagName('li');
        for(var i = 0; i < links.length; i++) {
                aLink = links[i].getElementsByTagName('a');
                var linkHref = aLink[0].href;
                var tools = getElementsByClassName(links[i], 'span', 'mw-whatlinkshere-tools');
                var editLinkSpan = document.createElement("span");
                editLinkSpan.className = 'mw-whatlinkshere-edit';
		// testing for ?redirect=no
		if (!(/\?/.test(linkHref))) {
			// the space after closing anchor tag is intentional
                	editLinkSpan.innerHTML = '(<a title="Edit form" href="' + linkHref + '?action=edit">edit</a>) ';
		} else {
			editLinkSpan.innerHTML = '(<a title="Edit form" href="' + linkHref + '&action=edit">edit</a>) ';
		}
                links[i].insertBefore(editLinkSpan, tools[0]);
        }
}
/* <pre> */