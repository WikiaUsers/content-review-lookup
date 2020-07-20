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
	/*document.body.getElementsByTagName("nav")[1].style.width="100%";*/
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
		['/wiki/The_Elder_Scrolls_Wiki:IRC', 'Chat with other editors'],
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
	  /*wikiNav.style.width="100%";   */                                                            //
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