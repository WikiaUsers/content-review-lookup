/**Code and comments here supplied by Paramount1106, Friendly Mountain12, Caburum and Joritochip**/
/**Script created by Friendly Mountain12 (as Paramount1106)**/
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

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Dorui.js'
});

mw.hook('doru.ui').add(function(ui) {
$('.global-navigation__bottom > .wds-dropdown .wds-dropdown__content').addClass('wds-is-not-scrollable');
	document.querySelector('.global-navigation__bottom > .wds-dropdown .wds-list').appendChild(
	   ui.li({
	    class: 'wds-dropdown-level-nested',
	    children: [
	        ui.a({
	            class: 'wds-dropdown-level-nested__toggle',
	            href: '',
	            children: [
	                ui.span({
	                    text: 'My Wikis'
	                }),
	                ui.svg({
	                    class: 'wds-icon wds-icon-tiny wds-dropdown-chevron',
	                    'data-id': 'wds-icons-menu-control-tiny',
	                    height: '12',
	                    width: '12',
	                    viewBox: '0 0 12 12',
	                    xmlns: 'http://www.w3.org/2000/svg',
	                    child: ui.use({
	                        'xlink:href': '#wds-icons-menu-control-tiny'
	                    })
	                })
	            ]
	        }),
	        ui.div({
	            class: 'wds-dropdown-level-nested__content wds-is-not-scrollable',
	            style: {
	                bottom: '-8px',
	                top: 'unset'
	            },
	            child: ui.ul({
	                class: 'wds-list wds-is-linked',
	                children: [
	                    ui.li({
	                        child: ui.a({
	                            href: mw.util.getUrl('w:c:viacomcbs'),
	                            text: 'ViacomCBS Wiki'
	                        })
	                    }),
	                    ui.li({
	                        child: ui.a({
	                            href: mw.util.getUrl('w:c:theoffice'),
	                            text: 'Dunderpedia'
	                        })
	                    }),
	                    ui.li({
	                        child: ui.a({
	                            href: mw.util.getUrl('w:c:cbs'),
	                            text: 'CBS Wiki'
	                        })
	                    })
	                ]
	            })
	        })
	    ]
	})
	);
});