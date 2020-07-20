if (wgPageName != 'User:' + wgUserName + '/Wikimarks') (function () {

    var footer = $('#WikiaFooter');
    var footerTop = parseInt(footer.offset().top, 10);
    
    function addFloat () {
        var docScroll = parseInt($(document.body).scrollTop(), 10);
        var docHeight = parseInt($(document.body).height(), 10);
        var floating = docScroll + docHeight > footerTop;
        footer[floating ? 'removeClass' : 'addClass']('float');
    }
    
    function addScroll () {
        addFloat();
        if (footerTop < parseInt($(window).height(), 10)) return;
        $(document.body).scroll(addFloat);
    }
    
    $(window).resize(addScroll);
    addScroll(); 
} ());