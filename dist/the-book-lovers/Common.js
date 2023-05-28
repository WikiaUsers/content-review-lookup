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


//purging
(function dailyPurge() {
  // Check if the required MW modules are loaded
  if (typeof mw === 'undefined' || !mw.loader || !mw.loader.using) {
    console.error('Unable to load the necessary MW modules.');
    return;
  }

  // Check if the page needs to be purged
  function checkPagePurge(Blog:Staff_Blog_Posts) {
    // Get the last purge time of the page via API
    var api = new mw.Api();
    api.get({
      action: 'query',
      prop: 'revisions',
      titles: Blog:Staff_Blog_Posts,
      rvprop: 'timestamp',
      formatversion: 2
    }).done(function(data) {
      var revisions = data.query.pages[0].revisions;
      if (revisions.length > 0) {
        var lastPurgeTime = new Date(revisions[0].timestamp).getTime();
        var currentTime = Date.now();

        if (!lastPurgeTime || (currentTime - lastPurgeTime) >= 86400000) {
          // Purge the page
          purgePage(Blog:Staff_Blog_Posts);
        }
      }
    }).fail(function(xhr, status, error) {
      // Display an error message
      console.error('Failed to retrieve page information: ' + Blog:Staff_Blog_Posts + ' - ' + error);
    });
  }

  // Purge the page
  function purgePage(Blog:Staff_Blog_Posts) {
    // Construct the URL for purging the page
    var purgeUrl = mw.util.getUrl(Blog:Staff_Blog_Posts, { action: 'purge' });

    // Send an AJAX request to purge the page
    $.ajax({
      url: purgeUrl,
      type: 'GET',
      success: function(data) {
        // Display a success message
        console.log('Page purged successfully: ' + Blog:Staff_Blog_Posts);
      },
      error: function(xhr, status, error) {
        // Display an error message
        console.error('Failed to purge page: ' + Blog:Staff_Blog_Posts + ' - ' + error);
      }
    });
  }

  // Usage: Call the checkPagePurge function with the desired page title
  checkPagePurge('Blog:Staff_Blog_Posts');
})();