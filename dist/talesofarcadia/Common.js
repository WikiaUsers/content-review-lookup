/* Any JavaScript here will be loaded for all users on every page load. */
/*Easy Dropdown Buttons - by ShermanTheMythran (special thanks to Mathmagician)*/
$('.drop-button').click(function(){
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active');
});

/* load audio player for message wall and forums */
if (1201 === wgNamespaceNumber || 2000 === wgNamespaceNumber || 'Forum' === wgCanonicalSpecialPageName) {
    $.getScript('/extensions/OggHandler/OggPlayer.js');
}

/* Template:USERNAME */
$(function () {
    $('.insertusername').text(mw.config.get('wgUserName'));
});

/* Autocreate user pages */
window.AutoCreateUserPagesConfig = {
            content: {
             2: '{{sub'+'st:autouserpage}}',
             3: '{{autowelcome|<span style="font-family:Trollhunters;">[[User:Merlin_the_Immortal|<span style="color:#454427;">Merlin the Immortal</span>]] [[User_talk:Merlin_the_Immortal|<span style="color:#454427;">﴾Talk Page﴿</span>]]</span>}}',
             1202: false
},
            summary: '<span class="script">Script: Creating profile and talkpage on first edit - automatically by Wiki</script>'
};