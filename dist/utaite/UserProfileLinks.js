$(function($) {
    var username = mw.config.get('wgUserName');
    var api = new mw.Api();
    
	function parseAndInsert($element, wikiText) {
        api.parse(wikiText).done(function(html) {
            const sanitizedHtml = html
                .replace(/<div class="mw-parser-output">/g, '')
                .replace(/<\/div>/g, '')
                .replace(/<\/?p>/g, '')
                .trim();
            $element.html(sanitizedHtml);
        });
    }
    
    function checkAndInsertLinks() {
        if (!username) {
            $('.username-plain').text('anonymous user');
            $('.username-profile-links').text('Please log in to see your profile links');
            return;
        }

        $('.username-plain').text(username);
        
        api.get({
            action: 'query',
            titles: [
                'User:' + username,
                'User blog:' + username,
                'Message Wall:' + username
            ],
            redirects: true
        }).done(function(data) {
            var pages = data.query.pages;
            var exists = {};
            
            Object.keys(pages).forEach(function(pageId) {
                exists[pages[pageId].title] = !pages[pageId].missing;
            });
            
            $('.username-wikilink').each(function() {
                parseAndInsert($(this), '[[User:' + username + '|' + username + ']]');
            });
            
            if (exists['Message Wall:' + username]) {
                $('.username-wall').each(function() {
                    parseAndInsert($(this), '[[Message Wall:' + username + '|Message Wall]]');
                });
                $('.username-wall-full').each(function() {
                    parseAndInsert($(this), '[[Message Wall:' + username + '|' + username + '\'s Message Wall]]');
                });
            } else {
                $('.username-wall, .username-wall-full').hide();
            }
            
            if (exists['User blog:' + username]) {
                $('.username-blog').each(function() {
                    parseAndInsert($(this), '[[User blog:' + username + '|Blog]]');
                });
                $('.username-blog-full').each(function() {
                    parseAndInsert($(this), '[[User blog:' + username + '|' + username + '\'s Blog]]');
                });
            } else {
                $('.username-blog, .username-blog-full').hide();
            }
            
            $('.username-contribs').each(function() {
                parseAndInsert($(this), '[[Special:Contributions/' + username + '|Contributions]]');
            });
            $('.username-contribs-full').each(function() {
                parseAndInsert($(this), '[[Special:Contributions/' + username + '|' + username + '\'s contributions]]');
            });
            
            $('.username-activity').each(function() {
                parseAndInsert($(this), '[[Special:UserProfileActivity/' + username + '|Activity]]');
            });
            $('.username-activity-full').each(function() {
                parseAndInsert($(this), '[[Special:UserProfileActivity/' + username + '|' + username + '\'s activity]]');
            });
            
            $('.username-profile-links').each(function() {
                var links = [];
                links.push('[[User:' + username + '|Profile]]');
                
                if (exists['Message Wall:' + username]) {
                    links.push('[[Message Wall:' + username + '|Wall]]');
                }
                
                if (exists['User blog:' + username]) {
                    links.push('[[User blog:' + username + '|Blog]]');
                }
                
                links.push('[[Special:Contributions/' + username + '|Contributions]]');
                
                links.push('[[Special:UserProfileActivity/' + username + '|Activity]]');
                
                parseAndInsert($(this), links.join(' • '));
            });
        });
    }
    
    checkAndInsertLinks();
});