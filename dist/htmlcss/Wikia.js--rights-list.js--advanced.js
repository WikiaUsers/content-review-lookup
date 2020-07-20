var bcratList = [],
    adminList = [],
    chatmodList = [],
    rollbackerList = [],
    otherList = [],
    b_obj = {},
    a_obj = {},
    c_obj = {},
    r_obj = {};
    
$(function(){
    function createSection(list_type, users){
        var userHTML = '';
        for (var user in users){
            var itemHTML = 
                '<li class="user-item user-list-item" data-name="' + user + '"> \
                    <a href="' + wgServer + '/wiki/User:' + encodeURIComponent(user) + '"> \
                        <div class="avatar-container image-container"> \
                            <img src="' + ((users[user].avatar) ? users[user].avatar : '') + '" alt="Avatar" class="avatar" /> \
                        </div> \
                        <div class="user-name-container"> \
                            <span class="user-name">' + user + '</span> \
                            <span class="right-tag">' + users[user].right + '</span> \
                            <span class="activity-tag tag-' + users[user].activity.toLowerCase() + '">' + users[user].activity + '</span> \
                        </div> \
                    </a> \
                    <div class="user-info">\
                        <a href="javascript:void(0);" class="show-info-button">Show more</a> \
                        <div class="user-info-container"> \
                            <header class="user-info-header"> \
                                <h4>Since: </h4> \
                                <div class="since">' + ((users[user].since) ? users[user].since : 'Unknown') + '</div> \
                                <h4>Contact: </h4> \
                                <div class="contact">' + ((users[user].contact) ? users[user].contact : 'None')+ '</div> \
                            </header> \
                            <section> ' + ((users[user].description) ? users[user].description : 'No description') + ' </section> \
                        </div> \
                </li>';
            userHTML += itemHTML;
        }
 
        $('.user-list-section[data-right="' + list_type + '"] > ul').append(userHTML);
    }
    
    function addUserListSection(list_type){
        if (!$('section[data-right=' + list_type + '"]').length){
            $('.user-list-container').append(
                $('<section />', {
                    "data-right": list_type,
                    "class": "user-list-section",
                    html: function(){
                        var t = $(this).attr('data-right');
                        return [
                            $('<header />', {
                                "class": "user-list-header",
                                html: $('<h3 />', {
                                    text: t
                                })
                            })
                        ];
                    }
                })
            );
        }
    }
    
    /* 
       Getting list of people in the user groups.
       ------------------------------------------
       Taken from the ChatModHover script
       created by Ozuzanna.
    */
    function getUserGroupsList(group, array){
        $.ajax({
           url: mw.util.wikiScript('api'),
           data: {
               format: 'json',
               action: 'query',
               list: 'allusers',
               augroup: group,
               aulimit: 500
           },
           dataType: 'json',
           type: 'POST',
           success: function(data){
               var allusers = data.query.allusers;
               for (var i in allusers){
                   array.push(allusers[i].name);
               }
           }
        });
    }
    
    getUserGroupsList('bureaucrat', bcratList);
    getUserGroupsList('administrator', adminList);
    getUserGroupsList('chatmoderator', chatmodList);
    getUserGroupsList('rollback', rollbackerList);
    
    function configure(obj, arr, settings){
        for (var i = 0; i < arr.length; i++){
            obj[arr[i]] = settings[i];
        }
    }
    console.log('(' + bcratList + '), (' + adminList + '), (' + chatmodList + '), (' + rollbackerList + ')');
    configure(b_obj, bcratList, [{right: 'bureaucrat'}, {}, {}, {}]);
    console.log(b_obj[0].right)
});