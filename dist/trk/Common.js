importScriptPage('ShowHide/code.js', 'dev');
/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

//--------------------------------------

function updateDivBackgroundColor() {
            var div = document.getElementById('comic-disambiguation');
            var body = document.body;

            if (body.classList.contains('dark-theme')) {
                div.style.backgroundColor = 'red';
                div.style.color = 'white';
            } else {
                div.style.backgroundColor = 'yellow';
                div.style.color = 'black';
            }
        }

        // Set up a MutationObserver to watch for changes to the body's class
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    updateDivBackgroundColor();
                }
            });
        });

        // Start observing the body element for class changes
        observer.observe(document.body, { attributes: true });

        // Initial check to set the correct background color
        document.addEventListener('DOMContentLoaded', function() {
            updateDivBackgroundColor();
        });
        
//--------------------------------------