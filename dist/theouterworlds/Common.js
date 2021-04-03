/* Any JavaScript here will be loaded for all users on every page load. */

/* ##################################################################################### */
/* ### Notable content                                                               ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Description: Create a collapsible template where mw-collapsable is not        ### */
/* ###              suitable to use.                                                 ### */
/* ### URL: https://fallout.fandom.com/wiki/Fallout_Wiki:Notable_content/draft       ### */
/* ### Credit:      User:Sakaratte                                                   ### */
/* ##################################################################################### */
 
/*Initialise variables */
var helipInitialise = document.getElementsByClassName('np-helip');
 
/* Remove duplicate id's from article */
for (i=0; i < helipInitialise.length; ++i)
    {
        var newHelip = "np-helip" + i;
        var newCollapse = "np-Collapsed" + i;
    document.getElementById("np-helip").setAttribute("onclick", 'npCollapsible("' + newHelip + '", "' + newCollapse + '")');
    document.getElementById("np-helip").innerHTML = "More";
    document.getElementById("np-collapsed").id = newCollapse;
    document.getElementById("np-helip").id = newHelip;
    }
 
/* Switches collapsible content between hidden and visible */
function npCollapsible (helipName, collapseName) {
    var collapseCaption = "Less";
    var expandCaption = "More";
 
    navState = document.getElementById(helipName).innerHTML;
    navClass = document.getElementById(collapseName).classList;
    if (navState == expandCaption) {
        navClass.add("np-visible");
        navClass.remove("np-hidden");
        document.getElementById(helipName).innerHTML = collapseCaption;
    } else {
        navClass.remove("np-visible");
        navClass.add("np-hidden");
        document.getElementById(helipName).innerHTML = expandCaption;
    }
}

/* ##################################################################################### */
/* ### Create New Page Target Fix                                                    ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Description: Prevents article layout template preloading in a new window.     ### */
/* ###                                                                               ### */
/* ###                                                                               ### */
/* ### Credit:      User:Sakaratte                                                   ### */
/* ##################################################################################### */
 

var customNewArticle = document.getElementById('custom-new-article-text');
if (customNewArticle !== null) {
	var articleLinks = customNewArticle.getElementsByTagName('a');
	var i; for (i=0; i < articleLinks.length; i++) {
		articleLinks[i].removeAttribute('target');
	}
}