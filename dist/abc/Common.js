/* Any JavaScript here will be loaded for all users on every page load. */

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Custom edit buttons for source mode
 * by: [[w:c:avatar:User:Thailog|Thailog]] on the Avatar Wiki
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images1.wikia.nocookie.net/marvel_dc/images/d/de/Film_Button.png",
		"speedTip": "Insert series infobox template",
		"tagOpen": "\{\{Series infobox\r",
		"tagClose": "\r| image                = \r| genre                = \r| creator              = \r| country              = \r| language             = \r| seasons              = \r| episodes             = \r| runtime              = \r| distributor          = [[American Broadcasting Company|ABC]]\r| release              = \r| status               = \r| wiki                 = \r\}\}",
		"sampleText": ""};