/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : true,
    refreshDelay : 300000,
    timeout : 20000
};

mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() {
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); 
            return false;
        });
        $('#portal_prev').click(function() { 
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); 
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

/*==================================================================================================
Inactive User Statuses 
==================================================================================================*/
//Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};