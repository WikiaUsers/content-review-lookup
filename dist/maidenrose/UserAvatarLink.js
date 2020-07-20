/********************* this comment is 80 characters long *********************/
 
(function () {
 
"use strict";
if (window.andrewds1021 && window.andrewds1021.user_avatar_link
    && window.andrewds1021.user_avatar_link.has_run) return;
if (!window.andrewds1021) {
    window.andrewds1021 = {
        user_avatar_link: {}
    };
} else if (!window.andrewds1021.user_avatar_link) {
    window.andrewds1021.user_avatar_link = {};
}
window.andrewds1021.user_avatar_link.has_run = true;
if (!window.andrewds1021.user_avatar_link.namespace) {
    window.andrewds1021.user_avatar_link.namespace = "User:";
}
var avatars = $("div.UserAvatarFetch[data-useravatarlink-username]");
var num_avatars = avatars.length;
var username, namespace, link;
 
for (var i = 0; i < num_avatars; i++) {
    username = decodeURI(avatars[i].getAttribute("data-useravatarlink-username"));
    if (username.replace(/\s/g, "").length) {
        if (avatars[i].hasAttribute("data-useravatarlink-namespace")) {
            namespace = decodeURI(
                avatars[i].getAttribute("data-useravatarlink-namespace")
            );
            if (!namespace.replace(/\s/g, "").length) {
                namespace = decodeURI(
                    window.andrewds1021.user_avatar_link.namespace
                );
            }
        } else {
            namespace = decodeURI(window.andrewds1021.user_avatar_link.namespace);
        }
        if (!namespace.match(/:$/)) {
            namespace = namespace + ":";
        }
        link = document.createElement("a");
        link.href = encodeURI("/wiki/" + namespace + username);
        avatars[i].insertAdjacentElement("beforebegin", link);
        link.appendChild(avatars[i]);
    }
}
 
})();
//