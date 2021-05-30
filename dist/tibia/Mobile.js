/* Any JavaScript here will be loaded for users using the mobile site */
(function () {
    /* Run commands (that require cookies/JS) */
    var commands;
    commands = {
		'showhide-content': function setupContentHider(e) {
            var $e = $(e), $ch = $e.children(), userSetting = !!parseInt((getCookie("TW_showcontent") || "0"), 10);
            function toggleVisibility() {
                if ($e.data("showhide-value") === "hidden") {
                    $e.addClass("showhide-visible").removeClass("showhide-hidden").data("showhide-value", "visible");
                } else {
                    $e.addClass("showhide-hidden").removeClass("showhide-visible").data("showhide-value", "hidden");
                }
            }
            $ch.each(function () {
                var $this = $(this);
                if ($this.data("showhide-element") === "header") {
                    $this.click(toggleVisibility);
                    return false;
                }
            });
            // Confirmed: JS enabled, remove showhide init class
            $e.removeClass("showhide-init");
            // User has opted to show the hidden content
            if (userSetting) {
                $e.addClass("showhide-visible").removeClass("showhide-hidden").data("showhide-value", "visible");
            }
        }
    };
}());