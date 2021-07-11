/* from https://nkch.fandom.com/wiki/MediaWiki:CommunityPageRailModule.js */
mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(
    function () {
        return new mw.Api().loadMessagesIfMissing(["communitypage-help-us-grow", "communitypage-entry-button"]);
    }).then(
    function () {
        $.ajax({
            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
            type: "GET",
            data: {
                controller: "FeedsAndPosts",
                method: "getAll",
                format: "json"
            }
        }).then(
            function (info) {
                var topUsers = info.wikiDetails.topUsers;

                var communityblock = document.createElement("section");
                communityblock.classList.add("community-page-rail-module");

                Object.assign(communityblock.style, {
                    borderTop: "1px solid var(--theme-border-color)",
                    position: "relative"
                });
                
                if (mw.config.get("skin") === "fandomdesktop") {
                	Object.assign(communityblock.style, {
                    	marginTop: "35px"
                	});
                } else {
                	Object.assign(communityblock.style, {
                    	marginTop: "18px"
                	});
                }

                var communityblock_avatars = document.createElement("div");
                communityblock_avatars.classList.add("avatars");

                Object.assign(communityblock_avatars.style, {
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    top: "-16px",
                    width: "100%"
                });

                var communityblock_avatars_stack = document.createElement("div");
                communityblock_avatars_stack.classList.add("wds-avatar-stack");

                Object.assign(communityblock_avatars_stack.style, {
                    margin: "0"
                });

                var communityblock_content = document.createElement("div");
                communityblock_content.className = "content";

                Object.assign(communityblock_content.style, {
                    display: "flex",
                    marginTop: "26px"
                });

                var communityblock_content_desc = document.createElement("div");
                communityblock_content_desc.classList.add("description");
                communityblock_content_desc.innerHTML = mw.message("communitypage-help-us-grow", info.wikiVariables.name).parse();

                Object.assign(communityblock_content_desc.style, {
					fontSize: "14px",
                    lineHeight: "1.22"
                });
                
                var communityblock_content_link = document.createElement("a");
                communityblock_content_link.classList.add("wds-button", "wds-is-secondary", "entry-button");

                Object.assign(communityblock_content_link.style, {
                    whiteSpace: "nowrap"
                });
                
                communityblock_content_link.href = mw.util.getUrl(mw.Title.makeTitle(-1, "Community").getPrefixedText());
                communityblock_content_link.innerHTML = mw.message("communitypage-entry-button").escaped();

                function railCheck() {
                    if ($(".wikia-rail-inner.is-ready").length) {
                        $(".rail-module .activity-items").after(communityblock);
                    } else if ($("#WikiaRail.is-ready").length) {
                        $(".rail-module .activity-items").after(communityblock);
                    } else {
                        setTimeout(railCheck, 500);
                    }
                }

                railCheck();

                communityblock.appendChild(communityblock_avatars);
                communityblock_avatars.appendChild(communityblock_avatars_stack);

                for (var i in topUsers) {
                    var communityblock_topusers_avatar = document.createElement("div");
                    communityblock_topusers_avatar.className = "wds-avatar";
                    communityblock_topusers_avatar.id = "community-page-topusers-avatar-" + i;

                    var communityblock_topusers_link = document.createElement("a");
                    communityblock_topusers_link.href = mw.util.getUrl(mw.Title.makeTitle(2, topUsers[i].name).getPrefixedText());
                    communityblock_topusers_link.title = topUsers[i].name;
                    communityblock_topusers_avatar.appendChild(communityblock_topusers_link);

                    if (topUsers[i].avatarUrl !== "") {
                        var communityblock_topusers_image = document.createElement("img");
                        communityblock_topusers_image.classList.add("wds-avatar__image");
                        communityblock_topusers_image.setAttribute("src", topUsers[i].avatarUrl);

                        communityblock_topusers_link.appendChild(communityblock_topusers_image);
                    } else {
                        var communityblock_topusers_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        communityblock_topusers_icon.classList.add("wds-avatar__image");
                        communityblock_topusers_icon.setAttributeNS(null, "viewBox", "0 0 24 24");

                        var communityblock_topusers_icon_src = document.createElementNS("http://www.w3.org/2000/svg", "use");
                        communityblock_topusers_icon_src.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-avatar");
                        communityblock_topusers_icon.appendChild(communityblock_topusers_icon_src);

                        communityblock_topusers_link.appendChild(communityblock_topusers_icon);
                    }

                    communityblock_avatars_stack.appendChild(communityblock_topusers_avatar);
                }

                communityblock.appendChild(communityblock_content);

                communityblock_content.appendChild(communityblock_content_desc);
                communityblock_content.appendChild(communityblock_content_link);
            }
        );
    }
);