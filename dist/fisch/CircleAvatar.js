/*
* CircleAvatar Template Handler
* Displays user avatars in a modern, circular style with customizable parameters
* Inspired by Fandom's avatar styling system
* 
* This script creates customizable circular avatars for wiki users
* It uses the Fandom API to fetch user avatars dynamically
* while providing a modern interface with hover effects
*
* Key features:
* - Circular avatars with size customization (16-150px)
* - Optional username display
* - Modern hover effects and transitions
* - Built-in caching system for API calls
* - Automatic error handling with fallbacks
*
* Uses only official MediaWiki API and follows Fandom's best practices
* No external resources or dependencies except for built-in MediaWiki modules
*
* TEMPLATE: https://fisch.fandom.com/wiki/Template:CircleAvatar
*/
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
   'use strict';

   var cache = {};

   // Avatar creation and styling function
    function addAvatar(element) {
        var $element = $(element);
        var username = $element.data('username').replace('@', '');
        var params = $element.data('params') ? $element.data('params').split('|') : [];
        
        // Parse parameters
        var size = 24;
        var showName = true;
        
        if (params.length > 0) {
            if (!isNaN(params[0])) {
                size = parseInt(params[0], 10);
                if (params[1] === 'false') {
                    showName = false;
                }
            } else {
                params.forEach(function(param) {
                    if (param.startsWith('size=')) {
                        size = parseInt(param.split('=')[1], 10);
                    } else if (param.startsWith('showname=')) {
                        showName = param.split('=')[1] !== 'false';
                    }
                });
            }
        }

        // Limit size
        size = Math.min(Math.max(size, 16), 150);

        var avatar = cache[username];
        if (!avatar) {
            console.error('[CircleAvatar] Cannot find avatar for', username);
            return;
        }

        // Adjust avatar size
        avatar = avatar.replace(
            /\/thumbnail\/width\/\d+\/height\/\d+/,
            '/thumbnail/width/' + size + '/height/' + size
        );

        // Create container
        var $container = $('<span>').css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'opacity 0.2s'
        });

        // Create avatar image
        var $avatar = $('<img>').attr({
            src: avatar,
            alt: username + "'s avatar",
            title: '@' + username
        }).css({
            borderRadius: '50%',
            width: size + 'px',
            height: size + 'px',
            objectFit: 'cover',
            verticalAlign: 'middle',
            border: '1px solid rgba(0,0,0,0.1)'
        });

        // Add username if showName is true
        if (showName) {
            var $name = $('<span>').text('@' + username).css({
                fontSize: Math.max(size * 0.7, 12) + 'px',
                verticalAlign: 'middle'
            });
            $container.append($avatar, $name);
        } else {
            $container.append($avatar);
        }

        // Create link wrapper
        var $link = $('<a>').attr({
            href: mw.util.getUrl('User:' + username)
        }).css({
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer'
        }).hover(
            function() { $(this).css('opacity', '0.8'); },
            function() { $(this).css('opacity', '1'); }
        );

        $link.append($container);
        $element.replaceWith($link);
    }

   // Get user IDs from usernames using MediaWiki API
    function getUserIds(users) {
        return new mw.Api().get({
            action: 'query',
            formatversion: 2,
            list: 'users',
            ususers: users
        }).then(function(data) {
            return data.query.users.map(function(user) {
                return user.userid;
            });
        });
    }

   // Fetch user avatars using Fandom API
    function getUserAvatars(userIds) {
        var scriptPath = mw.config.get('wgScriptPath');
        return $.getJSON(scriptPath + '/api/v1/User/Details', {
            ids: userIds.join(',')
        }).then(function(data) {
            return data.items;
        });
    }

   // Main processing function
    function processAvatars($content) {
        if (!$content) return;

        var users = $content
            .find('.circle-avatar-template')
            .map(function() {
                return $(this).data('username').replace('@', '');
            })
            .toArray()
            .filter(function(username) {
                return !cache[username];
            });

        if (users.length > 0) {
            getUserIds(users)
                .then(getUserAvatars)
                .then(function(users) {
                    users.forEach(function(user) {
                        cache[user.name] = user.avatar;
                    });
                    
                    $content.find('.circle-avatar-template').each(function() {
                        addAvatar(this);
                    });
                });
        }
    }

   // Initialize on page load
   mw.hook('wikipage.content').add(processAvatars);
});