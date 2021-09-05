/*User dropdown links for wikis and subpages*/
/**Guestbook**/
 
if (mw.config.get ('wgCityId') == '177')
$('<a>', {
    text: 'Guestbook',
    href: mw.util.getUrl('User:' + mw.config.get('wgUserName') + '/Guestbook'),
    appendTo: $('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
}).wrap('<li></li>');
 
/***Matrix***/
 
if (mw.config.get ('wgCityId') == '177')
$('<a>', {
    text: 'Matrix',
    href: mw.util.getUrl('User:' + mw.config.get('wgUserName') + '/matrix'),
    appendTo: $('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
}).wrap('<li></li>');

/***Profile template***/

if (mw.config.get ('wgCityId') == '177')
$('<a>', {
	text:'Profile Template',
	href: mw.util.getUrl ('Template:User:' + mw.config.get('wgUserName')),
	appendTo: $('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
}).wrap('<li></li>');

/***Signature***/
if (mw.config.get ('wgCityId') == '177')
$('<a>', {
        text:'Signature',
        href: mw.util.getUrl ('User:' + mw.config.get('wgUserName') + '/Signature'),
        appendTo: $('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
}).wrap('<li></li>');

/**Discussions Activity**/
mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'Discussions Activity',
        href: mw.util.getUrl('Special:UserProfileActivity/' + mw.config.get('wgUserName')),
        appendTo: $('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});
 
/**Links to other wikis**/
 
/***ViacomCBS Wiki***/
mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'ViacomCBS Wiki',
        href: mw.util.getUrl('w:c:viacomcbs:User:Paramount1106'),
        appendTo: $('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***CBS Wiki***/
mw.loader.using('mediawiki.util').then (function(){
    var settings = {
        text:'CBS',
        href:mw.util.getUrl('w:c:cbs:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***Paramount Wiki***/

mw.loader.using('mediawiki.util').then (function(){
    var settings = {
        text: 'PAR',
        href: mw.util.getUrl('w:c:paramount:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***The CW Wiki***/

mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'TCW',
        href:mw.util.getUrl('w:c:thecw:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***ABC Wiki***/

mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'ABC',
        href:mw.util.getUrl('w:c:abc:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***CN Wiki***/

mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'CNW',
        href:mw.util.getUrl('w:c:cartoonnetwork:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***Dunderpedia***/

mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'DNP',
        href:mw.util.getUrl('w:c:theoffice:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***20th Century Fox, 20th Century Studios Wiki***/

mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'20CS',
        href:mw.util.getUrl('w:c:20thcenturyfox:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});

/***Kids WB Wiki***/
mw.loader.using('mediawiki.util').then(function(){
    var settings = {
        text:'KWB',
        href:mw.util.getUrl('w:c:kidswb:User:Paramount1106'),
        appendTo:$('body > div.global-navigation > div.global-navigation__bottom > div.wds-dropdown.wds-open-to-right.is-attached-to-bottom > div.wds-dropdown__content > ul')
    };
    $('<a>', settings).wrap('<li></li>');
});