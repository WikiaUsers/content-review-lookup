//From: w:c:pfefferkoerner:MediaWiki:Tabchange.js
function tabchange(tabber,tab) {
    if(!!$('.tabberlive.wikia-tabber-' + tabber).length) {
        tabsum = $('.tabberlive.wikia-tabber-' + tabber + ' > ul.tabbernav li').length;
        if(tab <= tabsum) {
            tabberEl = $('.tabberlive.wikia-tabber-' + tabber);
            tabberEl.find('ul.tabbernav > li.tabberactive').removeClass('tabberactive');
            tabberEl.find('ul.tabbernav > li:nth-of-type(' + tab + ')').addClass('tabberactive');
            tabberEl.find('.tabbertab:not(.tabbertabhide)').addClass('tabbertabhide');
            tabberEl.find('.tabbertab.tabbertab:nth-of-type(' + tab + ')').removeClass('tabbertabhide');
            spaceFromTop = tabberEl.offset().top - $('.global-navigation').height() - 10;
            if(!!$('.banner-notifications-wrapper')) {
                spaceFromTop -= $('.banner-notifications-wrapper').height();
            }
            console.log(spaceFromTop);
            $('html,body').animate({scrollTop: spaceFromTop},'slow');
        }
    }
}
 
function hashTab() {
    $('.tabberlive > ul.tabbernav > li > a').unbind().click(function() {
        tabber = $(this).closest('.tabberlive');
        tabberClasses = tabber.attr('class').split(' ');
        for (i in tabberClasses) {
            if(/wikia-tabber-[0-9]{1,3}/.test(tabberClasses[i])) {
                console.log('tabnum',this);
                tabnum = tabber.find('ul.tabbernav > li').index($(this).closest('li')) + 1;
                tabbernum = tabberClasses[i].replace(/wikia-tabber-([0-9]{1,3})/,"$1");
                setHash('tab-' + tabbernum + '-' + tabnum);
            }
        }
    });
}
 
addOnloadHook(function() {
    console.log('Is there a tabber?',!!$('.tabberlive').length);
    if(!!$('.tabberlive').length) {
        console.log('There is at least one!');
        $('.tabberlive').each(function(key,val) {
            $(val).addClass('wikia-tabber-' + key);
        });
    }
});
 
addOnloadHook(hashTab);