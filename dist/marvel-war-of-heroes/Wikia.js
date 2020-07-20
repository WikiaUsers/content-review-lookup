/* increase the content size and hides the rail on selected pages */
//*Inspired by Monchoman45's expand compress button js code*//
//*Modified by DinoKev*//

function ExpandContent() {
	var headerWidth = $('header#WikiaPageHeader.WikiaPageHeader details').width();
	var contentWidth = $('article#WikiaMainContent.WikiaMainContent').width();
	var catlinksWidth = $('div#catlinks.catlinks').width();
	if(wgPageName == 'List_of_All_Cards'
         ||wgPageName == 'List_of_Cards_(temporary)'
         ||wgPageName == 'List_of_Speed_Cards'
         ||wgPageName == 'List_of_Bruiser_Cards'
         ||wgPageName == 'List_of_Tactics_Cards'
         ||wgPageName == 'List_of_Common_Cards'
         ||wgPageName == 'List_of_Uncommon_Cards'
         ||wgPageName == 'List_of_Rare_Cards'
         ||wgPageName == 'List_of_Special_Rare_Cards'
         ||wgPageName == 'List_of_Super_Special_Rare_Cards'
         ||wgPageName == 'List_of_Ultimate_Rare_Cards'
         ||wgPageName == 'List_of_Legendary_Cards'
         ||wgPageName == 'List_of_Male_Cards'
         ||wgPageName == 'List_of_Female_Cards'
         ||wgPageName == 'List_of_Super_Hero_Cards'
         ||wgPageName == 'List_of_Villain_Cards'
         ||wgPageName == 'List_of_Cards_with_Ability'
         ||wgPageName == 'List_of_Cards_with_Very_Low_Ability_Usage'
         ||wgPageName == 'List_of_Cards_with_Relatively_Low_Ability_Usage'
         ||wgPageName == 'List_of_Cards_with_Low_Ability_Usage'
         ||wgPageName == 'List_of_Cards_with_Average_Ability_Usage'
         ||wgPageName == 'List_of_Cards_with_High_Ability_Usage'
         ||wgPageName == 'List_of_Cards_with_Relatively_High_Ability_Usage'
         ||wgPageName == 'List_of_Cards_with_Very_High_Ability_Usage'
         ||wgPageName ==  'User:Phoenix8387/Sandbox'
          ) {
                        		$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
		        		$('article#WikiaMainContent.WikiaMainContent').css({"width": '1500px'});
		        		$('div#catlinks.catlinks').css({"width": '1500px'});
		        		$('div#WikiaRail.WikiaRail').css({"display": 'none'});
	}
}

addOnloadHook(ExpandContent);
/* End of Code */