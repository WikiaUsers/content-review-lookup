(function () {
    if (window.SkinToggler) return;
    window.SkinToggler = true;

    mw.hook("dev.i18n").add(function (i18n) {
            i18n.loadMessages("SkinSwitchFD").done(function (i18n) {
                	
			    mw.hook("dev.wds").add(
			        function (wds) {
			            switch (mw.config.get("skin")) {
			                case "fandomdesktop":
			                    const fd = {};
			
			                    fd.pageTools = document.querySelector(".page-side-tools");
			
			                    fd.skinButton = document.createElement("button");
			                    fd.skinButton.classList.add("page-side-tool");
			                    fd.skinButton.title = i18n.msg('title').plain();
			
			                    fd.pageTools.appendChild(fd.skinButton);
			                    fd.skinButton.appendChild(wds.icon("flag-small"));
			
			                    fd.skinButton.addEventListener("click", function () {
			                        changeSkin("oasis", fd.skinButton)
			                    }, false);
			                    break
			                case "oasis":
			                    const o = {};
			
			                    o.contribButtons = document.querySelector(".page-header__contribution-buttons");
			
			                    o.skinButton = document.createElement("button");
			                    o.skinButton.classList.add("wds-button", "wds-is-secondary");
			                    o.skinButton.title = i18n.msg('title').plain();
			                    
			                    o.contribButtons.appendChild(o.skinButton);
			                    o.skinButton.appendChild(wds.icon("flag-small"));
			
			                    o.skinButton.addEventListener("click", function () {
			                        changeSkin("fandomdesktop", o.skinButton)
			                    }, false);
			                    break
			            }
			
			            function changeSkin(skinToChange, button) {
			                new mw.Api().postWithToken("csrf", {
			                    action: "options",
			                    optionname: "skin",
			                    optionvalue: skinToChange
			                }).done(
			                    function () {
			                        button.removeChild(button.querySelector("svg"));
			                        button.appendChild(wds.icon("checkmark-small"));
			                        mw.notify(i18n.msg("reload-page").plain());
			                    }
			                )
			            }
			        }
			    );
            });
    	});
    	
	    importArticle({
	        type: "script",
	        articles: [
	            'u:dev:MediaWiki:I18n-js/code.js',
	            'u:dev:MediaWiki:WDSIcons/code.js'
	        ]
	    });
})();