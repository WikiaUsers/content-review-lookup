// Allows filtering pages in a category by namespace
(function ($, mw) {
    'use strict';
    
    if (window.catFilter) return;
    window.catFilter = { loaded: true };

    var mainNamespace = '';
	var mwconfig = mw.config.get([
		'wgFormattedNamespaces',
		'wgNamespaceNumber',
		'wgTitle'
	]);

    //Creates a combo box with the namespace
    function createNamespaceCmbList(dropOptions) {
        var Html = mw.html;
        var cmbOutput = "";
        var objNamespace = mwconfig.wgFormattedNamespaces;
        var i;
        if (dropOptions) {
            for (i = 0; i < dropOptions.length; i += 1) {
                cmbOutput += Html.element("option", {
                    "value": dropOptions[i].val
                }, dropOptions[i].key);
            }
        }
        Object.keys(objNamespace).forEach(function (key) {
            if (objNamespace.hasOwnProperty(key) && Number(key) > 0) {
                cmbOutput += Html.element("option", {
                    "value": key
                }, objNamespace[key]);
            }
        });
        return cmbOutput;
    }

    function processAction(type, actionConfig, successMsg, failMsg, runMethod) {
        var mwApi = new mw.Api();
        var promise;
        if (actionConfig) {
            if (type === "post") {
                promise = mwApi.post(actionConfig);
            } else {
                promise = mwApi.get(actionConfig);
            }
            promise.then(function (data) {
                if (runMethod) {
                    runMethod(data, successMsg, failMsg);
                }
            }).fail(function (data) {
                console.log(data.statusText);
            });
        }
        return promise;
    }
    //Checks for valid namespace to remove links
    function getNamespacesFilter() {
        var objNamespace = mwconfig.wgFormattedNamespaces;
        // var nsNameList = $("#namespaceDropdown").val() || "";
        var nsFilters = [];
        var nsName;
        // for (ns = 0; ns < nsNameList.length; ns += 1) {
        nsName = $("#namespaceDropdown").val() || "";
        nsFilters.push(nsName);
        // }
        return nsFilters.join("|");
    }

    function main() {
        var Html = mw.html;
        var dropList = createNamespaceCmbList([{val:0,key:mainNamespace}]);
        var namespaceDropdown = mw.msg('namespace') + Html.element("select", {
            id: "namespaceDropdown",
            // style: "float:right",
            // multiple: "",
            size: ""
        }, new Html.Raw(dropList));
        var formOutput = namespaceDropdown;
        formOutput += " " + Html.element("button", {
            id: "catfilter-ns-button"
        }, mw.msg('show'));
        formOutput += Html.element("textarea", {
            id: "catfilter-pages-textarea",
            style: "display:none; height: 5em; width: 100%;"
        }, "");
        $("#mw-content-text").prepend(formOutput);
        $("#catfilter-ns-button").on("click", function () {
            var page = mwconfig.wgTitle;
            var config = {
                action: "query",
                list: "categorymembers",
                cmtitle: "Category:" + page,
                cmnamespace: getNamespacesFilter(),
                cmlimit: 500
            };
            processAction("post", config, "", "", function (data) {
                if (data && !data.error && !data.warnings) {
                    var output = "";
                    var catmembers = data.query.categorymembers;
                    $("#catfilter-pages-textarea").text("");
                    Object.keys(catmembers).forEach(function (id) {
                        if (catmembers[id]) {
                            output += catmembers[id].title + "\n";
                        }
                    });
                    $("#catfilter-pages-textarea").css("display", "block");
                    $("#catfilter-pages-textarea").text(output);
                    console.log(data);
                } else {
                    console.log(data.error);
                }
            });

        });
    }
    console.log(mwconfig);
    if (mwconfig.wgNamespaceNumber === 14) {
    	mw.loader.using( ['mediawiki.api'] ).then(function () {
			return new mw.Api().loadMessagesIfMissing([
				'blanknamespace',
				'namespace',
				'show'
			]);
		}).then(function() {
			mainNamespace = mw.msg('blanknamespace').slice(1, -1);
			main();
		});
    }
})(window.jQuery, window.mediaWiki);