// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';

/**
 * Add a css class to user tags based on the tag's text
 */
(function () {
    // Don't run on pages w/o a masthead
    if (!$('#userProfileApp').length) return;

    // Wait until the masthead loads
    const interval = setInterval(function () {
        if ($('#userProfileApp').length) {
            clearInterval(interval);
            // Get all the tags
            const userTags = document.querySelectorAll('.user-identity-header__tag');

            // For each tag add a class equal to
            // 'user-identity-header__tag--' + lowercased tag text
            userTags.forEach(function (tag) {
                tag.classList.add(
                    'user-identity-header__tag--' + tag.textContent.toLowerCase().replace(' ', '-')
                );
            });
        }
    }, 1000);
})();

// adds show/hide-button to navigation bars
function createDivToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "DivFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'DivToggle';
            NavToggle.setAttribute('id', 'DivToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleDiv(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
 
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'DivContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
 
 
            var NavToggleText = document.createTextNode(isCollapsed ? DivShowTxt : DivHideTxt);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "DivHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'DivFrame' + indexNavigationBar);
        }
    }
}
 
$( createDivToggleButton );