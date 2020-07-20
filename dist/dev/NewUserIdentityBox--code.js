;(function(mw, $, config){
    // Importing required plugin(s)
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Colors/code.js'
        ]
    });
    // MediaWiki variables
    var mw_config = mw.config.get([
            'wgUserName',
            'skin',
            'wgPageName',
            'wgServer',
            'wgUserGroups'
        ]),
        // Masthead configurations
        masthead = $.extend({}, config, {
            staffLogo: 'https://images.wikia.nocookie.net/common/extensions/wikia/DesignSystem/bower_components/design-system/dist/svg/wds-company-logo-fandom.svg',
            theme_color: ''
        });
        
    mw.hook('dev.colors').add(function createStylesheet(){
        var style =
            '.UserPageHeader .UserIdentityBox {\
                background-color: $body;\
            }\
            .UserPageHeader .UserIdentityBox .masthead-content .masthead-header {\
                border-bottom: 2px solid $header;\
                color: $text;\
            }\
            .UserPageHeader .tabs-container {\
                background-color: $tabs;\
            }\
            .UserPageHeader .tabs-container ._tab > a {\
                color: $link; \
            } \
            .UserPageHeader .tabs-container ._tab:hover > a {\
                background-color: $tabshover;\
            } \
            .UserIdentityBox .masthead-header .tag-container .tag { \
                background-color: $menu; \
                color: $text; \
            }';
        window.dev.colors.css(style, {
            tabs: window.dev.colors.parse(window.dev.colors.wikia.header).lighten(15).hex(),
            tabshover: window.dev.colors.parse(window.dev.colors.wikia.header).lighten(-10).hex()
        });
    });
    
    function toLink(page){
        return mw.util.wikiGetlink(page);
    }
 
    if (
        ['oasis', 'wikia'].indexOf(mw_config.skin) > -1
        && $('#UserProfileMasthead').length
    ){
        var $masthead_old = $('#WikiaUserPagesHeader'),
            $masthead = $('<header class="UserPageHeader" id="UserPageHeader" />');
 
        $.nirvana.getJson('UserProfilePage', 'renderUserIdentityBox', {
            title: mw_config.wgPageName.replace('_', ' ')
        }).done($.proxy(function renderBox(data){
            var _user = data.user;
            $masthead.html(function createIdentityBox(){
                var $reloadURI = $('<input type="hidden" id="reloadURI" value="$reload_uri" />'.replace('$reload_uri', _user.userPage)),
                    $masthead_content = $('<section class="UserIdentityBox identity-box masthead" id="UserIdentityBox" itemscope itemtype="http://schema.org/Person" />'),
                    $tabs = $('<nav class="ProfileTabsContainer tabs-container" />'),
                    tabs = {
                        'Profile': mw_config.wgServer + toLink('User:' + _user.name),
                        'Talk Page': mw_config.wgServer + toLink('User talk:' + _user.name),
                        'Blog': mw_config.wgServer + toLink('User blog:' + _user.name),
                        'Contributions': mw_config.wgServer + toLink('Special:Contributions/' + _user.name),
                        'Following': mw_config.wgServer + toLink('Special:Following'),
                        'User Activity': mw_config.wgServer + toLink('Special:UserActivity')
                    };
                $masthead_content.html(function(){
                    var $avatar = $('<figure class="avatar-container" id="avatar-container" />'),
                        $masthead_body = $('<aside class="masthead-content content" id="masthead-content" />');
                    $avatar.html(function(){
                        var $avatar_img = $('<img class="avatar" src="$avatar" />'.replace('$avatar', _user.avatar.replace(/\/scale-to-width-down\/(\d*)/, '/scale-to-width-down/' + 120))),
                            $button = $('<figcaption class="avatar-button" />')
                                .html('<a href="#upload-avatar">Edit Avatar</a>');
                        return [$avatar_img, $button];
                    });
                    $masthead_body.html(function(){
                        var row1 = $('<section class="row one" id="row1" />'),
                            row2 = $('<section class="row two" id="row2" />');
                        row1.html([
                            $('<header class="masthead-header" id="masthead-header" />').html([
                                $('<h1 class="masthead-heading _main" />').text(_user.name),
                                $('<h2 class="masthead-heading _secondary" />').html((_user.realName !== '') ? '<span class="masthead-aka">aka</span> ' + _user.realName : ''),
                                $('<div class="tag-container" />').html(_user.tags.map(function(group, index){
                                    return $('<span class="tag tag-' + index + '" />').html(function(){
                                        var tag_html = '';
                                        if (group == 'Staff'){
                                            tag_html = group + ' ';
                                            tag_html = tag_html.concat('<img class="staff-logo" src="' + masthead.staffLogo + '" />');
                                        } else {
                                            tag_html = group;
                                        }
                                        return tag_html;
                                    });
                                }))
                            ]),
                            $('<div class="masthead-info info" />').html([
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('I live in'),
                                    $('<span class="masthead-section-body" />').html(_user.location)
                                ]),
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('My occupation is'),
                                    $('<span class="masthead-section-body" />').html(_user.occupation || 'None')
                                ]),
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('I am'),
                                    $('<span class="masthead-section-body" />').html(_user.gender)
                                ])
                            ]),
                            $('<div class="edit-tally" />').html([
                                $('<div class="tally-main" />').html([
                                    $('<strong class="edit-counter" />').text(_user.edits),
                                    $('<span class="edits-text" />').text('edits')
                                ]),
                                $('<div class="tally-join" />').html([
                                    $('<strong class="tally-head" />').text('Joined:'),
                                    $('<span class="tally-body" />').text(_user.registration)
                                ])
                            ])
                        ]);
                        row2.html([
                            $('<div class="masthead-info info" />').html([
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('Favorite wikis'),
                                    $('<ul class="masthead-section-body wikis" />').html(_user.topWikis.filter(function(wiki){
                                        return wiki.wikiName !== false;
                                    }).map(function(wiki){
                                        var $item = $('<li class="wiki item" />').html('<a href="' + wiki.wikiUrl + '" class="wiki-link">' + wiki.wikiName + '</a>');
                                        return $item;
                                    }))
                                ])/*,
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('My occupation is'),
                                    $('<span class="masthead-section-body" />').text(_user.occupation || 'None')
                                ])*/
                            ])
                        ]);
                        return [row1, row2];
                    });
                    return [$avatar, $masthead_body];
                });
 
                $tabs.html(Object.keys(tabs).map(function(name, index){
                    if ('User Activity' == name){
                        var db_name = wgServer.replace(/^https?:\/\/(.+)\.wikia\.com/g, '$1');
                        if (
                            ['c', 'community'].indexOf(db_name) > -1
                            && wgPageName.indexOf(wgUserName) > -1
                        ){
                            return $('<div class="tab-item _tab" />').html('<a href="' + tabs[name] + '" class="tab-link' + (window.location.href == tabs[name] ? ' selected' : '') + '">' + name + '</a>');
                        }
                    } else {
                        return $('<div class="tab-item _tab" />').html('<a href="' + tabs[name] + '" class="tab-link' + (window.location.href == tabs[name] ? ' selected' : '') + '">' + name + '</a>');
                    }
                }));
                return [$reloadURI, $masthead_content, $tabs];
            });
        }, this));
        if (window.dev.colors) createStylesheet();
        $masthead_old.replaceWith($masthead);
    }
})(this.mediaWiki, this.jQuery, this.masthead || {});