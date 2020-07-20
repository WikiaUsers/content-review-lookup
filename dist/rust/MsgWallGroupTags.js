(function($, config) {
	//Setup configuration options, internal variables, and default values:
	var groups = config.groups || {}, //List of groups to tag and what the tag will say
		users = config.users || {}; //List of users to tag and what the tag will say

	//Start                 
	function init() {
		console.log('Running MsgWallGroupTags Version 0.3D');
		var groupGetCounter = 0,
		numberOfGroups = Object.keys(groups).length;
		for (var gGroupName in groups) { //Get user list for groups
			$.getJSON('/api.php?action=query&list=allusers&augroup=' + gGroupName + '&aulimit=max&format=json',
			(function(refGroup) {
				return function(data) {
					groups[refGroup].userList = data.query.allusers;
					groupGetCounter++;
					if (groupGetCounter === numberOfGroups) { //Ensure all data is loaded before continuing
						CreateTags();
					}
				};
			}(gGroupName)))
		}		
	}

	function GetTagInfo(userName){
		for (var checkName in users) { //Check if in users
			if (checkName === userName){
				return users[checkName];
			}
		} 
		var selectedGroup = {},
		currentOrder = 0;
		for (var groupName in groups) { //Check if in group 
			for (var groupMember in groups[groupName].userList) {
				if (groups[groupName].userList[groupMember].name === userName && groups[groupName].order > currentOrder){ //We need to go deeper
					currentOrder = groups[groupName].order;
					selectedGroup = groups[groupName];
				}              
			}
		}
		return selectedGroup;	
	}
 
	function CreateTags() {
		$(".edited-by").find("a").each(function(index){
			if ($(this).next(".subtle")[0]){
				var tagInfo = GetTagInfo(this.innerHTML);
				if (Object.getOwnPropertyNames(tagInfo).length !== 0) {
					var txtShadow = '',
					marginL = '0px';
					if (tagInfo.glowColor) {    
						if (tagInfo.glowSize) {
							txtShadow = '0 0 ' + tagInfo.glowSize + ' ' + tagInfo.glowColor;
						} else {
							txtShadow = '0 0 20px ' + tagInfo.glowColor;
						}    
					}
					if (tagInfo.image) {
						marginL = '8px';
					}
					$(this).next(".subtle")
					.after('<span style="color: ' + tagInfo.tagColor + '; text-shadow: ' + txtShadow + '; margin-left: ' + marginL + '; font-size: 10px; vertical-align: top; fontFamily: arial;">' + tagInfo.tag + '</span>'); //Add Tag
					//if (tagInfo.image) {  //Finish Later
					//	$('a.subtle[href$="Message_Wall:' + ToBeTagName + '"]')
					//	.after('<img class="MessageWallUserImage" width="20" height="20" src="' + TagInfo.image + '">');
					//}
				}
			}                                    
		});
	} 
 
	init();
}(jQuery, window.MsgWallGroupTags));