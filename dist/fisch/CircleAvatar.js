/*
* CircleAvatar Template Handler
* Displays user avatars in a modern, circular style with customizable parameters
* Optimized for mobile devices
*/
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
    'use strict';
 
    var cache = {};
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 
    // Avatar creation and styling function
     function addAvatar(element) {
         var $element = $(element);
         var username = $element.data('username').replace('@', '');
         var params = $element.data('params') ? $element.data('params').split('|') : [];
         
         // Parse parameters
         var size = isMobile ? 32 : 24;
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
 
         // Apply mobile adjustments
         if (isMobile) {
             size = Math.max(size, 28);
         }
 
         // Limit size
         size = Math.min(Math.max(size, 16), 150);
 
         var avatar = cache[username];
         if (!avatar) {
             avatar = 'https://static.wikia.nocookie.net/central/images/0/0d/Default_avatar.png';
         }
 
         // Adjust avatar size
         if (avatar.includes('/thumbnail/width/')) {
             avatar = avatar.replace(
                 /\/thumbnail\/width\/\d+\/height\/\d+/,
                 '/thumbnail/width/' + size + '/height/' + size
             );
         }
 
         // Create container
         var $container = $('<span>').css({
             display: 'inline-flex',
             alignItems: 'center',
             gap: '4px',
             transition: 'opacity 0.2s',
             flexWrap: 'nowrap'
         });
 
         // Create avatar image
         var $avatar = $('<img>').attr({
             src: avatar,
             alt: username + "'s avatar",
             title: '@' + username,
             loading: 'lazy'
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
                 verticalAlign: 'middle',
                 whiteSpace: 'nowrap'
             });
             $container.append($avatar, $name);
         } else {
             $container.append($avatar);
         }
 
         // Create link wrapper
         var $link = $('<a>').attr({
             href: mw.util.getUrl('User:' + username),
             'data-username': username
         }).css({
             textDecoration: 'none',
             color: 'inherit',
             cursor: 'pointer'
         }).hover(
             function() { $(this).css('opacity', '0.8'); },
             function() { $(this).css('opacity', '1'); }
         );
 
         $link.addClass('circle-avatar-link');
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
         }).catch(function() {
             return [];
         });
     }
 
    // Fetch user avatars using Fandom API
     function getUserAvatars(userIds) {
         if (!userIds || userIds.length === 0) {
             return $.Deferred().resolve([]).promise();
         }
         
         var scriptPath = mw.config.get('wgScriptPath');
         return $.getJSON(scriptPath + '/api/v1/User/Details', {
             ids: userIds.join(',')
         }).then(function(data) {
             return data.items || [];
         }).catch(function() {
             return [];
         });
     }
 
   // Main processing function
    function processAvatars($content) {
        if (!$content || $content.length === 0) {
            console.warn('CircleAvatar: processAvatars called with no content');
            return;
        }

        var avatarElements = $content.find('.circle-avatar-template');
        console.log('CircleAvatar: processAvatars found', avatarElements.length, 'templates to process');
        
        if (avatarElements.length === 0) {
            console.warn('CircleAvatar: No avatar templates found in content');
            return;
        }
         
         // Extract unique usernames that aren't in cache
         var usersToFetch = [];
         avatarElements.each(function() {
             var username = $(this).data('username').replace('@', '');
             if (!cache[username] && usersToFetch.indexOf(username) === -1) {
                 usersToFetch.push(username);
             }
         });
 
         // If all avatars are cached, render them immediately
         if (usersToFetch.length === 0) {
             avatarElements.each(function() {
                 addAvatar(this);
             });
             return;
         }
 
         // Fetch only needed avatars
         getUserIds(usersToFetch)
             .then(function(ids) {
                 if (ids.length === 0) {
                     usersToFetch.forEach(function(username) {
                         cache[username] = 'https://static.wikia.nocookie.net/central/images/0/0d/Default_avatar.png';
                     });
                     return [];
                 }
                 return getUserAvatars(ids);
             })
             .then(function(users) {
                 users.forEach(function(user) {
                     if (user && user.name) {
                         cache[user.name] = user.avatar;
                     }
                 });
                 
                 // Process any remaining users with default avatar
                 usersToFetch.forEach(function(username) {
                     if (!cache[username]) {
                         cache[username] = 'https://static.wikia.nocookie.net/central/images/0/0d/Default_avatar.png';
                     }
                 });
                 
                 // Now render all avatars
                 avatarElements.each(function() {
                     addAvatar(this);
                 });
             });
     }
 
    // Add CSS for hover effects
    var styleTag = document.createElement('style');
    styleTag.textContent = '.circle-avatar-link:hover { opacity: 0.8; }';
    document.head.appendChild(styleTag);
 
    // Mobile optimization
    if (isMobile) {
        var mobileStyles = document.createElement('style');
        mobileStyles.textContent = '.circle-avatar-link { padding: 2px; }\n' +
            '.circle-avatar-link img { min-width: 28px; min-height: 28px; }';
        document.head.appendChild(mobileStyles);
    }
 
   // Initialize on page load - multiple hooks for better mobile support
   mw.hook('wikipage.content').add(processAvatars);
   
   // Additional initialization for mobile devices (Minerva skin & fandommobile)
   var skin = mw.config.get('skin');
   var isFandomMobile = document.body.classList.contains('skin-fandommobile');
   
   console.log('CircleAvatar: Skin:', skin, 'isMobile:', isMobile, 'isFandomMobile:', isFandomMobile);
   
   if (skin === 'minerva' || isMobile || isFandomMobile) {
       console.log('CircleAvatar: Initializing for mobile/Minerva/FandomMobile skin');
       
       // Direct initialization after DOM ready
       $(document).ready(function() {
           setTimeout(function() {
               var $templates = $('.circle-avatar-template');
               console.log('CircleAvatar: First attempt - found', $templates.length, 'templates');
               if ($templates.length > 0) {
                   console.log('CircleAvatar: Processing avatars on mobile');
                   processAvatars($('body'));
               } else {
                   console.warn('CircleAvatar: No templates found on first attempt!');
               }
           }, 100);
           
           // Дополнительные попытки для fandommobile
           if (isFandomMobile) {
               setTimeout(function() {
                   var $templates = $('.circle-avatar-template');
                   console.log('CircleAvatar: Second attempt (500ms) - found', $templates.length, 'templates');
                   if ($templates.length > 0) {
                       processAvatars($('body'));
                       $(document).trigger('circleavatar-processed');
                   }
               }, 500);
               
               setTimeout(function() {
                   var $templates = $('.circle-avatar-template');
                   console.log('CircleAvatar: Third attempt (1000ms) - found', $templates.length, 'templates');
                   if ($templates.length > 0) {
                       processAvatars($('body'));
                       $(document).trigger('circleavatar-processed');
                   }
               }, 1000);
               
               setTimeout(function() {
                   var $templates = $('.circle-avatar-template');
                   console.log('CircleAvatar: Fourth attempt (2000ms) - found', $templates.length, 'templates');
                   if ($templates.length > 0) {
                       processAvatars($('body'));
                       $(document).trigger('circleavatar-processed');
                   } else {
                       console.error('CircleAvatar: Still no templates after 2 seconds! Checking DOM...');
                       console.log('CircleAvatar: Body HTML preview:', $('body').html().substring(0, 500));
                   }
               }, 2000);
           }
       });
       
       // Also try when content is complete
       mw.hook('wikipage.complete').add(function() {
           processAvatars($('body'));
       });
       
       // Fallback: MutationObserver to catch dynamically added content
       if (typeof MutationObserver !== 'undefined') {
           var processTimeout;
           var observer = new MutationObserver(function(mutations) {
               var shouldProcess = false;
               mutations.forEach(function(mutation) {
                   if (mutation.addedNodes.length) {
                       var $addedNodes = $(mutation.addedNodes);
                       var $templates = $addedNodes.find('.circle-avatar-template').addBack('.circle-avatar-template');
                       var $teamContainer = $addedNodes.find('.meet-our-team-container').addBack('.meet-our-team-container');
                       
                       if ($templates.length > 0 || $teamContainer.length > 0) {
                           shouldProcess = true;
                       }
                   }
               });
               
               if (shouldProcess) {
                   clearTimeout(processTimeout);
                   processTimeout = setTimeout(function() {
                       console.log('CircleAvatar: MutationObserver detected changes, processing...');
                       processAvatars($('body'));
                       
                       if (isFandomMobile) {
                           setTimeout(function() {
                               processAvatars($('body'));
                               $(document).trigger('circleavatar-processed');
                           }, 200);
                       }
                   }, 100);
               }
           });
           
           observer.observe(document.body, {
               childList: true,
               subtree: true
           });
       }
       
       // Агрессивная обработка для FandomMobile
       if (isFandomMobile) {
           var attempts = 0;
           var maxAttempts = 10; // 5 секунд
           
           var intervalId = setInterval(function() {
               attempts++;
               var $templates = $('.circle-avatar-template');
               
               if ($templates.length > 0) {
                   console.log('CircleAvatar: Interval check (attempt ' + attempts + ') found ' + $templates.length + ' templates');
                   processAvatars($('body'));
                   $(document).trigger('circleavatar-processed');
               }
               
               if (attempts >= maxAttempts) {
                   clearInterval(intervalId);
                   console.log('CircleAvatar: Interval check completed after ' + attempts + ' attempts');
               }
           }, 500);
       }
   }
   
   // Desktop fallback
   $(document).ready(function() {
       setTimeout(function() {
           var unprocessed = $('.circle-avatar-template');
           if (unprocessed.length > 0) {
               console.log('CircleAvatar: Found unprocessed templates, processing now');
               processAvatars($('body'));
           }
       }, 500);
   });
});