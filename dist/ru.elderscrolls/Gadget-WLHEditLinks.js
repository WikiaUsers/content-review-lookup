/*** WLH edit links *********************************************************
 * Adds links for each linked page on Special:WhatLinksHere
 ****************************************************************************/
function addEditLinksToWLH() {
    $.each($('#mw-whatlinkshere-list li a:not([title="Служебная:WhatLinksHere"]):not([title*="Тема:"]):not([title*="Стена обсуждения:"]):not([title*="Главная тема:"])'), function() {
        var elem = $(this),
        pageName = elem.attr('href').replace('?redirect=no','') + '?action=edit',
        element = $('<span/>', {
            class: 'mw-whatlinkshere-edit'
        })
        .before(' ')
        .append('(')
        .append(
        $('<a/>', {
            href: pageName,
            text: 'править'
            })
        )
        .append(')')
        .insertAfter(elem);
    });
}
 
/*** File usage edit links **************************************************
 * Adds links for each linked page in File usage on file pages
 ****************************************************************************/
function addEditLinksToFilePages() {
    $.each($('#mw-imagepage-section-linkstoimage .grid-3 a'), function() {
        var elem = $(this),
        pageName = elem.attr('href') + '?action=edit',
        element = $('<span/>', {
            class: 'mw-imagepage-section-linkstoimage-edit'
        })
        .before(' ')
        .append('(')
        .append(
            $('<a/>', {
                href: pageName,
                text: 'править'
            })
        )
        .append(')')
        .insertAfter(elem);
  });
}
 
/*** Loading ****************************************************************
 * Loads both functions, applies double load protection
 ****************************************************************************/
 
$(function() {
    if (window.WLHEditLinksLoaded) {
        return;
    }
    window.WLHEditLinksLoaded = true;
    
    if ($('body').hasClass('mw-special-Whatlinkshere')) {
        addEditLinksToWLH()
    }
    
    if ($('body').hasClass('ns-6')) {
        addEditLinksToFilePages()
 
        var pagelistcontent = document.querySelector('.page-list-content');
 
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(m) {
            var rn = m.removedNodes;
            rn.forEach(function(n) {
              if ($(n).hasClass('wikiaThrobber')) {
                addEditLinksToFilePages();
              }
            });
          });
        });
        if(pagelistcontent) observer.observe(pagelistcontent, {
          childList: true
        });
 
  }
});