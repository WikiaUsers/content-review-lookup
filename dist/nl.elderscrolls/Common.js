///////////////////////////////////////////////////
//        Fix Wiki Navigation by jgjake2         //
///////////////////////////////////////////////////
/*
// Old function for user's global.js
 
function fixElderScrollsNavigation(){
	if(getUrlVars()["action"] == "edit") return;
	var full = window.location.host
	var parts = full.split('.')
	var sub = parts[0]
	if(sub == 'elderscrolls') {
		var wikiNavUl = getWikiNavUl();
		if(wikiNavUl == null) return;
		var addMenus = getPageType();
		addMenusToWikiNav(addMenus, wikiNavUl);
	}
}
*/
 
function fixElderScrollsNavigation(){
	if(getUrlVars()["action"] == "edit") return;
	var wikiNavUl = getWikiNavUl();
	if(wikiNavUl == null) return;
	var addMenus = getPageType();
	addMenusToWikiNav(addMenus, wikiNavUl);
}
addOnloadHook(fixElderScrollsNavigation);
 
function addMenusToWikiNav(menuList, wikiNavUl){
	if(!menuList) return;
	var maxMenus = 3;
	var count = 0;
	if(menuList.length > 2) fixCommunityMenu(wikiNavUl);
	for (x in menuList){
		if(count >= maxMenus) {
			return;
		}
		switch(menuList[x]){
			case 'Arena':
				addArenaMenu(wikiNavUl);
				count++;
				break;
			case 'Daggerfall':
				addDaggerfallMenu(wikiNavUl);
				count++;
				break;
			case 'Morrowind':
				addMorrowindMenu(wikiNavUl);
				count++;
				break;
			case 'Oblivion':
				addOblivionMenu(wikiNavUl);
				count++;
				break;
		}
	}
}
 
function getPageType(){
	//document.body.getElementsByTagName("nav")[1].style.width="630px";
	var addMenus = [];
    var categoryDiv = document.getElementById('mw-normal-catlinks');
    if(categoryDiv){
        var categoryDiv_Links = categoryDiv.getElementsByTagName("a");
        for (x in categoryDiv_Links){
			switch(categoryDiv_Links[x].title){
				case 'Category:Arena: Characters':
				case 'Category:Arena: Classes':
				case 'Category:Arena: Creatures':
				case 'Category:Arena: Locations':
				case 'Category:Arena: Quests':
				case 'Category:Artifacts in Arena':
				case 'Category:Factions in Arena':
				case 'Category:Arena':
					//alert('Arena!');
					if(elementExists(addMenus, 'Arena') == false) addMenus.push('Arena');
					break;
				case 'Category:Daggerfall: Books':
				case 'Category:Daggerfall: Characters':
				case 'Category:Daggerfall: Creatures':
				case 'Category:Daggerfall: Factions':
				case 'Category:Daggerfall: Locations':
				case 'Category:Daggerfall: Males':
				case 'Category:Factions in Daggerfall':
				case 'Category:Daggerfall':
					//alert('Daggerfall!');
					if(elementExists(addMenus, 'Daggerfall') == false) addMenus.push('Daggerfall');
					break;
				case 'Category:Factions in Morrowind':
				case 'Category:Morrowind: Ashlander':
				case 'Category:Morrowind: Books':
				case 'Category:Morrowind: Characters':
				case 'Category:Morrowind: Creatures':
				case 'Category:Morrowind: Dunmer':
				case 'Category:Morrowind: Factions':
				case 'Category:Morrowind: Imperials':
				case 'Category:Morrowind: Ingredients':
				case 'Category:Morrowind: Items':
				case 'Category:Morrowind: Locations':
				case 'Category:Morrowind: Potions':
				case 'Category:Morrowind: Skill books':
				case 'Category:Morrowind: Skills':
				case 'Category:Morrowind: Thieves Guild Quests':
				case 'Category:Morrowind: Thieves Guild members':
				case 'Category:Morrowind':
					//alert('Morrowind!');
					if(elementExists(addMenus, 'Morrowind') == false) addMenus.push('Morrowind');
					break;
				case 'Category:Artifacts in Oblivion':
				case 'Category:Oblivion: Armor':
				case 'Category:Oblivion: Books':
				case 'Category:Oblivion: Characters':
				case 'Category:Oblivion: Classes':
				case 'Category:Oblivion: Creatures':
				case 'Category:Oblivion: Factions':
				case 'Category:Oblivion: Imperials':
				case 'Category:Oblivion: Ingredients':
				case 'Category:Oblivion: Items':
				case 'Category:Oblivion: Locations':
				case 'Category:Oblivion: Quests':
				case 'Category:Oblivion: Skills':
				case 'Category:Oblivion: Spells':
				case 'Category:Oblivion: Thieves Guild members':
				case 'Category:Oblivion: Weapons':
				case 'Category:Oblivion':
					//alert('Oblivion!');
					if(elementExists(addMenus, 'Oblivion') == false) addMenus.push('Oblivion');
					break;
			}
        }
		return addMenus;
    }
}
 
function addArenaMenu(wikiNavUl){
	var menu0 = ['/wiki/The_Elder_Scrolls:_Arena', 'Arena'];
	var menu1 = [
		['/wiki/Quests_in_Arena', 'Quests'],
		['/wiki/Main_Quest_(Arena)', 'Main Quest'],
		['/wiki/Side_Quests_(Arena)', 'Side Quests']
	];
	var menu2 = [
		['/wiki/The_Elder_Scrolls:_Arena#Gameplay', 'World'],
		['/wiki/Map_(Arena)', 'Map'],
		['/wiki/Creatures_in_Arena', 'Creatures'],
		['/wiki/Location_(Arena)', 'Locations'],
                ['/wiki/Races_(Arena)', 'Races'],
		['/wiki/Attributes', 'Attributes'],
		['/wiki/Magic_(Arena)', 'Magic']
	];
	var menu3 = [
		['/wiki/Items (Arena)', 'Items'],
		['/wiki/Artifacts_(Arena)', 'Artifacts'],
		['/wiki/Spellbooks_(Arena)', 'Spellbooks']
	];
	var menu4 = [
		['/wiki/Damage_(Arena)', 'Damage'],
		['/wiki/Disease_(Arena)', 'Diseases'],
		['/wiki/Curses_(Arena)', 'Curses'],
		['/wiki/Potions_(Arena)', 'Potions']
	];
	var menuItemsArray = [menu1, menu2, menu3, menu4];
	addArrayToWikiaNavUl_TopLevel(menu0, menuItemsArray, wikiNavUl);
}
 
function addDaggerfallMenu(wikiNavUl){
	var menu0 = ['/wiki/The_Elder_Scrolls_II:_Daggerfall', 'Daggerfall'];
	var menu1 = [
		['/wiki/Quests_(Daggerfall)', 'Quests'],
		['/wiki/Main_Quest_(Daggerfall)', 'Main Quest'],
		['/wiki/Dark_Brotherhood_(Daggerfall)#Quests', 'Dark Brotherhood'],
		['/wiki/Fighters_Guild_(Daggerfall)', 'Fighters Guild'],
		['/wiki/Knight_Orders', 'Knight Orders']
	];
	var menu2 = [
		['/wiki/The_Elder_Scrolls_II:_Daggerfall#Game_world', 'Gameplay'],
		['/wiki/Attributes', 'Attributes'],
		['/wiki/Race', 'Races'],
		['/wiki/Skills_(Daggerfall)', 'Skills'],
		['/wiki/Category:Daggerfall:_Locations', 'Locations'],
		['/wiki/Factions_(Daggerfall)', 'Factions'],
		['/wiki/Reputation_(Daggerfall)', 'Reputation'],
		['/wiki/Category:Daggerfall:_Creatures', 'Creatures']
	];
	var menu3 = [
		['/wiki/Items_(Daggerfall)', 'Items'],
		['/wiki/Artifact_(Daggerfall)', 'Artifacts'],
		['/wiki/Category:Daggerfall:_Books', 'Books']
	];
	var menu4 = [
		['/wiki/The_Elder_Scrolls_II:_Daggerfall#Game_world', 'Damage'],
		['/wiki/Combat_(Daggerfall)', 'Combat'],
		['/wiki/Disease_(Daggerfall)', 'Disease'],
		['/wiki/Lycanthropy_(Daggerfall)', 'Lycanthropy'],
		['/wiki/Vampirism_(Daggerfall)', 'Vampirism'],
		['/wiki/Potions_(Daggerfall)', 'Potions']
	];
	var menuItemsArray = [menu1, menu2, menu3, menu4];
	addArrayToWikiaNavUl_TopLevel(menu0, menuItemsArray, wikiNavUl);
}
 
function addMorrowindMenu(wikiNavUl){
	var menu0 = ['/wiki/The_Elder_Scrolls_III:_Morrowind', 'Morrowind'];
	var menu1 = [
		['/wiki/Quests_in_Morrowind', 'Quests'],
		['/wiki/Main_Quest_(Morrowind)', 'Main Quest'],
		['/wiki/Fighters_Guild_(Morrowind)#Balmora_Missions', 'Fighters Guild'],
		['/wiki/Mages_Guild_(Morrowind)#Quests', 'Mages Guild'],
		['/wiki/Thieves_Guild_(Morrowind)#Thieves_Guild_Quests', 'Thieves Guild']
	];
	var menu2 = [
		['/wiki/The_Elder_Scrolls_III:_Morrowind#Gameplay', 'Gameplay'],
		['/wiki/Attributes', 'Attributes'],
		['/wiki/Race', 'Races'],
		['/wiki/Birthsigns_(Morrowind)', 'Birthsigns'],
		['/wiki/Classes_(Morrowind)', 'Classes'],
		['/wiki/Skills_(Morrowind)', 'Skills'],
		['/wiki/Category:Morrowind:_Locations', 'Locations'],
		['/wiki/Category:Morrowind:_Creatures', 'Creatures']
	];
	var menu3 = [
		['/wiki/Category:Morrowind:_Items', 'Items'],
		['/wiki/Weapons_(Morrowind)', 'Weapons'],
		['/wiki/Artifacts_(Morrowind)', 'Artifacts'],
		['/wiki/Category:Morrowind:_Books', 'Books']
	];
	var menu4 = [
		['/wiki/The_Elder_Scrolls_III:_Morrowind', 'Expansions'],
		['/wiki/The_Elder_Scrolls_III%3A_Tribunal', 'Tribunal'],
		['/wiki/The_Elder_Scrolls_III:_Bloodmoon', 'Bloodmoon']
	];
	var menuItemsArray = [menu1, menu2, menu3, menu4];
	addArrayToWikiaNavUl_TopLevel(menu0, menuItemsArray, wikiNavUl);
}
 
function addOblivionMenu(wikiNavUl){
	var menu0 = ['/wiki/The_Elder_Scrolls_IV:_Oblivion', 'Oblivion'];
	var menu1 = [
		['/wiki/Category:Oblivion:_Quests', 'Quests'],
		['/wiki/Main_Quest_(Oblivion)', 'Main Quest'],
		['/wiki/Side_Quests_(Oblivion)', 'Side Quests'],
		['/wiki/Dark_Brotherhood_(Oblivion)#Quests', 'Dark Brotherhood'],
		['/wiki/Fighters_Guild_(Oblivion)#Quests', 'Fighters Guild'],
		['/wiki/Mages_Guild_(Oblivion)#Quests', 'Mages Guild'],
		['/wiki/Thieves_Guild_(Oblivion)#Quests', 'Thieves Guild']
	];
	var menu2 = [
		['/wiki/The_Elder_Scrolls_IV:_Oblivion#Gameplay_Information', 'Gameplay'],
		['/wiki/Attributes_(Oblivion)', 'Attributes'],
		['/wiki/Race', 'Races'],
		['/wiki/Birthsigns_(Oblivion)', 'Birthsigns'],
		['/wiki/Classes_(Oblivion)', 'Classes'],
		['/wiki/Skills_(Oblivion)', 'Skills'],
		['/wiki/Category:Oblivion:_Locations', 'Locations'],
		['/wiki/Category:Oblivion:_Creatures', 'Creatures']
	];
	var menu3 = [
		['/wiki/Category:Oblivion:_Items', 'Items'],
		['/wiki/Category:Artifacts_in_Oblivion', 'Artifacts'],
		['/wiki/Category:Oblivion:_Armor', 'Armor'],
		['/wiki/Category:Oblivion:_Weapons', 'Weapons'],
		['/wiki/Category:Oblivion:_Books', 'Books'],
		['/wiki/Category:Oblivion:_Ingredients', 'Ingredients']
	];
	var menu4 = [
		['/wiki/The_Elder_Scrolls_IV:_Oblivion', 'Expansions'],
		['/wiki/The_Elder_Scrolls_IV%3A_Shivering_Isles', 'Shivering Isles'],
		['/wiki/Knights_of_the_Nine', 'Knights of the Nine'],
		['/wiki/Official_Plug-ins', 'Plug-ins']
	];
	var menuItemsArray = [menu1, menu2, menu3, menu4];
	addArrayToWikiaNavUl_TopLevel(menu0, menuItemsArray, wikiNavUl);
}
 
function fixCommunityMenu(wikiNavUl){
	var newCommunityMenu = [
		['/wiki/Elder_Scrolls:Community_Portal', 'Community'],
		['/wiki/The_Elder_Scrolls_Wiki:About', 'About'],
		['/wiki/The_Elder_Scrolls_Wiki:Staff', 'Staff'],
		['/wiki/The_Elder_Scrolls_Wiki:Policies_and_guidelines', 'Policies'],
		['/wiki/IRC', 'Chat with other editors'],
		['/wiki/Forum:Index', 'Forums'],
		['/wiki/Blog:Recent_posts', 'Blogs'],
		['/wiki/News', 'Recent News']
	];
	removeWikiaFirstLevelItem(wikiNavUl, 4);
	addArrayToWikiaNav_SecondLevel(newCommunityMenu, 1);
}
 
function elementExists(arr, elem) {
	var i = arr.length;
	while (i--) {
		if(elem === arr[i]) return true;
	}
	return false;
}
 
function getComputedWidth(theElt){
	docObj = document.getElementById(theElt);
	var tmphght1 = window.getComputedStyle(docObj, "").getPropertyValue("width");
	tmphght = tmphght1.split('px');
	tmphght = tmphght[0];
	return tmphght;
}
 
function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
 
///////////////////////////////////////////////////
//              Remove Functions                 //
///////////////////////////////////////////////////
function removeWikiaSecondLevelItem(wikiNavUl, topLevelNumber, secondLevelNumber){
	var secondLevelItem = getWikiaNavSecondLevel_Li(wikiNavUl, topLevelNumber, secondLevelNumber);
	secondLevelItem.parentNode.removeChild(secondLevelItem);
}
function removeWikiaFirstLevelItem(wikiNavUl, topLevelNumber){
	var firstLevelItem = getWikiaNavTopLevel_Li(wikiNavUl, topLevelNumber);
	firstLevelItem.parentNode.removeChild(firstLevelItem);
}
///////////////////////////////////////////////////
//                Get Functions                  //
///////////////////////////////////////////////////
function getWikiNavUl(){
	if(document.body == null) return;
	//if(document.body.getElementsByTagName("nav") == null) return;
	return document.body.getElementsByTagName("nav")[1].getElementsByTagName("ul")[0];
}
function getWikiaNavTopLevel_Li(wikiNavUl, topLevelNumber){
	var topLevelMenuLi = wikiNavUl.getElementsByTagName("li")[0];
	for (var i = 1; i <= topLevelNumber - 1; i++) topLevelMenuLi = topLevelMenuLi.nextSibling.nextSibling;
	return topLevelMenuLi;
}
function getWikiaNavTopLevel_Ul(wikiNavUl, topLevelNumber){
	return getWikiaNavTopLevel_Li(wikiNavUl, topLevelNumber).getElementsByTagName("ul")[0];
}
function getWikiaNavSecondLevel_Li(wikiNavUl, topLevelNumber, secondLevelNumber){
	var secondLevelMenuLi = getWikiaNavTopLevel_Li(wikiNavUl, topLevelNumber).getElementsByTagName("li")[0];
	for (var i = 1; i <= secondLevelNumber - 1; i++) secondLevelMenuLi = secondLevelMenuLi.nextSibling.nextSibling;
	return secondLevelMenuLi;
}
function getWikiaNavDropDown_Ul(wikiNavUl, topLevelNumber, secondLevelNumber){
	return getWikiaNavSecondLevel_Li(wikiNavUl, topLevelNumber, secondLevelNumber).getElementsByTagName("ul")[0];
}
function getWikiaNavDropDownItem(wikiNavUl, topLevelNumber, secondLevelNumber, thirdLevelNumber){
	var dropdownItem = getWikiaNavDropDown_Ul(wikiNavUl, topLevelNumber, secondLevelNumber).getElementsByTagName("li")[0];
	for (var i = 1; i <= thirdLevelNumber - 1; i++) dropdownItem = dropdownItem.nextSibling.nextSibling;
	return dropdownItem;
}
///////////////////////////////////////////////////
//                Add Functions                  //
///////////////////////////////////////////////////
function addItemsToWikiaSecondLevelMenu(menuItem, wikiNavUl, topLevelNumber){
	var topLevelMenuUl = getWikiaNavTopLevel_Ul(wikiNavUl, topLevelNumber);
	for (x in menuItem) {
		if(x == 0) {
			addItemToWikiaSecondLevelMenu(menuItem[x], topLevelMenuUl);
		} else {
 
		}
 
	}
}
function addItemToWikiaSecondLevelMenu(menuItem, topLevelMenuUl){
	var newMenuItem = document.createElement("li");
	newMenuItem.innerHTML='<a class="subnav-2a" href="' + menuItem[0] + '">' + menuItem[1] + '</a>';
	topLevelMenuUl.appendChild(newMenuItem);
}
function addItemsToWikiaDropDown_Ul(menuItem, wikiNavUl, topLevelNumber, secondLevelNumber){
	var secondLevelMenuUl = getWikiaNavDropDown_Ul(wikiNavUl, topLevelNumber, secondLevelNumber);
	if(secondLevelMenuUl == null){
		var secondLevelMenuLi = getWikiaNavSecondLevel_Li(wikiNavUl, topLevelNumber, secondLevelNumber);
		var secondLevelMenuLi_A = secondLevelMenuLi.getElementsByTagName("a")[0];
		secondLevelMenuLi_A.innerHTML = secondLevelMenuLi_A.innerHTML + '<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul class="subnav subnav-3" style="top: 28px; display: none;">';
		secondLevelMenuUl = document.createElement("ul");
		secondLevelMenuUl.setAttribute('class', 'subnav subnav-3');
		secondLevelMenuUl.setAttribute('style', 'top: 28px; display: none;');
		secondLevelMenuLi.appendChild(secondLevelMenuUl);
	}
	for (x in menuItem) addItemToWikiaDropDown_Ul(menuItem[x], secondLevelMenuUl);
}
function addItemToWikiaDropDown_Ul(menuItem, secondLevelMenuUl){
	var newMenuItem = document.createElement("li");
	newMenuItem.innerHTML='<a class="subnav-3a" href="' + menuItem[0] + '">' + menuItem[1] + '</a>';
	secondLevelMenuUl.appendChild(newMenuItem);
}
function addImageToWikiaDropDown_Li(image, width, wikiNavUl, topLevelNumber, secondLevelNumber, thirdLevelNumber, left){
	var dropdownItem = getWikiaNavDropDown_Ul(wikiNavUl, topLevelNumber, secondLevelNumber).getElementsByTagName("li")[0];
	var dropdownItem_A = dropdownItem.getElementsByTagName("a")[0];
 
	if(left){
		dropdownItem_A.innerHTML = '<img width="' + width + 'px" src="' + image + '" />' + dropdownItem_A.innerHTML;
	} else {
		var newMenuImage = document.createElement("img");
		newMenuImage.setAttribute('src', image);
		newMenuImage.setAttribute('width', width + 'px');
		dropdownItem_A.appendChild(newMenuImage);
	}
}
///////////////////////////////////////////////////
//               Rename Functions                //
///////////////////////////////////////////////////
function renameTopLevelMenuItem(newText, wikiNavUl, topLevelNumber){
	var topLevelMenuLi = getWikiaNavTopLevel_Li(wikiNavUl, topLevelNumber);
	var topLevelMenuLi_A = topLevelMenuLi.getElementsByTagName("a")[0].innerHTML = newText;
}
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // addArrayToWikiaNav   -- A function that adds a menu item to Wikia's Expanded Wiki Navigation       //
  // by jgjake2                                                                                         //
  // Inputs:                                                                                            //
  //    topMenuItem       -- An array input that defines the URL and Text of the top level menu item    //
  //                         being added.                                                               //
  //                         var topMenu = ['URL', 'Text']                                              //
  //    menuItemsArray    -- A 3-D array input that defines the URL and Text of the second and third    //
  //                         level menu items being added. The first element in each drop-down menu's   //
  //                         array defines the second level menu item. The remaining items define the   //
  //                         third level menu items that appear in the drop-down menu.                  //
  //                         var menu = [                                                               //
  //                             [                                                                      //
  //                                  ['URL', 'Second Level Item 1'],                                   //
  //                                  ['URL', 'Sub Item 1'],                                            //
  //                                  ['URL', 'Sub Item  2'],                                           //
  //                                  ['URL', 'Sub Item  3']                                            //
  //                             ],                                                                     //
  //                             [                                                                      //
  //                                  ['URL', 'Second Level Item 2'],                                   //
  //                                  ['URL', 'Sub Item 1'],                                            //
  //                                  ['URL', 'Sub Item  2'],                                           //
  //                                  ['URL', 'Sub Item  3']                                            //
  //                             ],                                                                     //
  //                             [                                                                      //
  //                                  ['URL', 'Second Level Item 3'],                                   //
  //                                  ['URL', 'Sub Item 1'],                                            //
  //                                  ['URL', 'Sub Item  2'],                                           //
  //                                  ['URL', 'Sub Item  3']                                            //
  //                             ]                                                                      //
  //                         ];                                                                         //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  function addArrayToWikiaNav_TopLevel(topMenuItem, menuItemsArray){                                    //
      if(getUrlVars()["action"] == "edit") return;                                                      //
      var wikiNav = document.body.getElementsByTagName("nav")[1];                                       //
      var wikiNavUl = wikiNav.getElementsByTagName("ul")[0];                                            //
	  wikiNav.style.width="630px";                                                                      //
      addArrayToWikiaNavUl_TopLevel(topMenuItem, menuItemsArray, wikiNavUl);                            //
  }                                                                                                     //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // addArrayToWikiaNavUl -- A function that adds a menu item to Wikia's Expanded Wiki Navigation       //
  // by jgjake2                                                                                         //
  // Inputs:                                                                                            //
  //    topMenuItem       -- see addArrayToWikiaNav                                                     //
  //    menuItemsArray    -- see addArrayToWikiaNav                                                     //
  //    wikiNavUl         -- An element input that defines the unordered list (ul) inside Wikia's       //
  //                         Expanded Wiki Navigation. Use 'addArrayToWikiaNav' to  get value and call  //
  //                         this function.                                                             //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  function addArrayToWikiaNavUl_TopLevel(topMenuItem, menuItemsArray, wikiNavUl){
      var newNavMenuItem = document.createElement("li"); // Create the new menu item
      var newNavMenuItem_HTML = '<a href="' + topMenuItem[0] + '">' + topMenuItem[1] + '</a><ul class="subnav-2 accent" style="visibility: visible; display: none;">'; // Add the first level menu item
      for (x in menuItemsArray){
          for (y in menuItemsArray[x]){
              if(y == 0){ // If it is the first item in the array make sure it uses the correct classes
                  newNavMenuItem_HTML += '<li><a class="subnav-2a" href="' + menuItemsArray[x][y][0] + '">' + menuItemsArray[x][y][1];
				  if(menuItemsArray[x].length > 1) newNavMenuItem_HTML += '<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul class="subnav subnav-3" style="display: none;">'; // If it has subitems, add the down arrow icon, and add a third level list
                  else newNavMenuItem_HTML += '</a></li>'; // if it is the only item in the list close the li
              } else {
                  newNavMenuItem_HTML += '<li><a class="subnav-3a" href="' + menuItemsArray[x][y][0] + '">' + menuItemsArray[x][y][1] + '</a></li>';
                  if(menuItemsArray[x].length - 1 <= y) newNavMenuItem_HTML += '</ul></li>'; // If it is the last element in the array, close the unsorted list and the second level menu item
              }
          }
      }
      newNavMenuItem.innerHTML = newNavMenuItem_HTML + '</ul>'; // Close the list
      wikiNavUl.appendChild(newNavMenuItem); // Add it to the menu
  }
 
  function addArrayToWikiaNav_SecondLevel(menuItemsArray, topLevelNumber){
      if(getUrlVars()["action"] == "edit") return;
	  var wikiNavUl = getWikiNavUl();
      var topMenuElementUl = getWikiaNavTopLevel_Ul(wikiNavUl, topLevelNumber);
      addArrayToWikiaNavUl_SecondLevel(menuItemsArray, topMenuElementUl);
  }
 
  function addArrayToWikiaNavUl_SecondLevel(menuItemsArray, topMenuElementUl){
      var newNavMenuItem = document.createElement("li"); // Create the new menu item
	  var newNavMenuItem_HTML = '<a class="subnav-2a" href="' + menuItemsArray[0][0] + '">' + menuItemsArray[0][1];
	  if(menuItemsArray.length > 1) {
          newNavMenuItem_HTML += '<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul class="subnav subnav-3" style="display: none;">'; // If it has subitems, add the down arrow icon, and add a third level list
              for (x in menuItemsArray){
                  if(x != 0){
                      newNavMenuItem_HTML += '<li><a class="subnav-3a" href="' + menuItemsArray[x][0] + '">' + menuItemsArray[x][1] + '</a></li>';
				      if(menuItemsArray.length - 1 <= x) newNavMenuItem_HTML += '</ul></li>';
				  }
			  }
	  } else {
          newNavMenuItem_HTML += '</a></li>';
	  }
	  newNavMenuItem.innerHTML = newNavMenuItem_HTML;
      topMenuElementUl.appendChild(newNavMenuItem); // Add it to the menu
  }
///////////////////////////////////////////////////
//            End Fix Wiki Navigation            //
///////////////////////////////////////////////////
 

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

/****************************************/
/* Add Popup Script by User:Jgjake2     */
/****************************************/
importScriptPage('User:Jgjake2/js/ElderScrolls/Popups.js', 'deadisland');

/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              Maintenance, cleanup, style and bug fixes by Grunny ### */
/* ###              (http://community.wikia.com/wiki/User:Grunny)       ### */
/* ######################################################################## */
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Auto-refresh',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array ("Special:RecentChanges", "Special:WikiActivity", "Special:NewFiles");
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
   var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
   var appTo = ($('#WikiaPageHeader').length ) ? $('#WikiaPageHeader > h1') : $('.firstHeading');
 
   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
 
   $('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).show();
      }
   } ).ajaxComplete(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).hide();
         for(i in ajaxCallAgain) {
            ajaxCallAgain[i]();
         }
      }
   } );
 
   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);
 
   if (getCookie("ajaxload-" + wgPageName) == "on") {
      loadPageData();
   }
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC, function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () { 
	for ( x in ajaxPages ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );

/* ######################################################################## */
/* ######################################################################## */

document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');
    

// onload stuff
var firstRun = true;

function loadFunc()
{
    if(firstRun)
        firstRun = false;
    else
        return;

    initFunctionsJS();

    // DEPRECATED
    if(document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null)
    {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
    }

    addHideButtons();

    if(document.getElementById('mp3-navlink') != null)
    {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }

    if(window.storagePresent)
        initVisibility();

    rewriteSearchFormLink();
    fillEditSummaries();
    fillDeleteReasons();
    fillPreloads();

    substUsername();
    substUsernameTOC();
    rewriteTitle();
    showEras('title-eraicons');
    showEras('title-shortcut');
    rewriteHover();
    addAlternatingRowColors();
    // replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
    fixSearch();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if(!bodyClass || (bodyClass.indexOf('page-') == -1))
    {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if(typeof(onPageLoad) != "undefined")
    {
        onPageLoad();
    }
}

function infoboxToggle()
{
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;

    if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]')
    {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Show]';
        nowShown = false;
    }
    else
    {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
        nowShown = true;
    }

    if(window.storagePresent)
    {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
}

function fillEditSummaries()
{
    var label = document.getElementById("wpSummaryLabel");

    if(label == null)
        return;

    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;

    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange()
{
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
    {
		if(skin == 'monaco')
		{
			document.getElementById("wpSummaryEnhanced").value = value;
		}
		else
		{
			document.getElementById("wpSummary").value = value;
		}
    }
}

function fillDeleteReasons()
{
    var label = document.getElementById("wpReason");

    if(label == null)
        return;

    label = document.getElementById("contentSub");

    if(label == null)
        return;

}

function onStdReasonChange()
{
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
        document.getElementById("wpReason").value = value;
}

function fillPreloads()
{
    var div = document.getElementById("lf-preload");

    if(div == null)
        return;

    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');

    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
    
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';

    requestComboFill('stdPreloads', "Template:Stdpreloads");
}

function doCustomPreload()
{
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}

function onPreloadChange()
{
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;

    if(value == "")
        return;

    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
}

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
var timers = $('span.countdowndate');
  var then = new Date($(timers.get(i) ).attr('eventdate'));
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
  // catch bad date strings
  if(isNaN(diff)) {
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = '';
  } else {
    var tpm = '';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() { 
//hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown'); 
$('span.nocountdown').css('display', 'none');
$('span.countdown').css('display', 'inline');
  timeouts = new Array(); // generic holder for the timeouts, global
 var timers = $('span.countdowndate');
if(timers.length == 0) return;
 
  for(var i = 0; i < timers.length; i++) {
    $(timers.get(i) ).attr('eventdate', new Date($(timers.get(i)).text()));
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************


// ============================================================
// BEGIN JavaScript title rewrite

function rewriteTitle()
{
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');

    if(titleDiv == null)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];

    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";

    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite

function initVisibility()
{
    var storage = globalStorage[window.location.hostname];

    var page = window.pageName.replace(/\W/g,'_');
    var show = storage.getItem('infoboxshow-' + page);

    if(show == 'false')
    {
        infoboxToggle();
    }
    
    var hidables = getElementsByClass('hidable');
    
    for(var i = 0; i < hidables.length; i++)
    {
        show = storage.getItem('hidableshow-' + i  + '_' + page);
        
        if(show == 'false')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display != 'none')
            {
                button[0].onclick('bypass');
            }
        }
        else if(show == 'true')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display == 'none')
            {
                button[0].onclick('bypass');
            }
        }
    }
}

function onArticleNavClick()
{
    var div = document.getElementById('mp3-nav');

    if(div.style.display == 'block')
        div.style.display = 'none';
    else
        div.style.display = 'block';
}

function addAlternatingRowColors()
{
    var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

    if(infoboxes.length == 0)
        return;

    for(var k = 0; k < infoboxes.length; k++)
    {
        var infobox = infoboxes[k];

        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;

        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].className.indexOf('infoboxstopalt') != -1)
                break;

            var ths = rows[i].getElementsByTagName('th');

            if(ths.length > 0)
            {
                continue;
            }

            if(changeColor)
                rows[i].style.backgroundColor = '#f9f9f9';

            changeColor = !changeColor;
        }
    }
}

function addHideButtons()
{
    var hidables = getElementsByClass('hidable');
    
    for(var i = 0; i < hidables.length; i++)
    {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');
        
        if(button != null && button.length > 0)
        {
            button = button[0];
            
            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Hide]'));

            if(new ClassTester('start-hidden').isMatch(box))
                button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage)
{
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;
    
    if(content != null && content.length > 0)
    {
        content = content[0];
        
        if(content.style.display == 'none')
        {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        }
        else
        {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
            nowShown = false;
        }
        
        if(window.storagePresent && (typeof(bypassStorage) == 'undefined' || bypassStorage != 'bypass'))
        {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;
            
            for(var i = 0; i < items.length; i++)
            {
                if(items[i] == parent)
                {
                    item = i;
                    break;
                }
            }
            
            if(item == -1)
            {
                return;
            }
        
            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

function substUsernameTOC()
{
    var toc = document.getElementById('toc');
    var userpage = document.getElementById('pt-userpage');
    
    if(!userpage || !toc)
        return;
        
    var username = userpage.firstChild.firstChild.nodeValue;
    var elements = getElementsByClass('toctext', toc, 'span');

    for(var i = 0; i < elements.length; i++)
        elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}

// this was moved to Monobook.js --TOR <tor@wikia-inc.com>
function replaceSearchIcon() {
    return;
}

function rand(n)
{
    return Math.round(Math.random() * n);
}

// Reskin parser script from [[Uncyclopedia:MediaWiki:Uncyclopedia.js]]
skinjs = {
    "Logout": "Logout.js"
}

var re = RegExp("(.*) - The Elder Scrolls Wiki");
var matches = re.exec(document.title);

var skinNamejs;

if (matches) {
    if (skinjs[matches[1]] != undefined) {
        skinNamejs = (skinjs[matches[1]].length > 0) ? skinjs[matches[1]] : matches[1] + '.js';
        document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Skin/' + skinNamejs + '&action=raw&ctype=text/javascript"></script>');
    }
}

function fixSearch()
{
    var button = document.getElementById('searchSubmit');

    if(button)
        button.name = 'go';
}

//addOnloadHook(loadFunc);

YAHOO.util.Event.onDOMReady(loadFunc);


//Link FA

var FA_enabled  = true;

function addfaicon() {
    // if disabled
    if (!FA_enabled) return;
    var pLang = document.getElementById("p-lang");
    if (!pLang) return;
    var lis = pLang.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        // only links with a corresponding Link_FA template are interesting
        if (!document.getElementById(li.className + "-fa"))   continue;
        // additional class so the template can be hidden with CSS
        li.className += " FA";
        // change title (mouse over)
        li.title = "This article is rated as featured article.";
    }
}
addOnloadHook(addfaicon);


// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
/** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );

/* Script that allows pagetitle changes and pagetitle custom alignment
   Requires copying Template:Title. */
 
// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// by Sikon
//
// The script was found incompatable when imported as other scripts are
// =====================================================================
 
function rewriteTitle() {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    // For the title in the Monaco masthead
    if (skin == "monaco" && (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk")) {
        var mastheadUser = document.getElementById("user_masthead_head");
        var mastheadSince = document.getElementById("user_masthead_since");
 
        var titleString = '<h2>' + titleDiv.innerHTML;
        titleString += '<small id="user_masthead_since">' + mastheadSince.innerHTML;
        titleString += '</small></h2>';
 
        mastheadUser.innerHTML = titleString;
    } else {
        var cloneNode = titleDiv.cloneNode(true);
        var firstHeading = $('h1.firstHeading').get(0);
        var node = firstHeading.childNodes[0];
 
        // new, then old!
        firstHeading.replaceChild(cloneNode, node);
        cloneNode.style.display = "inline";
 
        var titleAlign = document.getElementById('title-align');
        firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
    }
}
addOnloadHook(rewriteTitle, false);

// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});


/* End of the JavaScript title rewrite/alignment */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               Wikipedia:NavFrame.
 *  Maintainers: User:R. Koot
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );

    if ( !Table || !Button ) {
        return false;
    }

    var Rows = Table.getElementsByTagName( "tr" ); 

    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore( Button, Header.childNodes[0] );
                tableIndex++;
            }
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        }
    }
}
addOnloadHook( createCollapseButtons );

//Ajax autorefresh door "pcj" van WoWwiki
var ajaxPages = [":Wikia discussies", "Speciaal:Volglijst", "Speciaal:Logboeken", "Speciaal:Bijdragen", "Speciaal:RecenteWijzigingen", "Forum:Index", "Speciaal:WikiActivity"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');