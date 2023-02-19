/* Any JavaScript here will be loaded for all users on every page load. */

// Disable creation of non-talk pages by anonymous IP editors and link to registration (also disabled by abuse filter but this provides warning before attempting edit)
var wgPageName = mw.config.get( 'wgPageName' );
var wgUserName = mw.config.get( 'wgUserName' );

var isTalk = false, isAnon = false;
if (wgPageName.indexOf('talk:') > -1 || wgPageName.indexOf('Talk:') > -1) isTalk = true;
if (wgUserName === null) isAnon = true;

if (isAnon == true){
    $('a.new').each(function(){
        var href = $(this).attr('href');
        $(this).attr('href', href.replace(/&action=edit/g, '') );
    });
}

if (isAnon == true && isTalk == false) {
    var anonWarnText = 'Page creation by anonymous editors is currently disabled. <br> To create this page, please <a href="https://superterrariaworld.gamepedia.com/Special:CreateAccount">register an account</a> first.';
    $('body').append('<div class="anonWarnOverlay" style="display:none; background-color: #000; opacity: 0.4; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 500;"></div>');					
    $('body').prepend('<div class="anonWarnBox" style="display:none; text-align:center; font-weight: bold; box-shadow: 7px 7px 5px #000; font-size: 0.9em; line-height: 1.5em; z-index: 501; opacity: 1; position: fixed; width: 50%; left: 25%; top: 30%; background: #F7F7F7; border: #222 ridge 1px; padding: 20px;">' + anonWarnText + '</div>');

    $('#ca-edit a:contains(Create), #ca-ve-edit a:contains(Create), a.external.text:contains(edit this page)').attr('href', '#').click(function(){
        $('.anonWarnBox').show();
        $('.anonWarnOverlay').show();
    });
    
    $('.anonWarnOverlay').click(function(){
        $('.anonWarnBox').hide();
        $(this).hide();
    });
}