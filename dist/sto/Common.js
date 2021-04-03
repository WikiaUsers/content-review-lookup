/********************
/* Shared functions *
/********************/

/* Test if an element has a certain class */
 
var hasClass = (function () 
{
    var reCache = {};
    return function (element, className) 
    {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

function removeClass(element, className) 
{
    var regExp = new RegExp( '(\\s|^)' + className + '(\\s|$)' );
    element.className = element.className.replace( regExp, ' ' );
}

function addClass(element, className) 
{
    if ( element.className == '' ) 
    {
        element.className = className;
    }
    else
    {
        element.className += ' ' + className;
    }
}

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

/*****************************************************************************************
/* Generic show and hide functionality: see Help:Show and hide for instructions on using *
/*****************************************************************************************/
function createToggleLinks ( ) {
  var containers = document.getElementsByClassName( 'showHideById' );
  for ( var i = 0; i < containers.length; ++i ) {
    var id = containers[i].id.split( '-' )[1];
    containers[i].innerHTML = 
      '[<a href="javascript:toggleVisibilityById( \'' + containers[i].id + 
      '\', \'' + id + '\' );">hide</a>]';
    if ( hasClass( containers[i], 'hideOnLoad' ) ) {
      toggleVisibilityById( containers[i].id, id );
    }
  }

  containers = document.getElementsByClassName( 'showHideByClass' );
  for ( var i = 0; i < containers.length; ++i ) {
    var className = containers[i].id.split( '-' )[1];
    containers[i].innerHTML = 
      '[<a href="javascript:toggleVisibilityByClass( \'' + containers[i].id + 
      '\', \'' + className + '\' );">hide</a>]';
    if ( hasClass( containers[i], 'hideOnLoad' ) ) {
      toggleVisibilityByClass( containers[i].id, className );
    }
  }
}

function toggleVisibilityById( linkid, id ) {
  var element = document.getElementById( id );
  toggleVisibility( linkid, element );
}

function toggleVisibilityByClass( linkid, className ) {
  if ( document.getElementsByClassName ) {
    // modern browser lets us do things the easy way
    var elements = document.getElementsByClassName( className );
    for ( var i = 0; i < elements.length; ++i ) {
      toggleVisibility( linkid, elements[i] );
    }
  } else {
    // cycle through all elements, less efficient but should work
    var elements = document.getElementsByTagName( '*' );
    for ( var i = 0; i < elements.length; ++i ) {
      if ( hasClass( elements[i], className ) ) {
        toggleVisibility( linkid, elements[i] );
      }
    }
  }
}

function toggleVisibility( linkid, element ) {
  var link = document.getElementById( linkid ).getElementsByTagName( 'a' )[0];
  if ( element.style.display == 'none' ) {
    element.style.display = '';
    link.innerHTML = 'hide';
  } else {
    element.style.display = 'none';
    link.innerHTML = 'show';
  }
}

$(document).ready( createToggleLinks );

$(function() {
	if (mw.config.get("wgUserName") != null) $("span.insertusername").html(mw.config.get("wgUserName"));
});