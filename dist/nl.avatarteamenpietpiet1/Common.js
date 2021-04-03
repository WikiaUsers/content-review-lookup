//renameTopLevelMenuItem('Testing', wikiNavUl, 1);
 
	//if(checkCookie('wikicitiesUserName', 'Jgjake2')) {
	if(getUrlVars()["test"] == "2"){
		addImageToWikiaDropDown_Li('http://images3.wikia.nocookie.net/__cb6/deadisland/images/8/89/Wiki-wordmark.png', '30', wikiNavUl, 2, 2, 2, true);
	}
}
 
function addPCModsMenu(wikiNavUl){
	var menu0 = ['/wiki/GameFiles:Mods_and_Tweaks', 'PC Mods'];
	var menu1 = [
		['/wiki/GameFiles:Mods_and_Tweaks/How_To_Mod_Dead_Island', 'How To Mod Dead Island']
	];
	var menu2 = [
		['/wiki/GameFiles:Mods_and_Tweaks#Character_Mods', 'Character Mods'],
		['/wiki/GameFiles:Mods_and_Tweaks/Carry_Food_Mod', 'Carry Food Mod'],
		['/wiki/GameFiles:Mods_and_Tweaks/Human_Level_Cap_Mod', 'Human Level Cap Mod'],
		['/wiki/GameFiles:Mods_and_Tweaks/Max_Stack_Mod', 'Max Stack Mod']
	];
	var menu3 = [
		['/wiki/GameFiles:Mods_and_Tweaks#Game_Tweaks', 'Game Tweaks'],
		['/wiki/GameFiles:Mods_and_Tweaks/Auto-Equip_Fix_Mod', 'Auto-Equip Fix Mod'],
		['/wiki/GameFiles:Mods_and_Tweaks/Character Jump Mod', 'Character Jump Mod'],
		['/wiki/GameFiles:Mods_and_Tweaks/Enable Chat With Xbox 360 Controller', 'Enable Chat With Xbox 360 Controller'],
		['/wiki/GameFiles:Mods_and_Tweaks/Exploding_Meat_Mod', 'Exploding Meat Mod'],
		['/wiki/GameFiles:Mods_and_Tweaks/Low_Gravity_Mod', 'Low Gravity Mod'],
		['/wiki/GameFiles:Mods_and_Tweaks/Zombie Level Cap Mod', 'Zombie Level Cap Mod']
	];
	var menu4 = [
		['/wiki/GameFiles:Mods_and_Tweaks#HUD_Mods', 'HUD Mods'],
		['/wiki/GameFiles:Mods_and_Tweaks/Stop_Health_%26_Weapon_Fade', 'Stop Health & Weapon Fade'],
		['/wiki/GameFiles:Mods_and_Tweaks/Triple_Monitor_Support_Mod', 'Triple Monitor Support Mod']
	];
	var menuItemsArray = [menu1, menu2, menu3, menu4];
	addArrayToWikiaNavUl_TopLevel(menu0, menuItemsArray, wikiNavUl);
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
	for (x in menuItem) addItemToWikiaSecondLevelMenu(menuItem[x], topLevelMenuUl);
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
	//http://images3.wikia.nocookie.net/__cb6/deadisland/images/8/89/Wiki-wordmark.png
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
                  //if(menuItemsArray[x].length > 1) newNavMenuItem_HTML += '<img class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></a><ul class="subnav subnav-3" style="top: 28px; display: none;">'; // If it has subitems, add the down arrow icon, and add a third level list
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
	  //newNavMenuItem.getElementsByTagName("ul")[0].setAttribute('display', "none");
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
addOnloadHook(fixWikiaMenu);
//fixWikiaMenu();
 
// End of Menu Functions