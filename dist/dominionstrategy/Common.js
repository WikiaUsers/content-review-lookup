/* Any JavaScript here will be loaded for all users on every page load. */

(function() {

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

function changeBorder(e) {
  var optionInput = e.target;
  var curVal = 0;
  if (optionInput.checked) {
    curVal = 11;
  }
  var CookieDate = new Date();
  CookieDate.setFullYear(CookieDate.getFullYear() + 1);
  document.cookie = 'cardbordersize=' + curVal + '; expires=' + CookieDate.toUTCString() + ';';
  setBlackBorder(curVal);
  var navigationUls = document.querySelectorAll('.wds-tabs');
  for (var i = 0; i < navigationUls.length; i++) {
    if (optionInput.id != 'cardBorderChanger' + i) {
      var otherInput = document.querySelector('#cardBorderChanger' + i);
      otherInput.click();
    }
  }
}

function setBlackBorder(bSize) {
  var elems = document.querySelectorAll('img');
  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    var newSize = 0;
    switch (elem.offsetWidth) {
      case 75:
        newSize = 4;
        break;
      case 100:
        newSize = 5;
        break;
      case 120:
        newSize = 6;
        break;
      case 150:
        newSize = 8;
        break;
      case 160:
        newSize = 9;
        break;
      case 200:
        newSize = 11;
        break;
      case 320:
        newSize = 11;
        break;
      case 375:
        newSize = 21;
        break;
      case 800:
        newSize = 21;
        break;
    }
    if (newSize > 0) {
      if (bSize == 0) {
        newSize = 0;
      }
      if (elem.parentElement.className != 'cardborderchanger') {
        elem.outerHTML = '<span class="cardborderchanger" style="display:inline-block; padding:' + newSize + 'px; border-radius:' + (newSize - 1) + 'px; background:black;">' + elem.outerHTML + '</span>';
      } else if (elem.parentElement.className == 'cardborderchanger') {
        elem.parentElement.style.padding = newSize + 'px';
        elem.parentElement.style.borderRadius = (newSize - 1) + 'px';
      }
    }
  }
}

function addSiteOption(optionCookie, optionId, optionFunc) {
  var baseOptionId = optionId;
  var navigationUls = document.querySelectorAll('.wds-tabs');
  for (var i = 0; i < navigationUls.length; i++) {
    var optionId = baseOptionId + i;
    if (!document.querySelector('#' + optionId)) {
      var curVal = getCookie(optionCookie);
      var checked = '';
      if (curVal == '') {
        curVal = 0;
      } else if (curVal > 0) {
        checked = 'checked';
        setBlackBorder(curVal);
      }
      var optionLi = document.createElement('li');
      optionLi.style.marginBottom = '8px';
      optionLi.innerHTML = '<label for="'+ optionId + '" style="cursor:pointer; user-select:none">Card Border:&nbsp;</label><input style="height:8px" type="checkbox" id="'+ optionId + '" '+ checked +'>';
      navigationUls[i].insertBefore(optionLi, null);
      var optionInput = document.querySelector('#' + optionId);
      optionInput.addEventListener('change', optionFunc);
    }
  }
}

function fixCardPopup(e) {
  var elem;
  if (e.target) {
    elem = e.target.parentElement.nextElementSibling;
  } else {
    elem = e;
  }
  if (elem.getBoundingClientRect().x > window.innerWidth / 2) {
    elem.style.left = '-' + (elem.offsetWidth - elem.previousElementSibling.offsetWidth + 20) + 'px';
  }
}

function fixCardPopups() {
  var elems = document.querySelectorAll('.card-popup > a');
  for (var i = 0; i < elems.length; i++) {
    elems[i].title = '';
    elems[i].addEventListener('mouseover', fixCardPopup);
  }
  var elems = document.querySelectorAll('.card-popup > span > img');
  for (var i = 0; i < elems.length; i++) {
    fixCardPopup(elems[i].parentElement);
  }
}

function initCommon() {
  addSiteOption('cardbordersize', 'cardBorderChanger', changeBorder);
  fixCardPopups();
}

window.addEventListener('readystatechange', function() {
  initCommon();
});

window.addEventListener('DOMContentLoaded', function() {
  initCommon();
});

window.addEventListener('load', function() {
  initCommon();
});

//initCommon();

})();