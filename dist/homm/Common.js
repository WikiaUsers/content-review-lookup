/* Any JavaScript here will be loaded for all users on every page load. */

console.log('MediaWiki:Common.js');

(function () {

function getCookie(cname) {
	var name = cname + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

function showElements(desc, linkSelector) {
	var elems = document.querySelectorAll(desc);
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.display = 'revert';
	}
	elems = document.querySelectorAll('.' + linkSelector + desc);
	for (i = 0; i < elems.length; i++) {
		elems[i].style = 'user-select:none; cursor: pointer; color: rgb(102, 177, 250);';
	}
}

function hideElements(desc) {
	var elems = document.querySelectorAll(desc);
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.display = 'none';
	}
	elems = document.querySelectorAll('.initialOnly');
	for (i = 0; i < elems.length; i++) {
		elems[i].style.display = 'none';
	}
}

function togglePreference(linkSelector, cookieName, cookie1, cookie2, link1, link2) {
	var preference = getCookie(cookieName);
	var userlinks = document.querySelectorAll('.wds-tabs');
	for (var i = 0; i < userlinks.length; i++) {
		var switchView = document.querySelector('#' + linkSelector + i);
		// the Castle page doesn't create #switchExpansion1 so we have to check this
		if (switchView) {
			if (preference == cookie2) {
				switchView.textContent = link2;
			} else {
				switchView.textContent = link1;
			}
		}
	}
	if (preference == cookie2) {
		preference = cookie1;
		hideElements('.only' + cookie2);
		showElements('.only' + cookie1, linkSelector);
	} else {
		preference = cookie2;
		hideElements('.only' + cookie1);
		showElements('.only' + cookie2, linkSelector);
	}
	var CookieDate = new Date();
	CookieDate.setFullYear(CookieDate.getFullYear() + 1);
	document.cookie = cookieName + '=' + preference + '; expires=' + CookieDate.toUTCString() + ';';
}

function removeTabsTags() {
	var elem;
	var replaced = false;
	var elems = document.querySelectorAll('*');
	for (var i = 0; i < elems.length; i++) {
		elem = elems[i];
		if (elem.childNodes && elem.childNodes[0] && elem.childNodes[0].nodeValue && elem.childNodes[0].nodeValue.includes) {
			if (elem.childNodes[0].nodeValue.includes('<tab') || elem.childNodes[0].nodeValue.includes('</tab')) {
				elem.innerText = elem.innerText.replaceAll(/<\/?tab(.*?)>/gi, '');
				replaced = true;
			}
		}
	}
	if (replaced) {
		elems = document.querySelectorAll('*');
		for (i = 0; i < elems.length; i++) {
			elem = elems[i];
			if (elem.style && elem.style.position && elem.style.position == 'relative') {
				elem.style.position = 'unset';
			}
		}
	}
}

function togglePreferredExpansion() {
	togglePreference('switchExpansion', 'preferredExpansion', 'hota', 'sod', 'Enable HotA', 'Disable HotA', 'Horn of the Abyss');
}

function toggleDoR() {
	togglePreference('switchDoR', 'preferredDoR', 'dor', 'nodor', 'Enable DoR', 'Disable DoR', 'Day of Reckoning');
}

function initPreference(linkSelector, cookieName, cookie1, cookie2, link1, link2, prefName, toggleFunc) {
	var userlinks = document.querySelectorAll('.wds-tabs');
	for (var i = 0; i < userlinks.length; i++) {
		var switchView = document.querySelector('#' + linkSelector + i);
		if (!switchView) {
			switchView = document.createElement('li');
			switchView.style = 'user-select:none; cursor:pointer; color:white; padding-bottom:8px;';
			switchView.id = linkSelector + i;
			switchView.title = prefName + ' (toggle)';
			switchView.addEventListener('click', toggleFunc);
			userlinks[i].insertBefore(switchView, null);
			var elems = document.querySelectorAll('.' + linkSelector);
			for (i = 0; i < elems.length; i++) {
				elems[i].addEventListener('click', toggleFunc);
				elems[i].style = 'user-select:none; cursor: pointer; color: rgb(102, 177, 250);';
			}
		}
		if (getCookie(cookieName) == cookie2) {
			switchView.textContent = link1;
			hideElements('.only' + cookie1);
			showElements('.only' + cookie2);
		} else {
			switchView.textContent = link2;
			hideElements('.only' + cookie2);
			showElements('.only' + cookie1);
		}
	}
}

function fixHoverPopup(e) {
	var elem;
	if (e.target) {
		elem = e.target.nextElementSibling;
	} else {
		elem = e;
	}
	if (elem && elem.offsetWidth && elem.previousElementSibling && elem.previousElementSibling.offsetWidth) {
		if (elem.getBoundingClientRect().x > window.innerWidth / 3) {
			elem.style.left = '-' + (elem.offsetWidth - elem.previousElementSibling.offsetWidth + 20) + 'px';
		} else {
			elem.style.left = '20px';
		}
	}
}

function fixHoverPopups() {
	var elems = document.querySelectorAll('.hoverpopup > a');
	for (var i = 0; i < elems.length; i++) {
		elems[i].title = '';
		elems[i].addEventListener('mouseover', fixHoverPopup);
	}
	elems = document.querySelectorAll('.popuponhover img');
	for (i = 0; i < elems.length; i++) {
		fixHoverPopup(elems[i].parentElement);
	}
	elems = document.querySelectorAll('.popuponhover .popthisup');
	for (i = 0; i < elems.length; i++) {
		fixHoverPopup(elems[i].parentElement);
	}
}

function initJSPopups() {
	var elems = document.querySelectorAll('.hoverable a');
	for (var i = 0; i < elems.length; i++) {
		elems[i].title = '';
	}
	elems = document.querySelectorAll('.hoverable');
	for (i = 0; i < elems.length; i++) {
		for (var j = 0; j < elems[i].classList.length; j++) {
			var popupid = elems[i].classList[j];
			var re = /^popupid/i;
			var found = popupid.match(re);
			if (found) {
				let elem = document.querySelector('.popupable.' + popupid);
				if (elem) {
					let elem0 = elems[i];
					elems[i].addEventListener('mouseover', function () {
						let rect = elem0.getBoundingClientRect();
						elem.style.visibility = 'visible';
						elem.style.height = 'auto';
						elem.style.zIndex = 1;
						elem.style.top = elem0.offsetTop + 23 + 'px';
						console.log('if: ' + rect.x + ' > ' + window.innerWidth / 3);
						if (rect.x > window.innerWidth / 3) {
							elem.style.left = (elem0.offsetLeft - elem.offsetWidth + 20) + 'px';
						} else {
							elem.style.left = elem0.offsetLeft + 20 + 'px';
						}
					});
					elems[i].addEventListener('mouseleave', function () {
						elem.style.visibility = 'hidden';
						elem.style.zIndex = -1;
					});
				}
			}
		}
	}
}

function initCommon() {
	initPreference('switchExpansion', 'preferredExpansion', 'hota', 'sod', 'Enable HotA', 'Disable HotA', 'Horn of the Abyss', togglePreferredExpansion);
	initPreference('switchDoR', 'preferredDoR', 'dor', 'nodor', 'Enable DoR', 'Disable DoR', 'Day of Reckoning', toggleDoR);
	if (!window.location.href.includes('action=edit') && !window.location.href.includes('action=submit')) {
		removeTabsTags();
	}
	fixHoverPopups();
	initJSPopups();
}

try {
	initCommon();
} catch (error) {
	window.setTimeout(initCommon, 2000);
}

})();