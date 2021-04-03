/*
if($.inArray('sysop', mw.config.get('wgUserGroups')) != -1) {
    function getUserDropdownLinks(callback) {
        $.get('/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=MediaWiki:Custom-User-Dropdown&format=json&v=1.1').done(callback);
        $('#WikiaArticle').append(mw.message( 'Custom-User-Dropdown', 5 ).text());
    }

    getUserDropdownLinks(function(data) {
        var liste = $('<ul />');
        var content = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*'];
        var links = content.split('\n');
        
        for(i = 0; i < links.length; i++) {
            //here follows code for js-links...
            links[i] = links[i].replace(
                /\n?\*\s?{{JS[|](.+)}}\|(.+)/,
                '<li><a href="#" alt="$1" title="$2"><span class="$1">$2</span></a></li>'
            );
            links[i] = links[i].replace(
                /\n?\*\s?(.+)[|](.+)\n?/g,
                '<li><a href="/wiki/$1" alt="$2" title="$2">$2</a></li>'
            );
            links[i] = links[i].replace(
                /\n?\*\s?(http:\/\/(.+))[ ](.+)\n?/,
                '<li><a href="$1" alt="$3" title="$3">$3</a></li>'
            );
        }
        
        //Edit Button
        $('.Wall.Thread ul.comments ul.replies li.SpeechBubble.message').each(function(key, val) {
            /* Variablen *//*
            var answer = $(val).find('.speech-bubble-message .MiniEditorWrapper');
            var user = answer.find('.edited-by a').text();
            var msgContent = answer.find('.msg-body').html();
            var buttons = answer.find('.msg-toolbar .buttonswrapper .buttons');
            console.log(key, user);
            
            /* Button erzeugen *//*
            var adminButton = $('<nav />').addClass('wikia-menu-button secondary combined edit-user').text('Benutzer').append(
                $('<span />').addClass('drop').append(
                    $('<img />').addClass('chevron').attr('src','data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D')
                ),
                $('<ul />').addClass('WikiaMenuElement').css('min-width','51px')
            ).click(function() {
                $(this).addClass('active');
            }).on('keyup keypress blur mouseleave', function() {
                $(this).removeClass('active');  
            }).appendTo(buttons);
            
            var currentLinks = [];
            for(var n = 0; n < links.length; n++) {
                currentLinks[n] = links[n].replace(/{{PAGENAME}}/g, user);
                adminButton.find('ul.WikiaMenuElement').append(currentLinks[n]);
            }
        });
    });
}
*/