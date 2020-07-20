// ============================================================
// Collapsible sidebar portlets 
// Source: http://www.wikia.com/wiki/User:Splarka/tricks
// ============================================================

function foldingPortlets() {
    var portlets = getElementsByClassName(document.getElementById('column-one'), 'div', 'portlet');
    var portskip = ['p-personal', 'p-cactions', 'p-logo', 'ads-top-left', 'p-search', 'p-tbx', 'p-wikicities-nav', 'p-lang'];
    var num = 0;

    for (var i = 0; i < portlets.length; i++) {
        if (portskip.join(' ').indexOf(portlets[i].id) == -1) {
            var pd = portlets[i].getElementsByTagName('div')[0];
            var ph = portlets[i].getElementsByTagName('h5')[0];

            ph.className = 'portletCollapsible';
            pd.setAttribute('id', 'pbody-' + i);
            pd.style.display = 'none';

            var link = document.createElement('a');
            var head = getAllText(ph);

            while (ph.firstChild) {
                ph.removeChild(ph.firstChild);
            }

            link.appendChild(document.createTextNode(head));
            link.setAttribute('href', 'javascript:showPortlet(\'' + i + '\');');
            link.setAttribute('id', 'plink-'+i);
            link.className = 'portletClosed';
            ph.appendChild(link);

            if (num++ < 3) {
                showPortlet(i);
            }
        }
    }
}

if (skin == 'monobook' && !window.portletsNormal) {
    addOnloadHook(foldingPortlets);
}

function getAllText(thing) {
    if (thing.nodeType == 3) {
        return thing.nodeValue;
    }

    var text = new Array();
    var i = 0;

    while (thing.childNodes[i]) {
        text[text.length] = getAllText(thing.childNodes[i]);
        i++;
    }

    return text.join('');
}

function showPortlet(id) {
    var pd = document.getElementById('pbody-' + id);
    var pl = document.getElementById('plink-' + id);

    if (pd.style.display == 'none') {
        pd.style.display = 'block';
        pl.className = 'portletOpened';
    } else {
        pd.style.display = 'none';
        pl.className = 'portletClosed';
    }
}

// ============================================================
// End of Collapsible sidebar portlets 
// ============================================================