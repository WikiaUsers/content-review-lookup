/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/71/Monster_Match_Template_Button_Icon.png",
		"speedTip": "Insert Monster Infobox Template",
		"tagOpen": "\{\{subst::Monster_Template",
		"tagClose": "}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/monster-match/images/b/bf/Monster_Match_Boost_Button_Icon.jpg",
		"speedTip": "Insert boost Material Monster Infobox Template",
		"tagOpen": "\{\{subst::BoostMonster_Template",
		"tagClose": "}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/monster-match/images/4/4c/Monster_Match_Evolution_Button_Icon.jpg",
		"speedTip": "Insert Evolution Material Monster Infobox Template",
		"tagOpen": "\{\{subst::EvoMonster_Template",
		"tagClose": "}\}",
		"sampleText": ""};

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2a/Button_category_plus.png",
		"speedTip": "Insert Category Link",
		"tagOpen": "\[\[:Category:",
		"tagClose": "\|\]\]",
		"sampleText": "CategoryNameHere"};

}