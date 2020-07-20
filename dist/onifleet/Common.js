/* Any JavaScript here will be loaded for all users on every page load. */
/****************************************************
/* Tabs, a modification of NavFrames from Wikipedia *
/****************************************************/

// looks for and initiates setup of all outer tab containers on the page
function setupTabContainers()
{
    var containerIndex = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");

    for ( var i = 0; i < divs.length; i++ ) 
    {
        var div = divs[i];

        // if found a tab container
        if (hasClass(div, "tabs")) 
        {
            containerIndex++;
            setupTabContainer(div, containerIndex);
        }
    }
}

// sets up a tab container
function setupTabContainer(outerContainer, containerIndex)
{
    // start out by getting the individual tab contents, the (empty) tab bar, and the inner container
    var tabBar;
    var innerContainer;
    var tabContents = new Array();
    for(var i = 0; i < outerContainer.childNodes.length; i++) 
    {
        if (hasClass(outerContainer.childNodes[i], "tabBar")) 
        {
            tabBar = outerContainer.childNodes[i];
        }
        if (hasClass(outerContainer.childNodes[i], "tabContainer")) 
        {
            innerContainer = outerContainer.childNodes[i];
            for (var j = 0; j < innerContainer.childNodes.length; j++)
            {
                if (hasClass(innerContainer.childNodes[j], "tabContent")) 
                {
                    tabContents.push(innerContainer.childNodes[j]);
                }
            }
        }
    }

    // now, generate the tabs, collapse the contents, and hide all but the first tab
    var tabLabel;
    var largestWidth = 0;
    var largestHeight = 0;
    for (var i = 0; i < tabContents.length; i++)
    {
        //get the label, hide it, use its text to construct its tab
        for (var j = 0; j < tabContents[i].childNodes.length; j++)
        {
            tabLabel = tabContents[i].childNodes[j];
            if (hasClass(tabLabel, "tabLabel"))
            {
                tabLabel.style.display = 'none';
                largestWidth = Math.max(largestWidth, tabContents[i].offsetWidth + tabContents[i].offsetLeft);
                largestHeight = Math.max(largestHeight, tabContents[i].scrollHeight + tabContents[i].offsetTop);

                var tab = document.createElement("span");
                tab.className = 'tab';
                tab.setAttribute('id', 'tab' + containerIndex + '_' + i);
                
                var tabLink = document.createElement("a");
                tabLink.setAttribute('href', 'javascript:showTab(' + containerIndex + ', ' + i + ', ' + tabContents.length + ');');

                var tabText = document.createTextNode(tabLabel.innerHTML);
                tabLink.appendChild(tabText);

                tab.appendChild(tabLink);

                tabBar.appendChild(tab);
                break;
            }
        }

        //now, position the contents, and if not the first tab, hide them
        innerContainer.style.width = largestWidth + 'px';
        innerContainer.style.height = largestHeight + 'px';
        tabContents[i].setAttribute('id', 'tabContent' + containerIndex + '_' + i);
        tabContents[i].style.position = 'absolute';
        tabContents[i].style.left = '1px';
        tabContents[i].style.top = '1px';
        if (i != 0)
        {
            tabContents[i].style.visibility = 'hidden';
        }
        else
        {
           addClass(tab, 'selectedTab');
        }
    }

    //show the tab bar
    tabBar.style.display = '';
}

function showTab(containerIndex, tabIndex, tabCount)
{
    var tabContentToHide;
    for (i = 0; i < tabCount; i++)
    {
        if (i != tabIndex)
        {
            tabContentToHide = document.getElementById('tabContent' + containerIndex + '_' + i);
            tabContentToHide.style.visibility = 'hidden';
            tabToDeselect = document.getElementById('tab' + containerIndex + '_' + i);
            removeClass(tabToDeselect, 'selectedTab');
        }
    }

    var tabContentToShow = document.getElementById('tabContent' + containerIndex + '_' + tabIndex);
    tabContentToShow.style.visibility = '';
    var tabToSelect = document.getElementById('tab' + containerIndex + '_' + tabIndex);
    addClass(tabToSelect, 'selectedTab');
}
 
$(window).load( setupTabContainers );