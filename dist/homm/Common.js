/* Any JavaScript here will be loaded for all users on every page load. */

console.log('MediaWiki:Common.js');

(function () {

const siteUploadPath = 'https://static.wikia.nocookie.net/heroes-of-might-and-magic/images/';

let articlePath = mw.config.values.wgArticlePath.replace(/\/\$1/, '');

function getCookie(cname) {
	var result = localStorage.getItem(cname);
	if (result) {
		return result;
	}
	return '';
}

function trimRE(str, charToTrim) {
	var escapedChar = charToTrim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	var regex = new RegExp(`^${escapedChar}+|${escapedChar}+$`, 'g');
	return str.replace(regex, '');
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

function togglePreference(linkSelector, cookieName, cookie1, cookie2, link1, link2, prefName) {
	var preference = getCookie(cookieName);
	var userlinks = document.querySelectorAll('.wds-tabs');
	for (var i = 0; i < userlinks.length; i++) {
		var switchView = document.querySelector('#' + linkSelector + i);
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
	localStorage.setItem(cookieName, preference);
}

function setPreference(linkSelector, cookieName, cookie1, cookie2, link1, link2, prefName, preference) {
	var userlinks = document.querySelectorAll('.wds-tabs');
	for (var i = 0; i < userlinks.length; i++) {
		var switchView = document.querySelector('#' + linkSelector + i);
		if (switchView) {
			if (preference == cookie1) {
				switchView.textContent = link2;
			} else {
				switchView.textContent = link1;
			}
		}
	}
	if (preference == cookie1) {
		hideElements('.only' + cookie2);
		showElements('.only' + cookie1, linkSelector);
	} else {
		hideElements('.only' + cookie1);
		showElements('.only' + cookie2, linkSelector);
	}
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

function toggleHeroesStyle() {
	togglePreference('switchHeroesStyle', 'heroesStyle', 'heroesStyleDisabled', 'heroesStyleEnabled', 'Disable H3CSS', 'Enable H3CSS', 'Heroes Style');
	setHeroesStyle();
}

function setHeroesStyle() {
	var preference = getCookie('heroesStyle');
	if (preference == 'heroesStyleEnabled') {
		document.adoptedStyleSheets.push(heroesStyleSheet);
	} else if (heroesStyleSheet) {
		while (document.adoptedStyleSheets.pop());
	}
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

function getCookieNumber(cookieName, cookieDefault) {
	var cookieVal = getCookie(cookieName);
	if (cookieVal == '') {
		cookieVal = cookieDefault;
	} else {
		cookieVal = Number(cookieVal);
	}
	return cookieVal;
}

function initPreferenceNumber(linkSelector, cookieName, cookieDefault, prefName, displayText, min, max, step, changeFunc) {
	var cookieVal = getCookieNumber(cookieName, 50);
	var userlinks = document.querySelectorAll('.wds-tabs');
	for (var i = 0; i < userlinks.length; i++) {
		var switchView = document.querySelector('#' + linkSelector + i);
		if (!switchView) {
			switchView = document.createElement('li');
			switchView.style = 'user-select:none; padding-bottom:8px;';
			switchView.id = linkSelector;
			switchView.title = prefName;
			switchView.textContent = displayText;
			var switchViewInput = document.createElement('input');
			switchViewInput.type = 'number';
			switchViewInput.step = step;
			switchViewInput.min = min;
			switchViewInput.max = max;
			switchViewInput.value = cookieVal;
			switchViewInput.style.marginLeft = '3px';
			switchViewInput.style.fieldSizing = 'content';
			switchViewInput.style.minWidth = '34px';
			switchViewInput.addEventListener('change', changeFunc);
			switchView.insertBefore(switchViewInput, null);
			userlinks[i].insertBefore(switchView, null);
		}
	}
}

function adjustVolume(e) {
	if (isNaN(Number(e.target.value))) {
		e.target.value = 50;
	} else if (e.target.value > 100) {
		e.target.value = 100;
	} else if (e.target.value < 0) {
		e.target.value = 0;
	}
	
	var elems = document.querySelectorAll('#adjustVolume input');
	for (var i = 0; i < elems.length; i++) {
		elems[i].value = e.target.value;
	}
	
	localStorage.setItem('volumeLoudness', e.target.value);
	
	setVolume(e.target.value / 100);
	
	for (i = 0; i < playables.length; i++) {
		playables[i].volume = e.target.value / 100;
	}
}

function getOffsetTop(e, top) {
	if (!e || e.id == 'bodyContent' || e.tagName == 'MAIN') {
		return top;
	}
	return getOffsetTop(e.offsetParent, top+e.offsetTop);
}

function getOffsetLeft(e, left) {
	if (!e || e.id == 'bodyContent' || e.tagName == 'MAIN') {
		return left;
	}
	return getOffsetLeft(e.offsetParent, left+e.offsetLeft);
}

function fixClassNames(selectors) {
	for (var h = 0; h < selectors.length; h++) {
		var elems = document.querySelectorAll(selectors[h]);
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].className.includes(',')) {
				elems[i].className = elems[i].className.replaceAll(',','');
			}
			if (elems[i].className.includes('(')) {
				elems[i].className = elems[i].className.replaceAll('(','');
			}
			if (elems[i].className.includes(')')) {
				elems[i].className = elems[i].className.replaceAll(')','');
			}
		}
	}
}

function initHoverPopups() {
	var elems = document.querySelectorAll('.popupable');
	var bodyContent = document.querySelector('#bodyContent');
	var main = document.querySelector('main');
	for (var i = 0; i < elems.length; i++) {
		elems[i].parentElement.removeChild(elems[i]);
		if (bodyContent) {
			bodyContent.appendChild(elems[i]);
		} else if (main) {
			main.appendChild(elems[i]);
		}
	}
	elems = document.querySelectorAll('.hoverable a');
	for (i = 0; i < elems.length; i++) {
		elems[i].title = '';
	}
	elems = document.querySelectorAll('.hoverable');
	for (i = 0; i < elems.length; i++) {
		// var p = elems[i].parentElement;
		// if (p.tagName == 'P') {
		//     var span = document.createElement('span');
		//     p.parentElement.insertBefore(span, p);
		//     while (p.childNodes.length > 0) {
		//         span.appendChild(p.childNodes[0]);
		//     }
		//     p.parentElement.removeChild(p);
		// }
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
						elem.style.zIndex = 99;
						elem.style.top = getOffsetTop(elem0.offsetParent, elem0.offsetTop) + 23 + 'px';
						let left = getOffsetLeft(elem0.offsetParent, elem0.offsetLeft);
						if (rect.x > window.innerWidth / 2) {
							elem.style.left = (left - elem.offsetWidth + 20) + 'px';
						} else {
							elem.style.left = left + 20 + 'px';
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

var playables = [];
function initPlayables() {
	var elems = document.querySelectorAll('.playable');
	var bodyContent = document.querySelector('#bodyContent');
	var main = document.querySelector('main');
	for (var i = 0; i < elems.length; i++) {
		elems[i].parentElement.removeChild(elems[i]);
		if (bodyContent) {
			bodyContent.appendChild(elems[i]);
		} else if (main) {
			main.appendChild(elems[i]);
		}
	}
	elems = document.querySelectorAll('.clickToPlay a');
	for (i = 0; i < elems.length; i++) {
		elems[i].title = '';
		elems[i].style.pointerEvents = 'none';
	}
	elems = document.querySelectorAll('.clickToPlay');
	for (i = 0; i < elems.length; i++) {
		for (var j = 0; j < elems[i].classList.length; j++) {
			var playid = elems[i].classList[j];
			var re = /^playid/i;
			var found = playid.match(re);
			if (found) {
				let elem = document.querySelector('.playable.' + playid + ' > a');
				if (elem) {
					let elem0 = elems[i];
					elem0.style.cursor = 'pointer';
					let audio = new Audio(elem.href);
					playables.push(audio);
					elems[i].addEventListener('click', function () {
						audio.volume = getCookieNumber('volumeLoudness', 50) / 100;
						if (audio.paused) {
							audio.play();
						} else {
							audio.pause();
						}
					});
				}
			}
		}
	}
}

function setVolume(value) {
	if (value == 'cookie') {
		value = getCookieNumber('volumeLoudness', 50) / 100;
	}
	var volumeables = ['audio','video'];
	for (var h = 0; h < volumeables.length; h++) {
		var elems = document.querySelectorAll(volumeables[h]);
		for (i = 0; i < elems.length; i++) {
			elems[i].volume = value;
		}
	}
}

function setPoster(e) {
	e.target.removeEventListener('seeked', setPoster);
	try {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = e.target.videoWidth;
		canvas.height = e.target.videoHeight;
		context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
	    canvas.toBlob(function(blob) { e.target.poster = URL.createObjectURL(blob); }, 'image/webp', 0.9);
		e.target.currentTime = 0;
		var src = e.target.src;
		e.target.src = '';
		e.target.src = src;
	} catch (error) {
		console.error(error);
	}
}

function initPoster(e) {
	e.target.removeEventListener('loadeddata', initPoster);
	var thumbtime = e.target.parentElement.dataset.thumbnail;
	var thumbtimeparts = trimRE(thumbtime, ':').split(':');
	if (thumbtimeparts.length == 1 && thumbtime != '') {
		thumbtime = parseFloat(thumbtime);
	} else if (thumbtimeparts.length == 2) {
		thumbtime = parseFloat(thumbtimeparts[1]) + parseFloat(thumbtimeparts[0]) * 60;
	} else if (thumbtimeparts.length == 3) {
		thumbtime = parseFloat(thumbtimeparts[2]) + parseFloat(thumbtimeparts[1]) * 60;
		thumbtime = thumbtime + parseFloat(thumbtimeparts[0]) * 60 * 60;
	} else {
		return;
	}
	if (thumbtime > 0) {
		e.target.addEventListener('seeked', setPoster);
		e.target.currentTime = thumbtime;
	}
}

var savedScrollPosition = window.scrollY;
function setSavedScrollPosition() {
    if (!document.fullscreenElement) {
        savedScrollPosition = window.scrollY;
    }
}

function fixFullscreen() {
	document.addEventListener('fullscreenchange', function() {
	    if (!document.fullscreenElement) {
	        window.scrollTo(0, savedScrollPosition);
	    }
	});
}

function setupWatchables() {
	var elems = document.querySelectorAll('.watchable');
	for (var i = 0; i < elems.length; i++) {
		var a = elems[i].querySelector('a');
		a.style.display = 'none';
		let fileName = 'File:' + mw.util.parseImageUrl(a.href.replace(/\/revision\/latest\?cb=\d+/, '')).name;
		let fileLink = articlePath + '/' + fileName;
		if (elems[i].dataset && elems[i].dataset.link) {
			fileLink = articlePath + '/' + elems[i].dataset.link;
		}
		let video;
		let videoTitle = 'Click anywhere on the page, then hover here and press shift to open ' + fileName;
		if (elems[i].dataset && elems[i].dataset.audio) {
			video = document.createElement('audio');
			video.volume = getCookieNumber('volumeLoudness', 50) / 100;
			video.controls = true;
		} else if (a.href.toLowerCase().search('.gif') == -1 && a.href.toLowerCase().search('.png') == -1 && a.href.toLowerCase().search('.webp') == -1 && a.href.toLowerCase().search('.jpg') == -1) {
			video = document.createElement('video');
			video.volume = getCookieNumber('volumeLoudness', 50) / 100;
			let isFocused = false;
			video.addEventListener('play', function (e) {
				video.focus();
				video.title = '';
			});
			video.addEventListener('pause', function (e) {
				video.title = videoTitle;
			});
			video.addEventListener('mouseover', function (e) {
				window.setTimeout(setSavedScrollPosition, 0);
				e.target.controls = true;
				video.focus();
			});
			video.addEventListener('mouseleave', function (e) {
				e.target.controls = false;
			});
			video.addEventListener('focus', function (e) {
				isFocused = true;
			});
			video.addEventListener('blur', function (e) {
				isFocused = false;
			});
			video.addEventListener('keydown', function (e) {
				if (isFocused) {
					if (e.key == 'f' || e.key == 'F') {
						if (document.fullscreen) {
							document.exitFullscreen();
						} else {
							video.requestFullscreen();
						}
					}
				}
			});
			let clickTimer = null;
			video.addEventListener('click', function(e) {
				e.preventDefault();
				if (clickTimer == null) {
					clickTimer = setTimeout(function(){
						if (e.target.paused) {
							e.target.play();
						} else {
							e.target.pause();
						}
						clickTimer = null;
					}, 200);
				} else {
					clearTimeout(clickTimer);
					if (document.fullscreen) {
						document.exitFullscreen();
					} else {
						e.target.requestFullscreen();
					}
					clickTimer = null;
				}
			});
			if (!a.href.includes(window.location.hostname)) {
				video.crossOrigin = 'anonymous';
			}
		} else {
			video = document.createElement('img');
		}
		if (elems[i].dataset) {
			if (elems[i].dataset.width) {
				video.width = elems[i].dataset.width.replace('px', '');
			}
			if (elems[i].dataset.height) {
				video.height = elems[i].dataset.height.replace('px', '');
			}
			if (elems[i].dataset.thumbnail && elems[i].dataset.thumbnail != '') {
				video.addEventListener('loadeddata', initPoster);
			}
		}
		video.src = a.href;
		if (video.tagName == 'AUDIO' || video.tagName == 'VIDEO') {
			video.title = videoTitle;
			function openOnShift(e) {
			    if (e.shiftKey) {
			        window.open(fileLink);
			    }
			}
			video.addEventListener('mouseover', function (e) {
			    document.addEventListener('keydown', openOnShift);
			});
			video.addEventListener('mouseleave', function (e) {
			    document.removeEventListener('keydown', openOnShift);
			});
		}
		if (video.tagName == 'IMG') {
			var wrapA = document.createElement('a');
			wrapA.href = fileLink;
			wrapA.appendChild(video);
			elems[i].insertBefore(wrapA, null);
		} else {
			elems[i].insertBefore(video, null);
		}
	}
}

function initWatchables() {
	window.setTimeout(setupWatchables, 0);
}

function handleStorageChange(e) {
	if (event.storageArea == localStorage) {
		if (e.key == 'preferredExpansion') {
			setPreference('switchExpansion', 'preferredExpansion', 'hota', 'sod', 'Enable HotA', 'Disable HotA', 'Horn of the Abyss', e.newValue);
		} else if (e.key == 'preferredDoR') {
			setPreference('switchDoR', 'preferredDoR', 'dor', 'nodor', 'Enable DoR', 'Disable DoR', 'Day of Reckoning', e.newValue);
		} else if (e.key == 'volumeLoudness') {
			adjustVolume({target:{value:e.newValue}});
		} else if (e.key == 'heroesStyle') {
			setPreference('switchHeroesStyle', 'heroesStyle', 'heroesStyleDisabled', 'heroesStyleEnabled', 'Disable H3CSS', 'Enable H3CSS', 'Heroes Style', e.newValue);
			setHeroesStyle();
		}
	}
}

function displayWebp(parent, src, maxWidth, maxHeight) {
    var img = document.createElement('img');
    if (maxWidth) {
    	img.style.maxWidth = maxWidth + 'px';
    }
    if (maxHeight) {
    	img.style.maxHeight = maxHeight + 'px';
    }
    img.classList.add('finishedFixingWebp');
    parent.appendChild(img);
    img.src = src;
}

function escapeMediaWiki(fileName) {
  return fileName
    .replace(/ /g, '_')           // spaces to underscores
    .replace(/'/g, '%27')         // apostrophes
    .replace(/"/g, '%22')         // double quotes
    .replace(/\(/g, '%28')        // left parenthesis
    .replace(/\)/g, '%29')        // right parenthesis
    .replace(/:/g, '%3A')         // colon
    .replace(/;/g, '%3B')         // semicolon
    .replace(/@/g, '%40')         // at symbol
    .replace(/&/g, '%26')         // ampersand
    .replace(/\+/g, '%2B')        // plus
    .replace(/,/g, '%2C')         // comma
    .replace(/\?/g, '%3F')        // question mark
    .replace(/#/g, '%23')         // hash
    .replace(/\[/g, '%5B')        // left square bracket
    .replace(/\]/g, '%5D');       // right square bracket
}

function getFileName(href) {
	return escapeMediaWiki(href.split('/').at(-1).replace('File:', ''));
}

function getFileNameHash(fileName) {
	return new Hashes.MD5().hex(decodeURIComponent(fileName));
}

function fixWebpDisplay() {
    var galleryBoxes = document.querySelectorAll('.wikia-gallery-item');
	for (const galleryBox of galleryBoxes) {
		if (galleryBox.querySelector('.finishedFixingWebp')) {
			continue;
		}
	    const elem = galleryBox.querySelector('a');
	    if (elem.href && elem.href.endsWith('webp')) {
	        elem.innerHTML = '';
	        var fileName = getFileName(elem.href);
	        var fileHash = getFileNameHash(fileName);
	        displayWebp(elem, siteUploadPath + fileHash[0] + '/' + fileHash.substr(0, 2) + '/' + fileName, 150, 150);
	    }
	}
    var searchThumbnails = document.querySelectorAll('.searchResultImage-thumbnail');
    for (const searchThumbnail of searchThumbnails) {
		if (searchThumbnail.querySelector('.finishedFixingWebp')) {
			continue;
		}
        const elem = searchThumbnail.querySelector('a');
        if (elem.href && elem.href.endsWith('webp')) {
            elem.innerHTML = '';
            var fileName = getFileName(elem.href);
            var fileHash = getFileNameHash(fileName);
            displayWebp(elem, siteUploadPath + fileHash[0] + '/' + fileHash.substr(0, 2) + '/' + fileName, 104, 90);
        }
    }
    var links = document.querySelectorAll('a');
    for (const link of links) {
    	if (!link.href || !link.href.split || link.querySelector('.finishedFixingWebp')) {
    		continue;
    	}
        var fileExt = link.href.split('/').at(-3).split('.').at(-1);
        if (fileExt == 'webp') {
            var img = link.querySelector('img');
            if (img) {
                var fileIcon = img.src.split('/').at(-1).split('.').at(-2);
                if (fileIcon == 'fileicon') {
                    link.innerHTML = '';
                    displayWebp(link, link.href);
                }
            }
        }
    }
}

function verifyWebp() {
	var links = document.querySelectorAll('a');
    for (const link of links) {
    	if (!link.href || !link.href.split || link.querySelector('.finishedFixingWebp')) {
    		continue;
    	}
        var fileExt = link.href.split('/').at(-3).split('.').at(-1);
        if (fileExt == 'webp') {
            var images = link.querySelectorAll('img');
            for (const img of images) {
                var fileIcon = img.src.split('/').at(-1).split('.').at(-2);
                if (fileIcon == 'fileicon') {
                    window.setTimeout(initWebp, 0);
                    return;
                }
            }
        }
    }
}

function finalizeWebp() {
	var links = document.querySelectorAll('a');
    for (const link of links) {
    	if (!link.href || !link.href.split || !link.querySelector('.finishedFixingWebp')) {
    		continue;
    	}
        var images = link.querySelectorAll('img');
		for (const img of images) {
			if (!img.className.includes('finishedFixingWebp')) {
				img.remove();
			}
		}
    }
}

function initWebp() {
	try {
		fixWebpDisplay();
		verifyWebp();
		finalizeWebp();
		window.setTimeout(verifyWebp, 150);
		window.setTimeout(verifyWebp, 1500);
		return;
	} catch (e) {
		// console.log('fixWebpDisplay failed');
		// console.error(e);
	}
	window.setTimeout(initWebp, 0);
}

function initCommon() {
	initPreference('switchExpansion', 'preferredExpansion', 'hota', 'sod', 'Enable HotA', 'Disable HotA', 'Horn of the Abyss', togglePreferredExpansion);
	initPreference('switchDoR', 'preferredDoR', 'dor', 'nodor', 'Enable DoR', 'Disable DoR', 'Day of Reckoning', toggleDoR);
	initPreference('switchHeroesStyle', 'heroesStyle', 'heroesStyleDisabled', 'heroesStyleEnabled', 'Disable H3CSS', 'Enable H3CSS', 'Heroes Style', toggleHeroesStyle);
	initPreferenceNumber('adjustVolume', 'volumeLoudness', 50, 'Adjust Volume %', 'Volume', 0, 100, 5, adjustVolume);
	if (!window.location.href.includes('action=edit') && !window.location.href.includes('action=submit')) {
		removeTabsTags();
	}
	fixClassNames(['.hoverable','.popupable','.clickToPlay','.playable']);
	initHoverPopups();
	initPlayables();
	setVolume('cookie');
	initWatchables();
	fixFullscreen();
	window.addEventListener('storage', handleStorageChange);
}

function beforeInitCommon() {
	var userlinks = document.querySelectorAll('.wds-tabs');
	if (userlinks) {
		try {
			initCommon();
			return;
		} catch (e) {
			// console.log('initCommon failed');
			// console.error(e);
		}
	}
	window.setTimeout(beforeInitCommon, 0);
}

// run immediately
window.setTimeout(beforeInitCommon, 0);

$.when(
	mw.loader.getScript(articlePath + '/MediaWiki:H3CSS.min.js?action=raw&ctype=text/javascript')
).done(function() {
	setHeroesStyle();
}).fail(function (e) {
	console.error('mw.loader.getScript H3CSS.min.js failed');
	console.error(e);
});

$.when(
	mw.loader.getScript(articlePath + '/MediaWiki:Hashes.min.js?action=raw&ctype=text/javascript')
).done(function() {
	initWebp();
}).fail(function (e) {
	console.log('mw.loader.getScript Hashes.min.js failed');
	console.error(e);
});

try {
	mw.config.set("wgMediaViewerOnClick", false);
} catch (e) {
	// console.error(e);
}

})();