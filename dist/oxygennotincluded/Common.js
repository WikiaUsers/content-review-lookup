/* Any JavaScript here will be loaded for all users on every page load. */

// ---------------------------------------------------------------------------------------------------------------
//
// Hello World script for very first testing purpose
//
// ---------------------------------------------------------------------------------------------------------------

var helloWorldFailSafe = document.getElementById('mw-hello-world');
if (helloWorldFailSafe) {
    var myElement = document.getElementById('mw-hello-world');
    myElement.innerHTML = '<html>Hello World!!!</html>';
}


// ---------------------------------------------------------------------------------------------------------------
//
// Custom Tabber for the Buildings Navigation Footer
// This was made following the tutorial by Matt Doyle from Elated Communications Ltd.
// The tutorial can be found here: https://www.elated.com/javascript-tabs/
//
// ---------------------------------------------------------------------------------------------------------------
// global variables for the Building Tabber
var tabCategories = new Array();
var tabCategoriesText = new Array();
var tabGameVersions = new Array();
var contentLogic = "contentBase";
var shownCategory = "";

// Initialize the tabber for the categories
function initCategoryTabber() 
{
    // break out if on a page without 'categorytabber' to prevent errors on other pages
    var categorytabber = document.getElementById('uppertabber');
    if (!categorytabber) return;

    // grab the Categorys from the # links in the Template where this page is called from
    // not having it predefined allows adding new categories later
    // This is mostly futureproofing if other DLC's add new categories
    // similar to how Radiation was added with the Spaced Out DLC
    // however, the # links need to be named the same as the CargoQuery invokes 
    // the Categories in questions can be found here: Special:CargoTables/Buildings
    var tabBuildingItems = categorytabber.childNodes;
    for (var i = 0; i < tabBuildingItems.length; i++) 
    {
        if (tabBuildingItems[i].nodeName == "LI") 
        {
            // for the Images
            var category = getFirstChildWithTagName(tabBuildingItems[i], 'A');
            var id = getName(category.getAttribute('href'));
            tabCategories[id] = category;

            // for the Text underneath
            category = getSecondChildWithTagName(tabBuildingItems[i], 'A');
            id = getName(category.getAttribute('href'));
            tabCategoriesText[id] = category;
        }
    }
    categorytabber = document.getElementById('lowertabber');
    if (!categorytabber) return;

    // grab the Categorys from the # links in the Template where this page is called from
    // not having it predefined allows adding new categories later
    // This is mostly futureproofing if other DLC's add new categories
    // similar to how Radiation was added with the Spaced Out DLC
    // however, the # links need to be named the same as the CargoQuery invokes 
    // the Categories in questions can be found here: Special:CargoTables/Buildings
    var tabBuildingItems = categorytabber.childNodes;
    for (var i = 0; i < tabBuildingItems.length; i++) 
    {
        if (tabBuildingItems[i].nodeName == "LI") 
        {
            // for the Images
            var category = getFirstChildWithTagName(tabBuildingItems[i], 'A');
            var id = getName(category.getAttribute('href'));
            tabCategories[id] = category;

            // for the Text underneath
            category = getSecondChildWithTagName(tabBuildingItems[i], 'A');
            id = getName(category.getAttribute('href'));
            tabCategoriesText[id] = category;
        }
    }


    // Assign onclick events to each of those # links
    var i = 0;
    for (var id in tabCategories) 
    {
        tabCategories[id].onclick = selectCategory;
        tabCategoriesText[id].onclick = selectCategory;
        i++;
    }

    // and call refresh_Buildings() once to set the output
    refreshBuildings;
}

function selectCategory() 
{
    // get which Category was clicked
    var selectedId = getName(this.getAttribute('href'));

    // run through all Categories    
    for (var id in tabCategories) 
    {
      if (id == selectedId) 
      {
          // toogle the clicked one from 'selected' to nothing or nothing to 'selected'
          if (tabCategories[id].className == 'selected') 
          {
              tabCategories[id].className = '';
              tabCategoriesText[id].className = '';
          } else 
          {
              tabCategories[id].className = 'selected';
              tabCategoriesText[id].className = 'selected';
          }
      }
      // turn all other categories off
      else
      {
        tabCategories[id].className = '';
        tabCategoriesText[id].className = '';
      }
    }
    // css will handle the change in appearance for all that are then the class 'selected'


    // change the category that is displayed to the currently selected, or turn it off
    if (tabCategories[selectedId].className == 'selected') 
    {
        shownCategory = selectedId;
    } else 
    {
        shownCategory = "";
    }

    // refresh after it's done
    refreshBuildings();

    // Stop the browser following the link
    return false;
}

function initGameVersionToogler() 
{
    // break out if on a page without 'DLC-toogle' to prevent errors on other pages
    var DLCtoogle = document.getElementById('DLC-toogle');
    if (!DLCtoogle) return;

    // similar to initCategoryTabber
    // as this is written there is only one DLC (Spaced Out!)
    // so, again, this is mostly futureproofing if new DLC's get added to the game
    // so this javascript doesn need to be changed, no matter how many DLCs are added
    // can I hava a hooray for easier maintenance and lazyness?
    // again, the # links need to be named the same as the CargoQuery invokes (like contentBase and contentSO)
    // as opposed to the Building category ( which are all in the same column of "Category")
    // these are stored as boolean variables as a yes/no there (MediaWiki uses yes/no instead of true/false)
    // but each DLC has a yes/no statement if it's in this particular version of the game
    // the cargo table for it can be found as: Special:CargoTables/Buildings
    var tabBuildingDLC = DLCtoogle.childNodes;
    for (var i = 0; i < tabBuildingDLC.length; i++) 
    {
        if (tabBuildingDLC[i].nodeName == "LI") 
        {
            var GameVersion = getFirstChildWithTagName(tabBuildingDLC[i], 'A');
            var id = getName(GameVersion.getAttribute('href'));
            tabGameVersions[id] = GameVersion;
        }
    }

    // Assign onclick events to each of those # links
    var i = 0;
    for (var id in tabGameVersions) 
    {
        tabGameVersions[id].onclick = selectDLC;
        i++;
    }

    // and call refresh_Buildings() once to set the output
    refreshBuildings();
}

function selectDLC() 
{
    // get which DLC was clicked
    var selectedId = getName(this.getAttribute('href'));

    // run through all Game Versions
    for (var id in tabGameVersions) 
    {
        if (id == selectedId) 
        {
            if (tabGameVersions[id].className == 'active') 
            {
                tabGameVersions[id].className = '';
            } else 
            {
                tabGameVersions[id].className = 'active';
            }
        }
    }

    // refresh after it's done
    refreshBuildings();

    // Stop the browser following the link
    return false;
}

// Image is (or should be) the first child node, so return the first found
function getFirstChildWithTagName(element, tagName) 
{
    // for to check all childNodes
    for (var i = 0; i < element.childNodes.length; i++) 
    {
        // if the childNode is a link (tagname is 'A')
        if (element.childNodes[i].nodeName == tagName) 
        {
            //return that child node
            return element.childNodes[i];
        }
    }
}

// Text is (or should be) the second child node, so ignore the first found and return the second
function getSecondChildWithTagName(element, tagName)
{
    var counter = 0;
    // for to check all childNodes
    for (var i = 0; i < element.childNodes.length; i++)
    {
        // if the childNode is a link (tagname is 'A')
        if (element.childNodes[i].nodeName == tagName)
        {
            // if the counter has advanced
            if (counter > 0)
            {
                //return that child node
                return element.childNodes[i];
            }
            // otherwise advance the counter
            counter++;        
        }
    }
}

// get Name of a Category or GameVersion by looking at the link and removing th #
function getName(url)
{
    var hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
}

// refresh the output
function refreshBuildings() 
{
    // something needs to be shown if it's not in the base game but in ANY selected DLC 
    // condition 1 = NOT contentBase AND (content DLC1 OR contentDLC2 OR contentDLC3)
    // something needs to be hidden if it's disabled in ANY selected DLC (like base game Versions of Rocket Parts)
    // condition 2 = contentBase AND contentDLC1 AND contentDLC2 AND contentDLC3

    // number of DLCs active
    var numbDLCactive = 0;
    for (var id in tabGameVersions) 
    {
        if (tabGameVersions[id].className == 'active') 
        {
            numbDLCactive++;
        }
    }

    // only contentBase if no DLC selected
    contentLogic = "contentBase";

    // only contentDLC if only one DLC is selected
    if (numbDLCactive == 1) 
    {
        for (var id in tabGameVersions) 
        {
            if (tabGameVersions[id].className == 'active') 
            {
                contentLogic = id;
            }
        }
    }
    
    // more complex logic if more than one DLC is selected
    if (numbDLCactive > 1) 
    {
        numbDLCactive = 0;
        var condition = "";
        for (var id in tabGameVersions)
        {
            if (tabGameVersions[id].className == 'active') 
            {
            if (numbDLCactive != 0)
                condition += " AND "
                condition += id;
                numbDLCactive++;
            }
        }
        contentLogic = "( NOT contentBase AND ("  +  condition  +  " ) ) OR ( contentBase AND ( "   +   condition   +    ") )";
        // example: ( NOT contentBase AND (contentSO AND contentDLC2 ) ) OR ( contentBase AND ( contentSO AND contentDLC2 ) )
        //             this displays all DLC buildings                       this displays all contentBase not disabled by contentSO
    
    }
    // if no Category is selected, don't show anything
    if (shownCategory == "") 
    {
        document.getElementById("mw-show-building-category").innerHTML = "none";
        document.getElementById("mw-show-game-versions").innerHTML = "contentBase AND NOT contentBase";
    }
    else {
        document.getElementById("mw-show-building-category").innerHTML = shownCategory;
        document.getElementById("mw-show-game-versions").innerHTML = contentLogic;
    }
    return;
}

// ---------------------------------------------------------------------------------------------------------------
//
// Implementation of the different javascripts
//
// ---------------------------------------------------------------------------------------------------------------

$(function ()
{
    // Tabber for the Buildings Footer, switch between categories and toogling DLC content 
    initCategoryTabber();
    initGameVersionToogler();
});