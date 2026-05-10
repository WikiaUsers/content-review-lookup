/* Any JavaScript here will be loaded for all users on the FandomDesktop skin. */

$(document).ready(function () {
    tabberTab = document.querySelectorAll('div.tabber div.wds-tab__content');
    tabberNav = document.querySelectorAll('div.tabber ul.wds-tabs li');
 
    var changeTab = function( event ) {
    	var selectedNav = null;
        var selectedTab = null;
        var otherTabs = [];
		var title = this.title.replace(/ /g,"_");
		
        for (i = 0; i < tabberNav.length; ++i) {
            if (tabberNav[i].getAttribute('data-hash') == title) {
		        selectedNav = tabberNav[i];
        		selectedTab = $(tabberNav[i].parentNode.parentNode).siblings("div")[i];
    			break ;
            }
        }
        
		otherTabs = $(selectedNav).siblings("li");
        for (i = 0; i <otherTabs.length; ++i) {
            if (otherTabs[i].classList.contains("wds-is-current")) {
                $(otherTabs[i]).toggleClass("wds-is-current");
            }
        }
        
        if (selectedNav.classList.contains("wds-is-current") === false) {
            $(selectedNav).toggleClass("wds-is-current");
        }
        
        window.scrollBy(0, -1);
        window.scrollBy(0, 1);
 
        otherTabs = $(selectedTab).siblings("div");
        for (i = 0; i <otherTabs.length; ++i) {
            if (otherTabs[i].classList.contains("wds-is-current")) {
                $(otherTabs[i]).toggleClass("wds-is-current");
            }
        }
        
        if (selectedTab.classList.contains("wds-is-current") === false) {
            $(selectedTab).toggleClass("wds-is-current");
        }
    };
 
    imagesTabber = document.getElementsByClassName('imageTabber');
    for (j = 0; j < imagesTabber.length; ++j) {
        var images = imagesTabber[j].getElementsByTagName("a");
 
        for (i = 0; i < images.length; ++i) {
            images[i].addEventListener("click", changeTab);
        }
    }
});