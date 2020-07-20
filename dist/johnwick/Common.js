/* Any JavaScript here will be loaded for all users on every page load. */

dev:UserTags/code.js

window.UserTagsJS =
	modules: {},
	tags: {
		bureaucrat: { u:'Elder'},
        chatmoderator: { u:'Chat Mod'},
        rollback: { u:'Assassin'},
        sysop: {u:'Adjundicator'},
        founder: {u:'founder'}
	}

};
 
UserTagsJS.modules.custom = {
        'JDracolyte': ['Elder'],
        'Mishacattv': ['Adjundicator']

window.MessageWallUserTags = {
    tagColor: '#1dccd0',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'Gold', //Glow color
    users: {
        'JDracolyte': 'Elder'
    }
};

UserTagsJS.modules.custom = {
'UserName': ['Rollback'], // Add Rollback
};