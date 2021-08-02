/**
 * 이 스크립트는 마비노기 위키아 전체에 적용됩니다. 고칠 때는 주의해주세요.
 *
 * 스크립트를 넣을 때는 충분한 설명, 출처를 넣어주세요! 이후 관리가 어려워집니다.
 *
 **/

/* 시작: Edittool Bars */
// [[MediaWiki:Edittools]]와 동시 편집 (순서 바꾸지 않기를!)
function addCharSubsetMenu() {
  var specialchars = document.getElementById('specialchars');
  if (specialchars) {
    var menu =
      '<select style="display:inline" onChange="chooseCharSubset(selectedIndex)">';
    menu += '<option>위키 문법</option>';
    menu += '<option>문장 부호</option>';
    menu += '<option>특수 기호</option>';
    menu += '<option>틀</option>';
    menu += '<option>특수 함수</option>';
    menu += '<option>내용 꾸미기</option>';
    menu += '<option>기타</option>';
    menu += '<option>정비 요망</option>';
    menu += '</select>';
    specialchars.innerHTML = menu + specialchars.innerHTML;
    chooseCharSubset(0);
  }
}
function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
}
/* 끝: Edittool Bars */
/* 시작: Edittool-bar 옮기기 */
// Cookie
function SetCookie(cookieName, cookieValue) {
  var today = new Date();
  var expire = new Date();
  var nDays = 30;
  expire.setTime(today.getTime() + 3600000 * 24 * nDays);
  document.cookie =
    cookieName + '=' + escape(cookieValue) + ';expires=' + expire.toGMTString();
}
function GetCookie(name) {
  var i = 0;
  while (i < document.cookie.length) {
    if (document.cookie.substr(i, name.length) == name) {
      var valend = document.cookie.indexOf(';', i + name.length + 1);
      if (valend == -1) {
        valend = document.cookie.length;
      }
      return unescape(document.cookie.substring(i + name.length + 1, valend));
    }
    i = document.cookie.indexOf(' ', i) + 1;
    if (i == 0) break;
  }
}
function chooseCharSubset(ss) {
  s = parseInt(ss);
  if (isNaN(s)) s = 0;
  if (SpecCharsAccesskeys.length == 0) {
    if (is_opera)
      SpecCharsAccesskeys = new Array(
        '!',
        '"',
        '§',
        '$',
        '%',
        '&',
        '/',
        '(',
        ')',
        '='
      );
    else
      SpecCharsAccesskeys = new Array(
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '!',
        '"',
        '§',
        '$',
        '%',
        '&',
        '/',
        '(',
        ')',
        '='
      );
  }
  if (s >= 0) {
    var l = document.getElementById('specialchars').getElementsByTagName('p');
    for (var i = 0; i < l.length; i++) {
      if (i == s) {
        l[i].style.display = 'inline';
        SetArrayAccessKeys(l[i].getElementsByTagName('a'), SpecCharsAccesskeys);
      } else l[i].style.display = 'none';
    }
    SetCookie('CharSubset', s);
  }
}
// Accesskeys
function SetArrayAccessKeys(elements, keys) {
  for (var i = 0; i < elements.length; i++) {
    if (i < keys.length) {
      elements[i].setAttribute('accessKey', keys[i]);
      elements[i].setAttribute('title', 'alt-' + keys[i]);
    } else {
      elements[i].setAttribute('accessKey', '');
      elements[i].setAttribute('title', '');
    }
  }
}
SpecCharsAccesskeys = new Array();
function addCharSubsetMenu() {
  var SpecCharsMove = true;
  var edittools = document.getElementById('specialchars');
  if (edittools) {
    var name;
    var menu = document.createElement('select');
    menu.style.display = 'inline';
    var line = edittools.getElementsByTagName('p');
    for (var i = 0; i < line.length; i++) {
      if (
        line[i].className == 'specialbasic' ||
        line[i].className == 'speciallang'
      ) {
        if (line[i].title) name = line[i].title;
        else name = line[i].id;
        menu.options[menu.options.length] = new Option(name);
      }
    }
    menu.onchange = function () {
      chooseCharSubset(this.selectedIndex);
    };
    if (SpecCharsMove) {
      edittools.insertBefore(menu, edittools.firstChild);
    } else {
      edittools.insertAfter(menu, edittools.firstChild);
    }
    var stdsubset = 0;
    if (GetCookie('CharSubset')) stdsubset = parseInt(GetCookie('CharSubset'));
    if (isNaN(stdsubset)) stdsubset = 0;
    menu.options[stdsubset].selected = true;
    chooseCharSubset(stdsubset);
    var charlinks = document
      .getElementById('toolbar')
      .getElementsByTagName('a');
    for (var i = 0; i < charlinks.length; i++) {
      charlinks[i].setAttribute('tabindex', 8);
    }
  }
}
addOnloadHook(addCharSubsetMenu);
//  Toolbar 옮기기
function elementMoveto(node, refNode, pos) {
  if (node && refNode) {
    var parent = refNode.parentNode;
    if (pos && pos == 'after') refNode = refNode.nextSibling;
    try {
      parent.insertBefore(node, refNode);
    } catch (DOMException) {}
  }
}
// Toolbar 고정
function fixToolbar() {
  var wpEditToolbar = document.getElementById('toolbar');
  var dropdownListEditTools = document.getElementById('dropdownListEditTools');
  elementMoveto(dropdownListEditTools, wpEditToolbar, 'after');
  if (dropdownListEditTools) dropdownListEditTools.style.display = 'block';
  var editspecialchars = document.getElementById('specialchars');
  elementMoveto(editspecialchars, wpEditToolbar, 'after');
}
addOnloadHook(fixToolbar);
/* 끝: Edittool-bar 옮기기 */

/* Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
var hasClass = (function () {
  var reCache = {};
  return function (element, className) {
    return (
      reCache[className]
        ? reCache[className]
        : (reCache[className] = new RegExp(
            '(?:\\s|^)' + className + '(?:\\s|$)'
          ))
    ).test(element.className);
  };
})();

window.killEvt = function (evt) {
  evt = evt || window.event || window.Event;
  if (typeof evt.preventDefault != 'undefined') {
    evt.preventDefault();
    evt.stopPropagation();
  } else {
    evt.cancelBubble = true;
  }
  return false;
};

/** JSconfig ************
 * Global configuration options to enable/disable and configure
 * specific script features from [[MediaWiki:Common.js]] and
 * [[MediaWiki:Monobook.js]]
 * This framework adds config options (saved as cookies) to [[Special:Preferences]]
 * For a more permanent change you can override the default settings in your
 * [[Special:Mypage/monobook.js]]
 * for Example: JSconfig.keys[loadAutoInformationTemplate] = false;
 *
 *  Maintainer: User:Dschwen
 */

var JSconfig = {
  prefix: 'jsconfig_',
  keys: {},
  meta: {},

  //
  // Register a new configuration item
  //  * name          : String, internal name
  //  * default_value : String or Boolean (type determines configuration widget)
  //  * description   : String, text appearing next to the widget in the preferences
  //  * prefpage      : Integer (optional), section in the preferences to insert the widget:
  //                     0 : User profile
  //                     1 : Skin
  //                     2 : Math
  //                     3 : Files
  //                     4 : Date and time
  //                     5 : Editing
  //                     6 : Recent changes
  //                     7 : Watchlist
  //                     8 : Search
  //                     9 : Misc
  //
  // Access keys through JSconfig.keys[name]
  //
  registerKey: function (name, default_value, description, prefpage) {
    if (typeof JSconfig.keys[name] == 'undefined')
      JSconfig.keys[name] = default_value;
    else {
      // all cookies are read as strings,
      // convert to the type of the default value
      switch (typeof default_value) {
        case 'boolean':
          JSconfig.keys[name] = JSconfig.keys[name] == 'true';
          break;
        case 'number':
          JSconfig.keys[name] = JSconfig.keys[name] / 1;
          break;
      }
    }

    JSconfig.meta[name] = {
      description: description,
      page: prefpage || 0,
      default_value: default_value,
    };
  },

  readCookies: function () {
    var cookies = document.cookie.split('; ');
    var p = JSconfig.prefix.length;
    var i;

    for (var key in cookies) {
      if (cookies[key].substring(0, p) == JSconfig.prefix) {
        i = cookies[key].indexOf('=');
        //alert( cookies[key] + ',' + key + ',' + cookies[key].substring(p,i) );
        JSconfig.keys[cookies[key].substring(p, i)] = cookies[key].substring(
          i + 1
        );
      }
    }
  },

  writeCookies: function () {
    for (var key in JSconfig.keys)
      document.cookie =
        JSconfig.prefix +
        key +
        '=' +
        JSconfig.keys[key] +
        '; path=/; expires=Thu, 2 Aug 2009 10:10:10 UTC';
  },

  evaluateForm: function () {
    var w_ctrl, wt;
    //alert('about to save JSconfig');
    for (var key in JSconfig.meta) {
      w_ctrl = document.getElementById(JSconfig.prefix + key);
      if (w_ctrl) {
        wt = typeof JSconfig.meta[key].default_value;
        switch (wt) {
          case 'boolean':
            JSconfig.keys[key] = w_ctrl.checked;
            break;
          case 'string':
            JSconfig.keys[key] = w_ctrl.value;
            break;
        }
      }
    }

    JSconfig.writeCookies();
    return true;
  },

  setUpForm: function () {
    var prefChild = document.getElementById('preferences');
    if (!prefChild) return;
    prefChild = prefChild.childNodes;

    //
    // make a list of all preferences sections
    //
    var tabs = new Array();
    var len = prefChild.length;
    for (var key = 0; key < len; key++) {
      if (
        prefChild[key].tagName &&
        prefChild[key].tagName.toLowerCase() == 'fieldset'
      )
        tabs.push(prefChild[key]);
    }

    //
    // Create Widgets for all registered config keys
    //
    var w_div, w_label, w_ctrl, wt;
    for (var key in JSconfig.meta) {
      w_div = document.createElement('DIV');

      w_label = document.createElement('LABEL');
      w_label.appendChild(
        document.createTextNode(JSconfig.meta[key].description)
      );
      w_label.htmlFor = JSconfig.prefix + key;

      wt = typeof JSconfig.meta[key].default_value;

      w_ctrl = document.createElement('INPUT');
      w_ctrl.id = JSconfig.prefix + key;

      // before insertion into the DOM tree
      switch (wt) {
        case 'boolean':
          w_ctrl.type = 'checkbox';
          break;
        case 'string':
          w_ctrl.type = 'text';
          break;
      }

      w_div.appendChild(w_label);
      w_div.appendChild(w_ctrl);
      tabs[JSconfig.meta[key].page].appendChild(w_div);

      // after insertion into the DOM tree
      switch (wt) {
        case 'boolean':
          w_ctrl.defaultChecked = w_ctrl.checked = JSconfig.keys[key];
          break;
        case 'string':
          w_ctrl.defaultValue = w_ctrl.value = JSconfig.keys[key];
          break;
      }
    }
    addEvent(
      document.getElementById('preferences').parentNode,
      'submit',
      JSconfig.evaluateForm
    );
  },
};

JSconfig.readCookies();
addOnloadHook(JSconfig.setUpForm);

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110 || wgNamespaceNumber === 114) {
  function disableOldForumEdit() {
    if (typeof enableOldForumEdit != 'undefined' && enableOldForumEdit) {
      return;
    }
    if (!document.getElementById('old-forum-warning')) {
      return;
    }

    if (skin == 'oasis') {
      $('#WikiaPageHeader .wikia-menu-button > a')
        .html('보존된 문서')
        .removeAttr('href');
      return;
    }
    if (!document.getElementById('ca-edit')) {
      return;
    }
    var editLink = null;
    if (skin == 'monaco') {
      editLink = document.getElementById('ca-edit');
    } else if (skin == 'monobook') {
      editLink = document.getElementById('ca-edit').firstChild;
    } else {
      return;
    }

    editLink.removeAttribute('href', 0);
    editLink.removeAttribute('title', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = '보존된 문서';

    $('span.editsection-upper').remove();
  }
  addOnloadHook(disableOldForumEdit);
}

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = (count = Math.floor((then.getTime() - now.getTime()) / 1000));

  // catch bad date strings
  if (isNaN(diff)) {
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
    return;
  }

  // determine plus/minus
  if (diff < 0) {
    diff = -diff;
    var tpm = '';
  } else {
    var tpm = '';
  }

  // Calculate the diff - Modified by Eladkse
  if (diff % 60 == 1) {
    left = (diff % 60) + '초';
  } else {
    left = (diff % 60) + '초';
  }
  diff = Math.floor(diff / 60);
  if (diff > 0) {
    if (diff % 60 == 1) {
      left = (diff % 60) + '분 ' + left;
    } else {
      left = (diff % 60) + '분 ' + left;
    }
  }
  diff = Math.floor(diff / 60);
  if (diff > 0) {
    if (diff % 24 == 1) {
      left = (diff % 24) + '시간 ' + left;
    } else {
      left = (diff % 24) + '시간 ' + left;
    }
  }
  diff = Math.floor(diff / 24);
  if (diff > 0) {
    if (diff == 1) {
      left = diff + '일 ' + left;
    } else {
      left = diff + '일 ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for (var i in countdowns) countdowns[i].style.display = 'inline';

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if (timers.length == 0) return;
  for (var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i); //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
//

/* Special:Upload */
function Information() {
  if (
    (wgPageName == '특수기능:파일올리기' ||
      wgPageName == '특수기능:다중올리기') &&
    document.getElementById('wpDestFile').value == ''
  ) {
    document.getElementById('wpUploadDescription').value =
      '{{그림 정보\r| 설명 = \n| 출처 = \n| 날짜 = \n| 만든이 = \n| 저작권 = \n | 기타 = \n}}';
  }
}
addOnloadHook(Information);