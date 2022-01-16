/* Any JavaScript here will be loaded for all users on every page load. */

window.BackToTopModern = true;

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

// ---
// @name         User Avatar Finder
// @version      1.5
// @description  Finds and adds the avatar image of a user into a template
// @author       Tsukinyama
// ---
mw.loader.using(['jquery.client', 'mediawiki.util']).then(function() {
    'use strict';

    var cache = {};
    function addAvatar($content) {
        $content.find('.UserAvatarFetch:not(.loaded)').each(function() {
            var $this = $(this),
                username = $this.find('.avi-thisUsername').text(),
                avatar = cache[username],
                size = Number($this.find('.avi-thisSize').text()),
                link = $this.find('.avi-thisLink').text();
            if (!avatar) {
                return;
            }
            if (!isNaN(size)) {
                if (size > 150) {
                    size = 150;
                } else if (size < 16) {
                    size = 16;
                }
                avatar = avatar.replace(/\/thumbnail\/width\/\d+\/height\/\d+/, '/thumbnail/width/' + size + '/height/' + size);
            }

            var img = $('<img>', {
                src: avatar,
                alt: username,
                style: 'vertical-align: initial; border-radius: ' + size + '%; width: ' + size + 'px; height: ' + size + 'px; object-fit: cover;'
            });

            // https://stackoverflow.com/a/43467144
            function isValidHttpUrl(string) {
                var url;

                try {
                    url = new URL(string);
                } catch (_) {
                    return false;
                }

                return url.protocol === 'http:' || url.protocol === 'https:';
            }

            if (link) {
                var linkElement = $('<a>', {
                    href: isValidHttpUrl(link) ? link : mw.util.getUrl(link)
                }).append(img);

                $this.html(linkElement);
            } else {
                $this.html(img);
            }

            $this.addClass('loaded');
        });
    }

    function findAvatars($content) {
        if (!$content) {
            return;
        }

        var avatars = $content.find('.UserAvatarFetch:not(.loaded) .avi-thisUsername')
            .map(function(_, el) {
                return $(el).text();
            })
            .toArray()
            .filter(function(el) {
                return !cache[el];
            });
        if (avatars.length > 0) {
            $.getJSON(mw.config.get('wgScriptPath') + '/api/v1/User/Details', {
                ids: avatars.join(',')
            }, function(d) {
                d.items.forEach(function(el) {
                    cache[el.name] = el.avatar;
                });
                addAvatar($content);
            });
        } else {
            addAvatar($content);
        }
    }

    mw.hook('wikipage.content').add(function(content) {
        findAvatars(content);
    });
});