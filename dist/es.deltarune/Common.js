(() => {
    var html = $(".user-identity-header__tag");

    for (let tag of html) {
        switch(tag.innerHTML) {
            case mw.messages.values["userprofile-global-tag-bureaucrat"]:
                tag.innerHTML = "Nyx";
                break;
            case mw.messages.values["userprofile-global-tag-sysop"]:
                tag.innerHTML = "Delta";
                break;
            default:
                break;
        }
    }
})();