function addHideButtons() {
    if (typeof getElementsByClass != 'function') {
        return;
    }
    var hidables = getElementsByClass('hidable');
 
    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');
 
        if (button !== null && button.length > 0) {
            button = button[0];
 
            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Versteckt]'));
 
            if (new ClassTester('start-hidden').isMatch(box)) button.onclick('bypass');
        }
    }
}
 
function toggleHidable(bypassStorage) {
    if (typeof getElementsByClass != 'function') {
        return;
    }
 
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;
 
    if (content !== null && content.length > 0) {
        content = content[0];
 
        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Versteckt]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Zeige]';
            nowShown = false;
        }
 
        if (window.storagePresent && (typeof (bypassStorage) == 'undefined' || bypassStorage != 'bypass')) {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;
 
            for (var i = 0; i < items.length; i++) {
                if (items[i] == parent) {
                    item = i;
                    break;
                }
            }
 
            if (item == -1) {
                return;
            }
 
            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}