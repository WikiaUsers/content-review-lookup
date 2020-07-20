/* Any JavaScript here will be loaded for all users on every page load. */
function AdminUserpageHeader() {
	$('head').append('<style type="text/css">\n/* From UserProfilePage.scss */\n.WikiaUserPagesHeader .user-groups{*display:inline-block;float:right;margin:7px 5px 0 0}.WikiaUserPagesHeader .user-groups:after{content:".";display:block;height:0;clear:both;visibility:hidden}.WikiaUserPagesHeader .user-groups li{font-size:11px;font-weight:bold;background-image:url(https://images.wikia.nocookie.net/__cb37682/common/skins/oasis/images/checkers.png);background-position:0px 14px;background-repeat:repeat-x;float:left;height:20px;margin-right:7px}.WikiaUserPagesHeader .user-groups li span{text-decoration:none;color:white;}\n</style>');
	$('#WikiaUserPagesHeader h1').after('<ul class="user-groups"></ul>');
	//Bureaucrats
	if(wgPageName == 'User:Prisinorzero' || wgPageName == 'User:Bob Bricks' || wgPageName == 'User:Clone gunner commander jedi') {
		$('.user-groups').prepend('<li><span title="This user is a leader of Brick Critics">Brick Critics Staff Leader</span></li>');
	}
}

addOnloadHook(AdminUserpageHeader);