/* Any JavaScript here will be loaded for all users on every page load. */
function AdminUserpageHeader() {
	$('head').append('<style type="text/css">\n/* From UserProfilePage.scss */\n.WikiaUserPagesHeader .user-groups{*display:inline-block;float:right;margin:7px 5px 0 0}.WikiaUserPagesHeader .user-groups:after{content:".";display:block;height:0;clear:both;visibility:hidden}.WikiaUserPagesHeader .user-groups li{font-size:11px;font-weight:bold;background-image:url(https://images.wikia.nocookie.net/__cb37682/common/skins/oasis/images/checkers.png);background-position:0px 14px;background-repeat:repeat-x;float:left;height:20px;margin-right:7px}.WikiaUserPagesHeader .user-groups li span{text-decoration:none;color:white;}\n</style>');
	$('#WikiaUserPagesHeader h1').after('<ul class="user-groups"></ul>');
	//Mods
	if(wgPageName == 'User:Ajraddatz' || wgPageName == 'User:Nateh1997' || wgPageName == 'User:Sim533' || wgPageName == 'User:ShermanTheMythran') {
		$('.user-groups').prepend('<li><span title="This user is a Moderator on this wiki">Moderator</span></li>');
        }
	//Admins
	if(wgPageName == 'User:ToaCodyNuva' || wgPageName == 'User:PatchM142' || wgPageName == 'User:PeabodySam') {
		$('.user-groups').prepend('<li><span title="This user is an Admin on this wiki">Admin</span></li>');
	}
	//Bureaucrats
	if(wgPageName == 'User:Brickmack' || wgPageName == 'User:Jamesster.LEGO' || wgPageName == 'User:Mythrun') {
		$('.user-groups').prepend('<li><span title="This user is a Bureaucrat on this wiki">Bureaucrat</span></li>');
	}
}

addOnloadHook(AdminUserpageHeader);