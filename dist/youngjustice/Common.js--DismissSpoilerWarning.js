$().ready( function() { 
window.dismissAllSpoilers = function() {
    // Hide all spoiler warnings for 24 hrs
    var now = new Date();
    var time = now.getTime();
    time += 3 * 24 * 3600 * 1000;
    now.setTime(time);
    document.cookie = 
    'hideSpoilers=1;expires=' + now.toUTCString() + 
    '; path=/';
 
    $('#spoiler-warning').remove();
}
 
function dismissLinks() {
    var dismissElems = $('.dismiss');
    var hideSpoilers = document.cookie.replace(/(?:(?:^|.*;\s*)hideSpoilers\s*\=\s*([^;]*).*$)|^.*$/, "$1");
 
    if (hideSpoilers) {
        return;
    }
 
    $('#spoiler-warning').show();
 
    var span;
    for (var i = 0; i < dismissElems.length; i++) {
 
        var dismissButton = button("dismiss", "$('" + $(dismissElems[i]).data('selector') + "').remove()", '');
        span = document.createElement('span');
        span.append(dismissButton);
        dismissElems[i].append(span);
 
        if ($(dismissElems[i]).hasClass('dismiss-all')) {
            dismissAll = button("dismiss all", "dismissAllSpoilers()", "");
            span = document.createElement('span');
            span.append(dismissAll);
            dismissElems[i].append(span);
        }
 
        $(dismissElems[i]).show();
 
    }
}

addOnloadHook( dismissLinks );
});