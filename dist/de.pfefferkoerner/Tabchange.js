function tabchange(tab) {
    if($('.tabberlive').length) {
        tabsum = $('.tabberlive > ul.tabbernav li').length;
        if(tab <= tabsum) {
            $('.tabberlive > ul.tabbernav > li.tabberactive').removeClass('tabberactive');
            $('.tabberlive > ul.tabbernav > li:nth-of-type(' + tab + ')').addClass('tabberactive');
            $('.tabberlive > .tabbertab:not(.tabbertabhide)').addClass('tabbertabhide');
            $('.tabberlive > .tabbertab.tabbertab:nth-of-type(' + tab + ')').removeClass('tabbertabhide');
        }
    }
}

function hashTab() {
    $('.tabberlive > ul.tabbernav > li > a').off().click(function() {
        setHash('tab-' + ($(this).parent().index('.tabberlive > ul.tabbernav > li') + 1)); 
    });
}

$(document).ready(hashTab);