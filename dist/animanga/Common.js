importScriptURI('http://animanga.wikia.com/index.php?title=MediaWiki:Shared.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/* Remove Standard Createpage popup box */

CreatePage.redLinkClick = function() {
};

importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage( 'PurgeButton/code.js', 'dev' );


// BBS-style forums by Bobogoobo
if (mw.config.get('wgCanonicalNamespace') === 'Thread') {
 
    //No left margins
    $('ul.replies').css('margin-left', '0px');
    $('.speech-bubble-message').css('margin-left', '0px');
    $('ul.replies > li.message').css('margin-left', '0px');
 
    //Move avatars into post headers
    $('.speech-bubble-avatar:first img').attr({width:'30', height:'30'});
    $('.speech-bubble-avatar').each(function(index) {
        if (index === 0) {
            $(this).prependTo($(this).next().find('.edited-by')).css(
              'margin-right', '0.75em').parent().css('width', '75%').prev().css(
              'margin-top', '0.75em'); //I should do this less silly-ly
        } else if (! $(this).closest('li').hasClass('new-reply')) {
            $(this).prependTo($(this).next()).css('margin-right', '1em');
        }
    });
 
    //Colors and borders for posts
    $('.replies > li:nth-child(even)').css('background-color', 
      $('.speech-bubble-message:first').css('background-color'));
    $('.replies > li:nth-child(odd)').css({
        border: '1px solid #E5E5E5',
        margin: '0.75em 0'
    });
 
    //Borders around post content
    $('li.message > blockquote > div > .editarea').css({
        border: 'solid #CCC',
        'border-width': '1px 0px'
    });
 
    //Remove arrows
    mw.util.addCSS(
      '.replies > li:first-child:before, ' + 
      '.replies > li:first-child:after, ' + 
      'ul.comments .speech-bubble-message:after ' + 
      '{ border: 0px solid transparent !important; }'
    );
 
    //Reset stuff for reply box
    $('.speech-bubble-message:last').css('margin-left', '35px');
    $('.replies > li:last').css('border-width', '0px');
 
    //Remove "Remove" button for non-admins
    if (mw.config.get('wgUserGroups').indexOf('sysop') === -1) {
        $('.remove-message').parent().remove();
    }
}