/* Any JavaScript here will be loaded for all users on every page load. */

var pathQuestIcon = "M 0.03,0.03\
           C 0.03,0.03 0.02,23.98 0.02,23.98\
             0.02,23.98 23.95,23.96 23.95,23.96\
             23.95,23.96 23.95,0.04 23.95,0.04\
             23.95,0.04 0.03,0.03 0.03,0.03 Z\
           M 1.00,1.00\
           C 1.00,1.00 1.00,23.00 1.00,23.00\
             1.00,23.00 23.00,23.00 23.00,23.00\
             23.00,23.00 23.00,1.00 23.00,1.00\
             23.00,1.00 1.00,1.00 1.00,1.00 Z\
           M 4.04,3.96\
           C 4.04,3.96 9.01,4.01 9.01,4.01\
             9.01,4.01 9.00,4.96 9.00,4.96\
             9.00,4.96 6.51,7.57 6.51,7.57\
             6.51,7.57 4.00,5.00 4.00,5.00\
             4.00,5.00 4.04,3.96 4.04,3.96 Z\
           M 15.00,4.00\
           C 15.00,4.00 10.00,4.00 10.00,4.00\
             10.00,4.00 9.99,5.00 9.99,5.00\
             9.99,5.00 12.53,7.56 12.53,7.56\
             12.53,7.56 15.00,4.98 15.00,4.98\
             15.00,4.98 15.00,4.00 15.00,4.00 Z\
           M 21.00,4.00\
           C 21.00,4.00 16.00,4.00 16.00,4.00\
             16.00,4.00 16.00,4.97 16.00,4.97\
             16.00,4.97 18.51,7.56 18.51,7.56\
             18.51,7.56 21.00,4.99 21.00,4.99\
             21.00,4.99 21.00,4.00 21.00,4.00 Z\
           M 18.01,9.00\
           C 18.01,9.00 18.01,10.00 18.01,10.00\
             18.01,10.00 12.00,10.00 12.00,10.00\
             12.00,10.00 12.00,9.00 12.00,9.00\
             12.00,9.00 18.01,9.00 18.01,9.00 Z\
           M 10.00,9.00\
           C 10.00,9.00 10.00,10.00 10.00,10.00\
             10.00,10.00 5.00,10.00 5.00,10.00\
             5.00,10.00 5.00,9.01 5.00,9.01\
             5.00,9.01 10.00,9.00 10.00,9.00 Z\
           M 5.00,10.99\
           C 5.00,10.99 5.00,12.00 5.00,12.00\
             5.00,12.00 12.00,12.00 12.00,12.00\
             12.00,12.00 12.00,11.00 12.00,11.00\
             12.00,11.00 5.00,10.99 5.00,10.99 Z\
           M 4.99,13.99\
           C 4.99,13.99 4.99,15.01 4.99,15.01\
             4.99,15.01 11.41,14.99 11.41,14.99\
             11.41,14.99 11.01,15.44 11.01,15.44\
             11.01,15.44 9.99,16.56 9.99,16.56\
             9.99,16.56 10.46,17.02 10.46,17.02\
             10.46,17.02 5.00,17.00 5.00,17.00\
             5.00,17.00 5.00,18.00 5.00,18.00\
             5.00,18.00 11.19,17.98 11.19,17.98\
             11.19,17.98 12.51,19.02 12.51,19.02\
             12.51,19.02 14.99,16.53 14.99,16.53\
             14.99,16.53 12.47,14.01 12.47,14.01\
             12.47,14.01 4.99,13.99 4.99,13.99 Z\
           M 15.52,10.99\
           C 15.52,10.99 12.99,13.52 12.99,13.52\
             12.99,13.52 15.53,15.99 15.53,15.99\
             15.53,15.99 17.99,13.53 17.99,13.53\
             17.99,13.53 15.52,10.99 15.52,10.99 Z\
           M 18.51,14.00\
           C 18.51,14.00 16.00,16.58 16.00,16.58\
             16.00,16.58 18.49,18.99 18.49,18.99\
             18.49,18.99 21.00,16.53 21.00,16.53\
             21.00,16.53 18.51,14.00 18.51,14.00 Z\
           M 17.99,19.50\
           C 17.99,19.50 15.52,22.00 15.52,22.00\
             15.52,22.00 12.99,19.52 12.99,19.52\
             12.99,19.52 15.50,16.98 15.50,16.98\
             15.50,16.98 17.99,19.50 17.99,19.50 Z";

var questNotificationMenu = {
	notificationsContainer: null,
    
    init: function () {
        questNotificationMenu.notificationsContainer = 
        '<div id="questNotificationsEntryPoint" class="wds-global-navigation__notifications-menu wds-dropdown notifications-container">'+
		'<div class="wds-dropdown__toggle wds-global-navigation__dropdown-toggle" title="Messages">'+
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="wds-icon wds-icon-small" alt="Messages" id="wds-icons-note"><path d="'+pathQuestIcon+'" fill-rule="evenodd"/></svg>'+
			'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"/></svg>'+	
		'</div>'+
		'<div id="questNotifications" class="wds-dropdown__content wds-is-right-aligned wds-global-navigation__dropdown-content">'+
			'<ul id="GlobalNavigationWallNotifications" class="WallNotifications global-nav-dropdown show">'+
				'<li id="questNotificationsContainer" style="" class="scrollable">'+
					'<ul class="notifications-for-wiki-list">'+
					'</ul>'+
				'</li>'+
        '<div style="font-size:7px; color:grey; width:auto; text-align:right; padding-right:2px">questSystem v'+questConfig.version+'</div>'+
			'</ul>'+
		'</div>'+
    '</div>';
        questNotificationMenu.buildDropdownMenu();
    },
      
    buildDropdownMenu: function () {        
        var container = $(questNotificationMenu.notificationsContainer);
        for (var quest in questConfig.questDatabase) {
            if (quest == 'archive') {continue}
            
            var difficulty = questConfig.questDatabase[quest].info.difficulty;
            var title = questConfig.questDatabase[quest].info.title;
            var page = questConfig.questDatabase[quest].info.page;
            var goal = questConfig.questDatabase[quest].info.goal;
            var link = questConfig.questDatabase[quest].link;
            var id = questConfig.questDatabase[quest].id;
            var questNotification = 
			'<li class="notification" id='+id+'>'+
				'<a href='+link+'>'+
                   '<table class="infos" style="padding-left:15px">'+
                        '<tr>'+
                            '<td>'+
                                '<h4 style="color:red;">'+difficulty+'★</h4>'+
                            '</td>'+                
                            '<td>'+
                                '<h4 style="color:#000;">'+title+'</h4>'+
                            '</td>'+
                        '</tr>'+
                            '<td></td>'+
                            '<td>'+
                                '<span style="color:grey;"> • '+goal+'<br/> • '+page+'</div>'+
                            '</td>'+
                   '</table>'+
				'</a>'+
            '</li>';
            
            $('.notifications-for-wiki-list', container).append(questNotification);
        }
        
		$('.wds-global-navigation__start-a-wiki').before(container);
        
    },
};