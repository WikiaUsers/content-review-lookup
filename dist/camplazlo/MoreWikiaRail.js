function loadWikiRail() {
var s = document.createElement('div');
s.style.marginTop = '5px';
s.style.marginBottom = '5px';
s.style.border = '1px solid rgb(199, 188, 156)';
s.style.overflow = 'hidden';
s.innerHTML = '<iframe src="http://greatveemon.freeshoutbox.net" height="320" width="300" frameborder="0"></iframe>';
document.getElementById('WikiaRail').appendChild(s);
}

loadWikiRail();