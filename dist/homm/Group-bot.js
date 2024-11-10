/* Any JavaScript here will be loaded for bots only */

console.log('MediaWiki:Group-bot.js');

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
    elems[i].style = '';
  }
  elems = document.querySelectorAll('.' + linkSelector + desc);
  for (i = 0; i < elems.length; i++) {
    elems[i].style = 'user-select:none; cursor: pointer; color: rgb(102, 177, 250);';
  }
}

function hideElements(desc) {
  var elems = document.querySelectorAll(desc);
  for (var i = 0; i < elems.length; i++) {
    elems[i].style = 'display:none;';
  }
  elems = document.querySelectorAll('.initialOnly');
  for (i = 0; i < elems.length; i++) {
    elems[i].style = 'display:none;';
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

function initCommon() {
  initPreference('switchExpansion', 'preferredExpansion', 'hota', 'sod', 'Enable HotA', 'Disable HotA', 'Horn of the Abyss', togglePreferredExpansion);
  initPreference('switchDoR', 'preferredDoR', 'dor', 'nodor', 'Enable DoR', 'Disable DoR', 'Day of Reckoning', toggleDoR);
  if (!window.location.href.includes('action=edit') && !window.location.href.includes('action=submit')) {
    removeTabsTags();
  }
}

try {
  initCommon();
} catch (error) {
  $(document).ready(initCommon);
}

})();