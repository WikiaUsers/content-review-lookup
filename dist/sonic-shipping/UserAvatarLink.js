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
    
/* check for or set default values */
    if (!window.andrewds1021.user_avatar_link.namespace) {
        window.andrewds1021.user_avatar_link.namespace = "User";
    }
    
/* get elements to enclose in link */
    var avatars = $("div.UserAvatarFetch[data-useravatarlink-username]");
    
/* setup variables */
    var num_avatars = avatars.length;
    var lang = mw.config.get("wgContentLanguage");
    var username, namespace, url, link;
    
/* construct and insert links */
    for (var i = 0; i < num_avatars; i++) {
/* retrieve username */
        username = avatars[i].getAttribute("data-useravatarlink-username");
/* skip to next if username is only whitespace */
        if (username.replace(/\s/g, "").length) {
/* determine namespace */
            if (avatars[i].hasAttribute("data-useravatarlink-namespace")) {
                namespace = avatars[i].getAttribute("data-useravatarlink-namespace");
                if (!namespace.replace(/\s/g, "").length) {
                    namespace = window.andrewds1021.user_avatar_link.namespace;
                }
            } else {
                namespace = window.andrewds1021.user_avatar_link.namespace;
            }
/* construct URL */
            url = "/wiki/" + namespace + ":" + username;
            url = url.replace(/\s/g, "_");
            if (lang != "en") {
                url = "/" + lang + url;
            }
/* create and insert link */
            link = document.createElement("a");
            link.href = encodeURI(url);
            avatars[i].insertAdjacentElement("beforebegin", link);
            link.appendChild(avatars[i]);
        }
    }
    
})();