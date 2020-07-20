/* General */
/** Social Media buttons */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');

/* Mainpage */
if(wgPageName == "Trek_Initiative_Wiki") {
	addOnloadHook(function() {
		/** Chat button icon **/
		$('.mainpage-box-chat .ChatModule .wikia-button').prepend('<img class="chat-icon" src="https://images.wikia.nocookie.net/trek-initiative/images/7/72/Icon-Chat.png">');
 
		/** Video button icon **/
		$('.mainpage-button-fanfilms').prepend('<a href="/wiki/Special:WikiaVideoAdd" class="wikia-button"><img src="https://images.wikia.nocookie.net/trek-initiative/images/a/ae/Icon-Video.png" class="fanfilm-icon">Add a video</a>');
 
		/** Blogs button icon **/
		$('.mainpage-button-communityblogfeed').prepend('<a href="/wiki/Special:CreateBlogPage" class="wikia-button"><img src="https://images.wikia.nocookie.net/trek-initiative/images/6/66/Icon-Blogs.png" class="icon-communityblogfeed">Create news</a>');
 
		/** Poll text **/
		$('.mainpage-box-poll .total').parent().addClass('pollText'); 
	});
}

/* Other pages */
/** Star Trek Communities page **/
if (wgPageName == "Wikia_Star_Trek_Communities") {
    function appendDropdown() {
        $('.chooselanguage').remove();
        var html = '<nav style="display: inline-block; padding-bottom: 3px; margin-left: 5px;" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 4px; margin-left: 3px; margin-right: 5px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 44px; margin-top: 2px; border: 1px solid #313131; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
        flags = {};
        flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
        flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/9/9e/Flag_of_Japan.svg" alt="Japanese">';
        flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/0/03/Flag_of_Italy.svg" alt="Italian">';
        flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/c/c3/Flag_of_France.svg" alt="French">';
        flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/1/12/Flag_of_Poland.svg" alt="Polish">';
        flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/b/ba/Flag_of_Germany.svg" alt="German">';
        flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/f/f3/Flag_of_Russia.svg" alt="Russian">';
        flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';
        flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
        flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/trek-initiative/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
        $('.startrekcommunities .chooselanguage-container').append(html);
        var language = $('.startrekcommunities').attr('id');
        $.each(flags, function (key, value) {
            if (key == language) {
                $('.startrekcommunities .chooselanguage-container nav').prepend(flags[key]);
            } 
            else {
                $('.startrekcommunities .chooselanguage-container ul').prepend('<li style="padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li>');
            }
        });

        $('.chooselanguage').on('click', function () {
            if ($(this).hasClass('active') == false) {
                $(this).addClass('active');
            } 
            else {
                $(this).removeClass('active');
            }
        });

        $('.chooselanguage').on('mouseleave', function () {
            var that = this;
            var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);

            $('.chooselanguage').on('mouseenter', function () {
                clearTimeout(timeOut);
            });
        });

        $('.chooselanguage-container').on('click', 'li', function () {
            $('.startrekcommunities').html('<div class="loader-container" style="text-align:center;"><img class="loader" src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" alt="Loading..." /></div>');
            var language = $(this).attr('class');
            var languageLink = "/" + language;

            $('.replace-container').load('/wiki/Wikia_Star_Trek_Communities' + languageLink + '?action=render', function () {
                appendDropdown();
            });
        });
    }
    addOnloadHook(appendDropdown);
}