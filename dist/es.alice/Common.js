/* Center Template:Button */
$(".nav-button").parent().css("text-align", "center");

/* Tabber default snippet by Lunarity; infobox-tabber checker and inner tabber adjustments for JsTabs by Lia */
if ($('#infobox-tabber') !== null) {
    $(window).on('load.tabberhack', function() {
        var AMAlength = $('#AMA').find("li").length, 
            AMRlength = $('#AMR').find("li").length,
            AOlength = $('#AO').find("li").length,
            length1 = $('.tabberlive').length,
            tablength = $('.tabberlive').find("li").length;
        if (AMAlength + AMRlength + AOlength > 0) {
            if (AMAlength > 0) {
                $('.tabberlive')[0].tabber.tabShow(AMAlength - 1);
            }
            if (AMRlength > 0) {
                $('.tabberlive')[length1 - 2].tabber.tabShow(AMRlength - 1);
            }
            if (AOlength > 0) {
                $('.tabberlive')[length1 - 1].tabber.tabShow(AOlength - 1);
            }
        } else {
            $('.tabberlive')[0].tabber.tabShow(tablength - 1);
        }
          
        $(window).off('load.tabberhack');
    });
}

/* Toggles a certain quote when a Tabber tab is clicked.
 Created by: [[User:LiaSakura]] */
function TabberToggle() {
    if ($('#infobox-tabber') !== null) {
        $('.tabbernav').click(function () {
            var tab = $('.tabbernav').find('.tabberactive a').attr("title");
            switch (tab) {
                case 'AMA':
                    $('#AMAQ').show();
                    $('#AMAB').show();
                    $('#AMRQ').hide();
                    $('#AMRB').hide();
                    break;
                case 'AMR':
                    $('#AMRQ').show();
                    $('#AMRB').show();
                    $('#AMAQ').hide();
                    $('#AMAB').hide();                    
                    break;
            }
        });
    }
}
addOnloadHook(TabberToggle);

/* CUSTOM EDIT BUTTONS */
if (mwCustomEditButtons) {

/*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/americanmcgeesalice/images/8/8c/Button_RedX.png",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
}

 /* From http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js */
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend($( '#icons' ).css({'position':'absolute', 'right': '70px'}));
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '0px'} ).show();
    }
});

/* Sprite icons */
$(function() { 
    $('.edit-pencil').attr('src','https://images.wikia.nocookie.net/__cb20140809102221/americanmcgeesalice/images/4/4f/Pen.png');
    $('.search').attr('src','https://images.wikia.nocookie.net/__cb20130630142411/americanmcgeesalice/images/8/88/Drink_Me_potion_icon.png');
});

/* Little homage to AO release */
$('.wds-community-header__wordmark').hover(function () {
    $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/americanmcgeesalice/images/2/21/Wiki-wordmark.gif/revision/latest?cb=20151101170512'); 
});