/**
 * Script configurations
 */

// [[w:c:dev:WelcomeMessage]]
window.welcomeMessage = {
    enabled: true,
    preferTalk: true,
    adminUsername: 'ClodaghelmC',
    adminNickname: 'Clodaghelm',
    messageTitle: 'Welcome to Wiki of Ender, $1!',
    messageText: '{{' + 'subst:WelcomeMessage|$1|$2|$3|$4|' + 
'{{' + 'subst:CURRENTTIME}}, {{' + 'subst:CURRENTDAY}} {{' + 'subst:CURRENTMONTHNAME}} {{' + 'subst:CURRENTYEAR}} (UTC)}}' // [[Template:WelcomeMessage]]
};

/**
 * Custom scripts
 */
 
// Insert viewing user's name into <span class="insert-username"></span>
$(function() {
    var name = mw.config.get('wgUserName');
    $('.insert-username').text(name ? name : 'anonymous user'); // for anonymous users
});