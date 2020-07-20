/** <pre>
 * Collapsible sidebar portlets 
 * Source: http://c.wikia.com/wiki/User:Splarka/tricks
 */

;(function (window, document, $) {

    'use strict';

    function getAllText(thing) {
        if (thing.nodeType === 3) {
            return thing.nodeValue;
        }

        var text = [],
            i = 0;

        while (thing.childNodes[i]) {
            text[text.length] = getAllText(thing.childNodes[i]);
            i += 1;
        }

        return text.join('');
    }

    function showPortlet(id) {
        var pd = document.getElementById('pbody-' + id),
            pl = document.getElementById('plink-' + id);

        if (pd.style.display === 'none') {
            $(pd).slideToggle(500);
            pl.className = 'portletOpened';
        } else {
            $(pd).slideToggle(500);
            pl.className = 'portletClosed';
        }
    }

    function foldingPortlets() {

        var portlets = document.getElementsByClassName(document.getElementById('column-one'), 'div', 'portlet'),
            portskip = ['p-personal', 'p-cactions', 'p-logo', 'ads-top-left', 'p-search', 'p-tbx', 'p-wikicities-nav', 'p-lang'],
            num = 0,
            i,
            pd,
            ph,
            link,
            head;

        for (i = 0; i < portlets.length; i += 1) {
            if (portskip.join(' ').indexOf(portlets[i].id) === -1) {
                pd = portlets[i].getElementsByTagName('div')[0];
                ph = portlets[i].getElementsByTagName('h5')[0];

                ph.className = 'portletCollapsible';
                pd.setAttribute('id', 'pbody-' + i);

                link = document.createElement('a');
                head = getAllText(ph);

                while (ph.firstChild) {
                    ph.removeChild(ph.firstChild);
                }

                link.appendChild(document.createTextNode(head));
                link.setAttribute('href', 'javascript:showPortlet(' + i + ');');
                link.setAttribute('id', 'plink-' + i);
                if ((num += 1) < 2) {
                    link.className = 'portletOpened';
                    pd.style.display = "block";
                } else {
                    link.className = 'portletClosed';
                    pd.style.display = "none";
                }
                ph.appendChild(link);
            }
        }
    }

    if (!window.portletsNormal) {
        $(function () {
            foldingPortlets();
        });
    }

}(this, this.document, this.jQuery));