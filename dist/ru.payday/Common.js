/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });

    });
});

$(function() {
    var table = document.getElementById('bigOilEngines');
    if (!table) return;

    $('input[name^="bigoil-"]').change(function(evt) {
        var attr = 'data-' + evt.currentTarget.name;
        evt.currentTarget.value ? table.setAttribute(attr, evt.currentTarget.value) : table.removeAttribute(attr);
    });
    document.getElementById('bigOilInputs').style.display = '';
});

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


function getElementsByClass(node, className, tagName) {
    if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
    var list = node.getElementsByTagName(tagName ? tagName : '*');
    var array = new Array();
    var i = 0;
    for (i in list) {
        if (hasClass(list[i], className))
            array.push(list[i]);
    }
    return array;
}

/* Creates the method getElementsByClass, if unsupported from the browser */
if (!document.getElementsByClass) document.getElementsByClass = function(className) {
    return getElementsByClass(document, className, '*');
};


function getElementsByName(name, root) {
    if (root == undefined) root = document;
    var e = root.getElementsByTagName('*');
    var r = new Array();
    for (var i = 0; i < e.length; i++) {
        if (e[i].getAttribute('name') == name) r[r.length] = e[i];
    }
    return r;
}