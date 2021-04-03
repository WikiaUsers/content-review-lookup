mw.loader.using('mediawiki.api').then(
    
    function() {
        /* Load i18n messages */
        mw.hook('dev.i18n').add(function(i18n) {
            i18n.loadMessages('CommunityPageHeaderLinks').done(function (i18n) {

            function AddCommunityPageHeaderLinks() {
    
                /* Find specified class on the page */
                const communityPageHeaderContent = document.getElementsByClassName("community-page-header")[0];
    
                /* Create main block that will contain everything (and make it hidden by default) */
                const communityPageHeaderLinks = document.createElement("div");
                communityPageHeaderLinks.id = "communityPageHeaderLinks";
                communityPageHeaderLinks.style = "background: #0006; backdrop-filter: blur(5px); position: absolute; top: 20px; right: 20px; border-radius: 20px; padding: 5px 15px; text-align: right; font-size: 13px; color: white";
                communityPageHeaderLinks.innerText = i18n.msg('edit').plain();
                communityPageHeaderLinks.style.visibility = "hidden";
    
                /* Add this block to the page */
                communityPageHeaderContent.appendChild(communityPageHeaderLinks);
    
                /* Create ": " ¯\_(ツ)_/¯ */
                const communityPageHeaderLinksSpaceDivider = document.createElement("span");
                communityPageHeaderLinksSpaceDivider.innerText = ": ";
    
                /* Create link to "Header" page */
                const communityPageHeaderLinksAnchorPrimary = document.createElement("a");
                communityPageHeaderLinksAnchorPrimary.id = "communityPageHeaderLinksAnchorPrimary";
                communityPageHeaderLinksAnchorPrimary.innerText = i18n.msg('linkPrimary').plain();
                communityPageHeaderLinksAnchorPrimary.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/MediaWiki:Communitypage-tasks-header-welcome";
    
                /* Create link to "Subheader" page */
                const communityPageHeaderLinksAnchorSecondary = document.createElement("a");
                communityPageHeaderLinksAnchorSecondary.id = "communityPageHeaderLinksAnchorSecondary";
                communityPageHeaderLinksAnchorSecondary.innerText = i18n.msg('linkSecondary').plain();
                communityPageHeaderLinksAnchorSecondary.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/MediaWiki:Communitypage-subheader-welcome";
    
                /* Create link to image uploader */
                const communityPageHeaderLinksAnchorImage = document.createElement("a");
                communityPageHeaderLinksAnchorImage.id = "communityPageHeaderLinksAnchorImage";
                communityPageHeaderLinksAnchorImage.innerText = i18n.msg('image').plain();
                communityPageHeaderLinksAnchorImage.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/Special:Upload?wpDestFile=Community-Page-Header.jpg&wpForReUpload=1";
    
                /* Create 2 separators */
                const communityPageHeaderLinksTextDivider_1 = document.createElement("span");
                communityPageHeaderLinksTextDivider_1.className = "communityPageHeaderLinksTextDivider";
                communityPageHeaderLinksTextDivider_1.innerText = " • ";
    
                const communityPageHeaderLinksTextDivider_2 = document.createElement("span");
                communityPageHeaderLinksTextDivider_2.className = "communityPageHeaderLinksTextDivider";
                communityPageHeaderLinksTextDivider_2.innerText = " • ";
    
                /* Add them all to the main block */
                communityPageHeaderLinks.appendChild(communityPageHeaderLinksSpaceDivider);
                communityPageHeaderLinks.appendChild(communityPageHeaderLinksAnchorPrimary);
                communityPageHeaderLinks.appendChild(communityPageHeaderLinksTextDivider_1);
                communityPageHeaderLinks.appendChild(communityPageHeaderLinksAnchorSecondary);
                communityPageHeaderLinks.appendChild(communityPageHeaderLinksTextDivider_2);
                communityPageHeaderLinks.appendChild(communityPageHeaderLinksAnchorImage);
    
                /* Show it only when hovering... */
                communityPageHeaderContent.onmouseover = function() {
                    communityPageHeaderLinks.style.visibility = "visible";
                };
    
                /* ...and hide when not */
                communityPageHeaderContent.onmouseout = function() {
                    communityPageHeaderLinks.style.visibility = "hidden";
                };
            }
 

            /* Do only on Special:Community page & with specified rights */
            if ((mw.config.get("wgUserGroups").includes("sysop") || mw.config.get("wgUserGroups").includes("bureaucrat")) &&
            (mw.config.get("wgCanonicalNamespace") == "Special" && mw.config.get("wgCanonicalSpecialPageName") == "Community")) {
                AddCommunityPageHeaderLinks();
            }
            });
        });

        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
);