/* Any JavaScript here will be loaded for all users on every page load. */
/*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		miyeonbiased: { u:'Miyeon Biased'},
		minniebiased: { u:'Minnie Biased'},
		shuhuabiased: { u:'Shuhua Biased'},
		soojinbiased: { u:'Soojin Biased'},
		soyeonbiased: { u: 'Soyeon Biased'},
		yuqibiased: { u:'Yuqi Biased'},
		maknae: { u:'Maknae'},
	}
};

/*Add Usertags for Users*/
UserTagsJS.modules.custom = {
	'I Love Blue 02': ['shuhuabiased']
};

/*RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log"
};

/*Template:Username*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/*Blog Comment*/
window.LockOldBlogs = {
    expiryDays: "infinite",
    expiryMessage: "This blog is considered archived because it hasn't been commented on in over <expiryDays> days, please don't bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/*Welcome Module (Sia Wiki)*/
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:NewUser',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('rail-module')
                    .attr('id', 'welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('has-icon')
                            .text('Welcome to the (G)I-DLE Wiki!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('wds-button-group')
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('#welcome-module .anons').show();
            }
            $('#welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('#welcome-module').fadeOut('slow');
            });
            $('#welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('#welcome-module').fadeOut('slow');
            });
        });
    }
});