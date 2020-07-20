importArticles({
    type: 'style',
    articles: [
        'u:carnage-test:MediaWiki:Slider.css',
        'u:carnage-test:MediaWiki:SkinSwitch.css',
        'u:carnage-test:MediaWiki:User-list.css'
    ]
});

(function(mw, $){
    if (mw.config.get('skin') == 'monobook'){
        var wallNotifications = $('#pt-wall-notifications');
        if (wallNotifications.length){
            var pattern = /\((.*?)\)/gi;
            if (pattern){
                wallNotifications.find('.count').text(wallNotifications.find('.count').text().replace(pattern, '$1'));
            }
        }
    }
})(mediaWiki, jQuery);

$(function(){
    var users = {};
    function createSection(list_type, users){
        users = (users) ? users : {};
        var userHTML;
        for (var user in users){
            var itemHTML = 
                '<li class="user-item user-list-item" data-name="' + user + '"> \
                    <a href="' + wgServer + '/index.php?title=User:' + encodeURI(user) + '"> \
                        <div class="avatar-container image-container"> \
                            <img src="' + ((users[user].avatar) ? users[user].avatar : '') + '" alt="Avatar" class="avatar" /> \
                        </div> \
                        <div class="user-name-container"> \
                            <span class="user-name">' + user + '</span> \
                            <span class="right-tag">' + users[user].right + '</span> \
                        </div> \
                    </a> \
                </li>';
            userHTML += itemHTML;
        }
        
        $('.user-list-section[data-right="' + list_type + '"] > ul').append(userHTML);
    }
    
    $('.user-list-container').append(
        $('<section />', {
            "data-right": "Bureaucrats",
            "class": "user-list-section",
            html: function(){
                var t = $(this).attr('data-right');
                return [$('<header />', {
                    "class": "user-list-header",
                    html: $('<h2 />', {
                        text: t
                    })
                }), $('<ul />')];
            },
        }), 
        $('<section />', {
            "data-right": "Administrators",
            "class": "user-list-section",
            html: function(){
                var t = $(this).attr('data-right');
                return [$('<header />', {
                    "class": "user-list-header",
                    html: $('<h2 />', {
                        text: t
                    })
                }), $('<ul />')];
            }
        }),
        $('<section />', {
            "data-right": "Chat Moderator",
            "class": "user-list-section",
            html: function(){
                var t = $(this).attr('data-right');
                return [$('<header />', {
                    "class": "user-list-header",
                    html: $('<h2 />', {
                        text: t
                    })
                }), $('<ul />')];
            }
        }), 
        $('<section />', {
            "data-right": "Rollbackers",
            "class": "user-list-section",
            html: function(){
                var t = $(this).attr('data-right');
                return [$('<header />', {
                    "class": "user-list-header",
                    html: $('<h2 />', {
                        text: t
                    })
                }), $('<ul />')];
            }
        })
    );
    
    createSection("Bureaucrats", {
        "SSgtGriffin": {
            right: "Founder",
            avatar: "https://vignette.wikia.nocookie.net/common/avatars/0/00/1861254.png/revision/latest/scale-to-width/150?cb=1320978274&format=jpg"
        },
        "Jesdisciple": {
            right: "Bureaucrat",
            avatar: "https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width/150?format=jpg"
        },
        "Ultimate Dark Carnage": {
            right: "Bureaucrat",
            avatar: "https://vignette.wikia.nocookie.net/common/avatars/b/b1/10696822.png/revision/latest/scale-to-width/30?cb=1399673866&format=jpg"
        }
    });
});

var dropdownItem = ["Arial", "Arial Black", "Calibri", "Century Gothic", "Franklin Gothic", "Impact", "Lucida Console", "Segoe Script", "Segoe UI", "Tahoma", "Times New Roman", "Trebuchet MS", "Script", "Verdana"];

var dropdownItems = dropdownItem.sort();

window.dropdown = '<select name="fontselector" id="fontselector" class="FontSelector">';

for (var e = 0; e < dropdownItems.length; e++){
    dropdown += '<option value="' + dropdownItems[e] + '">' + dropdownItems[e] + '</option>';
}

dropdown += '</select>';

$('.WikiaPageHeader .tally').before(dropdown);

$('#fontselector').css(
    {
        'appearance':'none',
        'border-radius':'10px',
        'border':'1px solid black',
        'box-shadow':'-1px -1px 8px ivory',
        'background':'whitesmoke',
        'color':'navy',
        'padding':'3px 6px'
    }
);

$('head').append('<style id="fontSelectStyle" type="text/css" media="all"></style>');

$('#fontselector').on('change', function(){
    $('#fontSelectStyle').html('.WikiaArticle { font-family: ' + $('#fontselector option:selected').text() + '; }');
});