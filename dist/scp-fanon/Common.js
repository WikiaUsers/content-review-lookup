/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		'founder': { u:'05', order:1, title:'Wiki Founder'},
		'bureaucrat': { u:'A-Class', order:2, title:'Bureacrat'},
		'sysop': { u:'B-Class', order:3, title:'Administrator'},
		'threadmoderator': { u:'C-Class', order:4, title:'Thread Moderator'}
		
	},
	oasisPlaceBefore: '',
};
// Input Credentials
function InputCredentials() { 
	document.getElementByID("CredOutput").style.display = "block";
}