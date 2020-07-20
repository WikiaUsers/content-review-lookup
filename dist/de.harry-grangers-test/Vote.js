function pageExists(title,iftrue,iffalse) {
    $.getJSON('/api.php?action=query&titles=' + title + '&indexpageids&format=json', function(data) {
        if(data.query.pageids.length == 1 && data.query.pageids[0] != '-1') {
            iftrue();
        }
        else {
            if(typeof iffalse == 'function') {
                iffalse();
            }
        }
    });
}
 
pageExists(wgPageName +  '/votes',function() {
    $.getJSON('/api.php?action=query&titles=' + wgPageName +  '/votes&indexpageids&prop=revisions&rvprop=content&v=' + Math.round(Math.random() * 10) +'&format=json', function(data) {
        var votes = topl.parse(data.query.pages[data.query.pageids[0]].revisions[0]['*']);
        console.log(votes);
 
        function showVoters() {
            $.showCustomModal('Upvotes','<ul class="votes-upvoters-list"></ul>',{
                id: 'votes-upvoters-modal',
                callback: function() {
                    $.getJSON('/api.php?action=query&list=users&ususers=' + votes.upvotes.join('|') + '&format=json', function(data) {
                        if(data.query.users.length) {
                            upvoters = data.query.users;
                            for(var i in upvoters) {
                                var user = upvoters[i]; console.log(user);
                                $.ajax({
                                    url: 'https://services.wikia.com/user-attribute/user/' + user.userid + '/attr/avatar',
                                    type: 'GET',
                                    xhrFields: {withCredentials:true},
                                    success: function(data) { console.log(user);
                                        $('<li />').append(
                                            $('<img />').attr('src',data.value).addClass('wds-avatar').css({
                                                'vertical-align': 'middle',
                                                'margin-right': '5px'
                                            }),
                                            user.name
                                        ).appendTo($('.votes-upvoters-list'));
                                    }
                                });
                            }
                        }
                    });
                },
                buttons: [{
                    message: 'OK',
                    handler: function() { $('#votes-upvoters-modal').closeModal(); },
                    defaultButton:  false,
                    id: 'votes-upvoters-close'
                }]
            });
        }
 
        function vote(type) {
            return type;
        }
 
        $('.page-header__contribution').prepend(
            $('<div />').addClass('voting-controls').append(
                $('<a />').addClass('votes').attr('data-votes',votes.upvotes.length).append(
                    $('<span />').addClass('number').text(votes.upvotes.length),
                    ' Zustimmungen'
                ).css({
                    'cursor': 'pointer',
                    'font-size': '12px',
                    'text-decoration': 'none',
                    'color': '#009bbe',
                    'margin-right': '5px'
                }).click(showVoters),
                $('<a />').addClass('vote').attr('data-origin-title','').append(
                    $('<img />').attr({
                        src: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D',
                        height: 19,
                        width: 19
                    }).css({
                        'background-image': 'url(https://images.wikia.nocookie.net/__cb1497360666/common/extensions/wikia/Wall/images/kudo_20x20.png)',
                        'cursor': 'pointer',
                        'opacity': '.2'
                    })
                ).css({
                    'cursor': 'pointer',
                    'font-size': '12px',
                    'text-decoration': 'none'
                }).click(vote.bind(this,1))
            )
        );
    });
});