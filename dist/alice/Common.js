/* Center Template:Button */
$(".nav-button").parent().css("text-align", "center");

/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
		bot: { link:'Help:Bots' }
	}
};
UserTagsJS.modules.inactive = 72;
UserTagsJS.modules.mwGroups = ['sysop', 'bot', 'bot-global'];

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges"];

/* Reveal anon IPs */
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries',
    css: '#stdSummaries { ... }'
};

/* Imagebox */
/* destfile checker from http://starwars.wikia.com/wiki/MediaWiki:Common.js 
   modified by Lia */

$("#mw-upload-form").submit(function (event) {
    var wpDestFile = $("#wpDestFile").val();

    if ( wpDestFile.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
        alert('Please do not use capitalized or duplicated file extensions in the filename.');
        return false;
    }
});

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
$(function TabberToggle() {
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
);
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
	console.log("version:" + mw.config.get( 'wgVersion' ));
	if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#icons' ).length ) {
		alert("yo");
        $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
    } else if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
			$( '#icons' ).attr( 'style', 'position: absolute; right: 70px;')
		);
	} else {
		alert("no");
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '0px'} ).show();
    }
});

/* For imagebox */	
window.uploadText = "{{Imagebox\n"
	+ "| description = \n"
	+ "| series      = \n"
	+ "| source      = \n"
	+ "| author      = \n"
	+ "| origin      = \n"
	+ "| cats        = \n"
	+ "| license     = \n"
	+ "}}";

/* Sprite icons */
$(function() { 
    $('.edit-pencil').attr('src','https://images.wikia.nocookie.net/__cb20140809102221/americanmcgeesalice/images/4/4f/Pen.png');
    $('.search').attr('src','https://images.wikia.nocookie.net/__cb20130630142411/americanmcgeesalice/images/8/88/Drink_Me_potion_icon.png');
});

/* Little homage to AO release */
$('.wds-community-header__wordmark').hover(function () {
    $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/americanmcgeesalice/images/2/21/Wiki-wordmark.gif/revision/latest?cb=20151101170512'); 
});