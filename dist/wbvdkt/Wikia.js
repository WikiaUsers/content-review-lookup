/* Accesskey?! */
$('[accesskey="l"]').attr('accesskey','');
$('[accesskey="d"]').attr('accesskey','l');

/* Vote table */
$('table.vote td:contains(Y)').addClass('vote-yes');
$('table.vote td:contains(N)').addClass('vote-no');
$('table.vote td:contains(A)').addClass('vote-abstain');

/* Add footer to navboxes */
$(function () {
	$('.mw-navbox td.navbox-footer .selflink').after('<a href="/wiki/Template:NavBox">[Source]</a>').remove();
	$('.mw-navbox td.navbox-footer a').addClass('navbox-footerlink');
});

/* All pages proper list */
$(function () {
	$('.mw-allpages-table-chunk').after('<div class="mw-allpages-list"></div>');
	$('.mw-allpages-table-chunk a').appendTo('div.mw-allpages-list');
	$('.mw-allpages-table-chunk').remove();
});

/* Talk page notice */
$(function () {
	$('#talkpagesignbox').html('<b>Don&apos;t forget to sign your posts with four tildes (<code><nowiki>~~~~</nowiki></code>), or three (<code><nowiki>~~~</nowiki></code>) if you&apos;re using a <a href="/wiki/Template:Signature">custom signature</a> (<a href="/wiki/User:'+ wgUserName +'/Sig">check</a>).</b>');
});

/* List stuff */
$(function () {
	$('td:contains(class="list-yes" |)').addClass('list-yes');
	$('td.list-yes').html('•');
});

/* Adding class to releases in history pages */
$(function () {
	$('#pagehistory span.comment:contains(release)').addClass('mw-history-compare-release');
});

$('.page-User_Kris159_Skin_test_1').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Skin_test/1.js?action=raw&ctype=text/javascript">');
$('.page-User_Kris159_Skin_test_2').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Skin_test/2.js?action=raw&ctype=text/javascript">');
$('.page-User_Kris159_Skin_test_3').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Skin_test/3.js?action=raw&ctype=text/javascript">');
$('.page-User_Kris159_Skin_test_4').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Skin_test/4.js?action=raw&ctype=text/javascript">');
$('.page-User_Kris159_Skin_test_5').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Skin_test/5.js?action=raw&ctype=text/javascript">');
$('.page-User_Kris159_Skin_test_6').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Skin_test/6.js?action=raw&ctype=text/javascript">');

$('.page-User_Kris159_Minecraft_tournytime_pvp_match:not(.editor,.oasis-one-column)').prepend('<script type="text/javascript" src="http://wbvdkt.wikia.com/wiki/User:Kris159/Minecraft_tournytime_pvp_match.js?action=raw&ctype=text/javascript">');