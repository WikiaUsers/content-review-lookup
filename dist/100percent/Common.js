/* Preload Format For Blank Articles */
if (mw.config.get('wgAction') === 'edit' &&
    !document.getElementById('wpTextbox1').value) {

    var title = mw.config.get('wgTitle');
    var namespace = mw.config.get('wgNamespaceNumber');
    var isNewPage = document.getElementById('wpMinoredit') === null;

    if (isNewPage) {
        if (namespace === 0) {
            var isSubpage = title.indexOf('/') !== -1;

            if (isSubpage) {
                document.getElementById('wpTextbox1').value =
                    "{{Infobox DLC\n" +
                    "|missable_objectives_warning = \n" +
                    "|verified_list = \n" +
                    "}}\n\n" +
                    "==100% Requirements==\n" +
                    "{{Tasks|\n" +
                    "}}\n\n" +
                    "==Gallery==\n" +
                    "<gallery></gallery>\n\n" +
                    "==Checklist==\n";
            } else {
                document.getElementById('wpTextbox1').value =
                    "{{Infobox Game\n" +
                    "|franchise = \n" +
                    "|consoles = \n" +
                    "|genre = \n" +
                    "|developer = \n" +
                    "|publisher = \n" +
                    "|saveless_warning = \n" +
                    "|missable_objectives_warning = \n" +
                    "|verified_list = \n" +
                    "}}\n\n" +
                    "==100% Requirements==\n" +
                    "{{Tasks|\n" +
                    "}}\n\n" +
                    "==Gallery==\n" +
                    "<gallery></gallery>\n\n" +
                    "==Checklist==\n";
            }
        } else if (namespace === 112) {
            document.getElementById('wpTextbox1').value =
                "{{Infobox Guide}}\n\n";
        }
    }
}

/* Topicon Placement */
mw.loader.using('mediawiki.util', function () {
$(function () {
var marker = document.querySelector('.list-status-marker');
var title = document.querySelector('h1.firstHeading, .firstHeading, #firstHeading');

	if (marker && title) {
		title.appendChild(marker);
	}
});

});

/* Red Links */
(function() {
    const wikiBase = window.location.origin + '/wiki/';

    function fixRedLink(link) {
        if (!link.hasAttribute('href')) {
            // Get the title attribute or text content
            let page = link.getAttribute('title') || link.textContent.trim();
            
            // Clean up the " (page does not exist)" suffix that MediaWiki appends to red link titles
            page = page.replace(/\s\((page\sdoes\snot\sexist|stránka\sneexistuje)\)$/i, '');

            link.setAttribute('href', wikiBase + encodeURIComponent(page));
            link.setAttribute('rel', 'nofollow');
        }
    }

    document.querySelectorAll('a.new').forEach(fixRedLink);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // element
                    if (node.matches('a.new')) fixRedLink(node);
                    if (node.querySelectorAll) node.querySelectorAll('a.new').forEach(fixRedLink);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();

// Sanitized Game Image Upload
window.AddRailModule = [{prepend: true}];

(function () {
    'use strict';

    var namespace = mw.config.get('wgNamespaceNumber');
    var specialPage = mw.config.get('wgCanonicalSpecialPageName');
    var isUploadPage = specialPage === 'Upload';
    var isGuideNamespace = namespace === 112;

    // Restrict strictly to mainspace articles, Guide namespace, or the special upload page
    if (namespace !== 0 && !isGuideNamespace && !isUploadPage) return;

    function sanitize(name) {
        return (name || '')
            .replace(/: /g, ' - ')
            .replace(/:/g, '꞉')
            .replace(/\//g, '∕')
            .replace(/\\/g, '∖')
            .replace(/\?/g, '﹖')
            .replace(/</g, '‹')
            .replace(/>/g, '›')
            .replace(/\|/g, 'ǀ')
            .replace(/%/g, '٪')
            .replace(/"/g, '”')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\.[Jj][Pp][Gg]$/, '') + '.jpg';
    }

    function addUploadTool() {
        if (document.getElementById('sanitize-upload-tool')) return;

        if (isUploadPage) {
            addToUploadPage();
        } else {
            addToRail();
        }
    }

    function createUploadTool() {
        var container = document.createElement('section');
        container.id = 'sanitize-upload-tool';
        container.style.cssText = 'padding:12px;margin:10px 0;border:1px solid var(--mw-border-color, #a2a9b1);border-radius:5px;';

        // 1. Heading
        var heading = document.createElement('div');
        heading.textContent = isUploadPage ? 'Game Title Sanitizer' : 'Upload Game Image';
        heading.style.cssText = 'font-weight:bold;margin-bottom:4px;font-size:14px;';
        container.appendChild(heading);

        // 2. Subtext
        var subtext = document.createElement('div');
        subtext.style.cssText = 'font-size:11px;margin-bottom:8px;line-height:1.4;opacity:0.8;';
        if (isUploadPage) {
            subtext.textContent = 'Automatically replaces forbidden characters and prepares your upload filename.';
        } else {
            subtext.textContent = 'The filename has been automatically prepared for this game. Click below to upload.';
        }
        container.appendChild(subtext);

        // 3. Input Field
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter game title...';

        if (namespace === 0) {
            input.value = mw.config.get('wgTitle');
        } else if (isGuideNamespace) {
            input.value = mw.config.get('wgPageName').split('/')[0].replace(/^Guide:/, '').replace(/_/g, ' ');
        }

        input.style.cssText = 'width:100%;box-sizing:border-box;padding:6px;margin-bottom:8px;border:1px solid var(--mw-border-color, #a2a9b1);border-radius:3px;background-color:var(--background-color-input, #fff);color:var(--color-input, #000);';
        container.appendChild(input);

        // 4. Action Button
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Continue to Upload';
        button.className = 'mw-ui-button mw-ui-progressive';
        button.style.cssText = 'width:100%;text-align:center;';
        container.appendChild(button);

        function upload() {
            var title = input.value.trim();
            if (!title) return;

            window.location.href = mw.util.getUrl('Special:Upload', {
                wpDestFile: sanitize(title)
            });
        }

        button.addEventListener('click', upload);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') upload();
        });

        return container;
    }

    function addToRail() {
        var railRoot = document.getElementById('WikiaRail');
        if (!railRoot || !railRoot.parentNode) return;

        var container = createUploadTool();
        container.className = 'railModule rail-module';
        railRoot.parentNode.insertBefore(container, railRoot);
    }

    function addToUploadPage() {
        var content = document.getElementById('mw-content-text');
        if (!content) return;

        var container = createUploadTool();
        content.insertBefore(container, content.firstChild);
    }

    mw.hook('wikipage.content').add(addUploadTool);

    var observer = new MutationObserver(addUploadTool);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    addUploadTool();
})();