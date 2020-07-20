function sizeForPortal() {

if (wgNamespaceNumber === 120 || wgNamespaceNumber === 4 || $("body").hasClass("mainpage") ) {

$("body").append('<style>'
+ '.meta-geschichtenbalken-jsnotworking.geschichtenbalken2015 .geschichten-status {'
+ 'transform: rotate(90deg) !important;'
+ 'margin-left: -58px !important;'
+ 'margin-top: 42px !important;'
+ 'line-height: 22px !important;'
+ 'width: 116px !important;'
+ '}'

+ '.meta-geschichtenbalken-jsnotworking.geschichtenbalken2015 .geschichte-logo, .meta-geschichtenbalken-jsnotworking .moreinfo'
+ '{'
+ 'display: none !important;'
+ '}'
+ '.meta-geschichtenbalken-jsnotworking .grid-1.logo.alpha { width: 10px !important; height: 0 !important; }				.meta-geschichtenbalken-jsnotworking.meta-geschichtenbalken .accent .accent { border-top: 3px solid green; margin-right: 21px; }'
+ '</style>');

$('.meta-geschichtenbalken.geschichtenbalken2015').each(function() {
	$(this).find(".center").remove();

        $(this).removeClass('meta-geschichtenbalken-jsnotworking');

	//$(this).find('#geschichtenstatus').parent().css('transform', 'rotate(90deg)').css("margin-left", "100px").css("margin-top", "-80px");
	
	$(this)
	.find('#geschichtenstatus').parent()	
	.css('transform', 'rotate(90deg)')
	.css("margin-left", "-56px")
	.css("margin-top", "-81px")
	.css("line-height", "21px")
	.css("width", "113px");

if ($(this).find('#ueberdiegeschichte').find('.kapitelzahl-replacement') != "") {

	kapitelzahl = $(this).find('.kapitelzahl').text().replace(/[^0-9]/g, '');

	$(this)
	.find('#geschichtenname').parent()
	.after('<span class="kapitelzahl-replacement">&nbsp;(' + kapitelzahl + ')</span>');

/*
if ($(this).parent().parent().parent().parent().hasClass('kurzgeschichte')) {
	$(this).attr('data-kapitelart', "Kurzgeschichte" );
} else {
	$(this).attr('data-kapitelzahl', kapitelzahl );
}
*/

}

kapitelzahl2 = $(this).find('.kapitelzahl-replacement').text().replace(/[^0-9]/g, '');


if ($(this).hasClass('kurzgeschichte')) {
	$(this).attr('data-kapitelart', "Kurzgeschichte" );
} else {
	$(this).attr('data-kapitelzahl', kapitelzahl2 );
}

	$(this).find('.logo')
	.css("width", "10px")
	.css('height', '110px');
	
	//duplicate due to cache
	$(this).find('.moreinfo').remove();

	$(this).find('.scrollarea .accent')
	.css('height', '97px')
	.css('border-top' , '3px solid #E7B414')
	//.css('border-color', '#E9C500 !important');
	.css('border-bottom', '3px solid #E7B414');

	$(".kapitelzahl-replacement:contains('()')").remove();

});
$("body").append('<style>.geschichtenbalken2015 .geschichten-info-2013.accent .accent, .site-accent .accent { border-color: #E7B414 !important; }');

}
}

if (wgNamespaceNumber === 120 || wgNamespaceNumber === 4 || $("body").hasClass("mainpage") ) {
sizeForPortal();
}