$(document).ready(function() {
mw.loader.using('mediawiki.api').then(
    function () {
        function getInfo() {
            var params = {
                controller: "FeedsAndPosts",
                method: "getAll",
                format: "json"
            }
            return new Promise(function (resolve) {
                $.ajax({
                    url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
                    type: "GET",
                    data: params
                }).then(function (info) {
                    resolve(info);
                })
            })
        }

        getInfo().then(
            function (info) {
                var topUsers = info.wikiDetails.topUsers;

                var communityblock = document.createElement("section");
                communityblock.className = "community-page-rail-module";

                communityblock.style.borderTop = "1px solid #cccccc";
                communityblock.style.marginTop = "18px";
                communityblock.style.position = "relative";

                var communityblock_avatars = document.createElement("div");
                communityblock_avatars.className = "avatars";
                communityblock_avatars.style.position = "absolute";
                communityblock_avatars.style.width = "100%";
                communityblock_avatars.style.top = "-16px";
                communityblock_avatars.style.display = "flex";
                communityblock_avatars.style.justifyContent = "center";

                var communityblock_avatars_stack = document.createElement("div");
                communityblock_avatars_stack.className = "wds-avatar-stack";
                communityblock_avatars_stack.style.margin = "0";

                var communityblock_content = document.createElement("div");
                communityblock_content.className = "content";
                communityblock_content.style.display = "flex";
                communityblock_content.style.marginTop = "26px";

                var communityblock_content_desc = document.createElement("div");
                communityblock_content_desc.className = "description";
                communityblock_content_desc.innerHTML = "Помогите нам улучшить " + info.wikiVariables.name + "!"

                var communityblock_content_a = document.createElement("a");
                communityblock_content_a.className = "entry-button wds-is-secondary wds-button"
                communityblock_content_a.href = mw.config.get("wgScriptPath") + "/wiki/Special:Community";
                communityblock_content_a.innerHTML = "Помочь";

                $(".rail-module .activity-items").after(communityblock);

                communityblock.appendChild(communityblock_avatars)
                communityblock_avatars.appendChild(communityblock_avatars_stack)

                for (i in topUsers) {
                    var topUsersAvatar = document.createElement("div");
                    topUsersAvatar.className = "wds-avatar";
                    topUsersAvatar.id = "topUsersAvatar_" + i;

                    var topUsersLink = document.createElement("a");
                    topUsersLink.href = mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/User:" + topUsers[i].name;
                    topUsersLink.title = topUsers[i].name;
                    topUsersAvatar.appendChild(topUsersLink)

                    var topUsersImage = document.createElement("div");
                    topUsersImage.className = "wds-avatar__image";

                    if (topUsers[i].avatarUrl != "") {
                        topUsersImage.style.backgroundImage = "url(" + topUsers[i].avatarUrl + ")";
                        topUsersImage.style.border = "2px solid #bed1cf";
                        topUsersImage.style.width = "32px";
                        topUsersImage.style.height = "32px";
                    } else {
                        topUsersImage.style.filter = "invert(.5)";
                        topUsersImage.style.backgroundImage = "url('/extensions/wikia/DesignSystem/node_modules/design-system/dist/svg/wds-icons-avatar.svg')";
                        topUsersImage.style.width = "30px";
                        topUsersImage.style.height = "30px";
                    }
                    topUsersImage.style.backgroundSize = "100%";

                    topUsersLink.appendChild(topUsersImage)
                    communityblock_avatars_stack.appendChild(topUsersAvatar)
                }

                communityblock.appendChild(communityblock_content)

                communityblock_content.appendChild(communityblock_content_desc)
                communityblock_content.appendChild(communityblock_content_a)
            }
        )
    })
})