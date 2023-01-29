var VIEW_INIT_SHRINKLIST = function() {
    $(".qik_shrink-list > .qik_button-open").click(function() {
        this.parentNode.classList.add("qik_shrink-list-opened");
        this.parentNode.classList.remove("qik_shrink-list-closed");
    });

    $(".qik_shrink-list > .qik_button-close").click(function() {
        this.parentNode.classList.add("qik_shrink-list-closed");
        this.parentNode.classList.remove("qik_shrink-list-opened");
    });
};

var VIEW_INIT = function() {
	VIEW_INIT_SHRINKLIST();
};

VIEW_INIT();