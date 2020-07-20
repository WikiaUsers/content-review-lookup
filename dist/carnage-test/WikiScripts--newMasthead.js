;(function(mw, $, config){
    var mw_config = mw.config.get([
        'wgUserName',
        'skin',
        'wgPageName',
        'wgServer',
        'wgUserGroups'
    ]);
    
    if (
        ['oasis', 'wikia'].indexOf(mw_config.skin) > -1
        && $('#UserProfileMasthead').length
    ){
        var $masthead_old = $('#WikiaUserPageHeader'),
            $masthead = $('<header class="UserPageHeader" id="UserPageHeader" />');
        
        $.nirvana.getJson('UserProfilePage', 'renderUserIdentityBox', {
            title: mw_config.wgPageName.replace('User:', '')
        }, $.proxy(function renderBox(data){
            var _user = data.user;
            $masthead.html(function createIdentityBox(){
                var $reloadURI = $('<input type="hidden" id="reloadURI" value="$reload_uri" />'.replace('$reload_uri', _user.userPage)),
                    $masthead_content = $('<section class="UserIdentityBox identity-box masthead" id="UserIdentityBox" itemscope itemtype="http://schema.org/Person" />'),
                    $tabs = $('<nav class="ProfileTabsContainer tabs-container" />'),
                    tabs = {
                        'Profile': wgServer + '/wiki/User:' + encodeURIComponent(_user.name),
                        'Talk Page': wgServer + '/wiki/User_talk:' + encodeURIComponent(_user.name),
                        'Blog': wgServer + '/wiki/User_blog:' + encodeURIComponent(_user.name),
                        'Contributions': wgServer + '/wiki/Special:Contributions/' + encodeURIComponent(_user.name),
                        'Following': wgServer + '/wiki/Special:Following',
                        'User Activity': wgServer + '/wiki/Special:UserActivity'
                    };
                $masthead_content.html(function(){
                    var $avatar = $('<figure class="avatar-container" id="avatar-container" />'),
                        $masthead_body = $('<aside class="masthead-content content" id="masthead-content" />');
                    $avatar.html(function(){
                        var $avatar_img = $('<img class="avatar" src="$avatar" />'.replace('$avatar', _user.avatar)),
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
                                $('<h2 class="masthead-heading _secondary" />').html('<span class="masthead-aka">aka</span> ' + _user.realName),
                                $('<div class="tag-container" />').html(_user.tags.map(function(group, index){
                                    return $('<span class="tag tag-' + index + '" />').text(group);
                                }))
                            ]),
                            $('<div class="masthead-info info" />').html([
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('I live in'),
                                    $('<span class="masthead-section-body" />').text(_user.location)
                                ]),
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('My occupation is'),
                                    $('<span class="masthead-section-body" />').text(_user.occupation || 'None')
                                ]),
                                $('<div class="masthead-section" />').html([
                                    $('<h3 class="masthead-section-head" />').text('I am'),
                                    $('<span class="masthead-section-body" />').text(_user.gender)
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
                                    $('<ul class="masthead-section-body wikis" />').html(_user.topWikis.map(function(wiki){
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
                        var db_name = wgServer.replace(/http:\/\/(.*)\.wikia\.com/g, '$1');
                        if (['c', 'community'].indexOf(db_name) > -1){
                            return $('<div class="tab-item _tab" />').html('<a href="' + tabs[name] + '" class="tab-link' + (window.location.href == tabs[name] ? ' selected' : '') + '">' + name + '</a>');
                        }
                    } else {
                        return $('<div class="tab-item _tab" />').html('<a href="' + tabs[name] + '" class="tab-link' + (window.location.href == tabs[name] ? ' selected' : '') + '">' + name + '</a>');
                    }
                }));
                return [$reloadURI, $masthead_content, $tabs];
            });
        }, this));
        $masthead_old.replaceWith($masthead);
    }
})(this.mediaWiki, this.jQuery, this.masthead || {});